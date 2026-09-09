import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav, Footer } from "./index";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Star, Rocket, TrendingUp, Bot, Send, ChevronRight, Brain,
  Megaphone, Shield, Check, X, Film, Paintbrush, ArrowRight,
  Sparkles, CheckCircle2, MessageSquare, Phone, Layers,
  ChevronDown, HelpCircle, Code, Workflow, Zap, Target
} from "lucide-react";

export const Route = createFileRoute("/services")({ component: ServicesPage });

const EASE = [0.22, 1, 0.36, 1] as const;

const cards = [
  {
    category: "marketing",
    categoryLabel: "Performance & Ads",
    badge: "Verified 4.8x ROAS",
    tone: "cream",
    bg: "#FBF0D950",
    icon: <TrendingUp className="size-5" />,
    iconBg: "#F5B841",
    iconColor: "#FFFFFF",
    title: "Performance Marketing",
    desc: "Maximize ROI and scale campaigns with hyper-targeted, AI-optimized ad placement.",
    longDesc: "We build and optimize high-converting campaigns across Search, Social, and Display channels, continuously testing creatives and landing pages with machine learning models to maximize your return on ad spend.",
    timeline: "Launch in 3-5 days",
    benefits: [
      "Audience targeting driven by predictive AI models",
      "Real-time automated budget and bid balancing across Meta & Google",
      "Creative testing, landing page copywriting, and continuous A/B split tests",
      "Revenue and conversion-focused performance analytics with weekly audits",
    ],
    mock: (
      <img
        src="/assets/solutions/marketing_analytics.png"
        alt="Performance Marketing Mockup"
        className="w-full h-auto block"
      />
    ),
  },
  {
    category: "marketing",
    categoryLabel: "Performance & Ads",
    badge: "Viral Engagement",
    tone: "blush",
    bg: "#FCE4E450",
    icon: <Send className="size-5" />,
    iconBg: "#F58A8A",
    iconColor: "#FFFFFF",
    title: "SMM (Social Media Marketing)",
    desc: "Build a powerful online presence and drive organic engagement.",
    longDesc: "Build community and drive awareness. We handle content calendars, community management, and paid social distribution, crafting narratives that turn followers into brand advocates.",
    timeline: "Weekly sprint cycles",
    benefits: [
      "Consistent posting calendars tailored to platform algorithms",
      "Community moderation and instant engagement protocols",
      "Data-driven trending audio and cultural topic synthesis",
      "Influencer outreach, creator partnerships, and collaboration playbooks",
    ],
    mock: (
      <img
        src="/assets/solutions/content_automation.png"
        alt="SMM Mockup"
        className="w-full h-auto block"
      />
    ),
  },
  {
    category: "engineering",
    categoryLabel: "Web Development",
    badge: "Sub-Second Latency",
    tone: "lavender",
    bg: "#E8E4FA50",
    icon: <Rocket className="size-5" />,
    iconBg: "#7B6BF5",
    iconColor: "#FFFFFF",
    title: "Website Development",
    desc: "High-performance, responsive websites engineered for speed and conversion.",
    longDesc: "We design and build ultra-fast, modern web applications tailored to your business goals. Engineered with clean code, modern UX principles, and search engine optimization built-in.",
    timeline: "Custom build in 7-14 days",
    benefits: [
      "Sub-second page speeds on Core Web Vitals (98+ Lighthouse scores)",
      "SEO-optimized semantic markup, open graph schemas, and rich snippets",
      "Responsive fluid grid design optimized across all mobile & desktop viewports",
      "Secure, accessible, TypeScript-typed codebases with automated CI/CD",
    ],
    mock: (
      <img
        src="/assets/solutions/website_dev.png"
        alt="Website Development Mockup"
        className="w-full h-auto block"
      />
    ),
  },
  {
    category: "automation",
    categoryLabel: "AI & Automation",
    badge: "Official Meta Cloud API",
    tone: "indigo",
    bg: "#E0E7FF50",
    icon: <Bot className="size-5" />,
    iconBg: "#4F46E5",
    iconColor: "#FFFFFF",
    title: "AI-Powered Business Automation",
    desc: "Automate repetitive tasks, CRM pipelines, and workflows to scale operations.",
    longDesc: "Streamline workflows and scale without scaling headcount. We integrate your software stack, set up smart CRM pipelines, and deploy AI assistants to automate lead routing, customer support, and data entry.",
    timeline: "Deployment in 48-72 hours",
    benefits: [
      "Automatic 15-second lead triage, intent scoring, and WhatsApp routing",
      "24/7 support via generative AI chat systems trained on your company data",
      "Seamless cross-platform integrations (HubSpot, Zoho, Sheets, Meta Cloud API)",
      "Automated appointment booking reminders and re-engagement drips",
    ],
    mock: (
      <img
        src="/assets/solutions/business_automation.png"
        alt="AI-Powered Business Automation Mockup"
        className="w-full h-auto block"
      />
    ),
  },
  {
    category: "creative",
    categoryLabel: "Media & Design",
    badge: "4K Cinematic Delivery",
    tone: "sky",
    bg: "#E0F2FE50",
    icon: <Film className="size-5" />,
    iconBg: "#0284C7",
    iconColor: "#FFFFFF",
    title: "Video Production & Editing",
    desc: "High-impact video content for ads, social media, and brand storytelling.",
    longDesc: "We produce scroll-stopping videos tailored for TikTok, Reels, YouTube, and digital ads. From scripting and voiceovers to editing, pacing, and color-grading, we craft videos that command attention.",
    timeline: "Turnaround in 48 hours",
    benefits: [
      "Scroll-stopping dynamic hooks and high-retention editing pacing",
      "Professional color grading, sound design, and studio audio mixing",
      "Multi-format exports optimized for Reels (9:16), YouTube (16:9), and Ads",
      "Conversion scripting and AI-assisted multilingual voiceover assets",
    ],
    mock: (
      <img
        src="/assets/solutions/video_editing.png"
        alt="Video Production & Editing Mockup"
        className="w-full h-auto block"
      />
    ),
  },
  {
    category: "creative",
    categoryLabel: "Media & Design",
    badge: "Brand Identity Systems",
    tone: "mint",
    bg: "#DCFCE750",
    icon: <Paintbrush className="size-5" />,
    iconBg: "#059669",
    iconColor: "#FFFFFF",
    title: "Creative Graphic Designing",
    desc: "Stunning brand assets, ad creatives, and digital illustrations.",
    longDesc: "Elevate your visual identity. We design custom brand assets, high-CTR display ads, presentation decks, and social media graphics that reinforce your credibility and drive engagement.",
    timeline: "Weekly creative drops",
    benefits: [
      "Custom brand identity guidelines, typography systems, and vector logos",
      "High-CTR display ad creatives engineered for Meta & Google benchmarks",
      "Editable design toolkits, social media templates, and marketing kits",
      "Custom vector illustrations, packaging mockups, and infographic diagrams",
    ],
    mock: (
      <img
        src="/assets/solutions/graphic_design.png"
        alt="Creative Graphic Designing Mockup"
        className="w-full h-auto block"
      />
    ),
  },
];

