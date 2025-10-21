import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import type { ViteUserConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

const vitestConfig: ViteUserConfig = {
  test: {
    globals: true,
  },
};
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: vitestConfig.test,
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
