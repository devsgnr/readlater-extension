import { defineConfig } from "vite";

export default defineConfig({
  css: {
    lightningcss: undefined,
    transformer: "postcss",
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        background: "src/background.ts",
      },
      output: {
        entryFileNames: "[name].js",
        format: "es",
      },
    },
  },
});
