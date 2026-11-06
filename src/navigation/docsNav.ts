export interface DocsSectionMeta {
  id: string;
  title: string;
}

export interface DocsPageMeta {
  path: string;
  label: string;
  title: string;
  description: string;
  group: DocsGroupId;
  sections: DocsSectionMeta[];
  readmeHeadings: string[];
}

export type DocsGroupId = "intro" | "core" | "reference" | "ops";

export const docsGroups: { id: DocsGroupId; label: string; pages: DocsPageMeta[] }[] = [
  {
    id: "intro",
    label: "入门",
    pages: [
      {
        path: "/docs",
        label: "快速开始",
        title: "快速开始",
        description: "安装 portless，运行你的第一个应用，并了解它如何把开发服务器放到具名 URL 后面。",
        group: "intro",
        sections: [
          { id: "install", title: "安装" },
          { id: "run-your-app", title: "运行你的应用" },
          { id: "framework-flags", title: "框架参数注入" },
          { id: "how-it-works", title: "工作原理" },
          { id: "requirements", title: "系统需求" },
        ],
        readmeHeadings: ["## 安装", "## 运行你的应用", "## 工作原理", "## 需求"],
      },
      {
        path: "/docs/configuration",
        label: "配置",
        title: "配置",
        description: "用 portless.json 或 package.json 覆盖应用名、脚本、端口与代理行为。",
        group: "intro",
        sections: [
          { id: "portless-json", title: "portless.json" },
          { id: "config-fields", title: "配置字段" },
          { id: "package-json-key", title: "package.json 中的配置" },
          { id: "monorepo", title: "Monorepo" },
          { id: "turborepo", title: "Turborepo" },
          { id: "script-flag", title: "覆盖脚本" },
        ],
        readmeHeadings: ["## 配置", "## 在 package.json 中使用"],
      },
    ],
  },
  {
    id: "core",
    label: "核心功能",
    pages: [
      {
        path: "/docs/routing",
        label: "路由与命名",
        title: "路由与命名",
        description: "用子域名、Git Worktree 前缀和自定义 TLD 组织本地服务。",
        group: "core",
        sections: [
          { id: "subdomains", title: "子域名" },
          { id: "worktrees", title: "Git Worktrees" },
          { id: "custom-tld", title: "自定义 TLD" },
          { id: "multi-label-tld", title: "多段 TLD" },
        ],
        readmeHeadings: ["## 子域名", "## Git Worktrees", "## 自定义 TLD"],
      },
      {
        path: "/docs/proxy",
        label: "代理与 HTTPS",
        title: "代理与 HTTPS",
        description: "默认 HTTPS + HTTP/2、非特权模式、应用间代理，以及 portless 自身的错误响应。",
        group: "core",
        sections: [
          { id: "https-http2", title: "HTTP/2 + HTTPS" },
          { id: "unprivileged", title: "非特权模式" },
          { id: "app-proxy", title: "应用之间代理" },
          { id: "errors", title: "错误响应" },
        ],
        readmeHeadings: ["## HTTP/2 + HTTPS", "## 非特权模式", "## 在 Portless 应用之间做代理"],
      },
      {
        path: "/docs/sharing",
        label: "共享与远程访问",
        title: "共享与远程访问",
        description: "把本地开发服务器开放给同网络设备、tailnet 或公共互联网。",
        group: "core",
        sections: [
          { id: "lan", title: "LAN 模式" },
          { id: "tailscale", title: "Tailscale" },
          { id: "ngrok", title: "ngrok" },
          { id: "cloudflare", title: "Cloudflare" },
        ],
        readmeHeadings: ["## LAN 模式", "## Tailscale 共享", "## ngrok 共享", "## Cloudflare 共享"],
      },
      {
        path: "/docs/docker",
        label: "Docker Compose",
        title: "Docker Compose",
        description: "用 portless compose 运行 Compose 项目，每个服务获得稳定的具名 URL。",
        group: "core",
        sections: [
          { id: "overview", title: "运行 Compose 项目" },
          { id: "lifecycle", title: "生命周期" },
          { id: "ports", title: "端口规则" },
          { id: "labels", title: "服务标签" },
        ],
        readmeHeadings: ["## Docker Compose"],
      },
    ],
  },
  {
    id: "reference",
    label: "参考",
    pages: [
      {
        path: "/docs/commands",
        label: "命令参考",
        title: "命令参考",
        description: "全部命令、选项、环境变量与保留名称，支持即时搜索。",
        group: "reference",
        sections: [
          { id: "commands", title: "命令" },
          { id: "options", title: "选项" },
          { id: "env-vars", title: "环境变量" },
          { id: "reserved-names", title: "保留名称" },
          { id: "bypass", title: "绕过代理" },
        ],
        readmeHeadings: ["## 命令"],
      },
      {
        path: "/docs/mcp",
        label: "MCP 服务器",
        title: "MCP 服务器",
        description: "让 Agent 通过 stdio MCP 查询路由、管理别名、控制代理并诊断。",
        group: "reference",
        sections: [
          { id: "overview", title: "启动服务器" },
          { id: "tool-profiles", title: "工具配置组" },
          { id: "client-config", title: "客户端配置" },
          { id: "limitations", title: "限制" },
        ],
        readmeHeadings: ["## MCP 服务器"],
      },
    ],
  },
  {
    id: "ops",
    label: "运维",
    pages: [
      {
        path: "/docs/operations",
        label: "运维与排障",
        title: "运维与排障",
        description: "开机启动、卸载重置、Safari DNS、故障排查与仓库开发。",
        group: "ops",
        sections: [
          { id: "service", title: "随系统启动" },
          { id: "uninstall", title: "卸载 / 重置" },
          { id: "safari-dns", title: "Safari / DNS" },
          { id: "troubleshooting", title: "故障排查" },
          { id: "development", title: "开发" },
        ],
        readmeHeadings: ["## 随系统启动", "## 卸载 / 重置", "## Safari / DNS", "## 故障排查", "## 开发"],
      },
    ],
  },
];

export const docsPages: DocsPageMeta[] = docsGroups.flatMap((group) => group.pages);

export function getDocsPage(pathname: string): DocsPageMeta | undefined {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return docsPages.find((page) => page.path === normalized);
}

export function getAdjacentDocsPages(pathname: string): {
  previous?: DocsPageMeta;
  next?: DocsPageMeta;
} {
  const index = docsPages.findIndex((page) => page.path === pathname);
  if (index === -1) return {};
  return {
    previous: index > 0 ? docsPages[index - 1] : undefined,
    next: index < docsPages.length - 1 ? docsPages[index + 1] : undefined,
  };
}
