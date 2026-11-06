import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { heroDiff, upstreamVersion } from "../data";
import { useEffect, useState } from "react";
import { IconBrowserSmall } from "./icons";
import { Link } from "react-router-dom";
import { copyText } from "../utils/clipboard";

function useTyping(text: string, speed = 28, startDelay = 600) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      setDone(true);
      return;
    }

    setOut("");
    setDone(false);
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
    return () => {
      window.clearTimeout(start);
      window.clearInterval(t);
    };
  }, [text, speed, startDelay, runId]);

  return { out, done, replay: () => setRunId((n) => n + 1) };
}

function renderTerminalLine(line: string) {
  if (line.startsWith("$ ")) {
    const rest = line.slice(2);
    const parts = rest.split(" ");
    return (
      <>
        <span className="text-zinc-500 select-none">$ </span>
        <span className="font-semibold text-emerald-300">{parts[0] ?? ""}</span>
        {parts[1] ? <span className="text-violet-300"> {parts[1]}</span> : null}
        {parts.length > 2 ? <span className="text-zinc-100"> {parts.slice(2).join(" ")}</span> : null}
      </>
    );
  }

  if (line.startsWith("✓ ")) {
    const urlIdx = line.indexOf("https://");
    const portIdx = line.indexOf(":4123");
    if (urlIdx !== -1) {
      const beforeUrl = line.slice(2, urlIdx);
      const afterPart = line.slice(urlIdx);
      const spaceIdx = afterPart.indexOf(" ");
      const url = spaceIdx === -1 ? afterPart : afterPart.slice(0, spaceIdx);
      const tail = spaceIdx === -1 ? "" : afterPart.slice(spaceIdx);
      return (
        <>
          <span className="font-bold text-emerald-400">✓ </span>
          <span className="text-zinc-300">{beforeUrl}</span>
          <span className="font-medium text-emerald-300 underline decoration-emerald-500/35 underline-offset-4">
            {url}
          </span>
          <span className="text-zinc-500">{tail}</span>
        </>
      );
    }
    if (portIdx !== -1) {
      const beforePort = line.slice(2, portIdx);
      const port = line.slice(portIdx);
      return (
        <>
          <span className="font-bold text-emerald-400">✓ </span>
          <span className="text-zinc-300">{beforePort}</span>
          <span className="font-medium text-violet-300 tabular-nums">{port}</span>
        </>
      );
    }
    return (
      <>
        <span className="font-bold text-emerald-400">✓ </span>
        <span className="text-zinc-300">{line.slice(2)}</span>
      </>
    );
  }

  if (line.startsWith("→ ")) {
    const rest = line.slice(2);
    const readyIdx = rest.indexOf("  ready");
    if (readyIdx !== -1) {
      const url = rest.slice(0, readyIdx);
      return (
        <>
          <span className="font-bold text-emerald-400">→ </span>
          <span className="font-semibold text-white underline decoration-emerald-400/50 underline-offset-4">
            {url}
          </span>
          <span className="ml-2 inline-flex items-center rounded-md border border-emerald-500/25 bg-emerald-500/15 px-1.5 py-0.5 text-[10.5px] font-semibold tracking-wide text-emerald-300">
            ready
          </span>
        </>
      );
    }
    return (
      <>
        <span className="font-bold text-emerald-400">→ </span>
        <span className="font-semibold text-emerald-300">{rest}</span>
      </>
    );
  }

  return line;
}

