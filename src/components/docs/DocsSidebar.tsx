import { NavLink } from "react-router-dom";
import { docsGroups } from "../../navigation/docsNav";

export function DocsSidebar({ className = "" }: { className?: string }) {
  return (
    <nav aria-label="文档导航" className={className}>
      {docsGroups.map((group) => (
        <div key={group.id} className="mb-7">
          <h2 className="mb-2 px-3 text-[10.5px] font-semibold tracking-widest uppercase text-white/30">{group.label}</h2>
          <div className="space-y-0.5">
            {group.pages.map((page) => (
              <NavLink
                key={page.path}
                to={page.path}
                end={page.path === "/docs"}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/15"
                      : "border border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                  }`
                }
              >
                <span className={`size-1.5 rounded-full ${"bg-white/15"}`} />
                {page.label}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
