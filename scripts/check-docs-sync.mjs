import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => readFileSync(resolve(root, relativePath), "utf8");
const errors = [];

const readme = read("README.md");
const nav = read("src/navigation/docsNav.ts");
const sitemap = read("public/sitemap.xml");
const app = read("src/App.tsx");

// 1) readmeHeadings 必须能在 README 的二级标题中找到。
const readmeHeadings = new Set(
  readme
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.trim()),
);
const declaredHeadings = [...nav.matchAll(/"(## [^"]+)"/g)].map((match) => match[1]);
for (const heading of declaredHeadings) {
  if (!readmeHeadings.has(heading)) errors.push(`README 缺少二级标题：${heading}`);
}

// 2) docsNav 的 sections 与页面里的 DocSection 锚点必须一一对应（防止 TOC 死链）。
const declaredSections = new Set(
  [...nav.matchAll(/\{\s*id: "([^"]+)",\s*title:/g)].map((match) => match[1]),
);
const docsDir = resolve(root, "src/pages/docs");
const pageSources = readdirSync(docsDir)
  .filter((name) => name.endsWith(".tsx"))
  .map((name) => readFileSync(resolve(docsDir, name), "utf8"));
pageSources.push(read("src/components/docs/CommandReference.tsx"));
const renderedSections = new Set(
  pageSources.flatMap((source) =>
    [...source.matchAll(/<DocSection\s+id="([^"]+)"/g)].map((match) => match[1]),
  ),
);
for (const id of declaredSections) {
  if (!renderedSections.has(id)) errors.push(`docsNav 的 section 没有对应页面锚点：${id}`);
}
for (const id of renderedSections) {
  if (!declaredSections.has(id)) errors.push(`页面锚点未在 docsNav 登记：${id}`);
}

// 3) sitemap、docsNav 路由与 App.tsx 路由三者一致。
const paths = [...nav.matchAll(/path: "(\/docs[^"]*)"/g)].map((match) => match[1]);
const locs = [
  ...new Set(
    [...sitemap.matchAll(/<loc>https:\/\/portless\.ndjp\.net([^<]*)<\/loc>/g)].map((match) => match[1]),
  ),
].sort();
const expected = ["/", ...paths].sort();
if (JSON.stringify(expected) !== JSON.stringify(locs)) {
  errors.push(`sitemap 与 docsNav 路由不一致：期望 ${expected.join(", ")}；实际 ${locs.join(", ")}`);
}
for (const path of paths.filter((item) => item !== "/docs")) {
  const slug = path.replace("/docs/", "");
  if (!app.includes(`path: "${slug}"`)) errors.push(`App.tsx 缺少路由：${path}`);
}

if (errors.length > 0) {
  console.error(`[docs-sync] 校验失败（${errors.length} 项）：`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(
  `[docs-sync] OK：${declaredHeadings.length} 个 README 标题、${declaredSections.size} 个页面锚点、${paths.length} 条文档路由。`,
);
