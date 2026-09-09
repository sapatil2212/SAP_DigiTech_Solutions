import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav, Footer } from "./index";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, ArrowRight, ShieldCheck, Zap, Cpu,
  MessageSquare, Rocket, Compass, Users, Target, Layers
} from "lucide-react";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const pillars = [
    {
      id: "mission",
      tag: "THE MISSION",
      title: "Engineering Growth Infrastructure, Not Temporary Noise.",
      desc: "Founded with a clear conviction: Businesses do not need another disconnected agency running ads into leaky funnels. We unite full-stack software engineering, generative AI automations, and performance marketing to build resilient digital machines that compound revenue.",
      stats: [
        { label: "Client Retention Rate", value: "94.8%" },
        { label: "Systems Deployed", value: "150+" },
        { label: "Avg Revenue Multiplier", value: "4.8x" },
      ],
      icon: Rocket,
    },
    {
      id: "standard",
      tag: "ENGINEERING RIGOR",
      title: "Cloud Speed with Architectural Integrity.",
      desc: "Every automated funnel, custom web application, and WhatsApp workflow is engineered with enterprise reliability. Official Meta Cloud API compliance, sub-second webhook response times, and automated failure recovery ensure your sales engine never sleeps.",
      stats: [
        { label: "Cloud Automation Uptime", value: "99.4%" },
        { label: "Webhook Response", value: "< 240ms" },
        { label: "Security & Encryption", value: "AES-256" },
      ],
      icon: Cpu,
    },
    {
      id: "philosophy",
      tag: "THE COMPOUNDING MODEL",
      title: "Data Intelligence That Learns With Every Lead.",
      desc: "When an ad clicks, our automated qualifying engines instantly interact, enrich CRM profiles, assign machine-learning intent scores, and route high-intent buyers to your sales closers within 15 seconds.",
      stats: [
        { label: "Speed to Lead Contact", value: "< 15s" },
        { label: "Lead Drop-off Reduction", value: "-68%" },
        { label: "Data Enrichment Sync", value: "Instant" },
      ],
      icon: Target,
    },
    {
      id: "solutions",
      tag: "INTEGRATED ECOSYSTEM",
      title: "Full-Stack Strategy, AI & Vertical SaaS.",
      desc: "From Meta & Google performance ad campaigns to conversational WhatsApp AI bots and specialized healthcare SaaS (CareOS Hospital Hub), we deliver end-to-end digital solutions designed for sustained market leadership.",
      stats: [
        { label: "Core Verticals", value: "Healthcare · Retail · Tech" },
        { label: "API Integrations", value: "Meta Cloud · CRM · ERP" },
        { label: "Support Coverage", value: "24/7 Monitored" },
      ],
      icon: Layers,
    },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Radical Transparency",
      desc: "No vanity metrics or masked ad spend. You get real-time CRM dashboards showing exactly where every rupee goes and what revenue it yields.",
    },
    {
      icon: Zap,
      title: "Velocity with Stability",
      desc: "We deploy production systems in days, not months. High velocity is paired with strict code quality, security protocols, and testing.",
    },
    {
      icon: Compass,
      title: "Product-Minded Marketing",
      desc: "We treat your sales funnel like a premier software product: constantly measuring conversion bottlenecks, A/B testing, and refining.",
    },
    {
      icon: Users,
      title: "Partner Alignment",
      desc: "We do not operate as distant vendors. We embed as strategic partners aligned directly with your bottom-line profitability and scale.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F4] text-navy antialiased selection:bg-[#FF6B00] selection:text-white">
      <Nav />

      {/* Hero Section */}
      <section className="relative pt-36 md:pt-44 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5EF]/70 via-[#F9F7F4] to-[#F9F7F4] pointer-events-none" />
        
        {/* Subtle Ambient Blobs */}
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
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/80 shadow-xs text-xs font-semibold text-navy mb-5 backdrop-blur-md"
            >
              <span className="size-2 rounded-full bg-[#FF6B00] animate-pulse" />
              <span>About SAP DigiTech Solutions</span>
              <span className="text-slate-300">|</span>
              <span className="text-[#FF6B00]">Innovate · Integrate · Elevate</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-navy leading-[1.08]"
            >
              We engineer the infrastructure of <span className="gradient-text">modern digital growth.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed"
            >
              SAP DigiTech Solutions is a high-performance digital studio uniting strategy, full-stack software engineering, AI automations, and performance marketing. We build scalable systems that turn business attention into predictable revenue.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <a href="/contact" className="btn-primary">
                Book a Strategy Call <ArrowRight className="size-4" />
              </a>
              <a
                href="https://wa.me/917745868073?text=Hi%20SAP%20DigiTech%20Solutions%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20studio."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <MessageSquare className="size-4 text-[#25D366]" /> Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Philosophy Pillars Tabs */}
      <section className="py-16 md:py-24 border-y border-slate-200/80 bg-white/60 backdrop-blur-md">
        <div className="container-1280">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#FF6B00]">Our Foundation</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-navy tracking-tight mt-1">
                The Principles Behind Our Systems
              </h2>
            </div>
            <p className="text-sm text-slate-500 max-w-md">
              Explore how our engineering-first mindset sets us apart from traditional marketing agencies.
            </p>
          </div>

          {/* Interactive Tabs Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/90 mb-8">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "text-navy bg-white shadow-md"
                      : "text-slate-500 hover:text-navy hover:bg-white/50"
                  }`}
                >
                  <Icon className={`size-3.5 ${isActive ? "text-[#FF6B00]" : "text-slate-400"}`} />
                  <span className="truncate">{p.tag}</span>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pillars[activeTab].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="p-8 md:p-10 rounded-3xl bg-[#090D18] text-white border border-slate-800 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                {(() => {
                  const Icon = pillars[activeTab].icon;
                  return <Icon className="size-64 text-white" />;
                })()}
              </div>

              <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <span className="text-[0.7rem] uppercase tracking-widest font-mono text-[#FF6B00] font-bold">
                    {pillars[activeTab].tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-2 leading-snug">
                    {pillars[activeTab].title}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {pillars[activeTab].desc}
                  </p>
                </div>

                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                  {pillars[activeTab].stats.map((s, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                      <span className="text-[0.68rem] uppercase tracking-wider font-semibold text-slate-400 block">{s.label}</span>
                      <span className="text-xl sm:text-2xl font-extrabold text-[#FF6B00] font-mono mt-1 block">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Core Studio Values */}
      <section className="py-16 md:py-24 bg-[#F9F7F4]">
        <div className="container-1280">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.16em] font-bold text-[#FF6B00]">How We Operate</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mt-1">
                Our Core Operating Values
              </h2>
            </div>
            <p className="text-sm text-slate-500 max-w-md">
              The ethical and engineering standards that guide every line of code, ad campaign, and client strategy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
                >
                  <div>
                    <div className="size-11 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] grid place-items-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-base font-bold text-navy tracking-tight">{v.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* High-Impact Bottom CTA */}
      <section className="py-16 md:py-20 bg-[#080C16] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00]/10 via-transparent to-cyan-500/10 pointer-events-none" />
        <div className="container-1280 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] font-bold">
              Ready To Scale?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-white">
              Let\'s engineer your next growth milestone.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              Book a 30-minute strategy session with our technical team. We\'ll audit your existing funnels and map an automated compounding growth engine.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a href="/contact" className="btn-primary">
              Book Strategy Call <ArrowRight className="size-4" />
            </a>
            <a
              href="https://wa.me/917745868073?text=Hi%20SAP%20DigiTech%20Solutions%2C%20I%20would%20like%20to%20book%20a%20strategy%20session."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors flex items-center gap-2 border border-slate-700"
            >
              <MessageSquare className="size-3.5 text-[#25D366]" /> WhatsApp Strategy Team
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
