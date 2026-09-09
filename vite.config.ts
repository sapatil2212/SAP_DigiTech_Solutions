// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
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
  },
});
