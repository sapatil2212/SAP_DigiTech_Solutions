import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav, Footer } from "./index";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase, MapPin, Clock, ArrowRight, Check, ChevronDown,
  Sparkles, Zap, Heart, Shield, Users, Trophy, Code2, Megaphone,
  Stethoscope, TrendingUp, CheckCircle2, Send, X, Building2,
  DollarSign, Rocket
} from "lucide-react";

export const Route = createFileRoute("/careers")({ component: CareersPage });

interface JobOpening {
  id: string;
  title: string;
  department: "Engineering" | "Marketing" | "Healthcare" | "Sales";
  location: string;
  type: string;
  experience: string;
  compensation: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
}

const jobOpenings: JobOpening[] = [
  {
    id: "ai-automation-eng",
    title: "AI & Automation Engineer",
    department: "Engineering",
    location: "Pune / Nashik / Hybrid",
    type: "Full-Time",
    experience: "2-4 Years",
    compensation: "₹6.5L - ₹11L / year + Performance Bonus",
    summary: "Architect and deploy end-to-end AI automation pipelines, WhatsApp Cloud API bots, and webhook integrations that power business workflows for our enterprise clients.",
    responsibilities: [
      "Build conversational AI agents using Meta WhatsApp Business API and LLM frameworks.",
      "Develop custom webhook middleware and data pipelines connecting CRMs, databases, and third-party APIs.",
      "Collaborate directly with product leads to scope client automation architectures.",
      "Monitor system uptime, latency, and automated error recovery."
    ],
    requirements: [
      "Strong proficiency in TypeScript / Node.js or Python.",
      "Hands-on experience with REST APIs, Webhooks, and asynchronous workflows.",
      "Familiarity with LLM prompt engineering, OpenAI / Anthropic APIs, or conversational flows.",
      "Self-driven problem solver with good communication skills."
    ],
    perks: ["Flexible hybrid schedule", "Annual tech & learning budget", "Direct bonus on deployed client pipelines"]
  },
  {
    id: "perf-marketing-lead",
    title: "Performance Marketing Specialist",
    department: "Marketing",
    location: "Pune / Mumbai / Hybrid",
    type: "Full-Time",
    experience: "2-5 Years",
    compensation: "₹5.5L - ₹9.5L / year + Client Incentive",
    summary: "Manage high-budget performance ad campaigns across Meta, Google Ads, and emerging channels, optimizing for ROAS, lower CAC, and scalable lead velocity.",
    responsibilities: [
      "Plan and execute data-driven paid acquisition campaigns for B2B, real estate, and healthcare clients.",
      "Conduct multivariate creative and copy testing to maximize click-through and conversion rates.",
      "Build real-time attribution reports linking ad expenditure to verified CRM closed revenue.",
      "Collaborate with design and copy teams to develop high-converting ad angles."
    ],
    requirements: [
      "Demonstrated track record managing profitable ad spends on Meta Ads Manager and Google Ads.",
      "Deep understanding of pixel tracking, Conversions API (CAPI), and GA4 event setups.",
      "Analytical mindset with strong Excel/Google Sheets modeling capability.",
      "Experience with Indian regional and tier-1/tier-2 audience behavior."
    ],
    perks: ["Profit-sharing on campaign scale", "Fast-track path to Head of Growth", "Comprehensive health coverage"]
  },
  {
    id: "fullstack-developer",
    title: "Full Stack Web Developer (React / Node)",
    department: "Engineering",
    location: "Pune / Hybrid",
    type: "Full-Time",
    experience: "2-4 Years",
    compensation: "₹6L - ₹10L / year + Equity Options",
    summary: "Build state-of-the-art web applications, customer portals, and internal dashboards using React, modern styling, and scalable backend services.",
    responsibilities: [
      "Develop fast, responsive, and visually stunning web interfaces with Tailwind CSS and Framer Motion.",
      "Design clean RESTful and GraphQL API schemas and integrate with relational/NoSQL databases.",
      "Optimize web vital performance (LCP, FID, CLS) and SEO structure.",
      "Participate in code reviews, technical architecture sessions, and sprint planning."
    ],
    requirements: [
      "Proficient with React, TypeScript, Next.js or Vite, and Tailwind CSS.",
      "Experience with serverless or Node.js backend architectures and database management (PostgreSQL / MongoDB).",
      "Obsessive attention to UI/UX craft, typography, and micro-interactions.",
      "Solid git hygiene and CI/CD deployment experience."
    ],
    perks: ["Top-tier hardware allowance", "Quarterly skill-based salary reviews", "Collaborative team environment"]
  },
  {
    id: "healthcare-tech-lead",
    title: "Healthcare Tech Product Specialist",
    department: "Healthcare",
    location: "Pune / Nashik / Hybrid",
    type: "Full-Time",
    experience: "1-3 Years",
    compensation: "₹4.5L - ₹8L / year",
    summary: "Lead the rollout, onboarding, and clinical workflow customization of our CareOS Hospital Management System for hospitals and specialty clinics.",
    responsibilities: [
      "Engage directly with hospital administrators, doctors, and nursing staff to tailor CareOS workflows.",
      "Oversee OPD/IPD queue, digital EMR, and pharmacy inventory module deployments.",
      "Conduct staff training and create localized SOP documentation.",
      "Relay feature requests and clinical compliance feedback to our core engineering team."
    ],
    requirements: [
      "Background in healthcare administration, biomedical informatics, or B2B SaaS onboarding.",
      "Strong interpersonal skills and empathy for clinical work environments.",
      "Understanding of healthcare compliance (ABDM, patient data confidentiality).",
      "Fluency in Marathi, Hindi, and English."
    ],
    perks: ["Direct impact on Indian healthcare infrastructure", "Travel allowances & per diems", "Health insurance"]
  },
  {
    id: "biz-dev-executive",
    title: "Enterprise Business Development Executive",
    department: "Sales",
    location: "Mumbai / Pune / Hybrid",
    type: "Full-Time",
    experience: "1-4 Years",
    compensation: "₹4.5L - ₹8.5L / year + Uncapped Commission",
    summary: "Identify, prospect, and close new strategic accounts for SAP DigiTech Solutions across performance marketing, WhatsApp AI automation, and custom software.",
    responsibilities: [
      "Generate and nurture enterprise prospect pipelines across target sectors (Healthcare, Real Estate, E-Commerce, SMBs).",
      "Conduct high-conviction product demonstrations and pitch strategy audits.",
      "Draft customized commercial proposals and close long-term recurring contracts.",
      "Maintain active CRM records and deliver weekly forecast reviews."
    ],
    requirements: [
      "Proven experience in B2B tech sales, digital agency business development, or SaaS sales.",
      "Exceptional verbal and written presentation skills.",
      "Self-motivated hunger to exceed revenue quotas.",
      "Strong network within Maharashtra business communities is a major plus."
    ],
    perks: ["Uncapped monthly commissions", "Executive mentorship", "Client entertainment budget"]
  }
];

