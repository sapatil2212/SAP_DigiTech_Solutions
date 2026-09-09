import { Star, Rocket, TrendingUp, Bot, Send, ChevronRight, Brain, Megaphone, Shield, Check, X, Film, Paintbrush } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const EASE = [0.22, 1, 0.36, 1] as const;

const cards = [
  {
    tone: "cream",
    bg: "#FBF0D950",
    icon: <TrendingUp className="size-5" />,
    iconBg: "#F5B841",
    iconColor: "#FFFFFF",
    title: "Performance Marketing",
    desc: "Maximize ROI and scale campaigns with hyper-targeted, AI-optimized ad placement.",
    longDesc: "We build and optimize high-converting campaigns across Search, Social, and Display channels, continuously testing creatives and landing pages with machine learning models to maximize your return on ad spend.",
    benefits: [
      "Audience targeting driven by predictive AI",
      "Real-time automated budget and bid balancing",
      "Creative testing and copywriting optimizations",
      "Revenue and conversion-focused performance audits",
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
    tone: "blush",
    bg: "#FCE4E450",
    icon: <Send className="size-5" />,
    iconBg: "#F58A8A",
    iconColor: "#FFFFFF",
    title: "SMM (Social Media Marketing)",
    desc: "Build a powerful online presence and drive organic engagement.",
    longDesc: "Build community and drive awareness. We handle content calendars, community management, and paid social distribution, crafting narratives that turn followers into brand advocates.",
    benefits: [
      "Consistent posting calendars across platforms",
      "Community moderation and instant responses",
      "Data-driven trending content analysis",
      "Influencer outreach and collaboration playbooks",
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
    tone: "lavender",
    bg: "#E8E4FA50",
    icon: <Rocket className="size-5" />,
    iconBg: "#7B6BF5",
    iconColor: "#FFFFFF",
    title: "Website Development",
    desc: "High-performance, responsive websites engineered for speed and conversion.",
    longDesc: "We design and build ultra-fast, modern web applications tailored to your business goals. Engineered with clean code, modern UX principles, and search engine optimization built-in.",
    benefits: [
      "Sub-second page speeds on Core Web Vitals",
      "SEO-optimized markup and schema layout",
      "Responsive grid design for all devices",
      "Secure, accessible, and easily managed codebases",
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
    tone: "indigo",
    bg: "#E0E7FF50",
    icon: <Bot className="size-5" />,
    iconBg: "#4F46E5",
    iconColor: "#FFFFFF",
    title: "AI-Powered Business Automation",
    desc: "Automate repetitive tasks, CRM pipelines, and workflows to scale operations.",
    longDesc: "Streamline workflows and scale without scaling headcount. We integrate your software stack, set up smart CRM pipelines, and deploy AI assistants to automate lead routing, customer support, and data entry.",
    benefits: [
      "Automatic lead routing and tracking",
      "24/7 support via AI chat systems",
      "Seamless cross-platform integrations",
      "Automated pipeline reminders and alerts",
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
    tone: "sky",
    bg: "#E0F2FE50",
    icon: <Film className="size-5" />,
    iconBg: "#0284C7",
    iconColor: "#FFFFFF",
    title: "Video Production & Editing",
    desc: "High-impact video content for ads, social media, and brand storytelling.",
    longDesc: "We produce scroll-stopping videos tailored for TikTok, Reels, YouTube, and digital ads. From scripting and voiceovers to editing, pacing, and color-grading, we craft videos that command attention.",
    benefits: [
      "Scroll-stopping hooks and editing pacing",
      "Professional color grading and audio mix",
      "Platform-specific resizing (16:9, 9:16)",
      "Scripting and AI-assisted voiceover assets",
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
    tone: "mint",
    bg: "#DCFCE750",
    icon: <Paintbrush className="size-5" />,
    iconBg: "#059669",
    iconColor: "#FFFFFF",
    title: "Creative Graphic Designing",
    desc: "Stunning brand assets, ad creatives, and digital illustrations.",
    longDesc: "Elevate your visual identity. We design custom brand assets, high-CTR display ads, presentation decks, and social media graphics that reinforce your credibility and drive engagement.",
    benefits: [
      "Custom brand identity guides and logos",
      "High-conversion digital ad creatives",
      "Social media templates and design kits",
      "Modern vectors and infographic visuals",
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

export function AiSolutions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const active = openIndex !== null ? cards[openIndex] : null;

  return (
    <section id="services" className="py-10 sm:py-14 md:py-16 relative">
      <div className="container-1280">
        {/* Eyebrow */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E8E4FA] px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[#3B2E7A]">
            <Star className="size-3.5 sm:size-4 fill-[#7B6BF5] text-[#7B6BF5]" />
            AI Powered Digital Agency
          </div>
        </div>

        {/* Headline */}
        <h2 className="mt-5 sm:mt-6 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
          <span className="block">AI-Powered Solutions for</span>
          <span className="block">
            Smarter{" "}
            <span className="relative inline-block">
              <span className="gradient-text">Digital Growth</span>
              <svg viewBox="0 0 260 12" className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-1.5 sm:h-2" preserveAspectRatio="none">
                <path d="M2,8 Q130,-2 258,6" stroke="#F5B841" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </span>
        </h2>

        {/* Cards */}
        <div className="mt-12 sm:mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {cards.map((c, i) => (
            <motion.button
              type="button"
              key={c.title}
              onClick={() => setOpenIndex(i)}
              className="text-left rounded-3xl flex flex-col overflow-hidden will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B6BF5] focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
              style={{ background: c.bg }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.35, ease: EASE } }}
              aria-label={`Learn more about ${c.title}`}
            >
              <div className="w-full">
                <motion.div
                  className="w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {c.mock}
                </motion.div>
              </div>
              <div className="p-5 flex flex-col gap-4 flex-1">
                <div className="flex items-start gap-3">
                  <div
                    className="size-9 sm:size-10 shrink-0 rounded-full grid place-items-center"
                    style={{ background: c.iconBg, color: c.iconColor }}
                  >
                    {c.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-slate-900 text-base sm:text-lg leading-snug">{c.title}</div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">{c.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* CTA banner */}
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


        {/* Feature row */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="size-10 shrink-0 rounded-lg bg-[#E8E4FA] grid place-items-center text-[#7B6BF5]">
                <f.icon className="size-5" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-900 text-sm leading-snug">{f.title}</div>
                <div className="text-slate-500 text-xs mt-0.5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card detail modal — Framer Motion enter/exit */}
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
                  className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] sm:max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-background border border-hairline"
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
                      className="absolute right-4 top-4 size-8 grid place-items-center rounded-full bg-white/70 text-slate-700 hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B6BF5]"
                      aria-label="Close"
                    >
                      <X className="size-4" />
                    </DialogPrimitive.Close>
                    <div className="flex items-start gap-4 pr-10">
                      <div
                        className="size-12 shrink-0 rounded-2xl grid place-items-center"
                        style={{ background: active.iconBg, color: active.iconColor }}
                      >
                        {active.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <DialogPrimitive.Title className="text-xl sm:text-2xl font-semibold text-slate-900 leading-tight">
                          {active.title}
                        </DialogPrimitive.Title>
                        <p className="text-slate-600 text-sm sm:text-[15px] mt-1.5 leading-relaxed">{active.desc}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-5 bg-background">
                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">{active.longDesc}</p>

                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                        What you get
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

                    <a
                      href="#contact"
                      onClick={() => setOpenIndex(null)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7B6BF5] hover:bg-[#6B5CE7] transition-colors px-6 py-3.5 text-white font-medium text-sm sm:text-base"
                    >
                      Contact us about this service
                      <ChevronRight className="size-4" />
                    </a>
                  </div>
                </motion.div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          )}
        </AnimatePresence>
      </DialogPrimitive.Root>

    </section>
  );
}

