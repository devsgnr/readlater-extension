import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    lightningcss: undefined,
    transformer: "postcss",
    postcss: { plugins: [] },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {},
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    minify: false,
    cssMinify: false,
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/App.tsx"),
      name: "ReadLaterUI",
      formats: ["es"],
      fileName: () => "app.js",
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: [],
    },
  },
});
