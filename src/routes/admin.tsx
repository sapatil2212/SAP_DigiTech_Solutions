import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  Upload, FileArchive, CheckCircle2, Copy, Check, Trash2, ExternalLink,
  Download, RefreshCw, HardDrive, ShieldCheck, ArrowUpRight,
  Search, FolderArchive, Layers, Server, Box, LayoutDashboard,
  Menu, X, Filter, ArrowUpDown, Calendar, Activity,
  ChevronRight, ChevronLeft, Eye, Shield, Terminal,
  CheckCircle, AlertCircle, CreditCard, Link as LinkIcon, Share2, Plus, Clock, MessageSquare,
  Sparkles, Globe, Tag, Code, HelpCircle, Info, List, DollarSign, Wrench, FileText,
  Users, Phone, Mail, MapPin, Receipt, ShoppingBag
} from "lucide-react";
import {
  productDetails,
  getAllProductDetails,
  registerCustomProducts,
  unregisterCustomProduct,
  registerPricingOverrides,
  getAllPricingOverrides,
} from "@/lib/productData";
import { toast } from "sonner";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin")({
  component: AdminStorageDashboard,
  head: () => ({
    meta: [
      { title: "Storage Console & Admin Portal — SAP DigiTech Solutions" },
      { name: "description", content: "Manage and distribute product source code archives directly from VPS storage." },
    ],
  }),
});

interface StoredPackage {
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

export interface PaymentLinkItem {
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

export interface AdminOrderSession {
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
  expiresAt: number;
  downloadCount: number;
}

export interface AdminProductItem {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  fixedPrice: number;
  originalPrice: number;
  isCustom?: boolean;
  categoryName?: string;
  categoryGroup?: string;
  url?: string;
  heroDesc?: string;
  detailedDesc?: string;
}

const getInitialProducts = (): AdminProductItem[] => {
  return getAllProductDetails().map((p) => ({
    id: p.id,
    name: p.name,
    badge: p.badge,
    tagline: p.tagline,
    fixedPrice: p.sourceCodeOffer?.fixedPrice || 1999,
    originalPrice: p.sourceCodeOffer?.originalPrice || 49999,
    isCustom: (p as any).isCustom || false,
    categoryName: p.categoryName,
    categoryGroup: p.categoryGroup,
    url: p.url,
    heroDesc: p.heroDesc,
    detailedDesc: p.detailedDesc,
  }));
};

type NavigationTab = "overview" | "orders" | "packages" | "payment-links" | "upload" | "products" | "telemetry" | "server";
type SortField = "uploadedAt" | "productName" | "fileSizeBytes" | "downloadCount" | "version";
type SortOrder = "asc" | "desc";

function AdminStorageDashboard() {
  // Dynamic Products List State
  const [productsList, setProductsList] = useState<AdminProductItem[]>(getInitialProducts);
  const [createProductModalOpen, setCreateProductModalOpen] = useState(false);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<"basic" | "overview" | "pricing" | "specs">("basic");

  // Add Product Form State
  const [productForm, setProductForm] = useState({
    name: "",
    id: "",
    tagline: "",
    url: "",
    categoryGroup: "AI & Automation" as "AI & Automation" | "Operations & Growth",
    categoryName: "AI & Automation",
    badge: "NEW SAAS",
    localImg: "/assets/work/website-preview/briefvault.png",
    heroDesc: "",
    detailedDesc: "",
    techStack: "React 19, TypeScript, Node.js, TailwindCSS",
    fixedPrice: 1999,
    originalPrice: 49999,
    licenseName: "Full Commercial Source Code License",
    deliverables: "Complete React 19 Frontend Code\nNode.js Backend Engine\nDocker Compose & Cloud Configs\nFull Commercial Rights",
    featuresIncluded: "Lifetime Commercial License\nUnlimited Client Deployments\n1 Year Free Updates",
    stat1Label: "Processing Speed", stat1Val: "< 15s",
    stat2Label: "Accuracy", stat2Val: "99.2%",
    stat3Label: "Supported Formats", stat3Val: "PDF, DOCX, CSV",
    stat4Label: "Active Clients", stat4Val: "1,500+",
    feature1Title: "Automated Core Engine", feature1Desc: "High-throughput automation pipeline delivering instant results with zero manual friction.",
    feature2Title: "Enterprise Security Vault", feature2Desc: "Encrypted at rest and in transit with complete audit telemetry.",
    whiteLabel1Title: "100% Brand Ownership", whiteLabel1Desc: "Replace logos, colors, fonts, and domains with your brand in minutes.",
    whiteLabel2Title: "Commercial Resale Rights", whiteLabel2Desc: "Deploy for unlimited clients or charge retainers with zero royalties.",
    faq1Q: "What do I get when I purchase the source code?", faq1A: "You receive immediate access to the full, unminified source code with commercial resale rights.",
    faq2Q: "Can I self-host this on our own servers?", faq2A: "Yes, you can deploy to any VPS (Ubuntu/DigitalOcean/AWS) via Docker Compose in under 15 minutes.",
  });

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<NavigationTab>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Storage Data States
  const [packages, setPackages] = useState<StoredPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatusText, setUploadStatusText] = useState("");

