import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";

function spaFallback(): Plugin {
  let outDir = "dist";

  return {
    name: "spa-fallback",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      copyFileSync(resolve(outDir, "index.html"), resolve(outDir, "404.html"));
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback()],
  server: {
    host: true,
    port: 5173,
  },
});
