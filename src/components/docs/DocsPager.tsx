import { Link } from "react-router-dom";
import type { DocsPageMeta } from "../../navigation/docsNav";

export function DocsPager({ previous, next }: { previous?: DocsPageMeta; next?: DocsPageMeta }) {
  if (!previous && !next) return null;

  return (
    <nav className="mt-14 grid gap-3 border-t border-white/7 pt-6 sm:grid-cols-2" aria-label="文档翻页">
      {previous ? (
        <Link
          to={previous.path}
          className="group rounded-xl border border-white/10 bg-white/3 px-4 py-3.5 transition hover:border-white/20 hover:bg-white/5"
        >
          <span className="text-[11px] font-medium tracking-widest uppercase text-white/30">上一页</span>
          <span className="mt-1 flex items-center gap-2 text-[14px] font-medium text-zinc-300 group-hover:text-white">
            {previous.label}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
      {next ? (
        <Link
          to={next.path}
          className="group rounded-xl border border-white/10 bg-white/3 px-4 py-3.5 text-right transition hover:border-white/20 hover:bg-white/5"
        >
          <span className="text-[11px] font-medium tracking-widest uppercase text-white/30">下一页</span>
          <span className="mt-1 flex items-center justify-end gap-2 text-[14px] font-medium text-zinc-300 group-hover:text-white">
            {next.label}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
