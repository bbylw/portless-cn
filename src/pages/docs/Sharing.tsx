import { CodeBlock } from "../../components/CodeBlock";
import { DocSection, DocP, DocList, InlineCode, Callout, ExtLink } from "../../components/docs/DocPrimitives";

export function Sharing() {
  return (
    <div className="space-y-10">
      <DocSection id="lan" title="LAN 模式">
        <CodeBlock
          code={`portless proxy start --lan\nportless proxy start --lan --https\nportless proxy start --lan --ip 192.168.1.42`}
        />
        <DocP>
          <InlineCode>--lan</InlineCode> 显式将代理绑定到 IPv4 和 IPv6 未指定地址 <InlineCode>0.0.0.0</InlineCode> 和{" "}
          <InlineCode>::</InlineCode>，并切换到 mDNS 发现。这使得服务以 <InlineCode>&lt;name&gt;.local</InlineCode> 的形式供同一网络中的设备访问。
          portless 会自动检测你的 LAN IP 并自动跟随 Wi-Fi/IP 变化，但你可以用 <InlineCode>--ip &lt;address&gt;</InlineCode> 或导出{" "}
          <InlineCode>PORTLESS_LAN_IP</InlineCode> 固定另一个地址。在你的 shell 中设置 <InlineCode>PORTLESS_LAN=1</InlineCode>（0/1
          布尔值），可使代理每次启动时默认进入 LAN 模式。
        </DocP>
        <DocP>
          portless 通过 <InlineCode>proxy.lan</InlineCode> 记住 LAN 模式，因此如果你停止一个 LAN 代理并再次启动，它会保持 LAN
          模式。所有代理设置（端口、TLS、TLD、LAN）都会被持久化，并在自动启动时复用，除非被显式标志或环境变量覆盖。用{" "}
          <InlineCode>PORTLESS_LAN=0</InlineCode> 可在单次启动中切回 <InlineCode>.localhost</InlineCode> 模式。如果代理已在运行且显式
          LAN/TLS/TLD 设置不同，portless 会发出警告并要求你先停止它。
        </DocP>
        <DocP>
          LAN 模式依赖于 portless 已经派生的系统 mDNS 工具：macOS 自带 <InlineCode>dns-sd</InlineCode>，而 Linux 使用来自{" "}
          <InlineCode>avahi-utils</InlineCode> 的 <InlineCode>avahi-publish-address</InlineCode>（通过{" "}
          <InlineCode>sudo apt install avahi-utils</InlineCode> 或你发行版的等效命令安装）。如果命令缺失或你的网络不可达，
          <InlineCode>portless proxy start --lan</InlineCode> 会打印相关错误并退出。
        </DocP>
        <h3 className="pt-2 text-[16px] font-semibold text-white">框架注意事项</h3>
        <DocList>
          <li>
            <strong className="font-medium text-zinc-200">Next.js</strong>：将你的 <InlineCode>.local</InlineCode> 主机名添加到{" "}
            <InlineCode>allowedDevOrigins</InlineCode>。
          </li>
          <li>
            <strong className="font-medium text-zinc-200">Expo / React Native</strong>：portless 始终注入 <InlineCode>--port</InlineCode>。React
            Native 还会获得 <InlineCode>--host 127.0.0.1</InlineCode>。在 LAN 模式之外，Expo 会获得{" "}
            <InlineCode>--host localhost</InlineCode>；但在 LAN 模式下，portless 会让 Metro 保持默认的 LAN 主机行为，而不是强制{" "}
            <InlineCode>--host</InlineCode> 或 <InlineCode>HOST</InlineCode>。
          </li>
        </DocList>
        <CodeBlock
          label="next.config.js"
          code={`module.exports = {\n  allowedDevOrigins: ["myapp.local", "*.myapp.local"],\n}`}
        />
      </DocSection>

      <DocSection id="tailscale" title="Tailscale">
        <DocP>与 <ExtLink href="https://tailscale.com">Tailscale</ExtLink> 网络上的队友共享你的开发服务器：</DocP>
        <CodeBlock
          code={`portless myapp --tailscale next dev\n# -> https://myapp.localhost           (本地)\n# -> https://devbox.yourteam.ts.net    (tailnet)`}
        />
        <DocP>
          每个 <InlineCode>--tailscale</InlineCode> 应用以根挂载方式运行在各自的 Tailscale HTTPS 端口上，因此无需框架的{" "}
          <InlineCode>basePath</InlineCode> 配置。第一个应用获得端口 443，后续应用获得 8443、8444 等。
        </DocP>
        <CodeBlock
          code={`portless myapp --tailscale next dev     # -> https://devbox.ts.net\nportless api --tailscale pnpm start     # -> https://devbox.ts.net:8443`}
        />
        <DocP>
          使用 <InlineCode>--funnel</InlineCode> 通过{" "}
          <ExtLink href="https://tailscale.com/kb/1223/funnel/">Tailscale Funnel</ExtLink> 将开发服务器暴露到公共互联网：
        </DocP>
        <CodeBlock code={`portless myapp --funnel next dev\n# -> https://devbox.yourteam.ts.net    (公共)`} />
        <Callout>
          在 <InlineCode>--tailscale</InlineCode> 或 <InlineCode>--funnel</InlineCode> 能够注册 HTTPS URL 之前，必须先启用 Tailscale
          HTTPS 证书。在 <InlineCode>--funnel</InlineCode> 注册公共 URL 之前，还必须已为 tailnet 和节点启用 Funnel。如果任一设置缺失，portless
          会在启动子进程之前退出。
        </Callout>
        <DocP>
          在你的 shell 配置文件或 <InlineCode>.env</InlineCode> 中设置 <InlineCode>PORTLESS_TAILSCALE=1</InlineCode>
          ，即可默认共享每个应用。<InlineCode>portless list</InlineCode> 会同时显示本地和 tailnet URL。Tailscale serve
          注册会在应用退出时自动清理。
        </DocP>
        <DocP>
          需要安装并连接 Tailscale CLI（<InlineCode>tailscale up</InlineCode>），且已启用 Tailscale HTTPS 证书。
        </DocP>
      </DocSection>

      <DocSection id="ngrok" title="ngrok">
        <DocP>通过 <ExtLink href="https://ngrok.com">ngrok</ExtLink> 将开发服务器暴露到公共互联网：</DocP>
        <CodeBlock
          code={`portless myapp --ngrok next dev\n# -> https://myapp.localhost           (本地)\n# -> https://abc123.ngrok.app          (公共)`}
        />
        <DocP>
          在你的 shell 配置文件或 <InlineCode>.env</InlineCode> 中设置 <InlineCode>PORTLESS_NGROK=1</InlineCode>
          ，即可在 portless 运行应用时默认启用 ngrok。<InlineCode>portless list</InlineCode> 会同时显示本地和 ngrok
          URL。ngrok 隧道会在应用退出时自动清理。
        </DocP>
        <DocP>
          需要安装并已认证的 ngrok CLI。如果 ngrok 报告认证错误，运行 <InlineCode>ngrok config add-authtoken &lt;token&gt;</InlineCode>{" "}
          后重试。
        </DocP>
      </DocSection>

      <DocSection id="cloudflare" title="Cloudflare">
        <DocP>通过 Cloudflare Quick Tunnel 将开发服务器暴露到公共互联网，无需 Cloudflare 账号：</DocP>
        <CodeBlock
          code={`portless myapp --cloudflare next dev\n# -> https://<random>.trycloudflare.com  (公共)`}
        />
        <DocP>
          设置 <InlineCode>PORTLESS_CLOUDFLARE=1</InlineCode> 可默认启用。<InlineCode>portless list</InlineCode> 会显示 Cloudflare
          URL，应用会通过 <InlineCode>PORTLESS_CLOUDFLARE_URL</InlineCode> 获得该地址。可与 <InlineCode>--ngrok</InlineCode>、
          <InlineCode>--tailscale</InlineCode> 或 <InlineCode>--funnel</InlineCode> 组合使用。隧道会在应用退出时停止。
        </DocP>
        <Callout>
          Quick Tunnel 不支持 Server-Sent Events，最多允许 200 个在途请求，且每次运行都会获得新的 URL。需要 PATH 中存在{" "}
          <ExtLink href="https://developers.cloudflare.com/tunnel/downloads/">cloudflared</ExtLink> CLI。
        </Callout>
      </DocSection>
    </div>
  );
}
