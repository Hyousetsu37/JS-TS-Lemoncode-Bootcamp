import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import type { ViteUserConfig } from "vitest/config";
import path from "path";

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
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
});
