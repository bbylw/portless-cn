import { Link, useLocation } from "react-router-dom";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export function NotFound() {
  const location = useLocation();
  useDocumentMeta("页面不存在 · portless", "你访问的页面不存在。", location.pathname);

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-24">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40" />
      <div className="absolute -top-20 left-1/2 h-125 w-225 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.12),_transparent_65%)] blur-2xl" />
      <div className="relative mx-auto max-w-2xl px-4 text-center">
        <div className="font-mono text-[64px] font-bold leading-none text-white/10 sm:text-[88px]">404</div>
        <h1 className="mt-4 text-[26px] font-bold tracking-tight text-white sm:text-[32px]">这个页面不存在</h1>
        <p className="mt-3 text-[14px] leading-7 text-zinc-400">
          你访问的地址可能已经移动，或者输入有误。可以返回首页，或直接进入文档中心。
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-black transition hover:bg-zinc-100 sm:w-auto"
          >
            返回首页
          </Link>
          <Link
            to="/docs"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/6 px-6 py-3 text-[14px] font-medium text-white transition hover:border-white/20 hover:bg-white/10 sm:w-auto"
          >
            进入文档
          </Link>
        </div>
      </div>
    </section>
  );
}
