export function ArchitectureDiagram() {
  return (
    <div className="relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur p-6 sm:p-7">
      <div className="absolute inset-0 grid-bg opacity-[0.25] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-[600px] rounded-full bg-emerald-500/10 blur-3xl" />
      <p className="relative text-center text-[11px] font-medium tracking-[0.18em] uppercase text-white/30">工作原理 — 单一代理，多应用路由</p>

      <div className="relative mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-0">
        <div className="flex flex-col items-center gap-2.5">
          <div className="relative flex size-[72px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
              <rect x="3" y="6" width="26" height="20" rx="5" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.12" />
              <rect x="3" y="6" width="26" height="7" rx="5" fill="white" fillOpacity="0.06" />
              <circle cx="8" cy="9.5" r="1.3" fill="white" fillOpacity="0.85" />
              <circle cx="11.5" cy="9.5" r="1.3" fill="white" fillOpacity="0.55" />
              <circle cx="15" cy="9.5" r="1.3" fill="white" fillOpacity="0.25" />
              <path d="M11 18.5l2.2 2.2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-white text-[10px] shadow">↗</span>
          </div>
          <span className="rounded-full bg-white text-black px-2.5 py-1 font-mono text-[11px] font-semibold">myapp.localhost</span>
          <span className="text-[11px] text-zinc-500">浏览器</span>
        </div>

        <div className="flex sm:w-[88px] items-center justify-center py-2 sm:py-0">
          <div className="hidden sm:flex items-center w-full">
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-emerald-500/50"></div>
            <div className="mx-1 size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse-dot"></div>
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-white/10"></div>
          </div>
          <svg className="sm:hidden text-white/20 rotate-90" width="20" height="28" viewBox="0 0 20 28" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M10 0v24M4 18l6 6 6-6" />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-2.5">
          <div className="relative flex size-[72px] items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-[0_8px_24px_rgba(34,197,94,0.35)] border border-white/15">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 3l7 3.5v4.7c0 3.6-2.1 5.9-7 7.8-4.9-1.9-7-4.2-7-7.8V6.5L12 3z" fill="white" fillOpacity="0.14" stroke="white" strokeWidth="1.7" />
              <path d="M9.2 12.2l1.8 1.8 3.8-3.8" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute -bottom-1 rounded-full bg-black text-white px-2 py-0.5 text-[10px] font-mono font-medium border border-white/10">:443</span>
          </div>
          <span className="font-mono text-[11px] font-semibold text-emerald-400">portless proxy</span>
          <span className="text-[11px] text-zinc-500">HTTPS · HTTP/2</span>
        </div>

        <div className="flex sm:w-[88px] items-center justify-center py-2 sm:py-0">
          <div className="hidden sm:flex items-center w-full">
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-violet-500/50"></div>
            <div className="mx-1 size-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)] animate-pulse-dot"></div>
            <div className="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-white/10"></div>
          </div>
          <svg className="sm:hidden text-white/20 rotate-90" width="20" height="28" viewBox="0 0 20 28" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M10 0v24M4 18l6 6 6-6" />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-2.5">
          <div className="flex gap-2.5">
            <div className="flex size-[72px] flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.9" strokeWidth="1.6">
                <rect x="4" y="4" width="16" height="12" rx="2" />
                <path d="M4 9h16M8 16v-3M12 16v-3M16 16v-3" />
              </svg>
              <span className="font-mono text-[10px] text-zinc-300">:4123</span>
              <span className="text-[10px] leading-none text-zinc-500">myapp</span>
            </div>
            <div className="flex size-[72px] flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.9" strokeWidth="1.6">
                <rect x="5" y="4" width="14" height="14" rx="2" />
                <circle cx="12" cy="11" r="3" />
                <path d="M8 18l2-2M16 18l-2-2" />
              </svg>
              <span className="font-mono text-[10px] text-zinc-300">:4567</span>
              <span className="text-[10px] leading-none text-zinc-500">api</span>
            </div>
          </div>
          <span className="text-[11px] text-zinc-500">本地应用 · 自动分配端口</span>
        </div>
      </div>

      <div className="relative mt-6 flex flex-wrap justify-center gap-2 text-[11px]">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-400">127.0.0.1 + ::1 仅回环</span>
        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-300">自动复用上次代理配置</span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-400">WebSocket · HMR 透传</span>
      </div>
    </div>
  );
}
