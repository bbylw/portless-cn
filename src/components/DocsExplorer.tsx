import { Link } from "react-router-dom";
import { docsGroups } from "../navigation/docsNav";

export function DocsExplorer() {
  return (
    <section id="docs" className="relative py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-500/[0.03] via-transparent to-transparent" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-widest uppercase text-zinc-400">
            <span className="size-1.5 rounded-full bg-emerald-500"></span> 文档
          </div>
          <h2 className="mt-4 text-[30px] font-bold tracking-tight text-balance sm:text-[38px]">从快速开始到运维排障</h2>
          <p className="mt-3 text-[15px] text-zinc-400 text-pretty">
            按主题查阅完整文档：配置、路由命名、代理与共享、命令参考、Docker Compose 与 MCP。
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {docsGroups.map((group) => {
            const isCore = group.id === "core";
            const isRef = group.id === "reference";
            const isOps = group.id === "ops";
            const colSpan =
              isCore || isRef ? "lg:col-span-7" : "lg:col-span-5";

            return (
              <div
                key={group.id}
                className={`group relative flex flex-col overflow-hidden rounded-[18px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-5 transition duration-300 hover:border-white/20 sm:p-6 ${colSpan}`}
              >
                <div className="pointer-events-none absolute -top-10 -right-10 size-36 rounded-full bg-gradient-to-br from-emerald-500/10 to-violet-500/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                    <h3 className="text-[13.5px] font-semibold tracking-wide text-white">{group.label}</h3>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10.5px] text-zinc-400 tabular-nums">
                      {group.pages.length} 篇
                    </span>
                  </div>

                  <div
                    className={`mt-4 grid flex-1 gap-2.5 ${
                      isCore || isRef ? "sm:grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    {group.pages.map((page) => (
                      <Link
                        key={page.path}
                        to={page.path}
                        className="group/item flex flex-col justify-between rounded-xl border border-white/[0.06] bg-[#111114]/90 p-3.5 transition duration-200 hover:border-emerald-500/30 hover:bg-white/[0.04]"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[13.5px] font-semibold text-zinc-100 transition group-hover/item:text-emerald-300">
                              {page.label}
                            </span>
                            <span className="font-mono text-[10.5px] text-zinc-500 transition group-hover/item:text-emerald-400/80">
                              {page.path}
                            </span>
                          </div>
                          <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-400 text-pretty">
                            {page.description}
                          </p>
                        </div>
                        {(isOps || isRef) && page.sections.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/[0.05] pt-2.5">
                            {page.sections.map((sec) => (
                              <span
                                key={sec.id}
                                className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10.5px] text-zinc-400"
                              >
                                {sec.title}
                              </span>
                            ))}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/docs"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-6 py-2.5 text-[13.5px] font-medium text-white transition duration-200 hover:border-white/20 hover:bg-white/10 active:scale-[0.98]"
          >
            进入文档中心
          </Link>
        </div>
      </div>
    </section>
  );
}
