import {
  FileText, ShieldCheck, Clock, Sparkles, Server, Database, BarChart3,
  Inbox, MessageCircle, TrendingUp, MapPin, Globe, Bell, Calendar,
  Users, Bot, Workflow, Search, Brain, Target, Shield, Zap,
  Layers, Code, Palette, Mail, Lock, Cpu, Terminal, Gauge,
  CheckCircle, Star, Crown, Building2, Headphones, BookOpen,
  CreditCard, GitBranch, Key, RefreshCw, Smartphone,
  type LucideIcon,
} from "lucide-react";

/* ─────────────────────── Types ─────────────────────── */
export interface ProductFeature {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export interface WhiteLabelFeature {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export interface SourceCodeOffer {
  fixedPrice: number;
  originalPrice: number;
  discountPercentage: number;
  licenseName: string;
  deliveryMethod: string;
  deliverables: string[];
  featuresIncluded: string[];
  techStackDetailed: { category: string; techs: string[] }[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface InteractiveCapability {
  title: string;
  subtitle: string;
  description: string;
  metrics: string;
  badge: string;
  previewNote: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  tagline: string;
  url: string;
  localImg: string;
  badge: string;
  categoryName: string;
  categoryGroup: "AI & Automation" | "Operations & Growth";
  heroDesc: string;
  detailedDesc: string;
  techStack: string[];
  features: ProductFeature[];
  whiteLabel: WhiteLabelFeature[];
  sourceCodeOffer: SourceCodeOffer;
  interactiveCapabilities: InteractiveCapability[];
  faqs: FaqItem[];
  stats: { label: string; value: string }[];
}

/* ─────────────────────── Product Data ─────────────────────── */
export const productDetails: Record<string, ProductDetail> = {
  briefvault: {
    id: "briefvault",
    name: "BriefVault",
    tagline: "Legal Intelligence & AI Document Summarization Platform",
    url: "https://briefvault.in/",
    localImg: "/assets/work/website-preview/briefvault.png",
    badge: "AI Legal Tech",
    categoryName: "Legal AI & Intelligence",
    categoryGroup: "AI & Automation",
    heroDesc: "Transform how legal professionals digest contracts, arbitration orders, judgments, and compliance filings. Instant citation-backed summaries, risk checklists, and statutory deadline intelligence in seconds.",
    detailedDesc: "BriefVault is an enterprise-grade legal intelligence SaaS platform engineered for law firms, in-house counsel, compliance teams, and consultancies. Users upload agreements or judicial rulings of any size and receive structured executive briefings, flagged indemnity exposures, and page-verified citation answers in seconds.",
    techStack: ["React 19", "TypeScript", "Node.js", "Gemini AI", "MongoDB", "TailwindCSS", "Docker"],
    stats: [
      { label: "Document Processing", value: "< 30s" },
      { label: "Extraction Accuracy", value: "98.7%" },
      { label: "Max Document Size", value: "500+ pgs" },
      { label: "Active Lawyers", value: "2,400+" },
    ],
    interactiveCapabilities: [
      {
        title: "30-Second AI Briefings",
        subtitle: "Instant Executive Summaries",
        description: "Condense 100+ page contracts, petitions, and corporate agreements into 1-page executive briefs with highlighted key obligations and governing terms.",
        metrics: "94% review time saved",
        badge: "Core AI Engine",
        previewNote: "Processes PDF, DOCX, and scanned OCR images with sub-second vector search indexing.",
      },
      {
        title: "Statutory Risk Radar",
        subtitle: "Automated Exposure Checklist",
        description: "Flags buried limitation periods, uncapped liabilities, indemnity triggers, and jurisdictional conflicts with risk severity scores.",
        metrics: "Zero missed liabilities",
        badge: "Risk Intelligence",
        previewNote: "Cross-references standard legal templates against compliance statutes automatically.",
      },
      {
        title: "Citation-Backed Q&A",
        subtitle: "Verifiable Paragraph Quotes",
        description: "Ask natural language questions like 'What are the termination notice requirements?' and receive exact clause numbers, page references, and excerpts.",
        metrics: "100% auditable facts",
        badge: "Semantic Search",
        previewNote: "Every assertion links directly to the original source document page.",
      },
      {
        title: "Statutory Deadline Tracker",
        subtitle: "Automated Calendar Sync",
        description: "Extracts filing windows, renewal schedules, and statutory notice periods into syncable iCal and Google Calendar feeds with automatic alerts.",
        metrics: "Multi-channel reminders",
        badge: "Workflow Ops",
        previewNote: "Configurable alert cadences via WhatsApp, Email, and internal webhooks.",
      },
    ],
    features: [
      { title: "30-Second Executive Digests", desc: "Automate hours of manual reading into structured executive briefings. Get key clauses, risk factors, and actionable takeaways instantly.", icon: FileText },
      { title: "Risk & Compliance Checklist", desc: "Automatically surface buried limitation periods, penalty clauses, indemnity exposures, and non-compete restrictions with severity scoring.", icon: ShieldCheck },
      { title: "Statutory Deadline Tracker", desc: "Never miss appeal filing windows, contract renewal dates, or escalation milestones with automated calendar and email reminders.", icon: Clock },
      { title: "Citation-Backed AI Q&A", desc: "Ask specific questions about any uploaded document and receive answers with direct references to page numbers and exact text excerpts.", icon: Sparkles },
      { title: "Multi-Document Comparison", desc: "Compare multiple versions of contracts side-by-side with AI-highlighted differences, additions, deletions, and conflicting clauses.", icon: Layers },
      { title: "Secure Document Vault", desc: "Enterprise-grade encryption at rest and in transit. Role-based access controls, complete audit logs, and SOC-2 compliant architecture.", icon: Lock },
    ],
    whiteLabel: [
      { title: "100% Brand Ownership", desc: "Replace all logos, fonts, primary colors, and domain with your law firm or agency brand in minutes.", icon: Palette },
      { title: "Custom Domain & SSL", desc: "Host on legal.yourdomain.com with automatic Let's Encrypt SSL and branded transactional email notifications.", icon: Globe },
      { title: "Multi-Tenant Architecture", desc: "Provision distinct workspaces for unlimited corporate clients or law firm departments with strict data isolation.", icon: Building2 },
      { title: "Source Code Modification", desc: "Modify the React 19 UI, tweak prompt engineering pipelines, or plug your own LLM API keys without restrictions.", icon: Code },
      { title: "Self-Hosted Deployment", desc: "Run on your own AWS, DigitalOcean, VPS, or private on-premise cloud with complete data sovereignty.", icon: Terminal },
      { title: "Commercial Resale Rights", desc: "Charge your clients monthly subscription retainers or one-time review fees with zero royalties back to us.", icon: Shield },
    ],
    sourceCodeOffer: {
      fixedPrice: 1,
      originalPrice: 49999,
      discountPercentage: 99,
      licenseName: "Full Commercial & White-Label Source Code License",
      deliveryMethod: "Instant GitHub Repo Access & ZIP Archive",
      deliverables: [
        "Complete React 19 + TypeScript Frontend Source Code",
        "Node.js Backend Engine with Gemini AI Integration",
        "MongoDB Schemas, Seed Scripts & Database Migrations",
        "Full White-Labeling Guide (Logo, Themes, Custom Domain)",
        "Docker Compose & One-Click Cloud Deployment Scripts",
        "Razorpay & Stripe Payment Integration Modules",
        "REST API Documentation & Postman Collection",
        "Lifetime Commercial License with Unlimited Client Deployment",
        "1 Year of Free Security Updates & Core Patches",
      ],
      featuresIncluded: [
        "Unlimited document uploads & summaries",
        "Citation-backed semantic Q&A engine",
        "Multi-document side-by-side comparison",
        "Automated deadline calendar export",
        "Admin control panel with user analytics",
        "Zero subscription fees or recurring royalties",
      ],
      techStackDetailed: [
        { category: "Frontend", techs: ["React 19", "TypeScript", "TailwindCSS", "Lucide Icons", "Framer Motion"] },
        { category: "Backend", techs: ["Node.js", "Express", "RESTful Architecture", "JWT Auth"] },
        { category: "AI & Vector", techs: ["Gemini 1.5 Pro / Flash", "Vector Embeddings", "PDF Parser Engine"] },
        { category: "Database & DevOps", techs: ["MongoDB", "Docker", "Nginx", "GitHub Actions"] },
      ],
    },
    faqs: [
      { q: "What do I get when I purchase the source code?", a: "You receive immediate access to the full, unminified source code (React 19 frontend, Node.js backend, AI prompt pipelines, and database scripts) via a private GitHub repository and a downloadable ZIP archive." },
      { q: "Can I rebrand this and sell it to my own clients?", a: "Yes, 100%! You receive a full commercial white-label license. You can rebrand the platform under your own name and logo, host it on your domain, and charge your clients whatever you wish with zero royalties." },
      { q: "How difficult is it to deploy BriefVault?", a: "We provide automated Docker Compose configurations and a step-by-step video/text guide. You can deploy it to any VPS (Ubuntu/DigitalOcean/AWS) in under 15 minutes." },
      { q: "Which AI models does BriefVault use?", a: "BriefVault is configured with Google Gemini AI (with plug-and-play support for OpenAI GPT-4o or Anthropic Claude). You plug in your own API keys so you have full cost control." },
      { q: "Do you offer technical support for setup?", a: "Yes. Our engineering team provides setup guidance and code clarification to ensure your deployment goes live smoothly." },
    ],
  },

  primeinbox: {
    id: "primeinbox",
    name: "PrimeInbox",
    tagline: "AI Cold Email Campaign & Deliverability OS",
    url: "https://primeinbox.online/",
    localImg: "/assets/work/website-preview/primeinbox.png",
    badge: "Outreach & Deliverability",
    categoryName: "Cold Outreach & Email",
    categoryGroup: "AI & Automation",
    heroDesc: "The ultimate cold email engine built for flawless primary inbox placement. Multi-account inbox rotation, warm-up sequencing, AI personalization, and real-time open/reply telemetry.",
    detailedDesc: "PrimeInbox is an enterprise-grade outbound cold email platform engineered to eliminate spam folder drop-offs. Built specifically for B2B lead generation agencies, SDR teams, and SaaS companies who require high-volume sending with pristine sender domain health.",
    techStack: ["React 19", "TypeScript", "Node.js", "PostgreSQL", "Redis", "SMTP Engine", "Docker"],
    stats: [
      { label: "Inbox Placement", value: "94.2%" },
      { label: "Daily Email Scale", value: "50,000+" },
      { label: "Avg Open Rate", value: "47%" },
      { label: "Active Campaigns", value: "3,800+" },
    ],
    interactiveCapabilities: [
      {
        title: "Multi-Account Inbox Rotation",
        subtitle: "Reputation Balancing Engine",
        description: "Distribute daily outbound emails across unlimited connected Google Workspace, Outlook, and SMTP accounts with smart round-robin scheduling.",
        metrics: "Zero domain burn",
        badge: "Deliverability",
        previewNote: "Automatically throttles accounts reaching daily threshold limits.",
      },
      {
        title: "AI Sequence Personalizer",
        subtitle: "Contextual Cold Email Copy",
        description: "Generates bespoke icebreakers and personalized follow-ups tailored to prospect title, company revenue, and recent company news.",
        metrics: "3.4x higher reply rates",
        badge: "AI Copywriter",
        previewNote: "Integrates with Gemini and OpenAI for dynamic prompt templates.",
      },
      {
        title: "Smart Lead Enrichment",
        subtitle: "CSV Cleaner & Verifier",
        description: "Import prospect lists with automatic header recognition, syntax cleaning, duplicate detection, and MX record verification.",
        metrics: "< 1% bounce rate",
        badge: "Data Quality",
        previewNote: "Validates email deliverability before launching any campaign sequence.",
      },
      {
        title: "Live Telemetry Dashboard",
        subtitle: "Granular Analytics & Webhooks",
        description: "Monitor real-time opens, link clicks, reply classifications, and unsubscribe actions with custom tracking domains.",
        metrics: "Sub-second event stream",
        badge: "Telemetry",
        previewNote: "Dispatches instant webhooks to Slack, CRMs, and custom endpoints.",
      },
    ],
    features: [
      { title: "Multi-Account Inbox Rotation", desc: "Distribute daily email volume across multiple SMTP/Google/Outlook inboxes automatically to safeguard domain reputation.", icon: Server },
      { title: "AI Copywriter & Sequencer", desc: "Draft high-converting email sequences tailored to prospect personas with automated multi-step follow-ups.", icon: Sparkles },
      { title: "Smart CSV Header Mapper", desc: "Import leads from any database with zero formatting errors. Auto-detect column headers and filter invalid emails.", icon: Database },
      { title: "Real-Time Telemetry & Tracking", desc: "Track verified opens, link clicks, and reply rates with custom tracking domains and analytics dashboards.", icon: BarChart3 },
      { title: "Warm-Up & Reputation Engine", desc: "Automated account warm-up that gradually builds sender volume while establishing positive reputation signals.", icon: Shield },
      { title: "Campaign A/B Testing", desc: "Test multiple subject lines, body variations, and send schedules simultaneously with automatic winner promotion.", icon: Target },
    ],
    whiteLabel: [
      { title: "Complete Brand Customization", desc: "Deploy under your agency's name, color palette, custom domain, and logo with zero reference to PrimeInbox.", icon: Palette },
      { title: "Custom Tracking Domains", desc: "Provide each of your clients with their own branded SSL tracking domain for maximum client trust.", icon: Globe },
      { title: "Multi-Tenant Client Portals", desc: "Give client accounts dedicated workspaces to view campaign metrics without seeing other clients.", icon: Building2 },
      { title: "Full Source Code Rights", desc: "Receive clean React 19 and Node.js source code with full commercial license and zero recurring fees.", icon: Code },
      { title: "Integrated Billing Module", desc: "Connect Razorpay or Stripe to bill your clients monthly retainers for outbound outreach services.", icon: CreditCard },
      { title: "Private Cloud Deployment", desc: "Host on your own VPS or AWS infrastructure with Redis queuing and PostgreSQL database.", icon: Terminal },
    ],
    sourceCodeOffer: {
      fixedPrice: 1,
      originalPrice: 49999,
      discountPercentage: 99,
      licenseName: "Full Commercial & White-Label Source Code License",
      deliveryMethod: "Instant GitHub Repo Access & ZIP Archive",
      deliverables: [
        "Complete React 19 + TypeScript Frontend Dashboard",
        "Node.js + Express Outbound Mailing Engine",
        "PostgreSQL Schemas & Redis Queue Configuration",
        "Automated Inbox Rotation & Warm-Up Logic",
        "Multi-Tenant Agency Dashboard Architecture",
        "Docker Compose Setup with Redis and PostgreSQL",
        "Razorpay & Stripe Checkout Modules Included",
        "Commercial License for Unlimited Client Deployments",
        "1 Year of Free Security Updates & Core Patches",
      ],
      featuresIncluded: [
        "Unlimited connected sending inboxes",
        "Automated multi-step sequence builder",
        "AI subject line & body copywriter",
        "Custom tracking domain support",
        "CSV import with deduplication & cleaning",
        "No monthly software fees forever",
      ],
      techStackDetailed: [
        { category: "Frontend", techs: ["React 19", "TypeScript", "TailwindCSS", "Recharts", "Framer Motion"] },
        { category: "Backend", techs: ["Node.js", "Express", "BullMQ / Redis", "Nodemailer Engine"] },
        { category: "Database", techs: ["PostgreSQL", "Redis", "Prisma ORM"] },
        { category: "DevOps", techs: ["Docker", "Docker Compose", "Nginx", "Linux VPS Ready"] },
      ],
    },
    faqs: [
      { q: "Can I connect unlimited email accounts?", a: "Yes. Since you own the source code and host it on your own server, there are no artificial limits on how many sending accounts or mailboxes you connect." },
      { q: "Does it support Gmail Workspace and Outlook?", a: "Yes, PrimeInbox supports Gmail / Google Workspace, Microsoft 365 / Outlook, AWS SES, SendGrid, and any custom IMAP/SMTP server." },
      { q: "How is background email sending handled?", a: "It utilizes Redis and BullMQ for reliable, asynchronous queue processing with rate-limiting, jitter delays, and retry mechanics." },
      { q: "Can I resell access as a monthly SaaS?", a: "Yes! The source code includes multi-tenant workspace separation so you can charge your customers recurring monthly SaaS fees." },
    ],
  },

  greviewpilot: {
    id: "greviewpilot",
    name: "GReviewPilot",
    tagline: "Autonomous Google Review & Local Reputation Autopilot",
    url: "https://greviewpilot.in/",
    localImg: "/assets/work/website-preview/greviewpilot.png",
    badge: "Local SEO & Reputation",
    categoryName: "Reputation & Local SEO",
    categoryGroup: "Operations & Growth",
    heroDesc: "Turn happy customers into 5-star Google reviews on autopilot. Smart QR codes, SMS/WhatsApp review funnels, negative review interception, and contextual AI response generation.",
    detailedDesc: "GReviewPilot is a complete local SEO and review automation SaaS. It empowers clinics, restaurants, retail shops, agencies, and home service businesses to collect glowing Google reviews while privately routing negative customer feedback for resolution.",
    techStack: ["React 19", "TypeScript", "Node.js", "PostgreSQL", "Google Places API", "TailwindCSS"],
    stats: [
      { label: "Review Growth", value: "3.8x" },
      { label: "Intercept Rate", value: "89%" },
      { label: "Response Time", value: "< 2 min" },
      { label: "Businesses Served", value: "1,200+" },
    ],
    interactiveCapabilities: [
      {
        title: "Smart Sentiment Routing",
        subtitle: "Negative Review Interceptor",
        description: "Happy customers (4-5 stars) are instantly directed to your public Google Business profile, while unhappy ratings trigger private feedback forms.",
        metrics: "Protects public rating",
        badge: "Smart Funnel",
        previewNote: "Customizable star thresholds and custom apology voucher automations.",
      },
      {
        title: "AI Review Responder",
        subtitle: "Contextual SEO-Rich Replies",
        description: "Generates tailored, professional responses referencing customer compliments and local SEO keywords within seconds of posting.",
        metrics: "100% response rate",
        badge: "AI SEO Engine",
        previewNote: "Boosts Google Maps ranking through consistent keyword frequency.",
      },
      {
        title: "NFC & QR Stand Creator",
        subtitle: "In-Store Review Triggers",
        description: "Auto-generates branded tabletop QR stands, NFC tap cards, and printed receipt slips with one-click direct Google review links.",
        metrics: "Instant physical tap",
        badge: "Hardware Ready",
        previewNote: "Print-ready high-resolution SVG/PDF export with custom brand logo.",
      },
      {
        title: "Automated SMS & WhatsApp Drips",
        subtitle: "Post-Purchase Review Triggers",
        description: "Schedule automated review request messages via WhatsApp and SMS right after client appointments or order deliveries.",
        metrics: "68% open rates",
        badge: "Messaging",
        previewNote: "Native integrations with Twilio and WhatsApp Business Cloud API.",
      },
    ],
    features: [
      { title: "Negative Review Interception", desc: "Route unhappy feedback privately to management before it damages your public Google Maps rating.", icon: ShieldCheck },
      { title: "AI Review Auto-Responder", desc: "Respond to incoming Google reviews in seconds using local SEO keywords and tailored human-like messaging.", icon: Bot },
      { title: "Branded QR & NFC Generator", desc: "Create high-converting printable counter stands and NFC tap links with your client's branding.", icon: Sparkles },
      { title: "Multi-Location Dashboard", desc: "Manage dozens of business branches and storefronts from one centralized agency control center.", icon: MapPin },
      { title: "WhatsApp & SMS Review Drips", desc: "Automate review collection requests sent at the optimal customer satisfaction moment.", icon: MessageCircle },
      { title: "Local SEO Analytics", desc: "Track ranking improvements, keyword positions, and review velocity across all your client locations.", icon: TrendingUp },
    ],
    whiteLabel: [
      { title: "Agency Multi-Tenant Portal", desc: "Manage 50+ local business clients with individual login credentials under your agency's domain.", icon: Building2 },
      { title: "Branded Client Reports", desc: "Deliver automated weekly PDF reputation and rating reports branded with your agency logo.", icon: FileText },
      { title: "Custom Domain & Themes", desc: "Host on reviews.youragency.com with customized color schemes and localized currency support.", icon: Globe },
      { title: "Full Commercial Freedom", desc: "Charge monthly retainers of ₹5,000–₹15,000 per location with zero platform commissions.", icon: Crown },
      { title: "Complete Source Code", desc: "Receive the full unminified React 19 and Node.js code with database schemas and deployment guides.", icon: Code },
      { title: "Private Cloud Deployment", desc: "Run securely on your own VPS or AWS cloud instance with complete data ownership.", icon: Terminal },
    ],
    sourceCodeOffer: {
      fixedPrice: 1,
      originalPrice: 39999,
      discountPercentage: 99,
      licenseName: "Full Commercial & White-Label Source Code License",
      deliveryMethod: "Instant GitHub Repo Access & ZIP Archive",
      deliverables: [
        "Complete React 19 Frontend Web App Source Code",
        "Node.js Backend with Google My Business API integration",
        "PostgreSQL Schemas & Database Migration Scripts",
        "Negative Review Interception Funnel Logic",
        "AI Review Response Generation Engine (Gemini / OpenAI)",
        "Printable QR Stand & Review Widget Generators",
        "Full Multi-Tenant White-Label Setup Documentation",
        "Commercial License for Unlimited Client Locations",
        "1 Year of Free Code Updates and Bug Fixes",
      ],
      featuresIncluded: [
        "Unlimited business branch accounts",
        "Negative feedback private routing funnel",
        "AI review auto-reply generator",
        "SMS and WhatsApp campaign triggers",
        "Client self-service portal",
        "One-time payment with lifetime rights",
      ],
      techStackDetailed: [
        { category: "Frontend", techs: ["React 19", "TypeScript", "TailwindCSS", "Lucide", "Canvas QR Gen"] },
        { category: "Backend", techs: ["Node.js", "Express", "Google Places API", "Twilio / WhatsApp API"] },
        { category: "Database", techs: ["PostgreSQL", "Prisma ORM"] },
        { category: "DevOps", techs: ["Docker", "VPS Scripts", "Caddy / Nginx"] },
      ],
    },
    faqs: [
      { q: "Does this require Google Business API approval?", a: "GReviewPilot works with both direct Google Place review links (instant setup without approval) as well as the official Google Business Profile API for automated review syncing and replying." },
      { q: "How does the negative review filter work?", a: "When customers scan the QR code or click the review link, they are asked for a star rating. 4-5 stars redirect directly to Google, while 1-3 stars open an internal private feedback form that notifies the owner." },
      { q: "Can I offer this as a monthly service to local businesses?", a: "Absolutely! Most agencies charge local businesses ₹5,000 to ₹10,000 per month for review management and reputation SEO." },
      { q: "What are the server requirements?", a: "A basic $5–$10/month VPS (like DigitalOcean, Hetzner, or AWS Lightsail) can comfortably host GReviewPilot and manage hundreds of locations." },
    ],
  },

  bookmytime: {
    id: "bookmytime",
    name: "BookMyTime",
    tagline: "Smart Multi-Calendar Appointment & Booking Engine",
    url: "https://bookmytime.in/",
    localImg: "/assets/work/website-preview/bookmytime.png",
    badge: "Scheduling & Bookings",
    categoryName: "Scheduling & Booking",
    categoryGroup: "Operations & Growth",
    heroDesc: "The open, customizable alternative to Calendly. Multi-calendar synchronization, automated time-zone conversion, buffer windows, group bookings, and integrated upfront payment collection.",
    detailedDesc: "BookMyTime is a high-performance appointment scheduling SaaS built for consultants, agencies, clinics, and service professionals. Eliminate back-and-forth email tagging with automated availability sync, custom booking questions, and automated reminder sequences.",
    techStack: ["React 19", "TypeScript", "Node.js", "PostgreSQL", "Google Calendar API", "Razorpay"],
    stats: [
      { label: "Bookings Handled", value: "85,000+" },
      { label: "No-Show Reduction", value: "42%" },
      { label: "Time Zone Sync", value: "100%" },
      { label: "Setup Time", value: "< 5 min" },
    ],
    interactiveCapabilities: [
      {
        title: "2-Way Calendar Synchronization",
        subtitle: "Real-Time Conflict Prevention",
        description: "Connects bi-directionally with Google Calendar, Outlook, and Apple iCal so you never get double-booked across personal and business commitments.",
        metrics: "Zero double-bookings",
        badge: "Calendar Sync",
        previewNote: "Instant delta-sync updates availability across all connected devices in real time.",
      },
      {
        title: "Integrated Upfront Payments",
        subtitle: "Paid Consultations & Retainers",
        description: "Collect consultation fees upfront before confirming calendar slots using Razorpay, Stripe, or UPI QR flows.",
        metrics: "Guaranteed client commitment",
        badge: "Fintech Ready",
        previewNote: "Supports flexible deposit percentages and automated refund workflows.",
      },
      {
        title: "Multi-Staff Round-Robin",
        subtitle: "Team Lead Routing",
        description: "Distribute customer appointments equally across team members or assign bookings based on team availability and expertise.",
        metrics: "Balanced team workload",
        badge: "Team Ops",
        previewNote: "Assign priorities and regional routing rules per staff member.",
      },
      {
        title: "Automated WhatsApp & SMS Reminders",
        subtitle: "No-Show Killer",
        description: "Sends automated confirmation messages, calendar invite files (.ics), and 24-hour / 1-hour pre-meeting reminders via WhatsApp and Email.",
        metrics: "42% fewer no-shows",
        badge: "Automation",
        previewNote: "Includes 1-click reschedule and cancellation links in every reminder.",
      },
    ],
    features: [
      { title: "2-Way Calendar Sync", desc: "Bi-directional synchronization with Google Calendar, Outlook, and iCloud to eliminate scheduling overlaps.", icon: Calendar },
      { title: "Upfront Fee Collection", desc: "Charge clients before they can book slots on your calendar with built-in Razorpay and Stripe support.", icon: CreditCard },
      { title: "Custom Availability Windows", desc: "Configure distinct working hours, meeting buffers, lead time rules, and daily booking limits.", icon: Clock },
      { title: "Team Round-Robin Scheduling", desc: "Distribute discovery calls across your sales team automatically based on availability.", icon: Users },
      { title: "Automated SMS & WhatsApp Alerts", desc: "Send instant calendar invites and timed reminder messages to slash customer no-shows.", icon: Bell },
      { title: "Custom Intake Forms", desc: "Gather required client project information, documents, and business details prior to the call.", icon: FileText },
    ],
    whiteLabel: [
      { title: "100% Brand Customization", desc: "Host on booking.yourcompany.com with your custom colors, font typography, and logo.", icon: Palette },
      { title: "Multi-Staff & Client Workspaces", desc: "Create independent booking pages for every consultant, doctor, or team member in your organization.", icon: Building2 },
      { title: "Embed Anywhere", desc: "Seamless iframe, pop-up widget, and floating booking button embed code for any website or landing page.", icon: Code },
      { title: "Full Code Ownership", desc: "Receive the complete React 19 source code without any monthly per-seat licensing fees.", icon: Crown },
      { title: "Custom Webhooks & Integrations", desc: "Dispatch real-time booking events directly into your CRM, Slack, or Google Sheets.", icon: Zap },
      { title: "Private Cloud Host", desc: "Self-host on any standard VPS or Docker container with full data privacy compliance.", icon: Terminal },
    ],
    sourceCodeOffer: {
      fixedPrice: 1,
      originalPrice: 29999,
      discountPercentage: 99,
      licenseName: "Full Commercial & White-Label Source Code License",
      deliveryMethod: "Instant GitHub Repo Access & ZIP Archive",
      deliverables: [
        "Complete React 19 Frontend Booking App & Embed Widget",
        "Node.js Backend with Google Calendar & Outlook OAuth",
        "PostgreSQL Database Schemas & Prisma Migrations",
        "Razorpay & Stripe Upfront Payment Integration",
        "Automated WhatsApp & Email Notification Engine",
        "Multi-Staff & Team Round-Robin Allocation Logic",
        "Comprehensive Deployment & Environment Setup Guide",
        "Commercial License for Unlimited Team Members & Deployments",
        "1 Year of Free Code Updates and Security Patches",
      ],
      featuresIncluded: [
        "Unlimited booking types & staff members",
        "Bi-directional calendar synchronization",
        "Custom booking questions and form builder",
        "Upfront payment gateway collection",
        "Automated reminder sequences",
        "Zero monthly per-user subscription fees",
      ],
      techStackDetailed: [
        { category: "Frontend", techs: ["React 19", "TypeScript", "TailwindCSS", "Date-Fns", "Framer Motion"] },
        { category: "Backend", techs: ["Node.js", "Express", "Google Calendar API", "Nodemailer"] },
        { category: "Database", techs: ["PostgreSQL", "Prisma ORM"] },
        { category: "DevOps", techs: ["Docker", "Docker Compose", "Nginx"] },
      ],
    },
    faqs: [
      { q: "How is BookMyTime different from Calendly?", a: "Calendly charges $12–$20 per user every month. With BookMyTime, you buy the source code once, host it yourself, brand it with your identity, and add unlimited staff and clients with zero monthly fees." },
      { q: "Can I embed booking widgets on my WordPress or custom website?", a: "Yes! The source code includes lightweight responsive embed code (inline iframe or popup modal) that works on WordPress, Webflow, Shopify, or plain HTML." },
      { q: "Does it support multiple time zones automatically?", a: "Yes, it automatically detects the visitor's local time zone and converts all your available slots accurately." },
      { q: "Can I accept payments in Indian Rupees (INR)?", a: "Yes, native Razorpay integration is already built in, along with UPI and international card payment support." },
    ],
  },

  chatnexgen: {
    id: "chatnexgen",
    name: "ChatNexGen",
    tagline: "Intelligent Omnichannel AI Support & Sales Assistant",
    url: "https://chatnexgen.in/",
    localImg: "/assets/work/website-preview/chatnexgen.png",
    badge: "AI Conversational Bot",
    categoryName: "Conversational AI & Chat",
    categoryGroup: "Operations & Growth",
    heroDesc: "Deploy hyper-personalized AI chat agents that resolve customer queries, qualify leads, and close sales 24/7 across your Website, WhatsApp, and Telegram.",
    detailedDesc: "ChatNexGen is a production-ready conversational AI platform that connects directly to your company's knowledge base, website URLs, and PDFs. It speaks your brand voice, answers pre-sales questions, qualifies prospects, and hands off complex inquiries to human agents.",
    techStack: ["React 19", "TypeScript", "Node.js", "Gemini AI", "Vector DB", "WebSockets", "Docker"],
    stats: [
      { label: "Query Resolution", value: "82%" },
      { label: "Response Latency", value: "< 1.2s" },
      { label: "Languages", value: "50+" },
      { label: "Leads Captured", value: "35,000+" },
    ],
    interactiveCapabilities: [
      {
        title: "Instant Knowledge Training",
        subtitle: "1-Click Website & Doc Sync",
        description: "Point the AI to your website URL, PDF manuals, or FAQ docs. The system crawls, embeds, and indexes your entire business knowledge in under 2 minutes.",
        metrics: "Zero manual training",
        badge: "Vector RAG",
        previewNote: "Uses modern semantic embeddings to retrieve pinpoint answers without hallucination.",
      },
      {
        title: "Omnichannel Deployment",
        subtitle: "Web, WhatsApp & Telegram",
        description: "Deploy a single unified AI brain across your web chat widget, official WhatsApp Business API, and Telegram channels simultaneously.",
        metrics: "Unified conversation inbox",
        badge: "Omnichannel",
        previewNote: "Synchronizes conversation history across web and mobile channels.",
      },
      {
        title: "Autonomous Lead Capture",
        subtitle: "Interactive Sales Qualification",
        description: "Engages website visitors with timely conversational prompts, captures name, email, and phone numbers, and schedules meetings right in the chat.",
        metrics: "3.2x higher lead capture",
        badge: "Lead Gen",
        previewNote: "Pushes captured leads directly to your CRM with conversation transcripts.",
      },
      {
        title: "Seamless Human Handoff",
        subtitle: "Live Agent Takeover",
        description: "When a customer requests a human or expresses frustration, the AI instantly rings your human support team with full context summary.",
        metrics: "Zero friction transition",
        badge: "Live Support",
        previewNote: "Agents can join the conversation directly from the admin dashboard or mobile.",
      },
    ],
    features: [
      { title: "No-Code Knowledge Base Sync", desc: "Train your AI agent by scraping website URLs, uploading PDFs, or pasting existing help desk articles.", icon: Brain },
      { title: "Omnichannel Integration", desc: "Deploy seamlessly on your website widget, WhatsApp Business API, and Telegram channels.", icon: MessageCircle },
      { title: "Lead Qualification & Booking", desc: "Capture prospect contact information and book consultation calls directly within chat conversations.", icon: Target },
      { title: "Smart Human Handoff", desc: "Seamlessly transfer high-intent conversations to live human operators with conversation summaries.", icon: Users },
      { title: "Custom Brand Persona & Guardrails", desc: "Tailor the bot's tone, reply length, fallback behavior, and strict privacy guardrails.", icon: Sparkles },
      { title: "Analytics & Sentiment Tracker", desc: "Analyze customer sentiment, top asked questions, conversion rates, and chat resolution metrics.", icon: BarChart3 },
    ],
    whiteLabel: [
      { title: "Complete White-Label Rights", desc: "Brand the chat widget, dashboard, and notifications with your agency or company identity.", icon: Palette },
      { title: "Custom Widget Theming", desc: "Customize bubble positions, greeting avatars, brand colors, and launcher button styles.", icon: Smartphone },
      { title: "Multi-Client Agency Reselling", desc: "Create independent chatbot instances for each of your agency clients from one super-admin portal.", icon: Building2 },
      { title: "Full Unminified Source Code", desc: "Get full access to the React 19 web widget, Node.js backend, and vector database pipelines.", icon: Code },
      { title: "Bring Your Own LLM Keys", desc: "Connect your own Gemini, OpenAI, or Anthropic API keys for direct, unmetered AI usage at cost.", icon: Key },
      { title: "Self-Hosted Private Deployment", desc: "Host on your own VPS with Docker Compose for 100% data privacy and customer confidentiality.", icon: Terminal },
    ],
    sourceCodeOffer: {
      fixedPrice: 1,
      originalPrice: 44999,
      discountPercentage: 99,
      licenseName: "Full Commercial & White-Label Source Code License",
      deliveryMethod: "Instant GitHub Repo Access & ZIP Archive",
      deliverables: [
        "Complete React 19 Chatbot Web Widget & Admin Dashboard",
        "Node.js Backend with RAG Vector Knowledge Retrieval",
        "WhatsApp Business Cloud API Webhook Integration",
        "PostgreSQL Schemas for Chat Logs & Lead Captures",
        "Document Parsing & Vector Embedding Pipeline",
        "Live Human Agent Takeover Interface & WebSockets",
        "Full White-Label Customization & Branding Guide",
        "Commercial License for Unlimited Chatbot Instances",
        "1 Year of Free Core Updates and Security Patches",
      ],
      featuresIncluded: [
        "Unlimited website visitors and chat sessions",
        "Vector search semantic knowledge base",
        "WhatsApp and web widget omnichannel support",
        "Live human agent chat takeover",
        "Lead capture & CRM webhook dispatches",
        "Zero monthly seat or chat limits forever",
      ],
      techStackDetailed: [
        { category: "Frontend", techs: ["React 19", "TypeScript", "TailwindCSS", "Socket.IO Client", "Lucide"] },
        { category: "Backend", techs: ["Node.js", "Express", "Socket.IO", "LangChain / RAG Pipeline"] },
        { category: "AI & Vector", techs: ["Gemini AI / OpenAI", "Vector Embeddings", "PDF Parser"] },
        { category: "DevOps", techs: ["Docker", "Docker Compose", "Nginx", "VPS Ready"] },
      ],
    },
    faqs: [
      { q: "How easy is it to add to any website?", a: "It provides a 1-line `<script>` tag that you can paste into any Webflow, WordPress, Shopify, Next.js, or HTML website." },
      { q: "Can I use my own OpenAI or Gemini API key?", a: "Yes. You configure your own AI API keys in the environment variables, meaning you only pay the raw wholesale API cost (cents per thousand chats) with no middleman markup." },
      { q: "Does it support WhatsApp Business?", a: "Yes, the backend includes ready-to-use webhook handlers for the Meta WhatsApp Business Cloud API." },
      { q: "Can human agents jump in and take over chats?", a: "Yes. When a customer asks for a human, the admin dashboard alerts the operator, who can pause the AI and chat directly in real time." },
    ],
  },

  nexaleadai: {
    id: "nexaleadai",
    name: "NexaLead AI",
    tagline: "AI Prospecting & Intent-Driven B2B Lead Engine",
    url: "https://nexaleadai.in/",
    localImg: "/assets/work/website-preview/nexaleadai.png",
    badge: "B2B Lead Intelligence",
    categoryName: "B2B Lead Intelligence",
    categoryGroup: "AI & Automation",
    heroDesc: "Discover high-intent B2B buyers before your competitors do. Verified executive emails, company firmographics, hiring intent triggers, and automated enrichment for enterprise sales pipelines.",
    detailedDesc: "NexaLead AI is a comprehensive B2B lead intelligence and prospecting database engine. It filters millions of global companies and decision-makers by revenue, tech stack, hiring velocity, and direct contact details to feed your sales pipeline with verified leads.",
    techStack: ["React 19", "TypeScript", "Node.js", "PostgreSQL", "Elasticsearch", "TailwindCSS", "Docker"],
    stats: [
      { label: "B2B Profiles", value: "25M+" },
      { label: "Email Accuracy", value: "96.4%" },
      { label: "Search Latency", value: "< 250ms" },
      { label: "Enrichment Fields", value: "40+" },
    ],
    interactiveCapabilities: [
      {
        title: "Deep Intent Filtering",
        subtitle: "High-Probability Buyer Discovery",
        description: "Filter decision-makers by technology installed, recent funding rounds, job hiring spikes, and executive leadership transitions.",
        metrics: "Finds ready buyers",
        badge: "Intent Engine",
        previewNote: "Combines firmographic datasets with live job post telemetry.",
      },
      {
        title: "Multi-Step Email Verification",
        subtitle: "Zero Bounce Guarantee",
        description: "Performs real-time SMTP ping, MX record validation, and catch-all domain detection to ensure every exported email is valid.",
        metrics: "< 2% bounce rate",
        badge: "Deliverability",
        previewNote: "Eliminates dead addresses before spending outbound outreach credits.",
      },
      {
        title: "1-Click CSV & CRM Sync",
        subtitle: "Instant Pipeline Export",
        description: "Export clean lead lists with complete firmographics or push contacts directly into HubSpot, Salesforce, or PrimeInbox via API.",
        metrics: "Instant pipeline injection",
        badge: "Integrations",
        previewNote: "Supports customizable column mapping and duplicate suppression.",
      },
      {
        title: "AI Persona Matchmaker",
        subtitle: "Ideal Customer Profile Cloner",
        description: "Upload a list of your top 10 best customers. The AI analyzes industry codes, headcount, and keywords to generate lookalike prospects automatically.",
        metrics: "Automated lookalike lists",
        badge: "Lookalike AI",
        previewNote: "Identifies hidden addressable market segments matching your ICP.",
      },
    ],
    features: [
      { title: "25M+ Verified B2B Profiles", desc: "Access global corporate decision-makers filtered by job title, department seniority, and verified emails.", icon: Search },
      { title: "Buying Intent Triggers", desc: "Surface accounts actively hiring for specific skill sets or expanding their executive teams.", icon: TrendingUp },
      { title: "Real-Time Email Verification", desc: "Every contact is verified via live SMTP handshakes to guarantee deliverability.", icon: ShieldCheck },
      { title: "Technographic Intelligence", desc: "Find companies using specific software stacks like Shopify, Stripe, AWS, HubSpot, or Salesforce.", icon: Cpu },
      { title: "Automated List Enrichment", desc: "Upload partial lead lists and enrich them with phone numbers, LinkedIn URLs, and company revenues.", icon: Database },
      { title: "Instant CRM Push", desc: "One-click export directly to CSV or native sync with popular CRMs and outbound email engines.", icon: Workflow },
    ],
    whiteLabel: [
      { title: "Full White-Label Rights", desc: "Launch your own B2B lead generation platform branded with your agency name and domain.", icon: Palette },
      { title: "Multi-Tier Credit Allocation", desc: "Set up monthly lead download credits for your agency clients and team members.", icon: CreditCard },
      { title: "Custom Domain & Branding", desc: "Host on leads.yourbrand.com with customized logo, favicon, and email notifications.", icon: Globe },
      { title: "Complete Source Code", desc: "Receive the full React 19 frontend and Node.js search API with zero recurring licensing fees.", icon: Code },
      { title: "Integrate Any Data Provider", desc: "Plug in your own data providers or custom scrapers with standard modular adapter architecture.", icon: Server },
      { title: "Private Cloud Deployment", desc: "Deploy on your private cloud infrastructure with complete data sovereignty.", icon: Terminal },
    ],
    sourceCodeOffer: {
      fixedPrice: 1,
      originalPrice: 49999,
      discountPercentage: 99,
      licenseName: "Full Commercial & White-Label Source Code License",
      deliveryMethod: "Instant GitHub Repo Access & ZIP Archive",
      deliverables: [
        "Complete React 19 B2B Prospecting Web Platform",
        "Node.js Backend Search & Filter API Architecture",
        "PostgreSQL Schemas & Lead Enrichment Pipeline",
        "Real-Time SMTP Email Verification Engine",
        "CSV Export & Column Mapping Module",
        "Multi-Tenant User & Credit Management System",
        "Full White-Label Setup Documentation & Brand Guide",
        "Commercial License for Unlimited Client Deployments",
        "1 Year of Free Updates and Security Patches",
      ],
      featuresIncluded: [
        "B2B search & filtering interface",
        "Company firmographic and technographic filters",
        "Live email verification engine",
        "CSV export with custom column mapping",
        "Multi-tenant client accounts with credit limits",
        "One-time fixed price with lifetime ownership",
      ],
      techStackDetailed: [
        { category: "Frontend", techs: ["React 19", "TypeScript", "TailwindCSS", "Lucide", "Framer Motion"] },
        { category: "Backend", techs: ["Node.js", "Express", "Elasticsearch / Postgres", "SMTP Checker"] },
        { category: "Database", techs: ["PostgreSQL", "Redis"] },
        { category: "DevOps", techs: ["Docker", "Docker Compose", "Nginx"] },
      ],
    },
    faqs: [
      { q: "Can I connect my own data sources or scrapers?", a: "Yes. The backend uses a modular adapter architecture, making it easy to plug in custom data scrapers, Apollo/Hunter APIs, or your own proprietary databases." },
      { q: "How is email verification performed?", a: "The included verification module performs DNS MX lookup, syntax checking, and live SMTP mailbox handshakes without sending actual emails." },
      { q: "Can I resell this tool to my clients with credits?", a: "Yes! The multi-tenant backend allows you to allocate monthly export credits to your clients and charge them monthly subscriptions." },
      { q: "Is the source code fully customizable?", a: "Yes, you receive 100% clean, unminified TypeScript and React 19 code with no obfuscation." },
    ],
  },
};

/* ─────────────────────── Dynamic Custom Products Registry ─────────────────────── */
const dynamicCustomProducts: Record<string, ProductDetail> = {};

const iconMap: Record<string, LucideIcon> = {
  FileText, ShieldCheck, Clock, Sparkles, Server, Database, BarChart3,
  Inbox, MessageCircle, TrendingUp, MapPin, Globe, Bell, Calendar,
  Users, Bot, Workflow, Search, Brain, Target, Shield, Zap,
  Layers, Code, Palette, Mail, Lock, Cpu, Terminal, Gauge,
  CheckCircle, Star, Crown, Building2, Headphones, BookOpen,
  CreditCard, GitBranch, Key, RefreshCw, Smartphone
};

export function resolveIcon(iconOrName?: LucideIcon | string): LucideIcon {
  if (typeof iconOrName === "function") return iconOrName;
  if (typeof iconOrName === "string" && iconMap[iconOrName]) return iconMap[iconOrName];
  return Sparkles;
}

export function normalizeProduct(p: any): ProductDetail {
  const id = (p.id || "").toLowerCase().trim();
  const name = p.name || id;

  const features = (p.features || []).map((f: any) => ({
    title: f.title || "Core Feature",
    desc: f.desc || "",
    icon: resolveIcon(f.icon || f.iconName),
  }));

  const whiteLabel = (p.whiteLabel || []).map((w: any) => ({
    title: w.title || "White-Label Right",
    desc: w.desc || "",
    icon: resolveIcon(w.icon || w.iconName),
  }));

  const rawUrl = p.url || "";
  const cleanUrl = rawUrl.startsWith("http://") || rawUrl.startsWith("https://") ? rawUrl : `https://${rawUrl}`;

  const sourceCodeOffer: SourceCodeOffer = {
    fixedPrice: Number(p.sourceCodeOffer?.fixedPrice ?? 499),
    originalPrice: Number(p.sourceCodeOffer?.originalPrice ?? 49999),
    discountPercentage: Number(p.sourceCodeOffer?.discountPercentage ?? 99),
    licenseName: p.sourceCodeOffer?.licenseName || "Full Commercial & White-Label Source Code License",
    deliveryMethod: p.sourceCodeOffer?.deliveryMethod || "Instant Encrypted Download (5-Min Expiring Session)",
    deliverables: p.sourceCodeOffer?.deliverables?.length
      ? p.sourceCodeOffer.deliverables
      : [
          `Complete ${name} Frontend Codebase`,
          "Node.js Backend & API Microservices",
          "Production Docker Compose & Deployment Scripts",
          "100% White-Label Rebranding Documentation",
        ],
    featuresIncluded: p.sourceCodeOffer?.featuresIncluded?.length
      ? p.sourceCodeOffer.featuresIncluded
      : [
          "Lifetime Commercial License",
          "Unlimited Deployments & Workspaces",
          "1 Year Free Core Engine Updates",
        ],
    techStackDetailed: p.sourceCodeOffer?.techStackDetailed?.length
      ? p.sourceCodeOffer.techStackDetailed
      : [
          { category: "Frontend", techs: ["React 19", "TypeScript", "TailwindCSS"] },
          { category: "Backend", techs: ["Node.js", "Express", "API Engine"] },
        ],
  };

  const interactiveCapabilities: InteractiveCapability[] = (p.interactiveCapabilities || []).length > 0
    ? p.interactiveCapabilities.map((cap: any) => ({
        title: cap.title || "Core System Engine",
        subtitle: cap.subtitle || "Automated Architecture",
        description: cap.description || p.heroDesc || "Production-tested SaaS capability ready for immediate deployment.",
        metrics: cap.metrics || "< 15s latency",
        badge: cap.badge || "Core Module",
        previewNote: cap.previewNote || "Full commercial white-label source code included.",
      }))
    : [
        {
          title: "Automated Core Engine",
          subtitle: "Autonomous Pipeline",
          description: p.heroDesc || "High-throughput automation pipeline delivering instant results with zero manual friction.",
          metrics: "< 15s latency",
          badge: "Core AI",
          previewNote: "Full commercial white-label source code included.",
        },
      ];

  const stats = (p.stats || []).length > 0
    ? p.stats
    : [
        { label: "Execution Speed", value: "< 15s" },
        { label: "Accuracy SLA", value: "99.2%" },
        { label: "Uptime Guarantee", value: "99.9%" },
        { label: "Active Deployments", value: "500+" },
      ];

  const faqs: FaqItem[] = (p.faqs || []).length > 0
    ? p.faqs
    : [
        {
          q: "What do I get when I purchase the source code?",
          a: "You receive immediate access to the complete, unminified source code repository with 100% commercial white-label rights and zero recurring royalties.",
        },
        {
          q: "Can I host this on our private infrastructure?",
          a: "Yes. You can deploy to any VPS (DigitalOcean, AWS, Hetzner, or private server) with included Docker Compose configurations in under 15 minutes.",
        },
      ];

  return {
    id,
    name,
    tagline: p.tagline || `${name} — Production SaaS Platform`,
    url: cleanUrl,
    localImg: p.localImg || "/assets/work/website-preview/briefvault.png",
    badge: p.badge || "NEW SAAS",
    categoryName: p.categoryName || "AI & Automation",
    categoryGroup: p.categoryGroup === "Operations & Growth" ? "Operations & Growth" : "AI & Automation",
    heroDesc: p.heroDesc || p.tagline || "Enterprise-grade production software platform.",
    detailedDesc: p.detailedDesc || p.heroDesc || "",
    techStack: Array.isArray(p.techStack) && p.techStack.length ? p.techStack : ["React 19", "TypeScript", "Node.js"],
    features,
    whiteLabel,
    sourceCodeOffer,
    interactiveCapabilities,
    faqs,
    stats,
  };
}

export function registerCustomProducts(products: (ProductDetail | any)[]): void {
  for (const p of products) {
    if (!p || !p.id) continue;
    const normalized = normalizeProduct(p);
    dynamicCustomProducts[normalized.id.toLowerCase()] = normalized;
  }

  // Synchronize megaMenuCategories array in-place
  syncMegaMenuCategories();

  // Cache to localStorage if in browser environment
  if (typeof window !== "undefined") {
    try {
      const customList = Object.values(dynamicCustomProducts).filter(
        (cp) => !productDetails[cp.id.toLowerCase()]
      );
      localStorage.setItem("sap_custom_products", JSON.stringify(customList));
      // Dispatch custom event for reactive UI components
      window.dispatchEvent(new CustomEvent("sap_products_updated", { detail: customList }));
    } catch {
      // Ignore localStorage write limits
    }
  }
}

export function unregisterCustomProduct(id: string): void {
  const lower = id.toLowerCase().trim();
  delete dynamicCustomProducts[lower];
  syncMegaMenuCategories();
  if (typeof window !== "undefined") {
    try {
      const customList = Object.values(dynamicCustomProducts).filter(
        (cp) => !productDetails[cp.id.toLowerCase()]
      );
      localStorage.setItem("sap_custom_products", JSON.stringify(customList));
      window.dispatchEvent(new CustomEvent("sap_products_updated", { detail: customList }));
    } catch {
      // Ignore
    }
  }
}

// Check localStorage on browser initialization
if (typeof window !== "undefined") {
  try {
    const stored = localStorage.getItem("sap_custom_products");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        registerCustomProducts(parsed);
      }
    }
  } catch (e) {
    // Ignore localStorage parse errors
  }
}

/**
 * Fetch and synchronize custom products from the backend API
 */
let syncPromise: Promise<ProductDetail[]> | null = null;
export async function loadAndSyncCustomProducts(): Promise<ProductDetail[]> {
  if (typeof window === "undefined") {
    return getAllProductDetails();
  }

  if (syncPromise) return syncPromise;

  syncPromise = (async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        if (data.customProducts && Array.isArray(data.customProducts)) {
          registerCustomProducts(data.customProducts);
        }
      }
    } catch (err) {
      console.warn("Could not sync custom products from /api/products:", err);
    } finally {
      syncPromise = null;
    }
    return getAllProductDetails();
  })();

  return syncPromise;
}

