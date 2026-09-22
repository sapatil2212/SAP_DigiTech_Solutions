import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav, Footer } from "../index";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp,
  Download, ExternalLink, Sparkles, Star, Shield, Zap,
  Crown, Code, Globe, Lock, Palette, Building2, Mail,
  Terminal, Headphones, BookOpen, Phone, CreditCard,
  CheckCircle, BarChart3, Users, Clock, ShieldCheck,
  Cpu, Layers, FileCode, CheckCircle2, GitBranch, Server,
  Database, ArrowUpRight, Monitor, GraduationCap, Copy,
  Workflow, Bot, Search, RefreshCw, FileText
} from "lucide-react";
import {
  getProductDetail,
  getAllProductDetails,
  loadAndSyncCustomProducts,
  type ProductDetail,
} from "@/lib/productData";
import { RazorpayCheckout, RazorpayBuyButton } from "@/components/RazorpayCheckout";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetailPage,
  loader: async ({ params }) => {
    let product = getProductDetail(params.productId);
    if (!product) {
      const all = await loadAndSyncCustomProducts();
      product = all.find((p) => p.id.toLowerCase() === params.productId.toLowerCase()) || getProductDetail(params.productId);
    }
    if (!product) throw notFound();
    return {
      productId: product.id,
      name: product.name,
      heroDesc: product.heroDesc,
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product"} Source Code — SAP DigiTech Solutions` },
      {
        name: "description",
        content: loaderData?.heroDesc ?? "Production-ready SaaS source code with complete commercial white-label license.",
      },
    ],
  }),
});

