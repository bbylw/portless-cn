import { CodeBlock } from "../../components/CodeBlock";
import { DocSection, DocP, InlineCode, Callout, DocTable, ExtLink } from "../../components/docs/DocPrimitives";
import { configFields } from "../../data";

export function Configuration() {
  return (
    <div className="space-y-10">
      <DocSection id="portless-json" title="portless.json">
        <DocP>
          裸 <InlineCode>portless</InlineCode> 开箱即用。它通过代理运行 <InlineCode>package.json</InlineCode> 中的 <InlineCode>"dev"</InlineCode>{" "}
          脚本，从包名、git 根目录或目录推断应用名称：
        </DocP>
        <CodeBlock code={`portless        # -> 运行 "dev" 脚本，https://<project>.localhost`} />
        <DocP>使用可选的 portless.json 覆盖默认值：</DocP>
        <CodeBlock label="portless.json" code={`{ "name": "myapp" }`} />
        <CodeBlock code={`portless        # -> 运行 "dev" 脚本，https://myapp.localhost`} />
        <DocP>
          脚本默认为 <InlineCode>"dev"</InlineCode>。若配置中未设置名称，则从 <InlineCode>package.json</InlineCode> 推断。
        </DocP>
      </DocSection>

      <DocSection id="config-fields" title="配置字段">
        <DocTable
          columns={["字段", "类型", "默认值", "说明"]}
          rows={configFields.map((field) => [
            <InlineCode key={field.field}>{field.field}</InlineCode>,
            <span key={`${field.field}-type`} className="font-mono text-violet-300">{field.type}</span>,
            <span key={`${field.field}-def`} className="font-mono text-zinc-500">{field.def || "—"}</span>,
            field.desc,
          ])}
        />
      </DocSection>

      <DocSection id="package-json-key" title="package.json 中的配置">
        <DocP>
          除了单独的 <InlineCode>portless.json</InlineCode>，你也可以向 <InlineCode>package.json</InlineCode> 添加{" "}
          <InlineCode>"portless"</InlineCode> 键。字符串值是设置名称的简写：
        </DocP>
        <CodeBlock
          label="package.json"
          code={`{\n  "name": "@myorg/web",\n  "portless": "myapp"\n}`}
        />
        <DocP>
          对象形式支持所有单应用字段（<InlineCode>name</InlineCode>、<InlineCode>script</InlineCode>、<InlineCode>appPort</InlineCode>、
          <InlineCode>proxy</InlineCode>）：
        </DocP>
        <CodeBlock
          label="package.json"
          code={`{\n  "name": "@myorg/web",\n  "portless": {\n    "name": "myapp",\n    "script": "dev:app"\n  }\n}`}
        />
        <Callout tone="emerald">
          <InlineCode>package.json</InlineCode> 中的 <InlineCode>"portless"</InlineCode> 键优先于 <InlineCode>portless.json</InlineCode>{" "}
          的应用条目，但会被 CLI 标志覆盖。
        </Callout>
        <DocP>你也可以继续在 package.json 脚本中直接使用 portless：</DocP>
        <CodeBlock
          label="package.json"
          code={`{\n  "scripts": {\n    "dev": "portless run next dev"\n  }\n}`}
        />
        <DocP>
          配合 <InlineCode>portless.json</InlineCode>，可简化脚本本身，然后运行 <InlineCode>portless</InlineCode> 或{" "}
          <InlineCode>portless run</InlineCode> 经由代理访问：
        </DocP>
        <CodeBlock label="package.json" code={`{\n  "scripts": {\n    "dev": "next dev"\n  }\n}`} />
        <Callout>
          按下 Ctrl+C 时，portless 会转发中断信号并等待命令的进程树退出。再次按下 Ctrl+C 会转发另一次中断。剩余的子进程会在短暂的宽限期后被终止。
        </Callout>
      </DocSection>

      <DocSection id="monorepo" title="Monorepo">
        <DocP>
          仓库根目录下一个 <InlineCode>portless.json</InlineCode> 即可覆盖所有工作区包。portless 从{" "}
          <ExtLink href="https://github.com/vercel-labs/portless/blob/main/pnpm-workspace.yaml">pnpm-workspace.yaml</ExtLink>、或{" "}
          <InlineCode>package.json</InlineCode> 中的{" "}
          <InlineCode>"workspaces"</InlineCode> 字段（npm、yarn、bun）发现包：
        </DocP>
        <CodeBlock
          label="portless.json"
          code={`{\n  "apps": {\n    "apps/web": { "name": "myapp" },\n    "apps/api": { "name": "api.myapp" }\n  }\n}`}
        />
        <CodeBlock
          code={`portless        # 在仓库根目录运行：启动所有带 "dev" 脚本的工作区包\ncd apps/web && portless   # 只启动单个包`}
        />
        <DocP>
          <InlineCode>apps</InlineCode> 映射是可选的，仅在需要覆盖名称时使用。未列出的包仍会被自动发现，名称从其{" "}
          <InlineCode>package.json</InlineCode> 推断。
        </DocP>
        <DocP>
          若没有 <InlineCode>apps</InlineCode> 映射，主机名遵循 <InlineCode>&lt;package&gt;.&lt;project&gt;.localhost</InlineCode>{" "}
          约定。项目名称取自工作区包中最常见的 npm scope（例如 <InlineCode>@myorg/web</InlineCode> 与{" "}
          <InlineCode>@myorg/api</InlineCode> 产生 <InlineCode>myorg</InlineCode>），回退到工作区根目录名。如果某个包的短名与项目名相同，它会得到裸{" "}
          <InlineCode>&lt;project&gt;.localhost</InlineCode>，不会重复。
        </DocP>
      </DocSection>

      <DocSection id="turborepo" title="Turborepo">
        <DocP>
          要将 portless 与 turborepo 搭配使用，把 <InlineCode>portless</InlineCode> 作为 <InlineCode>dev</InlineCode> 脚本，真实命令放到单独的脚本中：
        </DocP>
        <CodeBlock
          label="package.json"
          code={`{\n  "scripts": {\n    "dev": "portless",\n    "dev:app": "next dev"\n  },\n  "portless": { "name": "myapp", "script": "dev:app" }\n}`}
        />
        <DocP>
          Turbo 运行每个包的 <InlineCode>dev</InlineCode> 脚本，从而调用 portless。portless 读取配置、检测包管理器，并通过代理运行{" "}
          <InlineCode>pnpm run dev:app</InlineCode>（或 yarn/bun/npm）。无需对 <InlineCode>turbo.json</InlineCode> 或{" "}
          <InlineCode>turbo.jsonc</InlineCode> 做任何更改。
        </DocP>
        <DocP>
          根目录下的 <InlineCode>pnpm dev</InlineCode> 照常通过 turbo 运行。未安装 portless 的人可以直接运行{" "}
          <InlineCode>pnpm run dev:app</InlineCode>。
        </DocP>
        <DocP>
          当 portless 从 workspace 根目录运行时，只要 <InlineCode>turbo.json</InlineCode> 或 <InlineCode>turbo.jsonc</InlineCode> 可读，它就会使用现有的
          Turbo 集成来保留任务顺序。在根目录的 portless 配置中设置 <InlineCode>"turbo": false</InlineCode> 可改为使用直接派生。
        </DocP>
      </DocSection>

      <DocSection id="script-flag" title="覆盖脚本">
        <DocP>为单次调用覆盖默认脚本：</DocP>
        <CodeBlock code={`portless --script start       # 运行 "start" 而不是 "dev"\nportless --script test        # 运行 "test" 而不是 "dev"`} />
      </DocSection>
    </div>
  );
}