/* ─────────────────────── Helper Functions ─────────────────────── */
export function getProductDetail(id: string): ProductDetail | undefined {
  if (!id) return undefined;
  const lower = id.toLowerCase().trim();
  return productDetails[lower] || dynamicCustomProducts[lower];
}

export function getAllProductDetails(): ProductDetail[] {
  const customList = Object.values(dynamicCustomProducts).filter(
    (cp) => !productDetails[cp.id.toLowerCase()]
  );
  return [...Object.values(productDetails), ...customList];
}

/* ─────────────────────── Mega Menu Navigation Helpers ─────────────────────── */
export interface MegaMenuItem {
  id: string;
  name: string;
  tagline: string;
  url: string;
  badge: string;
  categoryGroup: "AI & Automation" | "Operations & Growth";
}

export interface MegaMenuCategory {
  group: string;
  description: string;
  items: MegaMenuItem[];
}

const baseMegaMenuCategories: MegaMenuCategory[] = [
  {
    group: "AI & Automation",
    description: "Autonomous software for outbound sales, document intelligence & leads",
    items: [
      {
        id: "briefvault",
        name: "BriefVault",
        tagline: "AI Legal Document & Contract Summarizer",
        url: "/products/briefvault",
        badge: "Popular",
        categoryGroup: "AI & Automation" as const,
      },
      {
        id: "primeinbox",
        name: "PrimeInbox",
        tagline: "Cold Email & Deliverability Operating System",
        url: "/products/primeinbox",
        badge: "Hot",
        categoryGroup: "AI & Automation" as const,
      },
      {
        id: "nexaleadai",
        name: "NexaLead AI",
        tagline: "B2B Lead Intelligence & Intent Prospecting",
        url: "/products/nexaleadai",
        badge: "New",
        categoryGroup: "AI & Automation" as const,
      },
    ],
  },
  {
    group: "Operations & Growth",
    description: "Production platforms for customer retention, bookings & 24/7 AI chat",
    items: [
      {
        id: "greviewpilot",
        name: "GReviewPilot",
        tagline: "Autonomous Google Reviews & Reputation SEO",
        url: "/products/greviewpilot",
        badge: "High ROI",
        categoryGroup: "Operations & Growth" as const,
      },
      {
        id: "bookmytime",
        name: "BookMyTime",
        tagline: "Multi-Calendar Appointment Scheduling Engine",
        url: "/products/bookmytime",
        badge: "Essential",
        categoryGroup: "Operations & Growth" as const,
      },
      {
        id: "chatnexgen",
        name: "ChatNexGen",
        tagline: "Omnichannel AI Support & WhatsApp Bot",
        url: "/products/chatnexgen",
        badge: "24/7 AI",
        categoryGroup: "Operations & Growth" as const,
      },
    ],
  },
];