const features = [
  { icon: Brain, title: "AI-Powered Strategies", desc: "Smarter decisions, better results." },
  { icon: Megaphone, title: "End-to-End Digital Solutions", desc: "Everything your business needs." },
  { icon: Rocket, title: "Results That Scale", desc: "Grow faster with technology." },
  { icon: Shield, title: "Trusted by Businesses", desc: "Built on trust. Driven by results." },
];

const processSteps = [
  {
    step: "01",
    title: "Audit & Growth Blueprint",
    desc: "We analyze your current funnels, ad accounts, and operational bottlenecks to build a customized growth architecture.",
    icon: Target,
  },
  {
    step: "02",
    title: "Engineering & AI Integration",
    desc: "Our developers and AI engineers build the custom web apps, Meta Cloud APIs, and CRM webhooks needed for automated scale.",
    icon: Code,
  },
  {
    step: "03",
    title: "Multi-Channel Launch",
    desc: "Campaigns and automations go live with precision audience targeting, real-time conversion tracking, and instant lead triage.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Optimization & Compounding",
    desc: "We calibrate models, split-test creatives, and refine qualification logic weekly to compound ROI without increasing overhead.",
    icon: TrendingUp,
  },
];

const faqs = [
  {
    q: "How fast can we launch our campaigns or automation systems?",
    a: "Standard Meta WhatsApp automation systems and initial ad campaign setups launch within 3 to 5 business days. Custom full-stack web applications typically ship within 7 to 14 days.",
  },
  {
    q: "How does the WhatsApp automation integrate with our existing CRM?",
    a: "We integrate directly with HubSpot, Zoho, Salesforce, Google Sheets, or custom SQL databases using official Meta Cloud API webhooks with zero manual data entry required.",
  },
  {
    q: "Do you provide dedicated account management?",
    a: "Yes. Every client is paired with a dedicated Strategy Director and technical lead, complete with real-time Slack/WhatsApp channel access and weekly performance reviews.",
  },
  {
    q: "What ad budget do you recommend for performance marketing?",
    a: "We manage monthly growth spends ranging from ₹25,000 to ₹10,00,000+. Our automated bid balancing ensures every rupee is spent on high-intent conversion paths.",
  },
];

