import type { DocsPageMeta } from "../../navigation/docsNav";
import { docsGroups } from "../../navigation/docsNav";

export function DocsPageHeader({ page }: { page: DocsPageMeta }) {
  const group = docsGroups.find((item) => item.id === page.group);

  return (
    <header className="pb-8">
      <div className="flex items-center gap-2 text-[11px] font-medium tracking-widest uppercase text-white/35">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        {group?.label}
        <span className="text-white/15">/</span>
        <span className="text-white/50">{page.label}</span>
      </div>
      <h1 className="mt-3 text-[30px] font-bold tracking-tight text-white sm:text-[34px]">{page.title}</h1>
      <p className="mt-3 max-w-160 text-[14.5px] leading-7 text-zinc-400">{page.description}</p>
    </header>
  );
}
