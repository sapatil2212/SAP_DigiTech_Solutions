import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Download, FileArchive, CheckCircle2, ShieldCheck, HardDrive,
  Clock, ArrowLeft, Terminal, AlertTriangle,
  Layers, Sparkles, Phone, Mail,
  FileCode, Server, RefreshCw
} from "lucide-react";
import { Footer } from "./index";

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
  const [currentToken] = useState(token);
  const [pkg, setPkg] = useState<PackageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasStartedDownload, setHasStartedDownload] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(300);

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
    <div className="min-h-screen bg-slate-50/70 text-slate-900 font-sans selection:bg-[#FF6B00]/20 selection:text-[#FF6B00] flex flex-col">
      {/* Dedicated Portal Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo/sap_logo.png"
              alt="SAP DigiTech Solutions"
              className="h-8 sm:h-9 object-contain"
            />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://wa.me/917745868073"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Phone className="size-3.5 text-emerald-600" />
              <span>WhatsApp Helpdesk</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <div className="mb-6">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="size-3.5 text-[#FF6B00]" />
              <span>Back to Products</span>
            </Link>
          </div>

          {loading ? (
            /* Loading State */
            <div className="py-24 text-center bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8">
              <div className="size-14 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center mx-auto mb-4 text-[#FF6B00]">
                <RefreshCw className="size-7 animate-spin" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Verifying Secure Download Token...</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Connecting to SAP DigiTech VPS Storage and retrieving archive manifest.
              </p>
            </div>
          ) : error || !pkg ? (
            /* Error / Invalid State */
            <div className="py-16 px-6 rounded-3xl bg-white border border-rose-200 text-center max-w-lg mx-auto shadow-sm">
              <div className="size-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-4 text-rose-500">
                <AlertTriangle className="size-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-1.5">Download Link Not Found</h2>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                {error || "This source code download token is either expired, invalid, or the archive was removed."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <Link
                  to="/products"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                >
                  Browse SaaS Products
                </Link>
                <a
                  href="https://wa.me/917745868073?text=Hello%20SAP%20DigiTech,%20my%20source%20code%20download%20token%20is%20invalid.%20Please%20assist."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone className="size-3.5" />
                  <span>Contact WhatsApp Support</span>
                </a>
              </div>
            </div>
          ) : (
            /* Active Download Portal (Clean Light Theme) */
            <div className="space-y-6">
              {/* Title & Description */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {pkg.productName} <span className="text-[#FF6B00]">Source Code</span> Package
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
                  Your full production repository archive has been prepared on our high-speed VPS storage node.
                  Includes unminified frontend & backend source code, Docker configs, and setup documentation.
                </p>
              </div>

              {/* 5-MINUTE LIVE COUNTDOWN CARD (Clean Light Card) */}
              {/* 5-MINUTE LIVE COUNTDOWN CARD (Single Horizontal Line) */}
              <div
                className={`px-4 py-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-all ${
                  isExpired
                    ? "bg-rose-50 border-rose-200 text-rose-900"
                    : remainingSeconds < 60
                    ? "bg-orange-50 border-orange-300 text-orange-900"
                    : "bg-amber-50/70 border-amber-200 text-amber-900"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-wrap sm:flex-nowrap">
                  <div
                    className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isExpired
                        ? "bg-rose-100 text-rose-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    <Clock className="size-4" />
                  </div>
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded border shrink-0 ${
                      isExpired
                        ? "bg-rose-100 border-rose-300 text-rose-700"
                        : remainingSeconds < 60
                        ? "bg-orange-100 border-orange-300 text-orange-700"
                        : "bg-white border-amber-300 text-amber-800"
                    }`}
                  >
                    {isExpired ? "00:00 EXPIRED" : timeFormatted}
                  </span>
                  <span className="text-xs text-slate-700 leading-normal">
                    {isExpired
                      ? "This secure download link expired after 5 minutes. Please contact support via WhatsApp below."
                      : "This link is valid for 5 minutes only. Download your archive now."}
                  </span>
                </div>

                {isExpired && (
                  <div className="shrink-0 flex items-center">
                    <a
                      href={`https://wa.me/917745868073?text=Hello%20SAP%20DigiTech,%20my%20source%20code%20download%20link%20for%20${encodeURIComponent(pkg.productName)}%20expired.`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Phone className="size-3.5" />
                      <span>Contact Support on WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Centerpiece Download Card (Light Clean Design) */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="size-14 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#E05300] flex items-center justify-center text-white shadow-md shadow-[#FF6B00]/20 shrink-0">
                      <FileArchive className="size-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-orange-50 text-[#FF6B00] font-bold border border-orange-200">
                          {pkg.version}
                        </span>
                        <span className="text-xs text-slate-400">Official Production Release</span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-mono mt-0.5" title={pkg.fileName}>
                        {pkg.fileName}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 mt-1 font-mono">
                        <span>Size: <strong className="text-slate-800">{pkg.fileSizeFormatted}</strong></span>
                        <span>•</span>
                        <span>SHA-256 Validated</span>
                      </div>
                    </div>
                  </div>

                  {/* Primary Download CTA */}
                  <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                    {isExpired ? (
                      <div className="text-center sm:text-right">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                          <AlertTriangle className="size-4 text-rose-500" />
                          <span>Link Expired (5-Min Elapsed)</span>
                        </span>
                      </div>
                    ) : (
                      <a
                        href={`/api/download/${currentToken}`}
                        download={pkg.fileName}
                        onClick={() => setHasStartedDownload(true)}
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#E05300] text-white font-bold text-sm shadow-md shadow-[#FF6B00]/20 active:scale-98 transition-all cursor-pointer"
                      >
                        <Download className="size-4.5" />
                        <span>Download Full Source Code (.ZIP)</span>
                      </a>
                    )}
                    <span className="text-[11px] text-slate-400 text-center sm:text-right">
                      Direct VPS Stream • Unlimited Bandwidth
                    </span>
                  </div>
                </div>

                {hasStartedDownload && !isExpired && (
                  <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                    <span>Your download has started! Check your browser's download progress.</span>
                  </div>
                )}

                {/* Metadata details row */}
                <div className="pt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block uppercase font-semibold text-[10px] tracking-wider">Format</span>
                    <span className="text-slate-800 font-mono font-medium">Standard ZIP Archive</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase font-semibold text-[10px] tracking-wider">Security</span>
                    <span className="text-emerald-700 font-semibold">5-Min Auto-Expiring</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase font-semibold text-[10px] tracking-wider">Ownership</span>
                    <span className="text-emerald-700 font-semibold">Full Source Code</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase font-semibold text-[10px] tracking-wider">Support</span>
                    <span className="text-slate-800 font-medium">Developer Helpdesk</span>
                  </div>
                </div>
              </div>

              {/* What's Included Section */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF6B00]">
                    <Layers className="size-4.5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">What is Included in this Package?</h2>
                    <p className="text-xs text-slate-500">Everything needed to host, rebrand, customize, and commercialize this software.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                  {[
                    {
                      title: "Production Frontend Application",
                      desc: "Clean React 19 / Vite source code, typed with TypeScript, responsive UI/UX, and theme tokens.",
                      icon: FileCode,
                    },
                    {
                      title: "Backend API & Services",
                      desc: "Node.js / Express backend with authentication, session handling, and core business logic.",
                      icon: Server,
                    },
                    {
                      title: "Database Schemas & Migrations",
                      desc: "Production database initialization scripts with seed templates and automated indexing.",
                      icon: HardDrive,
                    },
                    {
                      title: "Automated Docker Deployment",
                      desc: "One-click `docker-compose.yml` for staging and instant production VPS rollouts.",
                      icon: Terminal,
                    },
                    {
                      title: "Full Commercial Rebrand Rights",
                      desc: "100% rights to modify, deploy under your own company brand, and bill end clients.",
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
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-start gap-3">
                        <div className="size-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#FF6B00] shrink-0 mt-0.5">
                          <Icon className="size-3.5" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Setup Instructions */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-3.5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Terminal className="size-4 text-emerald-600" />
                  <span>3-Step Quickstart Guide</span>
                </h3>

                <div className="space-y-2.5 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 text-slate-100">
                    <span className="text-slate-400 text-[11px]"># 1. Unzip the code archive</span>
                    <p className="text-emerald-400 mt-0.5">unzip {pkg.fileName} -d ./{pkg.productId}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 text-slate-100">
                    <span className="text-slate-400 text-[11px]"># 2. Configure environment variables</span>
                    <p className="text-emerald-400 mt-0.5">cp .env.example .env</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 text-slate-100">
                    <span className="text-slate-400 text-[11px]"># 3. Launch via Docker or Node</span>
                    <p className="text-emerald-400 mt-0.5">docker compose up -d --build</p>
                  </div>
                </div>
              </div>

              {/* Support & Assistance Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-orange-50/70 via-white to-amber-50/70 border border-orange-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Need deployment assistance or custom engineering?</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Our engineering team offers turnkey VPS deployments, custom branding, and feature extensions.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="https://wa.me/917745868073"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Phone className="size-3.5" />
                    <span>WhatsApp Helpdesk</span>
                  </a>
                  <a
                    href="mailto:sapdigitechsolutions@gmail.com"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    <Mail className="size-3.5" />
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
