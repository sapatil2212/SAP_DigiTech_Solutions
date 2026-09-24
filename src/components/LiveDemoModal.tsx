import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  Copy,
  Check,
  Clock,
  Monitor,
  Play,
  Pause,
  X,
  User,
  Key,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import { getDemoCredentials, type DemoCredentials } from "@/lib/productData";

export interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    url: string;
    tagline?: string;
    badge?: string;
    demoCredentials?: DemoCredentials;
  };
}

export function LiveDemoModal({ isOpen, onClose, product }: LiveDemoModalProps) {
  const [countdown, setCountdown] = useState<number>(10);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<"username" | "password" | "both" | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [hasRedirected, setHasRedirected] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const credentials = getDemoCredentials(product);
  const liveUrl = product.url.startsWith("http://") || product.url.startsWith("https://")
    ? product.url
    : `https://${product.url}`;

  // Reset states when opened
  useEffect(() => {
    if (isOpen) {
      setCountdown(10);
      setIsPaused(false);
      setCopiedField(null);
      setHasRedirected(false);
      setShowPassword(true);
    }
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || isPaused || hasRedirected) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          triggerRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPaused, hasRedirected, liveUrl]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const triggerRedirect = () => {
    if (hasRedirected) return;
    setHasRedirected(true);
    toast.success(`Opening ${product.name} live demo in a new tab...`);

    try {
      const openedWindow = window.open(liveUrl, "_blank", "noopener,noreferrer");
      if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === "undefined") {
        // Fallback if popup was blocked
        window.location.href = liveUrl;
      }
    } catch {
      window.location.href = liveUrl;
    }
  };

  const copyToClipboard = async (text: string, field: "username" | "password" | "both") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      if (field === "username") toast.success("Demo username copied!");
      else if (field === "password") toast.success("Demo password copied!");
      else toast.success("Username and password copied to clipboard!");
      setTimeout(() => setCopiedField(null), 2500);
    } catch {
      toast.error("Failed to copy. Please select and copy manually.");
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-10 my-auto text-left"
          >
            {/* Header Content */}
            <div className="p-5 sm:p-6 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[0.68rem] font-bold text-[#FF6B00] uppercase tracking-wider">
                    <Monitor className="size-3" />
                    <span>Live Interactive Sandbox</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1B2240] tracking-tight">
                    Launch {product.name} Demo
                  </h3>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed">
                    Use the pre-configured credentials below to test full administrative and member capabilities.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 grid place-items-center transition-colors cursor-pointer shrink-0 mt-0.5"
                  aria-label="Close dialog"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              {/* 10-Second Auto Redirect Progress Bar */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#1B2240] font-medium">
                    <Clock className="size-3.5 text-[#FF6B00] animate-pulse" />
                    <span>
                      {hasRedirected ? (
                        <span className="text-emerald-600 font-bold">Demo window opened in new tab</span>
                      ) : (
                        <>
                          Redirecting to live app in{" "}
                          <span className="font-extrabold text-[#FF6B00]">{countdown}s</span>
                        </>
                      )}
                    </span>
                  </div>

                  {!hasRedirected && (
                    <button
                      type="button"
                      onClick={() => setIsPaused(!isPaused)}
                      className="inline-flex items-center gap-1 text-[0.68rem] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-colors cursor-pointer"
                    >
                      {isPaused ? (
                        <>
                          <Play className="size-2.5 text-emerald-600" />
                          <span>Resume</span>
                        </>
                      ) : (
                        <>
                          <Pause className="size-2.5 text-slate-500" />
                          <span>Pause</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Animated Progress Track */}
                <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#FF6B00]"
                    initial={{ width: "100%" }}
                    animate={{ width: `${(countdown / 10) * 100}%` }}
                    transition={{ duration: isPaused ? 0 : 1, ease: "linear" }}
                  />
                </div>
              </div>

              {/* Demo Credentials Box */}
              <div className="space-y-2 pt-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                    One-Click Sandbox Login Details
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `Username: ${credentials.username}\nPassword: ${credentials.password}\nURL: ${liveUrl}`,
                        "both"
                      )
                    }
                    className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-[#FF6B00] hover:underline cursor-pointer"
                  >
                    {copiedField === "both" ? (
                      <>
                        <Check className="size-3 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied Both!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy Both</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Username / Email Field */}
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="size-7 rounded-lg bg-slate-100 text-slate-600 grid place-items-center shrink-0">
                      <User className="size-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[0.62rem] uppercase font-bold text-slate-400 block leading-tight">Username / Email</span>
                      <p className="text-xs font-mono font-semibold text-[#1B2240] truncate select-all leading-snug">
                        {credentials.username}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(credentials.username, "username")}
                    title="Copy Username"
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#FF6B00] text-slate-600 hover:text-white transition-all cursor-pointer shrink-0"
                  >
                    {copiedField === "username" ? (
                      <Check className="size-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>

                {/* Password Field */}
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="size-7 rounded-lg bg-slate-100 text-slate-600 grid place-items-center shrink-0">
                      <Key className="size-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[0.62rem] uppercase font-bold text-slate-400 block leading-tight">Password</span>
                      <p className="text-xs font-mono font-semibold text-[#1B2240] truncate select-all leading-snug">
                        {showPassword ? credentials.password : "••••••••••••"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? "Hide password" : "Show password"}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(credentials.password, "password")}
                      title="Copy Password"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#FF6B00] text-slate-600 hover:text-white transition-all cursor-pointer"
                    >
                      {copiedField === "password" ? (
                        <Check className="size-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Destination URL */}
              <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-slate-50 text-[0.72rem] text-slate-500 border border-slate-100">
                <span className="truncate font-medium">
                  Destination: <span className="text-slate-800 font-semibold">{liveUrl}</span>
                </span>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF6B00] hover:underline font-bold shrink-0 flex items-center gap-1"
                >
                  <span>Open URL</span>
                  <ExternalLink className="size-2.5" />
                </a>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-5 py-3.5 sm:px-6 bg-slate-50/80 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer text-center"
              >
                Keep Page Open
              </button>

              <button
                type="button"
                onClick={triggerRedirect}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#FF6B00] hover:bg-[#E05300] text-white text-xs font-bold tracking-wide shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Launch Live Demo Now</span>
                <ExternalLink className="size-3" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ─────────────────────── Live Demo Trigger Button Component ─────────────────────── */
export interface LiveDemoButtonProps {
  product: {
    id: string;
    name: string;
    url: string;
    tagline?: string;
    badge?: string;
    demoCredentials?: DemoCredentials;
  };
  variant?: "hero" | "pricing" | "dark" | "card";
  className?: string;
  buttonText?: string;
}

export function LiveDemoButton({
  product,
  variant = "hero",
  className = "",
  buttonText = "Live Demo",
}: LiveDemoButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  let variantClasses = "";
  if (variant === "hero") {
    variantClasses =
      "h-12 px-6 py-3.5 rounded-full font-bold text-sm bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200/90 hover:border-[#FF6B00] hover:text-[#FF6B00] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer";
  } else if (variant === "pricing") {
    variantClasses =
      "w-full py-4 px-6 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 text-[#1B2240] border-2 border-slate-300 hover:border-[#FF6B00] hover:text-[#FF6B00] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer";
  } else if (variant === "dark") {
    variantClasses =
      "px-7 py-3.5 rounded-full font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-[#FF6B00] hover:text-[#FF6B00] transition-all flex items-center justify-center gap-2 cursor-pointer";
  } else if (variant === "card") {
    variantClasses =
      "px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-[#FF6B00] text-slate-700 hover:text-white font-bold text-xs transition-all border border-slate-200 flex items-center gap-1.5 cursor-pointer";
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        title={`Open ${product.name} Live Demo with Test Credentials`}
        className={`${variantClasses} ${className}`}
      >
        <Monitor className="size-4 shrink-0 text-[#FF6B00]" />
        <span>{buttonText}</span>
      </button>

      <LiveDemoModal isOpen={isOpen} onClose={() => setIsOpen(false)} product={product} />
    </>
  );
}
