import { CodeBlock } from "./CodeBlock";
import { configFields } from "../data";

export function Config() {
  return (
    <section id="config" className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-widest uppercase text-zinc-400">
            <span className="size-1.5 rounded-full bg-emerald-500"></span> 配置
          </div>
          <h2 className="mt-4 text-[30px] font-bold tracking-tight sm:text-[38px]">灵活配置，开箱即用</h2>
          <p className="mt-3 text-[15px] text-zinc-400">
            裸 <code className="font-mono text-emerald-300 bg-emerald-500/10 px-1.5 py-0.5 rounded text-xs">portless</code> 自动推断；需要时用 <code className="font-mono text-violet-300 bg-violet-500/10 px-1.5 py-0.5 rounded text-xs">portless.json</code> 覆盖。
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 lg:grid-cols-2">
          {[
            { title: "基础配置", sub: "单应用 · 最简", code: `{ "name": "myapp" }`, label: "portless.json", foot: "portless → https://myapp.localhost" },
            { title: "Monorepo", sub: "多包 · 工作区", code: `{\n  "apps": {\n    "apps/web": { "name": "myapp" },\n    "apps/api": { "name": "api.myapp" }\n  }\n}`, label: "portless.json", foot: "根目录 portless 启动所有工作区包" },
            { title: "package.json · 字符串", sub: "简写形式", code: `{\n  "name": "@myorg/web",\n  "portless": "myapp"\n}`, label: "package.json", foot: "字符串值即为应用名" },
            { title: "package.json · 对象", sub: "完整配置", code: `{\n  "name": "@myorg/web",\n  "portless": {\n    "name": "myapp",\n    "script": "dev:app"\n  }\n}`, label: "package.json", foot: "支持 name / script / appPort / proxy" },
          ].map((b) => (
            <div key={b.title} className="rounded-[16px] border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">{b.title}</h3>
                  <p className="text-xs text-zinc-500">{b.sub}</p>
                </div>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-mono text-zinc-300 border border-white/5">{b.label}</span>
              </div>
              <CodeBlock code={b.code} />
              <p className="mt-2 text-xs text-zinc-500">{b.foot}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-4 py-3">
            <h3 className="text-sm font-semibold text-white">配置字段</h3>
            <span className="text-xs text-zinc-500">6 个字段 · 全部可选</span>
          </div>
          <div className="divide-y divide-white/[0.06]">
            <div className="hidden sm:grid grid-cols-[120px_90px_110px_1fr] gap-4 px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-white/30 bg-white/[0.02]">
              <span>字段</span><span>类型</span><span>默认值</span><span>说明</span>
            </div>
            {configFields.map((f) => (
              <div key={f.field} className="grid gap-1 px-4 py-3 hover:bg-white/[0.03] transition sm:grid-cols-[120px_90px_110px_1fr] sm:gap-4 sm:items-center">
                <code className="font-mono text-sm font-medium text-emerald-300">{f.field}</code>
                <span className="inline-flex sm:block"><span className="rounded-full bg-violet-500/15 border border-violet-500/20 px-2 py-0.5 font-mono text-xs text-violet-300">{f.type}</span></span>
                <code className="font-mono text-xs text-zinc-500">{f.def || "—"}</code>
                <span className="text-[13.5px] text-zinc-400">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-6 grid max-w-5xl gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[16px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2"><span className="size-7 rounded-lg bg-white text-black flex items-center justify-center text-xs font-bold">T</span> 搭配 Turborepo</h3>
            <p className="mt-2 text-[13px] text-zinc-400">将 <code className="font-mono text-xs text-emerald-300">portless</code> 作为 dev 脚本，真实命令放到单独脚本中。无需改 <code className="font-mono text-xs text-zinc-300">turbo.json</code>。</p>
            <div className="mt-4">
              <CodeBlock code={`{\n  "scripts": {\n    "dev": "portless",\n    "dev:app": "next dev"\n  },\n  "portless": { "name": "myapp", "script": "dev:app" }\n}`} label="package.json" />
            </div>
          </div>
          <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-5 flex flex-col">
            <h4 className="text-sm font-semibold text-white">--script 标志</h4>
            <p className="mt-1 text-[13px] text-zinc-400">为单次调用覆盖默认脚本。</p>
            <div className="mt-4">
              <CodeBlock code={`portless --script start       # 运行 "start" 而不是 "dev"\nportless --script test        # 运行 "test" 而不是 "dev"`} />
            </div>
            <div className="mt-auto pt-4 flex gap-2 text-xs">
              <span className="rounded-full bg-emerald-500 text-black px-2.5 py-1 font-medium">dev</span>
              <span className="rounded-full bg-white/10 text-zinc-300 px-2.5 py-1">start</span>
              <span className="rounded-full bg-white/10 text-zinc-300 px-2.5 py-1">test</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
