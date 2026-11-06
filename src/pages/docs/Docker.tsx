import { CodeBlock } from "../../components/CodeBlock";
import { DocSection, DocP, DocList, InlineCode, Callout } from "../../components/docs/DocPrimitives";

export function Docker() {
  return (
    <div className="space-y-10">
      <DocSection id="overview" title="运行 Compose 项目">
        <CodeBlock
          code={`portless compose up [args...]\nportless compose up -d [args...]\nportless compose down [args...]`}
        />
        <DocP>
          运行一个 Docker Compose 项目，让每个服务都获得具名 URL。每个发布 HTTP 端口的服务都会获得{" "}
          <InlineCode>https://&lt;service&gt;.&lt;project&gt;.localhost</InlineCode>，因此两个都发布 8080 端口的项目可以同时运行。
        </DocP>
        <CodeBlock
          code={`portless compose up -d   # -> https://web.shop.localhost、https://api.shop.localhost\nportless compose down`}
        />
        <DocP>
          把 <InlineCode>-f</InlineCode>、<InlineCode>-p</InlineCode>、<InlineCode>--profile</InlineCode>、{" "}
          <InlineCode>--env-file</InlineCode> 等全局 compose 参数放在命令之前，与 <InlineCode>docker compose</InlineCode> 一致。其他
          compose 命令（如 <InlineCode>logs</InlineCode>、<InlineCode>ps</InlineCode>）会原样执行。
        </DocP>
      </DocSection>

      <DocSection id="lifecycle" title="生命周期">
        <DocP>
          在前台运行时，compose 退出后 portless 会移除路由。使用 <InlineCode>-d</InlineCode> 时，路由会保留到你运行{" "}
          <InlineCode>portless compose down</InlineCode>；<InlineCode>down</InlineCode>
          会移除已停止容器的路由，并保留仍在运行的容器路由。在缺少 compose 文件的目录中运行 <InlineCode>down</InlineCode> 时可传入{" "}
          <InlineCode>-p</InlineCode>。
        </DocP>
        <Callout>
          请用 <InlineCode>portless compose up</InlineCode> 启动项目，因为直接运行 <InlineCode>docker compose up</InlineCode>{" "}
          会用原始端口重建容器。
        </Callout>
      </DocSection>

      <DocSection id="ports" title="端口规则">
        <DocP>
          项目首次启动时，portless 会为每个已发布的 HTTP 端口在 <InlineCode>127.0.0.1</InlineCode>
          上选择一个空闲端口，并在后续运行中复用。由于端口不变，路由在 <InlineCode>restart</InlineCode>、<InlineCode>stop</InlineCode> 再{" "}
          <InlineCode>start</InlineCode> 以及 Docker 重启容器后仍然有效。已路由的服务不能扩展到多个容器，因为副本需要使用同一个主机端口。
        </DocP>
        <DocList>
          <li>
            数据库和缓存端口（如 5432、3306、6379、27017）保留其发布端口，因此现有连接字符串继续可用。UDP 端口和{" "}
            <InlineCode>network_mode: host</InlineCode> 的服务不会被修改。
          </li>
          <li>
            发布多个 HTTP 端口的服务，第一个端口获得 <InlineCode>&lt;service&gt;.&lt;project&gt;</InlineCode>，其余每个端口获得{" "}
            <InlineCode>&lt;port&gt;.&lt;service&gt;.&lt;project&gt;</InlineCode>。
          </li>
        </DocList>
      </DocSection>

      <DocSection id="labels" title="服务标签">
        <DocP>用 label 配置服务：</DocP>
        <CodeBlock
          label="compose.yml"
          code={`services:\n  frontend:\n    labels:\n      portless.name: site # -> https://site.shop.localhost\n      portless.ports: "3000" # 只路由这些容器端口\n  admin:\n    labels:\n      portless.enable: "false" # 保持此服务不变`}
        />
        <DocP>
          每个被路由的服务都会获得 <InlineCode>__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS</InlineCode>
          ，因此容器内的 Vite 开发服务器会接受其 portless 主机名。如果服务已设置该变量，portless 会保留其值。
        </DocP>
      </DocSection>
    </div>
  );
}