export function Hero() {
  const typing = useTyping(
    `$ portless myapp next dev
✓ proxy listening on https://myapp.localhost (443)
✓ app registered → :4123
→ https://myapp.localhost  ready`,
    18,
    750,
  );

  const [diffCopied, setDiffCopied] = useState(false);
  const [cmdCopied, setCmdCopied] = useState(false);

  const handleCopyDiff = async () => {
    const ok = await copyText(heroDiff.after);
    if (ok) {
      setDiffCopied(true);
      window.setTimeout(() => setDiffCopied(false), 1800);
    }
  };

  const handleCopyInstall = async () => {
    const ok = await copyText("npm install -g portless");
    if (ok) {
      setCmdCopied(true);
      window.setTimeout(() => setCmdCopied(false), 1800);
    }
  };

  const lines = typing.out.split("\n");

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-[0.55]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-170 w-290 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.12),_transparent_62%)] blur-2xl" />
      <div className="pointer-events-none absolute top-28 right-[8%] h-105 w-105 rounded-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.13),_transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-[10%] h-90 w-150 rounded-full bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.07),_transparent_70%)] blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/9 bg-white/4 px-3.5 py-1.5 text-[12.5px] font-medium text-zinc-300 shadow-[0_1px_2px_rgba(0,0,0,0.25)] backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60"></span>
              <span className="relative inline-flex size-2 rounded-full bg-brand shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            </span>
            <span>
              为人类和 <span className="font-semibold text-white">Agent</span> 设计
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span className="font-mono text-[11.5px] text-emerald-300">v{upstreamVersion}</span>
            <span className="hidden items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase text-black sm:inline-flex">
              NEW
            </span>
          </div>

          <h1 className="text-[38px] font-bold tracking-[-0.035em] leading-[1.12] text-balance sm:text-[56px] sm:leading-[1.08] lg:text-[66px]">
            <span className="block bg-linear-to-b from-white via-white to-zinc-200 bg-clip-text text-transparent">
              用具名的
            </span>
            <span className="mt-1 block">
              <span className="gradient-text">.localhost</span>
              <span className="bg-linear-to-b from-white via-white to-zinc-200 bg-clip-text text-transparent"> URL</span>
            </span>
            <span className="mt-1 block bg-linear-to-b from-white via-white to-zinc-300 bg-clip-text text-transparent">
              取代端口号
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-165 text-[16.5px] leading-[1.75] text-zinc-400 sm:text-[18px]">
            portless 让本地开发服务器运行在稳定、具名的{" "}
            <span className="font-medium text-white">HTTPS URL</span> 上。
            <br className="hidden sm:inline" />
            端口号随时变，具名域名始终稳定。开箱即用，无需手动配置。
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/docs"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-black shadow-[0_4px_20px_rgba(255,255,255,0.18),0_1px_2px_rgba(0,0,0,0.2)] transition duration-200 hover:bg-zinc-100 active:scale-[0.98] sm:w-auto"
            >
              快速开始
            </Link>
            <Link
              to="/docs/commands"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/6 px-7 py-3.5 text-[14.5px] font-medium text-white backdrop-blur transition duration-200 hover:border-white/20 hover:bg-white/10 active:scale-[0.98] sm:w-auto"
            >
              <IconBrowserSmall size={16} />
              查看命令
            </Link>
            <button
              type="button"
              onClick={handleCopyInstall}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/8 bg-[#0e0e11]/90 px-4 py-3.5 font-mono text-[13px] text-zinc-300 shadow-inner transition duration-200 hover:border-emerald-500/35 hover:text-white active:scale-[0.98] sm:w-auto cursor-pointer"
              aria-label="复制全局安装命令 npm install -g portless"
            >
              <span className="text-zinc-500 select-none">$</span>
              <span>
                <span className="text-violet-300">npm</span> i <span className="text-emerald-300">-g portless</span>
              </span>
              {cmdCopied ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 font-sans text-[11px] font-medium text-emerald-300">
                  已复制
                </span>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-zinc-500">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v3" />
                </svg>
              )}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500"></span> 零配置启动
            </span>
            <span className="size-1 rounded-full bg-white/15"></span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-violet-500"></span> HTTPS + HTTP/2
            </span>
            <span className="size-1 rounded-full bg-white/15"></span>
            <span className="tabular-nums">Node.js 24+ · macOS / Linux / Windows</span>
          </div>
        </div>

        {/* Symmetrical Height Dual-Pane Demo */}
        <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-5 lg:grid-cols-12">
          {/* Left Pane: package.json diff + URL upgrade */}
          <div className="relative flex min-w-0 flex-col lg:col-span-6">
            <div className="pointer-events-none absolute -inset-3 rounded-[22px] bg-linear-to-r from-emerald-500/15 via-transparent to-violet-500/15 opacity-60 blur-2xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-code-bg shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              {/* Window Top Bar */}
              <div className="flex h-10 items-center justify-between border-b border-white/6 bg-white/2.5 px-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-[#ff5f56]/90 border border-black/15" />
                    <span className="size-2.5 rounded-full bg-[#ffbd2e]/90 border border-black/15" />
                    <span className="size-2.5 rounded-full bg-[#27c93f]/90 border border-black/15" />
                  </div>
                  <span className="ml-1.5 inline-flex items-center gap-1.5 font-mono text-[11.5px] font-medium tracking-wide text-zinc-300">
                    <span className="text-zinc-500">myapp /</span>
                    <span>package.json</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyDiff}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/4 px-2.5 py-1 text-[11px] font-medium text-zinc-400 transition hover:border-white/20 hover:bg-white/8 hover:text-white cursor-pointer"
                  aria-label="复制 dev 脚本配置"
                >
                  {diffCopied ? (
                    <>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-emerald-400">已复制</span>
                    </>
                  ) : (
                    <>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v3" />
                      </svg>
                      复制配置
                    </>
                  )}
                </button>
              </div>

              {/* Diff Code Body */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div className="overflow-x-auto font-mono text-[12px] leading-6 sm:text-[12.5px]">
                  <div className="flex items-center gap-3 px-2 text-zinc-600 select-none">
                    <span className="w-3 text-right text-[10.5px] text-zinc-700 tabular-nums">1</span>
                    <span>{"\"scripts\": {"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 rounded-md border-l-2 border-rose-400/70 bg-rose-500/6 px-2.5 py-1">
                    <div className="flex items-center gap-2.5 whitespace-pre">
                      <span className="w-3 text-right text-[10.5px] text-rose-400/50 tabular-nums select-none">2</span>
                      <span>
                        <span className="font-semibold text-rose-400 select-none">- </span>
                        <span className="text-rose-200/80">"dev"</span>
                        <span className="text-rose-300/50">: </span>
                        <span className="text-rose-200/75">"next dev"</span>
                      </span>
                    </div>
                    <span className="hidden shrink-0 font-mono text-[11px] text-rose-300/45 line-through decoration-rose-400/40 sm:inline">
                      # {heroDiff.beforeUrl}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2 rounded-md border-l-2 border-emerald-400/80 bg-emerald-500/8 px-2.5 py-1">
                    <div className="flex items-center gap-2.5 whitespace-pre">
                      <span className="w-3 text-right text-[10.5px] text-emerald-400/60 tabular-nums select-none">3</span>
                      <span>
                        <span className="font-semibold text-emerald-400 select-none">+ </span>
                        <span className="font-medium text-zinc-200">"dev"</span>
                        <span className="text-zinc-400">: </span>
                        <span className="text-emerald-300">"portless run next dev"</span>
                      </span>
                    </div>
                    <span className="hidden shrink-0 font-mono text-[11px] text-emerald-300 underline decoration-emerald-400/35 underline-offset-2 sm:inline">
                      # {heroDiff.afterUrl}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-2 text-zinc-600 select-none">
                    <span className="w-3 text-right text-[10.5px] text-zinc-700 tabular-nums">4</span>
                    <span>{"}"}</span>
                  </div>
                </div>

                {/* Address Bar Comparison Strip */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/6 bg-white/2 px-3 py-2 text-[11.5px]">
                  <div className="flex items-center gap-2 font-mono text-zinc-500">
                    <span className="inline-flex items-center gap-1 rounded-md border border-rose-500/20 bg-rose-500/10 px-1.5 py-0.5 text-[10px] text-rose-300">
                      before
                    </span>
                    <span className="line-through decoration-zinc-600">{heroDiff.beforeUrl}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-emerald-300">
                    <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/25 bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                      after
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium text-white">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.4">
                        <rect x="4" y="11" width="16" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                      {heroDiff.afterUrl}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/6 bg-white/2 px-4 py-2 text-[11px] text-zinc-500">
                <span>一行替换，告别端口冲突与记忆负担</span>
                <span className="font-mono text-zinc-400">或直接运行裸 portless</span>
              </div>
            </div>
          </div>

          {/* Right Pane: Live Terminal */}
          <div className="flex min-w-0 flex-col lg:col-span-6">
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-code-bg shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              {/* Window Top Bar */}
              <div className="flex h-10 items-center gap-2 border-b border-white/6 bg-white/2.5 px-4">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#ff5f56]/90 border border-black/15" />
                  <span className="size-2.5 rounded-full bg-[#ffbd2e]/90 border border-black/15" />
                  <span className="size-2.5 rounded-full bg-[#27c93f]/90 border border-black/15" />
                </div>
                <span className="ml-1.5 font-mono text-[11px] tracking-widest uppercase text-white/40">
                  terminal — zsh
                </span>
                <div className="ml-auto flex items-center gap-1.5">
                  {typing.done && (
                    <button
                      type="button"
                      onClick={typing.replay}
                      className="rounded-md border border-white/10 bg-white/4 px-2 py-0.5 text-[10px] font-medium text-zinc-400 transition hover:border-white/20 hover:text-white cursor-pointer"
                      aria-label="重播终端输出动画"
                    >
                      重播
                    </button>
                  )}
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                    live
                  </span>
                </div>
              </div>

              {/* Terminal Output Body + Route Status Bar */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <pre className="overflow-x-auto font-mono text-[12px] leading-6 whitespace-pre-wrap sm:text-[12.5px] sm:whitespace-pre">
                  <code>
                    {lines.map((line, i) => {
                      const isReady = line.startsWith("→");
                      return (
                        <div key={i} className={isReady ? "mt-1" : ""}>
                          {renderTerminalLine(line)}
                          {i === lines.length - 1 && !typing.done && (
                            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-white/80 animate-pulse" />
                          )}
                        </div>
                      );
                    })}
                  </code>
                </pre>

                {/* Symmetrical Live Route Mapping Strip */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/6 bg-white/2 px-3 py-2 text-[11.5px]">
                  <div className="flex items-center gap-2 font-mono text-zinc-300">
                    <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/25 bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                      route
                    </span>
                    <span className="font-medium text-white">myapp.localhost</span>
                    <span className="text-zinc-600">:443</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-zinc-400 tabular-nums">
                    <span className="rounded-md border border-violet-500/25 bg-violet-500/12 px-1.5 py-0.5 text-[10px] font-medium text-violet-300">
                      127.0.0.1:4123
                    </span>
                    <span className="hidden text-[10.5px] text-zinc-500 sm:inline">H2 · TLS</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between border-t border-white/6 bg-white/2 px-4 py-2 text-[11px] text-zinc-500">
                <span>自动生成本地 CA · 自动绑定 443</span>
                <span className="font-mono text-emerald-400/90 tabular-nums">PORT=4123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="mx-auto mt-8 max-w-5xl">
          <ArchitectureDiagram />
        </div>
      </div>

      {/* Subtle Section Horizon Hairline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