/* ─────────────────────── Interactive Code Box ─────────────────────── */
function CodeSnippetBox({
  code,
  language = "bash",
  filename,
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-[#0A0E1A] border border-slate-800/90 shadow-xl my-3 text-left">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#121828] border-b border-slate-800 text-slate-300">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-rose-500/80" />
            <span className="size-2 rounded-full bg-amber-500/80" />
            <span className="size-2 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[0.72rem] font-mono text-slate-300 font-semibold ml-1.5 flex items-center gap-1.5">
            <Terminal className="size-3 text-[#FF6B00]" />
            {filename || language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 hover:bg-[#FF6B00] text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
        >
          {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
          <span>{copied ? "Copied!" : "Copy Code"}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto max-h-[450px] text-xs font-mono text-slate-200 leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
        <pre className="font-mono whitespace-pre">{code}</pre>
      </div>
    </div>
  );
}

/* ─────────────────────── Main Product Detail Page ─────────────────────── */
function ProductDetailPage() {
  const { productId } = Route.useLoaderData();
  const [product, setProduct] = useState<ProductDetail | undefined>(() => getProductDetail(productId));
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCapability, setActiveCapability] = useState(0);
  const [copiedDiagram, setCopiedDiagram] = useState(false);

  useEffect(() => {
    const current = getProductDetail(productId);
    if (current) setProduct(current);

    const handleUpdate = () => {
      const updated = getProductDetail(productId);
      if (updated) setProduct(updated);
    };
    window.addEventListener("sap_products_updated", handleUpdate);
    return () => {
      window.removeEventListener("sap_products_updated", handleUpdate);
    };
  }, [productId]);

  if (!product) return null;

  const rawUrl = product.url || "";
  const liveUrl = rawUrl.startsWith("http://") || rawUrl.startsWith("https://") ? rawUrl : `https://${rawUrl}`;
  const cleanDomain = liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const currentCap = product.interactiveCapabilities?.[activeCapability] || product.interactiveCapabilities?.[0] || {
    title: "Core System Engine",
    subtitle: "Autonomous Architecture",
    description: product.heroDesc || "Production-tested SaaS capability ready for immediate deployment.",
    metrics: "< 15s latency",
    badge: "Core Module",
    previewNote: "Full commercial white-label source code included.",
  };
  const otherProducts = getAllProductDetails().filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#FDFDFC] text-[#1B2240] overflow-x-clip selection:bg-[#FF6B00] selection:text-white">
      <Nav />

      {/* ─── Hero Section (Clean Light Mode with Dedicated Right Dashboard) ─── */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 pb-14 md:pb-20 overflow-hidden bg-gradient-to-b from-[#FFF7F2]/80 via-[#FDFDFC] to-[#FDFDFC] border-b border-slate-200/70">
        {/* Subtle Brand Ambient Glows */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-radial from-[#FF6B00]/8 via-orange-100/30 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 size-[360px] rounded-full bg-[#1B2240]/4 blur-3xl pointer-events-none" />

        <div className="container-1280 relative z-10 px-4">
          {/* Breadcrumbs Navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-6">
            <Link to="/" className="hover:text-[#FF6B00] transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <Link to="/products" className="hover:text-[#FF6B00] transition-colors">Products</Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#1B2240] font-bold">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Product Value Proposition */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold">
                  <Sparkles className="size-3.5" />
                  {product.badge}
                </span>
                <span className="text-xs text-slate-300 font-medium">•</span>
                <span className="text-xs text-slate-600 font-semibold uppercase tracking-wide">
                  {product.categoryName}
                </span>
                <span className="text-xs text-slate-300 font-medium">•</span>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  100% White-Label
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B2240] tracking-tight leading-[1.08]">
                  {product.name}
                </h1>
                <p className="text-base sm:text-lg font-semibold text-[#FF6B00]">
                  {product.tagline}
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  {product.heroDesc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <RazorpayCheckout
                  amount={product.sourceCodeOffer.fixedPrice}
                  productName={product.name}
                  productId={product.id}
                  planName={product.sourceCodeOffer.licenseName}
                  buttonText={`Buy Source Code — ₹${product.sourceCodeOffer.fixedPrice.toLocaleString("en-IN")}`}
                  icon={<ArrowRight className="size-4" />}
                  className="px-6 py-3.5 shadow-sm"
                />

                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-semibold text-sm bg-white hover:bg-slate-50 text-[#1B2240] border border-slate-200/90 shadow-xs transition-colors"
                >
                  Visit Live Site
                  <ExternalLink className="size-3.5 text-slate-400" />
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Book Demo
                  <Phone className="size-3.5 text-slate-500" />
                </Link>
              </div>

              {/* Key Metric Stats Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {product.stats.map((stat, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-center">
                    <span className="text-lg sm:text-xl font-extrabold text-[#1B2240] block tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-[0.72rem] text-slate-400 font-normal block mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── Right Column: Dashboard ONLY (Clean, Ultra-Professional Browser Mockup) ─── */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-[#0B0F19] border border-slate-800 shadow-2xl shadow-slate-950/20 overflow-hidden group transition-all duration-300">
                {/* Browser Top Chrome Header */}
                <div className="px-4 py-3 bg-[#0E1322] border-b border-slate-800 flex items-center justify-between gap-3">
                  {/* Window Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="size-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                    <div className="size-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                    <div className="size-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                  </div>

                  {/* Clean Address Bar */}
                  <div className="flex-1 max-w-sm bg-slate-900/90 border border-slate-700/80 rounded-full px-3.5 py-1 flex items-center justify-between gap-2 text-xs shadow-inner">
                    <div className="flex items-center gap-1.5 truncate">
                      <Lock className="size-3 text-emerald-400 shrink-0" />
                      <span className="text-[0.72rem] text-slate-300 font-mono truncate">{cleanDomain}</span>
                    </div>
                    <span className="flex items-center gap-1 text-[0.62rem] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                    </span>
                  </div>

                  {/* External Link Action */}
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Open ${product.name} live in new tab`}
                    className="size-7 rounded-lg bg-slate-800 hover:bg-[#FF6B00] text-slate-300 hover:text-white grid place-items-center transition-colors shrink-0"
                  >
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>

                {/* Pristine Dashboard Screenshot Preview */}
                <div className="relative overflow-hidden bg-slate-950 group/img">
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative overflow-hidden"
                  >
                    <img
                      src={product.localImg}
                      alt={`${product.name} live dashboard screenshot`}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/assets/work/website-preview/briefvault.png";
                      }}
                      className="w-full object-cover object-top max-h-[420px] transition-transform duration-700 ease-out group-hover/img:scale-[1.02]"
                    />

                    {/* Interactive Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5 bg-[#FF6B00] px-4 py-2 rounded-full shadow-lg">
                        Launch {cleanDomain} <ExternalLink className="size-3.5" />
                      </span>
                      <span className="text-[0.68rem] text-slate-300 bg-slate-900/90 px-3 py-1.5 rounded-full backdrop-blur-sm border border-slate-700/60">
                        Click to open full website
                      </span>
                    </div>
                  </a>
                </div>

                {/* Dashboard Status Footer */}
                <div className="px-4 py-2.5 bg-[#090D18] border-t border-slate-800/80 flex items-center justify-between text-[0.72rem] text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="size-3.5" /> Production Deployed
                  </span>
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF6B00] font-bold hover:underline flex items-center gap-1"
                  >
                    {cleanDomain} <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Production Tech Stack & Architecture Strip ─── */}
      <section className="py-8 bg-slate-50 border-b border-slate-200/80">
        <div className="container-1280 px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <GitBranch className="size-4 text-emerald-600" />
              <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                Production Architecture & Tech Stack
              </span>
              <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                Commercial License Ready
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Terminal className="size-3.5 text-slate-400" /> Docker Compose
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Server className="size-3.5 text-slate-400" /> Self-Hosted VPS Ready
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {product.sourceCodeOffer.techStackDetailed.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/90 border border-slate-200/70 shadow-2xs hover:border-[#FF6B00]/30 transition-colors">
                <span className="text-[0.68rem] font-mono uppercase tracking-wider text-[#FF6B00] font-bold block mb-1.5">
                  {item.category}
                </span>
                <p className="text-xs sm:text-sm font-normal text-slate-500 leading-relaxed">
                  {item.techs.map((tech, tIdx) => (
                    <span key={tIdx} className="inline-flex items-center">
                      <span className="text-slate-500 hover:text-slate-700 transition-colors">{tech}</span>
                      {tIdx < item.techs.length - 1 && (
                        <span className="mx-1.5 text-slate-300 font-normal select-none">•</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 1. Complete Technology Stack ─── */}
      {product.comprehensiveTechStack && (
        <section id="tech-stack" className="py-16 md:py-20 bg-white border-b border-slate-200/80 scroll-mt-28">
          <div className="container-1280 px-4">
            <div className="max-w-3xl mb-12 space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF6B00] flex items-center gap-1.5">
                <Code className="size-4" /> 1. COMPLETE TECHNOLOGY STACK
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B2240] tracking-tight">
                Enterprise Technologies & Libraries
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Full transparent breakdown of every framework, ORM, UI primitive, AI model, and payment gateway integrated into {product.name}.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.comprehensiveTechStack.map((cat, i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-slate-50/70 border border-slate-200/90 p-6 flex flex-col justify-between hover:bg-white hover:border-[#FF6B00]/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                      <h3 className="text-base font-extrabold text-[#1B2240] flex items-center gap-2">
                        <span className="size-2 rounded-full bg-[#FF6B00]" />
                        {cat.category}
                      </h3>
                      <span className="text-[0.68rem] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                        {cat.items.length} Modules
                      </span>
                    </div>

                    {cat.description && (
                      <p className="text-xs text-slate-400 font-normal leading-relaxed">
                        {cat.description}
                      </p>
                    )}

                    <div className="space-y-2.5 pt-1">
                      {cat.items.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200/70 text-left space-y-0.5 shadow-2xs">
                          <div className="flex items-center justify-between gap-2">
                            {item.url ? (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold text-slate-700 hover:text-[#FF6B00] transition-colors flex items-center gap-1 group"
                              >
                                <span>{item.name}</span>
                                <ExternalLink className="size-3 text-slate-400 group-hover:text-[#FF6B00]" />
                              </a>
                            ) : (
                              <span className="text-xs font-semibold text-slate-700">{item.name}</span>
                            )}
                          </div>
                          <p className="text-[0.72rem] text-slate-400 font-normal leading-snug">
                            {item.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 2. What BriefVault Does (System Capabilities) ─── */}
      {product.systemCapabilities && (
        <section id="system-capabilities" className="py-16 md:py-24 bg-[#F8FAFC] border-b border-slate-200/80 scroll-mt-28">
          <div className="container-1280 px-4 space-y-12">
            
            {/* Side-by-Side 2 Cards: What BriefVault Does & Core Architecture Blueprint */}
            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Card 1: What BriefVault Does */}
              <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/90 p-7 sm:p-9 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF6B00] flex items-center gap-1.5">
                      <Workflow className="size-4" /> 2. SYSTEM CAPABILITIES & ARCHITECTURE
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B2240] tracking-tight">
                      What {product.name} Does
                    </h2>
                  </div>

                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
                    {product.systemCapabilities.targetAudience}
                  </p>

                  <div className="pt-2 space-y-3">
                    <span className="text-[0.72rem] uppercase font-bold text-slate-400 tracking-wider block">
                      Target Legal & Compliance Teams
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Law Firms",
                        "In-House Legal Counsel",
                        "Chartered Accountants",
                        "Company Secretaries",
                        "Tax Consultants",
                        "Corporate Compliance",
                      ].map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-slate-500 text-xs font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#FFF7F2] border border-[#FF6B00]/20 space-y-0.5">
                    <span className="text-[0.68rem] uppercase font-bold text-[#FF6B00] block">Input Formats</span>
                    <span className="font-semibold text-slate-600 block">PDF, DOCX, Scanned OCR</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-500/20 space-y-0.5">
                    <span className="text-[0.68rem] uppercase font-bold text-emerald-600 block">Fact Verification</span>
                    <span className="font-semibold text-slate-600 block">Exact Page Citations</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Core Architecture Blueprint ASCII Card */}
              <div className="lg:col-span-7 rounded-3xl bg-[#090D18] border border-slate-800 p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] grid place-items-center shrink-0">
                      <Layers className="size-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-white">
                        BriefVault Core Architecture Blueprint
                      </h3>
                      <p className="text-xs text-slate-400">
                        End-to-end ingestion, 6-stage background queue pipeline, 19 AI modules, Cashfree billing & multi-tenant security
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(product.systemCapabilities?.architectureDiagram || "");
                      setCopiedDiagram(true);
                      setTimeout(() => setCopiedDiagram(false), 2000);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FF6B00] text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer self-start sm:self-auto shrink-0"
                  >
                    {copiedDiagram ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                    <span>{copiedDiagram ? "Copied!" : "Copy Diagram"}</span>
                  </button>
                </div>

                <div className="overflow-x-auto py-2 my-auto">
                  <pre className="font-mono text-[0.68rem] sm:text-[0.72rem] md:text-xs text-emerald-400/95 leading-tight whitespace-pre font-semibold selection:bg-[#FF6B00] selection:text-white">
                    {product.systemCapabilities.architectureDiagram}
                  </pre>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[0.72rem] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" /> Zero-Redis MySQL Durable Queue
                  </span>
                  <span className="text-slate-500 font-mono">19 AI Modules • Cashfree AutoPay E-Mandates</span>
                </div>
              </div>

            </div>

            {/* 1. Ingestion & Document Processing Pipeline (6 Stages) */}
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B00]">
                  PIPELINE WORKFLOW
                </span>
                <h3 className="text-2xl font-extrabold text-[#1B2240]">
                  1. Ingestion & Document Processing Pipeline
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  When a user uploads judicial rulings or agreements, BriefVault orchestrates a structured 6-stage asynchronous pipeline.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.systemCapabilities.pipelineStages.map((stage, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2 hover:border-[#FF6B00]/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.68rem] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00]">
                        {stage.step}
                      </span>
                      <span className="size-6 rounded-full bg-slate-100 grid place-items-center text-xs font-bold text-slate-500">
                        {idx + 1}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1B2240]">
                      {stage.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-normal leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. 19 AI Intelligence Modules */}
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B00]">
                  MULTI-MODEL SUITE
                </span>
                <h3 className="text-2xl font-extrabold text-[#1B2240]">
                  2. 19 AI Intelligence Modules
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  BriefVault executes 19 distinct legal analysis modules categorized into four specialized practice areas.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {product.systemCapabilities.aiModules.map((grp, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                        <h4 className="text-sm font-extrabold text-[#1B2240]">
                          {grp.category}
                        </h4>
                        <span className="text-[0.68rem] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {grp.count} Engines
                        </span>
                      </div>
                      <ul className="space-y-2 mt-3 text-xs text-slate-400 font-normal">
                        {grp.modules.map((m, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="size-3.5 text-[#FF6B00] shrink-0 mt-0.5" />
                            <span className="leading-snug">{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3, 4, 5, 6 Capabilities Grid */}
            <div className="grid md:grid-cols-2 gap-6 pt-2">
              {/* 3. RAG Q&A */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 text-left">
                <div className="size-10 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] grid place-items-center">
                  <Search className="size-5" />
                </div>
                <h4 className="text-base font-bold text-[#1B2240]">
                  3. {product.systemCapabilities.ragCapabilities.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                  {product.systemCapabilities.ragCapabilities.description}
                </p>
                <div className="space-y-1.5 pt-1">
                  {product.systemCapabilities.ragCapabilities.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-400 font-normal">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Document Comparison */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 text-left">
                <div className="size-10 rounded-2xl bg-blue-500/10 text-blue-600 grid place-items-center">
                  <Layers className="size-5" />
                </div>
                <h4 className="text-base font-bold text-[#1B2240]">
                  4. {product.systemCapabilities.documentComparison.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                  {product.systemCapabilities.documentComparison.description}
                </p>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-400 font-normal space-y-1">
                  <p className="font-semibold text-slate-600">Key Deviation Highlights:</p>
                  <p>• Indemnity caps & uncapped liabilities</p>
                  <p>• Dispute resolution & arbitration seat differences</p>
                  <p>• Modified termination triggers & notice periods</p>
                </div>
              </div>

              {/* 5. Report Generation */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 text-left">
                <div className="size-10 rounded-2xl bg-violet-500/10 text-violet-600 grid place-items-center">
                  <FileText className="size-5" />
                </div>
                <h4 className="text-base font-bold text-[#1B2240]">
                  5. {product.systemCapabilities.reportGeneration.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                  {product.systemCapabilities.reportGeneration.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {product.systemCapabilities.reportGeneration.formats.map((fmt, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200 text-xs font-bold">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>

              {/* 6. Authentication, Admin & Billing Lifecycle */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3 text-left">
                <div className="size-10 rounded-2xl bg-emerald-500/10 text-emerald-600 grid place-items-center">
                  <ShieldCheck className="size-5" />
                </div>
                <h4 className="text-base font-bold text-[#1B2240]">
                  6. {product.systemCapabilities.adminAndBilling.title}
                </h4>
                <div className="space-y-2 pt-1">
                  {product.systemCapabilities.adminAndBilling.features.map((feat, idx) => (
                    <div key={idx} className="text-xs text-slate-400 font-normal">
                      <span className="font-semibold text-slate-600">{feat.name}:</span> {feat.desc}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ─── Architectural Capabilities Deep-Dive Section ─── */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200/80">
        <div className="container-1280 px-4">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF6B00]">
              WHY {product.name.toUpperCase()}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B2240] tracking-tight">
              Engineered for Speed, Reliability & Enterprise Scale
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore key architectural modules that set {product.name} apart. Click any capability to view technical mechanics.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Capability Accordion */}
            <div className="lg:col-span-6 space-y-3">
              {product.interactiveCapabilities.map((cap, i) => {
                const isActive = activeCapability === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveCapability(i)}
                    className={`rounded-2xl border p-5 cursor-pointer transition-all duration-200 text-left ${
                      isActive
                        ? "bg-white border-[#FF6B00]/40 shadow-sm ring-1 ring-[#FF6B00]/20"
                        : "bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm sm:text-base font-bold transition-colors ${
                            isActive ? "text-[#1B2240]" : "text-slate-700"
                          }`}>
                            {cap.title}
                          </span>
                          <span className="text-[0.68rem] font-bold px-2 py-0.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00]">
                            {cap.badge}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-400">
                          {cap.subtitle}
                        </p>
                      </div>

                      <div className={`size-6 rounded-full grid place-items-center text-xs font-bold transition-colors shrink-0 ${
                        isActive ? "bg-[#FF6B00] text-white" : "bg-slate-200/80 text-slate-500"
                      }`}>
                        {i + 1}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed mt-2.5">
                      {cap.description}
                    </p>

                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
                          <CheckCircle className="size-3.5" /> {cap.metrics}
                        </span>
                        <span className="text-slate-400 text-[0.7rem]">Active Module</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column: Dynamic Spotlight Container */}
            <div className="lg:col-span-6 sticky top-28">
              <div className="rounded-3xl bg-[#1B2240] text-white p-7 space-y-6 shadow-xl border border-slate-700/60">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
                  <div>
                    <span className="text-xs font-mono text-[#FF6B00] uppercase font-bold tracking-wider">
                      Module Spotlight
                    </span>
                    <h3 className="text-xl font-extrabold text-white mt-0.5">
                      {currentCap.title}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-slate-200">
                    {currentCap.badge}
                  </span>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/10 space-y-2">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Core Functional Metric
                    </p>
                    <p className="text-2xl font-extrabold text-emerald-400">
                      {currentCap.metrics}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentCap.previewNote}
                    </p>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-[#FF6B00] shrink-0" />
                      <span>Zero third-party vendor lock-in — runs directly on your server</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-[#FF6B00] shrink-0" />
                      <span>Modular component structure for painless custom feature additions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="size-4 text-[#FF6B00] shrink-0" />
                      <span>Full TypeScript type definitions and production schemas</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#buy-source-code"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#FF6B00] hover:bg-[#E05300] text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
                  >
                    Buy Full Source Code with this Module <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Production Features Bento Grid ─── */}
      <section className="py-16 md:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="container-1280 px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF6B00]">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B2240] tracking-tight">
              Production-Tested Features Built for Scale
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every capability is engineered to enterprise standards so you can launch a robust, reliable service immediately.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-[#FF6B00]/40 hover:shadow-md transition-all duration-200 space-y-3 text-left"
                >
                  <div className="size-11 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] grid place-items-center">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#1B2240]">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 100% White-Label & Commercial Rights Section ─── */}
      <section className="py-16 md:py-24 bg-[#0B0F19] text-white border-b border-slate-800">
        <div className="container-1280 px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF6B00]">
              COMMERCIAL RIGHTS & REBRANDING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              100% White-Label Ownership. Zero Monthly Fees.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              You receive full commercial rights to rebrand, customize, host on your infrastructure, and charge clients recurring fees with zero royalties.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.whiteLabel.map((wl, i) => {
              const Icon = wl.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all space-y-3 text-left"
                >
                  <div className="size-10 rounded-2xl bg-[#FF6B00]/15 text-[#FF6B00] grid place-items-center">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {wl.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {wl.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 3. Step-by-Step Fresh VPS Deployment Guide ─── */}
      {product.vpsDeploymentGuide && (
        <section id="vps-deployment" className="py-16 md:py-24 bg-[#090D18] text-white border-b border-slate-800 scroll-mt-28">
          <div className="container-1280 px-4 space-y-12">
            
            {/* Header & Overview */}
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B00] flex items-center gap-1.5">
                <Server className="size-4" /> 3. PRODUCTION RUNBOOK
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Step-by-Step Fresh VPS Deployment Guide
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Deploy {product.name} to a brand-new Ubuntu 22.04 / 24.04 LTS VPS (Hetzner, DigitalOcean, AWS EC2, Linode, Vultr, Contabo) in 15 minutes.
              </p>
            </div>

            {/* Overview Matrix Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs">
              <div>
                <span className="text-[0.65rem] text-slate-400 uppercase font-mono font-bold block">Target OS</span>
                <span className="font-bold text-white mt-0.5 block">{product.vpsDeploymentGuide.overview.os}</span>
              </div>
              <div>
                <span className="text-[0.65rem] text-slate-400 uppercase font-mono font-bold block">Process Mgr</span>
                <span className="font-bold text-white mt-0.5 block">{product.vpsDeploymentGuide.overview.processManager}</span>
              </div>
              <div>
                <span className="text-[0.65rem] text-slate-400 uppercase font-mono font-bold block">Reverse Proxy</span>
                <span className="font-bold text-white mt-0.5 block">{product.vpsDeploymentGuide.overview.reverseProxy}</span>
              </div>
              <div>
                <span className="text-[0.65rem] text-slate-400 uppercase font-mono font-bold block">Database</span>
                <span className="font-bold text-white mt-0.5 block">{product.vpsDeploymentGuide.overview.database}</span>
              </div>
              <div>
                <span className="text-[0.65rem] text-slate-400 uppercase font-mono font-bold block">Storage Path</span>
                <span className="font-mono text-slate-200 text-[0.7rem] mt-0.5 block truncate" title={product.vpsDeploymentGuide.overview.storagePath}>
                  {product.vpsDeploymentGuide.overview.storagePath}
                </span>
              </div>
              <div>
                <span className="text-[0.65rem] text-slate-400 uppercase font-mono font-bold block">App Path</span>
                <span className="font-mono text-slate-200 text-[0.7rem] mt-0.5 block truncate" title={product.vpsDeploymentGuide.overview.appPath}>
                  {product.vpsDeploymentGuide.overview.appPath}
                </span>
              </div>
            </div>

            {/* 10 Step Cards */}
            <div className="space-y-4">
              {product.vpsDeploymentGuide.steps.map((st) => (
                <div
                  key={st.stepNumber}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 sm:p-6 space-y-3 hover:border-white/20 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="size-7 rounded-xl bg-[#FF6B00] text-white text-xs font-black grid place-items-center shrink-0">
                        {st.stepNumber}
                      </span>
                      <h3 className="text-base font-bold text-white">
                        {st.title}
                      </h3>
                    </div>
                  </div>

                  {st.description && (
                    <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                      {st.description}
                    </p>
                  )}

                  {st.command && (
                    <CodeSnippetBox code={st.command} language="bash" filename={`Step ${st.stepNumber} Commands`} />
                  )}

                  {st.codeSnippet && (
                    <CodeSnippetBox
                      code={st.codeSnippet.code}
                      language={st.codeSnippet.language}
                      filename={st.codeSnippet.filename}
                    />
                  )}

                  {st.note && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 whitespace-pre-line font-mono">
                      💡 {st.note}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ─── 4. Step-by-Step Redeployment Guide (Updates) ─── */}
      {product.vpsRedeploymentGuide && (
        <section id="vps-redeploy" className="py-16 md:py-24 bg-[#0F1523] text-white border-b border-slate-800 scroll-mt-28">
          <div className="container-1280 px-4 space-y-12">
            
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B00] flex items-center gap-1.5">
                <RefreshCw className="size-4" /> 4. ZERO-DOWNTIME UPDATES
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Step-by-Step Redeployment Guide
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                When you make changes to code, push to Git, or want to deploy updates to your running VPS, use this seamless workflow.
              </p>
            </div>

            {/* Automated 1-Command Redeploy Script Callout */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#FF6B00]/15 to-transparent border border-[#FF6B00]/30 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#FF6B00]">
                <Zap className="size-4.5" />
                <span>Automated 1-Command Redeploy Script (Recommended)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Create <code className="text-emerald-400 bg-black/40 px-1.5 py-0.5 rounded font-mono">{product.vpsRedeploymentGuide.deployScriptFilename}</code> once on your server, make it executable with <code className="text-emerald-400 bg-black/40 px-1.5 py-0.5 rounded font-mono">chmod +x {product.vpsRedeploymentGuide.deployScriptFilename}</code>, and run it anytime with zero downtime!
              </p>

              <CodeSnippetBox
                code={product.vpsRedeploymentGuide.deployScript}
                language="bash"
                filename={product.vpsRedeploymentGuide.deployScriptFilename}
              />
            </div>

            {/* Manual Redeployment Steps Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="size-4 text-emerald-400" />
                Manual Redeployment Steps
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.vpsRedeploymentGuide.manualSteps.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <span className="text-xs font-bold text-white block">{m.step}</span>
                    {m.explanation && <p className="text-[0.72rem] text-slate-400">{m.explanation}</p>}
                    <CodeSnippetBox code={m.command} language="bash" />
                  </div>
                ))}
              </div>
            </div>

            {/* Rollback Plan */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Shield className="size-4 text-rose-400" />
                Emergency Rollback Plan (In case an update fails)
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {product.vpsRedeploymentGuide.rollbackPlan.map((r, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-rose-500/[0.05] border border-rose-500/20 space-y-2">
                    <span className="text-xs font-bold text-rose-300 block">{r.step}</span>
                    {r.explanation && <p className="text-[0.72rem] text-slate-400">{r.explanation}</p>}
                    <CodeSnippetBox code={r.command} language="bash" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ─── One-Time Fixed Price Source Code Purchase Section ─── */}
      <section id="buy-source-code" className="py-16 md:py-24 bg-[#FDFDFC] border-b border-slate-200/80 scroll-mt-24">
        <div className="container-1280 px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF6B00]">
              ONE-TIME FIXED PRICE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1B2240] tracking-tight">
              Buy Complete Source Code. Own It Forever.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              No recurring subscriptions, no per-seat fees, zero royalties. You get the full production codebase with complete commercial white-label license.
            </p>
          </div>

          {/* Expert-designed Single Fixed Price Card */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden">
            {/* Header banner */}
            <div className="bg-[#1B2240] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] font-bold">
                  {product.sourceCodeOffer.licenseName}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {product.name} Full Source Code
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {product.sourceCodeOffer.deliveryMethod}
                </p>
              </div>

              {/* Price Tag */}
              <div className="text-left sm:text-right shrink-0">
                <div className="flex items-baseline sm:justify-end gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">
                    ₹{product.sourceCodeOffer.fixedPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-base text-slate-400 line-through">
                    ₹{product.sourceCodeOffer.originalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <span className="inline-block mt-1 text-[0.72rem] font-bold px-2.5 py-0.5 rounded-full bg-[#FF6B00] text-white">
                  Save {product.sourceCodeOffer.discountPercentage}% One-Time Fixed Price
                </span>
              </div>
            </div>

            {/* Deliverables Checklist Grid */}
            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                  What's Included in Your Download Package
                </h4>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  {product.sourceCodeOffer.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-500 font-normal">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buy Button with Razorpay Integration */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 text-center">
                <div className="max-w-md mx-auto">
                  <RazorpayBuyButton
                    amount={product.sourceCodeOffer.fixedPrice}
                    productName={product.name}
                    productId={product.id}
                    planName="Source Code License"
                    buttonText={`Buy Full Source Code — ₹${product.sourceCodeOffer.fixedPrice.toLocaleString("en-IN")}`}
                    className="w-full py-4 text-base font-bold"
                  />
                </div>

                <div className="flex items-center justify-center flex-wrap gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Download className="size-3.5 text-emerald-600" /> Instant Code Access
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="size-3.5 text-blue-600" /> Razorpay Verified
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Check className="size-3.5 text-[#FF6B00]" /> Zero Royalties Forever
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interactive FAQ Accordion ─── */}
      <section className="py-16 md:py-20 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="container-1280 max-w-3xl mx-auto px-4">
          <div className="text-center mb-10 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF6B00]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B2240] tracking-tight">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-3">
            {product.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-[#1B2240] leading-snug">
                    {faq.q}
                  </span>
                  <span className="shrink-0 size-7 rounded-full bg-slate-100 grid place-items-center">
                    {openFaq === i ? (
                      <ChevronUp className="size-4 text-slate-600" />
                    ) : (
                      <ChevronDown className="size-4 text-slate-600" />
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-xs sm:text-sm text-slate-400 font-normal leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Explore Other SaaS Products ─── */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200/80">
        <div className="container-1280 px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF6B00]">
                MORE PRODUCTION PLATFORMS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B2240] tracking-tight mt-1">
                Explore Other Verified SaaS Solutions
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF6B00] hover:text-[#E05300] transition-colors"
            >
              View all {getAllProductDetails().length} products <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {otherProducts.map((prod) => (
              <div
                key={prod.id}
                className="group relative rounded-2xl bg-white border border-slate-200/90 hover:border-[#FF6B00]/60 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/70"
              >
                {/* Card Thumbnail Header (16:9 Aspect Ratio) */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={prod.localImg}
                    alt={`${prod.name} Preview`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/30 pointer-events-none" />

                  {/* Top-Left Pill Badge: PREMIUM */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-[0.68rem] font-bold text-white uppercase tracking-wider shadow-sm">
                    <CheckCircle2 className="size-3 text-emerald-400" />
                    <span>{prod.badge}</span>
                  </div>

                  {/* Top-Right Pill Badge: Discount Highlight */}
                  <div className="absolute top-3 right-3 inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#FF6B00] text-white text-xs font-black shadow-md shadow-[#FF6B00]/25">
                    <span>{prod.sourceCodeOffer.discountPercentage}% OFF</span>
                  </div>
                </div>

                {/* Card Body Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  {/* Top Row: Architecture Level & Rating */}
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[0.72rem] font-bold uppercase tracking-wider">
                      <GraduationCap className="size-3.5 text-[#FF6B00]" />
                      <span>ENTERPRISE ARCHITECTURE</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span>4.9</span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <Link
                    to="/products/$productId"
                    params={{ productId: prod.id }}
                    className="group/title block"
                  >
                    <h3 className="text-xl font-bold text-[#1B2240] group-hover/title:text-[#FF6B00] transition-colors leading-tight line-clamp-1">
                      {prod.name}
                    </h3>
                  </Link>

                  {/* Description / Tagline (2 Lines) */}
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 font-normal line-clamp-2 leading-relaxed min-h-[2.5rem]">
                    {prod.tagline}
                  </p>

                  {/* Metadata Row with subtle border divider */}
                  <div className="flex items-center gap-4 py-3 my-3 border-y border-slate-100 text-[0.72rem] text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-slate-400" />
                      <span>FULL SOURCE CODE</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="size-3.5 text-slate-400" />
                      <span>BY SAP DIGITECH</span>
                    </div>
                  </div>

                  {/* Card Footer: Pricing & Explore Action Button */}
                  <div className="flex items-center justify-between pt-1 mt-auto">
                    {/* Left: Pricing details */}
                    <div className="flex flex-col">
                      <span className="line-through text-xs text-slate-400 font-medium">
                        ₹{prod.sourceCodeOffer.originalPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-2xl font-black text-[#1B2240] leading-none mt-0.5">
                        ₹{prod.sourceCodeOffer.fixedPrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2">
                      <a
                        href={prod.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Launch ${prod.name} live application`}
                        className="size-10 rounded-xl bg-slate-100 hover:bg-[#FF6B00] text-slate-600 hover:text-white grid place-items-center transition-all duration-200 border border-slate-200"
                      >
                        <ExternalLink className="size-4" />
                      </a>

                      <Link
                        to="/products/$productId"
                        params={{ productId: prod.id }}
                        className="px-5 py-2.5 rounded-xl bg-[#1B2240] text-white hover:bg-[#FF6B00] font-extrabold text-xs tracking-wider uppercase transition-all duration-200 shadow-sm flex items-center gap-1.5 group/btn"
                      >
                        <span>EXPLORE</span>
                        <ArrowRight className="size-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom Launch Banner ─── */}
      <section className="py-16 md:py-20 bg-[#0B0F19] text-white border-t border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00]/10 via-transparent to-emerald-500/10 pointer-events-none" />
        <div className="container-1280 relative z-10 text-center max-w-3xl mx-auto px-4 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
            READY TO LAUNCH YOUR OWN INSTANCE?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Get the Complete {product.name} Codebase Today
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Full source code, commercial rights, automated Docker scripts, and step-by-step documentation. Launch under your domain within 24 hours.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <RazorpayCheckout
              amount={product.sourceCodeOffer.fixedPrice}
              productName={product.name}
              productId={product.id}
              planName={product.sourceCodeOffer.licenseName}
              buttonText={`Buy Source Code — ₹${product.sourceCodeOffer.fixedPrice.toLocaleString("en-IN")}`}
              icon={<Download className="size-4" />}
              className="px-7 py-3.5"
            />
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            >
              Talk to Engineering Team <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
