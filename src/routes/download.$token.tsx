import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Download, FileArchive, CheckCircle2, ShieldCheck, HardDrive,
  Clock, ArrowLeft, Terminal, AlertTriangle, ExternalLink,
  Layers, Lock, Sparkles, Check, Phone, Mail, HelpCircle,
  FileCode, Server, RefreshCw
} from "lucide-react";
import { Nav, Footer } from "./index";
import { getProductDetail } from "@/lib/productData";
import { toast } from "sonner";

export const Route = createFileRoute("/download/$token")({
  component: CustomerDownloadPage,
  head: () => ({
    meta: [
      { title: "Download Source Code Archive — SAP DigiTech Solutions" },
      { name: "description", content: "Official customer download portal for production SaaS source code packages." },
    ],
  }),
});

interface PackageInfo {
  token: string;
  sessionToken?: string;
  productId: string;
  productName: string;
  version: string;
  fileName: string;
  fileSizeFormatted: string;
  uploadedAt: string;
  downloadCount: number;
  downloadUrl: string;
  customerName?: string;
  customerEmail?: string;
}

function CustomerDownloadPage() {
  const { token } = Route.useParams();
  const [currentToken, setCurrentToken] = useState(token);
  const [pkg, setPkg] = useState<PackageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasStartedDownload, setHasStartedDownload] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPackageInfo = async (targetToken: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/package-info/${targetToken}`);
      const data = await res.json();

      if (data.success && data.package) {
        setPkg(data.package);
        setIsExpired(Boolean(data.isExpired));
        setRemainingSeconds(data.remainingSeconds ?? 0);
      } else {
        setError(data.error || "Download package not found or token is invalid.");
      }
    } catch (err) {
      console.error("Failed to load package info:", err);
      setError("Unable to connect to the download server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentToken) {
      fetchPackageInfo(currentToken);
    }
  }, [currentToken]);

  // Live Countdown ticker
  useEffect(() => {
    if (isExpired || remainingSeconds <= 0) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExpired, remainingSeconds]);

  // Format MM:SS
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeFormatted = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-[#FF6B00]/30 selection:text-white flex flex-col">
      <Nav />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <div className="mb-6">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Back to Products</span>
            </Link>
          </div>

          {loading ? (
            /* Loading State */
            <div className="py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/25 flex items-center justify-center mx-auto mb-4 text-[#FF6B00]">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>
              <h2 className="text-xl font-bold text-white">Verifying Secure Download Token...</h2>
              <p className="text-sm text-slate-400 mt-1">
                Connecting to SAP DigiTech VPS Storage and retrieving archive manifest.
              </p>
            </div>
          ) : error || !pkg ? (
            /* Error / Invalid State */
            <div className="py-16 px-6 rounded-3xl bg-[#0F172A] border border-rose-500/30 text-center max-w-xl mx-auto shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4 text-rose-400">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Download Link Not Found</h2>
              <p className="text-sm text-slate-300 mb-6">
                {error || "This source code download token is either expired, invalid, or the archive was removed."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/products"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                >
                  Browse SaaS Products
                </Link>
                <a
                  href="https://wa.me/917745868073"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact WhatsApp Support</span>
                </a>
              </div>
            </div>
          ) : (
            /* Active Download Portal */
            <div className="space-y-8">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Clean & Malware-Free</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Commercial Source Code License</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono">
                  <Server className="w-3.5 h-3.5" />
                  <span>VPS High-Speed Node</span>
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {pkg.productName} <span className="text-[#FF6B00]">Source Code</span> Package
                </h1>
                <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                  Your full production repository archive has been prepared on our high-speed VPS storage. 
                  Includes unminified source code, Docker configs, database schemas, and commercial license.
                </p>
              </div>

              {/* ⚠️ CRITICAL 5-MINUTE LIVE COUNTDOWN BANNER */}
              <div
                className={`p-5 rounded-3xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all shadow-xl ${
                  isExpired
                    ? "bg-rose-950/40 border-rose-500/50"
                    : remainingSeconds < 60
                    ? "bg-orange-950/50 border-orange-500/60 animate-pulse"
                    : "bg-[#111C35] border-[#FF6B00]/30"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      isExpired
                        ? "bg-rose-500/20 text-rose-400"
                        : "bg-[#FF6B00]/20 text-[#FF6B00]"
                    }`}
                  >
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        {isExpired ? "Download Window Expired" : "Secure Time-Bound Access"}
                      </span>
                      <span
                        className={`font-mono text-sm font-black px-2.5 py-0.5 rounded-full ${
                          isExpired
                            ? "bg-rose-500/20 text-rose-300"
                            : remainingSeconds < 60
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-[#FF6B00]/20 text-orange-300"
                        }`}
                      >
                        {isExpired ? "00:00 EXPIRED" : timeFormatted}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      {isExpired
                        ? "This secure download link expired after 5 minutes. For software license protection, links cannot be re-generated automatically."
                        : "Each download link is active for 5 minutes only. Download your source code archive now."}
                    </p>
                  </div>
                </div>

                {isExpired && (
                  <div className="shrink-0 flex items-center">
                    <a
                      href="https://wa.me/917745868073?text=Hello%20SAP%20DigiTech,%20my%20source%20code%20download%20link%20expired.%20Please%20assist."
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Contact Support on WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Centerpiece Download Card */}
              <div className="rounded-3xl bg-gradient-to-b from-[#111C35] to-[#0D1527] border border-white/15 p-6 sm:p-10 shadow-2xl shadow-black/50 relative overflow-hidden">
                {/* Glow Accent */}
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#FF6B00]/15 blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#E05300] flex items-center justify-center text-white shadow-xl shadow-[#FF6B00]/25 shrink-0">
                      <FileArchive className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-[#FF6B00]/20 text-orange-300 font-bold">
                          {pkg.version}
                        </span>
                        <span className="text-xs text-slate-400">Release Archive</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white font-mono mt-1" title={pkg.fileName}>
                        {pkg.fileName}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                        <span>Size: <strong className="text-white">{pkg.fileSizeFormatted}</strong></span>
                        <span>•</span>
                        <span>SHA-256 Validated</span>
                      </div>
                    </div>
                  </div>

                  {/* Primary Download CTA */}
                  <div className="flex flex-col sm:items-end gap-2 shrink-0">
                    {isExpired ? (
                      <div className="text-center sm:text-right">
                        <span className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Link Expired (5-Min Window Elapsed)</span>
                        </span>
                      </div>
                    ) : (
                      <a
                        href={`/api/download/${currentToken}`}
                        download={pkg.fileName}
                        onClick={() => setHasStartedDownload(true)}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#E05300] text-white font-bold text-base hover:brightness-110 active:scale-98 transition-all shadow-xl shadow-[#FF6B00]/30 cursor-pointer"
                      >
                        <Download className="w-5 h-5" />
                        <span>Download Full Source Code (.ZIP)</span>
                      </a>
                    )}
                    <span className="text-[11px] text-slate-400 text-center sm:text-right">
                      Direct VPS Stream • Unlimited Bandwidth
                    </span>
                  </div>
                </div>

                {hasStartedDownload && !isExpired && (
                  <div className="mt-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Your download has started! Check your browser's download manager.</span>
                  </div>
                )}

                {/* Metadata details row */}
                <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">Format</span>
                    <span className="text-slate-200 font-mono font-medium">Standard ZIP Archive</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">Security</span>
                    <span className="text-emerald-400 font-medium">5-Min Auto-Expiring</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">License Type</span>
                    <span className="text-emerald-400 font-medium">Lifetime Ownership</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block uppercase font-semibold text-[10px] tracking-wider">Support</span>
                    <span className="text-slate-200 font-medium">Priority Developer Setup</span>
                  </div>
                </div>
              </div>

              {/* What's Included Section */}
              <div className="rounded-3xl bg-[#0F172A] border border-white/10 p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6B00]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">What is Included in this Release?</h2>
                    <p className="text-xs text-slate-400">Everything needed to host, rebrand, customize, and commercialize this software.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Production Frontend Application",
                      desc: "Clean React 19 / Vite source code, fully typed with TypeScript, responsive UI/UX, and theme tokens.",
                      icon: FileCode,
                    },
                    {
                      title: "Backend API & Services",
                      desc: "Node.js / Express backend with authentication, session handling, rate limiting, and business logic.",
                      icon: Server,
                    },
                    {
                      title: "Database Schemas & Migrations",
                      desc: "Production-ready database initialization scripts with seed templates and automated indexing.",
                      icon: HardDrive,
                    },
                    {
                      title: "Automated Docker Deployment",
                      desc: "One-click `docker-compose.yml` for local staging and instant production VPS rollouts.",
                      icon: Terminal,
                    },
                    {
                      title: "Commercial Source Code License",
                      desc: "100% royalty-free rights to modify, deploy under your own company brand, and bill end clients.",
                      icon: Sparkles,
                    },
                    {
                      title: "Architecture & Integration Docs",
                      desc: "Step-by-step setup walkthrough, API endpoint collections, and environment configuration templates.",
                      icon: ShieldCheck,
                    },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="p-4 rounded-2xl bg-[#070D1A] border border-white/5 flex items-start gap-3.5">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6B00] shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Setup Instructions */}
              <div className="rounded-3xl bg-[#0F172A] border border-white/10 p-6 sm:p-8 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>3-Step Quickstart Guide</span>
                </h3>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-[#070D1A] border border-white/5">
                    <span className="text-slate-500"># 1. Unzip the code archive</span>
                    <p className="text-emerald-300 mt-1">unzip {pkg.fileName} -d ./{pkg.productId}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#070D1A] border border-white/5">
                    <span className="text-slate-500"># 2. Configure environment variables</span>
                    <p className="text-emerald-300 mt-1">cp .env.example .env</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#070D1A] border border-white/5">
                    <span className="text-slate-500"># 3. Launch via Docker or Node</span>
                    <p className="text-emerald-300 mt-1">docker compose up -d --build</p>
                  </div>
                </div>
              </div>

              {/* Support & Assistance Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1B2240] to-[#11162A] border border-white/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Need deployment assistance or custom engineering?</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Our engineering team offers turnkey VPS deployments, custom branding, and feature extensions.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="https://wa.me/917745868073"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp Helpdesk</span>
                  </a>
                  <a
                    href="mailto:sapdigitechsolutions@gmail.com"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Support</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
