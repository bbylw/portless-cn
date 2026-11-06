import { CodeBlock } from "../../components/CodeBlock";
import { DocSection, DocP, InlineCode, Callout } from "../../components/docs/DocPrimitives";

export function Proxy() {
  return (
    <div className="space-y-10">
      <DocSection id="https-http2" title="HTTP/2 + HTTPS">
        <DocP>
          默认启用 HTTPS（带 HTTP/2）。浏览器将每个主机的 HTTP/1.1 连接数限制为 6 条，这会成为服务大量未打包文件的开发服务器（Vite、Nuxt
          等）的瓶颈。HTTP/2 通过单一连接多路复用所有请求。
        </DocP>
        <DocP>
          WebSocket 在两种协议版本上都可工作，因此开发服务器 HMR（Next.js、Vite 等）可通过代理工作：HTTP/1.1 的{" "}
          <InlineCode>Upgrade</InlineCode> 请求原样转发，而通过 HTTP/2 连接打开的 WebSocket 使用扩展 CONNECT（RFC 8441）。
        </DocP>
        <DocP>首次运行时，portless 会生成一个本地 CA 并将其添加到系统信任存储。无浏览器警告，无需手动设置。</DocP>
        <CodeBlock
          code={`# 使用你自己的证书（例如来自 mkcert）\nportless proxy start --cert ./cert.pem --key ./key.pem\n\n# 禁用 HTTPS（端口 80 上的纯 HTTP）\nportless proxy start --no-tls\n\n# 如果你在首次运行时跳过了信任提示，之后可再信任该 CA\nportless trust`}
        />
        <DocP>
          在 Linux 上，<InlineCode>portless trust</InlineCode> 支持 Debian/Ubuntu、Arch、Fedora/RHEL/CentOS 以及 openSUSE（通过{" "}
          <InlineCode>update-ca-certificates</InlineCode> 或 <InlineCode>update-ca-trust</InlineCode>）。在 Windows 上，它使用{" "}
          <InlineCode>certutil</InlineCode> 将 CA 添加到系统信任存储。在 WSL 上，它会同时更新 Linux 信任存储和 Windows 当前用户的 Root
          存储，以便 Windows 浏览器信任 portless 的 HTTPS 证书。在 WSL2 宿主上运行的 Linux 容器只使用 Linux 信任存储。
        </DocP>
      </DocSection>

      <DocSection id="unprivileged" title="非特权模式">
        <DocP>
          低于 1024 的端口通常需要 root，因此 portless 会通过 <InlineCode>sudo</InlineCode> 提权来绑定 443 或 80。在无法提权的机器上（例如受管控的笔记本电脑、CI
          运行器，或没有终端可输入密码的 Agent 会话），可以使用 <InlineCode>--unprivileged</InlineCode> 启动代理：
        </DocP>
        <CodeBlock code={`portless proxy start --unprivileged\n# -> http://myapp.localhost，无 sudo 提示，不安装任何东西`} />
        <DocP>
          macOS 只允许非 root 进程在通配符地址上绑定低于 1024 的端口，因此代理会改为绑定 <InlineCode>0.0.0.0</InlineCode> 和{" "}
          <InlineCode>::</InlineCode>，然后在 accept 时以及每个请求、每次升级时再次拒绝所有非回环对端连接。结果仍是仅回环（loopback-only）的代理，但无需
          root。Windows 没有特权端口规则，因此该标志在那里只改变绑定地址。
        </DocP>
        <DocP>
          Linux 通过 sysctl 划定边界；portless 会检查它，当端口仍不可达时，会带上确切的命令直接报错退出，而不是回退到其他端口：
        </DocP>
        <CodeBlock code={`sudo sysctl -w net.ipv4.ip_unprivileged_port_start=80   # 每台机器执行一次`} />
        <DocP>
          该模式承诺不出现任何提示，因此默认在端口 80 上以纯 HTTP 提供服务：把生成的 CA 安装进信任存储本身就是一种提示。无论如何，
          <InlineCode>*.localhost</InlineCode> 都是安全上下文，因此 <InlineCode>Secure</InlineCode> Cookie 和 Service Worker 在 HTTP 上也能工作。传入{" "}
          <InlineCode>--https</InlineCode> 可在 443 上保持 HTTPS；此模式会生成 CA 但绝不安装它，因此在你自己运行一次{" "}
          <InlineCode>portless trust</InlineCode> 之前，浏览器会发出警告。
        </DocP>
        <DocP>
          它也绝不写入 hosts 文件，因为这需要 root：此模式下自动 hosts 同步是关闭的，同时设置 <InlineCode>PORTLESS_SYNC_HOSTS=1</InlineCode>{" "}
          会被拒绝。<InlineCode>.localhost</InlineCode> 名称在浏览器中无需 hosts 文件即可解析。对于 Safari 或自定义 TLD，请自己运行一次{" "}
          <InlineCode>portless hosts sync</InlineCode>；使用自定义 TLD 时代理启动时会提示这一点。
        </DocP>
        <DocP>
          该模式会记录在状态目录中，因此自动启动会复用它，<InlineCode>PORTLESS_UNPRIVILEGED=1</InlineCode> 无需标志即可选中它。它绝不请求{" "}
          <InlineCode>sudo</InlineCode>，这也意味着无 TTY 时不退出的规则不适用：代理可以在全新机器上由脚本或 Agent 自动启动。在 LAN
          模式下，该标志只省去 sudo 这一步，因为 LAN 模式本来就需要远程对端。在 <InlineCode>service install</InlineCode> 下服务仍以 root
          运行，因此该标志在那里并不能消除提示，但会保留其他效果：除非传入 <InlineCode>--https</InlineCode>，否则在端口 80 上以纯 HTTP
          提供服务、关闭 hosts 同步、仅接受回环对端。
        </DocP>
        <Callout>
          在开启了应用防火墙的 Mac 上，首次通配符绑定会为 Node 弹出「是否允许传入连接」提示。无需密码，无论你怎么回答，代理仍会拒绝非回环对端。
        </Callout>
      </DocSection>

      <DocSection id="app-proxy" title="应用之间代理">
        <DocP>
          如果你的前端开发服务器（例如 Vite、webpack）将 API 请求代理到另一个 portless 应用，请确保代理重写 <InlineCode>Host</InlineCode>
          头。否则，portless 会把请求路由回前端，形成无限循环。
        </DocP>
        <div className="grid gap-3 lg:grid-cols-2">
          <div>
            <h3 className="mb-2 text-[11px] font-semibold tracking-widest uppercase text-white/35">Vite · vite.config.ts</h3>
            <CodeBlock
              code={`server: {\n  proxy: {\n    "/api": {\n      target: "https://api.myapp.localhost",\n      changeOrigin: true,\n      ws: true,\n    },\n  },\n}`}
            />
          </div>
          <div>
            <h3 className="mb-2 text-[11px] font-semibold tracking-widest uppercase text-white/35">webpack-dev-server</h3>
            <CodeBlock
              code={`devServer: {\n  proxy: [{\n    context: ["/api"],\n    target: "https://api.myapp.localhost",\n    changeOrigin: true,\n  }],\n}`}
            />
          </div>
        </div>
        <DocP>
          portless 会自动在子进程中设置 <InlineCode>NODE_EXTRA_CA_CERTS</InlineCode>，以便 Node.js 信任 portless CA。如果你在 portless
          之外运行一个独立的 Node.js 进程，请手动将其指向 CA：<InlineCode>NODE_EXTRA_CA_CERTS=~/.portless/ca.pem</InlineCode>。或者，使用{" "}
          <InlineCode>--no-tls</InlineCode> 使用纯 HTTP。
        </DocP>
        <DocP>
          portless 会检测到这种错误配置，并返回 <InlineCode>508 Loop Detected</InlineCode> 以及指向此修复方案的提示消息。
        </DocP>
      </DocSection>

      <DocSection id="errors" title="错误响应">
        <DocP>
          当 portless 自身返回错误时（未知主机返回 404、误导向请求返回 421、应用不可达返回 502、请求循环返回 508），浏览器会看到带品牌样式的 HTML
          页面。而 <InlineCode>Accept</InlineCode> 头不包含 <InlineCode>text/html</InlineCode> 的客户端（例如 curl 或{" "}
          <InlineCode>fetch</InlineCode>）会收到简短的 JSON 响应体。
        </DocP>
        <CodeBlock
          code={`{\n  "error": "bad_gateway",\n  "upstream": "myapp.localhost",\n  "message": "..."\n}`}
        />
        <DocP>来自你自己应用的响应会原样转发。portless TLD 之外的主机名（例如被 DNS 屏蔽列表指向 127.0.0.1 的站点）会得到 421 Misdirected Request，而不是应用列表。</DocP>
      </DocSection>
    </div>
  );
}
