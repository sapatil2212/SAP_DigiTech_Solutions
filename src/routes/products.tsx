import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Nav, Footer } from "./index";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle, Brain, HeartPulse, ArrowRight, Check, ChevronDown,
  Zap, Shield, BarChart3, Users, Calendar, FileText, Phone, Bell,
  Workflow, Bot, Target, TrendingUp, Star, Play, Sparkles, Send,
  Layers, Clock, Activity, CheckCircle2, ShieldCheck, Database,
  Sliders, Laptop, Building2, Stethoscope, Mail, ExternalLink,
  Search, Scale, Inbox, Sparkle, RefreshCw, QrCode, MapPin,
  CheckCircle, ArrowUpRight, Gauge, Lock, Globe, Server, Terminal,
  Cpu, Copy, CheckCheck, Eye, Monitor
} from "lucide-react";

export const Route = createFileRoute("/products")({ component: ProductsPage });

/* -------------------------------------------------------------------------- */
/*                  Real-Time Browser Mockup Component                        */
/* -------------------------------------------------------------------------- */
interface ProductBrowserMockupProps {
  title: string;
  url: string;
  localImg: string;
  badge?: string;
  children?: React.ReactNode;
}

function ProductBrowserMockup({ title, url, localImg, badge, children }: ProductBrowserMockupProps) {
  const [viewMode, setViewMode] = useState<"website" | "simulator">(children ? "website" : "website");
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setImgLoaded(true);
    }
  }, [localImg]);

  const cleanDomain = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-[#090D18] border border-slate-700/90 shadow-2xl overflow-hidden text-slate-100 font-sans transition-all duration-300">
      {/* Browser Top Navigation Chrome */}
      <div className="px-4 py-3 bg-[#0E1322] border-b border-slate-800 flex items-center justify-between gap-3">
        {/* Window controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="size-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <div className="size-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="size-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>

        {/* Address bar */}
        <div className="flex-1 max-w-sm bg-slate-900/90 border border-slate-700/80 rounded-full px-3.5 py-1 flex items-center justify-between gap-2 text-xs shadow-inner">
          <div className="flex items-center gap-1.5 truncate">
            <Lock className="size-3 text-emerald-400 shrink-0" />
            <span className="text-[0.72rem] text-slate-300 font-mono truncate">{cleanDomain}</span>
          </div>
          <span className="flex items-center gap-1 text-[0.62rem] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
          </span>
        </div>

        {/* External direct link */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open ${title} in new tab`}
          className="size-7 rounded-lg bg-slate-800 hover:bg-[#FF6B00] text-slate-300 hover:text-white grid place-items-center transition-colors shrink-0"
        >
          <ExternalLink className="size-3.5" />
        </a>
      </div>

      {/* Mode Switcher (If simulator exists) */}
      {children && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-950/90 border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setViewMode("website")}
              className={[
                "px-3 py-1 rounded-md text-[0.7rem] font-bold transition-all cursor-pointer flex items-center gap-1.5",
                viewMode === "website"
                  ? "bg-[#FF6B00] text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              ].join(" ")}
            >
              <Monitor className="size-3" /> Realtime Website
            </button>
            <button
              type="button"
              onClick={() => setViewMode("simulator")}
              className={[
                "px-3 py-1 rounded-md text-[0.7rem] font-bold transition-all cursor-pointer flex items-center gap-1.5",
                viewMode === "simulator"
                  ? "bg-[#FF6B00] text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              ].join(" ")}
            >
              <Sparkles className="size-3" /> Interactive Cockpit
            </button>
          </div>

          <span className="text-[0.65rem] text-slate-400 font-medium hidden sm:inline">
            {viewMode === "website" ? "High-res live screenshot preview" : "Feature simulation"}
          </span>
        </div>
      )}

      {/* Main Preview Container */}
      <div className="relative bg-slate-950 min-h-[320px] max-h-[420px] overflow-hidden group">
        {viewMode === "website" ? (
          <div className="relative w-full h-full min-h-[320px] max-h-[400px] overflow-y-auto scrollbar-thin">
            {/* Loading skeleton */}
            {!imgLoaded && !imgError && (
              <div className="absolute inset-0 bg-slate-900 animate-pulse flex flex-col items-center justify-center p-6 space-y-4">
                <div className="size-10 rounded-full bg-slate-800 border border-slate-700 grid place-items-center">
                  <Globe className="size-5 text-[#FF6B00] animate-spin" />
                </div>
                <p className="text-xs text-slate-400 font-mono">Loading realtime {title} preview...</p>
              </div>
            )}

            {/* Live website preview screenshot */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative overflow-hidden group/img"
            >
              <img
                ref={imgRef}
                src={localImg}
                alt={`${title} live website preview`}
                className={[
                  "w-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-[1.02]",
                  imgLoaded ? "opacity-100" : "opacity-0"
                ].join(" ")}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                loading="eager"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 bg-[#FF6B00] px-3.5 py-1.5 rounded-full shadow-lg">
                  Launch {cleanDomain} <ExternalLink className="size-3.5" />
                </span>
                <span className="text-[0.68rem] text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  Click to open full website
                </span>
              </div>
            </a>

            {/* Error fallback */}
            {imgError && (
              <div className="p-8 text-center space-y-3 flex flex-col items-center justify-center min-h-[300px]">
                <Globe className="size-8 text-slate-500" />
                <p className="text-xs text-slate-400">Live preview directly available at</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs"
                >
                  Visit {cleanDomain} <ExternalLink className="size-3.5" />
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 overflow-y-auto max-h-[400px]">
            {children}
          </div>
        )}
      </div>

      {/* Browser Bottom Status Footer */}
      <div className="px-4 py-2.5 bg-[#0A0E1A] border-t border-slate-800 flex items-center justify-between text-[0.7rem] text-slate-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-emerald-400" /> Production Verified
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF6B00] font-bold hover:underline flex items-center gap-1"
        >
          {cleanDomain} <ArrowUpRight className="size-3" />
        </a>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                        1. BriefVault Simulator                             */
/* -------------------------------------------------------------------------- */
function BriefVaultSimulator() {
  const [activeLegalTab, setActiveLegalTab] = useState<"summary" | "risks" | "timeline">("summary");

  return (
    <div className="space-y-3 text-xs font-sans">
      <div className="flex items-center border-b border-slate-800 bg-slate-900/60 px-3 pt-1 gap-2 text-xs rounded-xl">
        {[
          { id: "summary" as const, label: "Executive Digest" },
          { id: "risks" as const, label: "Risk Matrix (2 Flags)" },
          { id: "timeline" as const, label: "Statutory Deadlines" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveLegalTab(t.id)}
            className={[
              "pb-2 px-2 text-[0.7rem] font-semibold border-b-2 transition-all cursor-pointer",
              activeLegalTab === t.id
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeLegalTab === "summary" && (
        <div className="space-y-2.5 animate-in fade-in duration-200">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[0.65rem] font-bold text-indigo-400 uppercase tracking-wider block mb-1">30-Second AI Takeaway</span>
            <p className="text-[0.72rem] text-slate-300 leading-relaxed">
              Standard 5-year commercial tenancy with mandatory 9% annual escalation. Lessee holds exclusive right of first refusal for 3rd-floor expansion. Indemnity capped at ₹25 Lakhs.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[0.6rem] text-slate-400 block">Jurisdiction</span>
              <span className="text-xs font-bold text-white mt-0.5 block">High Court of Bombay</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[0.6rem] text-slate-400 block">Lock-in Period</span>
              <span className="text-xs font-bold text-emerald-400 mt-0.5 block">24 Months (Mutual)</span>
            </div>
          </div>
        </div>
      )}

      {activeLegalTab === "risks" && (
        <div className="space-y-2 animate-in fade-in duration-200">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
            <div className="flex items-center justify-between text-[0.68rem] font-bold">
              <span>⚠️ Clause 14.2: Unilateral Termination</span>
              <span className="text-[0.6rem] bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-300">Moderate Risk</span>
            </div>
            <p className="text-[0.65rem] text-slate-300 mt-1">
              Lessor reserves 15-day exit clause without penalty in event of municipal rezoning.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
            <div className="flex items-center justify-between text-[0.68rem] font-bold">
              <span>✓ Clause 8.1: Security Deposit Return</span>
              <span className="text-[0.6rem] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300">Compliant</span>
            </div>
            <p className="text-[0.65rem] text-slate-300 mt-1">
              30-day statutory refund timeline with 12% compounding interest on delayed handover.
            </p>
          </div>
        </div>
      )}

      {activeLegalTab === "timeline" && (
        <div className="space-y-1.5 animate-in fade-in duration-200">
          {[
            { date: "Oct 15, 2026", event: "Stamp Duty & Registration Submission", status: "In 36 Days", color: "text-indigo-400" },
            { date: "Nov 01, 2026", event: "Possession Handover & Fit-out", status: "Milestone", color: "text-emerald-400" },
            { date: "Oct 31, 2028", event: "First 9% Rent Escalation Review", status: "Long-term", color: "text-slate-400" },
          ].map((d, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-white block">{d.event}</span>
                <span className="text-[0.62rem] text-slate-400">{d.date}</span>
              </div>
              <span className={["text-[0.65rem] font-mono font-bold", d.color].join(" ")}>{d.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                       2. BookMyTime Simulator                             */
/* -------------------------------------------------------------------------- */
function BookMyTimeSimulator() {
  const [selectedSlot, setSelectedSlot] = useState<string>("10:30 AM");
  const [booked, setBooked] = useState<boolean>(false);

  return (
    <div className="space-y-3 text-xs font-sans">
      <span className="text-[0.68rem] uppercase font-bold text-slate-400 tracking-wider block">
        Select Consultation Time Slot (Today)
      </span>
      <div className="grid grid-cols-3 gap-1.5">
        {["09:30 AM", "10:30 AM", "11:45 AM", "02:15 PM", "04:00 PM", "05:30 PM"].map((slot) => (
          <button
            key={slot}
            type="button"
            onClick={() => {
              setSelectedSlot(slot);
              setBooked(false);
            }}
            className={[
              "py-1.5 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center",
              selectedSlot === slot
                ? "bg-[#0D83FF] text-white border-[#0D83FF] shadow-md shadow-[#0D83FF]/25"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
            ].join(" ")}
          >
            {slot}
          </button>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[0.6rem] text-slate-400 uppercase font-semibold block">Selected Booking</span>
          <span className="text-xs font-bold text-white block mt-0.5">Dr. Rajesh Kulkarni (Cardiology)</span>
          <span className="text-[0.65rem] text-[#0D83FF] font-medium">Slot: {selectedSlot} • Fee: ₹500</span>
        </div>

        <button
          type="button"
          onClick={() => setBooked(true)}
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#0059C6] to-[#0D83FF] hover:brightness-110 text-white text-xs font-bold transition-all cursor-pointer"
        >
          {booked ? "✓ Confirmed!" : "Confirm Slot"}
        </button>
      </div>

      {booked && (
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[0.7rem] flex items-center gap-1.5 animate-in fade-in duration-200">
          <CheckCircle2 className="size-3.5 shrink-0 text-emerald-400" />
          <span>Instant WhatsApp booking confirmation & calendar invite triggered!</span>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                       3. ChatNexGen Simulator                             */
/* -------------------------------------------------------------------------- */
function ChatNexGenSimulator() {
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string; time: string; options?: string[] }>>([
    {
      sender: "bot",
      text: "Hello! Welcome to ChatNexGen AI. I am your automated WhatsApp customer concierge. How can I help you today?",
      time: "9:41 AM",
      options: ["Qualify Inbound Leads", "Schedule Client Demo", "Meta API Pricing"]
    }
  ]);
  const [typing, setTyping] = useState(false);

  const handleOptionClick = (optionText: string) => {
    const userMsg = { sender: "user" as const, text: optionText, time: "Just now" };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      let replyText = "";
      let newOptions: string[] | undefined = undefined;

      if (optionText.includes("Qualify")) {
        replyText = "Our AI asks custom pre-qualification questions, scores user intent, and syncs high-value leads directly into your Kanban pipeline.";
        newOptions = ["View Pipeline Demo", "Connect with Sales"];
      } else if (optionText.includes("Pricing")) {
        replyText = "ChatNexGen flat platform access starts at ₹2,999/mo per WABA number with 0% markup on official Meta API charges.";
        newOptions = ["Get Verified Number", "Start 7-Day Trial"];
      } else {
        replyText = "Done! A dedicated technical architect has been notified and will coordinate with your team over WhatsApp.";
        newOptions = ["Explore Documentation", "Talk to Founder"];
      }

      setMessages(prev => [...prev, { sender: "bot", text: replyText, time: "Just now", options: newOptions }]);
    }, 600);
  };

  return (
    <div className="space-y-2.5 text-xs font-sans">
      <div className="p-3 bg-[#0B141A] rounded-2xl border border-slate-800 min-h-[200px] max-h-[220px] overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={["flex flex-col", m.sender === "user" ? "items-end" : "items-start"].join(" ")}>
            <div
              className={[
                "max-w-[85%] rounded-xl p-2.5 text-[0.7rem] leading-relaxed",
                m.sender === "user"
                  ? "bg-[#005C4B] text-slate-100 rounded-tr-xs"
                  : "bg-[#202C33] text-slate-100 rounded-tl-xs border border-slate-700/50"
              ].join(" ")}
            >
              <p>{m.text}</p>
              <span className="text-[0.58rem] text-slate-400 mt-1 block text-right">{m.time}</span>
            </div>

            {m.options && (
              <div className="mt-1.5 flex flex-wrap gap-1">
                {m.options.map((opt, oi) => (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => handleOptionClick(opt)}
                    className="text-[0.65rem] font-semibold bg-[#00DF82]/15 hover:bg-[#00DF82] text-[#00DF82] hover:text-slate-950 border border-[#00DF82]/40 rounded-full px-2.5 py-0.5 transition-all cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {typing && (
          <div className="flex items-center gap-1 bg-[#202C33] rounded-xl px-2.5 py-1.5 w-fit border border-slate-700/50">
            <span className="size-1 rounded-full bg-[#00DF82] animate-bounce" />
            <span className="size-1 rounded-full bg-[#00DF82] animate-bounce [animation-delay:0.2s]" />
            <span className="size-1 rounded-full bg-[#00DF82] animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Main Page Route                              */
/* -------------------------------------------------------------------------- */
export function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const products = [
    {
      id: "briefvault",
      name: "BriefVault",
      tagline: "Legal Intelligence & AI Document Summarization Platform",
      url: "https://briefvault.in/",
      localImg: "/assets/work/website-preview/briefvault.png",
      category: "intelligence",
      categoryName: "Legal AI & Intelligence",
      badge: "AI Legal Tech",
      desc: "Instantly digest contracts, judgments, arbitration orders, compliance reports, and complex documents. Extract key takeaways, risk highlights, deadlines, and citation-backed insights effortlessly without reading hundreds of pages manually.",
      features: [
        { title: "30-Second & 1-Page Digests", desc: "Automate hours of manual reading into structured executive briefings.", icon: FileText },
        { title: "Risk & Compliance Checklist", desc: "Surface buried limitation periods, penalty clauses, and indemnity exposures.", icon: ShieldCheck },
        { title: "Statutory Deadline Tracker", desc: "Never miss appeal filing windows or contractual escalation milestones.", icon: Clock },
        { title: "Citation-Backed AI Q&A", desc: "Ask specific case questions with direct references to document page numbers.", icon: Sparkles },
      ],
      simulator: <BriefVaultSimulator />,
    },
    {
      id: "primeinbox",
      name: "PrimeInbox",
      tagline: "AI Cold Email Campaign & Deliverability OS",
      url: "https://primeinbox.online/",
      localImg: "/assets/work/website-preview/primeinbox.png",
      category: "outreach",
      categoryName: "Cold Outreach & Email",
      badge: "Email Deliverability OS",
      desc: "Run cold email campaigns that actually land in the primary inbox and convert prospects into meetings. Multi-account sending rotation, AI copywriting, auto-sequencing, and real-time open/click telemetry all managed from one unified workspace.",
      features: [
        { title: "Multi-Account Inbox Rotation", desc: "Distribute daily email volume across multiple SMTP accounts to safeguard sender reputation.", icon: Server },
        { title: "AI Copywriter & Sequencer", desc: "Draft high-converting follow-up sequences tailored to prospect personas.", icon: Sparkles },
        { title: "Smart CSV Header Mapper", desc: "Import and sanitize leads from any database with zero formatting errors.", icon: Database },
        { title: "Real-Time Telemetry & Tracking", desc: "Track verified opens, link clicks, and reply rates with custom tracking domains.", icon: BarChart3 },
      ],
    },
    {
      id: "greviewpilot",
      name: "GReviewPilot",
      tagline: "Google Review Management & Reputation Engine",
      url: "https://greviewpilot.com/",
      localImg: "/assets/work/website-preview/greviewpilot.png",
      category: "reputation",
      categoryName: "Reputation & Local SEO",
      badge: "Google Reputation OS",
      desc: "Manage Google Business Profile reviews across single and multi-location businesses from one unified inbox. Read every review, generate and publish AI-assisted owner replies in your brand tone, analyze customer sentiment, and track Search & Maps performance.",
      features: [
        { title: "Unified Multi-Location Inbox", desc: "Consolidate customer reviews from every branch into one organized feed.", icon: Inbox },
        { title: "Tone-Controlled AI Reply Drafts", desc: "Generate professional, empathetic owner replies ready for 1-click publishing.", icon: MessageCircle },
        { title: "Sentiment & Recurring Issues", desc: "Identify what customers consistently praise and what operations need fixing.", icon: TrendingUp },
        { title: "Search & Maps Visibility Tracking", desc: "Monitor calls, website clicks, and local search impressions per location.", icon: MapPin },
      ],
    },
    {
      id: "bookmytime",
      name: "BookMyTime",
      tagline: "Multi-Tenant AI Booking System & CRM for Indian Businesses",
      url: "https://bookmytime.tech/",
      localImg: "/assets/work/website-preview/bookmytime.png",
      category: "crm",
      categoryName: "Booking & CRM",
      badge: "Multi-Tenant Booking OS",
      desc: "Cut scheduling overhead by 85%. Launch custom-branded multi-tenant booking portals in 5 minutes with automated WhatsApp reminders, AI customer scheduling assistance, multi-staff calendar sync, and smart customer CRM tailored for clinics, salons, gyms, and academies.",
      features: [
        { title: "Multi-Tenant White-Label Portals", desc: "Launch dedicated, custom-branded booking pages for every branch and specialist.", icon: Globe },
        { title: "Automated WhatsApp Alerts", desc: "Instant booking confirmations, slot reminders, and zero-show follow-ups.", icon: Bell },
        { title: "Multi-Staff & Branch Calendars", desc: "Coordinate doctor/staff shifts, break times, and consultation capacities.", icon: Calendar },
        { title: "Customer Records & CRM", desc: "Centralized client history, appointment records, and payment logs.", icon: Users },
      ],
      simulator: <BookMyTimeSimulator />,
    },
    {
      id: "chatnexgen",
      name: "ChatNexGen",
      tagline: "AI-Powered WhatsApp CRM & Business Automation Platform",
      url: "https://chatnexgen.online/",
      localImg: "/assets/work/website-preview/chatnexgen.png",
      category: "crm",
      categoryName: "WhatsApp CRM & AI",
      badge: "Meta Official Cloud API",
      desc: "Sync team conversations, qualify incoming inquiries automatically with custom knowledge-base AI agents, manage sales pipelines with visual Kanban boards, and streamline appointment scheduling on WhatsApp—fully compliant with Meta Business guidelines.",
      features: [
        { title: "Official Meta Cloud API", desc: "Direct official API integration with zero risk of phone number bans or spam flags.", icon: ShieldCheck },
        { title: "24/7 Knowledge-Base AI Agent", desc: "Answers client inquiries using your uploaded PDFs, service guides, and FAQs.", icon: Bot },
        { title: "Shared Multi-Agent Team Inbox", desc: "Assign conversations, add internal notes, and seamlessly hand off AI chats to human reps.", icon: Users },
        { title: "Visual Kanban Sales Pipeline", desc: "Track lead stages from initial WhatsApp inquiry to signed deal and payment.", icon: Workflow },
      ],
      simulator: <ChatNexGenSimulator />,
    },
    {
      id: "nexaleadai",
      name: "NexaLead AI",
      tagline: "Automated Google Maps Lead Scraper & AI Outreach Engine",
      url: "https://nexaleadai.online/",
      localImg: "/assets/work/website-preview/nexaleadai.png",
      category: "outreach",
      categoryName: "Lead Gen & Scraping",
      badge: "Google Maps Scraper",
      desc: "Headless Playwright-powered Google Maps scraper that scans any business category across target cities, detects local businesses without modern websites, scores lead intent with Gemini AI, and exports qualified pipelines to Google Sheets and CRMs in real time.",
      features: [
        { title: "Automated Google Maps Scraper", desc: "Extract business names, phone numbers, addresses, ratings, and social handles at scale.", icon: Search },
        { title: "Gemini AI Lead Scoring", desc: "Score prospect intent based on review velocity, category margins, and web presence.", icon: Brain },
        { title: "Website Gap Identification", desc: "Instantly flag profitable local businesses that lack a functional landing page.", icon: Target },
        { title: "Real-Time Google Sheets Sync", desc: "Continuous webhook stream pushing verified leads directly to your sales team.", icon: Database },
      ],
    },
  ];

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(p => p.category === activeCategory);

  useEffect(() => {
    // Scroll reveal logic
    const sections = document.querySelectorAll<HTMLElement>("main section");
    const targets: HTMLElement[] = [];
    sections.forEach((section) => {
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
    <main className="min-h-screen bg-[#FDFDFC] text-slate-900 overflow-x-clip pt-28 md:pt-32">
      <Nav />

      {/* Hero Header */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-1280 relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/10 text-slate-800 text-xs font-semibold tracking-wide">
            <span className="size-2 rounded-full bg-[#FF6B00] animate-pulse" />
            <span>SAP DigiTech Software Suite</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-medium">Live Production SaaS</span>
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1B2240] tracking-tight leading-[1.08]">
            Proprietary SaaS Products &<br className="hidden sm:inline" />{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#E05300] to-[#1B2240] bg-clip-text text-transparent">
              Intelligent Automations.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Explore our specialized platforms built for legal intelligence, cold email outreach, Google review reputation, WhatsApp automation, and multi-tenant CRM with real-time website previews.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Products (6)" },
              { id: "intelligence", label: "Legal AI & Intelligence" },
              { id: "outreach", label: "Lead Gen & Outreach" },
              { id: "crm", label: "WhatsApp & CRM" },
              { id: "reputation", label: "Google Reputation" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={[
                  "px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border",
                  activeCategory === cat.id
                    ? "bg-[#1B2240] text-white border-[#1B2240] shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                ].join(" ")}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Anchor Bar */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {products.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-200 text-[0.72rem] font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
              >
                <span className="size-1.5 rounded-full bg-[#FF6B00]" />
                <span>{p.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase Cards */}
      <div className="space-y-0">
        {filteredProducts.map((prod, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <section
              key={prod.id}
              id={prod.id}
              className={[
                "py-16 md:py-20 border-t border-slate-100 relative scroll-mt-24",
                isEven ? "bg-white" : "bg-slate-50/60"
              ].join(" ")}
            >
              <div className="container-1280">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
                  {/* Info Column */}
                  <div className={["lg:col-span-6 space-y-6", isEven ? "" : "lg:order-2"].join(" ")}>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold">
                        <Sparkles className="size-3.5" />
                        <span>{prod.badge}</span>
                      </span>
                      <span className="text-xs text-slate-400 font-medium">• {prod.categoryName}</span>
                    </div>

                    <div>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B2240] tracking-tight leading-tight">
                        {prod.name}
                      </h2>
                      <p className="mt-2 text-sm sm:text-base font-semibold text-[#FF6B00]">
                        {prod.tagline}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {prod.desc}
                    </p>

                    {/* Bento Feature Pillars */}
                    <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
                      {prod.features.map((feat, fi) => {
                        const IconComponent = feat.icon;
                        return (
                          <div
                            key={fi}
                            className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs hover:border-slate-400 transition-colors"
                          >
                            <IconComponent className="size-5 text-[#FF6B00] mb-2" />
                            <h4 className="text-xs font-bold text-slate-900">{feat.title}</h4>
                            <p className="text-[0.75rem] text-slate-500 mt-1 leading-normal">{feat.desc}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* CTA Buttons */}
                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <a
                        href={prod.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        Visit {prod.name} <ExternalLink className="size-4" />
                      </a>
                      <a
                        href="/contact"
                        className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center gap-2 border border-slate-800"
                      >
                        Book Live Demo <ArrowRight className="size-3.5" />
                      </a>
                      <span className="text-[0.72rem] text-slate-400 font-mono w-full sm:w-auto">
                        Live URL: <a href={prod.url} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-[#FF6B00] font-semibold underline">{prod.url}</a>
                      </span>
                    </div>
                  </div>

                  {/* Browser Mockup Preview Column */}
                  <div className={["lg:col-span-6 flex justify-center", isEven ? "" : "lg:order-1"].join(" ")}>
                    <ProductBrowserMockup
                      title={prod.name}
                      url={prod.url}
                      localImg={prod.localImg}
                      badge={prod.badge}
                    >
                      {prod.simulator}
                    </ProductBrowserMockup>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Enterprise Architecture Consultation CTA */}
      <section className="py-16 md:py-20 bg-[#080C16] text-white border-t border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00]/10 via-transparent to-cyan-500/10 pointer-events-none" />
        <div className="container-1280 relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300 font-medium">
            <Sparkles className="size-3.5 text-[#FF6B00]" /> Custom Systems Engineering & White-Labeling
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Need a Bespoke SaaS Platform or Custom AI Integration?
          </h2>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Our engineering studio builds white-labeled SaaS portals, custom CRM workflows, and autonomous AI integrations tailored specifically for your vertical.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a href="/contact" className="btn-primary">
              Book Architecture Strategy Call <ArrowRight className="size-4" />
            </a>
            <a
              href="https://wa.me/917745868073?text=Hi%20SAP%20DigiTech%20Solutions%2C%20I%20would%20like%20to%20discuss%20custom%20SaaS%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Phone className="size-4 text-[#25D366]" /> +91 77458 68073
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
