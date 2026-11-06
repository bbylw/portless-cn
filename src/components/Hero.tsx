import { CodeBlock } from "./CodeBlock";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { heroDiff } from "../data";
import { useEffect, useState } from "react";
import { IconBrowserSmall } from "./icons";
import { Link } from "react-router-dom";

function useTyping(text: string, speed = 28, startDelay = 600) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    let t: number;
    const start = window.setTimeout(() => {
      t = window.setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(t);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => { window.clearTimeout(start); window.clearInterval(t); };
  }, [text, speed, startDelay]);
  return { out, done };
}

export function Hero() {
  const typing = useTyping(`$ portless myapp next dev
✓ proxy listening on https://myapp.localhost  (443)
✓ app registered → :4123
→ https://myapp.localhost  ready`, 18, 900);

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-[0.6]" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[700px] w-[1200px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.12),_transparent_60%)] blur-2xl" />
      <div className="absolute top-32 right-[8%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.14),_transparent_70%)] blur-2xl" />
      <div className="absolute bottom-0 left-[10%] h-[360px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.07),_transparent_70%)] blur-2xl" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur px-3.5 py-1.5 text-[12.5px] font-medium text-zinc-300 shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-brand)] opacity-60"></span>
              <span className="relative inline-flex size-2 rounded-full bg-[var(--color-brand)] shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            </span>
            为人类和智能体 <span className="text-white/40">·</span> <span className="text-white">agent</span> 设计
            <span className="ml-1 hidden sm:inline-flex items-center gap-1 rounded-full bg-white text-black px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">NEW</span>
          </div>

          <h1 className="text-[38px] font-[800] tracking-[-0.04em] leading-[0.95] sm:text-[56px] lg:text-[68px]">
            <span className="block text-white">用具名的</span>
            <span className="gradient-text">.localhost</span>
            <span className="text-white"> URL</span>
            <span className="block text-white mt-1">取代端口号</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-relaxed text-zinc-400 sm:text-[18px]">
            portless 让本地开发服务器运行在稳定、具名的
            <span className="text-white font-medium"> HTTPS URL</span> 上。端口号随时变，具名域名始终稳定。开箱即用，无需手动配置。
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/docs" className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-black shadow-[0_4px_20px_rgba(255,255,255,0.18),0_1px_2px_rgba(0,0,0,0.2)] hover:bg-zinc-100 transition">
              快速开始
              <span className="flex size-6 items-center justify-center rounded-full bg-black text-white group-hover:translate-x-0.5 transition-transform">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </span>
            </Link>
            <Link to="/docs/commands" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur px-7 py-3.5 text-[14.5px] font-medium text-white hover:bg-white/10 hover:border-white/15 transition">
              <IconBrowserSmall size={16} />
              查看命令
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-emerald-500"></span> 零配置启动</span>
            <span className="size-1 rounded-full bg-white/15"></span>
            <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-violet-500"></span> HTTPS + HTTP/2</span>
            <span className="size-1 rounded-full bg-white/15"></span>
            <span>Node.js 24+ · macOS / Linux / Windows</span>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[20px] bg-gradient-to-r from-emerald-500/15 via-transparent to-violet-500/15 blur-2xl opacity-60" />
              <CodeBlock label="package.json" code={`- ${heroDiff.before}   # ${heroDiff.beforeUrl}\n+ ${heroDiff.after}   # ${heroDiff.afterUrl}`} className="relative" />
              <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-400"><span className="size-1.5 rounded-full bg-red-400"></span> before</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] text-emerald-400"><span className="size-1.5 rounded-full bg-emerald-400"></span> after</span>
                <span className="ml-auto hidden sm:inline text-zinc-600">一行替换，告别端口记忆</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-[16px] border border-white/10 bg-[#0e0e10] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
                <div className="flex gap-1.5"><span className="size-3 rounded-full bg-[#ff5f56]"></span><span className="size-3 rounded-full bg-[#ffbd2e]"></span><span className="size-3 rounded-full bg-[#27c93f]"></span></div>
                <span className="ml-2 text-[11px] font-mono tracking-widest uppercase text-white/30">terminal — zsh</span>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-medium text-emerald-400 border border-emerald-500/20"><span className="size-1.5 rounded-full bg-emerald-400 animate-pulse-dot"></span> live</span>
              </div>
              <pre className="p-4 text-[12.5px] leading-6 font-mono whitespace-pre-wrap min-h-[148px]">
                <code>
                  {typing.out.split("\n").map((line, i) => {
                    const isSuccess = line.includes("✓") || line.includes("→");
                    const isCmd = line.startsWith("$");
                    return (
                      <div key={i} className={isCmd ? "text-zinc-100" : isSuccess ? "text-emerald-300" : "text-zinc-400"}>
                        {line}
                        {i === typing.out.split("\n").length - 1 && !typing.done && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-white/80 animate-pulse" />}
                      </div>
                    );
                  })}
                </code>
              </pre>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <p className="mt-2.5 text-center text-[11px] text-zinc-500">自动生成本地 CA · 自动绑定 443 · 自动注入 PORT</p>
          </div>
        </div>

        {/* architecture - enhanced SVG */}
        <div className="mx-auto mt-10 max-w-5xl">
          <ArchitectureDiagram />
        </div>
      </div>
    </section>
  );
}
