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

export interface TechStackCategoryItem {
  name: string;
  details: string;
  url?: string;
}

export interface ComprehensiveTechStackCategory {
  category: string;
  description?: string;
  items: TechStackCategoryItem[];
}

export interface SystemPipelineStage {
  step: string;
  title: string;
  description: string;
}

export interface AiModuleCategory {
  category: string;
  count: number;
  modules: string[];
}

export interface SystemCapabilitiesData {
  targetAudience: string;
  architectureDiagram: string;
  pipelineStages: SystemPipelineStage[];
  aiModules: AiModuleCategory[];
  ragCapabilities: {
    title: string;
    description: string;
    highlights: string[];
  };
  documentComparison: {
    title: string;
    description: string;
  };
  reportGeneration: {
    title: string;
    formats: string[];
    description: string;
  };
  adminAndBilling: {
    title: string;
    features: { name: string; desc: string }[];
  };
}

export interface DeploymentStep {
  stepNumber: number;
  title: string;
  description?: string;
  command?: string;
  codeSnippet?: {
    filename?: string;
    language: string;
    code: string;
  };
  note?: string;
}

export interface VpsDeploymentGuideData {
  overview: {
    os: string;
    processManager: string;
    reverseProxy: string;
    database: string;
    storagePath: string;
    appPath: string;
  };
  steps: DeploymentStep[];
}

export interface VpsRedeploymentGuideData {
  manualSteps: { step: string; command: string; explanation?: string }[];
  deployScriptFilename: string;
  deployScript: string;
  rollbackPlan: { step: string; command: string; explanation?: string }[];
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
  comprehensiveTechStack?: ComprehensiveTechStackCategory[];
  systemCapabilities?: SystemCapabilitiesData;
  vpsDeploymentGuide?: VpsDeploymentGuideData;
  vpsRedeploymentGuide?: VpsRedeploymentGuideData;
}

