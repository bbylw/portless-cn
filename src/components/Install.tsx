import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import { installCommands, quickStart } from "../data";
import { Link } from "react-router-dom";
import { copyText } from "../utils/clipboard";

export function Install() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (cmd: string, index: number) => {
    const ok = await copyText(cmd);
    setStatus(ok ? "copied" : "failed");
    setCopiedIndex(ok ? index : null);
    window.setTimeout(() => {
      setStatus("idle");
      setCopiedIndex(null);
    }, 1800);
  };

  return (
    <section id="install" className="relative py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-500/[0.04] via-transparent to-transparent" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-widest uppercase text-zinc-400">
            <span className="size-1.5 rounded-full bg-emerald-500"></span> 安装
          </div>
          <h2 className="mt-4 text-[30px] font-bold tracking-tight text-balance sm:text-[38px]">一行命令，立即可用</h2>
          <p className="mt-3 text-[15px] text-zinc-400 text-pretty">
            portless 仍处于 1.0 之前版本。全局安装可获得一致体验与更稳定的状态目录。
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4">
          {installCommands.map((c, i) => {
            const isCopied = copiedIndex === i && status === "copied";
            return (
              <div
                key={i}
                className="group card-hover relative flex flex-col gap-3 overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
              >
                <div className="flex shrink-0 items-center gap-3">
                  <span
                    className={`flex size-8 items-center justify-center rounded-xl text-xs font-bold tabular-nums ${
                      i === 0 ? "bg-white text-black" : "border border-white/10 bg-white/10 text-white"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-white sm:hidden">{c.label}</span>
                  <span
                    className={`hidden items-center rounded-full px-2.5 py-1 text-[11px] font-medium sm:inline-flex ${
                      i === 0 ? "bg-emerald-500 text-black" : "border border-white/10 bg-white/10 text-zinc-300"
                    }`}
                  >
                    {i === 0 ? "推荐" : "可选"}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">{c.label}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {i === 0 ? "全局可用，跨项目共享路由状态与本地 CA" : "按项目锁定版本，适合团队协作"}
                  </p>
                </div>
                <div className="w-full sm:ml-auto sm:w-auto sm:min-w-[360px]">
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0e0e10] px-4 py-3 font-mono text-[13px] text-zinc-200">
                    <span className="truncate">
                      <span className="text-violet-400">npm</span> install{" "}
                      <span className="text-emerald-300">{i === 0 ? "-g portless" : "-D portless"}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(c.cmd, i)}
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 font-sans text-[11px] font-semibold transition duration-200 active:scale-[0.97] cursor-pointer ${
                        isCopied
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-white text-black hover:bg-zinc-100"
                      }`}
                      aria-label={`复制${c.label}命令`}
                    >
                      {isCopied ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          已复制
                        </>
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v3" />
                          </svg>
                          复制
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="sr-only" role="status">
          {status === "copied" ? "已复制安装命令" : status === "failed" ? "复制失败，请手动选择文本" : ""}
        </p>

        <div className="mx-auto mt-4 flex max-w-4xl gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/20 text-amber-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 9v4 M12 17h.01 M10.3 3.3l-7 12A2 2 0 0 0 5 18h14a2 2 0 0 0 1.7-3l-7-12a2 2 0 0 0-3.4 0z" />
            </svg>
          </span>
          <p className="text-[13px] leading-relaxed text-amber-200/80">
            <span className="font-semibold text-amber-200">注意：</span> 1.0 前版本的状态目录格式可能在升级时变化，若遇到异常请重新运行{" "}
            <code className="rounded bg-black/30 px-1.5 py-0.5 font-mono text-xs text-amber-300">portless trust</code>。
          </p>
        </div>
      </div>

      {/* 快速开始 */}
      <div id="quickstart" className="relative mx-auto mt-16 max-w-[1280px] px-4 sm:mt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[28px] font-bold tracking-tight text-balance sm:text-[34px]">快速开始</h2>
          <p className="mt-3 text-[15px] text-zinc-400">三步从端口号迈向具名域名。</p>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-5xl items-stretch gap-6 md:grid-cols-3">
          {/* connecting line desktop */}
          <div className="pointer-events-none absolute top-[32px] right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-white/5 via-white/15 to-white/5 md:block" />
          {quickStart.map((s, i) => {
            const firstCmdLine = s.code.split("\n")[0];
            const displayCode =
              i === 0
                ? `${s.code}\n# -> 全局安装 portless CLI`
                : i === 2
                  ? "portless\n# -> https://<project>.localhost"
                  : s.code;
            return (
              <div
                key={i}
                className="card-hover relative flex h-full flex-col rounded-[18px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur"
              >
                <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-b from-white/5 to-transparent" />
                <div className="relative flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="relative flex size-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-black shadow-[0_4px_12px_rgba(255,255,255,0.15)] tabular-nums">
                        {i + 1}
                        <span className="absolute -inset-1 -z-10 rounded-xl border border-white/20"></span>
                      </span>
                      <h3 className="text-[15px] font-semibold text-white">{s.title}</h3>
                      {i === 0 && (
                        <span className="ml-auto rounded-full border border-emerald-500/20 bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
                          10s
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-400 text-pretty">{s.desc}</p>
                  </div>
                  <div className="mt-5">
                    <CodeBlock code={displayCode} copyValue={firstCmdLine} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-2 text-xs text-zinc-500">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">自动推断应用名</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">自动注入 PORT / HOST</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">自动信任本地 CA</span>
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/docs"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald-400 transition hover:text-emerald-300"
          >
            完整安装与框架说明
          </Link>
        </div>
      </div>
    </section>
  );
}
