import { defineConfig } from "vite";

export default defineConfig({
  css: {
    lightningcss: undefined,
    transformer: "postcss",
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: "src/content.ts",
      output: {
        entryFileNames: "content.js",
        format: "iife",
      },
    },
  },
});
