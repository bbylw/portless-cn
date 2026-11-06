import { useState, type ReactNode } from "react";
import { copyText } from "../utils/clipboard";

interface CodeBlockProps {
  code: string;
  copyValue?: string;
  label?: string;
  meta?: ReactNode;
  className?: string;
}

const TOKEN_RE =
  /("[^"]*"|'[^']*'|https?:\/\/[^\s"'`]+|--[\w-]+(?:=[^\s]+)?|-[a-zA-Z]\b|\b(?:portless|npm|pnpm|yarn|bun|bunx|npx|next|vite|astro|docker|compose|export|sudo|curl)\b|\b\d+\b)/g;

function highlightCodeSegment(segment: string, baseClass: string, isJsonLine: boolean): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(segment)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={`t-${lastIndex}`} className={baseClass}>
          {segment.slice(lastIndex, match.index)}
        </span>,
      );
    }

    const tok = match[0];
    const afterTok = segment.slice(match.index + tok.length);
    let cls = baseClass;

    if ((tok.startsWith('"') && tok.endsWith('"')) || (tok.startsWith("'") && tok.endsWith("'"))) {
      // Distinguish JSON property keys ("dev":) from string values
      cls = isJsonLine && /^\s*:/.test(afterTok) ? "text-zinc-200 font-medium" : "token-string";
    } else if (tok.startsWith("http://") || tok.startsWith("https://")) {
      cls = "token-url";
    } else if (tok.startsWith("-")) {
      cls = "token-flag";
    } else if (/^\d+$/.test(tok)) {
      cls = "token-number";
    } else {
      cls = "token-keyword";
    }

    parts.push(
      <span key={`m-${match.index}`} className={cls}>
        {tok}
      </span>,
    );
    lastIndex = match.index + tok.length;
  }

  if (lastIndex < segment.length) {
    parts.push(
      <span key={`e-${lastIndex}`} className={baseClass}>
        {segment.slice(lastIndex)}
      </span>,
    );
  }

  return parts;
}

function highlightComment(comment: string): ReactNode {
  const urlMatch = comment.match(/(https?:\/\/[^\s]+)/);
  if (!urlMatch || urlMatch.index === undefined) {
    return <span className="token-comment">{comment}</span>;
  }
  const before = comment.slice(0, urlMatch.index);
  const url = urlMatch[0];
  const after = comment.slice(urlMatch.index + url.length);
  return (
    <span className="token-comment">
      {before}
      <span className="token-url">{url}</span>
      {after}
    </span>
  );
}

function highlight(code: string): ReactNode[] {
  const lines = code.split("\n");
  const hasDiff = lines.some((l) => l.startsWith("+ ") || l.startsWith("- "));

  return lines.map((line, i) => {
    const trimmed = line.trimStart();
    const isAdd = line.startsWith("+ ");
    const isDel = line.startsWith("- ");

    if (trimmed.startsWith("#") || trimmed.startsWith("//")) {
      return (
        <span key={i} className="block">
          {highlightComment(line)}
        </span>
      );
    }

    // Separate inline trailing comment (# ... or // ... preceded by whitespace)
    const commentMatch = line.match(/(\s+(?:#|\/\/).*)$/);
    const codePart = commentMatch ? line.slice(0, commentMatch.index) : line;
    const commentPart = commentMatch ? commentMatch[1] : "";
    const isJsonLine = codePart.includes('":');

    if (isAdd || isDel) {
      const prefix = line.slice(0, 2);
      const restCode = codePart.slice(2);
      return (
        <span
          key={i}
          className={`block rounded-md border-l-2 px-2.5 py-0.5 ${
            isAdd
              ? "border-emerald-400/80 bg-emerald-500/[0.08]"
              : "border-rose-400/70 bg-rose-500/[0.06]"
          }`}
        >
          <span className={isAdd ? "token-add font-semibold select-none" : "token-del font-semibold select-none"}>
            {prefix}
          </span>
          {isDel ? (
            <span className="text-rose-200/75">{restCode}</span>
          ) : (
            highlightCodeSegment(restCode, "token-add", isJsonLine)
          )}
          {commentPart && (
            <span className={isDel ? "text-rose-300/45 line-through decoration-rose-400/35" : "token-comment"}>
              {isAdd ? highlightComment(commentPart) : commentPart}
            </span>
          )}
        </span>
      );
    }

    return (
      <span key={i} className={hasDiff ? "block py-0.5" : "block"}>
        {highlightCodeSegment(codePart, "token-shell", isJsonLine)}
        {commentPart && highlightComment(commentPart)}
      </span>
    );
  });
}

export function CodeBlock({ code, copyValue, label, meta, className = "" }: CodeBlockProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const handleCopy = async () => {
    const ok = await copyText(copyValue ?? code);
    setStatus(ok ? "copied" : "failed");
    window.setTimeout(() => setStatus("idle"), 1800);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-[14px] border border-white/[0.08] bg-[var(--color-code-bg)] shadow-[0_1px_3px_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.35)] ${className}`}
    >
      {label && (
        <div className="flex h-10 items-center justify-between border-b border-white/[0.06] bg-white/[0.025] px-4">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f56]/90 border border-black/15"></span>
              <span className="size-2.5 rounded-full bg-[#ffbd2e]/90 border border-black/15"></span>
              <span className="size-2.5 rounded-full bg-[#27c93f]/90 border border-black/15"></span>
            </div>
            <span className="ml-1 font-mono text-[11.5px] font-medium tracking-wide text-zinc-300">{label}</span>
          </div>
          {meta ?? <span className="hidden font-mono text-[11px] text-white/25 sm:inline">portless</span>}
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute right-2.5 top-2.5 z-10 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-900/95 px-2.5 py-1 text-[11px] font-medium text-zinc-400 opacity-100 backdrop-blur transition duration-200 hover:border-white/20 hover:bg-zinc-800 hover:text-white active:scale-[0.98] focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 cursor-pointer"
          aria-label="复制代码"
        >
          {status === "copied" ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-emerald-400">已复制</span>
            </>
          ) : status === "failed" ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-rose-400">复制失败</span>
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v3" />
              </svg>
              复制
            </>
          )}
        </button>
        <pre
          className={`overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.7] sm:text-[13px] ${
            code.includes("\n") && code.split("\n")[0].length < 28 ? "pr-4" : "pr-16"
          }`}
        >
          <code>{highlight(code)}</code>
        </pre>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
}
