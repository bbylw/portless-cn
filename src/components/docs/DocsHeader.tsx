import { Link, NavLink } from "react-router-dom";
import { LogoSvg } from "../LogoSvg";

export function DocsHeader({ onOpenNav }: { onOpenNav: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/7 bg-[rgba(9,9,11,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-360 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-3 group">
          <div className="rounded-[9px] shadow-[0_2px_12px_rgba(34,197,94,0.2)] transition duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_4px_18px_rgba(34,197,94,0.32)]">
            <LogoSvg size={32} />
          </div>
          <div className="hidden flex-col leading-none sm:flex">
            <span className="text-[16px] font-semibold tracking-tight text-white">portless</span>
            <span className="mt-0.5 text-[9.5px] font-medium uppercase tracking-widest text-text-faint">Localhost · Named</span>
          </div>
        </Link>

        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase text-zinc-400">
          文档
        </span>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          <NavLink
            to="/docs/commands"
            className={({ isActive }) =>
              `rounded-full px-3 py-2 text-[13px] font-medium transition ${
                isActive ? "bg-white/8 text-white" : "text-zinc-400 hover:text-white hover:bg-white/6"
              }`
            }
          >
            命令参考
          </NavLink>
          <NavLink
            to="/docs/mcp"
            className={({ isActive }) =>
              `rounded-full px-3 py-2 text-[13px] font-medium transition ${
                isActive ? "bg-white/8 text-white" : "text-zinc-400 hover:text-white hover:bg-white/6"
              }`
            }
          >
            MCP
          </NavLink>
          <div className="mx-2 h-6 w-px bg-white/10" />
          <a
            href="https://github.com/vercel-labs/portless"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.74.5.09.68-.22.68-.48v-1.7c-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05.8-.23 1.65-.34 2.5-.34.85 0 1.7.11 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .26.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
            </svg>
            GitHub
          </a>
          <Link
            to="/"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-black hover:bg-zinc-100 transition"
          >
            返回首页
          </Link>
        </nav>

        <button
          onClick={onOpenNav}
          className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-[12.5px] font-medium text-white md:hidden"
          aria-label="打开文档目录"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          目录
        </button>
      </div>
    </header>
  );
}
