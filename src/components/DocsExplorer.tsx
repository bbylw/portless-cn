import { Link } from "react-router-dom";
import { docsGroups } from "../navigation/docsNav";

export function DocsExplorer() {
  return (
    <section id="docs" className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.03] via-transparent to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-widest uppercase text-zinc-400">
            <span className="size-1.5 rounded-full bg-emerald-500"></span> 文档
          </div>
          <h2 className="mt-4 text-[30px] font-bold tracking-tight text-balance sm:text-[38px]">从快速开始到运维排障</h2>
          <p className="mt-3 text-[15px] text-zinc-400">按主题查阅完整文档：配置、路由命名、代理与共享、命令参考、Docker Compose 与 MCP。</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {docsGroups.map((group) => (
            <div
              key={group.id}
              className="group relative overflow-hidden rounded-[18px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-5 transition hover:border-white/20"
            >
              <div className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-gradient-to-br from-emerald-500/10 to-violet-500/10 blur-2xl opacity-0 transition group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-[13px] font-semibold tracking-wide text-white">{group.label}</h3>
                <div className="mt-4 space-y-2">
                  {group.pages.map((page) => (
                    <Link
                      key={page.path}
                      to={page.path}
                      className="block text-[13px] text-zinc-400 transition hover:text-emerald-300"
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/docs"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-[13.5px] font-medium text-white transition hover:border-white/20 hover:bg-white/10"
          >
            进入文档中心
          </Link>
        </div>
      </div>
    </section>
  );
}
