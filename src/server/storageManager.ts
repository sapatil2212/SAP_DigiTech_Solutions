import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import { resolve, join } from "path";
import crypto from "crypto";

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
 * Get latest package for a specific product ID
 */
export function getLatestPackageForProduct(productId: string): CodePackage | null {
  const packages = listPackages();
  return packages.find((p) => p.productId.toLowerCase() === productId.toLowerCase()) || null;
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
  validityMinutes = 5,
}: {
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  paymentId?: string;
  validityMinutes?: number;
}): DownloadSession {
  const sessionToken = crypto.randomBytes(16).toString("hex");
  const expiresAt = Date.now() + validityMinutes * 60 * 1000;

  // Find or link latest package
  let pkg = getLatestPackageForProduct(productId);

  // If no package exists yet, create a virtual placeholder so customer never faces an error
  if (!pkg) {
    const storageDir = getStorageDir();
    const placeholderName = `${productId}-v1.0.0-src.zip`;
    const placeholderPath = join(storageDir, placeholderName);
    
    // Create dummy zip if not existing
    if (!existsSync(placeholderPath)) {
      const minimalZip = Buffer.from([
        0x50, 0x4b, 0x05, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00
      ]);
      writeFileSync(placeholderPath, minimalZip);
    }

    pkg = {
      token: crypto.randomBytes(16).toString("hex"),
      productId,
      productName,
      version: "v1.0.0",
      fileName: placeholderName,
      fileSizeBytes: 22,
      fileSizeFormatted: "22 Bytes",
      storageFileName: placeholderName,
      storagePath: placeholderPath,
      uploadedAt: new Date().toISOString(),
      downloadCount: 0,
      downloadUrl: `/api/download/${sessionToken}`,
      customerPageUrl: `/download/${sessionToken}`,
    };

    const packages = listPackages();
    packages.push(pkg);
    saveManifest(packages);
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
    const pkg = getPackageByToken(token);
    if (!pkg) return null;

    // Create a temporary 5-min session for this master package token so it enforces 5-min expiry
    session = {
      sessionToken: token,
      packageToken: pkg.token,
      productId: pkg.productId,
      productName: pkg.productName,
      version: pkg.version,
      customerName: "Admin User",
      customerEmail: "admin@sapdigitechsolutions.in",
      createdAt: new Date().toISOString(),
      // 5 minutes from upload or 5 minutes from now
      expiresAt: Date.now() + 5 * 60 * 1000,
      downloadCount: pkg.downloadCount,
    };
    sessions.push(session);
    saveSessions(sessions);
  }

  const pkg = getPackageByToken(session.packageToken);
  if (!pkg) return null;

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
  { id: "chatnexgen", name: "WhatsApp CRM", amount: 1999, originalPrice: 44999, notes: "Full Commercial Source Code + WhatsApp CRM Bot" },
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
  const found = links.find((l) => l.id.toLowerCase() === lower || l.productId.toLowerCase() === lower) || null;
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
