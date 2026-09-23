import {
  FileText, ShieldCheck, Clock, Sparkles, Server, Database, BarChart3,
  Inbox, MessageCircle, TrendingUp, MapPin, Globe, Bell, Calendar,
  Users, Bot, Workflow, Search, Brain, Target, Shield, Zap,
  Layers, Code, Palette, Mail, Lock, Cpu, Terminal, Gauge,
  CheckCircle, Star, Crown, Building2, Headphones, BookOpen,
  CreditCard, GitBranch, Key, RefreshCw, Smartphone,
  HeartPulse, Video, Briefcase,
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
  legalDisclaimer?: string;
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

export interface DemoCredentials {
  username: string;
  password: string;
  note?: string;
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
  demoCredentials?: DemoCredentials;
  comprehensiveTechStack?: ComprehensiveTechStackCategory[];
  systemCapabilities?: SystemCapabilitiesData;
  architectureDiagram?: string;
  architectureDescription?: string;
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
    demoCredentials: {
      username: "demobriefvault@gmail.com",
      password: "Demo@2026",
      note: "Pre-loaded with sample legal judgments, petitions, and citation-backed RAG index.",
    },
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
      fixedPrice: 1999,
      originalPrice: 24999,
      discountPercentage: 92,
      licenseName: "Source Code License",
      deliveryMethod: "Instant GitHub Repo Access & ZIP Archive",
      legalDisclaimer: "Important: You must rebrand and change the original product name, brand identity, and logos before deploying to production. Deploying or operating under the original product name without modification may result in copyright or trademark infringement and legal consequences.",
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
      { q: "Can I rebrand this and sell it to my own clients?", a: "Yes, 100%! You receive a full commercial source code license. You can rebrand the platform under your own name and logo, host it on your domain, and charge your clients whatever you wish with zero royalties." },
      { q: "How difficult is it to deploy BriefVault on a VPS?", a: "We provide complete step-by-step documentation for Ubuntu 22.04/24.04 LTS with PM2, Nginx reverse proxy, MySQL 8.0, and automated Let's Encrypt SSL. You can deploy it in 15 minutes." },
      { q: "Which AI models does BriefVault use?", a: "BriefVault features a provider-agnostic multi-LLM orchestrator. Primary: Google Gemini (gemini-3.1-flash-lite, gemini-3.5-flash). Failovers: OpenRouter (Nemotron, GPT-4o-mini), OpenAI, Anthropic Claude, or local Ollama/LM Studio via standard OpenAI-compatible endpoints." },
      { q: "Does it require Redis for heavy background document processing?", a: "No! BriefVault is engineered with a zero-Redis durable MySQL-backed job queue managed directly by the Next.js Server Startup Lifecycle (instrumentation.ts), keeping VPS resource footprints lightweight and cost-effective." },
      { q: "Which payment gateways and billing models are integrated?", a: "BriefVault comes integrated with Cashfree Payments (India), supporting both one-time checkout orders and recurring e-mandates (AutoPay), complete with automated branded invoice generation." },
    ],

    /* ─── 1. Complete Technology Stack ─── */
    comprehensiveTechStack: [
      {
        category: "Frontend & UI Layer",
        description: "Modern web interface built with React 19 and Next.js 15 App Router.",
        items: [
          { name: "Next.js 15", details: "App Router & Server Components", url: "https://nextjs.org/" },
          { name: "React 19 & TypeScript 5.7", details: "Primitives & end-to-end type safety", url: "https://react.dev/" },
          { name: "Tailwind CSS v4", details: "Custom @theme tokens & animations", url: "https://tailwindcss.com/" },
          { name: "Radix UI", details: "Accessible headless UI primitives", url: "https://www.radix-ui.com/" },
          { name: "Framer Motion & Lenis", details: "Smooth animations & scrolling", url: "https://motion.dev/" },
          { name: "Recharts & CountUp", details: "Interactive charts & counters", url: "https://recharts.org/" },
          { name: "Embla Carousel", details: "Touch-friendly responsive sliders", url: "https://www.embla-carousel.com/" },
          { name: "React PDF / pdfjs-dist", details: "In-browser document viewer", url: "https://github.com/wojtekmaj/react-pdf" },
          { name: "React Hook Form & Zod", details: "Type-safe form schema validation", url: "https://zod.dev/" },
          { name: "Lucide & React Icons", details: "Crisp vector iconography", url: "https://lucide.dev/" },
          { name: "Sonner", details: "Modern toast notifications", url: "https://sonner.emilkowal.ski/" },
          { name: "TanStack Query & Table", details: "Async caching & tabular grids", url: "https://tanstack.com/" },
        ],
      },
      {
        category: "Backend & Application Server",
        description: "Node.js runtime with Next.js standalone server and zero-Redis durable queues.",
        items: [
          { name: "Node.js 20+ Runtime", details: "Standalone server execution" },
          { name: "Next.js REST APIs", details: "Structured backend endpoints" },
          { name: "instrumentation.ts Worker", details: "Zero-Redis MySQL durable job queue" },
          { name: "Nodemailer", details: "SMTP OTP & alert notifications", url: "https://nodemailer.com/" },
        ],
      },
      {
        category: "Database & Data Layer",
        description: "Enterprise relational database and flexible vector indexing for semantic similarity search.",
        items: [
          { name: "MySQL 8.0+", details: "Relational database with utf8mb4" },
          { name: "Prisma ORM 6", details: "Type-safe schema with 15+ models", url: "https://www.prisma.io/" },
          { name: "Vector Store", details: "Database & vector similarity indexing" },
        ],
      },
      {
        category: "Document Extraction & OCR",
        description: "Multi-format document ingestion engine with OCR fallback for scanned judicial files.",
        items: [
          { name: "pdf-parse", details: "Digital text extraction from PDFs" },
          { name: "mammoth", details: "DOCX conversion & parsing" },
          { name: "Tesseract.js OCR", details: "On-server OCR for scans & images" },
        ],
      },
      {
        category: "AI & Intelligence Engine",
        description: "Multi-LLM orchestrator with automatic failovers and grounded RAG citations.",
        items: [
          { name: "Google Gemini (Primary)", details: "gemini-3.1-flash-lite & 3.5-flash" },
          { name: "Alternative / Failover LLMs", details: "OpenRouter, OpenAI, Claude, Local Ollama" },
          { name: "Extractive Fallback", details: "Deterministic offline analysis" },
          { name: "Embeddings Engine", details: "Gemini & OpenAI vector embeddings" },
          { name: "RAG Pipeline", details: "Semantic chunking & page citations" },
        ],
      },
      {
        category: "Payments & Billing",
        description: "Native Indian payment gateway integration with recurring subscription capabilities.",
        items: [
          { name: "Cashfree Payments", details: "UPI, Cards & NetBanking checkout" },
          { name: "AutoPay E-Mandates", details: "Recurring subscription billing" },
          { name: "Automated Invoicing", details: "Tax invoice generation (BV-INV-YYYY-XXXXXX)" },
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
    tagline: "Cold Email Outreach & Deliverability Operating System",
    url: "https://primeinbox.online/",
    demoCredentials: {
      username: "demoprimeinbox@gmail.com",
      password: "Demo@2026",
      note: "Pre-configured with connected warm-up mailboxes, SMTP rotation pools, and sample sequences.",
    },
    localImg: "/assets/work/website-preview/primeinbox.png",
    badge: "Outreach & Deliverability",
    categoryName: "Cold Outreach & Email OS",
    categoryGroup: "AI & Automation",
    heroDesc: "Enterprise-grade cold email outreach and deliverability SaaS platform built for high-volume sales outreach, agency lead generation, and automated sequence execution with multi-account SMTP rotation and Google Gemini AI copywriter.",
    detailedDesc: "PrimeInbox is a cold email outreach and deliverability SaaS platform built for high-volume sales outreach, agency lead generation, and automated sequence execution. It empowers businesses to run personalized cold email campaigns at scale while protecting sender reputation and avoiding spam folders through multi-account SMTP rotation, smart business hours timezone validation, AI lead parsing, and app-level DKIM signing.",
    techStack: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS v4",
      "Node.js 20 LTS",
      "Nodemailer v9",
      "Prisma 7 ORM",
      "MariaDB / MySQL",
      "Google Gemini AI",
      "TipTap v3 & CodeMirror 6",
      "Zoho Payments",
      "PM2 & Nginx",
    ],
    stats: [
      { label: "Inbox Placement", value: "99.4%" },
      { label: "SMTP Accounts", value: "Unlimited" },
      { label: "Delivery Engine", value: "Nodemailer v9" },
      { label: "AI Copywriter", value: "Gemini 2.5 Flash" },
    ],
    features: [
      {
        title: "Multi-Account SMTP Rotation & Deliverability Protection",
        desc: "Connect multiple accounts (Google Workspace, Office 365, SendGrid, Amazon SES, custom SMTP) with Round-Robin, Weighted, or Priority rotation, automatic hourly/daily quota resets, randomized jitter (30-180s), and health scoring.",
        icon: Server,
      },
      {
        title: "Smart Scheduling & Timezone Optimization",
        desc: "Outbound emails are sent strictly within customizable prospect business hours (8:00 AM – 6:00 PM local timezone) with built-in weekend suppression (no emails on Saturdays and Sundays).",
        icon: Clock,
      },
      {
        title: "Multi-Step Automated Follow-Up Sequences",
        desc: "Multi-stage email sequences with configurable delays between steps. Automatic stop triggers halt sequences immediately when a lead replies, bounces, or unsubscribes.",
        icon: Workflow,
      },
      {
        title: "Dual Template Builders & Gemini AI Generation",
        desc: "Visual WYSIWYG editor (TipTap v3) and HTML code editor (CodeMirror 6) with real-time variable tags ({{firstName}}, {{companyName}}) and integrated Google Gemini AI for subject lines, body copy, and spam-trigger prevention.",
        icon: Sparkles,
      },
      {
        title: "AI-Powered Lead Management & Document Ingestion",
        desc: "Import leads via CSV, Excel (.xlsx SheetJS), Word (.docx mammoth), or PDF (pdf-parse). Built-in Gemini AI parses unstructured documents to extract prospect names, emails, companies, and roles.",
        icon: Brain,
      },
      {
        title: "Comprehensive Deliverability & Event Tracking",
        desc: "1x1 tracking pixel for open tracking, URL rewrite proxy for click tracking, RFC 8058 List-Unsubscribe headers, app-level DKIM signing (2048-bit RSA with AES-256-GCM encryption), and geolocation analytics.",
        icon: BarChart3,
      },
      {
        title: "Native CRM & Multi-Tenant Workspaces",
        desc: "Lightweight CRM tracking Companies, Contacts, Tasks, and interaction histories. Multi-tenant workspace architecture with 5-tier RBAC (SUPER_ADMIN, OWNER, ADMIN, MANAGER, USER) and dedicated back-office portal.",
        icon: Building2,
      },
      {
        title: "Zoho Payments Automated Subscriptions & Billing",
        desc: "Seamless integration with Zoho Payments supporting subscription tiers, automated recurring mandates, HMAC-SHA256 webhook verification, and automated PDF invoice generation.",
        icon: CreditCard,
      },
    ],
    whiteLabel: [
      {
        title: "100% Brand Ownership",
        desc: "Deploy under your own agency brand, color palette, custom domain, and logo with zero vendor branding or licensing links.",
        icon: Palette,
      },
      {
        title: "Commercial Resale Rights",
        desc: "Launch your own cold outreach SaaS or offer dedicated cold email infrastructure as a premium agency service.",
        icon: Crown,
      },
      {
        title: "Self-Hosted Private VPS",
        desc: "Deploy on your private Linux VPS (Ubuntu 22.04/24.04 LTS) with full control over sending queues, IP reputation, and databases.",
        icon: Terminal,
      },
      {
        title: "Full Monorepo Source Code",
        desc: "Receive the complete unminified Next.js 16 frontend (email-outreach/) and Node.js background engine (backend/) with zero obfuscation.",
        icon: Code,
      },
      {
        title: "Zero Per-Seat or Per-Email SaaS Fees",
        desc: "Eliminate expensive per-seat cold email software subscriptions. Send unlimited campaigns across unlimited client workspaces.",
        icon: ShieldCheck,
      },
      {
        title: "Bring Your Own Gemini & Zoho Keys",
        desc: "Connect your own Google Gemini API keys for copy generation and Zoho Payments for customer billing with direct account payouts.",
        icon: Key,
      },
    ],
    sourceCodeOffer: {
      fixedPrice: 1999,
      originalPrice: 49999,
      discountPercentage: 96,
      licenseName: "Full Commercial & Resale White-Label License",
      deliveryMethod: "Instant Encrypted Download (5-Min Expiring Session)",
      deliverables: [
        "Complete PrimeInbox Next.js 16 (App Router) & React 19 Frontend Codebase (email-outreach/)",
        "High-Performance Node.js & TypeScript Background Scheduler Engine (backend/)",
        "Prisma 7 Multi-Tenant Schema with 30+ Relational Data Models",
        "Multi-Account SMTP Rotation Pool & Smart Timezone Dispatch Worker",
        "Dual WYSIWYG (TipTap v3) & HTML Code (CodeMirror 6) Email Editors",
        "Google Gemini AI Lead Extraction & Cold Copywriting Pipelines",
        "Zoho Payments Automated Subscriptions & Recurring Mandate Integration",
        "Complete 7-Step VPS Deployment Manual & Production PM2 ecosystem.config.js",
      ],
      featuresIncluded: [
        "Unlimited connected sending inboxes (Google Workspace, M365, SES, custom SMTP)",
        "Multi-step automated sequence builder with reply/bounce stop triggers",
        "Round-robin, weighted, and priority SMTP rotation algorithms",
        "Prospect timezone business-hours validation & weekend sending suppression",
        "AI lead parsing for CSV, Excel (.xlsx), Word (.docx), and PDF documents",
        "1x1 tracking pixel, URL rewrite click tracking, and RFC 8058 List-Unsubscribe",
        "App-level DKIM signing with 2048-bit RSA keys & AES-256-GCM encryption",
        "Multi-tenant workspace architecture with 5-tier RBAC and Super Admin portal",
      ],
      techStackDetailed: [
        {
          category: "Frontend & UI Stack",
          techs: ["Next.js 16.2.9 (App Router)", "React 19.2.4 & React DOM 19", "TypeScript 5", "Tailwind CSS v4", "Shadcn UI", "@base-ui/react", "TipTap v3 WYSIWYG", "CodeMirror 6 HTML", "Recharts v3", "Framer Motion v12", "Sonner"],
        },
        {
          category: "Background Engine & Workers",
          techs: ["Node.js 20+ LTS", "Nodemailer v9 (TLS/SSL & DKIM)", "Direct Timer-based Async Queue Dispatcher", "No Redis Dependency Required", "Automated Hourly/Daily Limit Resets", "PM2 Process Supervisor"],
        },
        {
          category: "Database & Models",
          techs: ["MariaDB 10.x+ / MySQL 8.x", "Prisma 7 ORM (@prisma/client, @prisma/adapter-mariadb)", "30+ Relational Models (Campaigns, SmtpAccounts, Leads, CRM, Invoices)"],
        },
        {
          category: "AI & Document Parsing",
          techs: ["Google Gemini API (gemini-2.5-flash, gemini-2.0-flash, gemini-2.5-pro)", "SheetJS (xlsx)", "mammoth (docx)", "pdf-parse & pdfkit", "react-dropzone"],
        },
        {
          category: "Security, Auth & Payments",
          techs: ["Stateless JWT (jose)", "bcryptjs", "AES-256-GCM Credential Encryption", "Zoho Payments API (recurring mandates & webhooks)", "Nginx HTTP/2 Reverse Proxy", "Let's Encrypt SSL"],
        },
      ],
    },
    interactiveCapabilities: [
      {
        title: "Multi-Account SMTP Rotation Pool",
        subtitle: "Sender Reputation Protection",
        description: "Connect unlimited Google Workspace, Microsoft 365, AWS SES, and custom SMTP accounts with Round-Robin, Weighted, or Priority rotation, randomized delay jitter (30–180s), and automatic quota resets.",
        metrics: "Zero Domain Burning",
        badge: "Deliverability Engine",
        previewNote: "Enforces hourly and daily limits per mailbox with automated health scoring.",
      },
      {
        title: "Smart Timezone & Business Hours Dispatch",
        subtitle: "Prospect Local Hours Scheduling",
        description: "Outbound emails are sent strictly within customizable prospect business hours (8:00 AM – 6:00 PM local timezone) with built-in weekend suppression to avoid off-hour and spam folder delivery.",
        metrics: "8 AM - 6 PM Strict Local Send",
        badge: "Smart Dispatcher",
        previewNote: "Ensures emails arrive when prospects are actively checking their inbox.",
      },
      {
        title: "Dual Editor & Gemini AI Copywriter",
        subtitle: "WYSIWYG TipTap & CodeMirror 6",
        description: "Switch seamlessly between rich visual WYSIWYG editing and raw HTML code editing with real-time variable tags. Uses Google Gemini AI to draft icebreakers, body copy, and spam-trigger prevention.",
        metrics: "3.4x Higher Reply Rates",
        badge: "AI Copywriter",
        previewNote: "Includes spam word scanning to guarantee pristine inbox placement.",
      },
      {
        title: "App-Level DKIM & Deliverability Telemetry",
        subtitle: "2048-Bit RSA Keys & Event Tracking",
        description: "Features 1x1 tracking pixel injection, URL rewrite proxy for click tracking, RFC 8058 List-Unsubscribe headers, and app-level DKIM signing using 2048-bit RSA keys with AES-256-GCM encrypted private storage.",
        metrics: "Sub-Second Event Stream",
        badge: "Telemetry & DKIM",
        previewNote: "Full geolocation, browser, device, and timeline breakdowns for opens and clicks.",
      },
    ],
    faqs: [
      {
        q: "How does Multi-Account SMTP Rotation protect domain reputation?",
        a: "Instead of sending thousands of emails through a single domain, PrimeInbox rotates outbound dispatches across multiple domains and mailboxes using Round-Robin, Weighted, or Priority algorithms. It enforces hourly/daily caps, randomized delay jitter (30–180 seconds), and automatic quota resets to keep sender reputation pristine.",
      },
      {
        q: "Does the background sending engine require an external Redis cluster?",
        a: "No! PrimeInbox features a direct timer-based queue dispatcher with non-blocking asynchronous event loops built into the Node.js backend. This eliminates the operational overhead and memory cost of managing an external Redis instance for standard outreach dispatch.",
      },
      {
        q: "How does PrimeInbox enforce prospect business hours and weekend suppression?",
        a: "The scheduler inspects the recipient's timezone and validates send windows before dispatching. If a prospect's local time falls outside configured business hours (e.g., 8:00 AM – 6:00 PM) or on weekends, the queue automatically schedules the message for the next valid business window.",
      },
      {
        q: "What document formats are supported for AI lead extraction?",
        a: "You can upload CSV, Excel (.xlsx via SheetJS), Word (.docx via mammoth), or PDF (via pdf-parse) files. The integrated Google Gemini AI automatically extracts names, email addresses, companies, and job titles from unstructured documents.",
      },
      {
        q: "Which payment gateways and subscription billing models are supported?",
        a: "PrimeInbox comes integrated with Zoho Payments, supporting customer tokens, auto-debit recurring mandates, HMAC-SHA256 signature verified webhooks, and automated PDF invoice generation.",
      },
    ],
    comprehensiveTechStack: [
      {
        category: "Frontend & UI Architecture",
        description: "Next.js 16 App Router, React 19, Tailwind CSS v4, dual email editors, and charts.",
        items: [
          { name: "Next.js 16.2.9 (App Router)", details: "User dashboard, landing pages, authentication, and REST APIs", url: "https://nextjs.org/" },
          { name: "React 19.2.4 & React DOM 19", details: "Modern component library, concurrent features, and hooks", url: "https://react.dev/" },
          { name: "TypeScript 5", details: "Strict static type safety across frontend and backend services", url: "https://www.typescriptlang.org/" },
          { name: "Tailwind CSS v4.0", details: "Utility-first CSS with @tailwindcss/postcss, tw-animate-css, clsx & tailwind-merge", url: "https://tailwindcss.com/" },
          { name: "Shadcn UI & @base-ui/react", details: "Accessible headless UI primitives and design components" },
          { name: "Lucide React Icons", details: "Crisp vector icons across campaign management and settings", url: "https://lucide.dev/" },
          { name: "TipTap v3 WYSIWYG Editor", details: "@tiptap/react & @tiptap/starter-kit visual email template builder" },
          { name: "CodeMirror 6 HTML Editor", details: "Raw HTML code editor with syntax highlighting (@codemirror/lang-html)" },
          { name: "Recharts v3", details: "Deliverability, open rate, and reply telemetry charts", url: "https://recharts.org/" },
          { name: "Zustand v5 & TanStack Query v5", details: "Global client state management and server state fetching" },
          { name: "React Hook Form v7 & Zod v4", details: "Form management and schema validation (@hookform/resolvers)", url: "https://zod.dev/" },
          { name: "Sonner", details: "Interactive toast notifications for campaign actions and errors" },
        ],
      },
      {
        category: "Background Engine & Workers",
        description: "Node.js scheduling loop, SMTP rotation pool, and email dispatch workers.",
        items: [
          { name: "Node.js (v20+ LTS)", details: "High-performance asynchronous server runtime", url: "https://nodejs.org/" },
          { name: "Nodemailer v9", details: "SMTP transport with TLS/SSL, DKIM signing, and connection pooling", url: "https://nodemailer.com/" },
          { name: "Direct Timer Queue Dispatcher", details: "Non-blocking async loops with zero external Redis dependency" },
          { name: "Queue Scanner Cron (Every 60s)", details: "Scans pending queue items and dispatches active campaign steps" },
          { name: "Hourly & Daily Reset Crons", details: "Automatically resets mailbox sending limits on the hour and midnight" },
          { name: "Subscription Renewal Cron", details: "Twice-daily check (8 AM / 8 PM) for customer subscription status" },
          { name: "PM2 Process Supervisor", details: "Cluster mode for frontend and singleton worker for backend", url: "https://pm2.keymetrics.io/" },
        ],
      },
      {
        category: "Database & Relational Models",
        description: "Relational database schema with 30+ models managed via Prisma 7.",
        items: [
          { name: "MariaDB 10.x+ / MySQL 8.x", details: "High-performance ACID relational database engine", url: "https://mariadb.org/" },
          { name: "Prisma 7 ORM", details: "Type-safe database client and automated migrations", url: "https://www.prisma.io/" },
          { name: "@prisma/adapter-mariadb", details: "High-throughput native MariaDB driver adapter" },
          { name: "30+ Relational Models", details: "Company, User, Campaign, CampaignStep, CampaignQueue, SmtpAccount, Lead, CrmContact, Subscription, Invoice" },
        ],
      },
      {
        category: "AI & Document Ingestion",
        description: "Google Gemini AI generation and multi-format document parser pipelines.",
        items: [
          { name: "Google Gemini API", details: "Cold email copy drafting, tone adjustments, and subject line generation", url: "https://ai.google.dev/" },
          { name: "Gemini 2.5 Flash & 2.5 Pro", details: "High-speed reasoning and unstructured lead data extraction" },
          { name: "SheetJS (xlsx)", details: "High-speed Excel (.xlsx) and CSV lead ingestion" },
          { name: "mammoth & docx", details: "Word document (.docx) parsing and extraction" },
          { name: "pdf-parse, pdf-lib & pdfkit", details: "PDF document text extraction and automated invoice generation" },
          { name: "react-dropzone", details: "Drag-and-drop file upload interface for lead lists" },
        ],
      },
      {
        category: "Security, Cryptography & Auth",
        description: "Stateless JWT, credential encryption, and app-level DKIM signing.",
        items: [
          { name: "Stateless JWT via jose", details: "Secure HttpOnly, SameSite cookie authentication" },
          { name: "bcryptjs", details: "Salt-and-hash user and admin password protection" },
          { name: "AES-256-GCM Encryption", details: "Node.js crypto encryption for SMTP passwords, API keys, and DKIM private keys" },
          { name: "App-Level DKIM Signing", details: "2048-bit RSA key generation and on-the-fly header signing" },
          { name: "Super Admin Isolation", details: "Dedicated ADMIN_JWT_SECRET separating platform admins from tenant users" },
        ],
      },
      {
        category: "Payments & Web Infrastructure",
        description: "Zoho Payments, Nginx reverse proxy, and Let's Encrypt SSL.",
        items: [
          { name: "Zoho Payments API", details: "Customer tokens, auto-debit recurring mandates, and HMAC webhooks", url: "https://www.zoho.com/payments/" },
          { name: "Nginx Reverse Proxy", details: "Port forwarding (3000), static file serving (/uploads/), HTTP/2, SSL termination", url: "https://nginx.org/" },
          { name: "Let's Encrypt (Certbot)", details: "Automated HTTPS certificates with auto-renewal cron", url: "https://certbot.eff.org/" },
        ],
      },
    ],
    vpsDeploymentGuide: {
      overview: {
        os: "Ubuntu 22.04 / 24.04 LTS",
        processManager: "PM2 (Frontend Port 3000 + Backend Worker)",
        reverseProxy: "Nginx (SSL via Let's Encrypt Certbot)",
        database: "MariaDB 10.x+ / MySQL 8.x",
        storagePath: "/var/www/storage",
        appPath: "/var/www/PrimeInbox",
      },
      steps: [
        {
          stepNumber: 1,
          title: "Server Preparation & Dependencies",
          description: "Connect to your VPS via SSH, update system packages, and install Node.js 20 LTS, build tools, Nginx, Certbot, and MariaDB.",
          command: `ssh root@your-server-ip
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget build-essential libssl-dev git nginx certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
sudo apt install -y mariadb-server
sudo mysql_secure_installation
sudo mariadb -u root -p`,
          codeSnippet: {
            language: "sql",
            filename: "MariaDB / MySQL Shell Commands",
            code: `CREATE DATABASE primeinbox CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'primeuser'@'localhost' IDENTIFIED BY 'StrongPasswordHere123!';
GRANT ALL PRIVILEGES ON primeinbox.* TO 'primeuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;`,
          },
        },
        {
          stepNumber: 2,
          title: "Clone / Transfer Project Files",
          description: "Create /var/www/PrimeInbox and /var/www/storage directories, set permissions, and clone your repository.",
          command: `sudo mkdir -p /var/www/PrimeInbox
sudo chown -R $USER:$USER /var/www/PrimeInbox
cd /var/www/PrimeInbox
git clone <YOUR_REPOSITORY_URL> .
sudo mkdir -p /var/www/storage
sudo chown -R $USER:$USER /var/www/storage
sudo chmod -R 755 /var/www/storage`,
        },
        {
          stepNumber: 3,
          title: "Configure Environment Variables",
          description: "Create and edit both email-outreach/.env and backend/.env with production credentials.",
          command: `cp email-outreach/.env.example email-outreach/.env
nano email-outreach/.env
cp backend/.env.example backend/.env
nano backend/.env`,
          codeSnippet: {
            language: "bash",
            filename: "/var/www/PrimeInbox/email-outreach/.env",
            code: `# Database (MySQL / MariaDB)
DATABASE_URL="mysql://primeuser:StrongPasswordHere123!@localhost:3306/primeinbox"

# Security Keys (Generate 32+ character random strings)
JWT_SECRET="generate-32-char-random-secret-for-user-jwt"
ADMIN_JWT_SECRET="generate-different-32-char-secret-for-admin"
SESSION_SECRET="generate-another-32-char-secret-for-session"
ENCRYPTION_KEY="64-char-hex-key-e-g-0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"

# Application Domains
APP_URL="https://yourdomain.com"
EMAIL_PUBLIC_URL="https://yourdomain.com"
COOKIE_DOMAIN="yourdomain.com"
NODE_ENV="production"

# Media Storage
MEDIA_DRIVER="local"
MEDIA_UPLOAD_PATH="/var/www/storage"
MEDIA_PUBLIC_URL="https://yourdomain.com/uploads"

# Transactional Mailer (OTP, Verification)
SMTP_HOST="smtp.yourprovider.com"
SMTP_PORT="587"
SMTP_USER="notifications@yourdomain.com"
SMTP_PASS="your-smtp-password"
SMTP_FROM="PrimeInbox"

# Google Gemini AI (Optional, for AI Generation & Lead Extraction)
GEMINI_API_KEY="your-gemini-api-key"

# Zoho Payments (If using subscription billing)
ZOHO_ACCOUNT_ID="your-zoho-account-id"
ZOHO_API_KEY="your-zoho-api-key"
ZOHO_SIGNING_KEY="your-zoho-signing-key"
ZOHO_CLIENT_ID="your-zoho-client-id"
ZOHO_CLIENT_SECRET="your-zoho-client-secret"
ZOHO_REFRESH_TOKEN="your-zoho-refresh-token"`,
          },
          note: "Ensure DATABASE_URL, JWT_SECRET, and ENCRYPTION_KEY in backend/.env match exactly with email-outreach/.env values.",
        },
        {
          stepNumber: 4,
          title: "Install Dependencies & Setup Database",
          description: "Install dependencies across monorepo packages, generate Prisma Client, and push schema models to the database.",
          command: `cd /var/www/PrimeInbox
npm run install:all
npm run prisma:generate
npm run prisma:push`,
        },
        {
          stepNumber: 5,
          title: "Build Frontend & Backend",
          description: "Compile the Next.js frontend and TypeScript backend worker for production.",
          command: `npm run build:all`,
          note: "Alternatively, you can run the automated build script: bash setup.sh",
        },
        {
          stepNumber: 6,
          title: "Start Services with PM2",
          description: "Launch both the frontend server (port 3000) and background engine using ecosystem.config.js and enable startup persistence.",
          command: `pm2 start ecosystem.config.js
pm2 startup
pm2 save
pm2 status`,
          note: "You should see primeinbox-frontend (Status: online, Port: 3000) and primeinbox-backend (Status: online).",
        },
        {
          stepNumber: 7,
          title: "Configure Nginx & SSL Certificate",
          description: "Configure Nginx with local file uploads location (/uploads/ -> /var/www/storage/) and reverse proxy to port 3000, then obtain SSL certificate with Certbot.",
          command: `sudo nano /etc/nginx/sites-available/primeinbox
sudo ln -sf /etc/nginx/sites-available/primeinbox /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com`,
          codeSnippet: {
            language: "nginx",
            filename: "/etc/nginx/sites-available/primeinbox",
            code: `server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    client_max_body_size 50M;

    # Local file uploads
    location /uploads/ {
        alias /var/www/storage/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Reverse proxy to Next.js Frontend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
    }
}`,
          },
        },
      ],
    },
    vpsRedeploymentGuide: {
      manualSteps: [
        { step: "1. Connect to VPS", command: "ssh root@your-server-ip && cd /var/www/PrimeInbox" },
        { step: "2. Pull latest git code", command: "git pull origin main" },
        { step: "3. Update packages", command: "npm run install:all" },
        { step: "4. Sync Prisma schema", command: "npm run prisma:generate && npm run prisma:push" },
        { step: "5. Rebuild frontend & backend", command: "cd email-outreach && rm -rf .next && npm run build && cd .. && cd backend && npm run build && cd .." },
        { step: "6. Restart PM2 processes", command: "pm2 restart ecosystem.config.js && pm2 save" },
        { step: "7. Verify status & logs", command: "pm2 status && pm2 logs --lines 30" },
      ],
      deployScriptFilename: "deploy.sh",
      deployScript: `#!/usr/bin/env bash
set -e
PROJECT_DIR="/var/www/PrimeInbox"

echo "==========================================="
echo "  🚀 Starting PrimeInbox Fast Redeployment"
echo "==========================================="
cd "$PROJECT_DIR"

echo "📥 [1/5] Pulling latest code changes..."
git pull origin main

echo "📦 [2/5] Updating dependencies..."
npm run install:all

echo "🗄️  [3/5] Syncing database schema..."
npm run prisma:generate
npm run prisma:push

echo "🏗️  [4/5] Compiling frontend & backend..."
cd email-outreach && rm -rf .next && npm run build && cd ..
cd backend && npm run build && cd ..

echo "🔄 [5/5] Reloading PM2 services..."
pm2 restart ecosystem.config.js
pm2 save

echo "==========================================="
echo "  🎉 PrimeInbox redeployment completed!"
echo "==========================================="
pm2 status`,
      rollbackPlan: [
        { step: "Check PM2 Status", command: "pm2 status", explanation: "Verify if both frontend and backend worker are online." },
        { step: "View Real-Time Frontend Logs", command: "pm2 logs primeinbox-frontend", explanation: "Inspect live Next.js request traffic and runtime errors." },
        { step: "View Real-Time Backend Worker Logs", command: "pm2 logs primeinbox-backend", explanation: "Inspect email dispatch queue, SMTP rotation events, and cron logs." },
        { step: "Restart Only Frontend", command: "pm2 reload primeinbox-frontend", explanation: "Perform zero-downtime reload of the web dashboard." },
        { step: "Restart Only Backend Worker", command: "pm2 restart primeinbox-backend", explanation: "Restart the queue scanning scheduler and Nodemailer transport pool." },
        { step: "Test Nginx Configuration", command: "sudo nginx -t && sudo systemctl reload nginx", explanation: "Validate Nginx reverse proxy syntax and apply changes." },
        { step: "Test Database Connection", command: "mariadb -u primeuser -p -e 'SHOW DATABASES;'", explanation: "Verify MySQL / MariaDB socket connectivity and credentials." },
      ],
    },
  },

  greviewpilot: {
    id: "greviewpilot",
    name: "GReviewPilot",
    tagline: "Autonomous Google Review & Local Reputation Autopilot",
    url: "https://greviewpilot.in/",
    demoCredentials: {
      username: "demogreviewpilot@gmail.com",
      password: "Demo@2026",
      note: "Pre-loaded with verified Google business profiles and sample reviews.",
    },
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
      fixedPrice: 1999,
      originalPrice: 39999,
      discountPercentage: 95,
      licenseName: "Full Commercial Source Code License",
      deliveryMethod: "Instant GitHub Repo Access & ZIP Archive",
      deliverables: [
        "Complete React 19 Frontend Web App Source Code",
        "Node.js Backend with Google My Business API integration",
        "PostgreSQL Schemas & Database Migration Scripts",
        "Negative Review Interception Funnel Logic",
        "AI Review Response Generation Engine (Gemini / OpenAI)",
        "Printable QR Stand & Review Widget Generators",
        "Full Multi-Tenant Custom Setup Documentation",
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
    tagline: "All-in-One Multi-Tenant AI Booking Platform & Operations CRM",
    url: "https://bookmytime.in/",
    demoCredentials: {
      username: "demobookmytime@gmail.com",
      password: "Demo@2026",
      note: "Pre-loaded with multi-tenant booking portals, WhatsApp service, and industry vertical dashboards.",
    },
    localImg: "/assets/work/website-preview/bookmytime.png",
    badge: "Multi-Tenant CRM & Booking",
    categoryName: "Scheduling & Operations CRM",
    categoryGroup: "Operations & Growth",
    heroDesc: "All-in-One Multi-Tenant AI Booking Platform, Appointment Scheduling System, and Operations CRM tailored for businesses and healthcare providers across India and international markets. Eliminates scheduling overhead and manual follow-ups in under 5 minutes.",
    detailedDesc: "BookMyTime (HealthSync AI) is an All-in-One Multi-Tenant AI Booking Platform, Appointment Scheduling System, and Operations CRM tailored for businesses and healthcare providers across India and international markets. It solves scheduling overhead, missed appointments, manual customer follow-ups, and fragmented operational tools by providing every business with an automated, customized booking ecosystem in under five minutes.",
    architectureDiagram: `┌────────────────────────────────────────────────────────────────────────┐
│                        BookMyTime Ecosystem                            │
├───────────────────┬───────────────────────────────┬────────────────────┤
│   Public Portals  │      Industry Dashboards      │  Core Services     │
│   • /book/:tenant │   • Medical / Clinics (OPD)   │  • WhatsApp Engine │
│   • /consult/:tok │   • Gyms & Fitness Centers    │  • WebRTC Video    │
│   • Dynamic Slots │   • Salons, Spas & Beauty     │  • Cashfree Auto   │
│   • Instant Lock  │   • Education & Coaching      │  • Gemini AI Flow  │
│   • Payment & OTP │   • CA / Legal / Consulting   │  • PDF / Excel Doc │
│                   │   • Restaurants (Tables/Menu) │  • Coturn TURN/ICE │
└───────────────────┴───────────────────────────────┴────────────────────┘`,
    architectureDescription: "End-to-end multi-tenant ecosystem featuring dedicated public booking portals, 6 industry-tailored management suites, background WhatsApp microservice automation, WebRTC encrypted teleconsultations, and Cashfree automated billing.",
    techStack: [
      "React 19.2",
      "TanStack Start",
      "TanStack Router",
      "Nitro Engine",
      "TypeScript 5.8",
      "MySQL / MariaDB",
      "Prisma ORM 7.8",
      "WhatsApp Web.js",
      "WebRTC + Coturn",
      "Cashfree API",
      "Gemini AI",
      "Tailwind CSS 4",
    ],
    stats: [
      { label: "Deployment Time", value: "< 5 min" },
      { label: "Industry Portals", value: "6 Tiers" },
      { label: "WhatsApp Alerts", value: "Real-Time" },
      { label: "Telehealth HD Video", value: "Encrypted" },
    ],
    interactiveCapabilities: [
      {
        title: "Multi-Tenant Custom Booking Portals",
        subtitle: "Dedicated Branded Client Portals",
        description: "Each business receives its own branded booking page (/book/:tenantId) with dynamic time-slot calculation, service selection, staff/specialist assignment, and real-time slot locking to eliminate double bookings.",
        metrics: "Zero Double-Bookings",
        badge: "Public Portals",
        previewNote: "Instant WhatsApp and email confirmation slips generated automatically.",
      },
      {
        title: "Dedicated Industry Dashboards",
        subtitle: "6 Tailored Vertical Management Suites",
        description: "Tailored operational suites for Medical & Healthcare (OPD/IPD queues & e-prescriptions), Gyms (memberships & biometric attendance), Salons (stylist carts & chair buffers), Coaching (batch scheduling), Consulting (billable hours), and Restaurants (tables & menus).",
        metrics: "6 Industry Hubs",
        badge: "Industry Suites",
        previewNote: "Includes global super admin dashboard (admin.dashboard.tsx) for tenant management.",
      },
      {
        title: "Multi-Tenant WhatsApp Microservice",
        subtitle: "Automated Multi-Client Alerts",
        description: "Built-in multi-client WhatsApp Web automation (wa-server.cjs) using Puppeteer and LocalAuth. Businesses pair their WhatsApp number via dashboard QR code for automated alerts at 24h, day-of, 2h, and 1h intervals.",
        metrics: "4-Stage Reminders",
        badge: "wa-server.cjs",
        previewNote: "Runs as an autonomous Node/Chromium microservice with auto-recovery.",
      },
      {
        title: "Peer-to-Peer Teleconsultation",
        subtitle: "Encrypted WebRTC + Coturn TURN",
        description: "Direct encrypted browser-to-browser HD audio/video consultations (/consult/:token) for telemedicine and remote consultations with Coturn STUN/TURN fallback and ephemeral HMAC-SHA1 tokens.",
        metrics: "HD Audio & Video",
        badge: "WebRTC + Coturn",
        previewNote: "Bypasses strict corporate/mobile firewalls and symmetric NATs.",
      },
    ],
    features: [
      {
        title: "Multi-Tenant Custom Booking Portals",
        desc: "Dedicated branded portals (/book/:tenantId) with dynamic time-slot calculation, service selection, staff assignment, and real-time slot locking.",
        icon: Globe,
      },
      {
        title: "Medical & Healthcare Operations",
        desc: "OPD/IPD queues, digital prescriptions, patient history, vital tracking, doctor shifts, and diagnostic records (medical.tsx).",
        icon: HeartPulse,
      },
      {
        title: "Gyms & Fitness Centers Management",
        desc: "Membership subscriptions, biometric attendance tracking, personal trainer booking, locker allocations, and renewal alerts (gym.tsx).",
        icon: TrendingUp,
      },
      {
        title: "Beauty Salons & Spas Suite",
        desc: "Multi-service appointment carts, stylist assignment, chair/booth availability, duration buffers, and loyalty programs (beauty.tsx).",
        icon: Sparkles,
      },
      {
        title: "Education & Coaching Platform",
        desc: "Batch scheduling, student enrollment, faculty allocations, 1-on-1 doubt sessions, and automated fee receipts (education.tsx).",
        icon: BookOpen,
      },
      {
        title: "Professional & Consulting Hub",
        desc: "Legal/CA consultation slots, billable hour tracking, client files, and retainer plans (professional.tsx).",
        icon: Briefcase,
      },
      {
        title: "Restaurant & Hospitality Booking",
        desc: "Dining areas, table layout management, holiday schedules, digital menus (categories & items), and live reservation queues (restaurant.tsx).",
        icon: Building2,
      },
      {
        title: "Super Admin Operations Dashboard",
        desc: "Global tenant management, business verification, subscription status, Cashfree transaction audits, and system analytics (admin.dashboard.tsx).",
        icon: Gauge,
      },
      {
        title: "Multi-Tenant WhatsApp Microservice",
        desc: "Built-in Puppeteer LocalAuth engine (wa-server.cjs). Businesses pair via dashboard QR code for automated 24h, day-of, 2h, and 1h reminders and auto-replies.",
        icon: MessageCircle,
      },
      {
        title: "Peer-to-Peer Teleconsultation",
        desc: "Direct encrypted browser-to-browser HD audio/video consultations (/consult/:token) with self-hosted Coturn STUN/TURN fallback.",
        icon: Video,
      },
      {
        title: "Google Gemini AI & Automation",
        desc: "Integrated with Google Gemini AI and OpenRouter for automated response drafting, clinical assistance, and intelligent schedule optimization.",
        icon: Bot,
      },
      {
        title: "Cashfree Automated Billing Engine",
        desc: "Tiered subscriptions (Free, Growth, Pro, Enterprise), automated checkout, webhook synchronization (/api/cashfree/webhook), and recurring renewals.",
        icon: CreditCard,
      },
      {
        title: "Vector PDF & Excel Data Exports",
        desc: "Dynamic vector PDF generation for invoices, receipts, and clinical prescriptions via jspdf and jspdf-autotable, with xlsx spreadsheet exports.",
        icon: FileText,
      },
    ],
    whiteLabel: [
      {
        title: "100% Brand Ownership & White-Label",
        desc: "Host on booking.yourcompany.com with your custom colors, typography, logos, and zero third-party platform attributions.",
        icon: Palette,
      },
      {
        title: "Multi-Tenant Client Workspaces",
        desc: "Create independent booking pages and dashboards for unlimited doctors, gyms, salons, institutes, and restaurants.",
        icon: Building2,
      },
      {
        title: "Full Unminified Full-Stack Source Code",
        desc: "Receive complete React 19, TanStack Start, Nitro server, and Prisma ORM source code with full modification and extension rights.",
        icon: Code,
      },
      {
        title: "Self-Hosted Private VPS Architecture",
        desc: "Deploy securely on your own VPS (Ubuntu 22.04/24.04 with PM2, Nginx, and Certbot SSL) with 100% data sovereignty.",
        icon: Terminal,
      },
      {
        title: "Bring Your Own AI & WhatsApp",
        desc: "Connect your own WhatsApp numbers, Google Gemini / OpenRouter API keys, and Cashfree credentials with zero platform markups.",
        icon: Key,
      },
      {
        title: "Commercial Resale & Agency License",
        desc: "License and deploy the software to unlimited business clients or charge monthly SaaS retainers with zero royalties back to us.",
        icon: Crown,
      },
    ],
    sourceCodeOffer: {
      fixedPrice: 1999,
      originalPrice: 49999,
      discountPercentage: 96,
      licenseName: "Full Commercial Source Code License",
      deliveryMethod: "Instant Encrypted Download (5-Min Expiring Session)",
      legalDisclaimer: "Important: You must rebrand and change the original product name, brand identity, and logos before deploying to production. Deploying or operating under the original product name without modification may result in copyright or trademark infringement.",
      deliverables: [
        "Complete React 19.2 + TanStack Start + Nitro SSR Full-Stack Web Application Codebase",
        "Multi-Tenant MySQL/MariaDB Database Schemas & Prisma ORM 7.8 Migrations",
        "Multi-Tenant WhatsApp Microservice Engine (wa-server.cjs) with Puppeteer & LocalAuth",
        "Peer-to-Peer WebRTC Video Teleconsultation Engine with Coturn TURN Config (/consult/:token)",
        "6 Dedicated Industry-Specific Dashboards (Medical, Gym, Salon, Coaching, Consulting, Restaurant)",
        "Global Super Admin Operations Dashboard (admin.dashboard.tsx)",
        "Google Gemini AI & OpenRouter Natural Language Scheduling & Clinical Assistant",
        "Cashfree Payment Gateway Integration (Tiered Subscriptions & Webhook Synchronization)",
        "jsPDF Vector Prescriptions/Invoices & xlsx SheetJS Tabular Spreadsheet Exporters",
        "Complete Step-by-Step Production Deployment Guide Included in Download (Ubuntu 22.04/24.04 VPS + PM2 + Nginx + Certbot SSL)",
        "Automated 1-Command Zero-Downtime Redeployment Script (deploy.sh) Included in Download",
        "Complete Production .env Checklist & Security Blueprint Included in Download",
        "Full Commercial White-Label License (Deploy to Unlimited Businesses with Zero Royalties)",
      ],
      featuresIncluded: [
        "All-in-One Multi-Tenant AI Booking Platform & Operations CRM",
        "6 Dedicated industry dashboards with tailored workflows",
        "WhatsApp microservice engine with automated reminder schedules",
        "WebRTC encrypted video teleconsultations with Coturn TURN fallback",
        "Cashfree automated billing & tiered subscription management",
        "Full production deployment guide & automated deploy.sh script provided in download",
        "Zero subscription fees or recurring royalties forever",
      ],
      techStackDetailed: [
        { category: "Core Framework", techs: ["React 19.2", "TanStack Start 1.167", "TanStack Router 1.168", "Nitro Engine 3.0", "Vite 8.0", "TypeScript 5.8", "Node.js 20 LTS"] },
        { category: "Database & ORM", techs: ["MySQL 8.0+", "MariaDB 10.11+", "Prisma ORM 7.8", "@prisma/client", "@prisma/adapter-mariadb", "mariadb driver"] },
        { category: "UI & Primitives", techs: ["Tailwind CSS 4.2", "Radix UI Suite", "Motion (Framer) 12.40", "Lucide React", "Recharts 2.15", "Sonner", "Embla Carousel", "Vaul"] },
        { category: "State & Forms", techs: ["TanStack Query 5.83", "React Hook Form 7.71", "Zod 3.24", "@hookform/resolvers"] },
        { category: "Microservices & Video", techs: ["whatsapp-web.js 1.34", "qrcode", "WebRTC + Coturn TURN", "Twilio SMS", "Nodemailer 9.0"] },
        { category: "Payments & AI", techs: ["Cashfree Payments API", "Google Gemini AI", "OpenRouter", "Cloudinary", "jsPDF", "xlsx (SheetJS)"] },
      ],
    },
    faqs: [
      {
        q: "What is included with the BookMyTime source code download?",
        a: "You receive the complete, unminified React 19 + TanStack Start full-stack codebase, Nitro server runtime, Prisma ORM 7.8 database schemas with MySQL/MariaDB migrations, multi-tenant WhatsApp microservice engine (wa-server.cjs), WebRTC video teleconsultation modules, 6 dedicated industry dashboards, Cashfree payment integrations, plus the full step-by-step VPS deployment guide and automated zero-downtime redeployment script (deploy.sh) in the download package.",
      },
      {
        q: "Does the download include server deployment and redeployment guides?",
        a: "Yes! The download package includes comprehensive, step-by-step deployment instructions for clean Ubuntu 22.04 / 24.04 LTS VPS (Hostinger, AWS, DigitalOcean, Hetzner, etc.) with PM2, Nginx, MariaDB/MySQL, and Certbot SSL, along with an automated deploy.sh shell script for 1-command zero-downtime updates.",
      },
      {
        q: "Can I rebrand BookMyTime and sell it to clinics, gyms, salons, and restaurants?",
        a: "Yes, 100%! You receive a full commercial source code license. You can rebrand the platform under your agency or company name, configure your domain, and sell it or charge monthly SaaS retainers to unlimited business clients with zero royalties back to us.",
      },
      {
        q: "How does the multi-tenant WhatsApp microservice engine work?",
        a: "BookMyTime includes an independent WhatsApp Web automation microservice (wa-server.cjs) powered by Puppeteer and LocalAuth. Each onboarded business can pair their own WhatsApp number directly from their dashboard via QR code to automatically send appointment confirmations and multi-stage reminders (24h, day-of, 2h, and 1h prior).",
      },
      {
        q: "How does the peer-to-peer WebRTC video calling work?",
        a: "The system provides direct encrypted browser-to-browser HD audio/video consultations (/consult/:token) for telemedicine and remote consultations. It includes a complete self-hosted Coturn STUN/TURN server configuration with ephemeral HMAC-SHA1 tokens to guarantee rock-solid connectivity across corporate firewalls and mobile NATs.",
      },
      {
        q: "Which payment gateways and subscriptions are supported?",
        a: "Native Cashfree Payment Gateway integration supporting tiered subscription plans (Free, Growth, Pro, Enterprise), automated checkout, webhook synchronization (/api/cashfree/webhook), recurring renewals, and subscription grace-period management.",
      },
    ],
    comprehensiveTechStack: [
      {
        category: "Core Architecture & Runtime",
        description: "Modern React 19 UI component foundation, full-stack SSR streaming, and high-performance server runtime.",
        items: [
          { name: "React ^19.2.0", details: "Modern React 19 UI component foundation", url: "https://react.dev/" },
          { name: "TanStack Start ^1.167.50", details: "Full-stack SSR framework with server functions (createServerFn) & streaming", url: "https://tanstack.com/start" },
          { name: "TanStack Router ^1.168.25", details: "Type-safe, file-based routing architecture with client/server loader hooks", url: "https://tanstack.com/router" },
          { name: "Nitro Engine 3.0.260603-beta", details: "High-performance server engine (node-server) producing standalone .output/ bundles", url: "https://nitro.unjs.io/" },
          { name: "Vite ^8.0.16", details: "Next-generation bundler with @vitejs/plugin-react & vite-tsconfig-paths", url: "https://vitejs.dev/" },
          { name: "TypeScript ^5.8.3", details: "Strict end-to-end type safety across client routes, server functions, and database models", url: "https://www.typescriptlang.org/" },
          { name: "Node.js >= 20 LTS", details: "Server-side JavaScript runtime environment", url: "https://nodejs.org/" },
        ],
      },
      {
        category: "Database & Data Modeling",
        description: "Primary relational database hosting multi-tenant accounts, appointments, and sessions.",
        items: [
          { name: "MySQL / MariaDB 8.0+ / 10.11+", details: "Primary relational database hosting multi-tenant accounts, appointments & sessions", url: "https://mariadb.org/" },
          { name: "Prisma ORM ^7.8.0", details: "Type-safe database queries, schema definitions, migrations, and CLI utilities", url: "https://www.prisma.io/" },
          { name: "@prisma/client ^7.8.0", details: "Generated type-safe client for server-side repositories", url: "https://www.prisma.io/" },
          { name: "@prisma/adapter-mariadb ^7.8.0", details: "High-performance direct connection pool adapter for MariaDB/MySQL", url: "https://www.prisma.io/" },
          { name: "mariadb ^3.5.3", details: "Dedicated connection pooling driver for the WhatsApp background microservice" },
          { name: "@tidbcloud/serverless ^0.3.0", details: "Serverless MySQL adapter compatibility", url: "https://www.pingcap.com/" },
        ],
      },
      {
        category: "UI System, Styling & Components",
        description: "Utility-first CSS styling engine, accessible headless primitives, and interactive UI micro-interactions.",
        items: [
          { name: "Tailwind CSS ^4.2.1", details: "Modern utility-first CSS engine via @tailwindcss/vite", url: "https://tailwindcss.com/" },
          { name: "Radix UI Primitives (1.x - 2.x)", details: "Headless primitives: Dialog, Dropdown, Popover, Select, Tabs, Tooltip, Switch, etc.", url: "https://www.radix-ui.com/" },
          { name: "Motion (Framer) ^12.40.0", details: "Fluid animations, page transitions, and interactive UI micro-interactions", url: "https://motion.dev/" },
          { name: "Lucide React ^0.575.0", details: "Comprehensive iconography library", url: "https://lucide.dev/" },
          { name: "Recharts ^2.15.4", details: "Responsive data charts for analytics, revenue, and queue metrics", url: "https://recharts.org/" },
          { name: "Sonner ^2.0.7", details: "Modern notification toast manager", url: "https://sonner.emilkowal.ski/" },
          { name: "Embla Carousel ^8.6.0", details: "Touch-enabled carousels and showcase sliders", url: "https://www.embla-carousel.com/" },
          { name: "Vaul ^1.1.2", details: "Mobile-friendly drawer and sheet dialogs", url: "https://vaul.emilkowal.ski/" },
          { name: "React Resizable Panels ^4.6.5", details: "Drag-to-resize split panes for dashboards" },
          { name: "React Day Picker ^9.14.0", details: "Interactive calendar date-time picker" },
          { name: "Input OTP ^1.4.2", details: "Accessible one-time password input boxes" },
          { name: "CMDK ^1.1.1", details: "Fast command-palette dropdowns and searches" },
        ],
      },
      {
        category: "Forms, State & Validation",
        description: "Server-state caching, optimistic mutations, and strict schema validation.",
        items: [
          { name: "TanStack Query ^5.83.0", details: "Server-state caching, background revalidation, and optimistic mutations", url: "https://tanstack.com/query" },
          { name: "React Hook Form ^7.71.2", details: "High-performance form state management", url: "https://react-hook-form.com/" },
          { name: "Zod ^3.24.2", details: "Schema validation for forms, APIs, and environment variables", url: "https://zod.dev/" },
          { name: "@hookform/resolvers ^5.2.2", details: "Standard glue linking React Hook Form with Zod schemas" },
        ],
      },
      {
        category: "Microservices & Real-Time Communications",
        description: "Autonomous WhatsApp Web Puppeteer microservice and peer-to-peer WebRTC video streaming.",
        items: [
          { name: "whatsapp-web.js ^1.34.7", details: "Headless Chromium automation for multi-tenant WhatsApp communication", url: "https://wwebjs.dev/" },
          { name: "qrcode ^1.5.4", details: "Canvas/SVG QR code generation for WhatsApp linking" },
          { name: "WebRTC + Coturn Native", details: "Direct peer-to-peer audio/video streaming with self-hosted TURN fallback" },
          { name: "Twilio REST API", details: "SMS verification and notifications fallback", url: "https://www.twilio.com/" },
          { name: "Nodemailer ^9.0.1", details: "SMTP email transport for OTPs, invoices, and password resets", url: "https://nodemailer.com/" },
        ],
      },
      {
        category: "Payment Processing & External Integrations",
        description: "Indian subscription billing, AI intelligence assistants, cloud media storage, and document exports.",
        items: [
          { name: "Cashfree Payments API", details: "Indian subscription billing, auto-debit, dynamic UPI, Cards, and Net Banking", url: "https://www.cashfree.com/" },
          { name: "Google Gemini AI & OpenRouter", details: "Natural language processing, medical note processing, and AI assistants", url: "https://ai.google.dev/" },
          { name: "Cloudinary", details: "Cloud storage for logos, prescription images, documents, and profile pictures", url: "https://cloudinary.com/" },
          { name: "Google Sheets Webhook", details: "Automated spreadsheet sync via Google Apps Script" },
          { name: "jspdf & jspdf-autotable", details: "Client/server PDF generation for invoices and prescriptions" },
          { name: "xlsx (SheetJS)", details: "Excel and CSV tabular data export" },
        ],
      },
    ],
    vpsDeploymentGuide: {
      overview: {
        os: "Ubuntu 22.04 / 24.04 LTS",
        processManager: "PM2",
        reverseProxy: "Nginx (with SSL via Let's Encrypt Certbot)",
        database: "MySQL 8.0+ / MariaDB 10.11+",
        storagePath: "/var/www/storage/bookmytime",
        appPath: "/var/www/MediFlowAi",
      },
      steps: [
        {
          stepNumber: 1,
          title: "Server Preparation & Package Updates",
          description: "Log in to your VPS terminal as root, update existing packages, and install essential utilities including Nginx, Certbot, and UFW.",
          command: `ssh root@YOUR_SERVER_IP
apt update && apt upgrade -y
apt install -y curl wget git build-essential nginx certbot python3-certbot-nginx ufw`,
        },
        {
          stepNumber: 2,
          title: "Install Node.js 20 LTS & PM2",
          description: "Install Node.js 20 via the official NodeSource repository and install PM2 process manager globally.",
          command: `curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v   # Should be v20.x
npm -v    # Should be 10.x
npm install -g pm2`,
        },
        {
          stepNumber: 3,
          title: "Install Chromium Dependencies for WhatsApp Engine",
          description: "Because whatsapp-web.js runs headless Chrome via Puppeteer, install all required Linux rendering libraries.",
          command: `apt install -y \\
  libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 \\
  libfontconfig1 libgcc1 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \\
  libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \\
  libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 \\
  libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libnss3 lsb-release \\
  xdg-utils libgbm1`,
        },
        {
          stepNumber: 4,
          title: "Clone the Project Code",
          description: "Create the web root directory and clone your repository into /var/www/MediFlowAi.",
          command: `mkdir -p /var/www
cd /var/www
git clone <YOUR_REPOSITORY> /var/www/MediFlowAi
cd /var/www/MediFlowAi`,
        },
        {
          stepNumber: 5,
          title: "Configure Environment Variables",
          description: "Create the production .env configuration file inside /var/www/MediFlowAi.",
          command: `nano /var/www/MediFlowAi/.env`,
          codeSnippet: {
            language: "ini",
            filename: "/var/www/MediFlowAi/.env",
            code: `# DATABASE CONFIGURATION
DATABASE_URL="mysql://DB_USER:DB_PASSWORD@127.0.0.1:3306/bookmytime"
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_USER="your_db_user"
DB_PASSWORD="your_secure_password"
DB_NAME="bookmytime"

# AUTHENTICATION & SECRETS
NEXTAUTH_URL="https://yourdomain.com/"
NEXTAUTH_SECRET="generate_a_random_64_char_hex_string"
JWT_SECRET="generate_a_random_jwt_secret"
SESSION_SECRET="generate_a_random_session_secret"

# EMAIL CONFIGURATION (SMTP)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USERNAME="your-email@gmail.com"
EMAIL_PASSWORD="your-google-app-password"
EMAIL_BCC="admin-monitoring@gmail.com"

# CLOUDINARY CONFIGURATION
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# SUPER ADMIN CREDENTIALS
SUPER_ADMIN_EMAIL="superadmin@yourdomain.com"
SUPER_ADMIN_PASSWORD="StrongSuperAdminPassword"
SUPER_ADMIN_SECURITY_KEY="@YourSecurityKey"

# CASHFREE PAYMENTS
CASHFREE_APP_ID="your_cashfree_app_id"
CASHFREE_SECRET_KEY="your_cashfree_secret_key"
CASHFREE_ENV="production"
APP_ORIGIN="https://yourdomain.com"
SUBSCRIPTION_GRACE_DAYS="7"

# AI PROVIDERS
GEMINI_API_KEY="your_gemini_api_key"
OPENROUTER_API_KEY="your_openrouter_api_key"

# WEBRTC VIDEO / TURN SERVER
TURN_URLS="turn:turn.yourdomain.com:3478?transport=udp,turn:turn.yourdomain.com:3478?transport=tcp"
TURN_STUN_URLS="stun:turn.yourdomain.com:3478"
TURN_REALM="turn.yourdomain.com"
TURN_SHARED_SECRET="generated_shared_secret"
TURN_CREDENTIAL_TTL_SECONDS="3600"
VIDEO_JOIN_WINDOW_BEFORE_MINUTES="30"
VIDEO_JOIN_WINDOW_AFTER_MINUTES="120"
VIDEO_NOTICE_VERSION="v1"
WA_DISABLE_AUTOSTART="false"`,
          },
        },
        {
          stepNumber: 6,
          title: "Install Dependencies & Synchronize Prisma",
          description: "Install npm dependencies, generate the Prisma client, and push the database schema to MySQL.",
          command: `cd /var/www/MediFlowAi
npm install
npx prisma generate
npx prisma db push`,
        },
        {
          stepNumber: 7,
          title: "Build the Application",
          description: "Compile the client bundle and Nitro server runtime producing the production bundle in .output/.",
          command: `npm run build`,
        },
        {
          stepNumber: 8,
          title: "Configure PM2 for Production",
          description: "Start the production Nitro server using PM2 and save the process list for auto-restart on reboot.",
          command: `pm2 start .output/server/index.mjs --name "bookmytime" --node-args="--max-old-space-size=2048"
pm2 save
pm2 startup`,
        },
        {
          stepNumber: 9,
          title: "Configure Nginx as Reverse Proxy",
          description: "Create an Nginx server block pointing to port 3000 with gzip compression and WebSocket proxying.",
          command: `nano /etc/nginx/sites-available/bookmytime
ln -s /etc/nginx/sites-available/bookmytime /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx`,
        },
        {
          stepNumber: 10,
          title: "Install Free SSL Certificate (HTTPS)",
          description: "Issue a Let's Encrypt SSL certificate using Certbot with automatic HTTPS redirection.",
          command: `certbot --nginx -d yourdomain.com -d www.yourdomain.com`,
        },
        {
          stepNumber: 11,
          title: "Configure Firewall (UFW)",
          description: "Allow OpenSSH and Nginx Full through UFW firewall.",
          command: `ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
ufw status`,
        },
      ],
    },
    vpsRedeploymentGuide: {
      manualSteps: [
        { step: "1. Push local changes", command: "git add . && git commit -m 'feat: update' && git push origin main" },
        { step: "2. SSH into VPS", command: "ssh root@YOUR_SERVER_IP" },
        { step: "3. Navigate to root", command: "cd /var/www/MediFlowAi" },
        { step: "4. Pull latest commits", command: "git pull origin main" },
        { step: "5. Install dependencies", command: "npm install" },
        { step: "6. Sync Prisma Schema", command: "npx prisma generate && npx prisma db push" },
        { step: "7. Build & Reload PM2", command: "npm run build && pm2 restart bookmytime && pm2 status" },
      ],
      deployScriptFilename: "deploy.sh",
      deployScript: `#!/bin/bash
set -e
echo "🚀 [1/6] Navigating to project directory..."
cd /var/www/MediFlowAi
echo "📥 [2/6] Pulling latest updates from Git..."
git pull origin main
echo "📦 [3/6] Installing dependencies..."
npm install --prefer-offline
echo "🗄️ [4/6] Updating database schema..."
npx prisma generate
npx prisma db push
echo "🏗️ [5/6] Building production bundle..."
npm run build
echo "🔄 [6/6] Reloading application with PM2..."
pm2 restart bookmytime
echo "✅ Deployment successful! Current status:"
pm2 status`,
      rollbackPlan: [
        { step: "1. Check Live Error Logs", command: "pm2 logs bookmytime --err --lines 50" },
        { step: "2. Check WhatsApp Output", command: "pm2 logs bookmytime | grep -i '\\[WA\\]'" },
        { step: "3. Clear Build Cache & Rebuild", command: "rm -rf .output .tanstack node_modules/.vite && npm run build" },
        { step: "4. Inspect Nginx Logs", command: "tail -f /var/log/nginx/error.log" },
        { step: "5. Database Connectivity Test", command: "npx prisma db pull" },
      ],
    },
  },

  chatnexgen: {
    id: "chatnexgen",
    name: "ChatNexGen",
    tagline: "Enterprise Multi-Tenant WhatsApp CRM & AI Automation Engine",
    url: "https://chatnexgen.in/",
    demoCredentials: {
      username: "demochatnexgen@gmail.com",
      password: "Demo@2026",
      note: "Pre-configured with Meta WhatsApp Cloud API sandbox, shared team inbox, visual Kanban deals, and automated flow bot.",
    },
    localImg: "/assets/work/website-preview/chatnexgen.png",
    badge: "Official Meta WhatsApp CRM",
    categoryName: "Conversational AI & WhatsApp CRM",
    categoryGroup: "Operations & Growth",
    heroDesc: "Enterprise Multi-Tenant WhatsApp CRM, AI Automation Engine, and Omnichannel Communication Platform built directly on top of the Official Meta WhatsApp Cloud API for automated sales pipelines and multi-agent support.",
    detailedDesc: "ChatNexGen (HashTags CRM) is an Enterprise Multi-Tenant WhatsApp CRM, AI Automation Engine, and Omnichannel Communication Platform built directly on top of the Official Meta WhatsApp Cloud API. It transforms standard WhatsApp Business communication into an automated sales pipeline, collaborative multi-agent support center, and intelligent scheduling system for businesses across various industries (Healthcare, Clinics, E-commerce, Hotels, Education, and Professional Services).",
    techStack: [
      "Next.js 16 (App Router)",
      "React 19.2",
      "TypeScript 5.8",
      "Tailwind CSS 4.0",
      "Meta WhatsApp Cloud API",
      "Socket.io",
      "Prisma ORM 5.22",
      "MySQL 8.0+",
      "Google Gemini AI",
      "Framer Motion",
      "@dnd-kit Kanban",
    ],
    stats: [
      { label: "Sync Latency", value: "< 250ms" },
      { label: "Multi-Agent Seats", value: "Unlimited" },
      { label: "24h Window Enforcer", value: "100% Compliant" },
      { label: "Data Isolation", value: "Strict Multi-Tenant" },
    ],
    interactiveCapabilities: [
      {
        title: "Real-Time Shared Team Inbox",
        subtitle: "Multi-Agent Collaboration & WebSockets",
        description: "Multiple agents manage official WhatsApp Business numbers simultaneously without phone session disconnects. Instant WebSocket synchronization via Socket.io delivers live typing indicators, read receipts, and agent thread assignment.",
        metrics: "Zero Phone Disconnects",
        badge: "Shared Inbox",
        previewNote: "Tracks Meta's 24-hour service window with automated pre-approved template prompts.",
      },
      {
        title: "Visual Kanban Sales Pipelines",
        subtitle: "Chat-Linked Deals & Drag-and-Drop",
        description: "Create and track deals directly linked to active WhatsApp customer conversations. Define customizable deal funnels with monetary values, multi-currency tracking, and fluid drag-and-drop card movement powered by @dnd-kit.",
        metrics: "Real-Time Deal Tracking",
        badge: "Kanban Pipeline",
        previewNote: "Trigger webhooks and automated follow-up sequences on deal stage transitions.",
      },
      {
        title: "Visual No-Code Flow Builder",
        subtitle: "Interactive Chatbot Decision Trees",
        description: "Build interactive chatbot workflows triggered by keywords, initial customer contact, or manual tags. Configure interactive button menus, section lists, user input collection, variable evaluation, webhooks, and human agent handoff.",
        metrics: "Automated Conversational Trees",
        badge: "Flow Automations",
        previewNote: "Background worker queues execute timed follow-up actions and delays reliably.",
      },
      {
        title: "Multi-Segment AI Engine",
        subtitle: "Google Gemini + Clinic Slot Booking",
        description: "Primary AI engine powered by Google Gemini with automated fallback to OpenRouter/OpenAI. Calculates doctor slots in real time, manages holiday exceptions, triages patient symptoms, and answers FAQs with zero hallucination.",
        metrics: "Intelligent Triage & Booking",
        badge: "Gemini AI Engine",
        previewNote: "Strict guardrails prevent unauthorized medical advice and escalate to live agents.",
      },
    ],
    features: [
      {
        title: "Official Meta WhatsApp Cloud API",
        desc: "Built directly on top of Meta's official Graph API for high deliverability, official verified green badges, and zero third-party ban risks.",
        icon: MessageCircle,
      },
      {
        title: "Real-Time Shared Team Inbox",
        desc: "Multi-agent collaboration allowing unlimited team members to manage conversations with agent assignment, internal notes, and tagging.",
        icon: Users,
      },
      {
        title: "Instant WebSocket Sync (Socket.io)",
        desc: "Bidirectional real-time message delivery, typing indicators, read receipts, and tenant room isolation powered by Socket.io.",
        icon: Zap,
      },
      {
        title: "Meta 24-Hour Window Enforcer",
        desc: "Automated session timer tracks Meta's 24h customer service window and prevents delivery failures by prompting approved message templates.",
        icon: Clock,
      },
      {
        title: "Visual Kanban Sales Pipeline",
        desc: "Drag-and-drop deals board powered by @dnd-kit with chat-linked deals, customizable stages, revenue values, and stage movement webhooks.",
        icon: Workflow,
      },
      {
        title: "Targeted Broadcast Campaigns",
        desc: "Schedule or instantly dispatch broadcasts using pre-approved Meta WhatsApp templates with dynamic {{name}} and {{order_id}} variables.",
        icon: Bell,
      },
      {
        title: "Visual No-Code Flow Builder",
        desc: "Conversational decision trees with interactive buttons, section lists, input collection, condition evaluation, and automated wait queues.",
        icon: Bot,
      },
      {
        title: "Multi-Model AI Conversational Engine",
        desc: "Primary intelligence powered by Google Gemini with automated fallback to OpenRouter / OpenAI for intent recognition and automated replies.",
        icon: Brain,
      },
      {
        title: "Clinic & Healthcare Scheduling",
        desc: "Calculates available doctor slots in real time, handles holiday exceptions, triages symptoms, and books appointments without double-booking.",
        icon: HeartPulse,
      },
      {
        title: "Kernel-Scoped Multi-Tenancy",
        desc: "Architectural kernel extension automatically binds all database queries to the authenticated tenant, preventing cross-tenant data leaks.",
        icon: ShieldCheck,
      },
      {
        title: "AES-256-GCM Credential Encryption",
        desc: "Meta permanent tokens, app secrets, and SMTP credentials stored securely with military-grade AES-256-GCM symmetric encryption.",
        icon: Lock,
      },
      {
        title: "Granular Role-Based Access Control",
        desc: "Distinct permission profiles for Super Admins, Tenant Admins, Staff, Doctors, and Receptionists with audit logging.",
        icon: Shield,
      },
    ],
    whiteLabel: [
      {
        title: "100% Brand Ownership & White-Label",
        desc: "Deploy on crm.yourcompany.com with your custom logo, theme colors, and zero vendor attribution or licensing footprints.",
        icon: Palette,
      },
      {
        title: "Multi-Tenant Agency Workspaces",
        desc: "Host independent CRM workspaces for unlimited clients (clinics, e-commerce, hotels, schools) from one central Super Admin portal.",
        icon: Building2,
      },
      {
        title: "Full Unminified Source Code",
        desc: "Receive complete Next.js App Router, React 19, Socket.io custom server, and Prisma ORM source code with full modification rights.",
        icon: Code,
      },
      {
        title: "Self-Hosted Private VPS",
        desc: "Deploy securely on your own VPS (Ubuntu 22.04/24.04 with PM2, Nginx, and Certbot SSL) with 100% data sovereignty.",
        icon: Terminal,
      },
      {
        title: "Bring Your Own Meta & AI Keys",
        desc: "Plug in your own Meta WhatsApp Cloud API credentials, Google Gemini, and OpenAI keys with zero third-party platform markups.",
        icon: Key,
      },
      {
        title: "Commercial Resale & Agency License",
        desc: "Sell branded WhatsApp CRM subscriptions to your clients or charge monthly retainers with zero recurring royalties back to us.",
        icon: Crown,
      },
    ],
    sourceCodeOffer: {
      fixedPrice: 1999,
      originalPrice: 49999,
      discountPercentage: 96,
      licenseName: "Full Commercial Source Code License",
      deliveryMethod: "Instant Encrypted Download (5-Min Expiring Session)",
      legalDisclaimer: "Important: You must rebrand and change the original product name, brand identity, and logos before deploying to production. Deploying or operating under the original product name without modification may result in copyright or trademark infringement.",
      deliverables: [
        "Complete Next.js (App Router) + React 19.2 + TypeScript Full-Stack CRM Codebase",
        "Custom Node.js Runtime (server.js) Hosting Next.js and Socket.io on a Shared Port",
        "Official Meta WhatsApp Cloud API (Graph API) Bi-Directional Webhook Handlers",
        "Real-Time Shared Team Inbox with WebSocket Multi-Agent Thread Assignment",
        "Visual Kanban Sales Pipeline Board with Drag-and-Drop (@dnd-kit)",
        "Visual No-Code Flow Builder Engine with Interactive Buttons, Lists & Delays",
        "Google Gemini AI & OpenRouter Medical/Clinic Appointment Booking Engine",
        "Prisma ORM 5.22 Database Schemas & MySQL Multi-Tenant Migrations",
        "AES-256-GCM Cryptographic Token & Credential Encryption Modules",
        "Complete Step-by-Step Production VPS Deployment Guide Included in Download (Ubuntu 22.04/24.04 with PM2, Nginx & Certbot SSL)",
        "Automated 1-Command Zero-Downtime Redeployment Script (deploy.sh) Included in Download",
        "Complete Production .env Checklist & Security Blueprint Included in Download",
        "Full Commercial White-Label License (Deploy to Unlimited Businesses with Zero Royalties)",
      ],
      featuresIncluded: [
        "Enterprise Multi-Tenant WhatsApp CRM built on Official Meta Cloud API",
        "Real-time shared team inbox with multi-agent thread assignment",
        "Visual Kanban sales pipeline with chat-linked deals",
        "High-throughput broadcast campaigns with Meta pre-approved templates",
        "Visual no-code conversational flow builder & automated wait queues",
        "Multi-model AI assistant (Google Gemini + OpenRouter fallback)",
        "Full production deployment guide & automated deploy.sh script provided in download",
        "Zero per-agent or per-chat monthly licensing fees forever",
      ],
      techStackDetailed: [
        { category: "Frontend & UI", techs: ["Next.js (App Router)", "React 19.2", "TypeScript 5.8", "Tailwind CSS 4.0", "Framer Motion 12", "@dnd-kit", "Lucide React", "Sonner", "Base UI / Shadcn", "Date-fns"] },
        { category: "Backend & Realtime", techs: ["Node.js 20 LTS", "Custom HTTP Server (server.js)", "Socket.io 4.8", "Prisma ORM 5.22", "MySQL / MariaDB 8.0+", "Zod 3.25", "Jose JWT", "Bcryptjs"] },
        { category: "Integrations & APIs", techs: ["Meta WhatsApp Cloud API", "Google Gemini API", "OpenAI / OpenRouter API", "Nodemailer SMTP", "SheetJS (xlsx)", "Mammoth DOCX", "Google Sheets Webhook"] },
        { category: "Security & DevOps", techs: ["AES-256-GCM Encryption", "Kernel Tenant Scoping", "PM2 Process Manager", "Nginx Reverse Proxy", "Certbot SSL", "Ubuntu 22.04/24.04"] },
      ],
    },
    faqs: [
      {
        q: "What is included with the ChatNexGen (HashTags CRM) source code download?",
        a: "You receive the complete, unminified Next.js App Router frontend, custom Node.js server.js runtime hosting Socket.io, Prisma ORM 5.22 database schemas with MySQL migrations, Meta WhatsApp Cloud API webhooks, shared team inbox, visual Kanban deals pipeline, visual no-code flow builder, Google Gemini AI clinical booking modules, plus the full step-by-step VPS deployment guide and automated deploy.sh script in the download package.",
      },
      {
        q: "Does ChatNexGen use the official Meta WhatsApp Cloud API?",
        a: "Yes! ChatNexGen is engineered directly on the official Meta WhatsApp Cloud API (Graph API). This guarantees high message delivery rates, official verified green badge support, and zero account ban risks compared to unofficial web-scraping libraries.",
      },
      {
        q: "Can multiple team members manage the same WhatsApp number simultaneously?",
        a: "Yes. ChatNexGen is a true multi-agent shared team inbox. Multiple agents can log in from their own computers, receive incoming chats via real-time WebSockets, assign threads to specific agents, add internal private notes, and reply to customers simultaneously without session disconnects.",
      },
      {
        q: "How does the AI appointment booking and clinic slot calculation work?",
        a: "The system integrates Google Gemini AI with fallback to OpenRouter/OpenAI. For clinics and service providers, it queries available specialist slots in real time, respects holiday exceptions, triages customer requests, and confirms bookings with zero double-booking risk.",
      },
      {
        q: "Does the download include complete server deployment and redeployment guides?",
        a: "Yes! The download package includes comprehensive, step-by-step deployment instructions for clean Ubuntu 22.04 / 24.04 LTS VPS (Hostinger, AWS, DigitalOcean, Hetzner, etc.) with PM2, Nginx, MySQL, and Certbot SSL, along with an automated deploy.sh shell script for 1-command zero-downtime updates.",
      },
      {
        q: "Can I rebrand ChatNexGen and sell it as a white-label WhatsApp SaaS to businesses?",
        a: "Yes, 100%! You receive a full commercial source code license. You can rebrand the platform under your agency or company name, configure your domain, and sell it or charge monthly SaaS retainers to unlimited business clients with zero royalties back to us.",
      },
    ],
    comprehensiveTechStack: [
      {
        category: "Frontend Layer",
        description: "Full-stack React framework with App Router architecture, responsive UI primitives, and drag-and-drop mechanics.",
        items: [
          { name: "Next.js (App Router) 16.2.6", details: "Full-stack framework with SSR, Server Components & Route Handlers", url: "https://nextjs.org/" },
          { name: "React & React DOM 19.2.4", details: "Modern component UI rendering engine & hooks", url: "https://react.dev/" },
          { name: "TypeScript ^6 / ^5.8", details: "Static typing & compile-time contract enforcement", url: "https://www.typescriptlang.org/" },
          { name: "Tailwind CSS ^4.0", details: "Utility-first responsive styling and brand theming", url: "https://tailwindcss.com/" },
          { name: "Framer Motion ^12.40.0", details: "Fluid UI transitions, micro-interactions, and animations", url: "https://motion.dev/" },
          { name: "@dnd-kit (Core, Sortable)", details: "Accessible drag-and-drop mechanics for Kanban pipeline boards", url: "https://dndkit.com/" },
          { name: "Lucide React ^1.8.0", details: "Modern, consistent iconography library", url: "https://lucide.dev/" },
          { name: "Sonner ^2.0.7", details: "Toast notification system", url: "https://sonner.emilkowal.ski/" },
          { name: "Base UI / Shadcn", details: "Accessible, unstyled UI component primitives", url: "https://ui.shadcn.com/" },
          { name: "Date-fns ^4.1.0", details: "Lightweight, timezone-aware date parsing and manipulation", url: "https://date-fns.org/" },
        ],
      },
      {
        category: "Backend, Server & Database",
        description: "Custom Node.js runtime, real-time WebSocket engine, and multi-tenant database layer.",
        items: [
          { name: "Node.js >= 20.0.0", details: "Core server runtime environment", url: "https://nodejs.org/" },
          { name: "Custom HTTP Server (server.js)", details: "Custom runtime hosting Next.js and Socket.io on a shared port" },
          { name: "Socket.io & Socket.io-Client ^4.8.3", details: "Bidirectional real-time WebSocket communication with tenant room isolation", url: "https://socket.io/" },
          { name: "Prisma ORM ^5.22.0", details: "Type-safe database schema modeling, migrations, and query generation", url: "https://www.prisma.io/" },
          { name: "MySQL / MariaDB 8.0+ / 10.6+", details: "Relational storage for tenants, contacts, messages, pipelines, and logs", url: "https://www.mysql.com/" },
          { name: "Zod 3.25.76", details: "Runtime payload validation, input sanitization, and response DTO allowlists", url: "https://zod.dev/" },
          { name: "Jose & JsonWebToken", details: "Cryptographic JWT token generation, verification, and session state" },
          { name: "Bcryptjs ^3.0.3", details: "Cryptographic password hashing and salting" },
        ],
      },
      {
        category: "External APIs & Integrations",
        description: "Official Meta WhatsApp Cloud API gateway, multi-LLM artificial intelligence, and export automations.",
        items: [
          { name: "Meta WhatsApp Cloud API (Graph API)", details: "Official gateway for sending/receiving WhatsApp messages, media & templates", url: "https://developers.facebook.com/docs/whatsapp/cloud-api" },
          { name: "Google Gemini API", details: "Primary generative AI for intent recognition, slot booking, and smart customer replies", url: "https://ai.google.dev/" },
          { name: "OpenAI / OpenRouter API", details: "Secondary and tertiary fallback models for AI resilience", url: "https://openrouter.ai/" },
          { name: "Nodemailer", details: "Transactional SMTP email delivery for OTP verification and password recovery", url: "https://nodemailer.com/" },
          { name: "SheetJS (xlsx) & Mammoth", details: "Contact spreadsheet imports/exports and document text processing" },
          { name: "Google Apps Script Webhooks", details: "Two-way automated sync between booked appointments and Google Sheets" },
        ],
      },
    ],
    vpsDeploymentGuide: {
      overview: {
        os: "Ubuntu 22.04 / 24.04 LTS",
        processManager: "PM2",
        reverseProxy: "Nginx (with SSL via Let's Encrypt Certbot)",
        database: "MySQL 8.0+ / MariaDB 10.6+",
        storagePath: "/var/www/chatnexgen/storage",
        appPath: "/var/www/chatnexgen",
      },
      steps: [
        {
          stepNumber: 1,
          title: "Connect to VPS and Update System",
          description: "Connect to your remote server via SSH, update package lists, and install basic build tools.",
          command: `ssh root@YOUR_SERVER_IP
apt update && apt upgrade -y
apt install -y curl git ufw build-essential`,
        },
        {
          stepNumber: 2,
          title: "Install Node.js 20 LTS",
          description: "Install Node.js 20.x via the official NodeSource repository.",
          command: `curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v   # Should output v20.x.x or higher
npm -v    # Should output 10.x.x or higher`,
        },
        {
          stepNumber: 3,
          title: "Install and Configure MySQL Database",
          description: "Install MySQL Server, enable the service, and create the application database and user.",
          command: `apt install -y mysql-server
systemctl enable mysql
systemctl start mysql
mysql -u root -p`,
          codeSnippet: {
            language: "sql",
            filename: "MySQL Shell Commands",
            code: `CREATE DATABASE hashtagscrm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'hashtagstech'@'localhost' IDENTIFIED BY 'StrongPasswordHere@2026';
GRANT ALL PRIVILEGES ON hashtagscrm.* TO 'hashtagstech'@'localhost';
FLUSH PRIVILEGES;
EXIT;`,
          },
        },
        {
          stepNumber: 4,
          title: "Install PM2 and Nginx",
          description: "Install PM2 globally, install Nginx and Certbot for SSL, and configure UFW firewall rules.",
          command: `npm install -g pm2
apt install -y nginx certbot python3-certbot-nginx
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable`,
        },
        {
          stepNumber: 5,
          title: "Transfer and Set Up the Project",
          description: "Create project directory /var/www/chatnexgen, clone repository, and install production dependencies.",
          command: `mkdir -p /var/www/chatnexgen
cd /var/www/chatnexgen
git clone <YOUR_REPOSITORY_REFERENCE> .
npm install`,
        },
        {
          stepNumber: 6,
          title: "Configure Environment Variables",
          description: "Create the production .env configuration file inside /var/www/chatnexgen.",
          command: `nano .env`,
          codeSnippet: {
            language: "ini",
            filename: "/var/www/chatnexgen/.env",
            code: `NODE_ENV=production
PORT=3002
NEXT_PUBLIC_SITE_URL=https://crm.yourdomain.com
NEXT_PUBLIC_SOCKET_URL=https://crm.yourdomain.com
DATABASE_URL="mysql://hashtagstech:StrongPasswordHere@2026@localhost:3306/hashtagscrm"
JWT_SECRET=super_secret_jwt_access_token_key_2026
JWT_REFRESH_SECRET=super_secret_jwt_refresh_token_key_2026
ENCRYPTION_KEY=ef0713728e472fa6e970160dddb965d31a3fc736fd9e0515eb684fdfe6f05ddb
META_APP_SECRET=your_meta_app_secret_from_developers_portal
WEBHOOK_VERIFY_TOKEN=YourCustomVerifyTokenHere
AUTOMATION_CRON_SECRET=custom_random_cron_secret_key_2026
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_or_openrouter_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
SUPER_ADMIN_USERNAME=admin@yourdomain.com
SUPER_ADMIN_PASSWORD=YourSecureAdminPassword
SUPER_ADMIN_SECRET=super_admin_jwt_secret_key_2026
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USERNAME="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_BCC="backup@yourdomain.com"`,
          },
        },
        {
          stepNumber: 7,
          title: "Initialize Database Schema via Prisma",
          description: "Generate the Prisma client bindings and apply database migrations.",
          command: `npx prisma generate
npx prisma migrate deploy
# If empty database without migrations:
# npx prisma db push`,
        },
        {
          stepNumber: 8,
          title: "Build the Next.js Production Bundle",
          description: "Compile the Next.js production bundle with optimization.",
          command: `npm run build`,
        },
        {
          stepNumber: 9,
          title: "Start the Application with PM2",
          description: "Launch server.js with 4GB memory allocation and enable startup on reboot.",
          command: `pm2 start server.js --name "chatnexgen" --node-args="--max-old-space-size=4096"
pm2 save
pm2 startup`,
        },
        {
          stepNumber: 10,
          title: "Configure Nginx as Reverse Proxy with WebSockets",
          description: "Create an Nginx configuration with WebSocket upgrade headers and 24-hour read timeouts.",
          command: `nano /etc/nginx/sites-available/chatnexgen
ln -s /etc/nginx/sites-available/chatnexgen /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx`,
        },
        {
          stepNumber: 11,
          title: "Secure with Let's Encrypt SSL",
          description: "Generate a free Let's Encrypt SSL certificate using Certbot with automatic HTTPS redirection.",
          command: `certbot --nginx -d crm.yourdomain.com`,
        },
        {
          stepNumber: 12,
          title: "Configure Meta WhatsApp Webhook",
          description: "Set the callback URL (https://crm.yourdomain.com/api/whatsapp/webhook) and verify token in Meta Developers Portal.",
          command: `# Subscriptions required in Meta Portal:
# messages, message_deliveries, message_reads, message_template_status_update`,
        },
      ],
    },
    vpsRedeploymentGuide: {
      manualSteps: [
        { step: "1. Connect to VPS", command: "ssh root@YOUR_SERVER_IP" },
        { step: "2. Navigate to project root", command: "cd /var/www/chatnexgen" },
        { step: "3. Pull latest code", command: "git pull origin main" },
        { step: "4. Install updated packages", command: "npm install" },
        { step: "5. Update Prisma Schema", command: "npx prisma generate && npx prisma migrate deploy" },
        { step: "6. Rebuild Next.js", command: "npm run build" },
        { step: "7. Restart PM2 Service", command: "pm2 restart chatnexgen" },
        { step: "8. Verify status & logs", command: "pm2 status && pm2 logs chatnexgen --lines 30" },
      ],
      deployScriptFilename: "deploy.sh",
      deployScript: `#!/usr/bin/env bash
set -e
PROJECT_DIR="/var/www/chatnexgen"
APP_NAME="chatnexgen"
echo "==========================================="
echo "  🚀 Starting ChatNexGen Auto-Redeployment"
echo "==========================================="
cd "$PROJECT_DIR"
echo "📥 [1/6] Pulling latest code changes..."
git pull origin main
echo "📦 [2/6] Installing dependencies..."
npm install --prefer-offline
echo "🗄️  [3/6] Syncing Prisma schema..."
npx prisma generate
npx prisma migrate deploy
echo "🏗️  [4/6] Building production bundle..."
npm run build
echo "🔄 [5/6] Reloading PM2 process..."
pm2 restart "$APP_NAME"
echo "✅ [6/6] Verifying system health..."
pm2 status "$APP_NAME"
echo "==========================================="
echo "  🎉 Redeployment completed successfully!"
echo "==========================================="`,
      rollbackPlan: [
        { step: "1. Inspect Live Server Errors", command: "pm2 logs chatnexgen --err --lines 50" },
        { step: "2. Inspect WebSocket Output", command: "pm2 logs chatnexgen | grep -i '\\[Socket.io\\]'" },
        { step: "3. Clear Build Cache & Clean Rebuild", command: "npm run clean && npm run build && pm2 restart chatnexgen" },
        { step: "4. Inspect Nginx Logs", command: "tail -f /var/log/nginx/error.log" },
        { step: "5. Database Connection Test", command: "npx prisma db pull" },
        { step: "6. Monitor CPU & Memory", command: "pm2 monit" },
      ],
    },
  },

  nexaleadai: {
    id: "nexaleadai",
    name: "NexaLead AI",
    tagline: "AI Prospecting & Intent-Driven B2B Lead Engine",
    url: "https://nexaleadai.in/",
    demoCredentials: {
      username: "demonexaleadai@gmail.com",
      password: "Demo@2026",
      note: "Pre-loaded with 50,000+ verified B2B prospect search credits.",
    },
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
      { title: "Full Commercial Rights", desc: "Launch your own B2B lead generation platform branded with your agency name and domain.", icon: Palette },
      { title: "Multi-Tier Credit Allocation", desc: "Set up monthly lead download credits for your agency clients and team members.", icon: CreditCard },
      { title: "Custom Domain & Branding", desc: "Host on leads.yourbrand.com with customized logo, favicon, and email notifications.", icon: Globe },
      { title: "Complete Source Code", desc: "Receive the full React 19 frontend and Node.js search API with zero recurring licensing fees.", icon: Code },
      { title: "Integrate Any Data Provider", desc: "Plug in your own data providers or custom scrapers with standard modular adapter architecture.", icon: Server },
      { title: "Private Cloud Deployment", desc: "Deploy on your private cloud infrastructure with complete data sovereignty.", icon: Terminal },
    ],
    sourceCodeOffer: {
      fixedPrice: 1999,
      originalPrice: 49999,
      discountPercentage: 96,
      licenseName: "Full Commercial Source Code License",
      deliveryMethod: "Instant GitHub Repo Access & ZIP Archive",
      deliverables: [
        "Complete React 19 B2B Prospecting Web Platform",
        "Node.js Backend Search & Filter API Architecture",
        "PostgreSQL Schemas & Lead Enrichment Pipeline",
        "Real-Time SMTP Email Verification Engine",
        "CSV Export & Column Mapping Module",
        "Multi-Tenant User & Credit Management System",
        "Full Setup Documentation & Brand Guide",
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
  aihospitalerp: {
    id: "aihospitalerp",
    name: "AiHospitalERP",
    tagline: "AI-Powered Multi-Tenant Hospital ERP & Healthcare Operating System",
    url: "https://aihospitalerp.com",
    demoCredentials: {
      username: "admin@aihospitalerp.com",
      password: "YourStrongPassword123!",
      note: "Full Super Admin & Hospital Director sandbox with pre-configured departments, staff, and clinical workflows.",
    },
    localImg: "/assets/work/website-preview/aihospitalerp.png",
    badge: "AI Healthcare ERP",
    categoryName: "Hospital ERP & Healthcare AI",
    categoryGroup: "Operations & Growth",
    heroDesc: "Enterprise-grade multi-tenant Hospital Management System (HMS) & Healthcare ERP with autonomous Google Gemini medical transcription, granular 30+ role RBAC, outpatient/inpatient management, pharmacy inventory, and automated billing.",
    detailedDesc: "AiHospitalERP is a production-ready, multi-tenant hospital management platform designed for multi-specialty hospitals, healthcare clinics, and telemedicine providers. Features automated OPD/IPD flows, doctor appointment scheduling, smart prescription voice transcription, pharmacy inventory, lab report dispatch, and Cashfree payment integration.",
    techStack: [
      "Next.js 14.2",
      "React 18.3",
      "TypeScript 5",
      "MySQL 8.0",
      "Prisma ORM 5.22",
      "Google Gemini AI",
      "Tailwind CSS 3.4",
      "Cashfree API",
      "Twilio SMS",
      "Nodemailer",
    ],
    stats: [
      { label: "Active Modules", value: "30+" },
      { label: "Voice Rx Latency", value: "< 2s" },
      { label: "Data Isolation", value: "100%" },
      { label: "RBAC Roles", value: "5+ Tiers" },
    ],
    features: [
      {
        title: "Multi-Tenant Hospital Architecture",
        desc: "Provision distinct workspaces for unlimited hospitals and clinics with strict database and clinical data isolation.",
        icon: Building2,
      },
      {
        title: "Google Gemini Medical Transcription",
        desc: "Transcribe voice consultations and clinical notes into structured medical summaries and digital prescriptions in seconds.",
        icon: Brain,
      },
      {
        title: "Granular 30+ Permission RBAC",
        desc: "Role-based access matrix separating Super Admins, Hospital Admins, Doctors, Nurses, and Receptionists.",
        icon: ShieldCheck,
      },
      {
        title: "Complete OPD / IPD & Bed Census",
        desc: "End-to-end outpatient ticketing, inpatient admissions, bed allocation tracking, and automated discharge summaries.",
        icon: Users,
      },
      {
        title: "Pharmacy & Batch Inventory",
        desc: "Batch expiration tracking, reorder threshold alerts, vendor procurement, and point-of-sale medicine dispensing.",
        icon: Database,
      },
      {
        title: "Cashfree Billing & Invoicing",
        desc: "Integrated Cashfree payments with instant UPI links, recurring subscriptions, and auto-generated GST invoices.",
        icon: CreditCard,
      },
      {
        title: "Twilio SMS & Nodemailer Alerts",
        desc: "Automated SMS appointment reminders, patient OTP verifications, and branded transactional PDF email invoices.",
        icon: Bell,
      },
      {
        title: "Medical Export & PDF Engine",
        desc: "Client-side and server-side PDF, DOCX, and Excel report generation with jsPDF, html2canvas, and SheetJS.",
        icon: FileText,
      },
    ],
    whiteLabel: [
      {
        title: "100% Hospital Brand Ownership",
        desc: "Replace all logos, colors, fonts, and hospital domain in minutes with zero platform attribution or licensing tags.",
        icon: Palette,
      },
      {
        title: "Commercial Resale Rights",
        desc: "License and deploy the software to unlimited private hospitals, healthcare networks, or clinics with zero royalties.",
        icon: Crown,
      },
      {
        title: "Custom Domain & Private Cloud",
        desc: "Host on hospital.yourdomain.com with automatic Let's Encrypt SSL and complete HIPAA/health data sovereignty.",
        icon: Globe,
      },
      {
        title: "Full Unminified Source Code",
        desc: "Receive complete Next.js 14, React 18, and Prisma ORM source code with full modification and extension rights.",
        icon: Code,
      },
      {
        title: "Self-Hosted Private VPS",
        desc: "Deploy securely on your own VPS (Ubuntu with PM2 & Nginx) or Vercel with zero external third-party locks.",
        icon: Terminal,
      },
      {
        title: "Bring Your Own AI & SMS Keys",
        desc: "Plug in your own Google Gemini, OpenAI, Twilio, and Cashfree API keys with zero platform markups.",
        icon: Key,
      },
    ],
    sourceCodeOffer: {
      fixedPrice: 1999,
      originalPrice: 49999,
      discountPercentage: 96,
      licenseName: "Full Commercial Source Code License",
      deliveryMethod: "Instant Encrypted Download (5-Min Expiring Session)",
      legalDisclaimer: "Important: You must rebrand and change the original product name, brand identity, and logos before deploying to production. Deploying or operating under the original product name without modification may result in copyright or trademark infringement.",
      deliverables: [
        "Complete Next.js 14.2 (App Router) + React 18.3 + TypeScript Full-Stack Source Code",
        "Multi-Tenant MySQL Database Schemas & Prisma ORM 5.22 Migrations",
        "Granular 30+ Role RBAC Engine (Doctors, Nurses, Receptionists, Hospital Admins, Super Admins)",
        "Google Gemini AI Medical Voice Transcription & Clinical Analysis Pipelines",
        "Cashfree Payments Integration (One-Time Checkout & Payment Links) & Webhooks",
        "Twilio SMS & Nodemailer SMTP Transactional Email Automation Engines",
        "Cloudinary Lab Uploads, jsPDF Medical Invoicing & SheetJS Pharmacy Inventory Importers",
        "Complete Step-by-Step Production Deployment Guide Included in Download (Linux VPS PM2 + Nginx & Vercel)",
        "Automated 1-Command Zero-Downtime Redeployment Script (deploy.sh) Included in Download",
        "Complete Production .env Checklist & Security Configuration Blueprint Included in Download",
        "Full Commercial White-Label License (Deploy to Unlimited Hospitals with Zero Royalties)",
      ],
      featuresIncluded: [
        "Multi-tenant hospital architecture with isolated databases",
        "Google Gemini AI medical voice transcription and clinical summary",
        "OPD, IPD, Bed census, and pharmacy inventory management",
        "Complete Cashfree payment processing and automated PDF billing",
        "Granular 30+ role RBAC matrix across clinical & administrative staff",
        "Full production deployment guide & automated deploy.sh script provided in download",
        "Zero subscription fees or recurring royalties forever",
      ],
      techStackDetailed: [
        { category: "Frontend & UI", techs: ["Next.js 14.2 (App Router)", "React 18.3", "TypeScript 5", "Tailwind CSS 3.4", "Framer Motion 12", "Recharts", "Lucide React"] },
        { category: "Backend & Server", techs: ["Node.js 20 LTS", "Next.js Server Actions & API Routes", "jose JWT", "bcryptjs", "Nodemailer SMTP"] },
        { category: "Database & ORM", techs: ["MySQL 8.0+", "Prisma ORM 5.22", "@prisma/client", "Multi-Tenant Schemas"] },
        { category: "AI & Voice Engine", techs: ["@google/generative-ai (Gemini)", "OpenAI Whisper STT", "OpenRouter Multi-LLM Routing"] },
        { category: "Payments & Alerts", techs: ["Cashfree Payments REST API", "Twilio SMS & OTP", "Webhook Verification"] },
        { category: "Document & Export", techs: ["Cloudinary Media CDN", "jsPDF & autoTable", "docx", "xlsx (SheetJS)", "html2canvas"] },
      ],
    },
    interactiveCapabilities: [
      {
        title: "AI Clinical Voice Transcription",
        subtitle: "Gemini Medical Voice Pipeline",
        description: "Transcribes doctor-patient voice consultations in real time and automatically organizes symptoms, diagnoses, and prescriptions with high medical accuracy.",
        metrics: "< 2s latency",
        badge: "AI Voice Module",
        previewNote: "Full commercial source code included.",
      },
      {
        title: "Multi-Tenant Hospital Core",
        subtitle: "Department & Patient Isolation",
        description: "Enterprise hospital database schema supporting multi-branch healthcare networks with isolated doctor rosters, patient records, and pharmacy inventories.",
        metrics: "100% Isolation",
        badge: "Core HMS",
        previewNote: "Complete Prisma ORM schemas included.",
      },
      {
        title: "Granular 30+ Role RBAC Matrix",
        subtitle: "Enterprise Healthcare Security",
        description: "Role-based authorization framework enforcing clinical data privacy across Super Admins, Hospital Directors, Chief Doctors, Staff Nurses, and Cashiers.",
        metrics: "30+ Permissions",
        badge: "Security",
        previewNote: "JWT + bcryptjs auth included.",
      },
      {
        title: "Automated Inpatient & Bed Census",
        subtitle: "Real-Time Ward Management",
        description: "Dynamic visual bed matrix, real-time admission tracking, doctor rounds documentation, and one-click itemized discharge summary generation.",
        metrics: "Real-Time Sync",
        badge: "IPD / Ward",
        previewNote: "Full commercial source code included.",
      },
    ],
    faqs: [
      {
        q: "What is included with the AiHospitalERP source code download?",
        a: "You receive the complete, unminified Next.js 14.2 full-stack codebase, React 18 frontend, Prisma 5.22 database schemas with MySQL migrations, Google Gemini AI clinical modules, Cashfree and Twilio integrations, plus the full step-by-step VPS deployment guide and automated zero-downtime redeployment script (deploy.sh) in the download package.",
      },
      {
        q: "Does the download include server deployment and redeployment guides?",
        a: "Yes! The download package includes comprehensive, step-by-step deployment instructions for both Linux VPS (Ubuntu 22.04/24.04 with PM2, Nginx, MySQL, and Certbot SSL) and Vercel, along with an automated deploy.sh shell script for 1-command zero-downtime updates.",
      },
      {
        q: "Can I rebrand AiHospitalERP and sell it to hospitals or clinics?",
        a: "Yes, 100%! You receive a full commercial source code license. You can rebrand the platform under your agency or hospital brand name, configure your domain, and sell it or charge monthly retainers with zero royalties back to us.",
      },
      {
        q: "How does the multi-tenant architecture work?",
        a: "AiHospitalERP is designed as a true multi-tenant hospital platform. Super Admins can onboard independent hospitals or clinics, each with their own isolated doctors, patients, billing, inventory, and staff permissions.",
      },
      {
        q: "Which AI models are used for medical voice transcription?",
        a: "It utilizes Google Gemini AI (@google/generative-ai) for clinical summaries, diagnosis assistance, and voice prescription analysis, with OpenAI Whisper as an audio speech-to-text fallback and custom OpenRouter multi-LLM routing.",
      },
      {
        q: "Which payment gateways and communication channels are integrated?",
        a: "Cashfree Payments (REST API 2025-01-01) for hospital subscriptions and patient billing links, Twilio for SMS appointment alerts and OTPs, and Nodemailer for SMTP transactional emails.",
      },
    ],
    comprehensiveTechStack: [
      {
        category: "Core Architecture & Runtime",
        description: "Full-stack framework, execution runtime, and strict type safety.",
        items: [
          { name: "Next.js ^14.2.29", details: "App Router, React Server Components & API Routes", url: "https://nextjs.org/" },
          { name: "React ^18.3.1", details: "Modern frontend component library & hooks", url: "https://react.dev/" },
          { name: "React DOM ^18.3.1", details: "React web rendering engine", url: "https://react.dev/" },
          { name: "TypeScript ^5", details: "Strict static typing across frontend & backend", url: "https://www.typescriptlang.org/" },
          { name: "Node.js >= 18.18 / 20 LTS", details: "Server-side JavaScript execution environment", url: "https://nodejs.org/" },
        ],
      },
      {
        category: "Database & ORM Layer",
        description: "Relational database engine and auto-generated type-safe client.",
        items: [
          { name: "MySQL 8.0+", details: "Multi-tenant hospitals, patients, billing & inventory", url: "https://www.mysql.com/" },
          { name: "Prisma ORM ^5.22.0", details: "Schema migrations, type-safe queries & CLI tools", url: "https://www.prisma.io/" },
          { name: "@prisma/client ^5.22.0", details: "Auto-generated database client for repositories", url: "https://www.prisma.io/" },
        ],
      },
      {
        category: "Authentication & Access Control",
        description: "Edge-compatible tokens and granular medical permission enforcement.",
        items: [
          { name: "jose ^6.2.2", details: "Edge-compatible JWT signing & encryption" },
          { name: "jsonwebtoken ^9.0.3", details: "Standard JWT token creation & validation" },
          { name: "bcryptjs ^3.0.3", details: "Secure salt-and-hash password encryption" },
          { name: "Granular RBAC System", details: "30+ permissions (Doctors, Nurses, Admins, Staff)" },
        ],
      },
      {
        category: "Artificial Intelligence & Voice",
        description: "Medical consultation transcription, diagnosis assistance, and voice Rx.",
        items: [
          { name: "@google/generative-ai ^0.24.1", details: "Gemini AI medical transcription & diagnosis", url: "https://ai.google.dev/" },
          { name: "openai ^6.33.0", details: "Whisper speech-to-text & GPT fallback", url: "https://openai.com/" },
          { name: "OpenRouter Integration", details: "Multi-LLM provider integration with fallback routing" },
        ],
      },
      {
        category: "Styling, UI & Animations",
        description: "Responsive clinical panels, administrative dashboards, and charts.",
        items: [
          { name: "Tailwind CSS ^3.4.19", details: "Utility-first CSS styling engine", url: "https://tailwindcss.com/" },
          { name: "PostCSS & Autoprefixer", details: "CSS bundling & browser vendor prefixing" },
          { name: "Lucide React ^0.577.0", details: "SVG icons across admin, clinical & patient panels", url: "https://lucide.dev/" },
          { name: "Framer Motion ^12.38.0", details: "Page transitions & interactive drawer/modal effects", url: "https://motion.dev/" },
          { name: "Swiper ^12.1.3", details: "Mobile-responsive touch carousel & sliders", url: "https://swiperjs.com/" },
          { name: "Recharts ^3.8.0", details: "Hospital financial, patient census & revenue charts", url: "https://recharts.org/" },
        ],
      },
      {
        category: "Payments & Communications",
        description: "Subscription billing, patient payment links, and instant alerts.",
        items: [
          { name: "Cashfree Payments (2025-01-01)", details: "Subscription billing, payment links & webhooks", url: "https://www.cashfree.com/" },
          { name: "Twilio ^5.13.1", details: "SMS appointment confirmations & OTP verification", url: "https://www.twilio.com/" },
          { name: "Nodemailer ^8.0.3", details: "SMTP emails (welcome, invoices, password resets)", url: "https://nodemailer.com/" },
        ],
      },
      {
        category: "Document Generation & Storage",
        description: "Patient invoices, discharge summaries, and medical record exports.",
        items: [
          { name: "Cloudinary ^2.9.0", details: "Cloud media, prescription scans & lab report CDN", url: "https://cloudinary.com/" },
          { name: "jspdf & jspdf-autotable", details: "Invoices, discharge summaries & Rx PDFs" },
          { name: "html2canvas ^1.4.1", details: "DOM element snapshots for PDF rendering" },
          { name: "docx ^9.6.1", details: "Microsoft Word (.docx) medical reports & letters" },
          { name: "xlsx SheetJS ^0.18.5", details: "Excel data import/export (pharmacy & billing)" },
          { name: "file-saver ^2.0.5", details: "Client-side trigger for downloading exported files" },
        ],
      },
      {
        category: "Data Validation & Dev Tools",
        description: "Request validation, strict linting, and automated memoization.",
        items: [
          { name: "Zod ^4.3.6", details: "Schema declaration & validation for API requests & forms", url: "https://zod.dev/" },
          { name: "ESLint & eslint-config-next", details: "Code quality & Next.js best practices enforcement" },
          { name: "React Compiler Babel Plugin", details: "Automated memoization & performance optimization" },
        ],
      },
    ],
  },

  mediadocks: {
    id: "mediadocks",
    name: "MediaDocks",
    tagline: "Universal Media Extraction & AI Transcription Platform",
    url: "https://mediadocks.com",
    demoCredentials: {
      username: "admin@mediadocks.com",
      password: "YourSuperAdminPassword",
      note: "Dedicated /superadmin dashboard with scrypt-hashed credentials & daily rotating salted analytics.",
    },
    localImg: "/assets/work/website-preview/mediadocks.png",
    badge: "Universal Media & AI",
    categoryName: "Media Extraction & AI Processing",
    categoryGroup: "AI & Automation",
    heroDesc: "High-performance, privacy-focused universal media extraction and processing platform. Resolve, preview, and download publicly accessible media from YouTube, Instagram, Facebook, X, and Pinterest with dynamic yt-dlp & FFmpeg stream muxing and Google Gemini AI audio transcription.",
    detailedDesc: "MediaDocks is a high-performance, privacy-focused universal media extraction and processing web application. It allows users to resolve, preview, and download publicly accessible media from major platforms—including YouTube, Instagram, Facebook, X (formerly Twitter), and Pinterest—as well as transcribe and summarize audio using AI. Built with zero permanent storage, ephemeral stream piping, and self-hosted binaries.",
    techStack: [
      "Next.js 15.1.7",
      "React 19",
      "TypeScript 5.7",
      "Tailwind CSS v4",
      "yt-dlp",
      "FFmpeg & FFprobe",
      "Google Gemini AI",
      "MySQL 8.4",
      "Prisma ORM 6.4",
      "PM2 & Nginx",
    ],
    stats: [
      { label: "Storage Footprint", value: "0% Ephemeral" },
      { label: "Max Resolution", value: "Up to 8K & MP3" },
      { label: "Supported Feeds", value: "YouTube, IG, X+" },
      { label: "AI Transcription", value: "Gemini 3.8 Flash" },
    ],
    features: [
      {
        title: "Zero Permanent Storage & Maximum Privacy",
        desc: "MediaDocks does not store user download history, track personal identities, or host media files permanently. Media streams are handled ephemerally, piped directly to the client, and purged automatically.",
        icon: Lock,
      },
      {
        title: "Frictionless — No Account Required",
        desc: "Users simply paste a link, preview the media formats, and download directly without logins, paywalls, or third-party ads.",
        icon: Zap,
      },
      {
        title: "Public Content Strict Compliance",
        desc: "Adheres strictly to publicly available feeds. It does not bypass private profiles, DRM, or CAPTCHA; transparent typed errors are presented when content is inaccessible.",
        icon: Globe,
      },
      {
        title: "Dynamic Resolution Ladder & Audio Muxing",
        desc: "Integrated self-hosted engine utilizing yt-dlp and FFmpeg to offer full resolutions (144p up to 1080p, 2K, 4K, 8K) by merging video-only and audio streams on-the-fly, as well as MP3/M4A/Opus extraction.",
        icon: Layers,
      },
      {
        title: "AI Video-to-Text Transcription & Summarization",
        desc: "Integrated AI pipeline powered by Google Gemini models allowing users to transcribe speech from videos and generate structured summaries in seconds.",
        icon: Brain,
      },
      {
        title: "Anonymous Salted Analytics & SuperAdmin",
        desc: "Built-in privacy-preserving analytics engine utilizing daily rotating salted hashes (no IP addresses, no pasted URLs stored) and a dedicated /superadmin dashboard with scrypt-hashed credentials.",
        icon: BarChart3,
      },
      {
        title: "Tool Discovery & Self-Healing Health Checks",
        desc: "Auto-detects local system binaries (yt-dlp, ffmpeg, ffprobe) with automatic fallback routing and exposed status at /api/health.",
        icon: Terminal,
      },
      {
        title: "High-Throughput Ephemeral Streaming",
        desc: "Stream chunks are buffered in memory and directly forwarded to the user response socket, delivering ultra-fast downloads without exhausting server NVMe drives.",
        icon: Gauge,
      },
    ],
    whiteLabel: [
      {
        title: "100% Brand Ownership",
        desc: "Customize branding, name, UI colors, and logos with zero vendor branding or external licensing links.",
        icon: Palette,
      },
      {
        title: "Commercial Resale Rights",
        desc: "Deploy unlimited instances, monetize via premium subscriptions, or offer as an internal media processing service.",
        icon: Crown,
      },
      {
        title: "Self-Hosted Private Infrastructure",
        desc: "Deploy on your private Linux VPS (Ubuntu 22.04/24.04 LTS) with full control over bandwidth, CPU, and proxy networking.",
        icon: Server,
      },
      {
        title: "Full Unminified Source Code",
        desc: "Complete Next.js 15 App Router, React 19, TypeScript, and Prisma ORM source code with no obfuscated code or locks.",
        icon: Code,
      },
      {
        title: "Zero Third-Party Media API Fees",
        desc: "Powered directly by self-hosted yt-dlp and FFmpeg binaries, eliminating expensive recurring per-request media scraper API subscriptions.",
        icon: ShieldCheck,
      },
      {
        title: "Bring Your Own Gemini API Key",
        desc: "Plug in your own Google Gemini API key for high-speed transcription and summarization with near-zero operating costs.",
        icon: Key,
      },
    ],
    sourceCodeOffer: {
      fixedPrice: 1999,
      originalPrice: 49999,
      discountPercentage: 96,
      licenseName: "Full Commercial & Resale White-Label License",
      deliveryMethod: "Instant Encrypted Download (5-Min Expiring Session)",
      deliverables: [
        "Complete MediaDocks Next.js 15 App Router & React 19 Codebase",
        "Integrated Python yt-dlp & FFmpeg Dynamic Muxing Stream Engine",
        "Google Gemini AI Audio Transcription & Summarization Pipeline",
        "Self-Hosted MySQL 8.4 Schema & Prisma ORM 6.4 Data Models",
        "Anonymous Rotating Salted Analytics & /superadmin Management Dashboard",
        "Production Nginx Configuration, PM2 ecosystem.config.cjs & deploy.sh",
        "Multi-Stage Alpine Dockerfile & Docker Compose Environment",
        "Comprehensive 12-Step VPS Deployment & Maintenance Documentation",
      ],
      featuresIncluded: [
        "Universal media extraction for YouTube, Instagram, Facebook, X, Pinterest",
        "Dynamic resolution ladder from 144p up to 1080p, 2K, 4K, and 8K",
        "On-the-fly audio extraction (MP3 at 128/192/320 kbps, M4A, Opus)",
        "Integrated Google Gemini AI speech-to-text and structured summary",
        "Ephemeral streaming pipeline with zero permanent server disk usage",
        "Self-healing health checks (/api/health) with binary auto-detection",
        "Privacy-preserving analytics with daily rotating salted SHA-256 hashes",
        "Light & Dark theme persistence with next-themes and Tailwind CSS v4",
      ],
      techStackDetailed: [
        {
          category: "Frontend",
          techs: ["Next.js 15.1.7 (App Router)", "React 19", "TypeScript 5.7.3", "Tailwind CSS v4.0.6", "Radix UI", "Lucide React", "React Hook Form", "Zod 3.24", "Sonner", "Vaul", "next-themes", "clsx & tailwind-merge"],
        },
        {
          category: "Backend & Extraction Engine",
          techs: ["Node.js 20+ / 22 LTS", "Next.js API Routes", "yt-dlp (Python)", "FFmpeg & FFprobe", "Cheerio 1.0.0", "Google Gemini API (3.8 Flash / 3.1 Flash-Lite)"],
        },
        {
          category: "Database & Models",
          techs: ["MySQL 8.4 / 8.x", "Prisma ORM 6.4.1", "MediaRequest Cache (TTL 30m)", "AnalyticsEvent (Salted)", "SuperAdmin (scrypt)"],
        },
        {
          category: "DevOps & Infrastructure",
          techs: ["PM2 Process Manager", "Nginx Reverse Proxy", "Let's Encrypt (Certbot)", "Docker & Compose", "Bash deploy.sh"],
        },
      ],
    },
    interactiveCapabilities: [
      {
        title: "Dynamic Resolution Ladder & Muxing",
        subtitle: "144p to 8K Remuxing & Clean MP3",
        description: "Merges separate high-definition video-only and audio streams on-the-fly using self-hosted FFmpeg and yt-dlp, delivering pristine 1080p, 2K, 4K, and 8K downloads alongside clean MP3 audio up to 320 kbps.",
        metrics: "Up to 8K & 320 kbps",
        badge: "Core Media Engine",
        previewNote: "Eliminates low-quality third-party APIs by executing native FFmpeg stream remuxing on your VPS.",
      },
      {
        title: "AI Speech-to-Text & Summaries",
        subtitle: "Google Gemini Intelligence Pipeline",
        description: "Extracts video speech, converts audio, and pipes directly to Google Gemini 3.8 Flash and 3.1 Flash-Lite to deliver instant time-coded transcripts and structured bullet summaries.",
        metrics: "< 5s AI Summary",
        badge: "AI Transcription",
        previewNote: "Configured with automatic fallback and zero audio retention post-processing.",
      },
      {
        title: "Zero Permanent Storage Architecture",
        subtitle: "Ephemeral Piping & Auto-Purge",
        description: "Engineered with strict data privacy: zero download history, zero personal identifiers, and ephemeral stream chunking that purges temporary media buffers automatically (TTL 30 min).",
        metrics: "100% Privacy-Preserving",
        badge: "Ephemeral Pipeline",
        previewNote: "Compliant with international privacy standards—never stores user IPs or requested media.",
      },
      {
        title: "Anonymous Salted Analytics & SuperAdmin",
        subtitle: "Daily Rotating Salt Security",
        description: "Tracks platform adoption and popular media domains using daily rotating cryptographic salts. Includes a protected /superadmin dashboard secured with scrypt password hashing.",
        metrics: "Zero IP / URL Logging",
        badge: "Privacy Analytics",
        previewNote: "Monitors platform throughput and binary health without compromising user anonymity.",
      },
    ],
    faqs: [
      {
        q: "How does MediaDocks stream 1080p, 4K, and 8K videos without third-party APIs?",
        a: "Most major platforms serve video and audio as separate adaptive streams for resolutions higher than 720p. MediaDocks executes self-hosted yt-dlp to inspect format manifests and pipes both streams through an optimized local FFmpeg process that muxes audio and video on-the-fly into a single MP4 container without re-encoding delays.",
      },
      {
        q: "How does the Google Gemini AI transcription and summarization work?",
        a: "When a user selects the 'Transcribe & Summarize' action, MediaDocks extracts the ephemeral audio track, samples it, and sends it to the Google Gemini API (gemini-3.8-flash / gemini-3.1-flash-lite). Gemini generates full transcripts and structured bulleted key takeaways in seconds.",
      },
      {
        q: "Does MediaDocks store user downloads or personal data on the server?",
        a: "No! MediaDocks is engineered on a zero-permanent-storage philosophy. Streams are piped directly to the client's browser socket. Any temporary chunk files stored during muxing are placed in an ephemeral directory with an automatic 30-minute TTL purge. Analytics utilize daily rotating salted SHA-256 hashes, ensuring zero IP addresses or URLs are ever recorded.",
      },
      {
        q: "How does tool discovery and self-healing binary detection work?",
        a: "On startup and at /api/health, MediaDocks inspects system PATHs and custom environment variables (PYTHON_PATH, FFMPEG_PATH) to detect local yt-dlp, FFmpeg, and FFprobe binaries. If a binary is missing or outdated, clear diagnostic statuses are surfaced with automated fallback routing.",
      },
      {
        q: "What server specifications are recommended for self-hosting MediaDocks?",
        a: "A standard Linux VPS with 2 vCPUs, 2 GB to 4 GB RAM, and 20 GB SSD (such as a Hetzner CPX11/CPX21, DigitalOcean Droplet, or Contabo VPS) running Ubuntu 22.04 or 24.04 LTS is ideal for handling concurrent extractions and FFmpeg stream remuxing smoothly.",
      },
    ],
    comprehensiveTechStack: [
      {
        category: "Frontend Architecture",
        description: "App Router, modern React 19 primitives, strict type safety, and responsive UI.",
        items: [
          { name: "Next.js 15.1.7 (App Router)", details: "React Server Components, standalone output & API routes", url: "https://nextjs.org/" },
          { name: "React / React DOM 19.0.0", details: "Modern React 19 UI component model & hooks", url: "https://react.dev/" },
          { name: "TypeScript 5.7.3", details: "Strict static typing across frontend & backend routes", url: "https://www.typescriptlang.org/" },
          { name: "Tailwind CSS v4.0.6", details: "Utility-first CSS styling engine with @tailwindcss/postcss", url: "https://tailwindcss.com/" },
          { name: "tw-animate-css", details: "Smooth CSS animations and micro-interactions" },
          { name: "Radix UI Primitives", details: "Accessible primitives (Dialog, Dropdown, Tabs, Accordion, Slider)", url: "https://www.radix-ui.com/" },
          { name: "Lucide React 0.475.0", details: "Crisp SVG icon library across all platform interfaces", url: "https://lucide.dev/" },
          { name: "React Hook Form 7.54 & Zod 3.24", details: "Form handling, input validation, and @hookform/resolvers", url: "https://zod.dev/" },
          { name: "Sonner & Vaul", details: "Toast notifications (Sonner) and responsive mobile drawer (Vaul)" },
          { name: "next-themes", details: "Light / Dark mode persistence without hydration flash" },
          { name: "clsx & tailwind-merge", details: "Conditional class merging via cn() utility" },
        ],
      },
      {
        category: "Backend & Extraction Engine",
        description: "Self-hosted media stream extraction, stream muxing, and AI transcription.",
        items: [
          { name: "Node.js (LTS 20+ / 22)", details: "High-performance asynchronous server runtime", url: "https://nodejs.org/" },
          { name: "Next.js API Route Handlers", details: "Endpoints for /api/resolve, /api/download, /api/health, /api/transcribe, /api/admin" },
          { name: "yt-dlp (Self-Hosted)", details: "Python-based open-source media stream resolution engine", url: "https://github.com/yt-dlp/yt-dlp" },
          { name: "FFmpeg & FFprobe", details: "Stream muxing (video+audio), transcoding, and MP3 audio conversion", url: "https://ffmpeg.org/" },
          { name: "Cheerio 1.0.0", details: "Lightweight HTML metadata parser fallback for open web feeds", url: "https://cheerio.js.org/" },
          { name: "Google Gemini API", details: "Gemini 3.8 Flash & 3.1 Flash-Lite for speech-to-text & summarization", url: "https://ai.google.dev/" },
        ],
      },
      {
        category: "Database & Persistence",
        description: "Ephemeral link caches, privacy-preserving analytics, and admin authentication.",
        items: [
          { name: "MySQL 8.x / 8.4", details: "High-concurrency relational database engine", url: "https://www.mysql.com/" },
          { name: "Prisma ORM v6.4.1", details: "Type-safe database schema definition, migrations, and queries", url: "https://www.prisma.io/" },
          { name: "MediaRequest Model", details: "Short-lived link metadata cache with automatic 30m TTL expiration" },
          { name: "AnalyticsEvent Model", details: "Privacy-preserving telemetry using daily rotating salted hashes" },
          { name: "SuperAdmin Model", details: "Admin authentication with secure scrypt password hashing" },
        ],
      },
      {
        category: "DevOps & Infrastructure",
        description: "Production process management, Nginx proxy, SSL, and automated deployment.",
        items: [
          { name: "PM2 Process Manager", details: "Daemon clustering, memory limit auto-restart & ecosystem config", url: "https://pm2.keymetrics.io/" },
          { name: "Nginx Reverse Proxy", details: "Port forwarding (3010), SSL termination, HTTP/2, gzip compression", url: "https://nginx.org/" },
          { name: "Let's Encrypt (Certbot)", details: "Automated HTTPS certificates with auto-renewal cron", url: "https://certbot.eff.org/" },
          { name: "Docker & Docker Compose", details: "Multi-stage Alpine containerization for portable deployments", url: "https://www.docker.com/" },
          { name: "deploy.sh Bash Automation", details: "Automated zero-downtime rebuild, migration, and health verification script" },
        ],
      },
    ],
    vpsDeploymentGuide: {
      overview: {
        os: "Ubuntu 22.04 / 24.04 LTS",
        processManager: "PM2 (Port 3010)",
        reverseProxy: "Nginx (SSL via Let's Encrypt Certbot)",
        database: "MySQL 8.x / 8.4",
        storagePath: "/var/www/mediadocks/storage/tmp",
        appPath: "/var/www/mediadocks",
      },
      steps: [
        {
          stepNumber: 1,
          title: "System Package Updates & Prerequisites",
          description: "Update package repositories and install essential build tools and utilities.",
          command: `sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget gnupg2 ca-certificates lsb-release build-essential git`,
        },
        {
          stepNumber: 2,
          title: "Install Node.js (v20+ or v22 LTS)",
          description: "Install Node.js LTS via the official NodeSource repository and verify installation.",
          command: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v    # Verify: should be v20.x or higher
npm -v`,
        },
        {
          stepNumber: 3,
          title: "Install Python, pip, FFmpeg & yt-dlp",
          description: "MediaDocks requires Python 3, FFmpeg, and yt-dlp for media extraction and stream remuxing.",
          command: `# Install Python and FFmpeg
sudo apt install -y python3 python3-pip ffmpeg
# Install yt-dlp globally
sudo pip3 install -U yt-dlp --break-system-packages
# Verify installations
ffmpeg -version
yt-dlp --version`,
        },
        {
          stepNumber: 4,
          title: "Install and Secure MySQL Server",
          description: "Install MySQL Server, enable the service, and create the dedicated MediaDocks database and user.",
          command: `sudo apt install -y mysql-server
sudo systemctl enable --now mysql
sudo mysql`,
          codeSnippet: {
            language: "sql",
            filename: "MySQL Initialization Script",
            code: `CREATE DATABASE mediadocks CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'mediadocks_user'@'localhost' IDENTIFIED BY 'YourSecurePasswordHere';
GRANT ALL PRIVILEGES ON mediadocks.* TO 'mediadocks_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;`,
          },
        },
        {
          stepNumber: 5,
          title: "Install Global PM2 Process Manager",
          description: "Install PM2 globally for production daemonization, clustering, and auto-restart on memory limit.",
          command: `sudo npm install -g pm2`,
        },
        {
          stepNumber: 6,
          title: "Clone Codebase to the Server",
          description: "Create the web root directory /var/www/mediadocks, set permissions, and clone your repository.",
          command: `sudo mkdir -p /var/www/mediadocks
sudo chown -R $USER:$USER /var/www/mediadocks
git clone <repo-url> /var/www/mediadocks
cd /var/www/mediadocks`,
        },
        {
          stepNumber: 7,
          title: "Configure Environment Variables",
          description: "Copy .env.example to .env and configure database connection, public URL, Gemini API key, and salts.",
          command: `cp .env.example .env
nano .env`,
          codeSnippet: {
            language: "bash",
            filename: "/var/www/mediadocks/.env",
            code: `# Database configuration
DATABASE_URL="mysql://mediadocks_user:YourSecurePasswordHere@127.0.0.1:3306/mediadocks"

# Public App URL (critical for canonical links and OpenGraph)
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NEXT_PUBLIC_API_URL=

# Resolver Settings
MOCK_RESOLVER=false
DEBUG_RESOLVER=false
STORAGE_PATH=./storage/tmp
MEDIA_TTL_MINUTES=30

# Extraction engine
ENGINE_ENABLED=true
PYTHON_PATH=python3

# Google Gemini API (for audio/video transcription and summary)
GEMINI_API_KEY="your-google-gemini-api-key"

# Analytics Security Salt (Generate via: openssl rand -hex 32)
ANALYTICS_ENABLED=true
ANALYTICS_SALT="run_openssl_rand_hex_32_to_get_a_salt"

# SuperAdmin Configuration (Generate secret via: openssl rand -hex 32)
SUPER_ADMIN_EMAIL="admin@yourdomain.com"
SUPER_ADMIN_PASS="YourSuperAdminPassword"
ADMIN_SESSION_SECRET="run_openssl_rand_hex_32_to_get_a_secret"`,
          },
        },
        {
          stepNumber: 8,
          title: "Install Dependencies, Migrate Database & Initialize Admin",
          description: "Install production Node packages, generate Prisma Client, apply database models, and create SuperAdmin.",
          command: `cd /var/www/mediadocks
# Install npm dependencies
npm ci --prefer-offline --no-audit
# Generate Prisma Client & apply database schema
npx prisma generate
npx prisma db push
# Create SuperAdmin account in database
npm run admin:create`,
        },
        {
          stepNumber: 9,
          title: "Build the Application",
          description: "Compile the Next.js standalone server bundle and verify standalone output generation.",
          command: `npm run build
# Verify that .next/standalone/server.js was created.`,
        },
        {
          stepNumber: 10,
          title: "Start Application with PM2",
          description: "Launch MediaDocks on port 3010 using ecosystem.config.cjs, save state, and verify health check.",
          command: `# Create log directory
mkdir -p logs
# Start process
pm2 start ecosystem.config.cjs --env production
# Save PM2 state to restart automatically across server reboots
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2-startup install
# Verify health
curl http://127.0.0.1:3010/api/health`,
        },
        {
          stepNumber: 11,
          title: "Configure Nginx as Reverse Proxy",
          description: "Create an Nginx configuration file with static asset cache optimization and reverse proxy to port 3010.",
          command: `sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/mediadocks`,
          codeSnippet: {
            language: "nginx",
            filename: "/etc/nginx/sites-available/mediadocks",
            code: `server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    client_max_body_size 100M;

    # Static assets cache optimization
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3010;
        proxy_set_header Host $host;
        expires 365d;
        access_log off;
    }

    location /public/ {
        proxy_pass http://127.0.0.1:3010;
        proxy_set_header Host $host;
        expires 30d;
        access_log off;
    }

    # Main reverse proxy
    location / {
        proxy_pass http://127.0.0.1:3010;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
          },
          note: "Enable site with: sudo ln -s /etc/nginx/sites-available/mediadocks /etc/nginx/sites-enabled/ && sudo nginx -t && sudo systemctl reload nginx",
        },
        {
          stepNumber: 12,
          title: "Obtain Free SSL via Let's Encrypt (Certbot)",
          description: "Install Certbot, obtain automated SSL certificates for your domain, and enable automatic HTTPS redirect.",
          command: `sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com`,
          note: "Select automatic redirect to HTTPS. Your MediaDocks deployment is now live and secure!",
        },
      ],
    },
    vpsRedeploymentGuide: {
      manualSteps: [
        { step: "1. Navigate to project root", command: "cd /var/www/mediadocks" },
        { step: "2. Pull latest code", command: "git pull origin main" },
        { step: "3. Update packages & yt-dlp", command: "npm ci --prefer-offline --no-audit && sudo pip3 install -U yt-dlp --break-system-packages" },
        { step: "4. Sync Prisma Schema", command: "npx prisma generate && npx prisma db push" },
        { step: "5. Rebuild production bundle", command: "npm run build" },
        { step: "6. Reload PM2 (Zero-Downtime)", command: "pm2 reload ecosystem.config.cjs --env production --only mediadocks && pm2 save" },
        { step: "7. Verify status & health", command: "curl -I http://127.0.0.1:3010/api/health && pm2 logs mediadocks --lines 50" },
      ],
      deployScriptFilename: "deploy.sh",
      deployScript: `#!/usr/bin/env bash
set -e
PROJECT_DIR="/var/www/mediadocks"
APP_NAME="mediadocks"

echo "==========================================="
echo "  🚀 Starting MediaDocks Auto-Redeployment"
echo "==========================================="
cd "$PROJECT_DIR"

echo "📥 [1/6] Pulling latest code changes..."
git pull origin main

echo "📦 [2/6] Updating Node dependencies & yt-dlp..."
npm ci --prefer-offline --no-audit
sudo pip3 install -U yt-dlp --break-system-packages

echo "🗄️  [3/6] Syncing Prisma schema & client..."
npx prisma generate
npx prisma db push

echo "🏗️  [4/6] Building production standalone bundle..."
npm run build

echo "🔄 [5/6] Reloading PM2 process (zero downtime)..."
pm2 reload ecosystem.config.cjs --env production --only "$APP_NAME"
pm2 save

echo "✅ [6/6] Verifying health check endpoint..."
curl -s -f http://127.0.0.1:3010/api/health || echo "Health check warning"

echo "==========================================="
echo "  🎉 MediaDocks redeployment completed!"
echo "==========================================="`,
      rollbackPlan: [
        { step: "YouTube extraction fails", command: "sudo pip3 install -U yt-dlp --break-system-packages && pm2 reload ecosystem.config.cjs", explanation: "Outdated yt-dlp platform extractor. Updating binary resolves upstream changes." },
        { step: "Port 3010 already in use", command: "pm2 restart mediadocks || lsof -i :3010", explanation: "Lingering Node process on port 3010. Restart PM2 or kill orphaned PID." },
        { step: "Static files or logos 404", command: "node scripts/prepare-standalone.mjs || ./deploy.sh", explanation: "Missing standalone assets. Re-sync .next/static and public into .next/standalone." },
        { step: "FFmpeg missing in health check", command: "sudo apt install -y ffmpeg", explanation: "FFmpeg not found in system PATH. Specify FFMPEG_PATH=/usr/bin/ffmpeg in .env." },
        { step: "Admin login failing", command: "npm run admin:check || npm run admin:create", explanation: "Invalid scrypt hash or salt. Reset password using admin:create CLI utility." },
        { step: "Emergency rollback to previous commit", command: "git checkout HEAD@{1} && npm run build && pm2 reload ecosystem.config.cjs", explanation: "Revert immediately to previous working git revision." },
      ],
    },
  },
};

// Aliases for user convenience / alternate naming
productDetails["medicdocks"] = productDetails["mediadocks"];

/* ─────────────────────── Dynamic Custom Products Registry ─────────────────────── */
const dynamicCustomProducts: Record<string, ProductDetail> = {};

const iconMap: Record<string, LucideIcon> = {
  FileText, ShieldCheck, Clock, Sparkles, Server, Database, BarChart3,
  Inbox, MessageCircle, TrendingUp, MapPin, Globe, Bell, Calendar,
  Users, Bot, Workflow, Search, Brain, Target, Shield, Zap,
  Layers, Code, Palette, Mail, Lock, Cpu, Terminal, Gauge,
  CheckCircle, Star, Crown, Building2, Headphones, BookOpen,
  CreditCard, GitBranch, Key, RefreshCw, Smartphone, HeartPulse, Video, Briefcase,
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
    title: w.title || "Commercial Right",
    desc: w.desc || "",
    icon: resolveIcon(w.icon || w.iconName),
  }));

  const rawUrl = p.url || "";
  const cleanUrl = rawUrl.startsWith("http://") || rawUrl.startsWith("https://") ? rawUrl : `https://${rawUrl}`;

  const sourceCodeOffer: SourceCodeOffer = {
    fixedPrice: Number(p.sourceCodeOffer?.fixedPrice ?? 1999),
    originalPrice: Number(p.sourceCodeOffer?.originalPrice ?? 49999),
    discountPercentage: Number(p.sourceCodeOffer?.discountPercentage ?? 96),
    licenseName: p.sourceCodeOffer?.licenseName || "Source Code License",
    deliveryMethod: p.sourceCodeOffer?.deliveryMethod || "Instant Encrypted Download (5-Min Expiring Session)",
    legalDisclaimer: p.sourceCodeOffer?.legalDisclaimer || "Important: You must rebrand and change the original product name, brand identity, and logos before deploying to production. Deploying or operating under the original product name without modification may result in copyright or trademark infringement.",
    deliverables: p.sourceCodeOffer?.deliverables?.length
      ? p.sourceCodeOffer.deliverables
      : [
          `Complete ${name} Frontend Codebase`,
          "Node.js Backend & API Microservices",
          "Production Docker Compose & Deployment Scripts",
          "100% Custom Rebranding Documentation",
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
        previewNote: cap.previewNote || "Full commercial source code included.",
      }))
    : [
        {
          title: "Automated Core Engine",
          subtitle: "Autonomous Pipeline",
          description: p.heroDesc || "High-throughput automation pipeline delivering instant results with zero manual friction.",
          metrics: "< 15s latency",
          badge: "Core AI",
          previewNote: "Full commercial source code included.",
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
          a: "You receive immediate access to the complete, unminified source code repository with 100% commercial rights and zero recurring royalties.",
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
    demoCredentials: p.demoCredentials || {
      username: id === "briefvault" ? "demobriefvault@gmail.com" : `demo${id.replace(/[^a-z0-9]/g, "")}@gmail.com`,
      password: "Demo@2026",
      note: "Instant sandbox credentials for testing live functionality.",
    },
  };
}

export function getDemoCredentials(p: { id: string; demoCredentials?: DemoCredentials }): DemoCredentials {
  if (p.demoCredentials?.username && p.demoCredentials?.password) {
    return p.demoCredentials;
  }
  const cleanId = (p.id || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  return {
    username: cleanId === "briefvault" ? "demobriefvault@gmail.com" : `demo${cleanId || "product"}@gmail.com`,
    password: "Demo@2026",
    note: "Instant sandbox credentials for testing live functionality.",
  };
}

/* ─────────────────────── Dynamic Pricing Overrides ─────────────────────── */
export interface ProductPriceOverride {
  productId: string;
  fixedPrice: number;
  originalPrice: number;
  discountPercentage: number;
  updatedAt?: string;
}

const dynamicPricingOverrides: Record<string, ProductPriceOverride> = {};

export function registerPricingOverrides(
  overrides: Record<string, { fixedPrice: number; originalPrice?: number; discountPercentage?: number }>,
  saveStorage = true
): void {
  if (!overrides || typeof overrides !== "object") return;
  let modified = false;

  for (const [id, ov] of Object.entries(overrides)) {
    if (!id || !ov) continue;
    const lower = id.toLowerCase().trim();
    const fixed = Number(ov.fixedPrice);
    if (isNaN(fixed) || fixed <= 0) continue;
    const original = Number(ov.originalPrice) || Math.max(fixed * 10, 49999);
    const discount = ov.discountPercentage !== undefined
      ? Number(ov.discountPercentage)
      : Math.max(1, Math.min(99, Math.round(((original - fixed) / original) * 100)));

    dynamicPricingOverrides[lower] = {
      productId: lower,
      fixedPrice: fixed,
      originalPrice: original,
      discountPercentage: discount,
    };

    if (productDetails[lower]?.sourceCodeOffer) {
      productDetails[lower].sourceCodeOffer.fixedPrice = fixed;
      productDetails[lower].sourceCodeOffer.originalPrice = original;
      productDetails[lower].sourceCodeOffer.discountPercentage = discount;
    }
    if (dynamicCustomProducts[lower]?.sourceCodeOffer) {
      dynamicCustomProducts[lower].sourceCodeOffer.fixedPrice = fixed;
      dynamicCustomProducts[lower].sourceCodeOffer.originalPrice = original;
      dynamicCustomProducts[lower].sourceCodeOffer.discountPercentage = discount;
    }
    modified = true;
  }

  if (modified && typeof window !== "undefined" && saveStorage) {
    try {
      localStorage.setItem("sap_pricing_overrides", JSON.stringify(dynamicPricingOverrides));
      window.dispatchEvent(new CustomEvent("sap_products_updated", { detail: dynamicPricingOverrides }));
    } catch {
      // Ignore
    }
  }
}

export function getPricingOverride(productId: string): ProductPriceOverride | undefined {
  return dynamicPricingOverrides[productId.toLowerCase().trim()];
}

export function getAllPricingOverrides(): Record<string, ProductPriceOverride> {
  return { ...dynamicPricingOverrides };
}

// Check localStorage on browser initialization for pricing overrides
if (typeof window !== "undefined") {
  try {
    const storedPrices = localStorage.getItem("sap_pricing_overrides");
    if (storedPrices) {
      const parsed = JSON.parse(storedPrices);
      if (parsed && typeof parsed === "object") {
        registerPricingOverrides(parsed, false);
      }
    }
  } catch (e) {
    // Ignore parse error
  }
}

export function registerCustomProducts(products: (ProductDetail | any)[]): void {
  for (const p of products) {
    if (!p || !p.id) continue;
    const normalized = normalizeProduct(p);
    const lower = normalized.id.toLowerCase();
    
    // Apply dynamic price override if already present
    const override = dynamicPricingOverrides[lower];
    if (override && normalized.sourceCodeOffer) {
      normalized.sourceCodeOffer.fixedPrice = override.fixedPrice;
      normalized.sourceCodeOffer.originalPrice = override.originalPrice;
      normalized.sourceCodeOffer.discountPercentage = override.discountPercentage;
    }

    dynamicCustomProducts[lower] = normalized;
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
 * Fetch and synchronize custom products and pricing overrides from the backend API
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
        if (data.pricingOverrides && typeof data.pricingOverrides === "object") {
          registerPricingOverrides(data.pricingOverrides);
        }
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
  let lower = id.toLowerCase().trim();
  if (lower === "medicdocks") lower = "mediadocks";
  const prod = productDetails[lower] || dynamicCustomProducts[lower];
  if (!prod) return undefined;

  const override = dynamicPricingOverrides[lower];
  if (override && prod.sourceCodeOffer) {
    return {
      ...prod,
      sourceCodeOffer: {
        ...prod.sourceCodeOffer,
        fixedPrice: override.fixedPrice,
        originalPrice: override.originalPrice,
        discountPercentage: override.discountPercentage,
      },
    };
  }

  return prod;
}

export function getAllProductDetails(): ProductDetail[] {
  const customList = Object.values(dynamicCustomProducts).filter(
    (cp) => !productDetails[cp.id.toLowerCase()]
  );
  const uniqueProducts = Object.values(productDetails).filter((p, index, self) =>
    index === self.findIndex((item) => item.id === p.id)
  );
  const all = [...uniqueProducts, ...customList];

  return all.map((p) => {
    const lower = p.id.toLowerCase();
    const override = dynamicPricingOverrides[lower];
    if (override && p.sourceCodeOffer) {
      return {
        ...p,
        sourceCodeOffer: {
          ...p.sourceCodeOffer,
          fixedPrice: override.fixedPrice,
          originalPrice: override.originalPrice,
          discountPercentage: override.discountPercentage,
        },
      };
    }
    return p;
  });
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
      {
        id: "mediadocks",
        name: "MediaDocks",
        tagline: "Universal Media Extraction & AI Transcription",
        url: "/products/mediadocks",
        badge: "AI Media",
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
      {
        id: "aihospitalerp",
        name: "AiHospitalERP",
        tagline: "AI Multi-Tenant Hospital & Clinic ERP System",
        url: "/products/aihospitalerp",
        badge: "Healthcare AI",
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
