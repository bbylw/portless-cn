import { CodeBlock } from "./CodeBlock";
import { advancedSections, requirements } from "../data";
import { IconGlobe, IconGit, IconTag, IconBroadcast, IconUsers, IconPlug, IconSettings, IconStethoscope } from "./icons";

const advIconMap: Record<string, React.ReactNode> = {
  "子域名": <IconGlobe size={18} />,
  "Git Worktrees": <IconGit size={18} />,
  "自定义 TLD": <IconTag size={18} />,
  "LAN 模式": <IconBroadcast size={18} />,
  "Tailscale 共享": <IconUsers size={18} />,
  "ngrok 共享": <IconPlug size={18} />,
  "随系统启动": <IconSettings size={18} />,
  "故障排查": <IconStethoscope size={18} />,
};

export function Advanced() {
  return (
    <section id="advanced" className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.04] via-transparent to-emerald-500/[0.03] pointer-events-none" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-widest uppercase text-zinc-400">
            <span className="size-1.5 rounded-full bg-violet-500"></span> 进阶
          </div>
          <h2 className="mt-4 text-[30px] font-bold tracking-tight sm:text-[38px]">为真实场景而生</h2>
          <p className="mt-3 text-[15px] text-zinc-400">子域名、Worktree、自定义 TLD、LAN、共享到公网，一应俱全。</p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {advancedSections.map((s) => (
            <div key={s.title} className="group relative overflow-hidden rounded-[18px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 text-white">
                    {advIconMap[s.title] ?? <IconGlobe size={18} />}
                  </div>
                  <h3 className="font-semibold text-[15px] text-white">{s.title}</h3>
                  <span className="ml-auto hidden sm:inline-flex rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] text-zinc-400">进阶</span>
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-400">{s.desc}</p>
                <div className="mt-4"><CodeBlock code={s.code} /></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 max-w-5xl overflow-hidden rounded-[18px] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-[1px]">
          <div className="rounded-[17px] bg-[#0e1210] p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-[0_4px_16px_rgba(34,197,94,0.35)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l7 4v5c0 4.5-3 7-7 8-4-1-7-3.5-7-8V7l7-4z" /><path d="M9 12l2 2 4-4" /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[16px] font-semibold text-white">HTTP/2 + HTTPS — 默认开启</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-400">浏览器对 HTTP/1.1 的单主机 6 连接限制，是 Vite / Nuxt 等开发服务器的瓶颈。HTTP/2 单连接多路复用彻底解决。WebSocket 在两种协议下均可工作，HMR 透传无感知。首次运行自动生成本地 CA 并信任。</p>
                <div className="mt-5"><CodeBlock code={`# 使用你自己的证书（例如来自 mkcert）\nportless proxy start --cert ./cert.pem --key ./key.pem\n\n# 禁用 HTTPS（端口 80 上的纯 HTTP）\nportless proxy start --no-tls\n\n# 如果你在首次运行时跳过了信任提示，之后可再信任该 CA\nportless trust`} /></div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-emerald-500 text-black px-3 py-1 text-xs font-semibold">HTTP/2 多路复用</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">WebSocket · RFC 8441</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">自动 CA 信任</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-5xl rounded-[18px] border border-white/10 bg-white/[0.03] p-6 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h3 className="text-[16px] font-semibold text-white">在 Portless 应用之间做代理</h3>
            <span className="rounded-full bg-amber-500/15 border border-amber-500/20 px-2.5 py-1 text-xs font-medium text-amber-300">避免 508 Loop Detected</span>
          </div>
          <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-400">前端开发服务器将 API 代理到另一个 portless 应用时，务必重写 <code className="font-mono text-xs text-emerald-300 bg-emerald-500/10 px-1 py-0.5 rounded">Host</code> 头（<code className="font-mono text-xs text-white bg-white/10 px-1 py-0.5 rounded">changeOrigin: true</code>），否则请求会路由回前端形成循环。</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div><h4 className="mb-2 text-xs font-semibold tracking-widest uppercase text-white/40">Vite — vite.config.ts</h4><CodeBlock code={`server: {\n  proxy: {\n    "/api": {\n      target: "https://api.myapp.localhost",\n      changeOrigin: true,\n      ws: true,\n    },\n  },\n}`} /></div>
            <div><h4 className="mb-2 text-xs font-semibold tracking-widest uppercase text-white/40">webpack-dev-server</h4><CodeBlock code={`devServer: {\n  proxy: [{\n    context: ["/api"],\n    target: "https://api.myapp.localhost",\n    changeOrigin: true,\n  }],\n}`} /></div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <h3 className="text-center text-[22px] font-bold tracking-tight text-white">系统需求</h3>
          <p className="mt-2 text-center text-sm text-zinc-500">一份依赖，覆盖三大平台</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {requirements.map((r) => (
              <div key={r.label} className="group flex items-center justify-between rounded-[14px] border border-white/10 bg-white/[0.03] px-4 py-3.5 hover:bg-white/[0.06] hover:border-white/15 transition">
                <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition">{r.label}</span>
                <span className={`rounded-full px-2.5 py-1 font-mono text-xs font-semibold ${r.value === "可选" ? "bg-white/10 text-zinc-400 border border-white/10" : r.value ? "bg-emerald-500 text-black" : "bg-white text-black"}`}>{r.value || "✓ 支持"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
