const routes = [
  {
    host: "myapp.localhost",
    tag: "主应用",
    port: ":4123",
    cmd: "next dev",
    tone: "emerald" as const,
  },
  {
    host: "api.myapp.localhost",
    tag: "子域名",
    port: ":4567",
    cmd: "pnpm start",
    tone: "violet" as const,
  },
  {
    host: "fix-ui.myapp.localhost",
    tag: "worktree",
    port: ":4812",
    cmd: "vite",
    tone: "emerald" as const,
  },
];

export function ArchitectureDiagram() {
  return (
    <div className="@container relative overflow-hidden rounded-2xl border border-white/8 bg-linear-to-b from-white/4.5 to-white/1.5 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.4),0_16px_40px_-8px_rgba(0,0,0,0.45)] backdrop-blur sm:p-6">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.22] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-44 w-140 -translate-x-1/2 rounded-full bg-emerald-500/9 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-40 w-105 rounded-full bg-violet-500/8 blur-3xl" />

      {/* Header */}
      <div className="relative flex flex-wrap items-center justify-between gap-2 border-b border-white/6 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10.5px] font-semibold tracking-wider uppercase text-emerald-300">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            工作原理
          </span>
          <span className="text-[12.5px] font-medium text-zinc-300">
            单一代理监听 443，按 Host 头把具名域名转发至本机临时端口
          </span>
        </div>
        <span className="hidden font-mono text-[11px] text-zinc-500 @xl:inline">
          ~/.portless/routes.json
        </span>
      </div>

      {/* Main 3-stage pipeline */}
      <div className="relative mt-5 grid items-center gap-2 @2xl:grid-cols-[minmax(0,1.35fr)_20px_126px_20px_minmax(0,0.88fr)] @4xl:gap-3 @4xl:grid-cols-[minmax(0,1fr)_56px_172px_56px_minmax(0,1fr)]">
        {/* Stage 1: Browser / Agent requests */}
        <div className="min-w-0 rounded-2xl border border-white/7 bg-[#0c0c0e]/90 p-2.5 @4xl:p-3.5 shadow-inner">
          <div className="mb-2.5 flex items-center justify-between px-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-400">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-zinc-400">
                <rect x="3" y="4" width="18" height="16" rx="3" />
                <path d="M3 9h18" />
              </svg>
              浏览器 / Agent 请求
            </span>
            <span className="font-mono text-[10px] tracking-wider uppercase text-emerald-400/80">HTTPS</span>
          </div>
          <div className="space-y-1.5">
            {routes.map((r) => (
              <div
                key={r.host}
                className="flex items-center justify-between gap-1.5 rounded-xl border border-white/6 bg-white/3 px-2 py-2 transition hover:border-white/12 hover:bg-white/5 @4xl:gap-2 @4xl:px-2.5"
              >
                <div className="flex min-w-0 items-center gap-1.5 @4xl:gap-2">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    className={r.tone === "emerald" ? "shrink-0 text-emerald-400" : "shrink-0 text-violet-400"}
                  >
                    <rect x="4" y="11" width="16" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  <span className="truncate font-mono text-[11px] @4xl:text-[11.5px] font-medium text-zinc-100">
                    {r.host}
                  </span>
                </div>
                <span
                  className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                    r.tone === "emerald"
                      ? "bg-emerald-500/10 text-emerald-300/90 border border-emerald-500/20"
                      : "bg-violet-500/10 text-violet-300/90 border border-violet-500/20"
                  }`}
                >
                  {r.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Connector 1: Client -> Proxy */}
        <div className="flex items-center justify-center py-0.5 @2xl:py-0">
          <div className="relative hidden h-5 w-full items-center @2xl:flex">
            <div className="h-px w-full bg-linear-to-r from-white/10 via-emerald-500/45 to-emerald-400/70" />
            <div className="pointer-events-none absolute inset-x-0 h-0.5 overflow-hidden">
              <div className="h-full w-1/2 bg-linear-to-r from-transparent via-emerald-300 to-transparent animate-flow-emerald" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.9)]" />
          </div>
          <svg className="text-emerald-400/50 @2xl:hidden" width="18" height="22" viewBox="0 0 18 22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 1v18M4 14l5 5 5-5" />
          </svg>
        </div>

        {/* Stage 2: Portless Proxy Hub */}
        <div className="relative flex flex-col items-center justify-center rounded-2xl border border-emerald-500/25 bg-linear-to-b from-emerald-500/12 to-[#0e0e11] px-2.5 py-4 text-center shadow-[0_8px_30px_-4px_rgba(34,197,94,0.18)]">
          <div className="relative flex size-13 @4xl:size-14 items-center justify-center rounded-2xl border border-white/20 bg-linear-to-br from-emerald-500 to-emerald-600 shadow-[0_6px_20px_rgba(34,197,94,0.4)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3l7 3.5v4.7c0 3.6-2.1 5.9-7 7.8-4.9-1.9-7-4.2-7-7.8V6.5L12 3z"
                fill="white"
                fillOpacity="0.16"
                stroke="white"
                strokeWidth="1.75"
              />
              <path d="M9.2 12.2l1.8 1.8 3.8-3.8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute -bottom-2 rounded-full border border-emerald-400/30 bg-bg px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-300 shadow">
              :443
            </span>
          </div>
          <div className="mt-3.5 font-mono text-[11.5px] @4xl:text-[12px] font-semibold text-white">portless proxy</div>
          <div className="mt-0.5 text-[10.5px] @4xl:text-[11px] text-emerald-300/80">HTTPS · HTTP/2</div>
          <div className="mt-2 rounded-lg border border-white/6 bg-black/40 px-2 py-1 font-mono text-[10px] text-zinc-400">
            Host 匹配路由表
          </div>
        </div>

        {/* Connector 2: Proxy -> Local servers */}
        <div className="flex items-center justify-center py-0.5 @2xl:py-0">
          <div className="relative hidden h-5 w-full items-center @2xl:flex">
            <div className="h-px w-full bg-linear-to-r from-violet-400/70 via-violet-500/45 to-white/10" />
            <div className="pointer-events-none absolute inset-x-0 h-0.5 overflow-hidden">
              <div className="h-full w-1/2 bg-linear-to-r from-transparent via-violet-300 to-transparent animate-flow-violet" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 size-2 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.9)]" />
          </div>
          <svg className="text-violet-400/50 @2xl:hidden" width="18" height="22" viewBox="0 0 18 22" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 1v18M4 14l5 5 5-5" />
          </svg>
        </div>

        {/* Stage 3: Local App Processes */}
        <div className="min-w-0 rounded-2xl border border-white/7 bg-[#0c0c0e]/90 p-3 @4xl:p-3.5 shadow-inner">
          <div className="mb-2.5 flex items-center justify-between px-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-400">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-zinc-400">
                <rect x="4" y="4" width="16" height="16" rx="3" />
                <path d="M8 10l2.5 2L8 14M12.5 14H16" />
              </svg>
              本地应用进程
            </span>
            <span className="font-mono text-[10px] text-zinc-500 tabular-nums">4000–4999</span>
          </div>
          <div className="space-y-1.5">
            {routes.map((r) => (
              <div
                key={r.port}
                className="flex items-center justify-between gap-2 rounded-xl border border-white/6 bg-white/3 px-2.5 py-2 transition hover:border-white/12 hover:bg-white/5"
              >
                <span className="inline-flex shrink-0 items-center rounded-md border border-white/10 bg-white/6 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-white tabular-nums">
                  <span className="hidden @4xl:inline">127.0.0.1</span>
                  {r.port}
                </span>
                <span className="truncate font-mono text-[11px] text-zinc-400">{r.cmd}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer capabilities */}
      <div className="relative mt-4 flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px]">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/3 px-3 py-1 text-zinc-400">
          <span className="size-1.5 rounded-full bg-zinc-400" />
          127.0.0.1 + ::1 仅回环绑定
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-3 py-1 text-emerald-300">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          自动复用上次代理配置
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/8 px-3 py-1 text-violet-300">
          <span className="size-1.5 rounded-full bg-violet-400" />
          WebSocket · HMR 透传
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/3 px-3 py-1 text-zinc-400">
          进程停止自动移除路由
        </span>
      </div>
    </div>
  );
}
