/** 首页各区域所需的内容数据，全部来自 README.md 文档 */

export const heroDiff = {
  before: '"dev": "next dev"',
  beforeUrl: "http://localhost:3000",
  after: '"dev": "portless run next dev"',
  afterUrl: "https://myapp.localhost",
};

export const features = [
  {
    icon: "🔗",
    title: "稳定的具名 URL",
    desc: "用 https://myapp.localhost 取代 http://localhost:3000。端口号随时变，具名域名始终稳定。",
  },
  {
    icon: "🔒",
    title: "默认 HTTPS + HTTP/2",
    desc: "首次运行自动生成本地 CA 并信任，无浏览器警告。HTTP/2 多路复用解除 6 连接限制瓶颈。",
  },
  {
    icon: "🚀",
    title: "零配置启动",
    desc: "裸 portless 开箱即用，自动推断应用名、运行 dev 脚本、通过代理路由，无需手动设置。",
  },
  {
    icon: "🌐",
    title: "子域名组织",
    desc: "用子域名组织服务：api.myapp、docs.myapp 各得其所。支持严格模式与通配符模式。",
  },
  {
    icon: "🌳",
    title: "Git Worktree 感知",
    desc: "分支名自动作为子域名前缀，每个 worktree 都有独立 URL，无需改 package.json。",
  },
  {
    icon: "📱",
    title: "LAN 模式",
    desc: "--lan 通过 mDNS 让同一网络中的手机、平板以 .local 域名访问你的开发服务器。",
  },
  {
    icon: "⚡",
    title: "框架自动适配",
    desc: "为 Next.js、Vite、Astro、Expo 等自动注入正确的 --port 和 --host 参数。",
  },
  {
    icon: "🤝",
    title: "Tailscale / ngrok 共享",
    desc: "--tailscale 在 tailnet 上共享，--funnel 暴露到公共互联网，--ngrok 生成公共隧道 URL。",
  },
];

export const installCommands = [
  {
    label: "全局安装（推荐）",
    cmd: "npm install -g portless",
  },
  {
    label: "作为项目开发依赖安装",
    cmd: "npm install -D portless",
  },
];

export const quickStart = [
  {
    title: "安装",
    desc: "全局安装 portless，或作为项目开发依赖安装。",
    code: "npm install -g portless",
  },
  {
    title: "运行你的应用",
    desc: "portless 会在代理后面运行你的框架，分配具名 URL。",
    code: "portless myapp next dev\n# -> https://myapp.localhost",
  },
  {
    title: "零配置",
    desc: "裸 portless 运行 dev 脚本，从包名或 git 根目录推断应用名。",
    code: "portless\n# -> 运行 \"dev\" 脚本，https://<project>.localhost",
  },
];

export const commands = [
  {
    cmd: "portless",
    desc: "通过代理运行 dev 脚本；在 monorepo 根目录运行所有工作区包",
  },
  {
    cmd: "portless run [--name <name>] [cmd] [args...]",
    desc: "推断名称，通过代理运行命令",
  },
  {
    cmd: "portless <name> <cmd> [args...]",
    desc: "在 https://<name>.localhost 运行应用",
  },
  {
    cmd: "portless alias <name> <port>",
    desc: "注册一条静态路由（例如用于 Docker）",
  },
  {
    cmd: "portless alias <name> <port> --force",
    desc: "覆盖已有路由",
  },
  {
    cmd: "portless alias --remove <name>",
    desc: "移除一条静态路由",
  },
  {
    cmd: "portless list",
    desc: "显示活动路由",
  },
  {
    cmd: "portless doctor",
    desc: "检查代理、路由、DNS 以及 CA 信任",
  },
  {
    cmd: "portless trust",
    desc: "将本地 CA 添加到系统信任存储",
  },
  {
    cmd: "portless clean",
    desc: "移除状态、CA 信任项以及 hosts 区块",
  },
  {
    cmd: "portless prune",
    desc: "杀掉崩溃会话遗留的孤立开发服务器",
  },
  {
    cmd: "portless hosts sync",
    desc: "将路由添加到 /etc/hosts（修复 Safari）",
  },
  {
    cmd: "portless hosts clean",
    desc: "从 /etc/hosts 移除 portless 条目",
  },
  {
    cmd: "portless proxy start",
    desc: "启动 HTTPS 代理（端口 443，守护进程）",
  },
  {
    cmd: "portless proxy start --no-tls",
    desc: "不启用 HTTPS 启动（端口 80）",
  },
  {
    cmd: "portless proxy start --lan",
    desc: "以 LAN 模式启动（用于设备的 mDNS .local）",
  },
  {
    cmd: "portless proxy start -p 1355",
    desc: "在自定义端口启动（无需 sudo）",
  },
  {
    cmd: "portless proxy start --foreground",
    desc: "以前台方式启动（用于调试）",
  },
  {
    cmd: "portless proxy start --wildcard",
    desc: "允许未注册子域名回退到父路由",
  },
  {
    cmd: "portless proxy stop",
    desc: "停止代理",
  },
  {
    cmd: "portless service install",
    desc: "操作系统启动时启动 HTTPS 代理",
  },
  {
    cmd: "portless service install --lan",
    desc: "以 LAN 模式启动服务",
  },
  {
    cmd: "portless service status",
    desc: "显示服务与代理状态",
  },
  {
    cmd: "portless service uninstall",
    desc: "移除开机启动服务",
  },
];

