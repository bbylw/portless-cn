import { Link } from "react-router-dom";
import type { DocsPageMeta } from "../../navigation/docsNav";

export function DocsPager({ previous, next }: { previous?: DocsPageMeta; next?: DocsPageMeta }) {
  if (!previous && !next) return null;

  return (
    <nav className="mt-14 grid grid-cols-2 gap-3 border-t border-white/7 pt-6" aria-label="文档翻页">
      {previous ? (
        <Link
          to={previous.path}
          className="group min-w-0 rounded-xl border border-white/10 bg-white/3 px-4 py-3.5 transition hover:border-white/20 hover:bg-white/5 active:scale-[0.98] active:bg-white/8"
        >
          <span className="flex items-center gap-1 text-[11px] font-medium tracking-widest uppercase text-white/30">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            上一页
          </span>
          <span className="mt-1 block truncate text-[14px] font-medium text-zinc-300 group-hover:text-white">
            {previous.label}
          </span>
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}
      {next ? (
        <Link
          to={next.path}
          className="group min-w-0 rounded-xl border border-white/10 bg-white/3 px-4 py-3.5 text-right transition hover:border-white/20 hover:bg-white/5 active:scale-[0.98] active:bg-white/8"
        >
          <span className="flex items-center justify-end gap-1 text-[11px] font-medium tracking-widest uppercase text-white/30">
            下一页
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
          <span className="mt-1 block truncate text-[14px] font-medium text-zinc-300 group-hover:text-white">
            {next.label}
          </span>
        </Link>
      ) : (
        <div aria-hidden="true" />
      )}
    </nav>
  );
}