  // Upload Form States
  const [selectedProductId, setSelectedProductId] = useState(productsList[0]?.id || "briefvault");
  const [version, setVersion] = useState("v1.0.0");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Table Filter & Sort States
  const [searchTerm, setSearchTerm] = useState("");
  const [productFilter, setProductFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("uploadedAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Interactive Action Feedback
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [justUploadedPkg, setJustUploadedPkg] = useState<StoredPackage | null>(null);

  // Customer Orders / Purchase Sessions States
  const [orderSessions, setOrderSessions] = useState<AdminOrderSession[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderSearchTerm, setOrderSearchTerm] = useState("");
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  // Payment Links States
  const [paymentLinks, setPaymentLinks] = useState<PaymentLinkItem[]>([]);
  const [loadingLinks, setLoadingLinks] = useState(false);
  const [createLinkModalOpen, setCreateLinkModalOpen] = useState(false);
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
  const [copiedPitchId, setCopiedPitchId] = useState<string | null>(null);
  const [linkSearchTerm, setLinkSearchTerm] = useState("");

  // Create Link Form State
  const [newLinkProduct, setNewLinkProduct] = useState(productsList[0]?.id || "briefvault");
  const [newLinkAmount, setNewLinkAmount] = useState<number | string>(productsList[0]?.fixedPrice || 1999);
  const [newLinkClientName, setNewLinkClientName] = useState("");
  const [newLinkClientEmail, setNewLinkClientEmail] = useState("");
  const [newLinkClientPhone, setNewLinkClientPhone] = useState("");
  const [newLinkNotes, setNewLinkNotes] = useState("Full Commercial Source Code License");
  const [newLinkValidityDays, setNewLinkValidityDays] = useState<number>(0);
  const [creatingLink, setCreatingLink] = useState(false);

  // Price Edit Modal States
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProductItem | null>(null);
  const [editFixedPrice, setEditFixedPrice] = useState<number | string>(1999);
  const [editOriginalPrice, setEditOriginalPrice] = useState<number | string>(49999);
  const [savingPrice, setSavingPrice] = useState(false);

  // Modals
  const [inspectPkg, setInspectPkg] = useState<StoredPackage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StoredPackage | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch customer purchase orders from VPS API
  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await fetch("/api/admin/sessions");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.sessions)) {
          setOrderSessions(data.sessions);
        }
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Fetch stored packages from VPS API
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/files");
      if (res.ok) {
        const data = await res.json();
        setPackages(data.files || []);
      } else {
        toast.error("Failed to load stored files");
      }
    } catch (err) {
      console.error("Error fetching packages:", err);
      toast.error("Could not connect to storage server");
    } finally {
      setLoading(false);
    }
  };

  // Fetch payment links from VPS API
  const fetchPaymentLinks = async () => {
    try {
      setLoadingLinks(true);
      const res = await fetch("/api/admin/payment-links");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.links)) {
          setPaymentLinks(data.links);
        }
      }
    } catch (err) {
      console.error("Error fetching payment links:", err);
    } finally {
      setLoadingLinks(false);
    }
  };

  const handleCreatePaymentLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const prod = productsList.find((p) => p.id === newLinkProduct);
    if (!prod) return;

    setCreatingLink(true);
    try {
      const res = await fetch("/api/admin/payment-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: prod.id,
          productName: prod.name,
          amount: Number(newLinkAmount) || prod.fixedPrice,
          originalPrice: prod.originalPrice,
          clientName: newLinkClientName,
          clientEmail: newLinkClientEmail,
          clientPhone: newLinkClientPhone,
          notes: newLinkNotes,
          validityDays: newLinkValidityDays > 0 ? newLinkValidityDays : null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          toast.success(`Unique payment link created for ${prod.name}!`);
          setCreateLinkModalOpen(false);
          fetchPaymentLinks();
          setNewLinkClientName("");
          setNewLinkClientEmail("");
          setNewLinkClientPhone("");
        }
      } else {
        toast.error("Failed to generate payment link.");
      }
    } catch (err) {
      console.error("Create payment link error:", err);
      toast.error("Server error creating payment link");
    } finally {
      setCreatingLink(false);
    }
  };

  const handleDeletePaymentLink = async (id: string) => {
    if (!confirm("Are you sure you want to remove this payment link?")) return;
    try {
      const res = await fetch(`/api/admin/payment-links/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Payment link removed.");
        setPaymentLinks((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      toast.error("Failed to delete payment link");
    }
  };

  // Fetch custom products and pricing overrides from VPS API
  const fetchCustomProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (data.pricingOverrides && typeof data.pricingOverrides === "object") {
            registerPricingOverrides(data.pricingOverrides);
          }
          if (Array.isArray(data.customProducts)) {
            registerCustomProducts(data.customProducts);
            if (typeof window !== "undefined") {
              localStorage.setItem("sap_custom_products", JSON.stringify(data.customProducts));
            }
          }
          setProductsList(getInitialProducts());
        }
      }
    } catch (err) {
      console.warn("Error loading custom products:", err);
    }
  };

  const handleOpenPriceModal = (product: AdminProductItem) => {
    setEditingProduct(product);
    setEditFixedPrice(product.fixedPrice);
    setEditOriginalPrice(product.originalPrice);
    setPriceModalOpen(true);
  };

  const handleSavePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    const fixed = Math.max(1, Math.round(Number(editFixedPrice)));
    const original = Math.max(fixed, Math.round(Number(editOriginalPrice) || Math.max(fixed * 10, 49999)));

    if (isNaN(fixed) || fixed <= 0) {
      toast.error("Please enter a valid price greater than 0");
      return;
    }

    const discount = Math.max(1, Math.min(99, Math.round(((original - fixed) / original) * 100)));

    try {
      setSavingPrice(true);
      const res = await fetch("/api/admin/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: editingProduct.id,
          fixedPrice: fixed,
          originalPrice: original,
          discountPercentage: discount,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Register client-side override so everywhere updates immediately
        if (data.pricingOverrides && typeof data.pricingOverrides === "object") {
          registerPricingOverrides(data.pricingOverrides);
        } else {
          registerPricingOverrides({
            [editingProduct.id]: {
              fixedPrice: fixed,
              originalPrice: original,
              discountPercentage: discount,
            },
          });
        }

        // Re-sync payment links and local product list so admin view reflects new pricing immediately
        await fetchPaymentLinks();
        setProductsList(getInitialProducts());

        toast.success(`Pricing updated for ${editingProduct.name} (₹${fixed.toLocaleString("en-IN")})!`);
        setPriceModalOpen(false);
      } else {
        toast.error(data.error || "Failed to update pricing");
      }
    } catch (err) {
      console.error("Save price error:", err);
      toast.error("Network error while updating pricing");
    } finally {
      setSavingPrice(false);
    }
  };

  const loadBlueprintTemplate = () => {
    setProductForm({
      name: "DevPulse AI",
      id: "devpulse",
      tagline: "Autonomous Code Review, Refactoring & Security Audit Platform",
      url: "https://devpulse.ai/",
      categoryGroup: "AI & Automation",
      categoryName: "Developer Tools & AI",
      badge: "AI CODE TECH",
      localImg: "/assets/work/website-preview/briefvault.png",
      heroDesc: "Supercharge engineering velocity with automated PR reviews, architectural vulnerability detection, and AI-driven syntax refactoring in seconds.",
      detailedDesc: "DevPulse AI is an enterprise-grade developer productivity SaaS platform engineered for software agencies, dev shops, and enterprise engineering teams. Developers connect GitHub or GitLab repositories to receive inline architectural feedback, automated unit test generation, and compliance checks with zero manual friction.",
      techStack: "React 19, TypeScript, Node.js, Python, Gemini 1.5 Pro, PostgreSQL, Docker, Redis",
      fixedPrice: 1999,
      originalPrice: 49999,
      licenseName: "Full Commercial Source Code License",
      deliverables: "Complete React 19 + TypeScript Frontend Dashboard\nNode.js & Python AI Code Analysis Microservices\nPostgreSQL Database Schemas & Migrations\nDocker Compose & One-Click Cloud Deployment Scripts\nFull Rebranding Guide (Logo, Themes, Domain)\nRazorpay & Stripe Payment Integration Modules\nLifetime Commercial License with Unlimited Deployments",
      featuresIncluded: "Unlimited repository scans & PR analyses\nAutomated AST security vulnerability audits\nInline refactoring suggestions with diff previews\nZero subscription fees or recurring royalties",
      stat1Label: "Analysis Speed", stat1Val: "< 15s",
      stat2Label: "Bug Accuracy", stat2Val: "99.1%",
      stat3Label: "Languages", stat3Val: "30+ Langs",
      stat4Label: "Active Engineers", stat4Val: "3,500+",
      feature1Title: "Automated PR Reviews", feature1Desc: "Instantly analyze pull requests with line-by-line comments, potential edge-case bug alerts, and architectural feedback.",
      feature2Title: "AST Security Scanner", feature2Desc: "Detect OWASP top 10 vulnerabilities, leaked API tokens, and insecure dependencies before code merges to production.",
      whiteLabel1Title: "100% Brand Ownership", whiteLabel1Desc: "Replace logos, fonts, primary colors, and domain with your dev agency branding in minutes.",
      whiteLabel2Title: "Commercial Resale Rights", whiteLabel2Desc: "Sell code audit retainers or subscription access to your software clients with zero royalties back to us.",
      faq1Q: "What source code do I receive?", faq1A: "You receive the full unminified React 19 frontend, Node.js & Python backend analysis microservices, Docker configs, and database schemas.",
      faq2Q: "Can I host this on our private infrastructure?", faq2A: "Yes! DevPulse is 100% self-hosted with Docker Compose. Your code never leaves your server.",
    });
    toast.info("Pre-filled form with DevPulse AI Blueprint!");
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim() || !productForm.id.trim() || !productForm.heroDesc.trim()) {
      toast.error("Please fill in the Product Name, Slug ID, and Hero Description.");
      return;
    }

    try {
      setCreatingProduct(true);
      const cleanId = productForm.id.toLowerCase().trim().replace(/[^a-z0-9_-]/g, "");

      const payload = {
        id: cleanId,
        name: productForm.name.trim(),
        tagline: productForm.tagline.trim() || `${productForm.name.trim()} — Production SaaS Platform`,
        url: productForm.url.trim() || `https://${cleanId}.com/`,
        badge: productForm.badge.trim() || "NEW SAAS",
        categoryName: productForm.categoryName.trim() || "AI & Automation",
        categoryGroup: productForm.categoryGroup,
        localImg: productForm.localImg.trim() || "/assets/work/website-preview/briefvault.png",
        heroDesc: productForm.heroDesc.trim(),
        detailedDesc: productForm.detailedDesc.trim() || productForm.heroDesc.trim(),
        techStack: productForm.techStack.split(",").map((s) => s.trim()).filter(Boolean),
        sourceCodeOffer: {
          fixedPrice: Number(productForm.fixedPrice) || 1999,
          originalPrice: Number(productForm.originalPrice) || 49999,
          discountPercentage: Math.max(1, Math.round(((Number(productForm.originalPrice || 49999) - Number(productForm.fixedPrice || 1999)) / Number(productForm.originalPrice || 49999)) * 100)),
          licenseName: productForm.licenseName.trim() || "Full Commercial Source Code License",
          deliveryMethod: "Instant Encrypted Download (5-Min Expiring Session)",
          deliverables: productForm.deliverables.split("\n").map((s) => s.trim()).filter(Boolean),
          featuresIncluded: productForm.featuresIncluded.split("\n").map((s) => s.trim()).filter(Boolean),
          techStackDetailed: [
            { category: "Full Stack", techs: productForm.techStack.split(",").map((s) => s.trim()).filter(Boolean) },
          ],
        },
        stats: [
          { label: productForm.stat1Label, value: productForm.stat1Val },
          { label: productForm.stat2Label, value: productForm.stat2Val },
          { label: productForm.stat3Label, value: productForm.stat3Val },
          { label: productForm.stat4Label, value: productForm.stat4Val },
        ].filter((s) => s.label && s.value),
        features: [
          { title: productForm.feature1Title, desc: productForm.feature1Desc, iconName: "Sparkles" },
          { title: productForm.feature2Title, desc: productForm.feature2Desc, iconName: "ShieldCheck" },
        ].filter((f) => f.title),
        whiteLabel: [
          { title: productForm.whiteLabel1Title, desc: productForm.whiteLabel1Desc, iconName: "Palette" },
          { title: productForm.whiteLabel2Title, desc: productForm.whiteLabel2Desc, iconName: "Globe" },
        ].filter((w) => w.title),
        interactiveCapabilities: [
          {
            title: productForm.feature1Title || "Core Automation Engine",
            subtitle: "Autonomous Pipeline",
            description: productForm.feature1Desc || "Automates processing with sub-second response times.",
            metrics: productForm.stat1Val || "99% Faster",
            badge: "Core AI",
            previewNote: "Full commercial source code included.",
          },
        ],
        faqs: [
          { q: productForm.faq1Q, a: productForm.faq1A },
          { q: productForm.faq2Q, a: productForm.faq2A },
        ].filter((f) => f.q && f.a),
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to publish product");
      }

      registerCustomProducts([data.product]);
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("sap_custom_products");
        const list = stored ? JSON.parse(stored) : [];
        const filtered = list.filter((p: any) => p.id !== data.product.id);
        filtered.unshift(data.product);
        localStorage.setItem("sap_custom_products", JSON.stringify(filtered));
      }

      setProductsList(getInitialProducts());
      setSelectedProductId(cleanId);
      setNewLinkProduct(cleanId);
      setCreateProductModalOpen(false);
      toast.success(`"${productForm.name}" registered successfully!`);
    } catch (err: any) {
      toast.error(err?.message || "Failed to create product");
    } finally {
      setCreatingProduct(false);
    }
  };

  const handleDeleteCustomProduct = async (productId: string) => {
    if (!confirm(`Are you sure you want to remove custom product "${productId}"?`)) return;
    try {
      const res = await fetch(`/api/admin/products/${productId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Custom product removed.");
        unregisterCustomProduct(productId);
        setProductsList((prev) => prev.filter((p) => p.id !== productId));
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      toast.error("Error deleting product");
    }
  };

  const copyPaymentLink = (link: PaymentLinkItem) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://sapdigitechsolutions.in";
    const fullUrl = `${origin}${link.url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLinkId(link.id);
    toast.success("Payment link copied to clipboard!");
    setTimeout(() => setCopiedLinkId(null), 2500);
  };

  const copyWhatsAppPitch = (link: PaymentLinkItem) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://sapdigitechsolutions.in";
    const fullUrl = `${origin}${link.url}`;
    const pitch = `Hello ${link.clientName && link.clientName !== "Public Storefront" ? link.clientName : "there"},\n\nHere is your verified direct checkout link to acquire the Full Commercial Source Code for *${link.productName}* from SAP DigiTech Solutions:\n\n🔗 *Payment & Instant Download Link:* ${fullUrl}\n💰 *Commercial License Fee:* ₹${link.amount.toLocaleString("en-IN")}\n\n*Included in your package:*\n✅ Full Unminified Frontend & Backend Source Code\n✅ Docker Compose & VPS Auto-Deployment Scripts\n✅ Zero Recurring Royalties or Per-Seat Charges\n✅ Instant Direct .ZIP Download & Verified License\n\nYou can complete the checkout and immediately download your source code archive. Let us know if you need any technical assistance!`;
    navigator.clipboard.writeText(pitch);
    setCopiedPitchId(link.id);
    toast.success("Client WhatsApp proposal message copied!");
    setTimeout(() => setCopiedPitchId(null), 2500);
  };

  useEffect(() => {
    fetchPackages();
    fetchPaymentLinks();
    fetchCustomProducts();
    fetchOrders();
  }, []);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  // Upload handler with real progress and 413 Payload Too Large handling
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    const selectedProduct = productsList.find((p) => p.id === selectedProductId);
    const productName = selectedProduct ? selectedProduct.name : selectedProductId;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("productId", selectedProductId);
    formData.append("productName", productName);
    formData.append("version", version || "v1.0.0");

    try {
      setUploading(true);
      setUploadProgress(0);
      setUploadStatusText("Starting upload...");

      const xhr = new XMLHttpRequest();

      // Real upload progress tracking for large files (500MB+)
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.min(99, Math.round((event.loaded / event.total) * 100));
          const loadedMb = (event.loaded / (1024 * 1024)).toFixed(1);
          const totalMb = (event.total / (1024 * 1024)).toFixed(1);
          setUploadProgress(percent);
          setUploadStatusText(`${loadedMb} MB / ${totalMb} MB (${percent}%)`);
        }
      };

      const responsePromise = new Promise<{ status: number; text: string }>((resolve, reject) => {
        xhr.onload = () => resolve({ status: xhr.status, text: xhr.responseText });
        xhr.onerror = () => reject(new Error("Network connection error during file upload. Check your connection or VPS status."));
        xhr.ontimeout = () => reject(new Error("Upload timed out. Ensure proxy_read_timeout is increased on your VPS Nginx."));
      });

      xhr.open("POST", "/api/admin/upload");
      xhr.send(formData);

      const result = await responsePromise;
      setUploadProgress(100);

      // Handle Nginx 413 Payload Too Large — also catch HTML error pages containing '413'
      const isPayloadTooLarge =
        result.status === 413 ||
        (result.text.includes("<html") && result.text.includes("413"));
      if (isPayloadTooLarge) {
        toast.error(
          "Upload rejected (HTTP 413 Payload Too Large). If using Nginx: add 'client_max_body_size 0;' inside the http { ... } block in /etc/nginx/nginx.conf and run 'sudo nginx -s reload'.",
          { duration: 15000 }
        );
        return;
      }

      let data: any = {};
      try {
        data = JSON.parse(result.text);
      } catch {
        // Server returned non-JSON (likely an HTML error page from a reverse proxy)
        const statusHint = result.status >= 400 ? ` (HTTP ${result.status})` : "";
        toast.error(`Server returned an unexpected response${statusHint}. Check server/proxy logs. Preview: ${result.text.slice(0, 100)}`, { duration: 10000 });
        return;
      }

      if (result.status >= 200 && result.status < 300 && data.success) {
        toast.success(`Successfully uploaded ${selectedFile.name}`);
        setJustUploadedPkg(data.package);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchPackages();
        setActiveTab("packages");
      } else {
        toast.error(data.error || data.message || "Upload failed");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error(err?.message || "Error occurred while uploading package");
    } finally {
      setUploading(false);
      setTimeout(() => {
        setUploadProgress(0);
        setUploadStatusText("");
      }, 1500);
    }
  };

  // Delete handler
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`/api/admin/files/${deleteTarget.token}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success(`Package "${deleteTarget.fileName}" deleted successfully`);
        setPackages((prev) => prev.filter((p) => p.token !== deleteTarget.token));
        if (justUploadedPkg?.token === deleteTarget.token) {
          setJustUploadedPkg(null);
        }
        if (inspectPkg?.token === deleteTarget.token) {
          setInspectPkg(null);
        }
      } else {
        toast.error("Failed to delete package");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting package");
    } finally {
      setDeleteTarget(null);
    }
  };

  // Copy Link Helper
  const copyToClipboard = (token: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://sapdigitechsolutions.in";
    const fullUrl = `${origin}/download/${token}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedToken(token);
    toast.success("Download portal link copied to clipboard!");
    setTimeout(() => setCopiedToken(null), 2500);
  };

  // Filter and Sort packages
  const filteredAndSortedPackages = useMemo(() => {
    return packages
      .filter((pkg) => {
        const matchesProduct = productFilter === "all" || pkg.productId === productFilter;
        const q = searchTerm.toLowerCase().trim();
        const matchesSearch =
          !q ||
          pkg.productName.toLowerCase().includes(q) ||
          pkg.fileName.toLowerCase().includes(q) ||
          pkg.version.toLowerCase().includes(q) ||
          pkg.productId.toLowerCase().includes(q) ||
          pkg.token.toLowerCase().includes(q);
        return matchesProduct && matchesSearch;
      })
      .sort((a, b) => {
        let valA: string | number = a[sortField];
        let valB: string | number = b[sortField];

        if (sortField === "uploadedAt") {
          valA = new Date(a.uploadedAt).getTime();
          valB = new Date(b.uploadedAt).getTime();
        }

        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [packages, searchTerm, productFilter, sortField, sortOrder]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  // Calculate metrics
  const totalDownloads = packages.reduce((acc, p) => acc + (p.downloadCount || 0), 0);
  const totalSizeBytes = packages.reduce((acc, p) => acc + (p.fileSizeBytes || 0), 0);
  const totalSizeFormatted = (totalSizeBytes / (1024 * 1024)).toFixed(1) + " MB";

  const packagesByProduct = useMemo(() => {
    const map: Record<string, StoredPackage[]> = {};
    packages.forEach((pkg) => {
      if (!map[pkg.productId]) map[pkg.productId] = [];
      map[pkg.productId].push(pkg);
    });
    return map;
  }, [packages]);

  // Sidebar navigation configuration
  const navItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Customer Orders", icon: Users, badge: orderSessions.length > 0 ? String(orderSessions.length) : undefined },
    { id: "packages", label: "Code Packages", icon: FolderArchive },
    { id: "payment-links", label: "Payment Links", icon: CreditCard },
    { id: "upload", label: "Upload Release", icon: Upload },
    { id: "products", label: "SaaS Catalog", icon: Box },
    { id: "telemetry", label: "Telemetry & Logs", icon: Activity },
    { id: "server", label: "VPS & Security", icon: Server },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 font-sans selection:bg-orange-500/20 selection:text-orange-950 flex flex-col md:flex-row antialiased">
      {/* ───────────────────── SIDEBAR NAVIGATION ───────────────────── */}
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-40">
        <Link to="/" className="flex items-center">
          <img
            src="/logo/sap_logo.png"
            alt="SAP DigiTech Solutions Logo"
            className="h-7 sm:h-8 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchPackages}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#FF6B00]" : ""}`} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop / Collapsible Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 md:static bg-white border-r border-slate-200 transition-all duration-250 ease-in-out flex flex-col justify-between shadow-sm ${
          sidebarCollapsed ? "md:w-16" : "md:w-52"
        } ${mobileMenuOpen ? "translate-x-0 w-52 shadow-2xl" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-16 flex items-center justify-center relative border-b border-slate-100 transition-all duration-200 px-3">
            <Link to="/" className="flex items-center justify-center overflow-hidden group">
              {sidebarCollapsed ? (
                <img
                  src="/logo/sap_favicon.png"
                  alt="SAP DigiTech Solutions"
                  className="w-8 h-8 rounded-lg object-contain shrink-0 group-hover:scale-105 transition-transform"
                />
              ) : (
                <img
                  src="/logo/sap_logo.png"
                  alt="SAP DigiTech Solutions Logo"
                  className="h-7 w-auto max-w-[130px] object-contain group-hover:opacity-90 transition-opacity mx-auto"
                />
              )}
            </Link>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`hidden md:flex p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 absolute ${
                sidebarCollapsed
                  ? "-right-3 top-5 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-xs items-center justify-center z-30"
                  : "right-2 top-5"
              }`}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as NavigationTab);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg font-medium text-xs transition-all text-left group ${
                    isActive
                      ? "bg-orange-50 text-orange-600 font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  } ${sidebarCollapsed ? "justify-center px-1.5" : ""}`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-orange-600" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                  {!sidebarCollapsed && (
                    <>
                      <span className="truncate flex-1">{item.label}</span>
                      {"badge" in item && item.badge && (
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-orange-100 text-[#FF6B00]">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-2 border-t border-slate-100 space-y-1.5 bg-slate-50/50">
          {/* VPS Health Badge */}
          <div
            className={`p-2 rounded-lg bg-white border border-slate-200/80 shadow-xs flex items-center gap-2 ${
              sidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold text-slate-800 leading-none">VPS Storage Live</div>
                <div className="text-[9px] text-slate-500 font-mono truncate mt-0.5">/var/www/storage/sapstorage</div>
              </div>
            )}
          </div>

          {/* Public Storefront Link */}
          <Link
            to="/products"
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-xs transition-all ${
              sidebarCollapsed ? "justify-center px-1.5" : ""
            }`}
            title="Browse Public Storefront"
          >
            <Layers className="w-4 h-4 text-orange-500 shrink-0" />
            {!sidebarCollapsed && (
              <span className="flex-1 truncate">View Storefront</span>
            )}
          </Link>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-20 md:hidden"
        />
      )}

      {/* ───────────────────── MAIN VIEWPORT AREA ───────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Desktop Bar */}
        <header className="hidden md:flex h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-6 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="text-slate-400">Admin</span>
              <span>/</span>
              <span className="text-slate-900 font-semibold capitalize">{activeTab}</span>
            </div>
            <span className="h-4 w-px bg-slate-200 mx-1" />
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[11px] font-medium">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              <span>Token Protection Active (5-Min Expiry)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchPackages}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs cursor-pointer"
              title="Refresh VPS data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-orange-600" : "text-slate-500"}`} />
              <span>Sync VPS</span>
            </button>

            <button
              onClick={() => setActiveTab("upload")}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FF6B00] hover:bg-[#E05300] text-white text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Archive</span>
            </button>
          </div>
        </header>

        {/* Content Body Container */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Breadcrumb / Section Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "orders" && "Customer Orders & Commercial Licenses"}
                {activeTab === "packages" && "Code Packages & Storage"}
                {activeTab === "payment-links" && "Shareable Payment Links Generator"}
                {activeTab === "upload" && "Upload New Release Archive"}
                {activeTab === "products" && "SaaS Products Repository"}
                {activeTab === "telemetry" && "Download Telemetry & Security"}
                {activeTab === "server" && "VPS Infrastructure & Health"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {activeTab === "overview" && "High-level metrics, storage footprint, customer purchase leads, and quick package operations."}
                {activeTab === "orders" && "Live customer leads, phone numbers, registered billing addresses, and verified source code licenses."}
                {activeTab === "packages" && "Browse, filter, test, and manage all production source code zips."}
                {activeTab === "payment-links" && "Create unique payment links for any SaaS product. Share with clients to pay securely via Razorpay and immediately download source code."}
                {activeTab === "upload" && "Deploy verified .zip packages to VPS root with token-protected links."}
                {activeTab === "products" && "Status of source code archives for all 6 commercial SaaS platforms."}
                {activeTab === "telemetry" && "Live download counters and access logs for verified customers."}
                {activeTab === "server" && "File system paths, security headers, and token inspection tools."}
              </p>
            </div>

            {/* Quick action button inside view */}
            {activeTab === "payment-links" ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCreateLinkModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#E05300] text-white text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-98"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Custom Link</span>
                </button>
              </div>
            ) : activeTab !== "upload" ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("upload")}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-orange-600" />
                  <span>New Zip Release</span>
                </button>
              </div>
            ) : null}
          </div>

          {/* ───────────────────── TAB 1: OVERVIEW ───────────────────── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Metric KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Metric 1 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-slate-500 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Packages Stored</span>
                    <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF6B00]">
                      <FolderArchive className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{packages.length}</div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Across {Object.keys(packagesByProduct).length} active products</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-slate-500 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Downloads</span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                      <Download className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{totalDownloads}</div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified customer portal deliveries</span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-slate-500 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Disk Footprint</span>
                    <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                      <HardDrive className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{totalSizeFormatted}</div>
                  <div className="text-xs text-slate-500 mt-1 font-mono truncate">
                    Storage path: /var/www/storage/...
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-slate-500 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Security Policy</span>
                    <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 flex items-center gap-1.5">
                    <span>5-Min Token</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-purple-600" />
                    <span>Expiring one-time download links</span>
                  </div>
                </div>
              </div>

              {/* Just Uploaded Banner */}
              {justUploadedPkg && (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>New Package Uploaded: {justUploadedPkg.productName} ({justUploadedPkg.version})</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-800">
                          Active
                        </span>
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 font-mono">
                        Portal Token: <span className="text-emerald-700 font-bold">{justUploadedPkg.token}</span> • {justUploadedPkg.fileSizeFormatted}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => copyToClipboard(justUploadedPkg.token)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      {copiedToken === justUploadedPkg.token ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied Link</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Customer Link</span>
                        </>
                      )}
                    </button>
                    <a
                      href={`/download/${justUploadedPkg.token}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Preview Portal</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Quick Actions & Product Status Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Packages Preview */}
                <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Recent Source Code Uploads</h2>
                      <p className="text-xs text-slate-500">Latest archives published to the VPS distribution pipeline.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("packages")}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Full Table</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {packages.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500">
                      <FolderArchive className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                      <p className="text-sm font-medium text-slate-700">No packages uploaded yet</p>
                      <p className="text-xs text-slate-500 mt-0.5">Upload your first code archive to start distributing.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {packages.slice(0, 4).map((pkg) => (
                        <div key={pkg.token} className="py-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">
                              {pkg.productName.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 truncate">
                                <span className="font-semibold text-xs text-slate-900 truncate">{pkg.productName}</span>
                                <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-100 text-slate-600">
                                  {pkg.version}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono truncate">{pkg.fileName} • {pkg.fileSizeFormatted}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                              {pkg.downloadCount || 0} dl
                            </span>
                            <button
                              onClick={() => copyToClipboard(pkg.token)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
                              title="Copy link"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Upload Action Box */}
                <div className="rounded-2xl bg-gradient-to-br from-orange-50/70 to-amber-50/40 border border-orange-200/70 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-orange-200 flex items-center justify-center text-orange-600 mb-3 shadow-xs">
                      <Upload className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Upload Code Archive</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Directly stream new <code className="text-orange-700 font-mono font-semibold">.zip</code> packages to VPS disk storage. Immediately generates customer download links.
                    </p>
                    <div className="mt-4 space-y-2 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Instant verification & checksum</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Protected 5-minute link engine</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Automatic customer email portal sync</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("upload")}
                    className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#E05300] text-white text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Open Upload Center</span>
                  </button>
                </div>
              </div>

              {/* Customer Purchases & Leads Section on Overview */}
              <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-orange-100 text-[#FF6B00] flex items-center justify-center font-bold">
                      <Users className="size-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Recent Customer Purchases & Leads</h2>
                      <p className="text-xs text-slate-500">Clients who completed direct source code checkout and received verified licenses.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={fetchOrders}
                      className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Refresh orders"
                    >
                      <RefreshCw className={`size-3.5 ${loadingOrders ? "animate-spin text-[#FF6B00]" : ""}`} />
                      <span>Sync</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="px-3.5 py-2 rounded-xl bg-orange-50 border border-orange-200 text-[#FF6B00] hover:bg-orange-100 text-xs font-bold transition-colors cursor-pointer"
                    >
                      View All Orders ({orderSessions.length})
                    </button>
                  </div>
                </div>

                {orderSessions.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    No customer purchases recorded yet. Once clients complete checkout on <code className="font-mono text-slate-600">/pay/:product</code>, their contact details and address will appear here.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table className="w-full">
                      <TableHeader className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        <TableRow>
                          <TableHead className="py-2.5 px-3 text-left">Customer / Entity</TableHead>
                          <TableHead className="py-2.5 px-3 text-left">Contact & WhatsApp</TableHead>
                          <TableHead className="py-2.5 px-3 text-left">Billing Address</TableHead>
                          <TableHead className="py-2.5 px-3 text-left">Product License</TableHead>
                          <TableHead className="py-2.5 px-3 text-left">Payment ID</TableHead>
                          <TableHead className="py-2.5 px-3 text-right">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-slate-100 text-xs">
                        {orderSessions.slice(0, 5).map((s) => (
                          <TableRow key={s.sessionToken} className="hover:bg-slate-50/70">
                            <TableCell className="py-3 px-3 font-semibold text-slate-900">{s.customerName}</TableCell>
                            <TableCell className="py-3 px-3">
                              <div className="space-y-0.5 font-mono text-[11px]">
                                <a href={`mailto:${s.customerEmail}`} className="text-sky-600 hover:underline block">{s.customerEmail}</a>
                                {s.customerPhone && (
                                  <a
                                    href={`https://wa.me/${s.customerPhone.replace(/[^0-9]/g, "")}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-emerald-600 hover:underline flex items-center gap-1 font-sans font-medium"
                                  >
                                    <Phone className="size-3" /> {s.customerPhone}
                                  </a>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="py-3 px-3 text-slate-600 max-w-[220px] truncate" title={s.customerAddress}>
                              {s.customerAddress || "—"}
                            </TableCell>
                            <TableCell className="py-3 px-3 font-medium text-slate-800">
                              <span className="font-semibold text-[#FF6B00]">{s.productName}</span>
                            </TableCell>
                            <TableCell className="py-3 px-3 font-mono text-[11px] text-slate-600">
                              {s.paymentId || "—"}
                            </TableCell>
                            <TableCell className="py-3 px-3 text-right text-slate-500 whitespace-nowrap">
                              {new Date(s.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ───────────────────── TAB: CUSTOMER ORDERS & LICENSES ───────────────────── */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              {/* Order KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Licenses Sold</span>
                    <div className="size-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF6B00]">
                      <Users className="size-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{orderSessions.length}</div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                    <span>Verified customer checkouts</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Gross Sales Volume</span>
                    <div className="size-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                      <CreditCard className="size-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    ₹{orderSessions.reduce((acc, s) => acc + (s.amount || 1999), 0).toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <Activity className="size-3.5 text-emerald-600" />
                    <span>Razorpay captured payments</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Code Downloads</span>
                    <div className="size-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                      <Download className="size-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {orderSessions.reduce((acc, s) => acc + (s.downloadCount || 0), 0)}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <ShieldCheck className="size-3.5 text-sky-600" />
                    <span>Fulfilled source code archives</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">WhatsApp Leads</span>
                    <div className="size-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                      <Phone className="size-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {orderSessions.filter((s) => s.customerPhone).length}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                    <span>With verified phone numbers</span>
                  </div>
                </div>
              </div>

              {/* Order Table & Search Toolbar */}
              <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search orders by customer, email, phone, address, product, payment ID..."
                      value={orderSearchTerm}
                      onChange={(e) => setOrderSearchTerm(e.target.value)}
                      className="w-full h-10 pl-9 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                    {orderSearchTerm && (
                      <button
                        onClick={() => setOrderSearchTerm("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={fetchOrders}
                      className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`size-3.5 ${loadingOrders ? "animate-spin text-[#FF6B00]" : ""}`} />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                {orderSessions.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <div className="size-12 rounded-2xl bg-orange-50 text-[#FF6B00] mx-auto grid place-items-center">
                      <Users className="size-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">No Customer Purchases Yet</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                      Whenever a customer enters their billing details (name, email, phone, address) and completes checkout on any <code className="font-mono text-slate-700 font-semibold">/pay/:product</code> page, their complete dossier and payment reference will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table className="w-full">
                      <TableHeader className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        <TableRow>
                          <TableHead className="py-3 px-3 text-left">Licensee / Entity</TableHead>
                          <TableHead className="py-3 px-3 text-left">Contact Details</TableHead>
                          <TableHead className="py-3 px-3 text-left">Registered Address</TableHead>
                          <TableHead className="py-3 px-3 text-left">Product License</TableHead>
                          <TableHead className="py-3 px-3 text-left">Payment ID</TableHead>
                          <TableHead className="py-3 px-3 text-center">Downloads</TableHead>
                          <TableHead className="py-3 px-3 text-left">Date</TableHead>
                          <TableHead className="py-3 px-3 text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-slate-100 text-xs">
                        {orderSessions
                          .filter((s) => {
                            const q = orderSearchTerm.toLowerCase().trim();
                            if (!q) return true;
                            return (
                              s.customerName.toLowerCase().includes(q) ||
                              s.customerEmail.toLowerCase().includes(q) ||
                              (s.customerPhone && s.customerPhone.toLowerCase().includes(q)) ||
                              (s.customerAddress && s.customerAddress.toLowerCase().includes(q)) ||
                              s.productName.toLowerCase().includes(q) ||
                              s.productId.toLowerCase().includes(q) ||
                              (s.paymentId && s.paymentId.toLowerCase().includes(q))
                            );
                          })
                          .map((s) => {
                            const cleanPhone = (s.customerPhone || "").replace(/[^0-9]/g, "");
                            const isCopied = copiedOrderId === s.sessionToken;
                            return (
                              <TableRow key={s.sessionToken} className="hover:bg-orange-50/20 transition-colors">
                                <TableCell className="py-3.5 px-3">
                                  <div className="font-bold text-slate-900">{s.customerName}</div>
                                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">Token: {s.sessionToken.slice(0, 10)}…</div>
                                </TableCell>
                                <TableCell className="py-3.5 px-3">
                                  <div className="space-y-1 font-mono text-[11px]">
                                    <a href={`mailto:${s.customerEmail}`} className="text-sky-600 hover:underline block truncate max-w-[160px]" title={s.customerEmail}>
                                      {s.customerEmail}
                                    </a>
                                    {s.customerPhone ? (
                                      <a
                                        href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(s.customerName)},%20thank%20you%20for%20purchasing%20the%20source%20code%20license%20for%20${encodeURIComponent(s.productName)}%20from%20SAP%20DigiTech%20Solutions.`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-emerald-700 font-bold hover:underline flex items-center gap-1 font-sans text-xs"
                                        title="Chat on WhatsApp"
                                      >
                                        <Phone className="size-3 text-emerald-600" />
                                        <span>{s.customerPhone}</span>
                                      </a>
                                    ) : (
                                      <span className="text-slate-400">—</span>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="py-3.5 px-3 text-slate-700 max-w-[200px]" title={s.customerAddress}>
                                  <div className="line-clamp-2 leading-relaxed text-[11px]">
                                    {s.customerAddress || "—"}
                                  </div>
                                </TableCell>
                                <TableCell className="py-3.5 px-3">
                                  <div className="font-bold text-slate-900">{s.productName}</div>
                                  <div className="text-[10px] text-slate-500 font-mono">{s.productId}</div>
                                  <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold mt-1">
                                    Commercial License
                                  </span>
                                </TableCell>
                                <TableCell className="py-3.5 px-3 font-mono text-[11px] text-slate-700">
                                  <div className="flex items-center gap-1.5">
                                    <span>{s.paymentId || "manual"}</span>
                                    {s.paymentId && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          navigator.clipboard.writeText(s.paymentId!);
                                          setCopiedOrderId(s.sessionToken);
                                          toast.success("Payment ID copied!");
                                          setTimeout(() => setCopiedOrderId(null), 2000);
                                        }}
                                        className="text-slate-400 hover:text-slate-700 cursor-pointer p-0.5"
                                        title="Copy Payment ID"
                                      >
                                        {isCopied ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                                      </button>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="py-3.5 px-3 text-center">
                                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                                    {s.downloadCount || 0}
                                  </span>
                                </TableCell>
                                <TableCell className="py-3.5 px-3 text-slate-500 whitespace-nowrap text-[11px]">
                                  {new Date(s.createdAt).toLocaleString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </TableCell>
                                <TableCell className="py-3.5 px-3 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    {cleanPhone && (
                                      <a
                                        href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(s.customerName)},%20thank%20you%20for%20purchasing%20the%20${encodeURIComponent(s.productName)}%20source%20code%20license.`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                                        title="WhatsApp Customer"
                                      >
                                        <Phone className="size-3.5" />
                                      </a>
                                    )}
                                    <a
                                      href={`/api/download/${s.sessionToken}`}
                                      download
                                      className="p-1.5 rounded-lg bg-orange-50 text-[#FF6B00] hover:bg-orange-100 transition-colors"
                                      title="Download ZIP File"
                                    >
                                      <Download className="size-3.5" />
                                    </a>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ───────────────────── TAB 2: CODE PACKAGES (THE PROPER TABLE) ───────────────────── */}
          {activeTab === "packages" && (
            <div className="space-y-4">
              {/* Table Toolbar: Search, Filters & Counters */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
                  {/* Search Input */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search packages by product, file, version or token..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full h-10 pl-9 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Product Filter Dropdown */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <select
                      value={productFilter}
                      onChange={(e) => setProductFilter(e.target.value)}
                      className="h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs text-slate-700 focus:outline-none focus:border-orange-500 focus:bg-white cursor-pointer"
                    >
                      <option value="all">All Products ({packages.length})</option>
                      {productsList.map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.name} ({packagesByProduct[prod.id]?.length || 0})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Table Stats & Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-medium text-slate-500">
                    Showing <strong className="text-slate-900">{filteredAndSortedPackages.length}</strong> of {packages.length} packages
                  </span>
                  <button
                    onClick={fetchPackages}
                    className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 border border-slate-200 transition-colors"
                    title="Refresh data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-orange-600" : ""}`} />
                  </button>
                </div>
              </div>

              {/* The Proper Data Table */}
              <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
                {loading ? (
                  <div className="p-16 text-center text-slate-500">
                    <RefreshCw className="w-7 h-7 animate-spin mx-auto text-orange-600 mb-3" />
                    <span className="text-sm font-medium">Fetching packages from VPS storage...</span>
                  </div>
                ) : filteredAndSortedPackages.length === 0 ? (
                  <div className="p-16 text-center text-slate-500">
                    <FolderArchive className="w-10 h-10 mx-auto text-slate-400 mb-3" />
                    <h3 className="text-base font-semibold text-slate-800">No packages found</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      {searchTerm || productFilter !== "all"
                        ? "No files match your current search and filter criteria. Try clearing the filter."
                        : "No source code zip packages have been uploaded to the VPS storage yet."}
                    </p>
                    <button
                      onClick={() => setActiveTab("upload")}
                      className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF6B00] text-white text-xs font-semibold shadow-xs hover:bg-[#E05300] transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload First Package</span>
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table className="w-full">
                      <TableHeader className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        <TableRow>
                          {/* Product Header */}
                          <TableHead className="py-3 px-4 text-left">
                            <button
                              onClick={() => toggleSort("productName")}
                              className="inline-flex items-center gap-1 hover:text-slate-900 cursor-pointer"
                            >
                              <span>Product & ID</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </button>
                          </TableHead>

                          {/* Version Header */}
                          <TableHead className="py-3 px-3 text-left">
                            <button
                              onClick={() => toggleSort("version")}
                              className="inline-flex items-center gap-1 hover:text-slate-900 cursor-pointer"
                            >
                              <span>Version</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </button>
                          </TableHead>

                          {/* File Archive Header */}
                          <TableHead className="py-3 px-4 text-left">
                            <button
                              onClick={() => toggleSort("fileSizeBytes")}
                              className="inline-flex items-center gap-1 hover:text-slate-900 cursor-pointer"
                            >
                              <span>File Archive & Size</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </button>
                          </TableHead>

                          {/* Uploaded Date Header */}
                          <TableHead className="py-3 px-4 text-left">
                            <button
                              onClick={() => toggleSort("uploadedAt")}
                              className="inline-flex items-center gap-1 hover:text-slate-900 cursor-pointer"
                            >
                              <span>Uploaded Date</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </button>
                          </TableHead>

                          {/* Downloads Header */}
                          <TableHead className="py-3 px-4 text-center">
                            <button
                              onClick={() => toggleSort("downloadCount")}
                              className="inline-flex items-center gap-1 hover:text-slate-900 cursor-pointer mx-auto"
                            >
                              <span>Downloads</span>
                              <ArrowUpDown className="w-3 h-3" />
                            </button>
                          </TableHead>

                          {/* Token / Portal URL */}
                          <TableHead className="py-3 px-4 text-left">
                            <span>Customer Link</span>
                          </TableHead>

                          {/* Actions Header */}
                          <TableHead className="py-3 px-4 text-right">
                            <span>Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody className="divide-y divide-slate-100 text-xs">
                        {filteredAndSortedPackages.map((pkg) => (
                          <TableRow
                            key={pkg.token}
                            className="hover:bg-orange-50/30 transition-colors group"
                          >
                            {/* Product Cell */}
                            <TableCell className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-orange-100/70 border border-orange-200/80 text-orange-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                                  {pkg.productName.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-slate-900 text-xs leading-tight truncate">
                                    {pkg.productName}
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">
                                    {pkg.productId}
                                  </div>
                                </div>
                              </div>
                            </TableCell>

                            {/* Version Cell */}
                            <TableCell className="py-3.5 px-3">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-orange-100 text-orange-800 border border-orange-200">
                                {pkg.version}
                              </span>
                            </TableCell>

                            {/* File Archive & Size Cell */}
                            <TableCell className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <FileArchive className="w-4 h-4 text-emerald-600 shrink-0" />
                                <div className="min-w-0">
                                  <div
                                    className="font-mono text-slate-800 font-medium truncate max-w-[200px]"
                                    title={pkg.fileName}
                                  >
                                    {pkg.fileName}
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-sans">
                                    {pkg.fileSizeFormatted}
                                  </div>
                                </div>
                              </div>
                            </TableCell>

                            {/* Uploaded Date Cell */}
                            <TableCell className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>
                                  {new Date(pkg.uploadedAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono pl-5">
                                {new Date(pkg.uploadedAt).toLocaleTimeString("en-IN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </TableCell>

                            {/* Downloads Cell */}
                            <TableCell className="py-3.5 px-4 text-center">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold font-mono text-xs">
                                <Download className="w-3 h-3" />
                                <span>{pkg.downloadCount || 0}</span>
                              </span>
                            </TableCell>

                            {/* Customer Access Link Cell */}
                            <TableCell className="py-3.5 px-4">
                              <div className="flex items-center gap-1.5 max-w-[260px]">
                                <div className="truncate font-mono text-[11px] px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 select-all">
                                  /download/{pkg.token.slice(0, 8)}...
                                </div>
                                <button
                                  onClick={() => copyToClipboard(pkg.token)}
                                  className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                                  title="Copy customer download portal URL"
                                >
                                  {copiedToken === pkg.token ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </TableCell>

                            {/* Actions Cell */}
                            <TableCell className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                {/* Inspect Metadata */}
                                <button
                                  onClick={() => setInspectPkg(pkg)}
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                                  title="View package details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                {/* Direct Download Test */}
                                <a
                                  href={`/api/download/${pkg.token}`}
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                                  title="Test direct file download from VPS"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </a>

                                {/* View Customer Portal */}
                                <a
                                  href={`/download/${pkg.token}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                                  title="Open customer download portal"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>

                                {/* Delete Button */}
                                <button
                                  onClick={() => setDeleteTarget(pkg)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                  title="Delete package from VPS"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ───────────────────── TAB 3: UPLOAD RELEASE ───────────────────── */}
          {activeTab === "upload" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">Upload Source Code Archive (.ZIP)</h2>
                    <p className="text-xs text-slate-500">Deploy verified production packages directly to the VPS storage directory.</p>
                  </div>
                </div>

                <form onSubmit={handleUpload} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Target Product */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Target Product <span className="text-orange-600">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={selectedProductId}
                          onChange={(e) => setSelectedProductId(e.target.value)}
                          className="w-full h-11 bg-slate-50 border border-slate-300 rounded-xl px-3.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-orange-500 focus:bg-white appearance-none cursor-pointer"
                        >
                          {productsList.map((prod) => (
                            <option key={prod.id} value={prod.id}>
                              {prod.name} — {prod.badge} ({prod.tagline})
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                          <Box className="w-4 h-4 text-orange-600" />
                        </div>
                      </div>
                    </div>

                    {/* Version */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Release Version <span className="text-orange-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        placeholder="e.g. v1.0.0"
                        className="w-full h-11 bg-slate-50 border border-slate-300 rounded-xl px-3.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-orange-500 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Drag and Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
                      isDragOver
                        ? "border-orange-500 bg-orange-50/50 scale-[1.005]"
                        : selectedFile
                        ? "border-emerald-500/70 bg-emerald-50/40"
                        : "border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {selectedFile ? (
                      <div className="flex flex-col items-center justify-center space-y-2.5">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                          <FileArchive className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-900 block">{selectedFile.name}</span>
                          <span className="text-xs text-emerald-700 font-mono">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for VPS upload
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="text-xs text-rose-600 hover:text-rose-700 font-medium underline pt-1 cursor-pointer"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-2.5">
                        <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Drag & drop <span className="text-orange-600">any file or package</span> here, or <span className="text-orange-600 underline">browse files</span>
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            All file formats supported (.zip, .tar.gz, binaries, archives, installers) with no size limits
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Large File VPS Tip */}
                  <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200/80 text-xs text-slate-700 flex items-start gap-2.5">
                    <Server className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block">Uploading Large Packages (&gt;100MB / 500MB+)?</span>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Ensure your VPS Nginx configuration has <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[11px] text-orange-700 border border-orange-200 font-bold">client_max_body_size 0;</code> inside the <code className="font-mono text-[11px]">http &#123; ... &#125;</code> block in <code className="font-mono text-[11px]">/etc/nginx/nginx.conf</code> to allow files of any size without HTTP 413 (Payload Too Large) errors.
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {uploading && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span className="flex items-center gap-1.5 font-medium">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-600" />
                          <span>Streaming to VPS Storage...</span>
                        </span>
                        <span className="font-mono font-bold text-slate-900">{uploadStatusText || `${uploadProgress}%`}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 transition-all duration-200"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={!selectedFile || uploading}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-xs ${
                        !selectedFile || uploading
                          ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                          : "bg-[#FF6B00] hover:bg-[#E05300] text-white hover:shadow-md cursor-pointer active:scale-98"
                      }`}
                    >
                      {uploading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Saving to VPS Storage...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Deploy Archive to VPS</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ───────────────────── TAB 4: SAAS PRODUCTS CATALOG ───────────────────── */}
          {activeTab === "products" && (
            <div className="space-y-5">
              {/* Header with Search and Add Product Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">Commercial SaaS Repositories</h2>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-[#FF6B00]">
                      {productsList.length} Active Platforms
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage production platforms, download telemetry, upload release archives, or register new commercial products.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveModalTab("basic");
                    setCreateProductModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:from-[#E05300] hover:to-[#C74700] text-white text-xs font-bold shadow-sm hover:shadow transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New SaaS Product</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productsList.map((prod) => {
                  const prodPackages = packagesByProduct[prod.id] || [];
                  const latestPkg = prodPackages[0]; // newest

                  return (
                    <div
                      key={prod.id}
                      className={`rounded-2xl bg-white border p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${
                        prod.isCustom ? "border-orange-200/80 ring-1 ring-orange-100" : "border-slate-200/80"
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 text-[#FF6B00] font-black flex items-center justify-center text-sm shadow-2xs">
                            {prod.name.charAt(0)}
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap justify-end">
                            {prod.isCustom && (
                              <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-orange-500 text-white shadow-2xs">
                                Custom Added
                              </span>
                            )}
                            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              {prod.badge}
                            </span>
                          </div>
                        </div>

                        {(() => {
                          const discountPct = Math.max(
                            1,
                            Math.min(
                              99,
                              Math.round(
                                ((prod.originalPrice - prod.fixedPrice) / (prod.originalPrice || 1)) * 100
                              )
                            )
                          );
                          return (
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-bold text-slate-900 text-sm">{prod.name}</h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-[10px] text-slate-400 line-through">
                                    ₹{prod.originalPrice.toLocaleString("en-IN")}
                                  </span>
                                  <span className="text-xs font-black text-slate-900">
                                    ₹{prod.fixedPrice.toLocaleString("en-IN")}
                                  </span>
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    {discountPct}% OFF
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleOpenPriceModal(prod)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#FF6B00] text-[11px] font-bold transition-colors cursor-pointer shrink-0 border border-orange-200/60"
                                title="Change product pricing"
                              >
                                <DollarSign className="w-3 h-3" />
                                <span>Change Price</span>
                              </button>
                            </div>
                          );
                        })()}
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2">{prod.tagline}</p>

                        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-slate-400 text-[10px] block">Uploaded Zips</span>
                            <span className="font-bold text-slate-800">{prodPackages.length} packages</span>
                          </div>
                          <div>
                            <span className="text-slate-400 text-[10px] block">Latest Version</span>
                            <span className="font-mono font-semibold text-orange-700">
                              {latestPkg ? latestPkg.version : "None"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => handleOpenPriceModal(prod)}
                          className="py-2 px-3 rounded-xl bg-orange-50 hover:bg-[#FF6B00] text-[#FF6B00] hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 border border-orange-200/80"
                          title="Change product price"
                        >
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>Edit Price</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProductId(prod.id);
                            setActiveTab("upload");
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer text-center"
                        >
                          Upload Release
                        </button>
                        <Link
                          to="/products/$productId"
                          params={{ productId: prod.id }}
                          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors"
                          title="View Product Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        {prod.isCustom && (
                          <button
                            onClick={() => handleDeleteCustomProduct(prod.id)}
                            className="p-2 rounded-xl border border-slate-200 hover:bg-rose-50 text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
                            title="Remove Custom Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ───────────────────── TAB 5: TELEMETRY & LOGS ───────────────────── */}
          {activeTab === "telemetry" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Download Analytics by Product */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Downloads Distribution</h3>
                  <p className="text-xs text-slate-500 mb-4">Total verified downloads per SaaS product repository.</p>

                  <div className="space-y-3">
                    {productsList.map((prod) => {
                      const prodPkgs = packagesByProduct[prod.id] || [];
                      const prodDownloads = prodPkgs.reduce((acc, p) => acc + (p.downloadCount || 0), 0);
                      const percentage = totalDownloads > 0 ? Math.round((prodDownloads / totalDownloads) * 100) : 0;

                      return (
                        <div key={prod.id} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-800">{prod.name}</span>
                            <span className="text-slate-500 font-mono">
                              {prodDownloads} downloads ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full bg-orange-500 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Security & Access Policy Card */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">Fulfillment & Token Rules</h3>
                    <p className="text-xs text-slate-500 mb-4">Live security enforcement rules on all generated download tokens.</p>

                    <div className="space-y-3 text-xs text-slate-600">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 block">5-Minute Token Expiry Window</strong>
                          Customer download links expire 300 seconds after payment or generation to prevent unauthorized link sharing.
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                        <Terminal className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 block">HTTP Streaming Attachment Headers</strong>
                          Files are delivered directly through streaming node buffers with no external CDN or public directory leakage.
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                        <Activity className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 block">Download Audit Logging</strong>
                          Every successful file download increments the VPS database counter and tracks timestamp telemetry.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────── TAB 6: VPS & SERVER HEALTH ───────────────────── */}
          {activeTab === "server" && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-xs space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">VPS Infrastructure & File System</h2>
                    <p className="text-xs text-slate-500">Storage daemon configuration and runtime server environment.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">Storage Directory</span>
                    <span className="font-mono font-bold text-slate-800 block mt-1 truncate">
                      /var/www/storage/sapstorage/codes
                    </span>
                    <span className="text-[10px] text-emerald-700 mt-1 inline-block">Read / Write Access Verified</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">Metadata Database</span>
                    <span className="font-mono font-bold text-slate-800 block mt-1 truncate">
                      /var/www/storage/sapstorage/packages.json
                    </span>
                    <span className="text-[10px] text-emerald-700 mt-1 inline-block">JSON Engine Active</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 text-[10px] uppercase font-semibold block">Accepted MIME Type</span>
                    <span className="font-mono font-bold text-slate-800 block mt-1 truncate">
                      Any File Format (*/*)
                    </span>
                    <span className="text-[10px] text-emerald-700 mt-1 inline-block">No Size or Extension Limits</span>
                  </div>
                </div>

                {/* Nginx Upload Configuration Helper */}
                <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-300">
                    <span className="font-sans font-bold text-white flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#FF6B00]" />
                      VPS Nginx Upload Configuration (Fix HTTP 413)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold font-sans">
                      client_max_body_size 0;
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    To allow files of any size (500MB+, 1GB+) without HTTP 413 (Payload Too Large) errors, add these directives inside the <code className="text-orange-400">http &#123; ... &#125;</code> block in <code className="text-white">/etc/nginx/nginx.conf</code>:
                  </p>
                  <div className="bg-black/60 p-3 rounded-lg text-emerald-400 text-[11px] leading-relaxed select-all">
                    client_max_body_size 0;<br />
                    client_body_buffer_size 128k;<br />
                    proxy_read_timeout 600s;<br />
                    proxy_connect_timeout 600s;<br />
                    proxy_send_timeout 600s;<br />
                    client_body_timeout 600s;
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    Then test and reload Nginx: <code className="text-orange-300 font-mono select-all">sudo nginx -t && sudo systemctl reload nginx</code>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>Security Notice for Storage Admins</span>
                  </div>
                  <p>
                    All packages stored on the VPS are served with strict streaming headers (<code className="font-mono">Content-Disposition: attachment</code>). Never place sensitive credentials or environment keys in uploaded production packages.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────── TAB 7: PAYMENT LINKS GENERATOR ───────────────────── */}
          {activeTab === "payment-links" && (
            <div className="space-y-6">
              {/* KPI Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Links</span>
                    <div className="size-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF6B00]">
                      <CreditCard className="size-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{paymentLinks.length}</div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                    <span>6 standard + {paymentLinks.filter((l) => l.isCustom).length} custom links</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Paid Orders</span>
                    <div className="size-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                      <CheckCircle className="size-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {paymentLinks.reduce((acc, l) => acc + (l.totalPaidCount || 0), 0)}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <Activity className="size-3.5 text-emerald-600" />
                    <span>Instant .ZIP deliveries fulfilled</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Gross Link Revenue</span>
                    <div className="size-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                      <HardDrive className="size-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    ₹{paymentLinks
                      .reduce((acc, l) => acc + (l.totalPaidCount || 0) * l.amount, 0)
                      .toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <ShieldCheck className="size-3.5 text-sky-600" />
                    <span>Razorpay settlement ready</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Security Expiry</span>
                    <div className="size-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                      <Clock className="size-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">5-Min .ZIP Link</div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Shield className="size-3.5 text-purple-600" />
                    <span>Time-bound token protection</span>
                  </div>
                </div>
              </div>

              {/* Section 1: Standard Canonical Product Payment Links (All 6 Products) */}
              <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span>Standard Product Shareable Links (6 SaaS Platforms)</span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        Ready To Share
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Direct checkout links for all 6 catalog products. Share with prospective buyers anywhere. They can pay via Razorpay and immediately download the source code package.
                    </p>
                  </div>
                  <button
                    onClick={() => setCreateLinkModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 border border-orange-200 text-[#FF6B00] hover:bg-orange-100 text-xs font-bold transition-colors cursor-pointer shrink-0"
                  >
                    <Plus className="size-3.5" />
                    <span>Create Custom Client Link</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {productsList.map((prod) => {
                    const canonicalLink = paymentLinks.find(
                      (l) => l.productId.toLowerCase() === prod.id.toLowerCase() && !l.isCustom
                    ) || {
                      id: prod.id,
                      productId: prod.id,
                      productName: prod.name,
                      amount: prod.fixedPrice,
                      originalPrice: prod.originalPrice,
                      url: `/pay/${prod.id}`,
                      totalPaidCount: 0,
                      active: true,
                      createdAt: new Date().toISOString(),
                      notes: "Full Commercial Source Code License",
                    };

                    const origin = typeof window !== "undefined" ? window.location.origin : "https://sapdigitechsolutions.in";
                    const directUrl = `${origin}/pay/${prod.id}`;
                    const isCopied = copiedLinkId === prod.id;
                    const isPitchCopied = copiedPitchId === prod.id;

                    return (
                      <div
                        key={prod.id}
                        className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-[#FF6B00]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4 text-left group"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                              {prod.badge}
                            </span>
                            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 className="size-3 text-emerald-500" /> Commercial
                            </span>
                          </div>

                          <div>
                            <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                              {prod.name}
                            </h3>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {prod.tagline}
                            </p>
                          </div>

                          <div className="pt-2 flex items-baseline justify-between border-t border-slate-200/70">
                            <div>
                              <span className="text-xs text-slate-400 line-through mr-1.5">
                                ₹{prod.originalPrice.toLocaleString("en-IN")}
                              </span>
                              <span className="text-xl font-extrabold text-slate-900">
                                ₹{prod.fixedPrice.toLocaleString("en-IN")}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-500 font-medium">
                              {canonicalLink.totalPaidCount || 0} orders
                            </span>
                          </div>

                          {/* Direct Link Readonly Box */}
                          <div className="mt-2 p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2 text-xs font-mono text-slate-600">
                            <span className="truncate text-[11px]">{directUrl}</span>
                            <button
                              type="button"
                              onClick={() => copyPaymentLink(canonicalLink as any)}
                              className="text-slate-400 hover:text-[#FF6B00] cursor-pointer p-1"
                              title="Copy URL"
                            >
                              {isCopied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                            </button>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 border-t border-slate-200/70 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => copyPaymentLink(canonicalLink as any)}
                            className="flex-1 py-2 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                          >
                            {isCopied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                            <span>{isCopied ? "Copied Link" : "Copy Link"}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => copyWhatsAppPitch(canonicalLink as any)}
                            className="py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                            title="Copy WhatsApp proposal message"
                          >
                            {isPitchCopied ? <Check className="size-3.5 text-emerald-600" /> : <MessageSquare className="size-3.5 text-emerald-600" />}
                            <span>Pitch</span>
                          </button>

                          <a
                            href={`/pay/${prod.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-slate-100 hover:bg-[#FF6B00] text-slate-600 hover:text-white transition-colors grid place-items-center"
                            title="Test checkout page in new tab"
                          >
                            <ExternalLink className="size-3.5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Custom Client Payment Links Table */}
              <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span>Custom Client & Quote Links</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                        {paymentLinks.filter((l) => l.isCustom).length} Generated
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tailored payment links created for specific clients, custom quoted pricing, or custom deliverables.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={linkSearchTerm}
                        onChange={(e) => setLinkSearchTerm(e.target.value)}
                        placeholder="Search custom links…"
                        className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 w-52"
                      />
                    </div>

                    <button
                      onClick={() => setCreateLinkModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#E05300] text-white text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0 active:scale-98"
                    >
                      <Plus className="size-3.5" />
                      <span>New Custom Link</span>
                    </button>
                  </div>
                </div>

                {paymentLinks.filter((l) => l.isCustom).length === 0 ? (
                  <div className="py-12 text-center space-y-3 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                    <div className="size-12 rounded-2xl bg-orange-100 text-[#FF6B00] mx-auto grid place-items-center">
                      <CreditCard className="size-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-800">No custom payment links created yet</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Generate unique payment links with custom prices or personalized client names to close deals faster.
                    </p>
                    <button
                      onClick={() => setCreateLinkModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#E05300] text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Create First Custom Link
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="text-[11px] font-bold text-slate-700">Link ID & Code</TableHead>
                          <TableHead className="text-[11px] font-bold text-slate-700">Product</TableHead>
                          <TableHead className="text-[11px] font-bold text-slate-700">Client / Recipient</TableHead>
                          <TableHead className="text-[11px] font-bold text-slate-700">Amount</TableHead>
                          <TableHead className="text-[11px] font-bold text-slate-700">Paid Orders</TableHead>
                          <TableHead className="text-[11px] font-bold text-slate-700">Status</TableHead>
                          <TableHead className="text-[11px] font-bold text-slate-700 text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paymentLinks
                          .filter((l) => l.isCustom)
                          .filter((l) => {
                            const q = linkSearchTerm.toLowerCase().trim();
                            if (!q) return true;
                            return (
                              l.id.toLowerCase().includes(q) ||
                              l.productName.toLowerCase().includes(q) ||
                              (l.clientName && l.clientName.toLowerCase().includes(q))
                            );
                          })
                          .map((link) => {
                            const isCopied = copiedLinkId === link.id;
                            const isPitchCopied = copiedPitchId === link.id;

                            return (
                              <TableRow key={link.id} className="hover:bg-slate-50/80">
                                <TableCell className="font-mono text-xs font-bold text-slate-900">
                                  <div className="flex items-center gap-1.5">
                                    <span>{link.id}</span>
                                    <button
                                      onClick={() => copyPaymentLink(link)}
                                      className="text-slate-400 hover:text-[#FF6B00] p-0.5"
                                      title="Copy link URL"
                                    >
                                      {isCopied ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                                    </button>
                                  </div>
                                  <span className="text-[10px] text-slate-400 font-sans block">
                                    {new Date(link.createdAt).toLocaleDateString()}
                                  </span>
                                </TableCell>
                                <TableCell className="text-xs font-semibold text-slate-800">
                                  {link.productName}
                                </TableCell>
                                <TableCell className="text-xs">
                                  <span className="font-semibold text-slate-900 block">
                                    {link.clientName || "Private Client"}
                                  </span>
                                  {link.notes && (
                                    <span className="text-[10px] text-slate-500 block truncate max-w-[200px]">
                                      {link.notes}
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell className="text-xs font-black text-slate-900">
                                  ₹{link.amount.toLocaleString("en-IN")}
                                </TableCell>
                                <TableCell className="text-xs font-bold text-emerald-600">
                                  {link.totalPaidCount || 0} paid
                                </TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <span className="size-1.5 rounded-full bg-emerald-500" /> Active
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => copyPaymentLink(link)}
                                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition-colors"
                                      title="Copy shareable URL"
                                    >
                                      {isCopied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => copyWhatsAppPitch(link)}
                                      className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs transition-colors"
                                      title="Copy WhatsApp proposal message"
                                    >
                                      {isPitchCopied ? <Check className="size-3.5 text-emerald-600" /> : <MessageSquare className="size-3.5" />}
                                    </button>

                                    <a
                                      href={link.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition-colors"
                                      title="Open checkout page in new tab"
                                    >
                                      <ExternalLink className="size-3.5" />
                                    </a>

                                    <button
                                      type="button"
                                      onClick={() => handleDeletePaymentLink(link.id)}
                                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs transition-colors"
                                      title="Delete payment link"
                                    >
                                      <Trash2 className="size-3.5" />
                                    </button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ───────────────────── MODAL: PACKAGE DETAILS ───────────────────── */}
      {inspectPkg && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                  {inspectPkg.productName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{inspectPkg.productName}</h3>
                  <span className="text-[11px] font-mono text-orange-700 font-semibold">{inspectPkg.version}</span>
                </div>
              </div>
              <button
                onClick={() => setInspectPkg(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Archive File Name</span>
                <span className="font-mono font-medium text-slate-900 block truncate">{inspectPkg.fileName}</span>
                <span className="text-slate-500 font-sans block">{inspectPkg.fileSizeFormatted}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Storage Token</span>
                <span className="font-mono font-medium text-slate-900 block truncate">{inspectPkg.token}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Downloads</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{inspectPkg.downloadCount || 0}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Uploaded On</span>
                  <span className="font-medium text-slate-900 mt-0.5 block">
                    {new Date(inspectPkg.uploadedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                onClick={() => copyToClipboard(inspectPkg.token)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold hover:bg-orange-100 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Customer URL</span>
              </button>
              <a
                href={`/download/${inspectPkg.token}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FF6B00] text-white text-xs font-semibold hover:bg-[#E05300] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Portal</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────── MODAL: DELETE CONFIRMATION ───────────────────── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 text-center flex flex-col items-center">
            <div className="size-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
              <Trash2 className="size-6" />
            </div>

            <div className="space-y-1.5 text-center">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Delete Source Code Archive?</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Are you sure you want to permanently delete <strong className="text-slate-800 font-mono">{deleteTarget.fileName}</strong>? Customer download links associated with this package will cease to function immediately.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3 w-full">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 max-w-[140px] px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 max-w-[180px] px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Yes, Delete Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────── MODAL: CREATE CUSTOM PAYMENT LINK ───────────────────── */}
      {createLinkModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="size-10 rounded-xl bg-orange-100 text-[#FF6B00] flex items-center justify-center font-bold">
                  <CreditCard className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Create Custom Payment Link</h3>
                  <p className="text-xs text-slate-500">Generate a trackable, unique checkout link for a prospective client.</p>
                </div>
              </div>
              <button
                onClick={() => setCreateLinkModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePaymentLink} className="space-y-4 text-left">
              {/* Product Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target SaaS Product <span className="text-rose-500">*</span>
                </label>
                <select
                  value={newLinkProduct}
                  onChange={(e) => {
                    const pid = e.target.value;
                    setNewLinkProduct(pid);
                    const matched = productsList.find((p) => p.id === pid);
                    if (matched) {
                      setNewLinkAmount(matched.fixedPrice);
                    }
                  }}
                  className="w-full h-10 bg-white border border-slate-300 rounded-xl px-3 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00]"
                >
                  {productsList.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name} (Default: ₹{prod.fixedPrice.toLocaleString("en-IN")}) — {prod.badge}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount & Expiry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Custom License Amount (INR) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      min={1}
                      value={newLinkAmount}
                      onChange={(e) => setNewLinkAmount(e.target.value)}
                      placeholder="e.g. 14999"
                      required
                      className="w-full h-10 bg-white border border-slate-300 rounded-xl pl-7 pr-3 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Link Validity Period
                  </label>
                  <select
                    value={newLinkValidityDays}
                    onChange={(e) => setNewLinkValidityDays(Number(e.target.value))}
                    className="w-full h-10 bg-white border border-slate-300 rounded-xl px-3 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00]"
                  >
                    <option value={0}>Never Expires (Permanent)</option>
                    <option value={7}>Valid for 7 Days</option>
                    <option value={14}>Valid for 14 Days</option>
                    <option value={30}>Valid for 30 Days</option>
                  </select>
                </div>
              </div>

              {/* Client / Organization Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Client / Company Name (Optional)
                </label>
                <input
                  type="text"
                  value={newLinkClientName}
                  onChange={(e) => setNewLinkClientName(e.target.value)}
                  placeholder="Enter client or company name"
                  className="w-full h-10 bg-white border border-slate-300 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00]"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Will personalize the checkout banner with "Customized Proposal For: [Client Name]"
                </span>
              </div>

              {/* Client Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Client Email (Prefill)
                  </label>
                  <input
                    type="email"
                    value={newLinkClientEmail}
                    onChange={(e) => setNewLinkClientEmail(e.target.value)}
                    placeholder="client@company.com"
                    className="w-full h-10 bg-white border border-slate-300 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Client WhatsApp / Phone
                  </label>
                  <input
                    type="tel"
                    value={newLinkClientPhone}
                    onChange={(e) => setNewLinkClientPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full h-10 bg-white border border-slate-300 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              {/* Custom Deliverables & Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Custom Notes & Included Deliverables
                </label>
                <textarea
                  rows={2}
                  value={newLinkNotes}
                  onChange={(e) => setNewLinkNotes(e.target.value)}
                  placeholder="e.g. Includes custom Gemini AI prompt configurations and Docker VPS setup guide"
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCreateLinkModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingLink}
                  className="px-5 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#E05300] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-98 disabled:opacity-60"
                >
                  {creatingLink ? "Generating Unique Link…" : "Generate Unique Shareable Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ───────────────────── MODAL: REGISTER NEW SAAS PRODUCT ───────────────────── */}
      {createProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-3xl max-h-[92vh] rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/60">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#E05300] text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/20">
                  <Box className="size-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Register Commercial SaaS Product</h3>
                  <p className="text-xs text-slate-500">Configure complete technical blueprint, commercial deliverables, and catalog pricing.</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={loadBlueprintTemplate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100/70 hover:bg-orange-100 text-[#FF6B00] text-xs font-bold transition-all border border-orange-200/60 cursor-pointer"
                  title="Auto-fill with DevPulse AI Blueprint"
                >
                  <Sparkles className="size-3.5" />
                  <span className="hidden sm:inline">Load SaaS Blueprint</span>
                  <span className="sm:hidden">Template</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCreateProductModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Tab Navigation inside Modal */}
            <div className="flex border-b border-slate-200 bg-white px-6 gap-1 overflow-x-auto text-xs shrink-0">
              <button
                type="button"
                onClick={() => setActiveModalTab("basic")}
                className={`py-3 px-3 font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeModalTab === "basic"
                    ? "border-[#FF6B00] text-[#FF6B00]"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <Tag className="size-3.5" />
                <span>1. Core Identity</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab("overview")}
                className={`py-3 px-3 font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeModalTab === "overview"
                    ? "border-[#FF6B00] text-[#FF6B00]"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <FileText className="size-3.5" />
                <span>2. Overview & Stack</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab("pricing")}
                className={`py-3 px-3 font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeModalTab === "pricing"
                    ? "border-[#FF6B00] text-[#FF6B00]"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <DollarSign className="size-3.5" />
                <span>3. Pricing & Deliverables</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab("specs")}
                className={`py-3 px-3 font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeModalTab === "specs"
                    ? "border-[#FF6B00] text-[#FF6B00]"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <Sparkles className="size-3.5" />
                <span>4. Stats, Features & FAQs</span>
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleCreateProduct} className="flex-1 flex flex-col min-h-0 overflow-hidden text-left">
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
                {/* ─── TAB 1: CORE IDENTITY ─── */}
                {activeModalTab === "basic" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Product Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={productForm.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setProductForm((prev) => ({
                              ...prev,
                              name: val,
                              id: prev.id === "" || prev.id === prev.name.toLowerCase().replace(/[^a-z0-9]/g, "")
                                ? val.toLowerCase().replace(/[^a-z0-9]/g, "")
                                : prev.id,
                            }));
                          }}
                          placeholder="e.g. DevPulse AI"
                          className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Product ID / Slug <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={productForm.id}
                          onChange={(e) => setProductForm({ ...productForm, id: e.target.value })}
                          placeholder="e.g. devpulse"
                          className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white"
                        />
                        <span className="text-[10px] text-slate-400 mt-0.5 block">
                          URL: /products/{productForm.id || "slug"} and /pay/{productForm.id || "slug"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Punchy Product Tagline
                      </label>
                      <input
                        type="text"
                        value={productForm.tagline}
                        onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                        placeholder="e.g. Autonomous Code Review, Refactoring & Security Audit Platform"
                        className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Category Group
                        </label>
                        <select
                          value={productForm.categoryGroup}
                          onChange={(e) => setProductForm({ ...productForm, categoryGroup: e.target.value as any })}
                          className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white font-medium"
                        >
                          <option value="AI & Automation">AI & Automation</option>
                          <option value="Operations & Growth">Operations & Growth</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Category Label
                        </label>
                        <input
                          type="text"
                          value={productForm.categoryName}
                          onChange={(e) => setProductForm({ ...productForm, categoryName: e.target.value })}
                          placeholder="e.g. Developer Tools & AI"
                          className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Badge / Pill Text
                        </label>
                        <input
                          type="text"
                          value={productForm.badge}
                          onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                          placeholder="e.g. AI CODE TECH, HOT, NEW"
                          className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white uppercase font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Live Demo / Website URL
                        </label>
                        <input
                          type="url"
                          value={productForm.url}
                          onChange={(e) => setProductForm({ ...productForm, url: e.target.value })}
                          placeholder="https://devpulse.ai/"
                          className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Preview Image Path
                        </label>
                        <input
                          type="text"
                          value={productForm.localImg}
                          onChange={(e) => setProductForm({ ...productForm, localImg: e.target.value })}
                          placeholder="/assets/work/website-preview/briefvault.png"
                          className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── TAB 2: OVERVIEW & TECH STACK ─── */}
                {activeModalTab === "overview" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Hero Description (Hook) <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={productForm.heroDesc}
                        onChange={(e) => setProductForm({ ...productForm, heroDesc: e.target.value })}
                        placeholder="1-2 sentence hook highlighting the core transformation and instant value."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white resize-none leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Detailed Enterprise Description
                      </label>
                      <textarea
                        rows={4}
                        value={productForm.detailedDesc}
                        onChange={(e) => setProductForm({ ...productForm, detailedDesc: e.target.value })}
                        placeholder="Comprehensive breakdown explaining target market, user workflow, and technical architecture."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white resize-none leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Tech Stack (Comma-Separated)
                      </label>
                      <input
                        type="text"
                        value={productForm.techStack}
                        onChange={(e) => setProductForm({ ...productForm, techStack: e.target.value })}
                        placeholder="React 19, TypeScript, Node.js, Python, PostgreSQL, Docker, Redis"
                        className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Tags displayed on the product cards and tech architecture section.
                      </span>
                    </div>
                  </div>
                )}

                {/* ─── TAB 3: PRICING & DELIVERABLES ─── */}
                {activeModalTab === "pricing" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Selling Fixed Price (INR) <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                          <input
                            type="number"
                            min={1}
                            required
                            value={productForm.fixedPrice}
                            onChange={(e) => setProductForm({ ...productForm, fixedPrice: Number(e.target.value) })}
                            className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl pl-7 pr-3 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Original Anchor Price (INR)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                          <input
                            type="number"
                            min={1}
                            value={productForm.originalPrice}
                            onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                            className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl pl-7 pr-3 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Commercial License Title
                      </label>
                      <input
                        type="text"
                        value={productForm.licenseName}
                        onChange={(e) => setProductForm({ ...productForm, licenseName: e.target.value })}
                        placeholder="Full Commercial Source Code License"
                        className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Source Code Deliverables (One per line)
                      </label>
                      <textarea
                        rows={4}
                        value={productForm.deliverables}
                        onChange={(e) => setProductForm({ ...productForm, deliverables: e.target.value })}
                        placeholder={"Complete React 19 Frontend Code\nNode.js Backend Engine\nDocker Compose & Cloud Configs"}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white leading-relaxed resize-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Features Included With License (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={productForm.featuresIncluded}
                        onChange={(e) => setProductForm({ ...productForm, featuresIncluded: e.target.value })}
                        placeholder={"Lifetime Commercial License\nUnlimited Client Deployments\n1 Year Free Updates"}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF6B00] focus:bg-white leading-relaxed resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* ─── TAB 4: STATS, FEATURES & FAQS ─── */}
                {activeModalTab === "specs" && (
                  <div className="space-y-4">
                    {/* Key Metrics Grid */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1.5">
                        Key Performance Metrics & Stats (4 Highlights)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div className="space-y-1">
                          <input
                            type="text"
                            value={productForm.stat1Label}
                            onChange={(e) => setProductForm({ ...productForm, stat1Label: e.target.value })}
                            placeholder="Label (e.g. Speed)"
                            className="w-full h-8 bg-slate-50 border border-slate-300 rounded-lg px-2 text-[11px] text-slate-700"
                          />
                          <input
                            type="text"
                            value={productForm.stat1Val}
                            onChange={(e) => setProductForm({ ...productForm, stat1Val: e.target.value })}
                            placeholder="Value (e.g. < 15s)"
                            className="w-full h-8 bg-slate-50 border border-slate-300 rounded-lg px-2 text-[11px] font-bold text-orange-700"
                          />
                        </div>

                        <div className="space-y-1">
                          <input
                            type="text"
                            value={productForm.stat2Label}
                            onChange={(e) => setProductForm({ ...productForm, stat2Label: e.target.value })}
                            placeholder="Label (e.g. Accuracy)"
                            className="w-full h-8 bg-slate-50 border border-slate-300 rounded-lg px-2 text-[11px] text-slate-700"
                          />
                          <input
                            type="text"
                            value={productForm.stat2Val}
                            onChange={(e) => setProductForm({ ...productForm, stat2Val: e.target.value })}
                            placeholder="Value (e.g. 99.2%)"
                            className="w-full h-8 bg-slate-50 border border-slate-300 rounded-lg px-2 text-[11px] font-bold text-orange-700"
                          />
                        </div>

                        <div className="space-y-1">
                          <input
                            type="text"
                            value={productForm.stat3Label}
                            onChange={(e) => setProductForm({ ...productForm, stat3Label: e.target.value })}
                            placeholder="Label (e.g. Formats)"
                            className="w-full h-8 bg-slate-50 border border-slate-300 rounded-lg px-2 text-[11px] text-slate-700"
                          />
                          <input
                            type="text"
                            value={productForm.stat3Val}
                            onChange={(e) => setProductForm({ ...productForm, stat3Val: e.target.value })}
                            placeholder="Value (e.g. PDF, DOCX)"
                            className="w-full h-8 bg-slate-50 border border-slate-300 rounded-lg px-2 text-[11px] font-bold text-orange-700"
                          />
                        </div>

                        <div className="space-y-1">
                          <input
                            type="text"
                            value={productForm.stat4Label}
                            onChange={(e) => setProductForm({ ...productForm, stat4Label: e.target.value })}
                            placeholder="Label (e.g. Clients)"
                            className="w-full h-8 bg-slate-50 border border-slate-300 rounded-lg px-2 text-[11px] text-slate-700"
                          />
                          <input
                            type="text"
                            value={productForm.stat4Val}
                            onChange={(e) => setProductForm({ ...productForm, stat4Val: e.target.value })}
                            placeholder="Value (e.g. 1,500+)"
                            className="w-full h-8 bg-slate-50 border border-slate-300 rounded-lg px-2 text-[11px] font-bold text-orange-700"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Core Features */}
                    <div className="pt-2 border-t border-slate-100">
                      <label className="block font-semibold text-slate-700 mb-1.5">
                        Core Platform Capabilities
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                          <input
                            type="text"
                            value={productForm.feature1Title}
                            onChange={(e) => setProductForm({ ...productForm, feature1Title: e.target.value })}
                            placeholder="Feature 1 Title"
                            className="w-full h-8 bg-white border border-slate-300 rounded-lg px-2 text-xs font-bold"
                          />
                          <textarea
                            rows={2}
                            value={productForm.feature1Desc}
                            onChange={(e) => setProductForm({ ...productForm, feature1Desc: e.target.value })}
                            placeholder="Feature 1 description..."
                            className="w-full bg-white border border-slate-300 rounded-lg p-2 text-[11px] resize-none"
                          />
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                          <input
                            type="text"
                            value={productForm.feature2Title}
                            onChange={(e) => setProductForm({ ...productForm, feature2Title: e.target.value })}
                            placeholder="Feature 2 Title"
                            className="w-full h-8 bg-white border border-slate-300 rounded-lg px-2 text-xs font-bold"
                          />
                          <textarea
                            rows={2}
                            value={productForm.feature2Desc}
                            onChange={(e) => setProductForm({ ...productForm, feature2Desc: e.target.value })}
                            placeholder="Feature 2 description..."
                            className="w-full bg-white border border-slate-300 rounded-lg p-2 text-[11px] resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* White Label Rights */}
                    <div className="pt-2 border-t border-slate-100">
                      <label className="block font-semibold text-slate-700 mb-1.5">
                        Commercial Ownership & Resale Perks
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                          <input
                            type="text"
                            value={productForm.whiteLabel1Title}
                            onChange={(e) => setProductForm({ ...productForm, whiteLabel1Title: e.target.value })}
                            placeholder="Perk 1 (e.g. 100% Brand Ownership)"
                            className="w-full h-8 bg-white border border-slate-300 rounded-lg px-2 text-xs font-bold"
                          />
                          <textarea
                            rows={2}
                            value={productForm.whiteLabel1Desc}
                            onChange={(e) => setProductForm({ ...productForm, whiteLabel1Desc: e.target.value })}
                            placeholder="Perk 1 description..."
                            className="w-full bg-white border border-slate-300 rounded-lg p-2 text-[11px] resize-none"
                          />
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                          <input
                            type="text"
                            value={productForm.whiteLabel2Title}
                            onChange={(e) => setProductForm({ ...productForm, whiteLabel2Title: e.target.value })}
                            placeholder="Perk 2 (e.g. Commercial Resale Rights)"
                            className="w-full h-8 bg-white border border-slate-300 rounded-lg px-2 text-xs font-bold"
                          />
                          <textarea
                            rows={2}
                            value={productForm.whiteLabel2Desc}
                            onChange={(e) => setProductForm({ ...productForm, whiteLabel2Desc: e.target.value })}
                            placeholder="Perk 2 description..."
                            className="w-full bg-white border border-slate-300 rounded-lg p-2 text-[11px] resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* FAQs */}
                    <div className="pt-2 border-t border-slate-100">
                      <label className="block font-semibold text-slate-700 mb-1.5">
                        Frequently Asked Questions (FAQs)
                      </label>
                      <div className="space-y-2.5">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                          <input
                            type="text"
                            value={productForm.faq1Q}
                            onChange={(e) => setProductForm({ ...productForm, faq1Q: e.target.value })}
                            placeholder="Question 1 (e.g. What source code do I receive?)"
                            className="w-full h-8 bg-white border border-slate-300 rounded-lg px-2 text-xs font-semibold"
                          />
                          <textarea
                            rows={2}
                            value={productForm.faq1A}
                            onChange={(e) => setProductForm({ ...productForm, faq1A: e.target.value })}
                            placeholder="Answer 1..."
                            className="w-full bg-white border border-slate-300 rounded-lg p-2 text-[11px] resize-none"
                          />
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                          <input
                            type="text"
                            value={productForm.faq2Q}
                            onChange={(e) => setProductForm({ ...productForm, faq2Q: e.target.value })}
                            placeholder="Question 2 (e.g. Can I host this on our own VPS?)"
                            className="w-full h-8 bg-white border border-slate-300 rounded-lg px-2 text-xs font-semibold"
                          />
                          <textarea
                            rows={2}
                            value={productForm.faq2A}
                            onChange={(e) => setProductForm({ ...productForm, faq2A: e.target.value })}
                            placeholder="Answer 2..."
                            className="w-full bg-white border border-slate-300 rounded-lg p-2 text-[11px] resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Action Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Section:</span>
                  <span className="capitalize font-medium text-orange-600">{activeModalTab}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setCreateProductModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  {activeModalTab !== "specs" ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (activeModalTab === "basic") setActiveModalTab("overview");
                        else if (activeModalTab === "overview") setActiveModalTab("pricing");
                        else if (activeModalTab === "pricing") setActiveModalTab("specs");
                      }}
                      className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Next Step →
                    </button>
                  ) : null}

                  <button
                    type="submit"
                    disabled={creatingProduct}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:from-[#E05300] hover:to-[#C74700] text-white text-xs font-bold transition-all shadow-sm hover:shadow cursor-pointer active:scale-98 disabled:opacity-60 flex items-center gap-1.5"
                  >
                    {creatingProduct ? (
                      <>
                        <RefreshCw className="size-3.5 animate-spin" />
                        <span>Publishing to VPS…</span>
                      </>
                    ) : (
                      <>
                        <Plus className="size-3.5" />
                        <span>Publish SaaS Product</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ───────────────────── PRICE EDIT MODAL ───────────────────── */}
      {priceModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-orange-50/70 via-white to-amber-50/40">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#E05300] text-white flex items-center justify-center shadow-md shadow-orange-500/20">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">Change Product Pricing</h2>
                    <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-orange-100 text-[#FF6B00]">
                      {editingProduct.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {editingProduct.name} — updates Razorpay checkout and front-end displays in real time.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPriceModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSavePrice} className="p-5 sm:p-6 space-y-5 overflow-y-auto">
              {/* Live Preview Card */}
              {(() => {
                const fixed = Math.max(0, Math.round(Number(editFixedPrice) || 0));
                const original = Math.max(fixed, Math.round(Number(editOriginalPrice) || 0));
                const discount = original > fixed
                  ? Math.max(1, Math.min(99, Math.round(((original - fixed) / original) * 100)))
                  : 0;

                return (
                  <div className="rounded-2xl bg-[#0B0F19] text-white p-5 border border-slate-800 shadow-md space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF6B00] font-bold">
                        Live Storefront Preview
                      </span>
                      <span className="text-[10px] text-slate-400 font-sans">
                        Full Commercial License
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <div className="text-xs text-slate-400 font-medium">Customer Checkout Price</div>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-3xl font-black text-white tracking-tight">
                            ₹{fixed.toLocaleString("en-IN")}
                          </span>
                          {original > fixed && (
                            <span className="text-sm text-slate-400 line-through">
                              ₹{original.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                      </div>

                      {discount > 0 && (
                        <div className="text-right">
                          <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-[#FF6B00] text-white shadow-sm">
                            Save {discount}% One-Time Fixed
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Razorpay Gateway Sync</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Instant Front-End Update</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Price Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Fixed Selling Price */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Selling Price (INR) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      required
                      value={editFixedPrice}
                      onChange={(e) => setEditFixedPrice(e.target.value)}
                      placeholder="1999"
                      className="w-full h-11 pl-8 pr-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#FF6B00] focus:bg-white focus:ring-2 focus:ring-[#FF6B00]/15"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">The amount charged at Razorpay checkout.</p>
                </div>

                {/* Original Comparison Price */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Original Price (INR) <span className="text-slate-400 font-normal">(Crossed out)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={editOriginalPrice}
                      onChange={(e) => setEditOriginalPrice(e.target.value)}
                      placeholder="49999"
                      className="w-full h-11 pl-8 pr-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#FF6B00] focus:bg-white focus:ring-2 focus:ring-[#FF6B00]/15"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">Used to show customer discount percentage.</p>
                </div>
              </div>

              {/* Quick Pricing Presets */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-semibold text-slate-600">
                  Quick Price Presets
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[
                    { label: "Promo", price: 999, orig: 24999 },
                    { label: "Starter", price: 1499, orig: 34999 },
                    { label: "Standard", price: 1999, orig: 49999 },
                    { label: "Pro", price: 2499, orig: 49999 },
                    { label: "Agency", price: 4999, orig: 69999 },
                    { label: "VIP", price: 9999, orig: 99999 },
                  ].map((preset) => (
                    <button
                      key={preset.price}
                      type="button"
                      onClick={() => {
                        setEditFixedPrice(preset.price);
                        setEditOriginalPrice(preset.orig);
                      }}
                      className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                        Number(editFixedPrice) === preset.price
                          ? "bg-orange-50 border-[#FF6B00] text-[#FF6B00] font-bold shadow-2xs"
                          : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700 font-medium"
                      }`}
                    >
                      <div className="text-[10px] text-slate-400">{preset.label}</div>
                      <div className="text-xs font-bold leading-tight mt-0.5">₹{preset.price.toLocaleString("en-IN")}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Informational Scope Note */}
              <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200/80 text-xs text-orange-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-[#E05300]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Immediate Live Reflection</span>
                </div>
                <p className="text-[11px] text-orange-800 leading-relaxed">
                  Saving updates <code className="font-mono font-semibold">/products/{editingProduct.id}</code>, the <code className="font-mono font-semibold">/products</code> catalog, and the direct Razorpay payment link <code className="font-mono font-semibold">/pay/{editingProduct.id}</code> without needing to rebuild or restart the VPS server.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPriceModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingPrice}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:from-[#E05300] hover:to-[#C74700] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-98 disabled:opacity-60"
                >
                  {savingPrice ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Price...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Save & Reflect Pricing</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