export const options = [
  { flag: "-p, --port <number>", desc: "代理端口（默认：443，使用 --no-tls 时为 80）" },
  { flag: "--no-tls", desc: "禁用 HTTPS（在端口 80 上使用纯 HTTP）" },
  { flag: "--https", desc: "启用 HTTPS（默认，为兼容性而接受）" },
  { flag: "--lan", desc: "启用 LAN 模式（用于真实设备的 mDNS .local）" },
  { flag: "--ip <address>", desc: "固定一个特定 LAN IP（禁用自动跟随；与 --lan 一起使用）" },
  { flag: "--cert <path>", desc: "使用自定义 TLS 证书" },
  { flag: "--key <path>", desc: "使用自定义 TLS 私钥" },
  { flag: "--foreground", desc: "以前台方式运行代理，而非守护进程" },
  { flag: "--tld <tld>", desc: "使用自定义 TLD 代替 .localhost；重复以使用多个" },
  { flag: "--wildcard", desc: "允许未注册子域名回退到父路由" },
  { flag: "--state-dir <path>", desc: "配合 service install 使用自定义状态目录" },
  { flag: "--script <name>", desc: "运行特定的 package.json 脚本（默认：dev）" },
  { flag: "--app-port <number>", desc: "为应用使用固定端口（跳过自动分配）" },
  { flag: "--tailscale", desc: "在你的 Tailscale 网络（tailnet）上共享应用" },
  { flag: "--funnel", desc: "通过 Tailscale Funnel 公开共享应用" },
  { flag: "--ngrok", desc: "通过 ngrok 公开共享应用" },
  { flag: "--force", desc: "杀掉现有进程并接管其路由" },
  { flag: "--name <name>", desc: "使用 <name> 作为应用名" },
];

export const envVars = [
  { name: "PORTLESS_PORT", desc: "覆盖默认代理端口", group: "配置" },
  { name: "PORTLESS_APP_PORT", desc: "为应用使用固定端口（同 --app-port）", group: "配置" },
  { name: "PORTLESS_HTTPS=0", desc: "禁用 HTTPS（同 --no-tls）", group: "配置" },
  { name: "PORTLESS_LAN=1", desc: "设置为 1 时启用 LAN 模式（自动检测 LAN IP）", group: "配置" },
  { name: "PORTLESS_LAN_IP", desc: "为 LAN 模式固定一个特定 LAN IP", group: "配置" },
  { name: "PORTLESS_TLD", desc: "使用一个或更多 TLD（例如 localhost,test）", group: "配置" },
  { name: "PORTLESS_WILDCARD=1", desc: "允许未注册子域名回退到父路由", group: "配置" },
  { name: "PORTLESS_SYNC_HOSTS=0", desc: "禁用 /etc/hosts 的自动同步（默认开启）", group: "配置" },
  { name: "PORTLESS_TAILSCALE=1", desc: "在你的 Tailscale 网络上共享应用（同 --tailscale）", group: "配置" },
  { name: "PORTLESS_FUNNEL=1", desc: "通过 Tailscale Funnel 公开共享应用（同 --funnel）", group: "配置" },
  { name: "PORTLESS_NGROK=1", desc: "通过 ngrok 公开共享应用（同 --ngrok）", group: "配置" },
  { name: "PORTLESS_STATE_DIR", desc: "覆盖状态目录", group: "配置" },
  { name: "PORT", desc: "子进程应监听的临时端口", group: "注入到子进程" },
  { name: "HOST", desc: "通常为 127.0.0.1（LAN 模式下 Expo 会省略）", group: "注入到子进程" },
  { name: "PORTLESS_URL", desc: "主要公开 URL（例如 https://myapp.localhost）", group: "注入到子进程" },
  { name: "PORTLESS_TAILSCALE_URL", desc: "应用的 Tailscale URL（当 --tailscale 生效时）", group: "注入到子进程" },
  { name: "PORTLESS_NGROK_URL", desc: "应用的 ngrok URL（当 --ngrok 生效时）", group: "注入到子进程" },
  { name: "NODE_EXTRA_CA_CERTS", desc: "portless CA 的路径（当 HTTPS 生效时）", group: "注入到子进程" },
];

