import { CodeBlock } from "../../components/CodeBlock";
import { DocSection, DocP, InlineCode, Callout, ExtLink } from "../../components/docs/DocPrimitives";

export function Operations() {
  return (
    <div className="space-y-10">
      <DocSection id="service" title="随系统启动">
        <DocP>将代理安装为操作系统开机启动服务，这样重启后无需从终端启动代理即可获得干净的 HTTPS URL：</DocP>
        <CodeBlock
          code={`portless service install\nportless service install --lan\nportless service install --wildcard\nPORTLESS_STATE_DIR=~/.portless-lan PORTLESS_LAN=1 portless service install\nportless service status\nportless service uninstall`}
        />
        <DocP>
          除非提供了安装选项或 <InlineCode>PORTLESS_*</InlineCode> 环境变量，否则该服务使用 portless 默认值：端口 443 上的 HTTPS 以及{" "}
          <InlineCode>.localhost</InlineCode> 名称。<InlineCode>service install</InlineCode> 接受你可配合{" "}
          <InlineCode>proxy start</InlineCode> 使用的代理选项，包括 <InlineCode>--port</InlineCode>、<InlineCode>--no-tls</InlineCode>、
          <InlineCode>--lan</InlineCode>、<InlineCode>--ip</InlineCode>、<InlineCode>--tld</InlineCode>、{" "}
          <InlineCode>--wildcard</InlineCode>、<InlineCode>--cert</InlineCode> 和 <InlineCode>--key</InlineCode>。使用{" "}
          <InlineCode>--state-dir &lt;path&gt;</InlineCode> 或 <InlineCode>PORTLESS_STATE_DIR=&lt;path&gt;</InlineCode>{" "}
          可选择服务状态和日志的写入位置。
        </DocP>
        <DocP>
          所选的服务配置会被写入 launchd、systemd 或任务计划程序，并在重启后复用。<InlineCode>portless service status</InlineCode>
          会报告已安装的端口、HTTPS 模式、TLD、LAN 模式、通配符模式以及状态目录。macOS 和 Linux 会安装 root 拥有的服务，以便端口 443
          能在开机时绑定。Windows 安装一个以 SYSTEM 运行的任务计划程序启动任务。安装和移除可能需要管理员权限。
          <InlineCode>portless clean</InlineCode> 会自动移除该服务。
        </DocP>
      </DocSection>

      <DocSection id="uninstall" title="卸载 / 重置">
        <DocP>
          要从你的机器移除 portless 数据（<InlineCode>~/.portless</InlineCode> 下的代理状态与系统状态目录、已安装的开机启动服务、portless
          安装到操作系统信任存储中的本地 CA，以及 <InlineCode>/etc/hosts</InlineCode> 中的 portless 区块）：
        </DocP>
        <CodeBlock code={`portless clean\nportless clean --yes    # CI 或无终端时跳过确认`} />
        <DocP>
          该命令会预览这些操作并请求确认；在 CI 或无终端时使用 <InlineCode>--yes</InlineCode>（或 <InlineCode>-y</InlineCode>）。
          macOS/Linux 可能会提示输入 <InlineCode>sudo</InlineCode>，失败的 CA、状态文件与 hosts 步骤会以 sudo
          对同一组白名单目标重试。如果无法确认代理已停止，其 PID、端口、运行时标记文件与 CA 文件会被保留，CA 也保持受信任。服务、CA、状态文件与
          hosts 清理失败会产生非零退出码。
        </DocP>
        <DocP>
          通过 <InlineCode>--cert</InlineCode> 和 <InlineCode>--key</InlineCode> 传入的自定义证书路径不会被删除。如果信任存储移除仍然失败，portless
          会保留其 CA 证书和密钥，以便后续 <InlineCode>portless clean</InlineCode> 能安全重试。其他用户拥有或可写的状态目录会被放过：clean
          打印原因并以非零码退出，未通过检查的 <InlineCode>/tmp/portless</InlineCode> 目录会被跳过而不报错（参见命令参考中的状态目录安全规则）。
        </DocP>
      </DocSection>

      <DocSection id="safari-dns" title="Safari / DNS">
        <DocP>
          <InlineCode>.localhost</InlineCode> 子域名在 Chrome、Firefox 和 Edge 中会自动解析到{" "}
          <InlineCode>127.0.0.1</InlineCode>。Safari 依赖系统 DNS 解析器，它在所有配置下可能无法处理{" "}
          <InlineCode>.localhost</InlineCode> 子域名。
        </DocP>
        <DocP>如果 Safari 找不到你的 .localhost URL：</DocP>
        <CodeBlock code={`portless hosts sync    # 将当前路由与 /etc/hosts 对齐\nportless hosts clean   # 稍后清理`} />
        <DocP>
          默认情况下会自动同步 <InlineCode>/etc/hosts</InlineCode> 中的路由主机名（<InlineCode>.localhost</InlineCode>、自定义 TLD、LAN{" "}
          <InlineCode>.local</InlineCode>）。设置 <InlineCode>PORTLESS_SYNC_HOSTS=0</InlineCode>{" "}
          可禁用。如果某个路由主机名无法解析，注册它的命令会给出警告，并提示你运行 <InlineCode>portless hosts sync</InlineCode>。
        </DocP>
        <DocP>
          手动同步会将 portless 管理的条目与当前路由对齐，并在没有路由时移除过期条目。写入前必须成功读取 hosts
          文件，并逐条校验写入结果。读取或校验失败时会走正常的同步错误路径。
        </DocP>
      </DocSection>

      <DocSection id="troubleshooting" title="故障排查">
        <DocP>
          运行 <InlineCode>portless doctor</InlineCode> 可检查本地健康状况而不改变状态。它会检查 Node.js、状态目录、代理存活、路由条目、HTTPS
          CA 信任、主机名解析以及 LAN 模式前置条件，然后打印建议的修复方案。使用 <InlineCode>portless doctor --json</InlineCode> 可以 JSON
          打印报告。代理未处于 LAN 模式时，可用 <InlineCode>portless doctor --lan</InlineCode> 运行 LAN 模式检查；
          <InlineCode>--ip &lt;address&gt;</InlineCode> 效果相同，且必须是合法的 IP 地址。
        </DocP>
        <CodeBlock
          code={`portless doctor          # 检查本地健康状况\nportless doctor --json   # 以 JSON 打印诊断报告\nportless hosts sync     # 修复 Safari DNS\nportless hosts clean    # 清理 hosts 条目\nportless clean          # 移除所有状态`}
        />
        <DocP>
          <InlineCode>portless prune</InlineCode> 找出所属 portless 进程已消失的路由，在已记录的进程组消失后移除过期路由及其
          Tailscale 与隧道共享。在 macOS 与 Linux 上，仅当进程组组长仍匹配记录的启动时间、或先前清理记录的成员仍匹配时，才会向该进程组发送信号，
          并在所有成员退出后才报告进程组已停止。只要仍有成员在运行（即使它在 SIGTERM 后关闭了端口），prune 会保留路由与共享并记录存活的成员，
          以便 <InlineCode>portless prune --force</InlineCode> 重试时验证该成员并发送 SIGKILL。无法验证的进程组会被保留并报告，绝不发送信号；
          无法证明属于已记录进程组的端口占用进程同样只报告、不杀掉。
        </DocP>
        <DocP>
          在 Windows 上，prune 无法验证或信号化进程组，只移除过期路由与 Tailscale 共享并报告端口占用进程。prune 与 clean
          仅在可执行文件名匹配时才停止已记录的 ngrok 与 cloudflared 隧道（包括 Windows 上）。<InlineCode>portless run</InlineCode>{" "}
          启动时也会尝试停止已记录的孤立进程组。
        </DocP>
        <Callout tone="emerald">
          如果 portless 在非交互式环境中退出，通常是因为没有 TTY 或设置了 <InlineCode>CI=1</InlineCode>。这是预期行为，错误信息会说明需要
          sudo 或 TTY 的原因。
        </Callout>
      </DocSection>

      <DocSection id="development" title="开发">
        <DocP>
          本仓库是一个使用 <ExtLink href="https://turbo.build">Turborepo</ExtLink> 的 pnpm workspace monorepo。可发布的包位于{" "}
          <ExtLink href="https://github.com/vercel-labs/portless/tree/main/packages/portless">packages/portless/</ExtLink>。
        </DocP>
        <DocP>
          进行仓库开发请使用 Node.js 24+ 与 pnpm 11。
          <ExtLink href="https://github.com/vercel-labs/portless/blob/main/.node-version">.node-version</ExtLink> 文件为版本管理器固定了 Node 主版本。
        </DocP>
        <CodeBlock
          code={`pnpm install          # 安装所有依赖\npnpm build            # 构建所有包\npnpm test             # 运行测试\npnpm test:coverage    # 运行带覆盖率的测试\npnpm lint             # 对所有包进行 Lint\npnpm type-check       # 对所有包进行类型检查\npnpm format           # 使用 Prettier 格式化所有文件`}
        />
      </DocSection>
    </div>
  );
}
