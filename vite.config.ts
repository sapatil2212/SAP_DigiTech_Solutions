// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Deploy to Vercel with SSR + Serverless Functions support
  nitro: {
    preset: "vercel",
    vercel: {
      functions: {
        maxDuration: 30,
      },
    },
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
