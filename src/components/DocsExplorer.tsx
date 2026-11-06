import { Link } from "react-router-dom";
import { docsGroups } from "../navigation/docsNav";

export function DocsExplorer() {
  return (
    <section id="docs" className="relative py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-emerald-500/3 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
          {docsGroups.map((group, gIdx) => {
            const isCore = group.id === "core";
            const isRef = group.id === "reference";
            const colSpan = isCore || isRef ? "lg:col-span-7" : "lg:col-span-5";
            const isEmerald = gIdx % 2 === 0;

            return (
              <div
                key={group.id}
                className={`group relative flex flex-col overflow-hidden rounded-[18px] border border-white/10 bg-linear-to-b from-white/5 to-white/1.5 p-5 transition duration-300 hover:border-white/20 sm:p-6 ${colSpan}`}
              >
                <div className="pointer-events-none absolute -top-10 -right-10 size-36 rounded-full bg-linear-to-br from-emerald-500/10 to-violet-500/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-center justify-between gap-2 border-b border-white/6 pb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-1.5 rounded-full ${
                          isEmerald ? "bg-emerald-400" : "bg-violet-400"
                        }`}
                      />
                      <h3 className="text-[13.5px] font-semibold tracking-wide text-white">{group.label}</h3>
                    </div>
                    <span className="rounded-full border border-white/8 bg-white/3 px-2 py-0.5 font-mono text-[10.5px] text-zinc-400 tabular-nums">
                      {group.pages.length} 篇
                    </span>
                  </div>

                  <div
                    className={`mt-4 grid flex-1 gap-2.5 ${
                      isCore || isRef ? "sm:grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    {group.pages.map((page) => (
                      <div
                        key={page.path}
                        className="group/item flex flex-col justify-between rounded-xl border border-white/6 bg-[#111114]/90 p-3.5 transition duration-200 hover:border-emerald-500/30 hover:bg-white/4"
                      >
                        <Link to={page.path} className="block">
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
                        </Link>
                        {page.sections.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/5 pt-2.5">
                            {page.sections.map((sec) => (
                              <Link
                                key={sec.id}
                                to={`${page.path}#${sec.id}`}
                                className="rounded-md border border-white/6 bg-white/3 px-2 py-0.5 text-[10.5px] text-zinc-400 transition hover:border-emerald-500/35 hover:bg-emerald-500/10 hover:text-emerald-300"
                              >
                                {sec.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
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
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-6 py-2.5 text-[13.5px] font-medium text-white transition duration-200 hover:border-white/20 hover:bg-white/10 active:scale-[0.98]"
          >
            进入文档中心
          </Link>
        </div>
      </div>
    </section>
  );
}
