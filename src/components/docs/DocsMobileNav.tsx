import { useEffect } from "react";
import { DocsSidebar } from "./DocsSidebar";

export function DocsMobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="文档目录">
      <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-label="关闭目录" />
      <div className="relative h-full w-[280px] overflow-y-auto border-r border-white/10 bg-[#0b0b0d] px-4 py-5 shadow-[0_0_60px_rgba(0,0,0,0.6)] animate-slide-in">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-[13px] font-semibold text-white">文档目录</span>
          <button onClick={onClose} className="rounded-full border border-white/10 bg-white/5 p-1.5 text-white/70 hover:text-white" aria-label="关闭">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <DocsSidebar />
      </div>
    </div>
  );
}
