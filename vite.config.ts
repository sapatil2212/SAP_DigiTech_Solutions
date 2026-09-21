// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

function devApiMiddleware(): Plugin {
  return {
    name: "sap-dev-api-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const rawUrl = req.url || "";
        if (
          rawUrl.startsWith("/api/products") ||
          rawUrl.startsWith("/api/admin/") ||
          rawUrl.startsWith("/api/download/") ||
          rawUrl.startsWith("/api/package-info/") ||
          rawUrl.startsWith("/api/payment/") ||
          rawUrl.startsWith("/api/payment-link/") ||
          rawUrl.startsWith("/api/razorpay-webhook")
        ) {
          try {
            const protocol = req.headers["x-forwarded-proto"] || "http";
            const host = req.headers.host || "localhost:8081";
            const fullUrl = `${protocol}://${host}${rawUrl}`;

            const headers = new Headers();
            for (const [key, value] of Object.entries(req.headers)) {
              if (value) {
                if (Array.isArray(value)) {
                  value.forEach((v) => headers.append(key, v));
                } else {
                  headers.set(key, value);
                }
              }
            }

            const isGetOrHead = ["GET", "HEAD"].includes(req.method || "");
            let bodyBuffer: Buffer | undefined;

            if (!isGetOrHead) {
              const chunks: Buffer[] = [];
              for await (const chunk of req) {
                chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
              }
              bodyBuffer = Buffer.concat(chunks);
            }

            const webReq = new Request(fullUrl, {
              method: req.method,
              headers,
              body: bodyBuffer ? (new Uint8Array(bodyBuffer) as unknown as BodyInit) : undefined,
            });

            if (rawUrl.startsWith("/api/razorpay-webhook")) {
              const { handleRazorpayWebhook } = await import("./src/server/razorpayWebhook");
              const response = await handleRazorpayWebhook(webReq);
              res.statusCode = response.status;
              response.headers.forEach((val, key) => res.setHeader(key, val));
              const respBuffer = Buffer.from(await response.arrayBuffer());
              res.end(respBuffer);
              return;
            }

            const { handleStorageApi } = await import("./src/server/storageApi");
            const response = await handleStorageApi(webReq);
            if (response) {
              res.statusCode = response.status;
              response.headers.forEach((val, key) => res.setHeader(key, val));
              const respBuffer = Buffer.from(await response.arrayBuffer());
              res.end(respBuffer);
              return;
            }
          } catch (err) {
            console.error("❌ Dev API middleware error:", err);
            res.statusCode = 500;
            res.end("Internal Server Error in API Middleware");
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [devApiMiddleware()],
  },
  // Deploy to VPS (node-server) or Vercel with SSR support
  nitro: {
    preset: process.env.NITRO_PRESET || (process.env.VERCEL ? "vercel" : "node-server"),
    compatibilityDate: "2025-01-01",
    node: true,
    // Disable code-splitting to fix Rolldown __commonJSMin helper bug
    // where CJS interop helpers are not properly exported across chunks
    rollupConfig: {
      output: {
        inlineDynamicImports: true,
      },
    },
  } as any,
});
