import { CodeBlock } from "./CodeBlock";
import { commands, options, envVars } from "../data";
import { useState } from "react";

type Tab = "commands" | "options" | "env";

export function Commands() {
  const [tab, setTab] = useState<Tab>("commands");
  const [q, setQ] = useState("");

  const filteredCommands = commands.filter(c => !q || c.cmd.toLowerCase().includes(q.toLowerCase()) || c.desc.includes(q));
  const filteredOptions = options.filter(o => !q || o.flag.toLowerCase().includes(q.toLowerCase()) || o.desc.includes(q));
  const filteredEnv = envVars.filter(e => !q || e.name.toLowerCase().includes(q.toLowerCase()) || e.desc.includes(q));

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "commands", label: "命令", count: commands.length },
    { id: "options", label: "选项", count: options.length },
    { id: "env", label: "环境变量", count: envVars.length },
  ];

  return (
    <section id="commands" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-widest uppercase text-zinc-400">
            <span className="size-1.5 rounded-full bg-emerald-500"></span> 参考手册
          </div>
          <h2 className="mt-4 text-[30px] font-bold tracking-tight sm:text-[38px]">命令参考</h2>
          <p className="mt-3 text-[15px] text-zinc-400">所有 portless 命令、选项与环境变量一览。支持即时搜索。</p>
        </div>

        {/* Tab + Search */}
        <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur self-start">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition cursor-pointer ${tab === t.id ? "bg-white text-black shadow" : "text-zinc-400 hover:text-white"}`}
              >
                {t.label} <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] ${tab === t.id ? "bg-black/10 text-black/60" : "bg-white/10 text-zinc-400"}`}>{t.count}</span>
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-[280px]">
            <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="搜索命令、选项…" className="w-full rounded-full border border-white/10 bg-white/[0.04] pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition" />
            {q && <button onClick={()=>setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-1 text-white/60 hover:text-white cursor-pointer"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" /></svg></button>}
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-4xl">
          {tab === "commands" && (
            <div className="overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.02]">
              {filteredCommands.length === 0 ? (
                <div className="py-12 text-center text-sm text-zinc-500">无匹配结果</div>
              ) : filteredCommands.map((c, i) => (
                <div key={i} className="group flex flex-col gap-1.5 border-b border-white/[0.06] last:border-0 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4 hover:bg-white/[0.03] transition">
                  <code className="shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-[12.5px] font-medium text-emerald-300">{c.cmd}</code>
                  <span className="text-[13.5px] text-zinc-400 flex-1">{c.desc}</span>
                  <button onClick={()=>navigator.clipboard.writeText(c.cmd)} className="hidden sm:inline-flex size-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 opacity-0 group-hover:opacity-100 hover:text-white hover:bg-white/10 transition cursor-pointer" aria-label="复制">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v3" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "options" && (
            <div className="overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.02]">
              <div className="hidden sm:grid grid-cols-[280px_1fr] gap-4 border-b border-white/5 bg-white/[0.03] px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-white/30">
                <span>选项</span><span>说明</span>
              </div>
              {filteredOptions.map((o, i) => (
                <div key={i} className="grid gap-1 border-b border-white/[0.06] last:border-0 px-4 py-3 hover:bg-white/[0.03] transition sm:grid-cols-[280px_1fr] sm:gap-4 sm:items-center">
                  <code className="font-mono text-[13px] text-violet-300">{o.flag}</code>
                  <span className="text-[13.5px] text-zinc-400">{o.desc}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "env" && (
            <div className="grid gap-6">
              {["配置", "注入到子进程"].map((group) => {
                const list = filteredEnv.filter(e=>e.group===group);
                if (list.length===0) return null;
                return (
                  <div key={group}>
                    <h3 className="mb-2 flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-white/40">
                      <span className={`size-1.5 rounded-full ${group==="配置" ? "bg-emerald-500" : "bg-violet-500"}`}></span>{group}
                    </h3>
                    <div className="overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.02]">
                      <div className="hidden sm:grid grid-cols-[260px_1fr] gap-4 border-b border-white/5 bg-white/[0.03] px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-white/30">
                        <span>变量</span><span>说明</span>
                      </div>
                      {list.map((e, i) => (
                        <div key={i} className="grid gap-1 border-b border-white/[0.06] last:border-0 px-4 py-3 hover:bg-white/[0.03] transition sm:grid-cols-[260px_1fr] sm:gap-4 sm:items-center">
                          <code className="font-mono text-[13px] text-emerald-300">{e.name}</code>
                          <span className="text-[13.5px] text-zinc-400">{e.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {filteredEnv.length===0 && <div className="py-12 text-center text-sm text-zinc-500">无匹配结果</div>}
            </div>
          )}
        </div>

        <div className="mx-auto mt-6 grid max-w-4xl gap-3 sm:grid-cols-2">
          <CodeBlock label="绕过代理" code={`# 禁用 portless（直接运行命令）\nPORTLESS=0 pnpm dev              # 绕过代理，使用默认端口`} />
          <div className="rounded-[14px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-4">
            <p className="text-[13px] font-medium text-white flex items-center gap-2"><span className="size-6 rounded-full bg-white/10 flex items-center justify-center text-xs">!</span> 保留名称</p>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
              <code className="font-mono text-xs text-emerald-300">run</code>、<code className="font-mono text-xs text-emerald-300">alias</code>、<code className="font-mono text-xs text-emerald-300">proxy</code> 等为子命令，不能直接作应用名。请用 <code className="font-mono text-xs text-white bg-white/10 px-1 py-0.5 rounded">portless run &lt;cmd&gt;</code> 推断，或 <code className="font-mono text-xs text-white bg-white/10 px-1 py-0.5 rounded">--name</code> 指定。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
