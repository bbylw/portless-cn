import { useState } from "react";
import { CodeBlock } from "../CodeBlock";
import { DocSection, DocP, InlineCode, Callout, DocTable } from "./DocPrimitives";
import { commands, options, envVars } from "../../data";
import { copyText } from "../../utils/clipboard";

export function CommandReference() {
  const [query, setQuery] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const normalized = query.trim().toLowerCase();

  const matches = (...fields: string[]) =>
    !normalized || fields.some((field) => field.toLowerCase().includes(normalized));

  const filteredCommands = commands.filter((item) => matches(item.cmd, item.desc));
  const filteredOptions = options.filter((item) => matches(item.flag, item.desc));
  const filteredEnv = envVars.filter((item) => matches(item.name, item.desc));

  const handleCopy = async (cmd: string) => {
    const ok = await copyText(cmd);
    setCopyStatus(ok ? "copied" : "failed");
    window.setTimeout(() => setCopyStatus("idle"), 1800);
  };

  return (
    <div className="space-y-10">
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索命令、选项、环境变量…"
          aria-label="搜索命令、选项、环境变量"
          className="w-full rounded-full border border-white/10 bg-white/4 py-2.5 pl-9 pr-10 text-sm text-white placeholder:text-zinc-500 transition focus:border-white/20 focus:bg-white/6 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-1 text-white/60 hover:text-white"
            aria-label="清除搜索"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <DocSection id="commands" title="命令">
        {filteredCommands.length === 0 ? (
          <DocP>没有匹配的命令。</DocP>
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/2">
            {filteredCommands.map((item, index) => (
              <div
                key={`${item.cmd}-${index}`}
                className="group flex flex-col gap-1.5 border-b border-white/6 px-4 py-3.5 last:border-0 transition hover:bg-white/3 sm:flex-row sm:items-center sm:gap-4"
              >
                <code className="shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-[12.5px] font-medium text-emerald-300">
                  {item.cmd}
                </code>
                <span className="flex-1 text-[13.5px] text-zinc-400">{item.desc}</span>
                <button
                  onClick={() => handleCopy(item.cmd)}
                  className="hidden size-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 opacity-0 transition hover:bg-white/10 hover:text-white focus-visible:opacity-100 sm:inline-flex sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                  aria-label="复制命令"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="sr-only" role="status">
          {copyStatus === "copied" ? "已复制命令" : copyStatus === "failed" ? "复制失败，请手动选择文本" : ""}
        </p>
      </DocSection>

      <DocSection id="alias" title="别名与上游">
        <DocP>
          为不由 portless 管理的服务（例如 Docker 容器）注册静态路由。别名会在过期路由清理中持久保留。
        </DocP>
        <CodeBlock
          code={`portless alias my-postgres 5432                         # -> https://my-postgres.localhost\nportless alias redis 6379                               # -> https://redis.localhost\nportless alias redis 6379 --tld test                    # 仅在 https://redis.test 上\nportless alias api 8080 --upstream https://api.internal # TLS、Host 与 SNI 覆盖\nportless alias --remove my-postgres                     # 移除别名`}
        />
        <DocP>
          默认情况下，别名覆盖所有已配置的 TLD。在别名参数后传入 <InlineCode>--tld</InlineCode>{" "}
          <InlineCode>{"<tld>"}</InlineCode> 可仅覆盖选定的已配置 TLD；重复该标志或传入逗号分隔的列表，所选 TLD
          会替换名称上已有的 TLD 后缀。值缺失、为空或未配置时，命令会在任何路由变更前停止。
        </DocP>
        <DocP>
          位置参数 port 始终拨号回环。<InlineCode>--upstream https</InlineCode> 启用 TLS 并保留传入的 Host 头；
          <InlineCode>https://</InlineCode> authority 启用 TLS 并用完整 authority（含可选端口）覆盖 Host，SNI
          使用不含端口的 DNS 主机名（IP 地址不作为 SNI 发送）；<InlineCode>http://</InlineCode> authority
          在不启用 TLS 的情况下覆盖 Host。此设置不改变面向客户端的代理 TLS。authority 只接受主机名或 IP
          地址及可选端口，不接受凭据、路径、查询、片段或空白。
        </DocP>
        <Callout>
          上游 TLS 仅连接回环上的 HTTP/1.1 后端；portless 会禁用证书校验，因此 TLS
          不会验证后端身份（即使通过 SSH 隧道也是如此）。升级 portless 后请重启代理守护进程。
        </Callout>
        <DocP>
          <InlineCode>portless alias --remove</InlineCode> 只移除并报告 PID 为 0 的路由（包括分离的 Compose
          路由），运行中应用拥有的路由会被保留。<InlineCode>--force</InlineCode>
          会停止冲突的应用（如果存在）并替换路由，因此该应用在其他 TLD 上的路由也可能消失。
        </DocP>
      </DocSection>

      <DocSection id="options" title="选项">
        {filteredOptions.length === 0 ? (
          <DocP>没有匹配的选项。</DocP>
        ) : (
          <DocTable
            columns={["选项", "说明"]}
            rows={filteredOptions.map((item) => [
              <code key={item.flag} className="font-mono text-[12.5px] text-violet-300">{item.flag}</code>,
              item.desc,
            ])}
          />
        )}
      </DocSection>

      <DocSection id="env-vars" title="环境变量">
        {filteredEnv.length === 0 ? (
          <DocP>没有匹配的环境变量。</DocP>
        ) : (
          <div className="space-y-5">
            {["配置", "注入到子进程"].map((group) => {
              const list = filteredEnv.filter((item) => item.group === group);
              if (list.length === 0) return null;
              return (
                <div key={group}>
                  <h3 className="mb-2 text-[11px] font-semibold tracking-widest uppercase text-white/35">{group}</h3>
                  <DocTable
                    columns={["变量", "说明"]}
                    rows={list.map((item) => [
                      <code key={item.name} className="font-mono text-[12.5px] text-emerald-300">{item.name}</code>,
                      item.desc,
                    ])}
                  />
                </div>
              );
            })}
          </div>
        )}
      </DocSection>

      <DocSection id="reserved-names" title="保留名称">
        <Callout tone="violet">
          <InlineCode>run</InlineCode>、<InlineCode>get</InlineCode>、<InlineCode>alias</InlineCode>、<InlineCode>compose</InlineCode>、
          <InlineCode>hosts</InlineCode>、<InlineCode>list</InlineCode>、<InlineCode>doctor</InlineCode>、<InlineCode>trust</InlineCode>、
          <InlineCode>clean</InlineCode>、<InlineCode>prune</InlineCode>、<InlineCode>proxy</InlineCode>、<InlineCode>service</InlineCode> 和{" "}
          <InlineCode>mcp</InlineCode> 是子命令，不能直接用作应用名。使用 <InlineCode>portless run &lt;cmd&gt;</InlineCode> 从你的项目推断名称，或使用{" "}
          <InlineCode>portless --name &lt;name&gt; &lt;cmd&gt;</InlineCode> 强制指定任意名称。
        </Callout>
      </DocSection>

      <DocSection id="bypass" title="绕过代理">
        <DocP>
          需要临时跳过 portless、直接运行命令时，设置 <InlineCode>PORTLESS=0</InlineCode>：
        </DocP>
        <CodeBlock code={`PORTLESS=0 pnpm dev              # 绕过代理，使用默认端口`} />
        <DocP>
          在非交互式环境（无 TTY 或 <InlineCode>CI=1</InlineCode>）中，portless 会以描述性错误退出而不是弹出提示，便于 CI 脚本尽早失败。
        </DocP>
      </DocSection>
    </div>
  );
}