export function ServicesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const reduceMotion = useReducedMotion() ?? false;
  const active = openIndex !== null ? cards[openIndex] : null;

  const filteredCards = filter === "all" ? cards : cards.filter((c) => c.category === filter);

  return (
    <div className="min-h-screen bg-[#F9F7F4] text-navy antialiased selection:bg-[#FF6B00] selection:text-white">
      <Nav />

      {/* Hero Header */}
      <section className="relative pt-36 md:pt-44 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5EF]/70 via-[#F9F7F4] to-[#F9F7F4] pointer-events-none" />
        
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-20 size-[420px] rounded-full bg-[#FF6B00]/7 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-20 right-0 size-[380px] rounded-full bg-[#1B2240]/6 blur-3xl pointer-events-none"
        />

        <div className="container-1280 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#E8E4FA] px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[#3B2E7A] shadow-xs mb-5"
            >
              <Star className="size-3.5 sm:size-4 fill-[#7B6BF5] text-[#7B6BF5]" />
              AI Powered Digital Agency
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]"
            >
              <span className="block">AI-Powered Solutions for</span>
              <span className="block mt-1">
                Smarter{" "}
                <span className="relative inline-block">
                  <span className="gradient-text">Digital Growth</span>
                  <svg viewBox="0 0 260 12" className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-1.5 sm:h-2" preserveAspectRatio="none">
                    <path d="M2,8 Q130,-2 258,6" stroke="#F5B841" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
            >
              We combine performance marketing, cutting-edge AI automations, high-converting websites, and creative media to build scalable growth engines for ambitious brands.
            </motion.p>

            {/* Interactive Category Filter Pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
            >
              {[
                { id: "all", label: "All Solutions" },
                { id: "marketing", label: "Performance & Ads" },
                { id: "automation", label: "AI & Automation" },
                { id: "engineering", label: "Web Development" },
                { id: "creative", label: "Media & Design" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    filter === tab.id
                      ? "bg-slate-900 text-white shadow-md scale-102"
                      : "bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6 Services Cards Grid */}
      <section className="pb-16 sm:pb-20 relative">
        <div className="container-1280">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredCards.map((c, i) => (
                <motion.button
                  type="button"
                  layout
                  key={c.title}
                  onClick={() => setOpenIndex(cards.findIndex((orig) => orig.title === c.title))}
                  className="text-left rounded-3xl flex flex-col overflow-hidden will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B6BF5] focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer border border-black/5 hover:border-black/10 transition-all duration-300 shadow-xs hover:shadow-md"
                  style={{ background: c.bg }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  whileHover={{ y: -6, transition: { duration: 0.25, ease: EASE } }}
                  aria-label={`Learn more about ${c.title}`}
                >
                  <div className="w-full relative">
                    <motion.div
                      className="w-full"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      {c.mock}
                    </motion.div>
                    <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[0.68rem] font-bold text-slate-800 border border-black/5 shadow-xs">
                      {c.badge}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col gap-3.5 flex-1 justify-between">
                    <div>
                      <div className="flex items-start gap-3">
                        <div
                          className="size-9 sm:size-10 shrink-0 rounded-full grid place-items-center shadow-2xs"
                          style={{ background: c.iconBg, color: c.iconColor }}
                        >
                          {c.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[0.68rem] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                            {c.categoryLabel}
                          </span>
                          <div className="font-bold text-slate-900 text-base sm:text-lg leading-snug">{c.title}</div>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed mt-3">{c.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>View Service Details &amp; Benefits</span>
                      <span className="size-6 rounded-full bg-white/80 grid place-items-center text-slate-900 shadow-2xs">
                        <ChevronRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            className="mt-8 sm:mt-10 rounded-3xl p-5 sm:p-7 md:p-8 grid grid-cols-1 md:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 md:gap-8"
            style={{ background: "linear-gradient(90deg, #E8E4FA 0%, #E4E8FA 100%)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="relative shrink-0 justify-self-center md:justify-self-start">
              <motion.div
                className="size-12 sm:size-14 rounded-full bg-[#7B6BF5] grid place-items-center text-white"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Send className="size-5 sm:size-6" />
              </motion.div>
              <svg viewBox="0 0 100 40" className="absolute -right-16 top-4 w-24 h-10 hidden lg:block">
                <path d="M0,20 Q30,0 60,25 T100,15" stroke="#7B6BF5" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
              </svg>
            </div>
            <div className="min-w-0 text-center md:text-left md:pl-6 lg:pl-10">
              <div className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 leading-snug">
                Let's build, automate &amp; grow your brand with AI.
              </div>
              <div className="text-slate-600 text-sm sm:text-base mt-1">Smart strategies. Creative ideas. Real results.</div>
            </div>
            <motion.a
              href="/contact"
              className="justify-self-center md:justify-self-end inline-flex items-center gap-2 rounded-full bg-[#7B6BF5] px-5 sm:px-6 py-3 sm:py-3.5 text-white font-medium text-sm sm:text-base"
              whileHover={{ scale: 1.04, backgroundColor: "#6B5CE7" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              Book a Free Consultation
              <motion.span
                className="size-5 sm:size-6 rounded-full bg-white/20 grid place-items-center"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <ChevronRight className="size-3.5 sm:size-4" />
              </motion.span>
            </motion.a>
          </motion.div>

          {/* 4 Feature Pillars Row */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5"
              >
                <div className="size-11 shrink-0 rounded-xl bg-[#E8E4FA] grid place-items-center text-[#7B6BF5]">
                  <f.icon className="size-5.5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 text-sm sm:text-[0.93rem] leading-snug">{f.title}</div>
                  <div className="text-slate-500 text-xs mt-1 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-200/80">
        <div className="container-1280">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#FF6B00]">How We Work</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mt-1.5">
              Our 4-Step Growth Blueprint
            </h2>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              A proven delivery framework that transforms complex business challenges into automated, compounding revenue systems.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.step}
                  className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-[#FF6B00]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-black text-[#FF6B00]">{p.step}</span>
                      <div className="size-9 rounded-xl bg-white border border-slate-200/80 grid place-items-center text-slate-700">
                        <Icon className="size-4.5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-navy leading-snug">{p.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="py-16 md:py-24 bg-[#F9F7F4] border-t border-slate-200/80">
        <div className="container-1280">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#FF6B00]">Got Questions?</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3.5">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-navy cursor-pointer hover:text-[#FF6B00] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`size-4.5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#FF6B00]" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Card Detail Modal */}
      <DialogPrimitive.Root open={openIndex !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <AnimatePresence>
          {active && (
            <DialogPrimitive.Portal forceMount>
              <DialogPrimitive.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE }}
                />
              </DialogPrimitive.Overlay>

              <DialogPrimitive.Content asChild forceMount aria-describedby={undefined}>
                <motion.div
                  className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] sm:max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.35,
                    ease: EASE,
                  }}
                >
                  <div className="relative p-6 sm:p-7" style={{ background: active.bg }}>
                    <DialogPrimitive.Close
                      className="absolute right-4 top-4 size-8 grid place-items-center rounded-full bg-white/80 text-slate-700 hover:bg-white transition-colors cursor-pointer"
                      aria-label="Close"
                    >
                      <X className="size-4" />
                    </DialogPrimitive.Close>
                    <div className="flex items-start gap-4 pr-10">
                      <div
                        className="size-12 shrink-0 rounded-2xl grid place-items-center shadow-xs"
                        style={{ background: active.iconBg, color: active.iconColor }}
                      >
                        {active.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[0.68rem] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                          {active.badge} • {active.timeline}
                        </span>
                        <DialogPrimitive.Title className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                          {active.title}
                        </DialogPrimitive.Title>
                        <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">{active.desc}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-5 bg-white">
                    <p className="text-sm text-slate-600 leading-relaxed">{active.longDesc}</p>

                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Key Deliverables &amp; Benefits
                      </div>
                      <ul className="space-y-2.5">
                        {active.benefits.map((b, bi) => (
                          <motion.li
                            key={b}
                            className="flex items-start gap-2.5 text-sm text-slate-700"
                            initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.35,
                              ease: EASE,
                              delay: reduceMotion ? 0 : 0.15 + bi * 0.06,
                            }}
                          >
                            <span
                              className="mt-0.5 size-5 shrink-0 rounded-full grid place-items-center"
                              style={{ background: active.iconBg, color: active.iconColor }}
                            >
                              <Check className="size-3" strokeWidth={3} />
                            </span>
                            <span className="leading-snug">{b}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                      <a
                        href="/contact"
                        onClick={() => setOpenIndex(null)}
                        className="btn-primary flex-1 text-center cursor-pointer"
                      >
                        Book Consultation for This Service
                        <ArrowRight className="size-4" />
                      </a>
                      <a
                        href={`https://wa.me/917745868073?text=Hi%20SAP%20DigiTech%20Solutions%2C%20I%20am%20interested%20in%20your%20${encodeURIComponent(active.title)}%20service.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-emerald-200"
                      >
                        <MessageSquare className="size-3.5 text-[#25D366]" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          )}
        </AnimatePresence>
      </DialogPrimitive.Root>

      <Footer />
    </div>
  );
}
