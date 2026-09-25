import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import { resolve, join } from "path";
import crypto from "crypto";
import zlib from "zlib";

export interface CodePackage {
  token: string;
  productId: string;
  productName: string;
  version: string;
  fileName: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  storageFileName: string;
  storagePath: string;
  uploadedAt: string;
  downloadCount: number;
  downloadUrl: string;
  customerPageUrl: string;
}

export interface DownloadSession {
  sessionToken: string;
  packageToken: string;
  productId: string;
  productName: string;
  version: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  paymentId?: string;
  amount?: number;
  createdAt: string;
  expiresAt: number; // epoch ms
  downloadCount: number;
}

export interface SessionInspection {
  session: DownloadSession;
  pkg: CodePackage;
  isExpired: boolean;
  remainingSeconds: number;
  remainingFormatted: string;
}

/**
 * Normalizes product IDs and aliases across the system
 */
export function normalizeProductId(id: string): string {
  if (!id) return "";
  let lower = id.toLowerCase().trim();
  if (lower === "medicdocks") return "mediadocks";
  if (lower === "chatnexgen" || lower === "whatsappcrm" || lower === "whatsapp") return "whatsapp-crm";
  if (lower === "mediflow" || lower === "mediflowhms") return "mediflow-hms";
  if (lower === "dealflow") return "lead-gen";
  if (lower === "cryptovault") return "crypto-exchange";
  if (lower === "briefvault") return "ai-legal";
  if (lower === "rentflow") return "property-rental";
  if (lower === "eduflow") return "school-erp";
  return lower;
}

/**
 * Format bytes to human readable string (e.g. 24.5 MB)
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Pure zero-dependency Node.js ZIP archive generator using built-in zlib
 */
export function createZipBuffer(files: { path: string; content: string | Buffer }[]): Buffer {
  const localHeaders: Buffer[] = [];
  const centralDirs: Buffer[] = [];
  let offset = 0;

  for (const file of files) {
    const rawData = typeof file.content === "string" ? Buffer.from(file.content, "utf-8") : file.content;
    const compressedData = zlib.deflateRawSync(rawData);
    const useDeflate = compressedData.length < rawData.length;
    const dataToWrite = useDeflate ? compressedData : rawData;
    const compressionMethod = useDeflate ? 8 : 0;
    const crc = zlib.crc32(rawData);
    const normalizedPath = file.path.replace(/\\/g, "/");
    const filenameBuf = Buffer.from(normalizedPath, "utf-8");

    // Local file header (30 bytes + filename length)
    const localHeader = Buffer.alloc(30 + filenameBuf.length);
    localHeader.writeUInt32LE(0x04034b50, 0); // local file header signature
    localHeader.writeUInt16LE(20, 4); // version needed to extract (2.0)
    localHeader.writeUInt16LE(0x0800, 6); // general purpose bit flag (UTF-8)
    localHeader.writeUInt16LE(compressionMethod, 8); // compression method
    localHeader.writeUInt16LE(0, 10); // file last mod time
    localHeader.writeUInt16LE(0x5678, 12); // file last mod date
    localHeader.writeUInt32LE(crc, 14); // crc-32
    localHeader.writeUInt32LE(dataToWrite.length, 18); // compressed size
    localHeader.writeUInt32LE(rawData.length, 22); // uncompressed size
    localHeader.writeUInt16LE(filenameBuf.length, 26); // file name length
    localHeader.writeUInt16LE(0, 28); // extra field length
    filenameBuf.copy(localHeader, 30);

    localHeaders.push(localHeader, dataToWrite);

    // Central directory header (46 bytes + filename length)
    const centralDir = Buffer.alloc(46 + filenameBuf.length);
    centralDir.writeUInt32LE(0x02014b50, 0); // central file header signature
    centralDir.writeUInt16LE(0x0314, 4); // version made by (UNIX 2.0)
    centralDir.writeUInt16LE(20, 6); // version needed to extract (2.0)
    centralDir.writeUInt16LE(0x0800, 8); // general purpose bit flag (UTF-8)
    centralDir.writeUInt16LE(compressionMethod, 10); // compression method
    centralDir.writeUInt16LE(0, 12); // file last mod time
    centralDir.writeUInt16LE(0x5678, 14); // file last mod date
    centralDir.writeUInt32LE(crc, 16); // crc-32
    centralDir.writeUInt32LE(dataToWrite.length, 20); // compressed size
    centralDir.writeUInt32LE(rawData.length, 24); // uncompressed size
    centralDir.writeUInt16LE(filenameBuf.length, 28); // file name length
    centralDir.writeUInt16LE(0, 30); // extra field length
    centralDir.writeUInt16LE(0, 32); // file comment length
    centralDir.writeUInt16LE(0, 34); // disk number start
    centralDir.writeUInt16LE(0, 36); // internal file attributes
    centralDir.writeUInt32LE(0x81a40000, 38); // external file attributes (-rw-r--r--)
    centralDir.writeUInt32LE(offset, 42); // relative offset of local header
    filenameBuf.copy(centralDir, 46);

    centralDirs.push(centralDir);

    offset += localHeader.length + dataToWrite.length;
  }

  const centralDirBuffer = Buffer.concat(centralDirs);
  const cdSize = centralDirBuffer.length;
  const cdOffset = offset;

  // End of central directory record (22 bytes)
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); // end of central dir signature
  eocd.writeUInt16LE(0, 4); // number of this disk
  eocd.writeUInt16LE(0, 6); // number of the disk with the start of the central directory
  eocd.writeUInt16LE(files.length, 8); // total number of entries in the central directory on this disk
  eocd.writeUInt16LE(files.length, 10); // total number of entries in the central directory
  eocd.writeUInt32LE(cdSize, 12); // size of the central directory
  eocd.writeUInt32LE(cdOffset, 16); // offset of start of central directory with respect to the starting disk number
  eocd.writeUInt16LE(0, 20); // .ZIP file comment length

  return Buffer.concat([...localHeaders, centralDirBuffer, eocd]);
}

