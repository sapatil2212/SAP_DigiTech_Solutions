import { createFileRoute, Link } from "@tanstack/react-router";
import { AiSolutions } from "@/components/AiSolutions";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Brain,
  Building2,
  CalendarClock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Cpu,
  Facebook,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Hotel,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Palette,
  Phone,
  Play,
  Quote,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Target,
  TrendingUp,
  Video,
  Wand2,
  Workflow,
  Youtube,
  Zap,
  DollarSign,
  Check,
  X,
  ExternalLink,
  Award,
  Megaphone,
  FileText,
  Calendar,
} from "lucide-react";
import {
  getMegaMenuCategories,
  loadAndSyncCustomProducts,
  type MegaMenuItem,
  type MegaMenuCategory,
} from "@/lib/productData";

export const Route = createFileRoute("/")({
  component: Landing,
});

/* -------------------- Nav -------------------- */

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);

  const [categories, setCategories] = useState<MegaMenuCategory[]>(() => getMegaMenuCategories());

  useEffect(() => {
    loadAndSyncCustomProducts().then(() => {
      setCategories(getMegaMenuCategories());
    });

    const handleUpdate = () => {
      setCategories(getMegaMenuCategories());
    };
    window.addEventListener("sap_products_updated", handleUpdate);
    return () => {
      window.removeEventListener("sap_products_updated", handleUpdate);
    };
  }, []);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [active, setActive] = useState<string>(() => {
    if (typeof window === "undefined") return "home";
    const path = window.location.pathname;
    if (path === "/about") return "about";
    if (path === "/services") return "services";
    if (path.startsWith("/products")) return "products";
    if (path === "/careers") return "careers";
    if (path === "/portfolio") return "portfolio";
    if (path === "/contact") return "contact";
    if (window.location.hash) return window.location.hash.replace("#", "") || "home";
    return "home";
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Home", "/#home", "home"],
    ["About", "/about", "about"],
    ["Services", "/services", "services"],
    ["Products", "/products", "products"],
    ["Portfolio", "/portfolio", "portfolio"],
    ["Careers", "/careers", "careers"],
    ["Contact", "/contact", "contact"],
  ] as const;

  // Sync active nav item with path and hash
  useEffect(() => {
    const syncActive = () => {
      const path = window.location.pathname;
      if (path === "/about") { setActive("about"); return; }
      if (path === "/services") { setActive("services"); return; }
      if (path.startsWith("/products")) { setActive("products"); return; }
      if (path === "/careers") { setActive("careers"); return; }
      if (path === "/portfolio") { setActive("portfolio"); return; }
      if (path === "/contact") { setActive("contact"); return; }
      if (window.location.hash) {
        const h = window.location.hash.replace("#", "");
        if (h) { setActive(h); return; }
      }
      if (path === "/") {
        setActive("home");
      }
    };
    syncActive();
    window.addEventListener("popstate", syncActive);
    window.addEventListener("hashchange", syncActive);
    return () => {
      window.removeEventListener("popstate", syncActive);
      window.removeEventListener("hashchange", syncActive);
    };
  }, []);

  // Handle smooth mouse enter/leave for desktop mega-menu
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setProductsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setProductsOpen(false);
    }, 140);
  };

  const getProductIcon = (id: string) => {
    switch (id) {
      case "briefvault": return <FileText className="size-5" />;
      case "primeinbox": return <Mail className="size-5" />;
      case "nexaleadai": return <Search className="size-5" />;
      case "greviewpilot": return <Star className="size-5" />;
      case "bookmytime": return <Calendar className="size-5" />;
      case "chatnexgen":
      case "whatsapp-crm": return <MessageCircle className="size-5" />;
      case "aihospitalerp": return <HeartPulse className="size-5" />;
      case "mediadocks":
      case "medicdocks": return <Video className="size-5" />;
      default: return <Sparkles className="size-5" />;
    }
  };

  return (
    <>
      {/* Backdrop overlay when product dropdown is open */}
      <AnimatePresence>
        {(productsOpen || open) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/15 backdrop-blur-[2px]"
            onClick={() => {
              setProductsOpen(false);
              setOpen(false);
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
      <div className="container-1280">
        <div
          className={`flex items-center justify-between rounded-full px-4 md:px-6 transition-all duration-300 ${
            scrolled ? "glass py-2" : "glass py-2.5"
          }`}
        >
          <a href="/#home" className="flex items-center">
            <img
              src="/logo/sap_logo.png"
              alt="SAP DigiTech Solutions Logo"
              className={`object-contain transition-all duration-300 ${
                scrolled ? "h-7" : "h-8 md:h-9"
              }`}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 relative">
            {links.map(([label, href, id]) => {
              const isActive = active === id;

              if (id === "products") {
                return (
                  <div
                    key={label}
                    ref={menuContainerRef}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setProductsOpen((v) => !v)}
                      aria-expanded={productsOpen}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative px-3.5 py-2 text-[0.875rem] font-medium transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-0 outline-none ${
                        isActive || productsOpen ? "text-[#1B2240]" : "text-navy/60 hover:text-[#1B2240]"
                      }`}
                    >
                      {(isActive || productsOpen) && (
                        <motion.span
                          layoutId="nav-active-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-navy/[0.06] border border-navy/10"
                        />
                      )}
                      <span className="relative z-10">{label}</span>
                      <ChevronDown
                        className={`size-3.5 relative z-10 transition-transform duration-200 ${
                          productsOpen ? "rotate-180 text-[#FF6B00]" : "text-navy/60"
                        }`}
                      />
                    </button>

                    {/* Cashfree-style Products Mega Menu Dropdown */}
                    <AnimatePresence>
                      {productsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[780px] rounded-3xl bg-white border border-slate-200 product-nav-dropdown p-6 z-50 text-left before:content-[''] before:absolute before:-top-4 before:left-0 before:right-0 before:h-4"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="grid grid-cols-2 gap-6">
                            {categories.map((cat, idx) => (
                              <div key={idx} className="space-y-1">
                                {cat.items.map((prod) => (
                                    <Link
                                      key={prod.id}
                                      to={prod.url}
                                      onClick={() => setProductsOpen(false)}
                                      className="group flex items-start gap-3.5 p-3 rounded-2xl hover:bg-[#FF6B00]/[0.05] transition-all duration-200"
                                    >
                                      <div className="size-10 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-white transition-all duration-200 grid place-items-center shrink-0">
                                        {getProductIcon(prod.id)}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-bold text-[#1B2240] group-hover:text-[#FF6B00] transition-colors">
                                            {prod.name}
                                          </span>
                                          <span className="text-[0.62rem] font-bold px-1.5 py-0.5 rounded-full bg-[#FF6B00]/10 text-[#FF6B00]">
                                            {prod.badge}
                                          </span>
                                        </div>
                                        <p className="text-xs text-slate-500 leading-snug line-clamp-1 mt-0.5 group-hover:text-slate-700 transition-colors">
                                          {prod.tagline}
                                        </p>
                                      </div>
                                    </Link>
                                  ))}
                              </div>
                            ))}
                          </div>

                          {/* Mega-menu footer strip */}
                          <div className="flex items-center justify-end pt-3 mt-3 border-t border-slate-100 text-xs">
                            <Link
                              to="/products"
                              onClick={() => setProductsOpen(false)}
                              className="font-bold text-[#FF6B00] hover:text-[#E05300] flex items-center gap-1.5 transition-colors group"
                            >
                              View All
                              <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={label}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3.5 py-2 text-[0.875rem] font-medium transition-colors ${
                    isActive ? "text-navy" : "text-navy/60 hover:text-navy"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-navy/[0.06] border border-navy/10"
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/contact"
              className={`btn-primary ${scrolled ? "h-10 text-[0.85rem]" : "h-11"} hidden sm:inline-flex`}
            >
              Book Strategy Call
              <ArrowRight className="size-4" />
            </a>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden size-10 grid place-items-center rounded-full hairline bg-white/70"
            >
              <div className="flex flex-col gap-1">
                <span className={`h-0.5 w-4 bg-navy transition-all ${open ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`h-0.5 w-4 bg-navy transition-all ${open ? "opacity-0" : ""}`} />
                <span className={`h-0.5 w-4 bg-navy transition-all ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden mt-2 bg-white border border-slate-200 product-nav-dropdown rounded-3xl p-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex flex-col">
                {links.map(([label, href, id]) => {
                  if (id === "products") {
                    return (
                      <div key={label} className="border-b border-hairline py-2">
                        <button
                          type="button"
                          onClick={() => setMobileProductsOpen((v) => !v)}
                          className="w-full flex items-center justify-between py-2 text-sm font-medium text-navy text-left"
                        >
                          <span className="flex items-center gap-2">
                            {label}
                          </span>
                          <ChevronDown
                            className={`size-4 transition-transform ${mobileProductsOpen ? "rotate-180 text-[#FF6B00]" : ""}`}
                          />
                        </button>
                        {mobileProductsOpen && (
                          <div className="space-y-1.5 pl-2 pt-2 pb-1">
                            {categories.flatMap((cat) => cat.items).map((prod: MegaMenuItem) => (
                              <Link
                                key={prod.id}
                                to={prod.url}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                              >
                                <div className="size-7 rounded-lg bg-[#FF6B00]/10 text-[#FF6B00] grid place-items-center shrink-0">
                                  {getProductIcon(prod.id)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-navy truncate">{prod.name}</p>
                                  <p className="text-[0.68rem] text-slate-500 truncate">{prod.tagline}</p>
                                </div>
                              </Link>
                            ))}
                            <Link
                              to="/products"
                              onClick={() => setOpen(false)}
                              className="block text-center py-2 text-xs font-bold text-[#FF6B00] hover:underline"
                            >
                              View All →
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="px-3 py-3 text-sm font-medium text-navy border-b border-hairline last:border-0"
                    >
                      {label}
                    </a>
                  );
                })}
                <a href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-3">
                  Book Strategy Call <ArrowRight className="size-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </motion.header>
    </>
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = 1600;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{n.toLocaleString()}{suffix}</>;
}

function HeroImage() {
  return (
    <div className="relative w-full">
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <img
          src="/assets/hero/Hero1.png"
          alt="SAP DigiTech Solutions Platform Dashboard"
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </div>
  );
}

const heroHeadlines = [
  { line1: "Marketing Beyond", line2: "Campaigns." },
  { line1: "Automation Beyond", line2: "Boundaries." },
  { line1: "Intelligence Beyond", line2: "Expectations." },
];

function Hero() {
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % heroHeadlines.length);
    }, 4800);
    return () => clearInterval(timer);
  }, []);

  const logos = [
    { name: "Prakruti", src: "/assets/work/logo/prakruti.png" },
    { name: "Trade Bharat", src: "/assets/work/logo/Trade Bharat.png" },
    { name: "OK Kirana", src: "/assets/work/logo/OK_Kirana.png" },
    { name: "Arya Foods", src: "/assets/work/logo/Arya_Foods.png" },
    { name: "Key Tech", src: "/assets/work/logo/Key_Tech.png" },
    { name: "Jain Bakers", src: "/assets/work/logo/Jain_Bakers _logo.png" },
    { name: "Pyramid Agro", src: "/assets/work/logo/pyramid-agro-logo.png" },
    { name: "Nexa Lead AI", src: "/assets/work/logo/nexa-lead-ai-logo.png" },
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-24 sm:pt-32 md:pt-40 pb-8 md:pb-12">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F9F7F4] via-[#FFF0E8]/60 to-[#F9F7F4]" />
      {/* Animated blobs — subtle, not overwhelming */}
      <motion.div
        animate={{ x: [0, 25, 0], y: [0, -18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-24 size-[480px] rounded-full bg-[#FF6B00]/6 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 22, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute -top-10 right-0 size-[360px] rounded-full bg-[#1B2240]/5 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, -12, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 size-96 rounded-full bg-[#FF6B00]/5 blur-3xl pointer-events-none"
      />
      {/* Faint grid */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <svg
          className="w-full h-full opacity-40 stroke-[#1B2240]/10 fill-none"
          style={{
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)"
          }}
        >
          <defs>
            <pattern id="hero-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>
      <div className="container-1280 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="relative min-h-[4.75rem] sm:min-h-[6.8rem] md:min-h-[8.2rem] lg:min-h-[9rem] flex items-center w-full">
              <AnimatePresence>
                <motion.h1
                  key={headlineIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(6px)", position: "absolute" }}
                  transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.25rem] font-extrabold leading-[1.05] tracking-tight text-navy left-0 top-0 w-full"
                >
                  {heroHeadlines[headlineIndex].line1}<br className="hidden sm:inline" />{" "}
                  <span className="gradient-text">{heroHeadlines[headlineIndex].line2}</span>
                </motion.h1>
              </AnimatePresence>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-1 sm:mt-2 text-sm sm:text-xl font-bold leading-snug tracking-tight text-navy/85 max-w-xl"
            >
              Building smarter businesses with strategy, AI & digital growth.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-1.5 sm:mt-3 text-xs sm:text-base leading-relaxed text-muted-foreground max-w-xl font-normal"
            >
              We combine performance marketing, AI automation and design to build growth
              engines for ambitious brands. Not <br className="sm:hidden" />campaigns that expire — systems that
              compound.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              <a href="/contact" className="btn-primary animate-pulse-ring">
                Book Strategy Call <ArrowRight className="size-4" />
              </a>
              <a href="/portfolio" className="btn-ghost !border-navy/70 hover:!border-navy hover:!bg-navy/5">
                <Play className="size-4" /> View Portfolio
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5 w-full flex justify-center">
            <HeroImage />
          </div>
        </div>

        {/* Shipped Trust Marquee */}
        <div className="mt-7 sm:mt-10 border-t border-hairline pt-4 sm:pt-6">
          <p className="text-center text-[0.72rem] uppercase tracking-[0.2em] font-semibold text-muted-foreground">
            Trusted by ambitious brands across industries
          </p>
          <div className="mt-5 relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div className="flex items-center gap-16 animate-marquee hover:[animation-play-state:paused] w-max">
              {[...logos, ...logos].map((l, i) => (
                <img
                  key={i}
                  src={l.src}
                  alt={l.name}
                  className="h-10 md:h-12 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom fade overlay for transparent transition to white/background */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-10 sm:py-14 bg-[#F8FAFC]/50 relative overflow-hidden">
      <div className="container-1280">
        {/* Top Header Block */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start justify-between">
          {/* Left Column */}
          <div className="md:col-span-6 flex flex-col">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-[#2563EB]">
              What We Do
            </span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-950 leading-[1.12] tracking-tight">
              We solve digital <br className="hidden sm:inline" />
              challenges
            </h2>
          </div>

          {/* Right Column */}
          <div className="md:col-span-6 flex flex-col items-start md:pt-6 md:pl-6">
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-normal">
              Together, we help our clients achieve tangible, measurable results.
              Focused on business outcomes, we bring a unique set of expertise
              and skills to the party.
            </p>
            <a
              href="/about"
              className="mt-4 sm:mt-6 inline-flex items-center gap-1.5 text-xs sm:text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-slate-900 border-b-2 border-slate-900 pb-1 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors w-fit cursor-pointer"
            >
              More About Us <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>

        {/* 3-Card Row underneath */}
        <div className="mt-8 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Better audiences */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            className="bg-[#E8E4FA] rounded-2xl sm:rounded-[2rem] p-5 sm:p-7 md:p-8 border border-purple-200/50 hover:shadow-[0_20px_40px_rgba(123,107,245,0.12)] transition-all duration-300 flex flex-col cursor-pointer"
          >
            <div className="flex justify-between items-center w-full mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A]">Better audiences</h3>
              <div className="size-10 sm:size-12 shrink-0 rounded-full bg-white text-[#7B6BF5] border border-purple-100/50 grid place-items-center">
                <Target className="size-4.5 sm:size-6" />
              </div>
            </div>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
              At SAP DigiTech Solutions, we believe that reaching the right audience is the
              cornerstone of any successful digital marketing campaign. Our team of experts
              utilizes advanced targeting techniques to identify and engage with your ideal
              customer base.
            </p>
          </motion.div>

          {/* Card 2: Better analytics */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            className="bg-[#E0F2FE] rounded-2xl sm:rounded-[2rem] p-5 sm:p-7 md:p-8 border border-sky-200/50 hover:shadow-[0_20px_40px_rgba(2,132,199,0.12)] transition-all duration-300 flex flex-col cursor-pointer"
          >
            <div className="flex justify-between items-center w-full mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A]">Better analytics</h3>
              <div className="size-10 sm:size-12 shrink-0 rounded-full bg-white text-[#0284C7] border border-sky-100/50 grid place-items-center">
                <BarChart3 className="size-4.5 sm:size-6" />
              </div>
            </div>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
              Our ultimate goal is to deliver better outcomes for your business. By focusing
              on the right audience and leveraging superior analytics, we drive results that
              matter. From increased brand awareness to higher conversion rates, our strategies
              are designed to achieve your business objectives and deliver a strong return on
              investment (ROI).
            </p>
          </motion.div>

          {/* Card 3: Better outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            className="bg-[#DCFCE7] rounded-2xl sm:rounded-[2rem] p-5 sm:p-7 md:p-8 border border-emerald-200/50 hover:shadow-[0_20px_40px_rgba(5,150,105,0.12)] transition-all duration-300 flex flex-col cursor-pointer"
          >
            <div className="flex justify-between items-center w-full mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A]">Better outcomes</h3>
              <div className="size-10 sm:size-12 shrink-0 rounded-full bg-white text-[#059669] border border-emerald-100/50 grid place-items-center">
                <DollarSign className="size-4.5 sm:size-6" />
              </div>
            </div>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
              At SAP DigiTech Solutions, we deliver superior results through our data-driven and
              customized digital marketing strategies. Our expert team uses advanced tools and
              innovative techniques to ensure measurable improvements in your online presence and
              profitability.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}





/* -------------------- Why Us -------------------- */



/* -------------------- Industries -------------------- */

function Industries() {
  const items = [
    {
      name: "Healthcare",
      Icon: HeartPulse,
      desc: "Clinics, hospitals & wellness brands.",
      bg: "#F0FDF450",
      border: "border-emerald-100/60",
      iconBg: "#059669",
      iconColor: "#FFFFFF",
      titleColor: "text-slate-900",
      descColor: "text-slate-600",
    },
    {
      name: "Hospitality",
      Icon: Hotel,
      desc: "Hotels, restaurants & experiences.",
      bg: "#FBF0D950",
      border: "border-amber-100/60",
      iconBg: "#F5B841",
      iconColor: "#FFFFFF",
      titleColor: "text-slate-900",
      descColor: "text-slate-600",
    },
    {
      name: "Technology",
      Icon: Cpu,
      desc: "SaaS, AI startups & platforms.",
      bg: "#E8E4FA50",
      border: "border-purple-100/60",
      iconBg: "#7B6BF5",
      iconColor: "#FFFFFF",
      titleColor: "text-slate-900",
      descColor: "text-slate-600",
    },
    {
      name: "Education",
      Icon: GraduationCap,
      desc: "Institutes, edtech & academies.",
      bg: "#EEF2FF50",
      border: "border-indigo-100/60",
      iconBg: "#3B82F6",
      iconColor: "#FFFFFF",
      titleColor: "text-slate-900",
      descColor: "text-slate-600",
    },
    {
      name: "Retail",
      Icon: ShoppingBag,
      desc: "D2C brands & modern commerce.",
      bg: "#FCE4E450",
      border: "border-rose-100/60",
      iconBg: "#F58A8A",
      iconColor: "#FFFFFF",
      titleColor: "text-slate-900",
      descColor: "text-slate-600",
    },
    {
      name: "Professional Services",
      Icon: Handshake,
      desc: "Legal, finance & consulting.",
      bg: "#E0F2FE50",
      border: "border-sky-100/60",
      iconBg: "#0284C7",
      iconColor: "#FFFFFF",
      titleColor: "text-slate-900",
      descColor: "text-slate-600",
    },
    {
      name: "Manufacturing",
      Icon: Store,
      desc: "B2B, industrial & OEMs.",
      bg: "#FEF3C750",
      border: "border-yellow-100/60",
      iconBg: "#D97706",
      iconColor: "#FFFFFF",
      titleColor: "text-slate-900",
      descColor: "text-slate-600",
    },
    {
      name: "Real Estate",
      Icon: Building2,
      desc: "Developers, brokers & PropTech.",
      bg: "#F3E8FF50",
      border: "border-violet-100/60",
      iconBg: "#9333EA",
      iconColor: "#FFFFFF",
      titleColor: "text-slate-900",
      descColor: "text-slate-600",
    },
  ];
  return (
    <section className="py-10 sm:py-14 md:py-16 bg-white">
      <div className="container-1280">
        <div className="flex items-end justify-between flex-wrap gap-4 sm:gap-6">
          <div>
            <span className="section-eyebrow">Industries</span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-navy leading-[1.12]">
              Deep expertise across<br /><span className="gradient-text">eight verticals.</span>
            </h2>
          </div>
          <p className="max-w-lg text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
            We speak your customers' language with playbooks refined across hundreds of campaigns. From high-trust healthcare intake systems to high-conversion D2C funnels, we craft tailored digital growth strategies built for market leadership.
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border ${it.border} flex flex-col justify-between transition-shadow duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] cursor-pointer`}
              style={{ background: it.bg }}
            >
              <div>
                <div
                  className="size-10 sm:size-12 rounded-full grid place-items-center shadow-sm"
                  style={{ background: it.iconBg, color: it.iconColor }}
                >
                  <it.Icon className="size-4.5 sm:size-6" />
                </div>
                <p className={`mt-4 sm:mt-5 font-semibold text-base sm:text-lg ${it.titleColor}`}>{it.name}</p>
                <p className={`mt-1 text-xs sm:text-sm ${it.descColor} leading-relaxed font-normal`}>{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



/* -------------------- Portfolio ---------------/* -------------------- WebsiteMockup Component -------------------- */

interface WebsiteMockupProps {
  title: string;
  ind: string;
  url: string;
  gradient?: string;
  localImg?: string;
}

function WebsiteMockup({ title, ind, url, localImg }: WebsiteMockupProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const thumbUrl = localImg || `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=600`;

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, [thumbUrl]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-50">
      {/* Loading website wireframe skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 z-10 bg-slate-100/80 animate-pulse flex flex-col p-4 justify-between">
          {/* Header row skeleton */}
          <div className="flex justify-between items-center w-full">
            <div className="h-3 w-16 bg-slate-200 rounded" />
            <div className="flex gap-1">
              <div className="size-2 bg-slate-200 rounded-full" />
              <div className="size-2 bg-slate-200 rounded-full" />
              <div className="size-2 bg-slate-200 rounded-full" />
            </div>
          </div>

          {/* Hero section skeleton */}
          <div className="space-y-2.5 my-auto flex flex-col items-center">
            <div className="h-4.5 w-3/4 bg-slate-200 rounded-md" />
            <div className="h-3.5 w-1/2 bg-slate-200 rounded" />
          </div>

          {/* Cards grid skeleton */}
          <div className="grid grid-cols-3 gap-2 w-full">
            <div className="h-10 bg-slate-200 rounded" />
            <div className="h-10 bg-slate-200 rounded" />
            <div className="h-10 bg-slate-200 rounded" />
          </div>
        </div>
      )}

      {/* Real screenshot */}
      <img
        ref={imgRef}
        src={thumbUrl}
        alt={`${title} website preview`}
        className={`w-full h-full object-cover object-top transition-opacity duration-750 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
      />

      {/* Fallback on error */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50 text-center px-4">
          <div className="size-10 rounded-full bg-slate-100 border border-slate-200 grid place-items-center mb-2">
            <Globe className="size-4.5 text-slate-500" />
          </div>
          <p className="text-[0.6rem] font-bold tracking-wider uppercase opacity-75">{ind}</p>
          <h4 className="text-sm font-black tracking-tight mt-0.5 leading-tight">{title}</h4>
        </div>
      )}
    </div>
  );
}

const initialProjects = [
  {
    t: "MediNex Plus",
    category: "AI & Automation",
    ind: "Healthcare AI",
    tag: "AI-Powered Medical Booking",
    url: "https://medi-nex-plus-nine.vercel.app/",
    ch: "Medical clinics managing high volume inquiries with slow appointment booking turnarounds and manual follow-ups.",
    sol: "Engineered an automated WhatsApp scheduler and live EHR dashboard integration for instantaneous booking.",
    r: "Live Platform",
    metrics: ["Instant Chat Scheduler", "Automated Intake", "Live Clinic Board"],
    g: "from-blue-600 to-indigo-700",
    color: "#2563EB",
    bg: "#EEF2FF",
    border: "border-blue-100",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-100/50",
    mock: <WebsiteMockup title="MediNex Plus" ind="Healthcare AI" url="https://medi-nex-plus-nine.vercel.app/" localImg="/assets/work/website-preview/medinex.png" />
  },
  {
    t: "Skyline Hotels",
    category: "Marketing & Ads",
    ind: "Hospitality",
    tag: "Direct Bookings Campaign & UX",
    url: "",
    img: "/assets/work/post/01.png",
    ch: "Excessive commissions paid to OTAs eating 20%+ of room revenue. Low direct web traffic and high checkout abandonment rates.",
    sol: "Executed a direct booking guarantee ad strategy on Google & Meta, combined with a high-speed room checkout web engine.",
    r: "42% direct bookings",
    metrics: [
      "Direct room bookings grew from 12% to 42%",
      "Reduced OTA commission payout by 65%",
      "34% increase in desktop and mobile conversion rate",
      "Ad click-to-booking journey reduced to 3 clicks"
    ],
    g: "from-cyan-500/20 to-blue-500/20",
    color: "#0284C7",
    bg: "#F0F9FF",
    border: "border-sky-100",
    badgeBg: "bg-sky-50 text-sky-700 border-sky-100/50",
    mock: (
      <img
        src="/assets/work/post/01.png"
        alt="Skyline Hotels Campaign"
        className="w-full h-full object-cover object-center"
      />
    )
  },
  {
    t: "WhatsApp CRM",
    category: "WhatsApp Automation",
    ind: "AI WhatsApp Automation",
    tag: "AI WhatsApp Automation Platform",
    url: "https://hashtagscrm.com/",
    noEmbed: true,
    localImg: "/assets/work/website-preview/whatsapp-automation.png",
    ch: "Businesses losing high-intent leads due to manual WhatsApp response bottlenecks and slow intake workflows.",
    sol: "Deployed WhatsApp CRM's AI automation engine featuring instant intent resolution, interactive scheduling canvas, and automated CRM sync.",
    r: "Live WhatsApp Automation",
    metrics: ["Instant WhatsApp Bot Engine", "Interactive Customer Intake", "Automated Lead Routing & Broadcasts", "Real-time Analytics Dashboard"],
    g: "from-emerald-600 to-teal-700",
    color: "#059669",
    bg: "#F0FDF4",
    border: "border-emerald-100",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-100/50",
    mock: <WebsiteMockup title="WhatsApp CRM" ind="WhatsApp Automation" url="https://hashtagscrm.com/" localImg="/assets/work/website-preview/whatsapp-automation.png" />
  },
  {
    t: "BrightRetail",
    category: "Marketing & Ads",
    ind: "D2C",
    tag: "High-ROAS TikTok & Meta Ads",
    url: "",
    img: "/assets/work/post/02.png",
    ch: "Rising customer acquisition cost on traditional search channels threatening margins. Static graphic ads yielding low engagement.",
    sol: "Implemented a scale campaign focused on user-generated-content style short-form videos with custom-engineered hook templates.",
    r: "4.6× ROAS at 3× spend",
    metrics: [
      "Achieved a 4.6x Return on Ad Spend (ROAS) on scale budget",
      "Increased monthly marketing spend by 300% profitably",
      "3.2x higher click-through rates (CTR) on creative ads",
      "Average cost-per-purchase dropped by 38%"
    ],
    g: "from-rose-500/20 to-orange-500/20",
    color: "#E11D48",
    bg: "#FFF1F2",
    border: "border-rose-100",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-100/50",
    mock: (
      <img
        src="/assets/work/post/02.png"
        alt="BrightRetail TikTok Campaign"
        className="w-full h-full object-cover object-center"
      />
    )
  },
  {
    t: "AeroBrand Campaigns",
    category: "Marketing & Ads",
    ind: "Aviation",
    tag: "High-Engagement Visual Creative",
    url: "",
    img: "/assets/work/post/03.png",
    ch: "Low organic reach and high branding fatigue across digital social media channels.",
    sol: "Produced a set of customized visual creatives and narrative ads focused on passenger comfort and route frequency.",
    r: "+180% engagement rate",
    metrics: [
      "Engagement rate on social media posts increased by 180%",
      "Click-through rate (CTR) on creative campaigns rose to 5.2%",
      "Brand recognition metrics lifted by 24% in target hubs"
    ],
    g: "from-blue-600 to-indigo-700",
    color: "#4F46E5",
    bg: "#EEF2FF",
    border: "border-indigo-100",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-100/50",
    mock: (
      <img
        src="/assets/work/post/03.png"
        alt="AeroBrand Creative Campaign"
        className="w-full h-full object-cover object-center"
      />
    )
  },
  {
    t: "Urban Elegance",
    category: "Marketing & Ads",
    ind: "Fashion",
    tag: "Seasonal Launch Campaign",
    url: "",
    img: "/assets/work/post/4.png",
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-600 to-slate-800", color: "#475569", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: <img src="/assets/work/post/4.png" alt="Urban Elegance" className="w-full h-full object-cover object-center" />
  },
  {
    t: "Zenith Workspace",
    category: "Marketing & Ads",
    ind: "Real Estate",
    tag: "Commercial Space Showcase",
    url: "",
    img: "/assets/work/post/5.png",
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-600 to-slate-800", color: "#475569", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: <img src="/assets/work/post/5.png" alt="Zenith Workspace" className="w-full h-full object-cover object-center" />
  },
  {
    t: "Vibe Creator Suite",
    category: "Marketing & Ads",
    ind: "Creative Agency",
    tag: "Visual Design Branding",
    url: "",
    img: "/assets/work/post/6.png",
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-600 to-slate-800", color: "#475569", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: <img src="/assets/work/post/6.png" alt="Vibe Creator Suite" className="w-full h-full object-cover object-center" />
  },
  {
    t: "EcoBreeze Campaign",
    category: "Marketing & Ads",
    ind: "Sustainability",
    tag: "Eco Friendly Branding",
    url: "",
    img: "/assets/work/post/7.png",
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-600 to-slate-800", color: "#475569", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: <img src="/assets/work/post/7.png" alt="EcoBreeze Campaign" className="w-full h-full object-cover object-center" />
  },
  {
    t: "Nova Beauty",
    category: "Marketing & Ads",
    ind: "Cosmetics",
    tag: "Product Release Campaign",
    url: "",
    img: "/assets/work/post/8.png",
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-600 to-slate-800", color: "#475569", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: <img src="/assets/work/post/8.png" alt="Nova Beauty" className="w-full h-full object-cover object-center" />
  },
  {
    t: "Vanguard Tech",
    category: "Marketing & Ads",
    ind: "Technology",
    tag: "Product Visual Concept",
    url: "",
    img: "/assets/work/post/9.png",
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-600 to-slate-800", color: "#475569", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: <img src="/assets/work/post/9.png" alt="Vanguard Tech" className="w-full h-full object-cover object-center" />
  },
  {
    t: "Stellar Horizon",
    category: "Marketing & Ads",
    ind: "Entertainment",
    tag: "Visual Showcase Creative",
    url: "",
    img: "/assets/work/post/10.png",
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-600 to-slate-800", color: "#475569", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: <img src="/assets/work/post/10.png" alt="Stellar Horizon" className="w-full h-full object-cover object-center" />
  },
  {
    t: "Brand Concept B1",
    category: "Marketing & Ads",
    ind: "Branding",
    tag: "Visual Identity Campaign",
    url: "",
    img: "/assets/work/post/b-1.png",
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-600 to-slate-800", color: "#475569", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: <img src="/assets/work/post/b-1.png" alt="Brand Concept B1" className="w-full h-full object-cover object-center" />
  },
  {
    t: "Brand Concept B2",
    category: "Marketing & Ads",
    ind: "Branding",
    tag: "Visual Identity Campaign",
    url: "",
    img: "/assets/work/post/b-2.png",
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-600 to-slate-800", color: "#475569", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: <img src="/assets/work/post/b-2.png" alt="Brand Concept B2" className="w-full h-full object-cover object-center" />
  },
  {
    t: "Brand Concept B3",
    category: "Marketing & Ads",
    ind: "Branding",
    tag: "Visual Identity Campaign",
    url: "",
    img: "/assets/work/post/b-3.png",
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-600 to-slate-800", color: "#475569", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: <img src="/assets/work/post/b-3.png" alt="Brand Concept B3" className="w-full h-full object-cover object-center" />
  },
  {
    t: "Brand Concept B4",
    category: "Marketing & Ads",
    ind: "Branding",
    tag: "Visual Identity Campaign",
    url: "",
    img: "/assets/work/post/b-4.png",
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-600 to-slate-800", color: "#475569", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: <img src="/assets/work/post/b-4.png" alt="Brand Concept B4" className="w-full h-full object-cover object-center" />
  },
  {
    t: "Character Concept CH1",
    category: "Marketing & Ads",
    ind: "Illustration",
    tag: "Character Design Creative",
    url: "",
    img: "/assets/work/post/ch-1.png",
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-600 to-slate-800", color: "#475569", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: <img src="/assets/work/post/ch-1.png" alt="Character Concept CH1" className="w-full h-full object-cover object-center" />
  },
  {
    t: "Character Concept CH2",
    category: "Marketing & Ads",
    ind: "Illustration",
    tag: "Character Design Creative",
    url: "",
    img: "/assets/work/post/ch-2.png",
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-600 to-slate-800", color: "#475569", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: <img src="/assets/work/post/ch-2.png" alt="Character Concept CH2" className="w-full h-full object-cover object-center" />
  },
  {
    t: "Character Concept CH3",
    category: "Marketing & Ads",
    ind: "Illustration",
    tag: "Character Design Creative",
    url: "",
    img: "/assets/work/post/ch-3.png",
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-600 to-slate-800", color: "#475569", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: <img src="/assets/work/post/ch-3.png" alt="Character Concept CH3" className="w-full h-full object-cover object-center" />
  },
  {
    t: "Character Concept CH4",
    category: "Marketing & Ads",
    ind: "Illustration",
    tag: "Character Design Creative",
    url: "",
    img: "/assets/work/post/ch-4.png",
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-600 to-slate-800", color: "#475569", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: <img src="/assets/work/post/ch-4.png" alt="Character Concept CH4" className="w-full h-full object-cover object-center" />
  },
  /* -------------------- New Live Client Web Projects -------------------- */
  {
    t: "Dream Properties",
    category: "Web & Design",
    ind: "Real Estate Listing Portal",
    tag: "Property Listing Portal",
    url: "https://www.dreampropertiesnashik.com/",
    ch: "Struggling to manage and showcase property listings offline with manual lead tracking.",
    sol: "Designed a clean real-estate listing portal featuring search functionality, clean cards, and direct WhatsApp connect.",
    r: "Live Platform",
    metrics: ["Instant Whatsapp Connect", "Responsive Grid Layout", "Custom CMS Panel"],
    g: "from-blue-600 to-cyan-500",
    color: "#2563EB",
    bg: "#EEF2FF",
    border: "border-blue-100",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-100/50",
    mock: <WebsiteMockup title="Dream Properties" ind="Real Estate" url="https://www.dreampropertiesnashik.com/" localImg="/assets/work/website-preview/dream.png" />
  },
  {
    t: "Shree Balaji Lawns & Resorts",
    category: "Web & Design",
    ind: "Hotel & Resorts",
    tag: "Event & Booking Platform",
    url: "https://shreebalajilawnsandresorts.com/",
    ch: "Low search visibility and booking processes handled via offline entries.",
    sol: "Built an elegant event showcase website with booking forms, high-res galleries, and navigation systems.",
    r: "Live Platform",
    metrics: ["Interactive Gallery", "Lead Generation Funnel", "Responsive Booking Widget"],
    g: "from-amber-600 to-orange-500",
    color: "#D97706",
    bg: "#FEF3C7",
    border: "border-amber-100",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-100/50",
    mock: <WebsiteMockup title="Shree Balaji Lawns" ind="Hotel & Resorts" url="https://shreebalajilawnsandresorts.com/" localImg="/assets/shree-balaji-resort.png" />
  },

  {
    t: "Aaditya Inn",
    category: "Web & Design",
    ind: "Hotel & Resorts",
    tag: "Resort & Lodging Portal",
    url: "https://aadityainn.com/",
    ch: "High checkout abandonment rates and low user trust on room listings.",
    sol: "Launched a fully responsive hotel portal with interactive maps, amenities checklists, and inquiry widgets.",
    r: "Live Platform",
    metrics: ["Instant Inquiry Form", "Interactive Location Map", "Amenities Grid Layout"],
    g: "from-pink-600 to-rose-500",
    color: "#E11D48",
    bg: "#FFF1F2",
    border: "border-rose-100",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-100/50",
    mock: <WebsiteMockup title="Aaditya Inn" ind="Hotel & Resorts" url="https://aadityainn.com/" localImg="/assets/work/website-preview/aaditya.png" />
  },

  {
    t: "DL Institute",
    category: "Web & Design",
    ind: "Education",
    tag: "E-Learning & Admission CMS",
    url: "https://dlinstitute.in/",
    ch: "Outdated academy site causing high drop-off rates on professional course pages.",
    sol: "Created an immersive courses catalog page, complete with syllabus download triggers and online registration forms.",
    r: "Live Platform",
    metrics: ["Interactive Course Grid", "Syllabus Download Tracking", "Online Application Form"],
    g: "from-violet-600 to-purple-500",
    color: "#7B6BF5",
    bg: "#F5F3FF",
    border: "border-purple-100",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-100/50",
    mock: <WebsiteMockup title="DL Institute" ind="Education" url="https://dlinstitute.in/" localImg="/assets/work/website-preview/dl.png" />
  },
  {
    t: "Devdut Ayurved",
    category: "Web & Design",
    ind: "Hospital",
    tag: "Ayurvedic Treatment Portal",
    url: "https://www.devdutayurved.com/",
    ch: "Patient outreach was limited to offline calls; needed to digitize treatment information.",
    sol: "Developed a comprehensive Ayurvedic services directory with clinic contact flows and booking integrations.",
    r: "Live Platform",
    metrics: ["Treatment Directory", "One-Click Appointment Book", "SEO-Friendly Schema markup"],
    g: "from-emerald-600 to-teal-500",
    color: "#0D9488",
    bg: "#F0FDF4",
    border: "border-emerald-100",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-100/50",
    mock: <WebsiteMockup title="Devdut Ayurved" ind="Hospital" url="https://www.devdutayurved.com/" localImg="/assets/devdut-ayurveda-website.png" />
  },
  {
    t: "Dhanvantari Ayurveda",
    category: "Web & Design",
    ind: "Hospital",
    tag: "Clinic Management System",
    url: "https://dhanvantari-ayurveda-dynamic-websit.vercel.app/",
    ch: "No dynamic system for patients to read test reviews, clinic hours, and check doctor schedules.",
    sol: "Built a modern React/Vercel platform with interactive FAQs, booking schedules, and review carousels.",
    r: "Live Platform",
    metrics: ["React SPA Performance", "Interactive FAQ Section", "Dynamic Doctor Timelines"],
    g: "from-green-600 to-emerald-500",
    color: "#059669",
    bg: "#F0FDF4",
    border: "border-emerald-100",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-100/50",
    mock: <WebsiteMockup title="Dhanvantari Ayurveda" ind="Hospital" url="https://dhanvantari-ayurveda-dynamic-websit.vercel.app/" localImg="/assets/work/website-preview/dhanvantari.png" />
  },

  {
    t: "Aries Skin & Health Clinic",
    category: "Web & Design",
    ind: "Skin Care Clinic",
    tag: "Dermatology Booking Portal",
    url: "https://www.ariesskinandhealth.com/",
    ch: "Needed a beautiful skin clinic design to display cosmetic procedures and collect consultation leads.",
    sol: "Crafted a gorgeous aesthetic clinic landing page with dynamic service menus and booking triggers.",
    r: "Live Platform",
    metrics: ["Cosmetic Service Menus", "Consultation Lead capture", "Clean Medical Branding"],
    g: "from-rose-500 to-orange-500",
    color: "#E11D48",
    bg: "#FFF1F2",
    border: "border-rose-100",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-100/50",
    mock: <WebsiteMockup title="Aries Skin & Health" ind="Skin Care Clinic" url="https://www.ariesskinandhealth.com/" localImg="/assets/work/website-preview/aries.png" />
  },
  {
    t: "My Jungle Trip",
    category: "Web & Design",
    ind: "Jungle Safari",
    tag: "Safari Tour Booking System",
    url: "https://myjungletrip.in/",
    ch: "Friction in reserving tiger safaris and jungle tour packages online.",
    sol: "Created an immersive travel portal showcasing forest zones, package details, and dynamic custom bookings.",
    r: "Live Platform",
    metrics: ["Zone Selection Interface", "Dynamic Package Pricing", "Instant Booking confirmation"],
    g: "from-amber-700 to-yellow-600",
    color: "#D97706",
    bg: "#FEF3C7",
    border: "border-amber-100",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-100/50",
    mock: <WebsiteMockup title="My Jungle Trip" ind="Jungle Safari" url="https://myjungletrip.in/" localImg="/assets/work/website-preview/jungletrip.png" />
  },
  {
    t: "Vantara Net",
    category: "Web & Design",
    ind: "Hardware Technology",
    tag: "Tech & Hardware Solutions CMS",
    url: "https://vantaranet.com/",
    ch: "Lack of brand awareness in IT services and enterprise hardware supply.",
    sol: "Designed a clean, corporate technology solutions agency site showcasing server setups and tech portfolios.",
    r: "Live Platform",
    metrics: ["IT Services Grid", "B2B Contact Flow", "Client Case Studies Catalog"],
    g: "from-slate-700 to-slate-900",
    color: "#475569",
    bg: "#F8FAFC",
    border: "border-slate-200",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-200/50",
    mock: <WebsiteMockup title="Vantara Net" ind="Hardware Technology" url="https://vantaranet.com/" localImg="/assets/work/website-preview/vantara.png" />
  },
  {
    t: "Alkalyne",
    category: "Web & Design",
    ind: "Manufacturing CMS",
    tag: "Industrial CMS Platform",
    url: "http://alkalyne.in/",
    ch: "Difficulty displaying large industrial product sheets and specs sheets to buyers.",
    sol: "Implemented a structured industrial manufacturing product CMS with dynamic specifications grids.",
    r: "Live Platform",
    metrics: ["Specs Sheets Catalog", "B2B Inquiry Trigger", "Optimized Search Index"],
    g: "from-zinc-700 to-slate-800",
    color: "#475569",
    bg: "#F8FAFC",
    border: "border-slate-200",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-200/50",
    mock: <WebsiteMockup title="Alkalyne" ind="Manufacturing CMS" url="http://alkalyne.in/" localImg="/assets/work/website-preview/alkalyne.png" />
  },
  {
    t: "Pyramid Agro Exports",
    category: "Web & Design",
    ind: "Import export CMS System",
    tag: "Global Supply Chain CMS",
    url: "https://www.pyramidagroexports.com",
    ch: "Global buyers struggled to browse agricultural export items and certificates.",
    sol: "Launched a corporate import-export portal featuring multi-language support and quality certificates.",
    r: "Live Platform",
    metrics: ["Crop Export Catalog", "Quality Certificate Vault", "Global Contact Form"],
    g: "from-green-700 to-emerald-600",
    color: "#059669",
    bg: "#F0FDF4",
    border: "border-emerald-100",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-100/50",
    mock: <WebsiteMockup title="Pyramid Agro" ind="Import export CMS System" url="https://www.pyramidagroexports.com" localImg="/assets/work/website-preview/pyramid.png" />
  },
  {
    t: "Zenith Hospitality Services",
    category: "Web & Design",
    ind: "Corporate Service Apartments",
    tag: "Luxury Corporate Lodging CMS",
    url: "https://zenithhospitalityservices.com/",
    ch: "Manual email routing for business guests booking service apartments in metropolitan areas.",
    sol: "Created a premium corporate lodging CMS with listing visual grids, map overlays, and automated booking receipts.",
    r: "Live Platform",
    metrics: ["Service Suite Showcase", "B2B Invoice Automation", "Corporate Inquiry Flow"],
    g: "from-blue-700 to-indigo-600",
    color: "#1E3A8A",
    bg: "#EEF2FF",
    border: "border-blue-100",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-100/50",
    mock: <WebsiteMockup title="Zenith Hospitality" ind="Corporate Service Apartments" url="https://zenithhospitalityservices.com/" localImg="/assets/work/website-preview/zenith.png" />
  },
  /* -------------------- SaaS Projects -------------------- */
  {
    t: "WhatsApp CRM",
    category: "SaaS Projects",
    ind: "SaaS",
    tag: "Next-Gen Chatbot Builder",
    url: "https://hashtagscrm.com/",
    noEmbed: true,
    localImg: "/assets/work/website-preview/whatsapp-automation.png",
    ch: "SaaS builders struggle to configure NLU bots with zero-code interfaces.",
    sol: "Engineered an interactive chatbot flow canvas builder featuring quick webhook triggers and database syncs.",
    r: "Live SaaS App",
    metrics: ["Visual Flow Builder", "Instant Script Embed", "Dynamic Intent Resolver"],
    g: "from-indigo-600 to-indigo-800",
    color: "#4F46E5",
    bg: "#F5F3FF",
    border: "border-purple-100",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-100/50",
    mock: <WebsiteMockup title="WhatsApp CRM" ind="SaaS" url="https://hashtagscrm.com/" localImg="/assets/work/website-preview/whatsapp-automation.png" />
  },
  {
    t: "PrimeInbox",
    category: "SaaS Projects",
    ind: "SaaS",
    tag: "Email Automation Platform",
    url: "https://primeinbox.online/",
    ch: "Low deliverability and email domain warming friction for scale marketing agencies.",
    sol: "Built an auto-warming cold email automation SaaS portal with analytics charts and automated API routing.",
    r: "Live SaaS App",
    metrics: ["Auto Warmup Engine", "SMTP/IMAP Multi-Connect", "Real-time Deliverability Dashboard"],
    g: "from-sky-600 to-blue-700",
    color: "#0284C7",
    bg: "#F0F9FF",
    border: "border-sky-100",
    badgeBg: "bg-sky-50 text-sky-700 border-sky-100/50",
    mock: <WebsiteMockup title="PrimeInbox" ind="SaaS" url="https://primeinbox.online/" localImg="/assets/primeinbox.png" />
  },
  {
    t: "CelebAesthecia",
    category: "SaaS Projects",
    ind: "SaaS",
    tag: "Celebrity Aesthetic Portal",
    url: "https://www.celebaesthecia.in/",
    ch: "Consulting patients need premium digital consultation paths with verified cosmetic professionals.",
    sol: "Engineered a celebrity aesthetics booking portal with pricing guides, consultation wizards, and video integrations.",
    r: "Live Platform",
    metrics: ["Premium Consultation Flow", "Interactive Service Wizard", "Secure Checkout Gateway"],
    g: "from-pink-600 to-purple-600",
    color: "#DB2777",
    bg: "#FFF1F2",
    border: "border-rose-100",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-100/50",
    mock: <WebsiteMockup title="CelebAesthecia" ind="SaaS" url="https://www.celebaesthecia.in/" localImg="/assets/work/website-preview/celeb.png" />
  }
];

const logoFilenames = [
  "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png",
  "11.png", "12.png", "13.png", "14.png", "15.png", "16.png", "17.png", "18.png", "19.png",
  "Arya_Foods.png", "DS Moto.png", "Darshan_Jadhav.png", "Gaurav Kirana.png", "Hotel_Omkar_Garden.png",
  "Hotel_Trident.png", "Jain_Bakers _logo.png", "Jogeshwari_Super_Shopee.png", "Kavyaas_Slimming_Center.png",
  "Key_Tech.png", "Laser Dental.png", "Lily_Events.png", "Logo Final.png", "Logo SM 1.png",
  "Logo.png", "MA Events.jpg", "OK_Kirana.png", "Pranika_Arts.png", "Scenic_Lands.png",
  "TE_LOGO_1_1.png", "The bright logo 1.png", "Trade Bharat.png", "UWPL_Logo_HD_Png.png",
  "Utkarsh Wani Samaj_HD_Png.png"
];

const logoProjects = logoFilenames.map((filename) => {
  const title = filename
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return {
    t: title,
    category: "Creative Logo",
    ind: "Brand Identity",
    tag: "Creative Logo Design",
    url: "",
    img: `/assets/work/logo/${filename}`,
    ch: "", sol: "", r: "", metrics: [], g: "from-slate-100 to-slate-200", color: "#64748B", bg: "#F8FAFC", border: "border-slate-100", badgeBg: "bg-slate-50 text-slate-700",
    mock: (
      <img
        src={`/assets/work/logo/${filename}`}
        alt={title}
        className="w-full h-full object-contain p-5"
      />
    )
  };
});

const projects = [...initialProjects, ...logoProjects];

function LightboxContent({
  selectedProject,
  setSelectedProject,
  displayProjects,
}: {
  selectedProject: typeof projects[0];
  setSelectedProject: (p: typeof projects[0] | null) => void;
  displayProjects: typeof projects;
}) {
  const currentIndex = displayProjects.findIndex((p) => p.t === selectedProject.t);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > -1) {
      const prevIndex = (currentIndex - 1 + displayProjects.length) % displayProjects.length;
      setSelectedProject(displayProjects[prevIndex]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > -1) {
      const nextIndex = (currentIndex + 1) % displayProjects.length;
      setSelectedProject(displayProjects[nextIndex]);
    }
  };

  const imgSrc = selectedProject.img || "";

  return (
    <div className="relative flex flex-col items-center">
      {/* Floating Close Button */}
      <DialogPrimitive.Close
        className="absolute -top-14 right-0 md:-top-6 md:-right-16 size-11 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md grid place-items-center transition-all cursor-pointer z-50 hover:scale-105 border border-white/10 active:scale-95 shadow-lg"
        aria-label="Close"
      >
        <X className="size-5" />
      </DialogPrimitive.Close>

      {/* Floating Left Navigation Button */}
      {displayProjects.length > 1 && (
        <button
          onClick={handlePrev}
          type="button"
          className="absolute -left-4 md:-left-24 top-1/2 -translate-y-1/2 size-11 md:size-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md grid place-items-center transition-all cursor-pointer z-50 hover:scale-105 border border-white/10 active:scale-95 shadow-lg"
        >
          <ChevronLeft className="size-6" />
        </button>
      )}

      {/* Floating Right Navigation Button */}
      {displayProjects.length > 1 && (
        <button
          onClick={handleNext}
          type="button"
          className="absolute -right-4 md:-right-24 top-1/2 -translate-y-1/2 size-11 md:size-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md grid place-items-center transition-all cursor-pointer z-50 hover:scale-105 border border-white/10 active:scale-95 shadow-lg"
        >
          <ChevronRight className="size-6" />
        </button>
      )}

      {/* Image Content with drop shadow and clean animation */}
      <motion.img
        key={imgSrc}
        src={imgSrc}
        alt={selectedProject.t}
        className={`max-w-[85vw] max-h-[75vh] object-contain rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] border border-white/10 ${selectedProject.category === "Creative Logo" ? "bg-white p-8 md:p-12" : ""
          }`}
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Optional Title under lightbox (only for website URLs) */}
      {selectedProject.url && (
        <div className="mt-4 text-center">
          <p className="text-[0.65rem] text-white/50 font-bold uppercase tracking-widest">{selectedProject.ind}</p>
          <h4 className="text-white font-extrabold text-sm sm:text-base mt-0.5 drop-shadow">{selectedProject.t}</h4>
        </div>
      )}
    </div>
  );
}

export function Portfolio({ isFullPage = false }: { isFullPage?: boolean }) {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [filter]);

  const categories = ["All", "WhatsApp Automation", "Marketing & Ads", "Web & Design", "SaaS Projects", "Creative Logo"];

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(p => p.category === filter);

  // Sort websites first, posts second, logos third to keep layout grouped & professional
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const getPriority = (p: typeof projects[0]) => {
      if (p.url) return 3;
      if (p.category === "Marketing & Ads") return 2;
      return 1;
    };
    return getPriority(b) - getPriority(a);
  });

  let displayProjects = sortedProjects;
  let showViewMoreButton = false;

  if (filter === "All" && !expanded && !isFullPage) {
    const websites = sortedProjects.filter(p => p.url !== "");
    // Exclude Creative Logo from initial row list of All tab
    const posts = sortedProjects.filter(p => p.url === "" && p.category !== "Creative Logo");

    const initialWebsites = websites.slice(0, 3);
    const initialPosts = posts.slice(0, 3);

    displayProjects = [...initialWebsites, ...initialPosts];
    showViewMoreButton = sortedProjects.length > displayProjects.length;
  }

  return (
    <section id="portfolio" className="py-10 sm:py-14 md:py-16 bg-[color:var(--sky-tint)] relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-1/4 right-0 size-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 size-80 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />

      <div className="container-1280 relative z-10">
        {/* Top Header Block */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start justify-between">
          {/* Left Column */}
          <div className="md:col-span-6 flex flex-col">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-[#2563EB]">
              Our Portfolio
            </span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-950 leading-[1.12] tracking-tight text-left">
              Witnessing Brand <br className="hidden sm:inline" />
              <span className="gradient-text">Transformation</span>
            </h2>
          </div>

          {/* Right Column */}
          <div className="md:col-span-6 flex flex-col items-start md:pt-6 md:pl-6">
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl text-left font-normal">
              At SAP DigiTech Solutions, our work speaks for itself. We design high-impact solutions, from revitalizing brand identities and packaging to launching digital campaigns. Each project reflects our commitment to creative excellence and strategic growth.
            </p>
            {!isFullPage && (
              <a
                href="/portfolio"
                className="btn-ghost mt-4 sm:mt-6 text-xs sm:text-sm"
              >
                See all case studies <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </div>

        {/* Categories Tab Selector (Horizontal scroll on mobile with no-scrollbar) */}
        <div className="mt-6 sm:mt-10 flex gap-2 pb-3 overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap border-b border-hairline">
          {categories.map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative whitespace-nowrap px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full transition-all border cursor-pointer shrink-0 ${isActive
                    ? "border-navy bg-navy text-white"
                    : "border-hairline bg-white/60 hover:bg-white text-navy/70 hover:text-navy"
                  }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="portfolio-active-tab"
                    className="absolute inset-0 rounded-full bg-navy -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Project Grid */}
        <motion.div
          layout
          className={`mt-8 sm:mt-10 grid gap-3 sm:gap-4 lg:gap-5 ${filter === "Creative Logo"
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              : filter === "Marketing & Ads"
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
        >
          <AnimatePresence mode="popLayout">
            {displayProjects.map((p, i) => (
              <motion.div
                key={`${p.t}-${p.category}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative rounded-2xl sm:rounded-[2rem] border border-hairline overflow-hidden hover:border-primary/30 transition-colors duration-300 cursor-pointer bg-slate-50 ${p.category === "Creative Logo"
                    ? "aspect-square"
                    : p.url ? "aspect-[16/9]" : "aspect-[4/5]"
                  }`}
                onClick={() => setSelectedProject(p)}
              >
                {/* Visual mockup container (full bleed, covering card) */}
                <div className="w-full h-full relative">

                  {/* Mockup visual */}
                  <div className="w-full h-full relative z-10">
                    {p.mock}
                  </div>

                  {/* Bottom overlay with compact glass title card and clean arrow icon (only for projects with live website link) */}
                  {p.url && (
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-30 pointer-events-none">
                      <div className="rounded-xl glass px-2.5 sm:px-3 py-1 sm:py-1.5 pointer-events-auto max-w-[80%]">
                        <h3 className="text-[0.7rem] sm:text-xs font-semibold text-navy leading-tight truncate">{p.t}</h3>
                      </div>
                      <div className="size-7 sm:size-8 rounded-full bg-white border border-slate-200/50 shadow-sm grid place-items-center text-navy group-hover:bg-[#7B6BF5] group-hover:text-white transition-colors duration-300 shrink-0 pointer-events-auto">
                        <ArrowUpRight className="size-3.5 sm:size-4.5" />
                      </div>
                    </div>
                  )}

                  {/* Hover tint overlay */}
                  <div className="absolute inset-0 bg-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {showViewMoreButton && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setExpanded(true)}
              className="btn-primary !px-8 !py-3.5 text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 transition-transform"
            >
              View More Projects <ChevronDown className="size-4 animate-bounce" />
            </button>
          </div>
        )}
      </div>

      {/* Case Study Detail Dialog */}
      <DialogPrimitive.Root open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <AnimatePresence>
          {selectedProject && (
            <DialogPrimitive.Portal forceMount>
              {/* Overlay */}
              <DialogPrimitive.Overlay asChild forceMount>
                <motion.div
                  className={`fixed inset-0 z-50 backdrop-blur-md ${selectedProject.url ? "bg-slate-900/60" : "bg-black/90"
                    }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </DialogPrimitive.Overlay>

              {/* Modal Content */}
              <DialogPrimitive.Content asChild forceMount aria-describedby={undefined}>
                {selectedProject.url ? (
                  <motion.div
                    className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white border border-hairline shadow-2xl flex flex-col"
                    initial={{ opacity: 0, scale: 0.95, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 12 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="w-full h-full flex flex-col bg-white relative">
                      {/* Minimal top bar — close button only */}
                      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 shrink-0">
                        <div className="text-left flex items-center gap-2.5">
                          <span className="chip text-[0.62rem] py-0.5 px-2">{selectedProject.ind}</span>
                          <h2 className="text-base font-black text-navy leading-none">{selectedProject.t}</h2>
                        </div>
                        <DialogPrimitive.Close
                          className="size-8 grid place-items-center rounded-full bg-slate-100 hover:bg-slate-200 text-navy transition-colors focus:outline-none cursor-pointer"
                          aria-label="Close"
                        >
                          <X className="size-4" />
                        </DialogPrimitive.Close>
                      </div>

                      {/* Browser frame */}
                      <div className="flex-1 overflow-hidden flex flex-col">
                        <div className="w-full h-full flex flex-col bg-white overflow-hidden">
                          {/* Browser control header with URL bar + Visit Live Site */}
                          <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border-b border-slate-200 select-none shrink-0">
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="size-3 rounded-full bg-[#FF5F56]" />
                              <span className="size-3 rounded-full bg-[#FFBD2E]" />
                              <span className="size-3 rounded-full bg-[#27C93F]" />
                            </div>

                            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1 text-[0.65rem] text-slate-500 flex-1 max-w-xl font-mono select-all truncate">
                              <Globe className="size-3 text-slate-400 shrink-0" />
                              <span className="truncate flex-1 text-left">{selectedProject.url}</span>
                            </div>

                            <a
                              href={selectedProject.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary !h-8 !px-3.5 !text-[0.65rem] flex items-center gap-1.5 shrink-0 !rounded-lg"
                            >
                              Visit Live Site <ExternalLink className="size-3" />
                            </a>
                          </div>

                          {/* IFrame or High-Res Screenshot for Domain-Protected Sites */}
                          <div className="flex-1 bg-white relative overflow-y-auto">
                            {(selectedProject as any).noEmbed ? (
                              <div className="w-full h-full relative overflow-y-auto bg-slate-100 flex flex-col items-center">
                                <img
                                  src={(selectedProject as any).localImg || "/assets/work/website-preview/whatsapp-automation.png"}
                                  alt={selectedProject.t}
                                  className="w-full h-auto object-top shadow-md"
                                />
                                <div className="sticky bottom-6 my-6 z-30">
                                  <a
                                    href={selectedProject.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary !h-11 !px-7 !text-xs shadow-2xl flex items-center gap-2 rounded-full border border-white/20 animate-pulse-ring"
                                  >
                                    Launch {selectedProject.t} Live Site <ExternalLink className="size-4" />
                                  </a>
                                </div>
                              </div>
                            ) : (
                              <iframe
                                src={selectedProject.url}
                                title={selectedProject.t}
                                className="w-full h-full border-0 absolute inset-0 bg-white"
                                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    className="fixed left-1/2 top-1/2 z-50 w-fit max-w-[95vw] h-fit max-h-[90vh] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center select-none outline-none focus:outline-none"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <LightboxContent
                      selectedProject={selectedProject}
                      setSelectedProject={setSelectedProject}
                      displayProjects={displayProjects}
                    />
                  </motion.div>
                )}
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          )}
        </AnimatePresence>
      </DialogPrimitive.Root>
    </section>
  );
}

/* -------------------- Testimonials -------------------- */

function Testimonials() {
  const items = [
    { n: "Dr. Anika Rao", r: "Founder, Nova Health", q: "SAP DigiTech rebuilt our funnel end-to-end. Patient bookings tripled in 4 months and we finally have clarity on every rupee." },
    { n: "Rohan Mehta", r: "CEO, NimbusAI", q: "They're less an agency, more a growth partner. Their AI automation freed our team from 40 hours/week of manual ops." },
    { n: "Priya Shah", r: "CMO, Skyline Hotels", q: "Every quarter we hit our targets ahead of schedule. Reporting is transparent, strategy is sharp, execution is fast." },
    { n: "Aman Verma", r: "Founder, PeakFitness", q: "Their technical skill and marketing insights helped us scale to 5 locations in under a year. Highly professional team!" },
    { n: "Sneha Nair", r: "Product VP, FinFlow", q: "The dashboards and automations built by SAP DigiTech Solutions saved our ops team hundreds of hours. Highly recommended." },
    { n: "Kabir Malhotra", r: "Director, GreenAgro", q: "A refreshing agency model. They speak in terms of ROI and delivery, not just high-level hand-waving." }
  ];

  // Repeat elements for infinite marquee loop
  const marqueeItems = [...items, ...items, ...items];

  return (
    <section className="py-10 sm:py-14 md:py-16 overflow-hidden">
      <div className="container-1280">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-eyebrow">Testimonials</span>
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-navy leading-[1.12]">
            Words from <span className="gradient-text">our partners.</span>
          </h2>
        </div>
      </div>

      <div className="mt-8 sm:mt-12 relative w-full overflow-hidden py-4">
        {/* Gradient edge overlays for elegant blend */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        <div
          className="w-max flex gap-4 sm:gap-6 animate-marquee hover:[animation-play-state:paused]"
          style={{ animationDuration: '40s' }}
        >
          {marqueeItems.map((t, i) => (
            <div
              key={`${t.n}-${i}`}
              className="w-[280px] sm:w-[320px] md:w-[380px] shrink-0 card-elevated p-5 sm:p-7 relative border border-hairline bg-white rounded-2xl"
            >
              <Quote className="size-5 sm:size-6 text-primary/30" />
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-[0.95rem] leading-relaxed text-navy min-h-[4.5rem] sm:min-h-[5.5rem] font-normal">"{t.q}"</p>
              <div className="mt-4 sm:mt-5 flex items-center gap-3">
                <span className="size-9 sm:size-11 grid place-items-center rounded-full gradient-brand text-white font-semibold text-xs sm:text-sm shrink-0">
                  {t.n.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </span>
                <div className="overflow-hidden">
                  <p className="font-semibold text-navy text-xs sm:text-sm truncate">{t.n}</p>
                  <p className="text-[0.7rem] sm:text-xs text-muted-foreground truncate font-normal">{t.r}</p>
                </div>
                <div className="ml-auto flex gap-0.5 shrink-0">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="size-3 sm:size-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Founder -------------------- */

function Founder() {
  return (
    <section id="founder" className="py-10 sm:py-14 md:py-16 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 size-96 rounded-full bg-primary/10 blur-3xl -z-10" />
      <div className="container-1280">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl sm:rounded-[32px] overflow-hidden border border-hairline bg-slate-50 max-w-sm mx-auto lg:max-w-none">
              <img
                src="/assets/work/founder/swapnil-agarkhedkar.png"
                alt="Swapnil Agarkhedkar"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 rounded-xl sm:rounded-2xl glass p-3 sm:p-4">
                <p className="text-[0.65rem] sm:text-xs uppercase tracking-widest text-primary font-semibold">Founder</p>
                <p className="mt-0.5 sm:mt-1 text-lg sm:text-xl font-semibold text-navy">Swapnil Agarkhedkar</p>
                <p className="text-[0.7rem] sm:text-xs text-muted-foreground font-normal">Digital Marketing & AI Strategist</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="section-eyebrow">Meet the Founder</span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-navy leading-[1.12]">
              Swapnil <span className="gradient-text">Agarkhedkar</span>
            </h2>
            <p className="mt-3 sm:mt-5 text-xs sm:text-sm md:text-base leading-relaxed text-slate-600 font-normal">
              Swapnil is a Digital Marketing Strategist dedicated to helping businesses scale through a powerful mix of strategy, performance marketing, technology, and AI automation.
            </p>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-slate-600 font-normal">
              With deep expertise in consumer psychology and digital systems, Swapnil works across industries including hospitality, technology, and professional services. He has developed specialized authority in healthcare marketing—partnering with hospitals, clinics, and laboratories to build compliant, high-trust client systems.
            </p>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-slate-600 font-normal">
              A believer in structured growth and innovation, Swapnil's vision is to empower enterprises to leverage AI intelligently and build competitive, future-ready brands.
            </p>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { n: "MBA", l: "Marketing Management", icon: GraduationCap },
                { n: "MJMC", l: "Masters in Journalism and Mass Communication", icon: Megaphone },
                { n: "Certified", l: "Digital Marketing Strategist", icon: Award },
              ].map(({ n, l, icon: Icon }) => (
                <div key={l} className="card-elevated p-3.5 sm:p-4 text-center flex flex-col items-center justify-center h-full min-h-[120px] sm:min-h-[145px]">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <Icon className="size-4" />
                  </div>
                  <p className="text-sm sm:text-base font-semibold gradient-text">{n}</p>
                  <p className="text-[0.72rem] sm:text-[0.62rem] md:text-[0.68rem] font-normal text-slate-500 mt-1 leading-snug max-w-[150px] mx-auto">
                    {l}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8">
              <a href="/contact" className="btn-primary inline-flex text-xs sm:text-sm">
                Book a Strategy Consultation <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



/* -------------------- Contact -------------------- */

import { submitContactForm } from "../api/contactFn";
import { toast } from "sonner";

export function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  as = "input",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  as?: "input" | "textarea";
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const shared =
    "peer w-full bg-transparent px-4 pt-6 pb-2 text-sm text-navy outline-none border border-hairline rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all";
  return (
    <label className="relative block">
      {as === "textarea" ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={shared}
          required={required}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${shared} h-[54px]`}
          required={required}
        />
      )}
      <span
        className={`absolute left-4 pointer-events-none text-muted-foreground transition-all ${filled || focused
            ? "top-1.5 text-[0.7rem] font-semibold text-primary"
            : "top-4 text-sm"
          }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </span>
    </label>
  );
}

export function FloatingSelect({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const filled = value.length > 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full text-left bg-transparent px-4 pt-6 pb-2 text-sm text-navy outline-none border rounded-2xl transition-all flex items-center justify-between h-[54px] cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.03)] ${open
            ? "border-primary ring-4 ring-primary/10 shadow-[0_4px_16px_rgba(37,99,235,0.1)]"
            : "border-hairline hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(37,99,235,0.05)]"
          }`}
      >
        <span className={filled ? "text-navy font-medium truncate pr-4" : "text-transparent"}>
          {value || "Select option"}
        </span>
        <ChevronDown
          className={`size-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-primary" : ""
            }`}
        />
      </button>

      <span
        className={`absolute left-4 pointer-events-none text-muted-foreground transition-all ${filled || open
            ? "top-1.5 text-[0.7rem] font-semibold text-primary"
            : "top-4 text-sm"
          }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-slate-200/80 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08),0_4px_16px_rgba(37,99,235,0.05)] overflow-hidden py-1 max-h-60 overflow-y-auto"
          >
            {options.map((opt) => {
              const isSelected = value === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between cursor-pointer ${isSelected
                      ? "bg-blue-50/80 text-[#2563EB] font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                    }`}
                >
                  <span>{opt}</span>
                  {isSelected && <Check className="size-4 text-[#2563EB] shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function WhatsAppLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#25D366">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.228-1.157zm12.383-6.262c-.085-.141-.311-.225-.651-.395-.34-.17-2.012-.992-2.324-1.105-.311-.114-.538-.17-.765.17-.226.34-.878 1.105-1.076 1.331-.198.226-.396.255-.736.085-.34-.17-1.434-.529-2.731-1.685-1.01-.901-1.692-2.013-1.89-2.353-.198-.34-.021-.524.148-.693.153-.153.34-.396.51-.595.17-.198.226-.34.34-.566.113-.226.056-.425-.028-.595-.085-.17-.765-1.841-1.048-2.521-.276-.662-.556-.572-.765-.583-.198-.01-.425-.01-.651-.01-.226 0-.595.085-.906.425-.311.34-1.189 1.162-1.189 2.835 0 1.673 1.217 3.287 1.386 3.514.17.226 2.395 3.657 5.803 5.127 2.296.99 2.8.966 3.791.82 1.077-.158 2.324-.95 2.65-1.87.326-.92.326-1.701.226-1.871z" />
    </svg>
  );
}

export function PinterestLogo({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.62 0 12.017 0z" />
    </svg>
  );
}

const SERVICE_OPTIONS = [
  "Personal Branding",
  "Social Media Marketing",
  "GMB Optimisation",
  "AI Automation",
  "Website Design & Development",
  "Custom Apps",
  "Graphic Design",
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in your name and work email.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await submitContactForm({
        data: {
          name,
          email,
          company,
          phone,
          message,
          services: service ? [service] : [],
        },
      });

      if (res.success) {
        setShowSuccessModal(true);
        setName("");
        setEmail("");
        setCompany("");
        setPhone("");
        setMessage("");
        setService("");
      } else {
        toast.error(res.message || "Failed to send email.");
      }
    } catch (err: unknown) {
      console.error("Contact form error:", err);
      toast.error("Submission failed. Please check network connection or try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-10 sm:py-14 md:py-16">
      <div className="container-1280">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-5 rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-7 md:p-10 relative overflow-hidden bg-gradient-to-br from-[#FFF0E8] to-[#FFF7F4] border border-[#FF6B00]/20 text-navy flex flex-col justify-between">
            <div className="absolute -top-20 -right-20 size-72 rounded-full bg-[#FF6B00]/15 blur-3xl pointer-events-none" />

            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.15] text-slate-900 tracking-tight">
                Ready to Grow <span className="gradient-text">Smarter?</span>
              </h2>

              <p className="mt-3 sm:mt-4 text-slate-600 text-xs sm:text-sm md:text-[0.98rem] leading-relaxed font-normal">
                Whether you're looking to generate more leads, strengthen your brand, automate your business processes, or build a future-ready digital presence, we're here to help.
              </p>

              <p className="mt-2.5 sm:mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Let's discuss your goals and create a growth strategy tailored specifically for your business.
              </p>

              <div className="mt-6 sm:mt-8 space-y-3.5 sm:space-y-4">
                {/* WhatsApp Link */}
                <a
                  href="https://wa.me/917745868073"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact on WhatsApp"
                  className="flex items-center gap-3.5 text-slate-800 hover:text-[#25D366] transition-colors group cursor-pointer"
                >
                  <span className="size-9 sm:size-10 rounded-xl bg-white border border-[#FF6B00]/20 grid place-items-center shrink-0 shadow-sm group-hover:border-emerald-300 transition-colors">
                    <WhatsAppLogo className="size-4.5 sm:size-5" />
                  </span>
                  <div>
                    <span className="block text-[0.65rem] sm:text-[0.68rem] uppercase font-medium text-slate-400 tracking-wider">WhatsApp</span>
                    <span className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-[#25D366] transition-colors">
                      +91 77458 68073
                    </span>
                  </div>
                </a>

                {/* Email Link */}
                <a
                  href="mailto:sapdigitechsolutions@gmail.com"
                  aria-label="Send Email"
                  className="flex items-center gap-3.5 text-slate-800 hover:text-primary transition-colors group cursor-pointer"
                >
                  <span className="size-9 sm:size-10 rounded-xl bg-white border border-[#FF6B00]/20 grid place-items-center text-primary shrink-0 shadow-sm group-hover:border-primary/40 transition-colors">
                    <Mail className="size-4.5 sm:size-5" />
                  </span>
                  <div>
                    <span className="block text-[0.65rem] sm:text-[0.68rem] uppercase font-medium text-slate-400 tracking-wider">Email</span>
                    <span className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-primary transition-colors">
                      sapdigitechsolutions@gmail.com
                    </span>
                  </div>
                </a>

                {/* Locations */}
                <div className="flex items-center gap-3.5 text-slate-800">
                  <span className="size-9 sm:size-10 rounded-xl bg-white border border-[#FF6B00]/20 grid place-items-center text-primary shrink-0 shadow-sm">
                    <MapPin className="size-4.5 sm:size-5" />
                  </span>
                  <div>
                    <span className="block text-[0.65rem] sm:text-[0.68rem] uppercase font-medium text-slate-400 tracking-wider">Locations</span>
                    <span className="text-sm sm:text-base font-semibold text-slate-900">Pune · Nashik · Mumbai</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 card-elevated p-5 sm:p-7 md:p-10 space-y-4 rounded-2xl sm:rounded-3xl"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <FloatingInput label="Full name" value={name} onChange={setName} required />
              <FloatingInput label="Work email" type="email" value={email} onChange={setEmail} required />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FloatingInput label="Company" value={company} onChange={setCompany} />
              <FloatingInput label="Phone / WhatsApp" type="tel" value={phone} onChange={setPhone} />
            </div>
            <FloatingSelect
              label="Select Service"
              value={service}
              onChange={setService}
              options={SERVICE_OPTIONS}
            />
            <FloatingInput label="What are you looking to grow?" as="textarea" value={message} onChange={setMessage} />

            <div className="pt-2 flex items-center justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {submitting ? "Sending..." : "Book Strategy Call"} <ArrowRight className="size-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Popup Modal with Green Tick */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-md bg-white rounded-3xl p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-100"
            >
              {/* Green Tick Circle */}
              <div className="mx-auto size-16 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center mb-5 text-emerald-500 shadow-sm">
                <svg className="size-8 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Message Sent Successfully!
              </h3>

              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                Thank you for reaching out. We have received your inquiry and a confirmation copy has been sent to your email ID.
              </p>

              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="mt-6 w-full py-3 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                Got It
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* -------------------- Footer -------------------- */

export function Footer() {
  const cols = [
    ["Company", ["About", "Careers", "Products", "Contact"]],
    ["Services", ["Performance Marketing", "AI Automation", "Websites", "Branding"]],
    ["Industries", ["Healthcare", "Real Estate", "Technology", "Hospitality"]],
  ] as const;

  const getLinkHref = (name: string) => {
    switch (name) {
      case "About": return "/about";
      case "Careers": return "/careers";
      case "Products": return "/products";
      case "Contact": return "/contact";
      case "Services":
      case "Performance Marketing":
      case "AI Automation":
      case "Websites":
      case "Branding":
        return "/services";
      case "Healthcare":
      case "Real Estate":
      case "Technology":
      case "Hospitality":
        return "/#industries";
      case "Portfolio":
      case "Case Studies":
        return "/portfolio";
      default:
        return "/";
    }
  };

  return (
    <footer className="relative bg-[#080C16] text-white border-t border-slate-800/80">
      <div className="container-1280 relative pt-12 sm:pt-16 pb-24 sm:pb-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          {/* Brand column (Left - 4 cols) */}
          <div className="lg:col-span-4">
            <a href="/#home" className="inline-block">
              <img src="/logo/sap_logo_dark.png" alt="SAP DigiTech Solutions Logo" className="h-8 md:h-9 object-contain" />
            </a>
            <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-normal">
              A modern digital growth studio blending strategy, AI, and technology for ambitious businesses.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 font-medium">
              <span className="size-1.5 rounded-full bg-[#FF6B00]" />
              <span>Innovate · Integrate · Elevate</span>
            </div>
          </div>

          {/* Links columns (Middle - 5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-4 sm:gap-6">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.16em] font-semibold text-slate-300">Company</p>
              <ul className="mt-4 space-y-2.5">
                {["About", "Careers", "Products", "Services", "Contact"].map((l) => (
                  <li key={l}>
                    <a href={getLinkHref(l)} className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.16em] font-semibold text-slate-300">Services</p>
              <ul className="mt-4 space-y-2.5">
                {["Performance Marketing", "AI Automation", "Web Development", "Video Production", "Graphic Design", "Social Media (SMM)"].map((l) => (
                  <li key={l}>
                    <a href="/services" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.16em] font-semibold text-slate-300">Industries</p>
              <ul className="mt-4 space-y-2">
                {[
                  "Healthcare & Clinics",
                  "Hospitality & Resorts",
                  "Real Estate & Housing",
                  "Retail & E-Commerce",
                  "Food & FMCG",
                  "Technology & SaaS",
                  "Education & EdTech",
                  "Manufacturing & B2B",
                  "Professional Services",
                ].map((ind) => (
                  <li key={ind}>
                    <span className="text-xs text-slate-400 block cursor-default select-none">{ind}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact info (Right side - 3 cols) */}
          <div className="lg:col-span-3 lg:text-right flex flex-col lg:items-end">
            <p className="text-[0.72rem] uppercase tracking-[0.16em] font-semibold text-slate-300">Direct Inquiries</p>
            <div className="mt-4 space-y-3">
              <a href="tel:+917745868073" className="flex items-center lg:justify-end gap-3 text-slate-300 hover:text-white transition-colors group">
                <span className="text-xs sm:text-sm font-medium">+91 77458 68073</span>
                <span className="size-8 rounded-lg bg-slate-800/80 border border-slate-700/60 grid place-items-center text-slate-300 group-hover:text-white group-hover:border-slate-600 transition-colors">
                  <Phone className="size-3.5" />
                </span>
              </a>
              <a href="mailto:sapdigitechsolutions@gmail.com" className="flex items-center lg:justify-end gap-3 text-slate-300 hover:text-white transition-colors group">
                <span className="text-sm font-medium">sapdigitechsolutions@gmail.com</span>
                <span className="size-8 rounded-lg bg-slate-800/80 border border-slate-700/60 grid place-items-center text-slate-300 group-hover:text-white group-hover:border-slate-600 transition-colors">
                  <Mail className="size-3.5" />
                </span>
              </a>
              <div className="flex items-center lg:justify-end gap-3 text-slate-300">
                <span className="text-sm font-medium">Pune · Nashik · Mumbai</span>
                <span className="size-8 rounded-lg bg-slate-800/80 border border-slate-700/60 grid place-items-center text-slate-300">
                  <MapPin className="size-3.5" />
                </span>
              </div>
            </div>

            {/* Social links right-aligned */}
            <div className="mt-6 flex items-center lg:justify-end gap-2.5">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/sap_digitechsolutions/", color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:scale-105" },
                { Icon: Facebook, href: "https://www.facebook.com/sapdigitechsolutions/", color: "bg-[#1877F2] hover:bg-[#1877F2]/90 hover:scale-105" },
                { Icon: PinterestLogo, href: "https://in.pinterest.com/sapdigitechsolutions/", color: "bg-[#E60023] hover:bg-[#D5001F] hover:scale-105" },
                { Icon: Youtube, href: "https://www.youtube.com/@sapdigitechsolutions", color: "bg-[#FF0000] hover:bg-[#E60000] hover:scale-105" },
              ].map(({ Icon, href, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Social"
                  className={`size-8 grid place-items-center rounded-lg text-white transition-all duration-200 ${color}`}
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SAP DigiTech Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/#services" className="hover:text-slate-300 transition-colors">Services</a>
            <a href="/products" className="hover:text-slate-300 transition-colors">Products</a>
            <a href="/careers" className="hover:text-slate-300 transition-colors">Careers</a>
            <a href="/contact" className="hover:text-slate-300 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- Root/* -------------------- Root -------------------- */

function Landing() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section");
    const targets: HTMLElement[] = [];
    sections.forEach((section) => {
      if (section.id === "home") return; // hero already animates
      const kids = Array.from(section.children) as HTMLElement[];
      const roots = kids.length === 1 && kids[0].children.length > 0
        ? (Array.from(kids[0].children) as HTMLElement[])
        : kids;
      roots.forEach((el, i) => {
        el.classList.add("reveal");
        el.style.setProperty("--reveal-delay", `${Math.min(i * 80, 320)}ms`);
        targets.push(el);
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Nav />
      <Hero />
      <About />
      <AiSolutions />


      <Industries />

      <Portfolio />
      <Testimonials />
      <Footer />
    </main>
  );
}

