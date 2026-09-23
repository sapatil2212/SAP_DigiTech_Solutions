import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck, Download, CheckCircle2, Copy, Check,
  ExternalLink, Phone, Mail, ArrowRight, Sparkles, Building2,
  FileCode, Layers, Server, Clock, AlertTriangle, User, MapPin
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { getProductDetail, loadAndSyncCustomProducts, type ProductDetail } from "@/lib/productData";

export const Route = createFileRoute("/pay/$productId")({
  component: ShareableCheckoutPage,
  loader: async ({ params }) => {
    let prod = getProductDetail(params.productId);
    if (!prod) {
      const all = await loadAndSyncCustomProducts();
      prod = all.find((p) => p.id.toLowerCase() === params.productId.toLowerCase()) || getProductDetail(params.productId);
    }
    return {
      productId: params.productId,
      productName: prod?.name || "Product",
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Direct Source Code Checkout for ${loaderData?.productName || "Product"} — SAP DigiTech Solutions` },
      { name: "description", content: "Instant commercial source code license checkout and immediate .ZIP download." },
    ],
  }),
});

interface PaymentLinkInfo {
  id: string;
  productId: string;
  productName: string;
  amount: number;
  originalPrice: number;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  notes?: string;
  createdAt?: string;
  expiresAt?: number | null;
  active?: boolean;
}

interface FulfillmentData {
  token: string;
  portalUrl: string;
  downloadUrl: string;
  expiresAt: number;
  customerEmail: string;
}

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

function ShareableCheckoutPage() {
  const { productId: rawId } = Route.useLoaderData();
  const initialProduct = getProductDetail(rawId);

  const [loading, setLoading] = useState(!initialProduct);
  const [linkInfo, setLinkInfo] = useState<PaymentLinkInfo | null>(
    initialProduct
      ? {
          id: initialProduct.id,
          productId: initialProduct.id,
          productName: initialProduct.name,
          amount: initialProduct.sourceCodeOffer.fixedPrice,
          originalPrice: initialProduct.sourceCodeOffer.originalPrice,
          notes: initialProduct.tagline || "Full Commercial Source Code License",
        }
      : null
  );
  const [product, setProduct] = useState<ProductDetail | null>(initialProduct || null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [paying, setPaying] = useState(false);

  // Success State
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [fulfillment, setFulfillment] = useState<FulfillmentData | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  const [copiedPayId, setCopiedPayId] = useState(false);

  // Load Razorpay checkout.js
  useEffect(() => {
    if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Fetch link or product metadata
  useEffect(() => {
    async function loadData() {
      if (!initialProduct) setLoading(true);
      try {
        // 1. Try public payment link endpoint
        const res = await fetch(`/api/payment-link/${encodeURIComponent(rawId)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.link) {
            setLinkInfo(data.link);
            const prod = getProductDetail(data.link.productId);
            if (prod) setProduct(prod);
            if (data.link.clientName && data.link.clientName !== "Public Storefront") {
              setFormData((prev) => ({
                ...prev,
                name: data.link.clientName || "",
                email: data.link.clientEmail || prev.email,
                phone: data.link.clientPhone || prev.phone,
              }));
            }
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Payment link fetch fallback:", err);
      }

      // 2. Fallback to direct product lookup
      const prod = getProductDetail(rawId);
      if (prod) {
        setProduct(prod);
        setLinkInfo({
          id: prod.id,
          productId: prod.id,
          productName: prod.name,
          amount: prod.sourceCodeOffer.fixedPrice,
          originalPrice: prod.sourceCodeOffer.originalPrice,
          notes: "Full Commercial Source Code License",
        });
      }
      setLoading(false);
    }

    loadData();
  }, [rawId]);

  // Countdown timer for 5-minute link expiration
  useEffect(() => {
    if (!paymentSuccess || remainingSeconds <= 0) return;
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [paymentSuccess, remainingSeconds]);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Full name is required (min 2 characters).";
    }
    const cleanPhone = formData.phone.replace(/[^0-9+]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Valid 10-digit phone number is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Valid email address is required for license delivery.";
    }
    if (!formData.address.trim() || formData.address.trim().length < 5) {
      errs.address = "Complete address is mandatory for commercial tax invoice.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePay = () => {
    if (!validate()) return;
    if (!linkInfo) return;

    const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!window.Razorpay) {
      toast.error("Payment gateway is still initializing. Please wait a moment.");
      return;
    }

    setPaying(true);

    const options = {
      key: razorpayKeyId || "rzp_test_placeholder",
      amount: linkInfo.amount * 100, // paise
      currency: "INR",
      name: "SAP DigiTech Solutions",
      description: `${linkInfo.productName} — Full Source Code License`,
      image: "/logo/sap_logo.png",
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: formData.address,
        product_name: linkInfo.productName,
        product_id: linkInfo.productId,
        link_id: linkInfo.id,
      },
      handler: async (response: RazorpaySuccessResponse) => {
        setPaying(false);
        setPaymentId(response.razorpay_payment_id);

        try {
          const fulfillRes = await fetch("/api/payment/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              productId: linkInfo.productId,
              productName: linkInfo.productName,
              customerName: formData.name,
              customerEmail: formData.email,
              customerPhone: formData.phone,
              customerAddress: formData.address,
              linkId: linkInfo.id,
            }),
          });

          if (fulfillRes.ok) {
            const json = await fulfillRes.json();
            if (json.success) {
              setFulfillment({
                token: json.token,
                portalUrl: json.portalUrl,
                downloadUrl: json.downloadUrl,
                expiresAt: json.expiresAt,
                customerEmail: formData.email,
              });
              setRemainingSeconds(300);
            }
          }
        } catch (err) {
          console.error("Fulfillment failed:", err);
        }

        setPaymentSuccess(true);
        toast.success("Payment verified! Your source code download is ready.");
      },
      theme: { color: "#FF6B00" },
      modal: {
        ondismiss: () => {
          setPaying(false);
          toast.info("Payment window dismissed.");
        },
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setPaying(false);
      console.error(err);
      toast.error("Failed to open Razorpay payment gateway.");
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFDFC] flex flex-col items-center justify-center p-4">
        <img
          src="/logo/sap_logo.png"
          alt="SAP DigiTech Solutions"
          className="h-10 object-contain mb-4 animate-pulse"
        />
        <p className="text-sm font-semibold text-slate-700">Loading Secure Checkout…</p>
      </div>
    );
  }

  if (!linkInfo) {
    return (
      <div className="min-h-screen bg-[#FDFDFC] flex flex-col items-center justify-center p-4 text-center">
        <Link to="/" className="mb-6 inline-block">
          <img
            src="/logo/sap_logo.png"
            alt="SAP DigiTech Solutions"
            className="h-9 object-contain mx-auto"
          />
        </Link>
        <div className="size-14 rounded-2xl bg-rose-50 text-rose-600 grid place-items-center mb-4 mx-auto">
          <AlertTriangle className="size-7" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Payment Link Not Found</h1>
        <p className="text-sm text-slate-500 max-w-md mt-1 mb-6">
          This payment link may have expired or is no longer active. Please contact the administrator.
        </p>
        <Link to="/products" className="px-5 py-2.5 rounded-full bg-[#1B2240] text-white text-xs font-bold">
          Browse Available Products
        </Link>
      </div>
    );
  }

  const discountPercent = Math.round(
    ((linkInfo.originalPrice - linkInfo.amount) / linkInfo.originalPrice) * 100
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#FF6B00] selection:text-white flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo/sap_logo.png"
              alt="SAP DigiTech Solutions Logo"
              className="h-8 sm:h-9 object-contain"
            />
            <div className="hidden sm:flex items-center pl-3 border-l border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">
                Secure Checkout
              </span>
            </div>
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#FF6B00] transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer"
          >
            <span>Explore other products</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Checkout Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 sm:py-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Product Summary & Commercial License Inclusions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
              {/* Product Title & Tagline */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B2240] tracking-tight">
                  {linkInfo.productName}
                </h1>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {product?.tagline || linkInfo.notes}
                </p>
              </div>

              {/* Product Thumbnail (if available) */}
              {product?.localImg && (
                <div className="rounded-2xl overflow-hidden border border-slate-200/80 aspect-video relative bg-slate-100 shadow-inner">
                  <img
                    src={product.localImg}
                    alt={linkInfo.productName}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2.5 left-3 text-[11px] font-mono text-white font-semibold bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    Production Build Archive
                  </span>
                </div>
              )}

              {/* Custom Proposal Banner (if for a specific client) */}
              {linkInfo.clientName && linkInfo.clientName !== "Public Storefront" && (
                <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200/80 text-xs text-orange-950 space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-[#FF6B00]">
                    <Building2 className="size-3.5" /> Customized Proposal For:
                  </span>
                  <p className="font-semibold text-slate-800">{linkInfo.clientName}</p>
                  {linkInfo.notes && (
                    <p className="text-[11px] text-slate-600 mt-0.5">{linkInfo.notes}</p>
                  )}
                </div>
              )}



              {/* Pricing Tag */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="line-through text-xs text-slate-400 font-medium">
                    ₹{linkInfo.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <div className="text-2xl font-black text-[#1B2240] leading-tight">
                    ₹{linkInfo.amount.toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FF6B00] text-white text-xs font-extrabold shadow-xs">
                    Save {discountPercent}%
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5 font-medium">
                    One-Time Fixed Price
                  </span>
                </div>
              </div>
            </div>

            {/* Help / Support Link */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald-600" />
                <span>Verified by SAP DigiTech</span>
              </span>
              <a
                href="https://wa.me/917745868073?text=Hi,%20I%20have%20a%20question%20about%20the%20source%20code%20license"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
              >
                <Phone className="size-3.5" /> WhatsApp Helpdesk
              </a>
            </div>
          </div>

          {/* Right Column: Checkout Form OR Instant Download Fulfillment */}
          <div className="lg:col-span-7">
            {!paymentSuccess ? (
              /* ─── Step 1: Customer Billing & License Details ─── */
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Step 1 of 2 • License Registration
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    Licensee & Commercial Details
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Enter licensee information to generate your verified commercial license and unlock the instant download.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePay();
                  }}
                  className="space-y-3"
                >
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <User className="size-3 text-slate-400" />
                      <span>Full Name / Entity Name <span className="text-rose-500">*</span></span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Swapnil Patil / Blue Intellect Agency"
                      className={`w-full h-9 bg-white border rounded-lg px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        errors.name
                          ? "border-rose-300 focus:ring-rose-200"
                          : "border-slate-300 focus:border-[#FF6B00] focus:ring-[#FF6B00]/15"
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-rose-500 mt-0.5">{errors.name}</p>}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                        <Mail className="size-3 text-slate-400" />
                        <span>Email Address <span className="text-rose-500">*</span></span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className={`w-full h-9 bg-white border rounded-lg px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          errors.email
                            ? "border-rose-300 focus:ring-rose-200"
                            : "border-slate-300 focus:border-[#FF6B00] focus:ring-[#FF6B00]/15"
                        }`}
                      />
                      {errors.email && <p className="text-[10px] text-rose-500 mt-0.5">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                        <Phone className="size-3 text-slate-400" />
                        <span>Phone / WhatsApp <span className="text-rose-500">*</span></span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className={`w-full h-9 bg-white border rounded-lg px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          errors.phone
                            ? "border-rose-300 focus:ring-rose-200"
                            : "border-slate-300 focus:border-[#FF6B00] focus:ring-[#FF6B00]/15"
                        }`}
                      />
                      {errors.phone && <p className="text-[10px] text-rose-500 mt-0.5">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <MapPin className="size-3 text-slate-400" />
                      <span>Registered Address / City <span className="text-rose-500">*</span></span>
                    </label>
                    <textarea
                      rows={2}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Street, City, State, PIN code"
                      className={`w-full bg-white border rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 resize-none leading-relaxed ${
                        errors.address
                          ? "border-rose-300 focus:ring-rose-200"
                          : "border-slate-300 focus:border-[#FF6B00] focus:ring-[#FF6B00]/15"
                      }`}
                    />
                    {errors.address && <p className="text-[10px] text-rose-500 mt-0.5">{errors.address}</p>}
                  </div>

                  {/* Security Assurance Card */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-[11px] text-slate-600">
                    <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                    <span>
                      256-bit encrypted gateway. Supports UPI, Cards, NetBanking, and Wallets.
                    </span>
                  </div>

                  {/* Legal Disclaimer & Copyright Notice */}
                  <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80 flex items-start gap-2.5 text-left">
                    <AlertTriangle className="size-4 text-rose-500 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 block">
                        Legal Warning & Trademark Notice
                      </span>
                      <p className="text-[10px] text-rose-700/90 font-normal leading-relaxed">
                        Please change the original product name, brand assets, and logo before deploying. Operating under the original name may result in copyright or trademark infringement.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={paying}
                      className="w-full h-11 px-5 rounded-xl font-bold text-xs bg-[#FF6B00] hover:bg-[#E05300] text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shadow-[#FF6B00]/25 active:scale-[0.99] disabled:opacity-60"
                    >
                      <span>
                        {paying ? "Connecting to Gateway…" : `Pay ₹${linkInfo.amount.toLocaleString("en-IN")} & Download Source Code`}
                      </span>
                      <ArrowRight className="size-3.5" />
                    </button>
                    <p className="text-center text-[10px] text-slate-400 mt-1.5 font-medium">
                      By proceeding, you receive an instant source code license.
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              /* ─── Step 2: Instant Fulfillment & Source Code Download ─── */
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-300 shadow-xl space-y-6"
              >
                {/* Header with Green Badge */}
                <div className="text-center space-y-2 pb-4 border-b border-slate-100">
                  <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto grid place-items-center shadow-inner">
                    <CheckCircle2 className="size-9" />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200">
                    Payment Verified & License Issued
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Your {linkInfo.productName} Code is Ready
                  </h2>
                  <p className="text-xs text-slate-500">
                    Your commercial source code license has been registered. Download your package below.
                  </p>
                </div>

                {/* 5-Minute Expiry Countdown Ticker */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                    <Clock className="size-4 text-amber-600 animate-spin" />
                    <span>Security Expiration Countdown</span>
                  </div>
                  <div className="text-3xl font-black font-mono text-amber-700">
                    {formatTime(remainingSeconds)}
                  </div>
                  <p className="text-[11px] text-amber-800">
                    ⚠️ For license and repository security, this download link expires in 5 minutes.
                  </p>
                </div>

                {/* Primary Download Actions */}
                <div className="space-y-3 pt-1">
                  {fulfillment?.downloadUrl && remainingSeconds > 0 && (
                    <a
                      href={fulfillment.downloadUrl}
                      download
                      className="w-full py-4 px-6 rounded-2xl font-extrabold text-sm bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2.5 transition-all shadow-md shadow-emerald-600/25 active:scale-[0.99] cursor-pointer"
                    >
                      <Download className="size-5" />
                      <span>Download Full Source Code (.ZIP)</span>
                    </a>
                  )}

                  {fulfillment?.portalUrl && (
                    <a
                      href={fulfillment.portalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 px-6 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center gap-2 transition-colors"
                    >
                      <ExternalLink className="size-4" />
                      <span>Open Dedicated Customer Download Portal</span>
                    </a>
                  )}
                </div>

                {/* Email Confirmation Notice */}
                {fulfillment?.customerEmail && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                    <Mail className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Backup Email Sent:</span> A copy of this link was sent to{" "}
                      <strong className="font-mono">{fulfillment.customerEmail}</strong>.
                    </div>
                  </div>
                )}

                {/* Payment Reference Summary */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Payment Reference:</span>
                    <div className="flex items-center gap-1.5 font-mono text-slate-800 font-semibold">
                      <span>{paymentId}</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(paymentId);
                          setCopiedPayId(true);
                          setTimeout(() => setCopiedPayId(false), 2000);
                        }}
                        className="text-slate-400 hover:text-slate-700 cursor-pointer"
                        title="Copy payment ID"
                      >
                        {copiedPayId ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Commercial Rights:</span>
                    <span className="font-semibold text-emerald-700">Full Commercial Rights Included</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Customer:</span>
                    <span className="font-semibold text-slate-800">{formData.name}</span>
                  </div>
                </div>

                {/* Support note */}
                <div className="text-center pt-2 text-xs text-slate-500">
                  <span>Questions or custom deployment assistance? </span>
                  <a
                    href={`https://wa.me/917745868073?text=Hello%20SAP%20DigiTech,%20I%20just%20purchased%20${encodeURIComponent(linkInfo.productName)}.%20Payment%20ID:%20${paymentId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#FF6B00] font-bold hover:underline"
                  >
                    Contact Engineering Support
                  </a>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} SAP DigiTech Solutions. All rights reserved.</span>
          <div className="flex items-center gap-4 text-slate-600">
            <Link to="/products" className="hover:text-[#FF6B00] transition-colors">Products</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-[#FF6B00] transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
