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
  "Tailscale / ngrok / Cloudflare 共享": <IconShare size={20} />,
};

const badgeMap: Record<string, string> = {
  "稳定的具名 URL": "*.localhost",
  "默认 HTTPS + HTTP/2": "TLS · H2",
  "零配置启动": "portless",
  "子域名组织": "api.myapp",
  "Git Worktree 感知": "branch.myapp",
  "LAN 模式": "--lan · mDNS",
  "框架自动适配": "--port --host",
  "Tailscale / ngrok / Cloudflare 共享": "--tailscale",
};

export function Features() {
  return (
    <section id="features" className="relative py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.012] to-transparent" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-widest uppercase text-zinc-400">
            <span className="size-1.5 rounded-full bg-violet-500"></span> 核心能力
          </div>
          <h2 className="mt-4 text-[30px] font-bold tracking-tight text-balance sm:text-[38px]">
            为什么选择 <span className="gradient-text">portless</span>？
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-400 text-pretty sm:text-[16px]">
            从零配置启动到 Git Worktree 感知，portless 让本地开发的 URL 管理变得简单而强大。
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const isEmerald = (Math.floor(i / 4) + (i % 4)) % 2 === 0;
            return (
              <div
                key={f.title}
                className="group card-hover relative overflow-hidden rounded-[18px] border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-[1px]"
              >
                <div className="relative flex h-full flex-col rounded-[17px] bg-[#121214] p-5 transition duration-300 group-hover:bg-[#151518] sm:p-6">
                  <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500/10 to-violet-500/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div
                      className={`flex size-10 items-center justify-center rounded-xl border ${
                        isEmerald
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                          : "border-violet-500/20 bg-violet-500/10 text-violet-400"
                      }`}
                    >
                      {iconMap[f.title]}
                    </div>
                    {badgeMap[f.title] && (
                      <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 font-mono text-[10.5px] text-zinc-500 transition group-hover:border-white/10 group-hover:text-zinc-300">
                        {badgeMap[f.title]}
                      </span>
                    )}
                  </div>
                  <h3 className="text-[15px] font-semibold tracking-tight text-white">{f.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-400 text-pretty">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {[
            { k: "4000–4999", v: "自动分配空闲端口", sub: "注入 PORT 与 HOST 环境变量" },
            { k: "443 / 80", v: "HTTPS · HTTP/2", sub: "自动生成并信任本地根 CA" },
            { k: "9+ 框架", v: "服务端参数自动注入", sub: "Next.js · Vite · Astro · Expo · Wrangler" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 text-center transition hover:border-white/[0.12] hover:bg-white/[0.03]"
            >
              <div className="font-mono text-base font-bold tracking-tight text-white tabular-nums sm:text-lg">
                {s.k}
              </div>
              <div className="mt-1 text-[12px] font-medium text-zinc-300">{s.v}</div>
              <div className="mt-0.5 text-[11px] text-zinc-500">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
