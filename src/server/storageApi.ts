import { existsSync, readFileSync } from "fs";
import {
  savePackage,
  listPackages,
  deletePackage,
  createDownloadSession,
  inspectToken,
  refreshDownloadSession,
  recordSessionDownload,
  listPaymentLinks,
  createPaymentLink,
  getPaymentLinkById,
  deletePaymentLink,
  recordPaymentLinkUsage,
  DEFAULT_PRODUCT_PAYMENT_CONFIGS,
  getCustomProducts,
  saveCustomProduct,
  deleteCustomProduct,
  type CustomProductDetail,
} from "./storageManager";
import { sendCustomerDownloadEmail } from "./emailService";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/**
 * Handle incoming storage, payment fulfillment, and expiring download API requests
 */
export async function handleStorageApi(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // 1f. Products List: GET /api/admin/products or GET /api/products
  if ((pathname === "/api/admin/products" || pathname === "/api/products") && request.method === "GET") {
    try {
      const customProducts = getCustomProducts();
      return new Response(JSON.stringify({ success: true, customProducts }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Failed to list custom products:", err);
      return new Response(JSON.stringify({ error: "Failed to list products" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // 1g. Admin Create Product: POST /api/admin/products
  if (pathname === "/api/admin/products" && request.method === "POST") {
    try {
      const body = await request.json();
      const {
        id,
        name,
        tagline,
        url: productUrl,
        badge,
        categoryName,
        categoryGroup,
        heroDesc,
        detailedDesc,
        techStack,
        features,
        whiteLabel,
        sourceCodeOffer,
        interactiveCapabilities,
        faqs,
        stats,
        localImg,
      } = body;

      if (!id || !name || !heroDesc) {
        return new Response(
          JSON.stringify({ error: "Product ID, Name, and Hero Description are required." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const product: CustomProductDetail = {
        id: id.toLowerCase().trim().replace(/[^a-z0-9_-]/g, ""),
        name: name.trim(),
        tagline: tagline?.trim() || `${name} — Production SaaS Platform`,
        url: productUrl?.trim() || `https://${id.toLowerCase().trim()}.com/`,
        localImg: localImg?.trim() || "/assets/work/website-preview/briefvault.png",
        badge: badge?.trim() || "NEW SAAS",
        categoryName: categoryName?.trim() || "AI & Automation",
        categoryGroup: categoryGroup === "Operations & Growth" ? "Operations & Growth" : "AI & Automation",
        heroDesc: heroDesc.trim(),
        detailedDesc: detailedDesc?.trim() || heroDesc.trim(),
        techStack: Array.isArray(techStack) && techStack.length > 0 ? techStack : ["React 19", "TypeScript", "Node.js", "TailwindCSS"],
        features: Array.isArray(features) ? features : [],
        whiteLabel: Array.isArray(whiteLabel) ? whiteLabel : [],
        sourceCodeOffer: sourceCodeOffer || {
          fixedPrice: 1999,
          originalPrice: 49999,
          discountPercentage: 96,
          licenseName: "Full Commercial Source Code License",
          deliveryMethod: "Instant Encrypted Download (5-Min Expiring Session)",
          deliverables: [
            "Complete Frontend & Backend Source Code",
            "Docker Deployment & Environment Configs",
            "Full Commercial Rights with Zero Royalties",
          ],
          featuresIncluded: [
            "Lifetime Commercial License",
            "1 Year of Updates & Support",
          ],
          techStackDetailed: [
            { category: "Frontend", techs: ["React 19", "TypeScript", "TailwindCSS"] },
            { category: "Backend", techs: ["Node.js", "RESTful API"] },
          ],
        },
        interactiveCapabilities: Array.isArray(interactiveCapabilities) ? interactiveCapabilities : [],
        faqs: Array.isArray(faqs) ? faqs : [],
        stats: Array.isArray(stats) ? stats : [],
      };

      const saved = saveCustomProduct(product);
      return new Response(JSON.stringify({ success: true, product: saved }), {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err: any) {
      console.error("Failed to create custom product:", err);
      return new Response(JSON.stringify({ error: err?.message || "Failed to create product" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // 1h. Admin Delete Product: DELETE /api/admin/products/:id
  if (pathname.startsWith("/api/admin/products/") && request.method === "DELETE") {
    const prodId = pathname.replace("/api/admin/products/", "").trim();
    const success = deleteCustomProduct(prodId);
    return new Response(JSON.stringify({ success }), {
      status: success ? 200 : 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // 1. Payment Completion & 5-Minute Link Generation: POST /api/payment/complete
  if (pathname === "/api/payment/complete" && request.method === "POST") {
    try {
      const body = await request.json();
      const {
        paymentId,
        orderId,
        signature,
        productId,
        productName,
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        linkId,
      } = body;

      if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
        return new Response(
          JSON.stringify({
            error: "All customer billing fields (name, email, phone, address) are strictly mandatory.",
          }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Generate a secure 5-minute expiring download session
      const session = createDownloadSession({
        productId: productId || "briefvault",
        productName: productName || productId || "SaaS Product",
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        customerAddress: customerAddress.trim(),
        paymentId: paymentId || "manual_test",
        validityMinutes: 5,
      });

      const origin = url.origin || "https://sapdigitechsolutions.in";
      const downloadPortalUrl = `${origin}/download/${session.sessionToken}`;
      const directDownloadUrl = `${origin}/api/download/${session.sessionToken}`;

      // Asynchronously trigger customer email with 5-minute link
      sendCustomerDownloadEmail({
        customerEmail: session.customerEmail,
        customerName: session.customerName,
        productName: session.productName,
        paymentId: session.paymentId || "N/A",
        downloadPortalUrl,
        directDownloadUrl,
        expiresInMinutes: 5,
      }).catch((emailErr) => {
        console.error("Async email error:", emailErr);
      });

      // Record payment usage against unique payment link if present
      try {
        recordPaymentLinkUsage(linkId || productId || "briefvault");
      } catch (linkErr) {
        console.warn("Failed recording payment link usage:", linkErr);
      }

      return new Response(
        JSON.stringify({
          success: true,
          token: session.sessionToken,
          portalUrl: downloadPortalUrl,
          downloadUrl: directDownloadUrl,
          expiresAt: session.expiresAt,
          remainingSeconds: 300,
          customerEmail: session.customerEmail,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error("❌ Failed to process payment completion:", err);
      return new Response(
        JSON.stringify({ error: "Failed to complete payment fulfillment" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }

  // 1b. Admin Payment Links List: GET /api/admin/payment-links
  if (pathname === "/api/admin/payment-links" && request.method === "GET") {
    try {
      const links = listPaymentLinks();
      return new Response(JSON.stringify({ success: true, links }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Failed to list payment links:", err);
      return new Response(JSON.stringify({ error: "Failed to list payment links" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // 1c. Admin Create Unique Payment Link: POST /api/admin/payment-links
  if (pathname === "/api/admin/payment-links" && request.method === "POST") {
    try {
      const body = await request.json();
      const {
        productId,
        productName,
        amount,
        originalPrice,
        clientName,
        clientEmail,
        clientPhone,
        notes,
        validityDays,
      } = body;

      if (!productId || amount === undefined || amount === null) {
        return new Response(
          JSON.stringify({ error: "Product ID and Amount are required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const resolvedName = productName || (DEFAULT_PRODUCT_PAYMENT_CONFIGS.find(c => c.id === productId)?.name) || productId;

      const link = createPaymentLink({
        productId,
        productName: resolvedName,
        amount: Number(amount),
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        clientName,
        clientEmail,
        clientPhone,
        notes,
        validityDays: validityDays ? Number(validityDays) : null,
      });

      return new Response(JSON.stringify({ success: true, link }), {
        status: 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err: any) {
      console.error("Failed to create payment link:", err);
      return new Response(JSON.stringify({ error: err?.message || String(err) }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // 1d. Admin Delete Payment Link: DELETE /api/admin/payment-links/:id
  if (pathname.startsWith("/api/admin/payment-links/") && request.method === "DELETE") {
    const linkId = pathname.replace("/api/admin/payment-links/", "").trim();
    const success = deletePaymentLink(linkId);
    return new Response(JSON.stringify({ success }), {
      status: success ? 200 : 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // 1e. Public Payment Link Info: GET /api/payment-link/:id
  if (pathname.startsWith("/api/payment-link/") && request.method === "GET") {
    const linkId = pathname.replace("/api/payment-link/", "").trim();
    const link = getPaymentLinkById(linkId);
    if (!link) {
      return new Response(JSON.stringify({ error: "Payment link not found or expired" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ success: true, link }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // 2. Link Refresh Disabled for Security: POST /api/download-link/refresh
  if (pathname === "/api/download-link/refresh") {
    return new Response(
      JSON.stringify({
        error: "Link regeneration is disabled for security and license protection. Please contact official support.",
      }),
      { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // 3. Upload API: POST /api/admin/upload
  if (pathname === "/api/admin/upload" && request.method === "POST") {
    try {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      const productId = (formData.get("productId") as string) || "product";
      const productName = (formData.get("productName") as string) || productId;
      const version = (formData.get("version") as string) || "v1.0.0";

      if (!file || !(file instanceof File) || file.size === 0) {
        return new Response(
          JSON.stringify({ error: "Missing or invalid zip file" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const originalFileName = file.name || `${productId}.zip`;
      if (!originalFileName.toLowerCase().endsWith(".zip")) {
        return new Response(
          JSON.stringify({ error: "Only .zip files are allowed for source code packages" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const pkg = savePackage({
        buffer,
        originalFileName,
        productId,
        productName,
        version,
      });

      // Also create a default 5-minute session for instant testing
      const session = createDownloadSession({
        productId,
        productName,
        customerName: "Admin User",
        customerEmail: "admin@sapdigitechsolutions.in",
        validityMinutes: 5,
      });

      return new Response(
        JSON.stringify({ success: true, package: pkg, initialSessionToken: session.sessionToken }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error("❌ Failed to process code upload:", err);
      return new Response(
        JSON.stringify({
          error: "Upload failed",
          message: err instanceof Error ? err.message : "Unknown error",
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }

  // 4. List all packages: GET /api/admin/files
  if (pathname === "/api/admin/files" && request.method === "GET") {
    try {
      const files = listPackages();
      return new Response(
        JSON.stringify({ success: true, files }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Failed to list files" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }

  // 5. Delete package: DELETE /api/admin/files/:token
  if (pathname.startsWith("/api/admin/files/") && request.method === "DELETE") {
    const token = pathname.replace("/api/admin/files/", "").trim();
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Missing token" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const success = deletePackage(token);
    return new Response(
      JSON.stringify({ success }),
      { status: success ? 200 : 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // 6. Public Package & Expiration Metadata: GET /api/package-info/:token
  if (pathname.startsWith("/api/package-info/") && request.method === "GET") {
    const token = pathname.replace("/api/package-info/", "").trim();
    const inspection = inspectToken(token);

    if (!inspection) {
      return new Response(
        JSON.stringify({ error: "Package or download session not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { session, pkg, isExpired, remainingSeconds, remainingFormatted } = inspection;

    return new Response(
      JSON.stringify({
        success: true,
        isExpired,
        remainingSeconds,
        remainingFormatted,
        expiresAt: session.expiresAt,
        package: {
          token,
          sessionToken: session.sessionToken,
          productId: pkg.productId,
          productName: pkg.productName,
          version: pkg.version,
          fileName: pkg.fileName,
          fileSizeFormatted: pkg.fileSizeFormatted,
          uploadedAt: pkg.uploadedAt,
          downloadCount: session.downloadCount,
          downloadUrl: `/api/download/${token}`,
          customerName: session.customerName,
          customerEmail: session.customerEmail,
        },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // 7. Secure 5-Minute Enforced Streaming Download: GET /api/download/:token
  if (pathname.startsWith("/api/download/") && request.method === "GET") {
    const token = pathname.replace("/api/download/", "").trim();
    const inspection = inspectToken(token);

    if (!inspection || !existsSync(inspection.pkg.storagePath)) {
      return new Response("File archive not found or invalid token", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // Check 5-minute link expiration!
    if (inspection.isExpired) {
      return new Response(
        "⚠️ This secure download link has expired (5-minute validity limit exceeded). Please refresh or generate a fresh link from your portal.",
        {
          status: 410,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "X-Download-Expired": "true",
          },
        }
      );
    }

    try {
      // Record download and increment counter
      recordSessionDownload(inspection.session.sessionToken);

      const fileBuffer = readFileSync(inspection.pkg.storagePath);
      const safeFilename = encodeURIComponent(inspection.pkg.fileName);

      return new Response(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": `attachment; filename="${inspection.pkg.fileName}"; filename*=UTF-8''${safeFilename}`,
          "Content-Length": fileBuffer.length.toString(),
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    } catch (err) {
      console.error("❌ Failed streaming zip download:", err);
      return new Response("Internal error streaming file download", {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }
  }

  return null;
}
