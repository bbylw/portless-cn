import { CodeBlock } from "../../components/CodeBlock";
import { DocSection, DocP, InlineCode, Callout } from "../../components/docs/DocPrimitives";

export function Routing() {
  return (
    <div className="space-y-10">
      <DocSection id="subdomains" title="子域名">
        <DocP>用子域名组织服务：</DocP>
        <CodeBlock
          code={`portless api.myapp pnpm start\n# -> https://api.myapp.localhost\n\nportless docs.myapp next dev\n# -> https://docs.myapp.localhost`}
        />
        <DocP>
          默认情况下，只有显式注册的子域名会被路由（严格模式）。启动代理时使用 <InlineCode>--wildcard</InlineCode>
          ，可让已注册路由的任意子域名回退到该应用（例如 <InlineCode>tenant1.myapp.localhost</InlineCode> 无需额外注册即可路由到{" "}
          <InlineCode>myapp</InlineCode> 应用）。
        </DocP>
        <DocP>
          当多个已注册路由都是某个主机名的父路由时，最具体的一个优先（<InlineCode>admin.api.myapp.localhost</InlineCode> 会路由到{" "}
          <InlineCode>api.myapp</InlineCode>，而不是 <InlineCode>myapp</InlineCode>）。
        </DocP>
      </DocSection>

      <DocSection id="worktrees" title="Git Worktrees">
        <DocP>
          <InlineCode>portless run</InlineCode> 会自动检测 git worktree。在已链接的 worktree 中，分支名会作为子域名前缀，因此每个 worktree
          都能获得自己的 URL，无需任何配置更改：
        </DocP>
        <CodeBlock
          code={`# 主 worktree（无前缀）\nportless run next dev   # -> https://myapp.localhost\n\n# 位于 "fix-ui" 分支的已链接 worktree\nportless run next dev   # -> https://fix-ui.myapp.localhost`}
        />
        <DocP>
          使用 <InlineCode>--name</InlineCode> 可在保留 worktree 前缀的同时覆盖推断出的基础名称：
        </DocP>
        <CodeBlock code={`portless run --name myapp next dev   # -> https://fix-ui.myapp.localhost`} />
        <DocP>
          将 <InlineCode>portless run</InlineCode> 写入一次 <InlineCode>package.json</InlineCode>
          ，即可在所有地方通用。主检出使用纯名称，每个 worktree 获得唯一的子域名。无冲突，无需 <InlineCode>--force</InlineCode>。
        </DocP>
      </DocSection>

      <DocSection id="custom-tld" title="自定义 TLD">
        <DocP>
          默认情况下，portless 使用 <InlineCode>.localhost</InlineCode>，它会在大多数浏览器中自动解析到{" "}
          <InlineCode>127.0.0.1</InlineCode>。如果你偏好不同的 TLD（例如 <InlineCode>.test</InlineCode>），请使用{" "}
          <InlineCode>--tld</InlineCode>：
        </DocP>
        <CodeBlock code={`portless proxy start --tld test\nportless myapp next dev\n# -> https://myapp.test`} />
        <DocP>
          代理会自动同步 <InlineCode>/etc/hosts</InlineCode> 中的路由主机名（包括 <InlineCode>.test</InlineCode>），因此这些域名可在本机解析。
        </DocP>
        <DocP>重复 --tld 可让同一应用名在多个 TLD 下从单一代理提供服务：</DocP>
        <CodeBlock
          code={`portless proxy start --tld localhost --tld test\nportless myapp next dev\n# -> https://myapp.localhost\n# -> https://myapp.test`}
        />
        <DocP>
          当配置了多个 TLD 时，<InlineCode>PORTLESS_URL</InlineCode> 使用第一个 TLD。<InlineCode>PORTLESS_TLD</InlineCode>{" "}
          也接受逗号分隔的列表，例如 <InlineCode>PORTLESS_TLD=localhost,test</InlineCode>。
        </DocP>
        <Callout>
          推荐使用 <InlineCode>.test</InlineCode>（IANA 保留，无冲突风险）。避免使用 <InlineCode>.local</InlineCode>（与
          mDNS/Bonjour 冲突）和 <InlineCode>.dev</InlineCode>（Google 拥有，通过 HSTS 强制 HTTPS）。
        </Callout>
      </DocSection>

      <DocSection id="multi-label-tld" title="多段 TLD">
        <DocP>
          <InlineCode>--tld</InlineCode> 的值接受一个小写 DNS 名称（一个或多个点分隔标签，无结尾点），因此你拥有的域名可作为「TLD」使用。这让本地 URL
          与生产环境结构一致，从而使 OAuth 回调 URI、跨子域名 Cookie 以及基于主机的路由在两种环境下表现相同：
        </DocP>
        <CodeBlock code={`portless proxy start --tld dev.example.com\nportless myapp next dev\n# -> https://myapp.dev.example.com`} />
        <DocP>
          每个标签必须遵循 DNS 规则：小写字母、数字以及内部连字符，每个标签最多 63 个字符，总共最多 253 个字符。完整主机名（
          <InlineCode>app.TLD</InlineCode>）同样受 253 字符的 DNS 限制约束。
        </DocP>
        <DocP>
          代理会自动同步 <InlineCode>/etc/hosts</InlineCode> 中的已注册主机名，因此{" "}
          <InlineCode>myapp.dev.example.com</InlineCode> 会在本机解析到 <InlineCode>127.0.0.1</InlineCode>。这是一个仅回环（loopback）的设置：在
          LAN 模式之外，代理只绑定到 <InlineCode>127.0.0.1</InlineCode> 和 <InlineCode>::1</InlineCode>，因此自定义 TLD
          只能从运行代理的机器访问。
        </DocP>
        <Callout tone="violet">
          要让其他设备访问代理需要使用 LAN 模式（<InlineCode>--lan</InlineCode>），但 LAN 模式下应用以 <InlineCode>.local</InlineCode> TLD
          提供服务并忽略自定义 <InlineCode>--tld</InlineCode>，因此二者目前无法组合。
        </Callout>
        <DocP>
          严格的 OAuth 提供方（Google、Apple）会拒绝 <InlineCode>.localhost</InlineCode> 和 <InlineCode>.test</InlineCode>{" "}
          回调 URI，但接受真实域名，因此 <InlineCode>https://myapp.dev.example.com/api/auth/callback/google</InlineCode> 可作为回调 URI 使用。
        </DocP>
      </DocSection>
    </div>
  );
}
