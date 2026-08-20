import { useState, type ReactNode } from "react";

interface CodeBlockProps {
  code: string;
  label?: string;
  className?: string;
}

function highlight(code: string): ReactNode[] {
  const lines = code.split("\n");
  return lines.map((line, i) => {
    const trimmed = line.trimStart();
    let base: string = "token-shell";
    if (trimmed.startsWith("#")) base = "token-comment";
    else if (line.startsWith("+")) base = "token-add";
    else if (line.startsWith("-")) base = "token-del";
    else if (trimmed.startsWith("->") ) base = "token-output";

    const tokens = line.split(/(\s+)/);
    const parts: ReactNode[] = tokens.map((tok, j) => {
      if (!tok.trim()) return <span key={j}>{tok}</span>;
      if (tok.startsWith("#") || tok.startsWith("//")) return <span key={j} className="token-comment">{tok}</span>;
      if (tok.startsWith("--") || tok === "-p") return <span key={j} className="token-flag">{tok}</span>;
      if (/^(https?:|portless|npm|pnpm|yarn|bun|bunx|next|vite|astro|node|export)$/.test(tok.replace(/[:\/]/g,"")) ) {
        // keep broad keyword match but avoid over-coloring
        if (["portless","npm","pnpm","yarn","bun","next","vite"].includes(tok)) return <span key={j} className="token-keyword">{tok}</span>;
      }
      if (/^["'`].*["'`]$/.test(tok)) return <span key={j} className="token-string">{tok}</span>;
      if (/^\d+$/.test(tok)) return <span key={j} className="token-number">{tok}</span>;
      if (tok.includes("localhost") || tok.includes(".test") || tok.includes("https://")) return <span key={j} className="token-url">{tok}</span>;
      return <span key={j} className={base}>{tok}</span>;
    });

    return (
      <span key={i}>
        {parts}
        {i < lines.length - 1 && "\n"}
      </span>
    );
  });
}

export function CodeBlock({ code, label, className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {/* ignore */}
  };

  return (
    <div className={`group relative overflow-hidden rounded-[14px] border border-white/[0.08] bg-[var(--color-code-bg)] shadow-[0_1px_3px_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.35)] ${className}`}>
      {label && (
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <span className="size-3 rounded-full bg-[#ff5f56] shadow-[0_1px_2px_rgba(0,0,0,0.3)] border border-black/10"></span>
              <span className="size-3 rounded-full bg-[#ffbd2e] shadow-[0_1px_2px_rgba(0,0,0,0.3)] border border-black/10"></span>
              <span className="size-3 rounded-full bg-[#27c93f] shadow-[0_1px_2px_rgba(0,0,0,0.3)] border border-black/10"></span>
            </div>
            <span className="ml-1 text-[11px] font-medium tracking-widest uppercase text-white/40 font-mono">{label}</span>
          </div>
          <span className="hidden sm:inline text-[11px] font-mono text-white/25">portless</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute right-2.5 top-2.5 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-400 opacity-0 group-hover:opacity-100 hover:text-white hover:border-white/20 hover:bg-zinc-800 transition cursor-pointer"
          aria-label="复制代码"
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
              已复制
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v3" /></svg>
              复制
            </>
          )}
        </button>
        <pre className="overflow-x-auto p-4 pr-20 text-[13px] leading-[1.7] font-mono">
          <code>{highlight(code)}</code>
        </pre>
        {/* subtle top highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
}