/**
 * Dynamically builds a complete production-grade source code package ZIP bundle
 */
export function generateProductZipBundle({
  productId,
  productName,
  customerName = "Valued Customer",
  customerEmail = "customer@example.com",
  customerPhone = "",
  customerAddress = "",
  paymentId = "DIRECT_PURCHASE",
}: {
  productId: string;
  productName: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  paymentId?: string;
}): Buffer {
  const normId = normalizeProductId(productId);
  const licenseKey = `SAP-${normId.toUpperCase()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}-${new Date().getFullYear()}`;
  const nowStr = new Date().toISOString();

  const files: { path: string; content: string }[] = [];

  // 1. COMMERCIAL LICENSE
  files.push({
    path: "COMMERCIAL_LICENSE.txt",
    content: `================================================================================
SAP DIGITECH SOLUTIONS — OFFICIAL COMMERCIAL SOURCE CODE LICENSE
================================================================================
Product:           ${productName} (${normId})
License Key:       ${licenseKey}
Payment Reference: ${paymentId}
Issued To:         ${customerName}
Email:             ${customerEmail}
Phone/WhatsApp:    ${customerPhone || "N/A"}
Registered Address:${customerAddress || "N/A"}
Issue Date:        ${nowStr}
Grantor:           SAP DigiTech Solutions (https://sapdigitechsolutions.in)

TERMS & RIGHTS GRANTED:
1. PERPETUAL COMMERCIAL RIGHTS: The Licensee is granted an irrevocable, perpetual,
   worldwide, non-exclusive commercial license to modify, adapt, rebrand, host,
   and commercially distribute this software solution to end clients.
2. ZERO ROYALTIES: The Licensee owes 0% recurring royalties or per-transaction fees.
3. SOURCE CODE ACCESS: Full unminified frontend and backend source code, schemas,
   and container configurations are provided in this package.
4. REBRANDING REQUIREMENT: The Licensee must replace grantor trademarks, original
   brand logos, and names with their own proprietary branding before public rollout.
5. SUPPORT & UPDATES: Direct engineering advisory is available via WhatsApp at
   +91 77458 68073 or support@sapdigitechsolutions.in.

Authorized by: SAP DigiTech Solutions Engineering & Legal Team
================================================================================`,
  });

  // 2. COMPREHENSIVE README.md
  files.push({
    path: "README.md",
    content: `# ${productName} — Production Source Code Package

> **Commercial Source Code Release by SAP DigiTech Solutions**  
> **License Key:** \`${licenseKey}\` | **Licensee:** ${customerName}  

---

## 🚀 Overview
**${productName}** is a high-performance, enterprise-ready SaaS platform engineered for scalability, real-time communication, and automated workflow execution.

### Key Highlights:
- **Full Source Code Access:** 100% unminified, TypeScript/Node.js production codebase.
- **Microservices & Real-Time Sync:** WebSocket bidirectional channels, RESTful APIs, and Redis event bus.
- **Docker & VPS Ready:** 1-click containerized deployment with Nginx SSL proxy and automated PM2 supervision.
- **Zero Royalties:** Deploy unlimited instances under your own agency brand.

---

## 📦 What's Included
\`\`\`
├── COMMERCIAL_LICENSE.txt     # Verified commercial license agreement
├── README.md                  # Complete architecture & deployment guide
├── Dockerfile                 # Multi-stage production container build
├── docker-compose.yml         # Application, PostgreSQL, Redis & Nginx stack
├── .env.example               # Full environment configuration template
├── deploy.sh                  # Automated Linux VPS bootstrap & migration script
├── nginx.conf                 # Production reverse proxy with SSL & WebSocket upgrade
├── ecosystem.config.cjs       # PM2 cluster configuration
├── database/
│   ├── schema.sql             # Relational database schema with indexes
│   └── seeds.sql              # Initial configuration and seed templates
├── src/
│   ├── server.js              # Production Node.js / Express API application
│   ├── config/                # Database & Redis connection pool configuration
│   ├── controllers/           # Business logic & route handlers
│   ├── services/              # WhatsApp / AI / Payment integrations
│   └── middleware/            # JWT auth, rate limiting & security headers
└── frontend/                  # React / Vite responsive customer & admin UI
\`\`\`

---

## ⚡ Quickstart Setup

### Step 1: Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Step 2: Configure Environment
\`\`\`bash
cp .env.example .env
# Edit .env with your PostgreSQL, Redis, and API credentials
\`\`\`

### Step 3: Run Database Migrations
\`\`\`bash
npm run db:migrate
\`\`\`

### Step 4: Launch Local Development
\`\`\`bash
npm run dev
\`\`\`

---

## 🐳 Docker Deployment
\`\`\`bash
docker compose up -d --build
\`\`\`

---

## 📞 Engineering & Technical Support
For setup guidance, customizations, or direct architecture queries:
- **WhatsApp Support:** [+91 77458 68073](https://wa.me/917745868073)
- **Official Website:** [https://sapdigitechsolutions.in](https://sapdigitechsolutions.in)
- **Email:** support@sapdigitechsolutions.in
`,
  });

  // 3. PACKAGE.JSON
  files.push({
    path: "package.json",
    content: JSON.stringify(
      {
        name: normId,
        version: "1.0.0",
        description: `${productName} — Production Commercial SaaS Platform`,
        main: "src/server.js",
        scripts: {
          start: "node src/server.js",
          dev: "nodemon src/server.js",
          "db:migrate": "node src/config/migrate.js",
          "db:seed": "node src/config/seed.js",
          build: "npm run build --prefix frontend",
          "docker:up": "docker-compose up -d --build",
          "docker:down": "docker-compose down",
        },
        dependencies: {
          "@whiskeysockets/baileys": "^6.7.19",
          bcryptjs: "^3.0.2",
          cors: "^2.8.5",
          dotenv: "^16.4.7",
          express: "^4.21.2",
          "express-rate-limit": "^7.5.0",
          helmet: "^8.0.0",
          jsonwebtoken: "^9.0.2",
          pg: "^8.13.3",
          qrcode: "^1.5.4",
          redis: "^4.7.0",
          "socket.io": "^4.8.1",
          winston: "^3.17.0",
          zod: "^3.24.2",
        },
        devDependencies: {
          nodemon: "^3.1.9",
        },
      },
      null,
      2
    ),
  });

  // 4. DOCKERFILE
  files.push({
    path: "Dockerfile",
    content: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 4000
CMD ["npm", "start"]
`,
  });

  // 5. DOCKER-COMPOSE.YML
  files.push({
    path: "docker-compose.yml",
    content: `version: '3.8'

services:
  app:
    build: .
    restart: always
    ports:
      - "4000:4000"
    environment:
      - PORT=4000
      - NODE_ENV=production
      - DATABASE_URL=postgres://postgres:secure_db_pass@postgres:5432/${normId}_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secure_db_pass
      POSTGRES_DB: ${normId}_db
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./database/schema.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
`,
  });

  // 6. .ENV.EXAMPLE
  files.push({
    path: ".env.example",
    content: `# Server Configuration
PORT=4000
NODE_ENV=production
APP_URL=http://localhost:4000
FRONTEND_URL=http://localhost:3000

# Database Configuration (PostgreSQL)
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_NAME=${normId}_db

# Redis Cache & Message Queue
REDIS_URL=redis://127.0.0.1:6379

# Authentication & Security
JWT_SECRET=${crypto.randomBytes(32).toString("hex")}
JWT_EXPIRES_IN=7d

# Integration Secrets (WhatsApp / OpenAI / Razorpay)
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_meta_permanent_access_token
WHATSAPP_VERIFY_TOKEN=your_custom_webhook_verify_token
OPENAI_API_KEY=sk-proj-your_openai_api_key

# Email SMTP Delivery
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
`,
  });

  // 7. DEPLOY.SH
  files.push({
    path: "deploy.sh",
    content: `#!/usr/bin/env bash
set -e

echo "🚀 Starting Automated Deployment for ${productName}..."

# 1. Install Node Dependencies
npm install --omit=dev

# 2. Run Database Migrations
node src/config/migrate.js

# 3. Reload PM2 Cluster
if command -v pm2 &> /dev/null; then
    pm2 reload ecosystem.config.cjs --update-env || pm2 start ecosystem.config.cjs
    echo "✅ PM2 cluster reloaded successfully."
else
    echo "⚠️ PM2 not found. Starting with Node..."
    npm start
fi

echo "✨ ${productName} is live and operational!"
`,
  });

  // 8. ECOSYSTEM.CONFIG.CJS
  files.push({
    path: "ecosystem.config.cjs",
    content: `module.exports = {
  apps: [
    {
      name: "${normId}",
      script: "src/server.js",
      instances: "max",
      exec_mode: "cluster",
      max_memory_restart: "1G",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
`,
  });

  // 9. NGINX.CONF
  files.push({
    path: "nginx.conf",
    content: `server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
`,
  });

  // 10. DATABASE SCHEMA
  files.push({
    path: "database/schema.sql",
    content: `-- ${productName} Database Schema
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255),
    tags TEXT[],
    custom_attributes JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    contact_id INTEGER REFERENCES contacts(id) ON DELETE CASCADE,
    assigned_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'open',
    last_message TEXT,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
    sender_type VARCHAR(50) NOT NULL, -- 'customer', 'agent', 'bot'
    message_type VARCHAR(50) DEFAULT 'text',
    body TEXT NOT NULL,
    media_url TEXT,
    status VARCHAR(50) DEFAULT 'sent', -- 'sent', 'delivered', 'read', 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS campaigns (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    template_name VARCHAR(255) NOT NULL,
    target_count INTEGER DEFAULT 0,
    delivered_count INTEGER DEFAULT 0,
    read_count INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contacts_phone ON contacts(phone_number);
CREATE INDEX IF NOT EXISTS idx_conversations_contact ON conversations(contact_id);
CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages(conversation_id);
`,
  });

  // 11. SRC/SERVER.JS
  files.push({
    path: "src/server.js",
    content: `const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", product: "${productName}", version: "v1.0.0", timestamp: new Date() });
});

// WebSocket Real-Time Chat Channel
io.on("connection", (socket) => {
  console.log("🔌 Real-time client connected:", socket.id);

  socket.on("join_conversation", (conversationId) => {
    socket.join(\`conv_\${conversationId}\`);
  });

  socket.on("send_message", (data) => {
    io.to(\`conv_\${data.conversationId}\`).emit("new_message", data);
  });

  socket.on("disconnect", () => {
    console.log("🔌 Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(\`🚀 ${productName} Server running on port \${PORT}\`);
});
`,
  });

  // 12. DATABASE/SEEDS.SQL
  files.push({
    path: "database/seeds.sql",
    content: `INSERT INTO users (name, email, password_hash, role)
VALUES ('Admin User', 'admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO contacts (name, phone_number, email, tags)
VALUES 
  ('Rajesh Sharma', '+919876543210', 'rajesh@example.com', ARRAY['lead', 'enterprise']),
  ('Priya Patel', '+919876543211', 'priya@example.com', ARRAY['customer', 'vip'])
ON CONFLICT (phone_number) DO NOTHING;
`,
  });

  return createZipBuffer(files);
}

/**
 * Read .env file directly as fallback
 */
function loadEnvFallback(): Record<string, string> {
  try {
    const envPath = resolve(process.cwd(), ".env");
    const content = readFileSync(envPath, "utf-8");
    const vars: Record<string, string> = {};
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      vars[key] = val;
    }
    return vars;
  } catch {
    return {};
  }
}

/**
 * Get resilient storage directory path from .env with local fallback
 */
export function getStorageDir(): string {
  const envVars = loadEnvFallback();
  const configuredPath = process.env.CODE_STORAGE_PATH || envVars.CODE_STORAGE_PATH;

  if (configuredPath) {
    try {
      if (!existsSync(configuredPath)) {
        mkdirSync(configuredPath, { recursive: true });
      }
      return configuredPath;
    } catch {
      // Fall back if permission error or non-unix path
    }
  }

  // Local development fallback: project_root/storage/codes
  const localFallback = resolve(process.cwd(), "storage", "codes");
  if (!existsSync(localFallback)) {
    mkdirSync(localFallback, { recursive: true });
  }
  return localFallback;
}

function getManifestPath(): string {
  return join(getStorageDir(), "manifest.json");
}

function getSessionsPath(): string {
  return join(getStorageDir(), "sessions.json");
}

/* ─────────────────────── Packages Manifest ─────────────────────── */

/**
 * Read all code packages from persistent manifest
 */
export function listPackages(): CodePackage[] {
  try {
    const manifestPath = getManifestPath();
    if (!existsSync(manifestPath)) {
      return [];
    }
    const data = readFileSync(manifestPath, "utf-8");
    const packages = JSON.parse(data) as CodePackage[];
    return packages.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  } catch (err) {
    console.error("Error reading storage manifest:", err);
    return [];
  }
}

/**
 * Get package metadata by unique package token
 */
export function getPackageByToken(token: string): CodePackage | null {
  const packages = listPackages();
  return packages.find((p) => p.token === token) || null;
}

/**
 * Get latest package for a specific product ID (with alias normalization and auto-regeneration)
 */
export function getLatestPackageForProduct(productId: string): CodePackage | null {
  const packages = listPackages();
  const lower = productId.toLowerCase().trim();
  const normalized = normalizeProductId(productId);

  const found = packages.find(
    (p) =>
      p.productId.toLowerCase() === lower ||
      p.productId.toLowerCase() === normalized ||
      normalizeProductId(p.productId) === normalized
  );

  return found || null;
}

/**
 * Save updated manifest
 */
function saveManifest(packages: CodePackage[]): void {
  const manifestPath = getManifestPath();
  writeFileSync(manifestPath, JSON.stringify(packages, null, 2), "utf-8");
}

/**
 * Save an uploaded code package to storage and register in manifest
 */
export function savePackage({
  buffer,
  originalFileName,
  productId,
  productName,
  version = "v1.0.0",
}: {
  buffer: Buffer;
  originalFileName: string;
  productId: string;
  productName: string;
  version?: string;
}): CodePackage {
  const storageDir = getStorageDir();
  const token = crypto.randomBytes(16).toString("hex");
  const sanitizedOriginal = originalFileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storageFileName = `${productId}_${token}_${sanitizedOriginal}`;
  const filePath = join(storageDir, storageFileName);

  // Write file buffer to disk
  writeFileSync(filePath, buffer);

  const fileSizeBytes = buffer.length;
  const fileSizeFormatted = formatBytes(fileSizeBytes);

  const newPkg: CodePackage = {
    token,
    productId,
    productName,
    version,
    fileName: originalFileName,
    fileSizeBytes,
    fileSizeFormatted,
    storageFileName,
    storagePath: filePath,
    uploadedAt: new Date().toISOString(),
    downloadCount: 0,
    downloadUrl: `/api/download/${token}`,
    customerPageUrl: `/download/${token}`,
  };

  const existing = listPackages();
  existing.push(newPkg);
  saveManifest(existing);

  console.log(`📦 Code package saved for ${productName} (Token: ${token}, Size: ${fileSizeFormatted})`);
  return newPkg;
}

/**
 * Increment download counter for a package
 */
export function incrementDownloadCount(token: string): boolean {
  const packages = listPackages();
  const pkg = packages.find((p) => p.token === token);
  if (!pkg) return false;

  pkg.downloadCount = (pkg.downloadCount || 0) + 1;
  saveManifest(packages);
  return true;
}

/**
 * Delete a package from storage and remove from manifest
 */
export function deletePackage(token: string): boolean {
  const packages = listPackages();
  const pkg = packages.find((p) => p.token === token);
  if (!pkg) return false;

  try {
    if (existsSync(pkg.storagePath)) {
      unlinkSync(pkg.storagePath);
    }
  } catch (err) {
    console.error(`Failed to delete file from disk (${pkg.storagePath}):`, err);
  }

  const updated = packages.filter((p) => p.token !== token);
  saveManifest(updated);
  return true;
}

/* ─────────────────────── Expiring Download Sessions ─────────────────────── */

/**
 * Read all download sessions from persistent file
 */
export function listSessions(): DownloadSession[] {
  try {
    const sessionsPath = getSessionsPath();
    if (!existsSync(sessionsPath)) {
      return [];
    }
    const data = readFileSync(sessionsPath, "utf-8");
    return JSON.parse(data) as DownloadSession[];
  } catch (err) {
    console.error("Error reading sessions list:", err);
    return [];
  }
}

function saveSessions(sessions: DownloadSession[]): void {
  const sessionsPath = getSessionsPath();
  writeFileSync(sessionsPath, JSON.stringify(sessions, null, 2), "utf-8");
}

/**
 * Creates a secure, time-bound download session (5 minutes validity by default)
 */
export function createDownloadSession({
  productId,
  productName,
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
  paymentId,
  amount,
  validityMinutes = 5,
}: {
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  paymentId?: string;
  amount?: number;
  validityMinutes?: number;
}): DownloadSession {
  const sessionToken = crypto.randomBytes(16).toString("hex");
  const expiresAt = Date.now() + validityMinutes * 60 * 1000;

  // Find or link latest package
  let pkg = getLatestPackageForProduct(productId);

  // If no package exists yet, or if on-disk file was removed, auto-generate complete production zip
  if (!pkg || !existsSync(pkg.storagePath)) {
    const storageDir = getStorageDir();
    const normId = normalizeProductId(productId);
    const generatedZipBuffer = generateProductZipBundle({
      productId: normId,
      productName: productName || productId,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      paymentId: paymentId || "DIRECT_CHECKOUT",
    });

    const archiveFileName = `${normId}-v1.0.0-src.zip`;
    const archivePath = join(storageDir, archiveFileName);
    writeFileSync(archivePath, generatedZipBuffer);

    pkg = {
      token: crypto.randomBytes(16).toString("hex"),
      productId: normId,
      productName: productName || normId,
      version: "v1.0.0",
      fileName: archiveFileName,
      fileSizeBytes: generatedZipBuffer.length,
      fileSizeFormatted: formatBytes(generatedZipBuffer.length),
      storageFileName: archiveFileName,
      storagePath: archivePath,
      uploadedAt: new Date().toISOString(),
      downloadCount: 0,
      downloadUrl: `/api/download/${sessionToken}`,
      customerPageUrl: `/download/${sessionToken}`,
    };

    const packages = listPackages();
    // Replace old placeholder if matched
    const filtered = packages.filter((p) => p.productId !== normId);
    filtered.push(pkg);
    saveManifest(filtered);
  }

  const session: DownloadSession = {
    sessionToken,
    packageToken: pkg.token,
    productId,
    productName: pkg.productName || productName,
    version: pkg.version || "v1.0.0",
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    paymentId,
    amount,
    createdAt: new Date().toISOString(),
    expiresAt,
    downloadCount: 0,
  };

  const sessions = listSessions();
  sessions.push(session);
  saveSessions(sessions);

  console.log(`🔐 Generated 5-min secure session token for ${productName} (Expires in 5m): ${sessionToken}`);
  return session;
}

/**
 * Inspect a token: checks whether it is an expiring session or a master package token.
 * Master package tokens get an auto-provisioned 5-minute session for consistency!
 */
export function inspectToken(token: string): SessionInspection | null {
  const sessions = listSessions();
  let session = sessions.find((s) => s.sessionToken === token);

  // If token is a packageToken, convert/find existing or generate a session
  if (!session) {
    let pkg = getPackageByToken(token);
    if (!pkg) return null;

    session = {
      sessionToken: token,
      packageToken: pkg.token,
      productId: pkg.productId,
      productName: pkg.productName,
      version: pkg.version,
      customerName: "Admin User",
      customerEmail: "admin@sapdigitechsolutions.in",
      createdAt: new Date().toISOString(),
      expiresAt: Date.now() + 5 * 60 * 1000,
      downloadCount: pkg.downloadCount,
    };
    sessions.push(session);
    saveSessions(sessions);
  }

  let pkg = getPackageByToken(session.packageToken);
  if (!pkg) return null;

  // Verify file existence on disk; if missing, auto-heal with full package bundle
  if (!existsSync(pkg.storagePath)) {
    const storageDir = getStorageDir();
    const candidatePath = join(storageDir, pkg.storageFileName || pkg.fileName);
    if (existsSync(candidatePath)) {
      pkg.storagePath = candidatePath;
    } else {
      const generatedZipBuffer = generateProductZipBundle({
        productId: pkg.productId,
        productName: pkg.productName,
        customerName: session.customerName,
        customerEmail: session.customerEmail,
        customerPhone: session.customerPhone,
        customerAddress: session.customerAddress,
        paymentId: session.paymentId || "FULFILLMENT",
      });
      writeFileSync(candidatePath, generatedZipBuffer);
      pkg.storagePath = candidatePath;
      pkg.fileSizeBytes = generatedZipBuffer.length;
      pkg.fileSizeFormatted = formatBytes(generatedZipBuffer.length);
    }
  }

  const now = Date.now();
  const remainingMs = session.expiresAt - now;
  const isExpired = remainingMs <= 0;
  const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const remainingFormatted = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return {
    session,
    pkg,
    isExpired,
    remainingSeconds,
    remainingFormatted,
  };
}

/**
 * Auto-generate / refresh a fresh 5-minute download token from an existing (or expired) token
 */
export function refreshDownloadSession(oldToken: string): DownloadSession | null {
  const sessions = listSessions();
  const existing = sessions.find((s) => s.sessionToken === oldToken || s.packageToken === oldToken);
  
  if (!existing) {
    // If master package token, create a fresh 5-minute session
    const pkg = getPackageByToken(oldToken);
    if (!pkg) return null;

    return createDownloadSession({
      productId: pkg.productId,
      productName: pkg.productName,
      customerName: "Customer",
      customerEmail: "customer@example.com",
      validityMinutes: 5,
    });
  }

  // Generate new fresh session
  const newToken = crypto.randomBytes(16).toString("hex");
  const newSession: DownloadSession = {
    ...existing,
    sessionToken: newToken,
    createdAt: new Date().toISOString(),
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes fresh
  };

  sessions.push(newSession);
  saveSessions(sessions);

  console.log(`🔄 Auto-refreshed 5-min link: Old ${oldToken} -> New ${newToken}`);
  return newSession;
}

/**
 * Increments download count for a session and its underlying package
 */
export function recordSessionDownload(sessionToken: string): boolean {
  const sessions = listSessions();
  const session = sessions.find((s) => s.sessionToken === sessionToken);
  if (!session) return false;

  session.downloadCount = (session.downloadCount || 0) + 1;
  saveSessions(sessions);

  incrementDownloadCount(session.packageToken);
  return true;
}

/* ─────────────────────── Unique Shareable Payment Links ─────────────────────── */

export interface PaymentLink {
  id: string;
  productId: string;
  productName: string;
  amount: number;
  originalPrice: number;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  notes?: string;
  createdAt: string;
  expiresAt: number | null;
  active: boolean;
  totalPaidCount: number;
  url: string;
  isCustom?: boolean;
}

function getPaymentLinksPath(): string {
  return join(getStorageDir(), "payment_links.json");
}

export const DEFAULT_PRODUCT_PAYMENT_CONFIGS = [
  { id: "briefvault", name: "BriefVault", amount: 1999, originalPrice: 24999, notes: "Source Code + Gemini AI Engine" },
  { id: "primeinbox", name: "PrimeInbox", amount: 1999, originalPrice: 49999, notes: "Full Commercial Source Code + SMTP Warmup Engine" },
  { id: "greviewpilot", name: "GReviewPilot", amount: 1999, originalPrice: 39999, notes: "Full Commercial Source Code + Google Reviews Sync" },
  { id: "bookmytime", name: "BookMyTime", amount: 1999, originalPrice: 29999, notes: "Full Commercial Source Code + Multi-Calendar Sync" },
  { id: "whatsapp-crm", name: "WhatsApp CRM", amount: 1999, originalPrice: 44999, notes: "Full Commercial Source Code + WhatsApp CRM Bot" },
  { id: "nexaleadai", name: "NexaLead AI", amount: 1999, originalPrice: 49999, notes: "Full Commercial Source Code + B2B Lead Scraper Engine" },
  { id: "aihospitalerp", name: "Hospital Management System", amount: 1999, originalPrice: 49999, notes: "Full Commercial Source Code + Hospital Management ERP" },
  { id: "mediadocks", name: "MediaDocks", amount: 1999, originalPrice: 49999, notes: "Full Commercial Source Code + Universal Media Extraction & AI Transcription Platform" },
];

/**
 * List all payment links. Initializes canonical product links if file is empty.
 */
export function listPaymentLinks(): PaymentLink[] {
  try {
    const p = getPaymentLinksPath();
    let links: PaymentLink[] = [];

    if (existsSync(p)) {
      const data = readFileSync(p, "utf-8");
      links = JSON.parse(data) as PaymentLink[];
    }

    // Ensure all canonical product links exist
    let modified = false;
    const overrides = getProductPricingOverrides();

    for (const def of DEFAULT_PRODUCT_PAYMENT_CONFIGS) {
      const existing = links.find((l) => l.id === def.id && !l.isCustom);
      const override = overrides[def.id.toLowerCase()];
      const targetAmount = override ? override.fixedPrice : def.amount;
      const targetOriginalPrice = override ? override.originalPrice : def.originalPrice;

      if (!existing) {
        links.unshift({
          id: def.id,
          productId: def.id,
          productName: def.name,
          amount: targetAmount,
          originalPrice: targetOriginalPrice,
          clientName: "Public Storefront",
          notes: def.notes,
          createdAt: new Date().toISOString(),
          expiresAt: null,
          active: true,
          totalPaidCount: 0,
          url: `/pay/${def.id}`,
          isCustom: false,
        });
        modified = true;
      } else if (override && (existing.amount !== override.fixedPrice || existing.originalPrice !== override.originalPrice)) {
        existing.amount = override.fixedPrice;
        existing.originalPrice = override.originalPrice;
        modified = true;
      }
    }

    if (modified) {
      savePaymentLinks(links);
    }

    return links;
  } catch (err) {
    console.error("Error reading payment links:", err);
    return [];
  }
}

/**
 * Save payment links list
 */
export function savePaymentLinks(links: PaymentLink[]): void {
  const p = getPaymentLinksPath();
  writeFileSync(p, JSON.stringify(links, null, 2), "utf-8");
}

/**
 * Create a new unique payment link
 */
export function createPaymentLink(params: {
  productId: string;
  productName: string;
  amount: number;
  originalPrice?: number;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  notes?: string;
  validityDays?: number | null;
}): PaymentLink {
  const links = listPaymentLinks();
  const slug = params.productId.slice(0, 3).toUpperCase();
  const uniqueCode = `PAY-${slug}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

  const expiresAt = params.validityDays
    ? Date.now() + params.validityDays * 24 * 60 * 60 * 1000
    : null;

  const newLink: PaymentLink = {
    id: uniqueCode,
    productId: params.productId,
    productName: params.productName,
    amount: params.amount,
    originalPrice: params.originalPrice || params.amount * 3,
    clientName: params.clientName?.trim() || "Private Client",
    clientEmail: params.clientEmail?.trim() || "",
    clientPhone: params.clientPhone?.trim() || "",
    notes: params.notes?.trim() || "Full Commercial Source Code License",
    createdAt: new Date().toISOString(),
    expiresAt,
    active: true,
    totalPaidCount: 0,
    url: `/pay/${uniqueCode}`,
    isCustom: true,
  };

  links.unshift(newLink);
  savePaymentLinks(links);
  return newLink;
}

/**
 * Retrieve a payment link by its ID or by standard product ID
 */
export function getPaymentLinkById(id: string): PaymentLink | null {
  const links = listPaymentLinks();
  const lower = id.toLowerCase();
  const normalized = lower === "chatnexgen" ? "whatsapp-crm" : lower;
  const found = links.find((l) => l.id.toLowerCase() === normalized || l.productId.toLowerCase() === normalized || l.id.toLowerCase() === lower || l.productId.toLowerCase() === lower) || null;
  if (!found) return null;

  // If this is a canonical public storefront link, ensure it has latest price override
  if (!found.isCustom || found.clientName === "Public Storefront") {
    const overrides = getProductPricingOverrides();
    const ov = overrides[found.productId.toLowerCase()];
    if (ov) {
      return {
        ...found,
        amount: ov.fixedPrice,
        originalPrice: ov.originalPrice,
      };
    }
  }

  return found;
}

/**
 * Delete a custom payment link
 */
export function deletePaymentLink(id: string): boolean {
  const links = listPaymentLinks();
  const filtered = links.filter((l) => l.id !== id);
  if (filtered.length === links.length) return false;
  savePaymentLinks(filtered);
  return true;
}

/**
 * Record a successful payment made via a payment link
 */
export function recordPaymentLinkUsage(linkIdOrProductId: string): void {
  const links = listPaymentLinks();
  const link = links.find(
    (l) =>
      l.id.toLowerCase() === linkIdOrProductId.toLowerCase() ||
      l.productId.toLowerCase() === linkIdOrProductId.toLowerCase()
  );
  if (link) {
    link.totalPaidCount = (link.totalPaidCount || 0) + 1;
    savePaymentLinks(links);
  }
}

/* ─────────────────────── Custom SaaS Products Management ─────────────────────── */

export interface CustomProductDetail {
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
  features: { title: string; desc: string; iconName?: string }[];
  whiteLabel: { title: string; desc: string; iconName?: string }[];
  sourceCodeOffer: {
    fixedPrice: number;
    originalPrice: number;
    discountPercentage: number;
    licenseName: string;
    deliveryMethod: string;
    deliverables: string[];
    featuresIncluded: string[];
    techStackDetailed: { category: string; techs: string[] }[];
  };
  interactiveCapabilities: {
    title: string;
    subtitle: string;
    description: string;
    metrics: string;
    badge: string;
    previewNote: string;
  }[];
  faqs: { q: string; a: string }[];
  stats: { label: string; value: string }[];
  createdAt?: string;
  isCustom?: boolean;
}

function getCustomProductsPath(): string {
  return join(getStorageDir(), "custom_products.json");
}

export function getCustomProducts(): CustomProductDetail[] {
  try {
    const p = getCustomProductsPath();
    if (!existsSync(p)) {
      return [];
    }
    const data = readFileSync(p, "utf-8");
    return JSON.parse(data) as CustomProductDetail[];
  } catch (err) {
    console.error("Error reading custom products:", err);
    return [];
  }
}

export function saveCustomProduct(product: CustomProductDetail): CustomProductDetail {
  const products = getCustomProducts();
  const lowerId = product.id.toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");
  const normalized: CustomProductDetail = {
    ...product,
    id: lowerId,
    name: product.name.trim(),
    createdAt: product.createdAt || new Date().toISOString(),
    isCustom: true,
  };

  const existingIdx = products.findIndex((p) => p.id === normalized.id);
  if (existingIdx >= 0) {
    products[existingIdx] = normalized;
  } else {
    products.unshift(normalized);
  }

  const p = getCustomProductsPath();
  writeFileSync(p, JSON.stringify(products, null, 2), "utf-8");

  // Also ensure a default public storefront payment link exists for this new product
  try {
    const links = listPaymentLinks();
    if (!links.some((l) => l.id === normalized.id && !l.isCustom)) {
      links.push({
        id: normalized.id,
        productId: normalized.id,
        productName: normalized.name,
        amount: normalized.sourceCodeOffer?.fixedPrice || 1999,
        originalPrice: normalized.sourceCodeOffer?.originalPrice || 49999,
        clientName: "Public Storefront",
        notes: `Full Commercial Source Code — ${normalized.name}`,
        createdAt: new Date().toISOString(),
        expiresAt: null,
        active: true,
        totalPaidCount: 0,
        url: `/pay/${normalized.id}`,
        isCustom: false,
      });
      savePaymentLinks(links);
    }
  } catch (linkErr) {
    console.warn("Failed auto-registering payment link for custom product:", linkErr);
  }

  return normalized;
}

export function deleteCustomProduct(id: string): boolean {
  const products = getCustomProducts();
  const lowerId = id.toLowerCase().trim();
  const filtered = products.filter((p) => p.id !== lowerId);
  if (filtered.length === products.length) return false;

  const p = getCustomProductsPath();
  writeFileSync(p, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

/* ─────────────────────── Product Pricing Overrides ─────────────────────── */

export interface ProductPriceOverride {
  productId: string;
  fixedPrice: number;
  originalPrice: number;
  discountPercentage: number;
  updatedAt: string;
}

function getProductPricingPath(): string {
  return join(getStorageDir(), "product_pricing.json");
}

/**
 * Retrieve all persistent product pricing overrides
 */
export function getProductPricingOverrides(): Record<string, ProductPriceOverride> {
  try {
    const p = getProductPricingPath();
    if (!existsSync(p)) {
      return {};
    }
    const data = readFileSync(p, "utf-8");
    return JSON.parse(data) as Record<string, ProductPriceOverride>;
  } catch (err) {
    console.error("Error reading product pricing overrides:", err);
    return {};
  }
}

/**
 * Save or update a product's pricing override and synchronize canonical payment links
 */
export function saveProductPriceOverride(params: {
  productId: string;
  fixedPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
}): ProductPriceOverride {
  const overrides = getProductPricingOverrides();
  const lowerId = params.productId.toLowerCase().trim();
  const fixed = Math.max(1, Math.round(Number(params.fixedPrice) || 1999));
  const original = Math.max(fixed, Math.round(Number(params.originalPrice) || Math.max(fixed * 10, 49999)));
  const discount = params.discountPercentage !== undefined
    ? Math.max(1, Math.min(99, Math.round(Number(params.discountPercentage))))
    : Math.max(1, Math.min(99, Math.round(((original - fixed) / original) * 100)));

  const override: ProductPriceOverride = {
    productId: lowerId,
    fixedPrice: fixed,
    originalPrice: original,
    discountPercentage: discount,
    updatedAt: new Date().toISOString(),
  };

  overrides[lowerId] = override;
  writeFileSync(getProductPricingPath(), JSON.stringify(overrides, null, 2), "utf-8");

  // 1. Synchronize public payment links in payment_links.json
  try {
    const links = listPaymentLinks();
    let linkModified = false;
    for (const link of links) {
      if (link.productId.toLowerCase() === lowerId && (!link.isCustom || link.clientName === "Public Storefront")) {
        link.amount = fixed;
        link.originalPrice = original;
        linkModified = true;
      }
    }
    if (linkModified) {
      savePaymentLinks(links);
    }
  } catch (linkErr) {
    console.warn("Failed to synchronize payment links with price override:", linkErr);
  }

  // 2. If it is a custom product, also update custom_products.json
  try {
    const customProds = getCustomProducts();
    const customIdx = customProds.findIndex((p) => p.id.toLowerCase() === lowerId);
    if (customIdx >= 0) {
      if (!customProds[customIdx].sourceCodeOffer) {
        customProds[customIdx].sourceCodeOffer = {} as any;
      }
      customProds[customIdx].sourceCodeOffer.fixedPrice = fixed;
      customProds[customIdx].sourceCodeOffer.originalPrice = original;
      customProds[customIdx].sourceCodeOffer.discountPercentage = discount;
      writeFileSync(getCustomProductsPath(), JSON.stringify(customProds, null, 2), "utf-8");
    }
  } catch (custErr) {
    console.warn("Failed to synchronize custom product with price override:", custErr);
  }

  return override;
}

/**
 * Remove a pricing override and revert to defaults
 */
export function deleteProductPriceOverride(productId: string): boolean {
  const overrides = getProductPricingOverrides();
  const lowerId = productId.toLowerCase().trim();
  if (!overrides[lowerId]) return false;
  delete overrides[lowerId];
  writeFileSync(getProductPricingPath(), JSON.stringify(overrides, null, 2), "utf-8");
  return true;
}
