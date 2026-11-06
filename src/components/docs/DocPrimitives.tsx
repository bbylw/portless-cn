import type { ReactNode } from "react";

export function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-white/[0.06] pt-10 first:border-0 first:pt-0">
      <h2 className="text-[21px] font-semibold tracking-tight text-white">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function DocP({ children }: { children: ReactNode }) {
  return <p className="text-[14px] leading-7 text-zinc-400">{children}</p>;
}

export function DocList({ children }: { children: ReactNode }) {
  return <ul className="space-y-2 pl-5 text-[14px] leading-7 text-zinc-400 list-disc marker:text-emerald-500/60">{children}</ul>;
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className="rounded-md border border-white/[0.06] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[12.5px] text-emerald-300">{children}</code>;
}

export function Callout({ children, tone = "amber" }: { children: ReactNode; tone?: "amber" | "emerald" | "violet" }) {
  const tones = {
    amber: "border-amber-500/20 bg-amber-500/[0.08] text-amber-200/80",
    emerald: "border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-200/80",
    violet: "border-violet-500/20 bg-violet-500/[0.08] text-violet-200/80",
  };
  return <div className={`rounded-xl border px-4 py-3 text-[13.5px] leading-6 ${tones[tone]}`}>{children}</div>;
}

export function DocTable({ columns, rows }: { columns: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-white/[0.06] bg-white/[0.03]">
            {columns.map((column) => (
              <th key={column} className="px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-white/35">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03] transition">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 align-top text-[13.5px] leading-6 text-zinc-400">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