function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [expandedJob, setExpandedJob] = useState<string | null>("ai-automation-eng");
  const [applyModalJob, setApplyModalJob] = useState<JobOpening | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [note, setNote] = useState("");

  const filteredJobs = selectedDept === "All"
    ? jobOpenings
    : jobOpenings.filter(j => j.department === selectedDept);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setApplyModalJob(null);
      setName("");
      setEmail("");
      setPhone("");
      setPortfolio("");
      setNote("");
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#FDFDFC] text-slate-900 overflow-x-clip pt-28 md:pt-32">
      <Nav />

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-1280 relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/10 text-slate-800 text-xs font-semibold tracking-wide">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>We Are Hiring</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-medium">Pune · Nashik · Mumbai</span>
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1B2240] tracking-tight leading-[1.08]">
            Build the Future of Digital India.<br className="hidden sm:inline" />{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#E05300] to-[#1B2240] bg-clip-text text-transparent">
              High Impact. High Autonomy.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Join a small, world-class team engineering modern growth engines, AI automations, and purpose-built software systems for ambitious businesses.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <span>⚡ 5 Open Roles</span>
            <span>•</span>
            <span>📍 3 Hub Cities</span>
            <span>•</span>
            <span>📈 Profit Sharing</span>
            <span>•</span>
            <span>🌿 Hybrid Flexibility</span>
          </div>
        </div>
      </section>

      {/* Studio Culture Bento Grid */}
      <section className="py-12 bg-slate-50/70 border-t border-b border-slate-200/70">
        <div className="container-1280">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF6B00]">Why SAP DigiTech</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#1B2240] tracking-tight">
              An Engineering & Growth Culture Built to Compound
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "High Autonomy", desc: "No red tape or endless meetings. Take complete ownership of projects from day one.", icon: Rocket, color: "text-emerald-600", bg: "bg-emerald-50" },
              { title: "Transparent Upside", desc: "Competitive base packages + direct profit-sharing bonuses when your client projects scale.", icon: Trophy, color: "text-[#FF6B00]", bg: "bg-orange-50" },
              { title: "Modern Tech Stack", desc: "Work with premier AI models (Claude, OpenAI), modern web frameworks, and clean codebases.", icon: Code2, color: "text-sky-600", bg: "bg-sky-50" },
              { title: "Multi-Hub Flexibility", desc: "Hybrid setups across Pune, Nashik, and Mumbai with flexible work-from-home options.", icon: Building2, color: "text-indigo-600", bg: "bg-indigo-50" },
            ].map((card, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
                <div className={["size-10 rounded-xl grid place-items-center mb-4", card.bg, card.color].join(" ")}>
                  <card.icon className="size-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">{card.title}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-16 md:py-20 bg-white">
        <div className="container-1280 max-w-5xl mx-auto">
          {/* Section Header with Department Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
            <div>
              <h2 className="text-3xl font-extrabold text-[#1B2240] tracking-tight">Open Opportunities</h2>
              <p className="text-sm text-slate-500 mt-1">Explore available roles and submit your application in under 2 minutes.</p>
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {["All", "Engineering", "Marketing", "Healthcare", "Sales"].map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={[
                    "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer",
                    selectedDept === dept
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  ].join(" ")}
                >
                  {dept} {dept === "All" ? `(${jobOpenings.length})` : `(${jobOpenings.filter(j => j.department === dept).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Job Listings List */}
          <div className="mt-8 space-y-4">
            {filteredJobs.map((job) => {
              const isExpanded = expandedJob === job.id;
              return (
                <div
                  key={job.id}
                  className={[
                    "rounded-2xl border transition-all duration-200 overflow-hidden",
                    isExpanded
                      ? "border-slate-800 bg-slate-50/40 shadow-md"
                      : "border-slate-200/80 bg-white hover:border-slate-300"
                  ].join(" ")}
                >
                  {/* Job Header Row */}
                  <div
                    onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                    className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[0.68rem] font-bold uppercase tracking-wider">
                          {job.department}
                        </span>
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                          <MapPin className="size-3 text-slate-400" /> {job.location}
                        </span>
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                          <Clock className="size-3 text-slate-400" /> {job.experience}
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{job.title}</h3>
                      <p className="text-xs text-slate-600 font-mono font-semibold text-[#FF6B00]">{job.compensation}</p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setApplyModalJob(job);
                        }}
                        className="btn-primary !h-9 !px-4 !text-xs cursor-pointer"
                      >
                        Apply Now <ArrowRight className="size-3.5" />
                      </button>
                      <span className={["size-8 rounded-full bg-slate-100 grid place-items-center text-slate-600 transition-transform duration-200", isExpanded ? "rotate-180 bg-slate-200" : ""].join(" ")}>
                        <ChevronDown className="size-4" />
                      </span>
                    </div>
                  </div>

                  {/* Expanded Job Details */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-200/80 space-y-5 text-xs text-slate-700">
                      <p className="text-sm text-slate-700 leading-relaxed font-normal">{job.summary}</p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[0.7rem] mb-2.5">Key Responsibilities</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((r, ri) => (
                              <li key={ri} className="flex items-start gap-2">
                                <Check className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[0.7rem] mb-2.5">What We Look For</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((req, rqi) => (
                              <li key={rqi} className="flex items-start gap-2">
                                <Check className="size-3.5 text-[#FF6B00] shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/60">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-slate-900">Perks:</span>
                          {job.perks.map((p, pi) => (
                            <span key={pi} className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium">
                              ✓ {p}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => setApplyModalJob(job)}
                          className="btn-primary !h-9 !px-4 !text-xs cursor-pointer"
                        >
                          Submit Application <ArrowRight className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Open Application Callout */}
          <div className="mt-12 p-8 rounded-3xl bg-[#0B1220] border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF6B00]">Spontaneous Application</span>
              <h3 className="text-2xl font-extrabold tracking-tight">Don't see your specific role?</h3>
              <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
                We're always excited to connect with exceptional engineers, marketers, and growth strategists. Send us your portfolio and tell us how you'd create leverage for our clients.
              </p>
            </div>

            <a
              href="mailto:sapdigitechsolutions@gmail.com?subject=Spontaneous Application - SAP DigiTech Solutions"
              className="btn-primary shrink-0"
            >
              Send Open Application <Send className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Quick Application Modal */}
      <AnimatePresence>
        {applyModalJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setApplyModalJob(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setApplyModalJob(null)}
                className="absolute top-5 right-5 size-8 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center text-slate-500 transition-colors"
              >
                <X className="size-4" />
              </button>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="size-14 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">Application Received!</h3>
                  <p className="text-sm text-slate-600 max-w-xs mx-auto">
                    Thank you, {name}. Our talent team will review your profile and reach out within 48 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#FF6B00]">Applying For</span>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{applyModalJob.title}</h3>
                    <p className="text-xs text-slate-500">{applyModalJob.location} • {applyModalJob.type}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Patil"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:border-slate-900 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="rahul@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:border-slate-900 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:border-slate-900 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn / Portfolio URL *</label>
                      <input
                        type="url"
                        required
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        placeholder="https://linkedin.com/in/username or portfolio link"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:border-slate-900 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Brief Introduction & Why SAP DigiTech</label>
                      <textarea
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Tell us a little about your experience and the biggest project you've shipped..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:border-slate-900 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full btn-primary justify-center cursor-pointer"
                    >
                      Submit Application <ArrowRight className="size-4" />
                    </button>
                    <p className="text-[0.65rem] text-slate-400 text-center mt-2">
                      Direct review by founders • We respect your privacy
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
