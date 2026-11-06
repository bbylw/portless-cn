import { Link } from "react-router-dom";
import type { DocsPageMeta } from "../../navigation/docsNav";

export function OnThisPage({ page }: { page: DocsPageMeta }) {
  return (
    <aside className="hidden w-[200px] shrink-0 py-10 pl-8 xl:block" aria-label="本页内容">
      <div className="sticky top-24">
        <h2 className="text-[10.5px] font-semibold tracking-widest uppercase text-white/30">本页内容</h2>
        <nav className="mt-3 space-y-1.5 border-l border-white/[0.07] pl-3">
          {page.sections.map((section) => (
            <Link
              key={section.id}
              to={`${page.path}#${section.id}`}
              className="block text-[12.5px] leading-5 text-zinc-500 transition hover:text-emerald-300"
            >
              {section.title}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
