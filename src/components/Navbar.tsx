import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LogoSvg } from "./LogoSvg";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition ${
    isActive ? "text-white bg-white/8 border border-white/6" : "text-text-muted hover:text-white hover:bg-white/6"
  }`;

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-xl px-3.5 py-3 text-sm font-medium transition ${
    isActive ? "bg-white text-black" : "text-zinc-300 hover:bg-white/10 hover:text-white"
  }`;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();
  const isLanding = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isLanding) {
      setActiveSection("");
      return;
    }

    const ids = ["features", "install", "docs"];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isLanding]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/7 bg-[rgba(9,9,11,0.78)] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(9,9,11,0.65)] shadow-[0_1px_0_0_rgba(255,255,255,0.03),0_8px_32px_rgba(0,0,0,0.4)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="rounded-[10px] shadow-[0_2px_12px_rgba(34,197,94,0.2)] transition duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_4px_18px_rgba(34,197,94,0.32)]">
            <LogoSvg />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[17px] font-semibold tracking-tight text-white">portless</span>
            <span className="mt-0.5 text-[10px] font-medium tracking-widest uppercase text-text-faint">Localhost · Named</span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <Link
            to="/#features"
            className={`relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition ${
              isLanding && activeSection === "features"
                ? "border border-white/6 bg-white/8 text-white"
                : "text-text-muted hover:bg-white/6 hover:text-white"
            }`}
          >
            功能
          </Link>
          <Link
            to="/#install"
            className={`relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition ${
              isLanding && activeSection === "install"
                ? "border border-white/6 bg-white/8 text-white"
                : "text-text-muted hover:bg-white/6 hover:text-white"
            }`}
          >
            快速开始
          </Link>
          <NavLink to="/docs" className={navLinkClass}>
            文档
          </NavLink>
          <div className="ml-2 h-6 w-px bg-white/10" />
          <a
            href="https://github.com/vercel-labs/portless"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-[13px] font-medium text-white/80 transition hover:border-white/15 hover:bg-white/10 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.74.5.09.68-.22.68-.48v-1.7c-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05.8-.23 1.65-.34 2.5-.34.85 0 1.7.11 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .26.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
            </svg>
            GitHub
          </a>
          <Link
            to="/docs"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13.5px] font-semibold text-black shadow-[0_1px_2px_rgba(0,0,0,0.2),0_4px_12px_rgba(255,255,255,0.15)] transition hover:bg-zinc-100 active:scale-[0.98]"
          >
            开始使用
          </Link>
        </div>

        <button
          className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 md:hidden cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="菜单"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="animate-scale-in border-t border-white/10 bg-[rgba(9,9,11,0.96)] px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              to="/#features"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3.5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              功能
            </Link>
            <Link
              to="/#install"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3.5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              快速开始
            </Link>
            <NavLink to="/docs" className={mobileLinkClass}>
              文档
            </NavLink>
            <div className="mt-2 flex gap-2">
              <a
                href="https://github.com/vercel-labs/portless"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-center text-sm font-medium text-white"
              >
                GitHub
              </a>
              <Link
                to="/docs"
                onClick={() => setMobileOpen(false)}
                className="flex-1 rounded-xl bg-white py-3 text-center text-sm font-semibold text-black"
              >
                开始使用
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
