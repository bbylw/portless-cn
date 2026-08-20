import { useEffect, useState } from "react";

const links = [
  { href: "#features", label: "功能" },
  { href: "#install", label: "安装" },
  { href: "#commands", label: "命令" },
  { href: "#config", label: "配置" },
  { href: "#advanced", label: "进阶" },
];

function LogoSvg() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="36" height="36" rx="10" fill="url(#navG)"/>
      <rect width="36" height="36" rx="10" fill="url(#navH)" />
      <path d="M11 24V11.2h5.6c1.7 0 3.05.46 4.04 1.38.99.92 1.48 2.17 1.48 3.75 0 1.58-.49 2.83-1.48 3.75-.99.92-2.34 1.38-4.04 1.38H13V24H11zm2.9-5.54h2.2c.82 0 1.44-.2 1.88-.6.44-.4.66-.97.66-1.71 0-.74-.22-1.31-.66-1.71-.44-.4-1.06-.6-1.88-.6H13.9v4.62z" fill="white"/>
      <defs>
        <linearGradient id="navG" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22c55e"/><stop offset="1" stopColor="#16a34a"/>
        </linearGradient>
        <linearGradient id="navH" x1="0" y1="0" x2="36" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.18"/><stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }); },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/[0.07] bg-[rgba(9,9,11,0.75)] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(9,9,11,0.6)] shadow-[0_1px_0_0_rgba(255,255,255,0.03),0_8px_32px_rgba(0,0,0,0.4)]" : "border-b border-transparent bg-transparent"}`}>
      <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3 group">
          <div className="shadow-[0_2px_10px_rgba(34,197,94,0.35)] group-hover:shadow-[0_4px_16px_rgba(34,197,94,0.45)] transition-shadow rounded-[10px] overflow-hidden">
            <LogoSvg />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-semibold text-[17px] tracking-tight">portless</span>
            <span className="text-[10px] tracking-widest font-medium text-[var(--color-text-faint)] uppercase">Localhost · Named</span>
          </div>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition ${active === l.href ? "text-white bg-white/[0.08] border border-white/[0.06]" : "text-[var(--color-text-muted)] hover:text-white hover:bg-white/[0.06]"}`}>{l.label}</a>
          ))}
          <div className="ml-2 h-6 w-px bg-white/10" />
          <a href="https://github.com/vercel-labs/portless" target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/10 hover:border-white/15 transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.74.5.09.68-.22.68-.48v-1.7c-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05.8-.23 1.65-.34 2.5-.34.85 0 1.7.11 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .26.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" /></svg>
            GitHub
          </a>
          <a href="#install" className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-2 text-[13.5px] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.2),0_4px_12px_rgba(255,255,255,0.15)] hover:bg-zinc-100 transition">
            开始使用
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </a>
        </div>

        <button className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 md:hidden hover:bg-white/10 transition" onClick={() => setMobileOpen(!mobileOpen)} aria-label="菜单">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{mobileOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}</svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[rgba(9,9,11,0.96)] backdrop-blur-xl px-4 py-4 md:hidden animate-scale-in">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className={`rounded-xl px-3.5 py-3 text-sm font-medium transition ${active === l.href ? "bg-white text-black" : "text-zinc-300 hover:bg-white/10 hover:text-white"}`}>{l.label}</a>
            ))}
            <div className="mt-2 flex gap-2">
              <a href="https://github.com/vercel-labs/portless" target="_blank" rel="noopener noreferrer" className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-center text-sm font-medium text-white">GitHub</a>
              <a href="#install" onClick={() => setMobileOpen(false)} className="flex-1 rounded-xl bg-white py-3 text-center text-sm font-semibold text-black">开始使用</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
