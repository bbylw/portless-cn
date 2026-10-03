import { features } from "../data";
import { IconLink, IconShield, IconZap, IconGlobe, IconGit, IconBroadcast, IconLayers, IconShare } from "./icons";

const iconMap: Record<string, React.ReactNode> = {
  "稳定的具名 URL": <IconLink size={20} />,
  "默认 HTTPS + HTTP/2": <IconShield size={20} />,
  "零配置启动": <IconZap size={20} />,
  "子域名组织": <IconGlobe size={20} />,
  "Git Worktree 感知": <IconGit size={20} />,
  "LAN 模式": <IconBroadcast size={20} />,
  "框架自动适配": <IconLayers size={20} />,
  "Tailscale / ngrok 共享": <IconShare size={20} />,
};

export function Features() {
  return (
    <section id="features" className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-widest uppercase text-zinc-400">
            <span className="size-1.5 rounded-full bg-violet-500"></span> 核心能力
          </div>
          <h2 className="mt-4 text-[30px] font-bold tracking-tight text-balance sm:text-[38px]">
            为什么选择 <span className="gradient-text">portless</span>？
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-400 sm:text-[16px]">
            从零配置启动到 Git Worktree 感知，portless 让本地开发的 URL 管理变得简单而强大。
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-[18px] border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-[1px]"
            >
              <div className="relative h-full rounded-[17px] bg-[#121214] p-5 sm:p-6 transition group-hover:bg-[#161619]">
                <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500/10 to-violet-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className={`mb-4 flex size-10 items-center justify-center rounded-xl border ${i % 2 === 0 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-violet-500/10 border-violet-500/20 text-violet-400"}`}>
                  {iconMap[f.title]}
                </div>
                <h3 className="text-[15px] font-semibold tracking-tight text-white">{f.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-400">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { k: "4000-4999", v: "自动分配端口" },
            { k: "443 / 80", v: "HTTPS · HTTP/2" },
            { k: "8+", v: "框架自动适配" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-4 text-center">
              <div className="font-mono text-sm font-semibold text-white sm:text-base">{s.k}</div>
              <div className="mt-1 text-[11px] tracking-widest uppercase text-zinc-500">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
