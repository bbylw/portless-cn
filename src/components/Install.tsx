import { CodeBlock } from "./CodeBlock";
import { installCommands, quickStart } from "../data";

export function Install() {
  return (
    <section id="install" className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.04] via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-widest uppercase text-zinc-400">
            <span className="size-1.5 rounded-full bg-emerald-500"></span> 安装
          </div>
          <h2 className="mt-4 text-[30px] font-bold tracking-tight sm:text-[38px]">一行命令，立即可用</h2>
          <p className="mt-3 text-[15px] text-zinc-400">
            portless 仍处于 1.0 之前版本。全局安装可获得一致体验与更稳定的状态目录。
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4">
          {installCommands.map((c, i) => (
            <div key={i} className="group relative overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.03] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-3 shrink-0">
                <span className={`flex size-8 items-center justify-center rounded-xl text-xs font-bold ${i === 0 ? "bg-white text-black" : "bg-white/10 text-white border border-white/10"}`}>{i + 1}</span>
                <span className="text-sm font-medium text-white sm:hidden">{c.label}</span>
                <span className={`hidden sm:inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${i === 0 ? "bg-emerald-500 text-black" : "bg-white/10 text-zinc-300 border border-white/10"}`}>{i === 0 ? "推荐" : "可选"}</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">{c.label}</p>
                <p className="text-xs text-zinc-500">{i === 0 ? "全局可用，跨项目一致" : "按项目锁定版本，适合团队协作"}</p>
              </div>
              <div className="sm:ml-auto w-full sm:w-auto sm:min-w-[360px]">
                <div className="rounded-xl border border-white/10 bg-[#0e0e10] px-4 py-3 font-mono text-[13px] text-zinc-200 flex items-center justify-between gap-3">
                  <span className="truncate"><span className="text-violet-400">npm</span> install <span className="text-emerald-300">{i === 0 ? "-g portless" : "-D portless"}</span></span>
                  <button onClick={() => navigator.clipboard.writeText(c.cmd)} className="shrink-0 rounded-full bg-white p-1.5 text-black hover:bg-zinc-100 transition cursor-pointer" aria-label="复制">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v3" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-4 max-w-4xl rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 flex gap-3">
          <span className="shrink-0 mt-0.5 size-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 9v4 M12 17h.01 M10.3 3.3l-7 12A2 2 0 0 0 5 18h14a2 2 0 0 0 1.7-3l-7-12a2 2 0 0 0-3.4 0z" /></svg>
          </span>
          <p className="text-[13px] leading-relaxed text-amber-200/80">
            <span className="font-semibold text-amber-200">注意：</span> 1.0 前版本的状态目录格式可能在升级时变化，若遇到异常请重新运行 <code className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-xs text-amber-300">portless trust</code>。
          </p>
        </div>
      </div>

      {/* 快速开始 */}
      <div id="quickstart" className="relative mx-auto mt-16 sm:mt-24 max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[28px] font-bold tracking-tight sm:text-[34px]">快速开始</h2>
          <p className="mt-3 text-[15px] text-zinc-400">三步从端口号迈向具名域名。</p>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          {/* connecting line desktop */}
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-[32px] hidden h-px bg-gradient-to-r from-white/5 via-white/15 to-white/5 md:block" />
          {quickStart.map((s, i) => (
            <div key={i} className="relative rounded-[18px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur">
              <div className="absolute inset-0 rounded-[18px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="relative flex size-9 items-center justify-center rounded-xl bg-white text-black font-bold text-sm shadow-[0_4px_12px_rgba(255,255,255,0.15)]">
                    {i + 1}
                    <span className="absolute -inset-1 rounded-xl border border-white/20 -z-10"></span>
                  </span>
                  <h3 className="font-semibold text-[15px] text-white">{s.title}</h3>
                  {i === 0 && <span className="ml-auto rounded-full bg-emerald-500/15 border border-emerald-500/20 px-2 py-1 text-[10px] font-medium text-emerald-400">10s</span>}
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-400">{s.desc}</p>
                <div className="mt-4">
                  <CodeBlock code={s.code} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-2 text-xs text-zinc-500">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">自动推断应用名</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">自动注入 PORT / HOST</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">自动信任本地 CA</span>
        </div>
      </div>
    </section>
  );
}