/* ─────────────────────── Product Data ─────────────────────── */
export const productDetails: Record<string, ProductDetail> = {
  briefvault: {
    id: "briefvault",
    name: "BriefVault",
    tagline: "AI-Powered Legal Intelligence & Document Analysis Platform",
    url: "https://briefvault.in/",
    localImg: "/assets/work/website-preview/briefvault.png",
    badge: "AI Legal Tech",
    categoryName: "Legal AI & Intelligence",
    categoryGroup: "AI & Automation",
    heroDesc: "AI-powered Legal Intelligence Platform engineered for law firms, legal counsels, chartered accountants, company secretaries, tax consultants, and corporate compliance teams. Transforms multi-hundred-page judicial rulings and contracts into structured, citation-backed intelligence in seconds.",
    detailedDesc: "BriefVault is an enterprise-grade legal intelligence SaaS platform engineered for law firms, in-house counsel, compliance teams, and consultancies. Users upload agreements or judicial rulings of any size and receive structured executive briefings, flagged indemnity exposures, and page-verified citation answers in seconds.",
    techStack: ["Next.js 15", "React 19", "TypeScript 5.7", "Tailwind CSS v4", "MySQL 8.0", "Prisma ORM 6", "Google Gemini AI", "Cashfree AutoPay", "Tesseract OCR"],
    stats: [
      { label: "Document Processing", value: "< 30s" },
      { label: "Extraction Accuracy", value: "99.2%" },
      { label: "Max Document Size", value: "500+ pgs" },
      { label: "AI Analysis Modules", value: "19 Engines" },
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
      { title: "Source Code Modification", desc: "Modify the Next.js 15 UI, tweak prompt engineering pipelines, or plug your own LLM API keys without restrictions.", icon: Code },
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
        "Complete Next.js 15 (App Router) + React 19 + TypeScript 5.7 Frontend Source Code",
        "Full Backend Engine with Next.js REST APIs & instrumentation.ts Job Worker",
        "MySQL 8.0 Schemas & Prisma ORM 6 Client with 15+ Production Models",
        "Multi-Provider AI Orchestrator (Google Gemini, OpenRouter, OpenAI, Local LLM)",
        "Tesseract OCR, pdf-parse & mammoth Document Extraction Pipeline",
        "Cashfree Payments Integration (One-Time Checkout & Recurring AutoPay E-Mandates)",
        "Super Admin Portal with OTP Authentication, RBAC & Approval Workflows",
        "Full Nginx Reverse Proxy, SSL Certbot & PM2 Ecosystem Configurations",
        "1 Year of Free Security Updates & Core Patches",
      ],
      featuresIncluded: [
        "Unlimited document uploads & 19 AI analysis modules",
        "Citation-backed semantic Q&A RAG engine",
        "Side-by-side multi-document comparison",
        "Automated deadline calendar & statutory risk matrix",
        "Super admin control panel with user analytics & approvals",
        "Zero subscription fees or recurring royalties forever",
      ],
      techStackDetailed: [
        { category: "Frontend & UI", techs: ["Next.js 15", "React 19", "TypeScript 5.7", "Tailwind CSS v4", "Radix UI", "Framer Motion", "Lenis"] },
        { category: "Backend & Server", techs: ["Node.js 20+", "Next.js App Router APIs", "instrumentation.ts Worker", "Zero-Redis MySQL Job Queue", "Nodemailer"] },
        { category: "Database & ORM", techs: ["MySQL 8.0+", "Prisma ORM 6 (15+ models)", "Vector Embeddings Indexing (DB/Pinecone/Qdrant)"] },
        { category: "Document OCR", techs: ["pdf-parse", "mammoth (DOCX)", "tesseract.js OCR (scanned images & PDFs)"] },
        { category: "AI & RAG Engine", techs: ["Google Gemini (3.1-flash-lite / 3.5-flash)", "OpenRouter", "OpenAI", "Claude", "Local Ollama", "Semantic Chunking"] },
        { category: "Payments & Billing", techs: ["Cashfree Payments", "AutoPay E-Mandates", "Automated Invoicing (BV-INV-YYYY-XXXXXX)"] },
      ],
    },
    faqs: [
      { q: "What do I get when I purchase the source code?", a: "You receive immediate access to the full, unminified source code (Next.js 15 App Router, React 19 frontend, Node.js 20+ backend APIs, Prisma 6 ORM schemas, 19 AI prompt modules, and deployment scripts) via a private GitHub repository and a downloadable ZIP archive." },
      { q: "Can I rebrand this and sell it to my own clients?", a: "Yes, 100%! You receive a full commercial white-label license. You can rebrand the platform under your own name and logo, host it on your domain, and charge your clients whatever you wish with zero royalties." },
      { q: "How difficult is it to deploy BriefVault on a VPS?", a: "We provide complete step-by-step documentation for Ubuntu 22.04/24.04 LTS with PM2, Nginx reverse proxy, MySQL 8.0, and automated Let's Encrypt SSL. You can deploy it in 15 minutes." },
      { q: "Which AI models does BriefVault use?", a: "BriefVault features a provider-agnostic multi-LLM orchestrator. Primary: Google Gemini (gemini-3.1-flash-lite, gemini-3.5-flash). Failovers: OpenRouter (Nemotron, GPT-4o-mini), OpenAI, Anthropic Claude, or local Ollama/LM Studio via standard OpenAI-compatible endpoints." },
      { q: "Does it require Redis for heavy background document processing?", a: "No! BriefVault is engineered with a zero-Redis durable MySQL-backed job queue managed directly by the Next.js Server Startup Lifecycle (instrumentation.ts), keeping VPS resource footprints lightweight and cost-effective." },
      { q: "Which payment gateways and billing models are integrated?", a: "BriefVault comes integrated with Cashfree Payments (India), supporting both one-time checkout orders and recurring e-mandates (AutoPay), complete with automated branded invoice generation." },
    ],

    /* ─── 1. Complete Technology Stack ─── */
    comprehensiveTechStack: [
      {
        category: "Frontend & UI Layer",
        description: "Modern, high-performance web interface built with React 19 and Next.js 15 App Router.",
        items: [
          { name: "Next.js 15", details: "App Router, Server Components & Client Components", url: "https://nextjs.org/" },
          { name: "React 19 & TypeScript 5.7", details: "Latest React primitives with end-to-end type safety", url: "https://react.dev/" },
          { name: "Tailwind CSS v4", details: "Custom @theme variables & tailwindcss-animate", url: "https://tailwindcss.com/" },
          { name: "Radix UI", details: "Accessible primitives: Accordion, Dropdown Menu, Label, Navigation Menu, Slot, Tabs", url: "https://www.radix-ui.com/" },
          { name: "Framer Motion & Lenis", details: "Fluid animations with buttery smooth scrolling", url: "https://motion.dev/" },
          { name: "Recharts & React CountUp", details: "Interactive charts and animated analytics counters", url: "https://recharts.org/" },
          { name: "Embla Carousel", details: "Touch-friendly responsive sliders", url: "https://www.embla-carousel.com/" },
          { name: "React PDF / pdfjs-dist", details: "High-fidelity in-browser PDF document viewer", url: "https://github.com/wojtekmaj/react-pdf" },
          { name: "React Hook Form & Zod", details: "Type-safe form validations via @hookform/resolvers", url: "https://zod.dev/" },
          { name: "Lucide React & React Icons", details: "Crisp vector icons and glyph sets", url: "https://lucide.dev/" },
          { name: "Sonner", details: "Opinionated, modern toast notification system", url: "https://sonner.emilkowal.ski/" },
          { name: "TanStack Query v5 & Table v8", details: "Asynchronous data caching and performant tabular grids", url: "https://tanstack.com/" },
        ],
      },
      {
        category: "Backend & Application Server",
        description: "Robust Node.js runtime with Next.js standalone server and zero-Redis durable queues.",
        items: [
          { name: "Node.js 20+ Runtime", details: "Next.js standalone / Node server execution environment" },
          { name: "Next.js REST API Routes", details: "Structured backend endpoints (src/app/api/...)" },
          { name: "instrumentation.ts Worker", details: "Next.js Server Startup Lifecycle hook with zero-Redis MySQL durable job queue" },
          { name: "Nodemailer", details: "Gmail SMTP & custom SMTP for OTP verification, admin alerts, and demo requests", url: "https://nodemailer.com/" },
        ],
      },
      {
        category: "Database & Data Layer",
        description: "Enterprise relational database and flexible vector indexing for semantic similarity search.",
        items: [
          { name: "MySQL 8.0+", details: "Relational database engine with utf8mb4 collation" },
          { name: "Prisma ORM 6", details: "Type-safe client-js with schemas covering 15+ production models", url: "https://www.prisma.io/" },
          { name: "Vector Store", details: "Database-backed vector indexing (configurable for Pinecone, Qdrant, or Weaviate)" },
        ],
      },
      {
        category: "Document Extraction & OCR",
        description: "Multi-format document ingestion engine with OCR fallback for scanned judicial files.",
        items: [
          { name: "pdf-parse", details: "Fast native digital text extraction from PDF files" },
          { name: "mammoth", details: "Semantic conversion and parsing of Microsoft Word DOCX files" },
          { name: "Tesseract.js OCR", details: "On-server optical character recognition with eng.traineddata for scanned papers and images" },
        ],
      },
      {
        category: "AI & Intelligence Engine (Provider-Agnostic)",
        description: "Multi-LLM orchestrator with automatic failovers and grounded RAG citations.",
        items: [
          { name: "Primary LLM: Google Gemini", details: "gemini-3.1-flash-lite, gemini-3.5-flash for high-speed legal analysis" },
          { name: "Alternative / Failover LLMs", details: "OpenRouter (Nemotron, GPT-4o-mini), OpenAI, Anthropic Claude, Azure OpenAI, or Local Ollama/LM Studio" },
          { name: "Extractive Fallback", details: "Deterministic extractive analysis if AI APIs are temporarily unreachable" },
          { name: "Embeddings Engine", details: "Google Gemini embeddings (gemini-embedding-001), OpenAI (text-embedding-3-small), or local hash embeddings" },
          { name: "RAG Pipeline", details: "Structure-aware semantic chunking, cosine vector similarity, grounded answers with exact page & paragraph citations" },
        ],
      },
      {
        category: "Payments & Billing",
        description: "Native Indian payment gateway integration with recurring subscription capabilities.",
        items: [
          { name: "Cashfree Payments", details: "Unified checkout for UPI, NetBanking, Cards, and Wallets in India" },
          { name: "AutoPay E-Mandates", details: "Supports both one-time checkout orders and recurring subscription mandates" },
          { name: "Automated Invoicing", details: "Automated tax invoice generation with serial format (BV-INV-YYYY-XXXXXX)" },
        ],
      },
    ],

    /* ─── 2. What BriefVault Does (System Capabilities) ─── */
    systemCapabilities: {
      targetAudience: "BriefVault is an AI-powered Legal Intelligence Platform designed for law firms, legal counsels, chartered accountants, company secretaries, tax consultants, and corporate compliance teams. It transforms dense, multi-hundred-page legal judgments, contracts, and regulatory filings into structured, citation-backed intelligence.",
      architectureDiagram: `┌──────────────────────────────────────────────┐
│        BriefVault Core Architecture          │
└──────────────────────┬───────────────────────┘
                       │
       ┌───────────────┼──────────────────────────────┐
       ▼               ▼                              ▼
┌──────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐
│ Ingestion & OCR  │ │  6-Stage Pipeline   │ │ 19 AI Modules & RAG │
│ • PDF, DOCX, TXT │─┼► Cleaning, Metadata,│─┼► Summaries, Risks,  │
│ • Tesseract OCR  │ │ Chunking, Vector    │ │ Timeline, Citations │
│ • Local/S3 Disk  │ │ Indexing, Queue Job │ │ Interactive Chat    │
└──────────────────┘ └─────────────────────┘ └─────────────────────┘
       │                                              │
       ▼                                              ▼
┌──────────────────┐                         ┌─────────────────────┐
│ Cashfree AutoPay │                         │ Admin & Multi-Tenant│
│ • Subscriptions  │                         │ • OTP Auth & RBAC   │
│ • E-Mandates     │                         │ • Super Admin Portal│
│ • Invoicing      │                         │ • Approval Workflow │
└──────────────────┘                         └─────────────────────┘`,
      pipelineStages: [
        { step: "Stage 1", title: "Extraction & OCR", description: "Reads digital text from PDF, DOCX, or plain text. If scanned pages or images are detected, local OCR runs via tesseract.js." },
        { step: "Stage 2", title: "Text Cleaning", description: "Strips formatting noise, normalizes unicode characters, cleans legal headers/footers, and detects document language." },
        { step: "Stage 3", title: "Legal Metadata Extraction", description: "Automatically extracts court name, presiding judge, case number, parties (petitioner vs. respondent), decision dates, acts, and section numbers." },
        { step: "Stage 4", title: "Semantic Chunking", description: "Divides documents into context-bounded chunks respecting paragraph and section borders." },
        { step: "Stage 5", title: "Vector Embedding & Indexing", description: "Generates vector embeddings for every chunk and indexes them into the database for rapid cosine similarity search." },
        { step: "Stage 6", title: "Durable Queue Worker", description: "Heavy background processing is managed by a database-backed job queue (queue_jobs) running asynchronously without Redis." },
      ],
      aiModules: [
        {
          category: "Summaries",
          count: 5,
          modules: ["Executive Summary", "Single-Page Brief", "30-Second Quick Summary", "Key Highlights", "Chronological Case Timeline"],
        },
        {
          category: "Litigation Analysis",
          count: 6,
          modules: ["Background Case Facts", "Questions Before Court", "Petitioner & Respondent Arguments", "Final Decision & Relief", "Ratio Decidendi (binding precedent)", "Obiter Dicta (judicial observations)"],
        },
        {
          category: "Risk & Compliance",
          count: 5,
          modules: ["Regulatory Risk Analysis (tax, financial, litigation)", "Compliance Checklist", "Action Items", "Statutory Deadlines", "Monetary / Penalty Breakdown"],
        },
        {
          category: "Legal References",
          count: 3,
          modules: ["Cited Acts & Sections of Law", "Case Citations & Precedents", "Important Paragraph Extracts"],
        },
      ],
      ragCapabilities: {
        title: "RAG-Powered Legal Research & Document Q&A",
        description: "Users can query their documents in natural language. The system retrieves the most relevant semantic chunks and generates answers backed by direct quotes, page numbers, and confidence scores.",
        highlights: [
          "Natural language conversational queries over 500+ page contracts",
          "Every claim backed by exact page numbers and paragraph excerpts",
          "Confidence scoring on extracted legal facts",
          "Zero hallucination guarantee via strict prompt bounding",
        ],
      },
      documentComparison: {
        title: "Side-by-Side Document Comparison",
        description: "Comparative analysis of two agreements, petitions, or contracts, highlighting deviations, altered liability clauses, and missing terms in real-time.",
      },
      reportGeneration: {
        title: "Formal Branded Report Exports",
        formats: ["Executive Brief", "Client Summary", "Compliance Audit", "Legal Opinions"],
        description: "One-click export of clean, formal PDF and print-ready reports customized with your law firm or consultancy branding.",
      },
      adminAndBilling: {
        title: "Authentication, Admin & Billing Lifecycle",
        features: [
          { name: "Passwordless OTP Sign-in", desc: "Authenticates users securely via 5-minute email OTPs." },
          { name: "Account Approvals Workflow", desc: "Gated onboarding system where signups can undergo admin approval before activation." },
          { name: "Super Admin Portal", desc: "Protected panel for managing users, approving registrations, triaging demo requests, and checking AI logs." },
          { name: "Cashfree Payments Integration", desc: "Native INR gateway integration supporting one-time payments and recurring e-mandates (AutoPay)." },
        ],
      },
    },

    /* ─── 3. Step-by-Step Fresh VPS Deployment Guide ─── */
    vpsDeploymentGuide: {
      overview: {
        os: "Ubuntu 22.04 / 24.04 LTS",
        processManager: "PM2",
        reverseProxy: "Nginx (with SSL via Let's Encrypt Certbot)",
        database: "MySQL 8.0 (Local on VPS or Remote managed instance)",
        storagePath: "/var/www/storage/briefvault",
        appPath: "/var/www/briefvault",
      },
      steps: [
        {
          stepNumber: 1,
          title: "VPS Hardening & Firewall",
          description: "Log into your server via SSH as root, update system packages, and set up a basic UFW firewall.",
          command: `ssh root@YOUR_SERVER_IP

# Update system packages & install base utilities
apt update && apt upgrade -y
apt install -y ufw fail2ban curl git wget unzip build-essential

# Allow SSH, HTTP, and HTTPS
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# (Optional but recommended) Add swap memory to avoid out-of-memory errors during build
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab`,
        },
        {
          stepNumber: 2,
          title: "Install Node.js 20 LTS & PM2",
          description: "Install Node.js 20 via NodeSource and install PM2 process manager globally.",
          command: `curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verify versions
node -v  # Should be v20.x.x
npm -v

# Install PM2 globally
npm install -g pm2`,
        },
        {
          stepNumber: 3,
          title: "Setup MySQL Database",
          description: "Install MySQL locally on the VPS, secure it, and initialize the briefvault database and user.",
          note: "If you are using a remote managed database (e.g. AWS RDS or DigitalOcean DB), skip to Step 4 and place your connection string in .env.",
          command: `apt install -y mysql-server
systemctl enable --now mysql

# Run secure installation
mysql_secure_installation

# Open MySQL shell to create database and user
mysql -u root -p`,
          codeSnippet: {
            language: "sql",
            filename: "MySQL Shell Commands",
            code: `CREATE DATABASE briefvault CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'briefvault_user'@'localhost' IDENTIFIED BY 'StrongSecretPassword123!';
GRANT ALL PRIVILEGES ON briefvault.* TO 'briefvault_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;`,
          },
        },
        {
          stepNumber: 4,
          title: "Create Storage Directory",
          description: "Create the storage directory for legal uploads and set appropriate file permissions.",
          command: `mkdir -p /var/www/storage/briefvault
chmod -R 775 /var/www/storage
chown -R www-data:www-data /var/www/storage`,
        },
        {
          stepNumber: 5,
          title: "Clone Codebase & Install Dependencies",
          description: "Clone repository into /var/www/briefvault and install dependencies with legacy peer dependencies support.",
          command: `mkdir -p /var/www/briefvault
cd /var/www/briefvault

# Clone repository (replace with your repo URL)
git clone https://github.com/YOUR_ORG/briefvault.git .

# Install dependencies (use --legacy-peer-deps for React 19 / Next 15 packages)
npm install --legacy-peer-deps`,
        },
        {
          stepNumber: 6,
          title: "Configure Environment Variables",
          description: "Create production .env configuration file inside /var/www/briefvault.",
          command: `nano .env`,
          codeSnippet: {
            language: "ini",
            filename: "/var/www/briefvault/.env",
            code: `# Database
DATABASE_URL="mysql://briefvault_user:StrongSecretPassword123!@localhost:3306/briefvault"

# App & Environment
APP_URL="https://briefvault.in"
NODE_ENV="production"

# Auth / OTP
OTP_TTL_MINUTES=5
OTP_MAX_ATTEMPTS=5
SESSION_TTL_DAYS=7
SESSION_TTL_DAYS_REMEMBER=30

# SMTP (Email OTP & Admin Notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-specific-password"
EMAIL_FROM="BriefVault <no-reply@briefvault.in>"

# Local Storage
STORAGE_PROVIDER="local"
STORAGE_ROOT="/var/www/storage"
STORAGE_PROJECT="briefvault"
MAX_FILE_SIZE="104857600"
STORAGE_API_KEY="generate_a_random_32_char_hex_secret"

# AI Configuration
AI_LLM_PROVIDER="gemini"
AI_LLM_MODEL="gemini-1.5-flash"
AI_LLM_PREMIUM_MODEL="gemini-1.5-pro"
GEMINI_API_KEY="your_google_gemini_api_key"
GEMINI_BASE_URL="https://generativelanguage.googleapis.com/v1beta"

# OpenRouter (Fallback)
OPENROUTER_API_KEY=""
OPENROUTER_MODEL="openai/gpt-4o-mini"

# Embeddings & Vector
AI_EMBEDDING_PROVIDER="gemini"
AI_EMBEDDING_MODEL="gemini-embedding-001"
AI_EMBEDDING_DIMENSIONS="768"
AI_VECTOR_STORE="db"
AI_AUTO_ANALYZE="true"

# OCR
OCR_ENABLED="true"
OCR_LANGUAGES="eng"

# Super Admin Account
SUPER_ADMIN_USERNAME="admin@briefvault.in"
SUPER_ADMIN_PASSWORD="StrongSuperAdminPassword!"
SUPER_ADMIN_SECRET="secure_random_jwt_secret_phrase_2026"

# Cashfree Payments (Set sandbox for testing or production for live)
CASHFREE_ENV="production"
CASHFREE_APP_ID="your_cashfree_app_id"
CASHFREE_SECRET_KEY="your_cashfree_secret_key"
CASHFREE_CALLBACK_URL="https://briefvault.in"
UNPAID_GRACE_HOURS="24"`,
          },
        },
        {
          stepNumber: 7,
          title: "Database Migration & Production Build",
          description: "Generate the Prisma client, push the database schema, and compile Next.js.",
          command: `# Generate Prisma client
npx prisma generate

# Push database schema to create all tables
npx prisma db push

# Build Next.js application
npm run build`,
        },
        {
          stepNumber: 8,
          title: "Setup PM2 Process Manager",
          description: "Create an ecosystem.config.cjs file and start the persistent Next.js process.",
          command: `nano ecosystem.config.cjs`,
          codeSnippet: {
            language: "javascript",
            filename: "/var/www/briefvault/ecosystem.config.cjs",
            code: `module.exports = {
  apps: [
    {
      name: "briefvault",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/var/www/briefvault",
      instances: 1, // Keep 1 instance (instrumentation queue worker runs in-process)
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      max_memory_restart: "1G",
      error_file: "/var/log/pm2/briefvault-error.log",
      out_file: "/var/log/pm2/briefvault-out.log",
      time: true
    }
  ]
};`,
          },
          note: `After saving the file, start the process:\nmkdir -p /var/log/pm2\npm2 start ecosystem.config.cjs\npm2 save\npm2 startup\n# Verify status\npm2 status\npm2 logs briefvault --lines 20`,
        },
        {
          stepNumber: 9,
          title: "Setup Nginx Reverse Proxy",
          description: "Install Nginx and configure a reverse proxy to route domain traffic to port 3000.",
          command: `apt install -y nginx
nano /etc/nginx/sites-available/briefvault`,
          codeSnippet: {
            language: "nginx",
            filename: "/etc/nginx/sites-available/briefvault",
            code: `server {
    listen 80;
    server_name briefvault.in www.briefvault.in;

    # Allow up to 100MB file uploads (documents, scanned PDFs)
    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts for large document uploads and long AI streaming requests
        proxy_connect_timeout 120s;
        proxy_send_timeout 120s;
        proxy_read_timeout 120s;
    }
}`,
          },
          note: `Enable the site and reload Nginx:\nln -s /etc/nginx/sites-available/briefvault /etc/nginx/sites-enabled/\nrm -f /etc/nginx/sites-enabled/default\nnginx -t\nsystemctl reload nginx`,
        },
        {
          stepNumber: 10,
          title: "Enable SSL with Let's Encrypt Certbot",
          description: "Issue a free SSL/TLS certificate with automatic renewal for your domain.",
          command: `apt install -y certbot python3-certbot-nginx

# Obtain SSL Certificate
certbot --nginx -d briefvault.in -d www.briefvault.in --non-interactive --agree-tos -m contact@briefvault.in

# Verify auto-renewal
certbot renew --dry-run`,
          note: "Your deployment is now live with HTTPS on https://briefvault.in!",
        },
      ],
    },

    /* ─── 4. Step-by-Step Redeployment Guide (Updates) ─── */
    vpsRedeploymentGuide: {
      manualSteps: [
        {
          step: "1. SSH into VPS",
          command: `ssh root@YOUR_SERVER_IP\ncd /var/www/briefvault`,
          explanation: "Navigate to your application root directory.",
        },
        {
          step: "2. Pull Latest Changes",
          command: `git pull origin main`,
          explanation: "Fetch latest commits and updates from repository.",
        },
        {
          step: "3. Install New Dependencies",
          command: `npm install --legacy-peer-deps`,
          explanation: "Install any updated or new packages.",
        },
        {
          step: "4. Sync Database Schema",
          command: `npx prisma generate\nnpx prisma db push`,
          explanation: "Regenerates Prisma client and updates database tables if schema.prisma changed.",
        },
        {
          step: "5. Rebuild Next.js Application",
          command: `npm run build`,
          explanation: "Compiles production assets and optimized Server Components.",
        },
        {
          step: "6. Reload PM2 with Zero Downtime",
          command: `pm2 reload briefvault\npm2 logs briefvault --lines 30`,
          explanation: "Reloads application worker seamlessly without interrupting active visitors.",
        },
      ],
      deployScriptFilename: "/var/www/briefvault/deploy.sh",
      deployScript: `#!/bin/bash
set -e

echo "🚀 Starting BriefVault Redeployment..."
cd /var/www/briefvault

echo "📥 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "🔄 Syncing database schema..."
npx prisma generate
npx prisma db push

echo "🏗️ Building Next.js application..."
npm run build

echo "♻️ Reloading PM2 process..."
pm2 reload briefvault --update-env

echo "✅ Deployment completed successfully!"`,
      rollbackPlan: [
        {
          step: "1. View Recent Commits",
          command: `cd /var/www/briefvault\ngit log --oneline -n 5`,
          explanation: "Check the last 5 commits to identify the stable commit hash.",
        },
        {
          step: "2. Rollback to Previous Commit",
          command: `git checkout HEAD~1`,
          explanation: "Revert local workspace to the previous working commit.",
        },
        {
          step: "3. Rebuild & Reload PM2",
          command: `npx prisma generate\nnpm run build\npm2 reload briefvault`,
          explanation: "Restores previous working state with zero downtime.",
        },
      ],
    },
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
