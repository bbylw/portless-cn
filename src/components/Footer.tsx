export function Footer() {
  return (
    <footer className="relative border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-[800px] rounded-full bg-gradient-to-r from-emerald-500/5 via-violet-500/5 to-transparent blur-2xl" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="9" fill="url(#fg)"/><rect width="32" height="32" rx="9" fill="url(#fh)"/><path d="M10 22V11.2h5.1c1.55 0 2.78.42 3.68 1.26.9.84 1.35 1.98 1.35 3.42 0 1.44-.45 2.58-1.35 3.42-.9.84-2.13 1.26-3.68 1.26h-2.4V22H10zm2.7-4.55h1.9c.7 0 1.23-.17 1.6-.52.37-.35.55-.84.55-1.48 0-.64-.18-1.13-.55-1.48-.37-.35-.9-.52-1.6-.52h-1.9v4z" fill="white"/><defs><linearGradient id="fg" x1="4" y1="4" x2="28" y2="28"><stop stopColor="#22c55e"/><stop offset="1" stopColor="#16a34a"/></linearGradient><linearGradient id="fh" x1="0" y1="0" x2="32" y2="16"><stop stopColor="white" stopOpacity="0.18"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient></defs></svg>
              <span className="font-semibold tracking-tight">portless</span>
              <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-medium tracking-widest uppercase text-zinc-400">pre-1.0</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">用稳定、具名的 <span className="text-white font-mono text-xs bg-white/10 px-1 py-0.5 rounded">.localhost</span> URL 取代端口号，用于本地开发。为人类和智能体设计。</p>
            <div className="mt-4 flex gap-2">
              <a href="https://github.com/vercel-labs/portless" target="_blank" rel="noopener noreferrer" className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.74.5.09.68-.22.68-.48v-1.7c-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05.8-.23 1.65-.34 2.5-.34.85 0 1.7.11 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .26.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" /></svg></a>
              <a href="#install" className="inline-flex h-8 items-center gap-1 rounded-full bg-white px-3 text-xs font-semibold text-black hover:bg-zinc-100 transition">开始使用 →</a>
            </div>
          </div>
          <div><h4 className="text-xs font-semibold tracking-widest uppercase text-white/40">导航</h4><ul className="mt-3 space-y-2 text-sm text-zinc-400"><li><a href="#features" className="hover:text-white transition">功能</a></li><li><a href="#install" className="hover:text-white transition">安装</a></li><li><a href="#quickstart" className="hover:text-white transition">快速开始</a></li><li><a href="#commands" className="hover:text-white transition">命令</a></li></ul></div>
          <div><h4 className="text-xs font-semibold tracking-widest uppercase text-white/40">配置</h4><ul className="mt-3 space-y-2 text-sm text-zinc-400"><li><a href="#config" className="hover:text-white transition">portless.json</a></li><li><a href="#config" className="hover:text-white transition">Monorepo</a></li><li><a href="#config" className="hover:text-white transition">Turborepo</a></li><li><a href="#advanced" className="hover:text-white transition">进阶功能</a></li></ul></div>
          <div><h4 className="text-xs font-semibold tracking-widest uppercase text-white/40">资源</h4><ul className="mt-3 space-y-2 text-sm text-zinc-400"><li><a href="https://github.com/vercel-labs/portless" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a></li><li><a href="https://www.npmjs.com/package/portless" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">npm: portless</a></li><li><span className="text-zinc-500">Node.js 24+ · pnpm 11</span></li></ul></div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} portless · 为人类和智能体（agent）设计 · Apache-2.0</p>
          <p className="text-xs text-zinc-600">用具名的 .localhost URL 取代端口号 · HTTPS 默认 · HTTP/2 多路复用</p>
        </div>
      </div>
    </footer>
  );
}
