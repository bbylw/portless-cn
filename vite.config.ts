import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { Plugin } from "vite";
import { docsPages } from "./src/navigation/docsNav.ts";

const FALLBACK_UPSTREAM_VERSION = "0.16.0";

async function resolveUpstreamVersion(): Promise<string> {
  if (process.env.VITE_UPSTREAM_VERSION) {
    return process.env.VITE_UPSTREAM_VERSION;
  }
  try {
    const res = await fetch("https://registry.npmjs.org/portless/latest", {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return FALLBACK_UPSTREAM_VERSION;
    const data = (await res.json()) as { version?: unknown };
    if (typeof data.version === "string" && /^\d+\.\d+\.\d+/.test(data.version)) {
      return data.version;
    }
  } catch {
    // 离线或超时时静默回退到基线版本
  }
  return FALLBACK_UPSTREAM_VERSION;
}

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

export default defineConfig(async () => {
  const upstreamVersion = await resolveUpstreamVersion();

  return {
    define: {
      __UPSTREAM_VERSION__: JSON.stringify(upstreamVersion),
    },
    plugins: [react(), tailwindcss(), spaFallback()],
    server: {
      host: true,
      port: 5173,
    },
  };
});