export function getMegaMenuCategories(): MegaMenuCategory[] {
  const customList = Object.values(dynamicCustomProducts).filter(
    (cp) => !productDetails[cp.id.toLowerCase()]
  );

  const categories: MegaMenuCategory[] = [
    {
      group: baseMegaMenuCategories[0].group,
      description: baseMegaMenuCategories[0].description,
      items: [...baseMegaMenuCategories[0].items],
    },
    {
      group: baseMegaMenuCategories[1].group,
      description: baseMegaMenuCategories[1].description,
      items: [...baseMegaMenuCategories[1].items],
    },
  ];

  for (const cp of customList) {
    const group = cp.categoryGroup === "Operations & Growth" ? "Operations & Growth" : "AI & Automation";
    const targetCat = categories.find((c) => c.group === group) || categories[0];
    if (!targetCat.items.some((it) => it.id === cp.id)) {
      targetCat.items.push({
        id: cp.id,
        name: cp.name,
        tagline: cp.tagline,
        url: `/products/${cp.id}`,
        badge: cp.badge || "New",
        categoryGroup: group,
      });
    }
  }

  return categories;
}

export const megaMenuCategories: MegaMenuCategory[] = [
  {
    group: baseMegaMenuCategories[0].group,
    description: baseMegaMenuCategories[0].description,
    items: [...baseMegaMenuCategories[0].items],
  },
  {
    group: baseMegaMenuCategories[1].group,
    description: baseMegaMenuCategories[1].description,
    items: [...baseMegaMenuCategories[1].items],
  },
];

function syncMegaMenuCategories() {
  const updated = getMegaMenuCategories();
  megaMenuCategories[0].items = [...updated[0].items];
  megaMenuCategories[1].items = [...updated[1].items];
}
