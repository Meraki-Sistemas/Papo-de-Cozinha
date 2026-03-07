import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// Adicionado: URL utils para configurar alias de forma compatível com ESM
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Adicionado: alias '@' → './src'
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
    exclude: [],
  },
});