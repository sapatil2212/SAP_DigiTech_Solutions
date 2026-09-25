import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import {
  HiCheckCircle,
  HiShieldCheck,
  HiArrowDownTray,
  HiClock,
  HiEnvelope,
  HiPhone,
  HiUser,
  HiMapPin,
  HiXMark,
  HiArrowPath,
  HiArrowTopRightOnSquare,
  HiDocumentDuplicate,
  HiCheck,
  HiLockClosed,
  HiArrowRight,
  HiBuildingOffice2,
  HiExclamationTriangle,
} from "react-icons/hi2";
import { Loader2 } from "lucide-react";

/* ─────────────────────── Types ─────────────────────── */
export interface RazorpayCheckoutProps {
  /** Amount in INR (e.g. 1 for ₹1, 14999 for ₹14,999) */
  amount: number;
  /** Product display name */
  productName: string;
  /** Product identifier slug */
  productId: string;
  /** Optional license name */
  planName?: string;
  /** Button text override */
  buttonText?: string;
  /** Custom icon node */
  icon?: React.ReactNode;
  /** Additional CSS classes for the button */
  className?: string;
  /** Called after successful payment */
  onSuccess?: (response: RazorpaySuccessResponse) => void;
  /** Called after payment failure */
  onFailure?: (error: unknown) => void;
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface CustomerBillingData {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface DownloadFulfillmentData {
  token: string;
  portalUrl: string;
  downloadUrl: string;
  expiresAt: number;
  customerEmail: string;
}

interface RazorpayInstance {
  open: () => void;
  close: () => void;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    animation?: boolean;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

/* ─────────────────────── Step 1: Customer Details Modal (Clean Light Theme) ─────────────────────── */
export function CustomerDetailsModal({
  isOpen,
  onClose,
  onSubmit,
  productName,
  amount,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CustomerBillingData) => void;
  productName: string;
  amount: number;
}) {
  const [formData, setFormData] = useState<CustomerBillingData>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerBillingData, string>>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof CustomerBillingData, string>> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Full name is required (min 2 characters).";
    }

    const cleanPhone = formData.phone.replace(/[^0-9+]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Valid 10-digit phone number is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Valid email address is required.";
    }

    if (!formData.address.trim() || formData.address.trim().length < 5) {
      errs.address = "Complete address is mandatory for commercial invoice.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Dialog Card (Pure Light Theme, Simple & Professional) */}
          <motion.div
            key="modal-card"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-[410px] bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 text-slate-900 shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 size-6.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <HiXMark className="size-3.5" />
            </button>

            {/* Header */}
            <div className="border-b border-slate-100 pb-2.5 pr-7">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-orange-50 border border-orange-200 text-[#FF6B00] text-[10px] font-semibold">
                  <HiShieldCheck className="size-2.5" />
                  <span>Checkout</span>
                </span>
              </div>
              <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">
                Customer Information
              </h2>
              <p className="text-[10.5px] text-slate-500 mt-0.5 leading-relaxed">
                Enter your details to receive the download link and access for{" "}
                <strong className="text-slate-800 font-semibold">{productName}</strong>.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-2.5 space-y-2 text-left">
              {/* Full Name */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-0.5 flex items-center gap-1">
                  <HiUser className="size-2.5 text-slate-400" />
                  <span>Full Name <span className="text-rose-500">*</span></span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className={`w-full h-8 bg-white border rounded-lg px-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1.5 ${
                    errors.name
                      ? "border-rose-300 focus:ring-rose-200"
                      : "border-slate-300 focus:border-[#FF6B00] focus:ring-[#FF6B00]/15"
                  }`}
                />
                {errors.name && <p className="text-[9.5px] text-rose-500 mt-0.5">{errors.name}</p>}
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-0.5 flex items-center gap-1">
                    <HiEnvelope className="size-2.5 text-slate-400" />
                    <span>Email Address <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className={`w-full h-8 bg-white border rounded-lg px-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1.5 ${
                      errors.email
                        ? "border-rose-300 focus:ring-rose-200"
                        : "border-slate-300 focus:border-[#FF6B00] focus:ring-[#FF6B00]/15"
                    }`}
                  />
                  {errors.email && <p className="text-[9.5px] text-rose-500 mt-0.5">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-0.5 flex items-center gap-1">
                    <HiPhone className="size-2.5 text-slate-400" />
                    <span>Phone Number <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full h-8 bg-white border rounded-lg px-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1.5 ${
                      errors.phone
                        ? "border-rose-300 focus:ring-rose-200"
                        : "border-slate-300 focus:border-[#FF6B00] focus:ring-[#FF6B00]/15"
                    }`}
                  />
                  {errors.phone && <p className="text-[9.5px] text-rose-500 mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-0.5 flex items-center gap-1">
                  <HiMapPin className="size-2.5 text-slate-400" />
                  <span>Billing Address <span className="text-rose-500">*</span></span>
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address, city, state, postal code"
                  className={`w-full bg-white border rounded-lg p-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1.5 resize-none leading-relaxed ${
                    errors.address
                      ? "border-rose-300 focus:ring-rose-200"
                      : "border-slate-300 focus:border-[#FF6B00] focus:ring-[#FF6B00]/15"
                  }`}
                />
                {errors.address && <p className="text-[9.5px] text-rose-500 mt-0.5">{errors.address}</p>}
              </div>

              {/* Security Banner */}
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-1.5 px-2.5 flex items-center gap-2 text-[10px] text-slate-600">
                <HiLockClosed className="size-3 text-emerald-600 shrink-0" />
                <span>Encrypted 256-bit payment gateway. Instant delivery after completion.</span>
              </div>

              {/* Legal Warning Notice (Faint Red Box) */}
              <div className="rounded-lg bg-rose-50/70 border border-rose-200/80 p-1.5 px-2.5 flex items-start gap-1.5 text-left">
                <HiExclamationTriangle className="size-3 text-rose-500 shrink-0 mt-0.5" />
                <p className="text-[9.5px] text-rose-700 font-normal leading-relaxed">
                  <strong>Notice:</strong> Please rebrand and change the original product name, brand assets, and logos before deploying. Using the original name in production may lead to copyright or trademark infringement warnings.
                </p>
              </div>

              {/* Buttons */}
              <div className="pt-1 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg font-bold text-xs bg-[#FF6B00] hover:bg-[#E05300] text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm active:scale-98"
                >
                  <span>Continue to Payment</span>
                  <HiArrowRight className="size-3" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ─────────────────────── Step 2: Payment Success Modal (Clean Light Theme) ─────────────────────── */
export function PaymentSuccessModal({
  isOpen,
  onClose,
  paymentData,
  fulfillmentData,
  productName,
  amount,
  onRefreshLink,
}: {
  isOpen: boolean;
  onClose: () => void;
  paymentData: RazorpaySuccessResponse | null;
  fulfillmentData: DownloadFulfillmentData | null;
  productName: string;
  amount: number;
  onRefreshLink?: () => Promise<void>;
}) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync remaining countdown
  useEffect(() => {
    if (!fulfillmentData?.expiresAt) {
      setRemainingSeconds(300);
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const diffSec = Math.max(0, Math.floor((fulfillmentData.expiresAt - now) / 1000));
      setRemainingSeconds(diffSec);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [fulfillmentData?.expiresAt]);

  const copyPaymentId = () => {
    if (!paymentData?.razorpay_payment_id) return;
    navigator.clipboard.writeText(paymentData.razorpay_payment_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeFormatted = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  const isExpired = remainingSeconds <= 0;

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && paymentData && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Card (Pure Light Theme, Clean Corporate Aesthetic) */}
          <motion.div
            key="modal-card"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 text-slate-900 shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 size-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <HiXMark className="size-5" />
            </button>

            <div className="text-center">
              {/* Clean Status Icon */}
              <div className="size-14 mx-auto mb-3 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <HiCheckCircle className="size-8" />
              </div>

              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-1">
                <span>Payment Confirmed • ₹{amount.toLocaleString("en-IN")}</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Payment Successful
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Thank you! Your official source code package for{" "}
                <strong className="text-slate-800 font-semibold">{productName}</strong> is generated and ready for direct download.
              </p>

              {/* 5-MINUTE COUNTDOWN TIMER (Single Horizontal Line) */}
              <div
                className={`mt-4 p-2.5 px-3 rounded-xl border flex items-center justify-between gap-2.5 text-left transition-colors ${
                  isExpired
                    ? "bg-rose-50 border-rose-200"
                    : remainingSeconds < 60
                    ? "bg-orange-50 border-orange-300"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <HiClock className={`size-4 shrink-0 ${isExpired ? "text-rose-600" : "text-[#FF6B00]"}`} />
                  <span className="text-[11px] text-slate-600 truncate sm:overflow-visible sm:whitespace-normal">
                    {isExpired
                      ? "Download link expired after 5 minutes."
                      : "This link is valid for 5 minutes only. Download your archive now."}
                  </span>
                </div>
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded border shrink-0 ${
                    isExpired
                      ? "bg-rose-100 border-rose-300 text-rose-700"
                      : remainingSeconds < 60
                      ? "bg-orange-100 border-orange-300 text-orange-700"
                      : "bg-white border-slate-300 text-slate-800"
                  }`}
                >
                  {isExpired ? "00:00 EXPIRED" : timeFormatted}
                </span>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-4 space-y-2">
                {isExpired ? (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2.5">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Need help? If you missed your 5-minute download window, contact our developer helpdesk with your Payment Reference.
                    </p>
                    <a
                      href={`https://wa.me/917745868073?text=Hello%20SAP%20DigiTech,%20my%20source%20code%20download%20link%20expired.%20Payment%20ID:%20${paymentData.razorpay_payment_id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                    >
                      <HiPhone className="size-3.5" />
                      <span>Contact Support on WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <div>
                    {fulfillmentData?.downloadUrl && (
                      <a
                        href={fulfillmentData.downloadUrl}
                        download
                        className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-[#FF6B00] hover:bg-[#E05300] text-white flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-98"
                      >
                        <HiArrowDownTray className="size-4" />
                        <span>Download Full Source Code (.ZIP)</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Email Sent Confirmation */}
              {fulfillmentData?.customerEmail && (
                <div className="mt-3 p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-left flex items-start gap-2 text-xs text-emerald-800">
                  <HiEnvelope className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Email Sent:</span> A copy of this 5-minute download link has been dispatched to{" "}
                    <strong className="font-mono text-emerald-900">{fulfillmentData.customerEmail}</strong>.
                  </div>
                </div>
              )}

              {/* Transaction Summary Table */}
              <div className="mt-3 border border-slate-200 rounded-xl p-3 text-left text-xs text-slate-600 space-y-1.5 bg-slate-50/60">
                <div className="flex items-center justify-between">
                  <span>Payment Reference:</span>
                  <div className="flex items-center gap-1.5 font-mono text-slate-800 font-medium">
                    <span>{paymentData.razorpay_payment_id}</span>
                    <button
                      type="button"
                      onClick={copyPaymentId}
                      className="text-slate-400 hover:text-slate-700 cursor-pointer"
                      title="Copy Reference ID"
                    >
                      {copied ? <HiCheck className="size-3.5 text-emerald-600" /> : <HiDocumentDuplicate className="size-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Done button */}
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ─────────────────────── Main Component ─────────────────────── */
export function RazorpayCheckout({
  amount,
  productName,
  productId,
  planName = "Source Code License",
  buttonText,
  icon,
  className = "",
  onSuccess,
  onFailure,
}: RazorpayCheckoutProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<RazorpaySuccessResponse | null>(null);
  const [fulfillmentData, setFulfillmentData] = useState<DownloadFulfillmentData | null>(null);
  const [customerDetails, setCustomerDetails] = useState<CustomerBillingData | null>(null);

  const scriptRef = useRef<HTMLScriptElement | null>(null);

  /* Load Razorpay checkout.js */
  useEffect(() => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => {
      toast.error("Failed to load payment gateway. Please check your connection and try again.");
    };
    document.body.appendChild(script);
    scriptRef.current = script;
  }, []);

  // 1. Initial click: Open clean light-mode customer billing modal
  const handleInitialClick = () => {
    setCustomerModalOpen(true);
  };

  // 2. Customer submitted valid form: Open Razorpay checkout with prefilled customer data
  const handleProceedToPayment = useCallback(
    (billingData: CustomerBillingData) => {
      setCustomerDetails(billingData);
      setCustomerModalOpen(false);

      const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!razorpayKeyId || razorpayKeyId === "rzp_test_XXXXXXXXXXXXXXX") {
        toast.info("Payment gateway is being configured with your production keys.", {
          description: "To test live payments, ensure VITE_RAZORPAY_KEY_ID is set.",
          duration: 5000,
        });
        return;
      }

      if (!scriptLoaded || !window.Razorpay) {
        toast.error("Payment gateway is still loading. Please try again in a moment.");
        return;
      }

      setLoading(true);

      const options: RazorpayOptions = {
        key: razorpayKeyId,
        amount: amount * 100, // in paise
        currency: "INR",
        name: "SAP DigiTech Solutions",
        description: `${productName} — Full Source Code License`,
        image: "/logo/sap_logo.png",
        prefill: {
          name: billingData.name,
          email: billingData.email,
          contact: billingData.phone,
        },
        notes: {
          customer_name: billingData.name,
          customer_email: billingData.email,
          customer_phone: billingData.phone,
          customer_address: billingData.address,
          product_name: productName,
          product_id: productId,
          plan_name: planName,
        },
        handler: async (response: RazorpaySuccessResponse) => {
          setLoading(false);
          setSuccessData(response);

          // Call backend fulfillment to create 5-min link and send customer email
          try {
            const fulfillRes = await fetch("/api/payment/complete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                productId,
                productName,
                customerName: billingData.name,
                customerEmail: billingData.email,
                customerPhone: billingData.phone,
                customerAddress: billingData.address,
              }),
            });

            if (fulfillRes.ok) {
              const fulfillJson = await fulfillRes.json();
              if (fulfillJson.success) {
                setFulfillmentData({
                  token: fulfillJson.token,
                  portalUrl: fulfillJson.portalUrl,
                  downloadUrl: fulfillJson.downloadUrl,
                  expiresAt: fulfillJson.expiresAt,
                  customerEmail: billingData.email,
                });
              }
            }
          } catch (err) {
            console.error("Fulfillment call failed:", err);
          }

          // Open the clean, simple light-mode success modal
          setSuccessModalOpen(true);
          onSuccess?.(response);
        },
        theme: {
          color: "#FF6B00",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.info("Payment window closed. You can resume anytime.");
          },
          escape: true,
          animation: true,
        },
      };

      try {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        setLoading(false);
        toast.error("Something went wrong opening the payment gateway.");
        onFailure?.(err);
      }
    },
    [scriptLoaded, amount, productName, productId, planName, onSuccess, onFailure]
  );

  return (
    <>
      <button
        type="button"
        onClick={handleInitialClick}
        disabled={loading}
        className={[
          "inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm",
          "bg-[#FF6B00] hover:bg-[#E05300] text-white",
          "transition-all duration-200 cursor-pointer",
          "active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-[#FF6B00]/20",
          className,
        ].join(" ")}
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Connecting to Gateway…</span>
          </>
        ) : (
          <>
            {icon ?? <HiArrowDownTray className="size-4" />}
            <span>{buttonText || `Buy Source Code — ₹${amount.toLocaleString("en-IN")}`}</span>
          </>
        )}
      </button>

      {/* Step 1: Customer Details Mandatory Form Modal (Clean Light Theme) */}
      <CustomerDetailsModal
        isOpen={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        onSubmit={handleProceedToPayment}
        productName={productName}
        amount={amount}
      />

      {/* Step 2: Payment Success Modal with 5-Min Countdown & Direct Download (Clean Light Theme) */}
      <PaymentSuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        paymentData={successData}
        fulfillmentData={fulfillmentData}
        productName={productName}
        amount={amount}
      />
    </>
  );
}

/* ─────────── Single Purchase Box Buy Button ─────────── */
export function RazorpayBuyButton({
  amount,
  productName,
  productId,
  planName = "Source Code License",
  buttonText,
  icon,
  className = "",
}: {
  amount: number;
  productName: string;
  productId: string;
  planName?: string;
  buttonText?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <RazorpayCheckout
      amount={amount}
      productName={productName}
      productId={productId}
      planName={planName}
      buttonText={buttonText}
      icon={icon}
      className={className || "w-full py-3.5 text-base"}
    />
  );
}
