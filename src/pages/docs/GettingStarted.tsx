import { CodeBlock } from "../../components/CodeBlock";
import { ArchitectureDiagram } from "../../components/ArchitectureDiagram";
import { DocSection, DocP, DocList, InlineCode, Callout, DocTable } from "../../components/docs/DocPrimitives";
import { installCommands, requirements } from "../../data";

export function GettingStarted() {
  return (
    <div className="space-y-10">
      <DocSection id="install" title="安装">
        <DocP>全局安装可获得一致体验，也可以按项目安装并在团队内锁定版本。</DocP>
        <div className="grid gap-3 sm:grid-cols-2">
          {installCommands.map((item, index) => (
            <div key={item.cmd} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[13px] font-medium text-white">{item.label}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${index === 0 ? "bg-emerald-500 text-black" : "bg-white/10 text-zinc-400"}`}>
                  {index === 0 ? "推荐" : "可选"}
                </span>
              </div>
              <div className="mt-3">
                <CodeBlock code={item.cmd} />
              </div>
            </div>
          ))}
        </div>
        <Callout>
          portless 仍处于 1.0 之前版本。按项目安装时，不同贡献者可能运行不同版本；状态目录格式可能在版本之间变化，遇到异常可重新运行 <InlineCode>portless trust</InlineCode>。
        </Callout>
      </DocSection>

      <DocSection id="run-your-app" title="运行你的应用">
        <CodeBlock code={`portless myapp next dev\n# -> https://myapp.localhost`} />
        <DocP>
          默认启用 HTTPS（带 HTTP/2）。首次运行时，portless 会生成一个本地 CA、信任它，并绑定 443 端口（在 macOS/Linux
          上通过 sudo 自动提权）。使用 <InlineCode>--no-tls</InlineCode> 则使用纯 HTTP。
        </DocP>
        <DocP>
          代理在你运行应用时自动启动，并通过 <InlineCode>PORT</InlineCode> 环境变量分配一个随机端口（4000–4999）。大多数框架（Next.js、Express、Nuxt
          等）会自动读取该变量。
        </DocP>
        <DocP>
          如果被包装的命令会自我守护（进程退出，但它启动的服务器仍在已分配的端口上监听），portless 会让路由继续指向该服务器并打印其 PID。服务器停止时，路由随之移除。
        </DocP>
        <DocP>
          自动启动时，portless 会复用最近一次代理运行时的配置（端口、TLS、TLD），因此重启或重启机器后不会静默回退到默认值。显式环境变量（
          <InlineCode>PORTLESS_PORT</InlineCode>、<InlineCode>PORTLESS_HTTPS</InlineCode> 等）始终优先。
        </DocP>
        <DocP>
          portless 将按用户状态存储在 <InlineCode>~/.portless</InlineCode>。当代理以 sudo 运行时，它会从调用用户的 home
          目录解析此路径，使代理与非特权应用进程共享同一套路由注册。
        </DocP>
        <Callout tone="violet">
          在非交互式环境（无 TTY，或 <InlineCode>CI=1</InlineCode>）中，portless 会以描述性错误退出而不是弹出提示，因此 turborepo 和 CI
          脚本等任务运行器会以清晰的信息尽早失败。
        </Callout>
      </DocSection>

      <DocSection id="framework-flags" title="框架参数注入">
        <DocP>
          对于忽略 <InlineCode>PORT</InlineCode> 的框架（Vite、VitePlus、VitePress、Astro、React Router、Angular、Expo、React Native、
          Wrangler），portless 会自动注入正确的 <InlineCode>--port</InlineCode> 参数，并在需要时同时注入匹配的 <InlineCode>--host</InlineCode> 参数（
          Wrangler 为 <InlineCode>--ip</InlineCode>）。
        </DocP>
        <DocList>
          <li>
            注入会穿透到以框架或已知运行器开头的 package 脚本（<InlineCode>"dev": "vite"</InlineCode>、<InlineCode>"dev": "bunx vite"</InlineCode>）。
          </li>
          <li>
            只有框架的服务端命令会获得这些参数（<InlineCode>dev</InlineCode>、<InlineCode>serve</InlineCode>、<InlineCode>preview</InlineCode>、
            <InlineCode>start</InlineCode>、裸 <InlineCode>vite</InlineCode> 或 <InlineCode>vite [root]</InlineCode>）。
          </li>
          <li>
            不提供服务的命令（如 <InlineCode>vite build</InlineCode>、<InlineCode>vite optimize</InlineCode>、<InlineCode>vp test</InlineCode> 或{" "}
            <InlineCode>astro check</InlineCode>）会拒绝这些参数并原样保留。
          </li>
          <li>
            Expo 的连接模式（<InlineCode>--localhost</InlineCode>、<InlineCode>--lan</InlineCode>、<InlineCode>--tunnel</InlineCode>）会被保留，同时仍然注入所分配的端口。
          </li>
        </DocList>
        <DocP>
          当附加参数对其无效时，portless 会保留脚本原样：复合命令（<InlineCode>&&</InlineCode>、<InlineCode>|</InlineCode>、{" "}
          <InlineCode>;</InlineCode>）、尾部 <InlineCode>#</InlineCode> 注释、其自身的 <InlineCode>--</InlineCode> 选项终止符、环境前缀（
          <InlineCode>NODE_ENV=production vite</InlineCode>）、委派给另一个脚本（<InlineCode>"dev": "npm run dev:vite"</InlineCode>），或脚本名之前带有运行器参数（
          <InlineCode>bun run --bun dev</InlineCode>）。
        </DocP>
        <Callout>
          这些情况会保留它们自己的端口，因此需要你在脚本中自行设置。portless 无法归类的脚本也会原样保留，例如在它未跟踪参数语法的 CLI 上、子命令之前的某个参数（
          <InlineCode>vp --mode dev build</InlineCode>）。
        </Callout>
      </DocSection>

      <DocSection id="how-it-works" title="工作原理">
        <DocP>一个 HTTPS 代理监听固定端口，应用运行在随机分配的本机端口上，代理按主机名把请求转发到对应应用。</DocP>
        <ArchitectureDiagram />
        <DocList>
          <li>
            <strong className="font-medium text-zinc-200">启动代理</strong>：在你运行应用时自动启动，或用 <InlineCode>portless proxy start</InlineCode> 显式启动。
          </li>
          <li>
            <strong className="font-medium text-zinc-200">运行应用</strong>：
            <InlineCode>portless &lt;name&gt; &lt;command&gt;</InlineCode> 分配一个空闲端口并向代理注册。
          </li>
          <li>
            <strong className="font-medium text-zinc-200">通过 URL 访问</strong>：<InlineCode>https://&lt;name&gt;.localhost</InlineCode> 经由代理路由到你的应用。
          </li>
        </DocList>
        <DocP>
          在 LAN 模式之外，代理及其 HTTP 重定向监听器仅绑定到 IPv4 和 IPv6 回环地址 <InlineCode>127.0.0.1</InlineCode> 和{" "}
          <InlineCode>::1</InlineCode>。它们不接受通过 LAN、VPN 或其他网络接口的连入。
        </DocP>
      </DocSection>

      <DocSection id="requirements" title="系统需求">
        <DocTable
          columns={["依赖", "要求"]}
          rows={requirements.map((item) => [
            <span key={item.label} className="font-medium text-zinc-200">{item.label}</span>,
            item.value || "支持",
          ])}
        />
      </DocSection>
    </div>
  );
}
