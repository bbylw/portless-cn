import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { Plugin } from "vite";
import { docsPages } from "./src/navigation/docsNav.ts";

/**
 * GitHub Pages 没有 SPA rewrite。为每个文档路由生成一份 index.html，
 * 让深链直接返回 200；404.html 继续兜底未知路径。
 */
function spaFallback(): Plugin {
  let outDir = "dist";

  return {
    name: "spa-fallback",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const indexHtml = resolve(outDir, "index.html");
      if (!existsSync(indexHtml)) {
        throw new Error(`[spa-fallback] 未找到 ${indexHtml}，无法生成静态路由。`);
      }

      const targets = [
        resolve(outDir, "404.html"),
        ...docsPages.map((page) => resolve(outDir, page.path.replace(/^\//, ""), "index.html")),
      ];

      for (const target of targets) {
        mkdirSync(dirname(target), { recursive: true });
        copyFileSync(indexHtml, target);
      }
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