export const configFields = [
  { field: "name", type: "string", def: "推断", desc: "基础应用名。Git worktree 前缀仍然生效。" },
  { field: "script", type: "string", def: '"dev"', desc: "要运行的 package.json 脚本名。" },
  { field: "appPort", type: "number", def: "自动", desc: "子进程的固定端口。" },
  { field: "proxy", type: "boolean", def: "自动", desc: "是否经由代理路由。自动检测。" },
  { field: "apps", type: "object", def: "", desc: "工作区包的覆盖配置，以相对路径作为键。" },
  { field: "turbo", type: "boolean", def: "true", desc: "设为 false 以使用直接派生，而不是 turborepo。" },
];

export const advancedSections = [
  {
    icon: "🌐",
    title: "子域名",
    desc: "用子域名组织服务。默认严格模式，使用 --wildcard 允许未注册子域名回退。",
    code: `portless api.myapp pnpm start
# -> https://api.myapp.localhost

portless docs.myapp next dev
# -> https://docs.myapp.localhost`,
  },
  {
    icon: "🌳",
    title: "Git Worktrees",
    desc: "分支名自动作为子域名前缀，每个 worktree 独立 URL，无需配置更改。",
    code: `# 主 worktree（无前缀）
portless run next dev   # -> https://myapp.localhost

# 位于 "fix-ui" 分支的已链接 worktree
portless run next dev   # -> https://fix-ui.myapp.localhost`,
  },
  {
    icon: "🏷️",
    title: "自定义 TLD",
    desc: "默认 .localhost。推荐 .test（IANA 保留）。避免 .local（mDNS 冲突）和 .dev（Google HSTS）。",
    code: `portless proxy start --tld test
portless myapp next dev
# -> https://myapp.test

# 多段 TLD，与生产环境结构一致
portless proxy start --tld dev.example.com
portless myapp next dev
# -> https://myapp.dev.example.com`,
  },
  {
    icon: "📱",
    title: "LAN 模式",
    desc: "--lan 绑定到 0.0.0.0 和 ::，mDNS 发现让同网络设备以 .local 域名访问。",
    code: `portless proxy start --lan
portless proxy start --lan --https
portless proxy start --lan --ip 192.168.1.42`,
  },
  {
    icon: "🤝",
    title: "Tailscale 共享",
    desc: "在 tailnet 上共享开发服务器。--funnel 通过 Tailscale Funnel 暴露到公共互联网。",
    code: `portless myapp --tailscale next dev
# -> https://myapp.localhost        (本地)
# -> https://devbox.yourteam.ts.net (tailnet)

portless myapp --funnel next dev
# -> https://devbox.yourteam.ts.net (公共)`,
  },
  {
    icon: "🔌",
    title: "ngrok 共享",
    desc: "通过 ngrok 将开发服务器暴露到公共互联网，隧道在应用退出时自动清理。",
    code: `portless myapp --ngrok next dev
# -> https://myapp.localhost  (本地)
# -> https://abc123.ngrok.app (公共)`,
  },
  {
    icon: "⚙️",
    title: "随系统启动",
    desc: "将代理安装为操作系统开机启动服务，重启后无需手动启动即可获得干净的 HTTPS URL。",
    code: `portless service install
portless service install --lan
portless service install --wildcard
portless service status
portless service uninstall`,
  },
  {
    icon: "🩺",
    title: "故障排查",
    desc: "portless doctor 检查 Node.js、代理存活、路由、CA 信任、主机名解析和 LAN 前置条件。",
    code: `portless doctor          # 检查本地健康状况
portless hosts sync     # 修复 Safari DNS
portless hosts clean    # 清理 hosts 条目
portless clean          # 移除所有状态`,
  },
];

export const requirements = [
  { label: "Node.js", value: "24+" },
  { label: "macOS", value: "" },
  { label: "Linux", value: "" },
  { label: "Windows", value: "" },
  { label: "Tailscale CLI", value: "可选" },
  { label: "ngrok CLI", value: "可选" },
];
