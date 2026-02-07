import { defineConfig } from "vite";

export default defineConfig({
  css: {
    lightningcss: undefined,
    transformer: "postcss",
  },
  build: {
    rollupOptions: {
      input: {
        background: "src/background.ts",
        content: "src/content.ts",
      },
      output: {
        entryFileNames: "[name].js",
        format: "es",
      },
    },
  },
});
