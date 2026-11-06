import { CodeBlock } from "../../components/CodeBlock";
import { DocSection, DocP, InlineCode, Callout, DocTable } from "../../components/docs/DocPrimitives";

export function Mcp() {
  return (
    <div className="space-y-10">
      <DocSection id="overview" title="启动服务器">
        <CodeBlock code={`portless mcp [--tools <profiles>]`} />
        <DocP>
          启动一个 stdio MCP 服务器，通过标准输入输出交换按行分隔的 JSON-RPC 消息。<InlineCode>--tools</InlineCode>{" "}
          接受逗号分隔的配置组。默认为 <InlineCode>core</InlineCode>；<InlineCode>default</InlineCode> 是{" "}
          <InlineCode>core</InlineCode> 的别名，<InlineCode>full</InlineCode> 是 <InlineCode>all</InlineCode> 的别名。
        </DocP>
      </DocSection>

      <DocSection id="tool-profiles" title="工具配置组">
        <DocTable
          columns={["配置组", "工具"]}
          rows={[
            [<InlineCode key="core">core</InlineCode>, <span key="core-tools" className="font-mono text-[12.5px]">list、get、alias_add、alias_remove、tools_profiles</span>],
            [<InlineCode key="proxy">proxy</InlineCode>, <span key="proxy-tools" className="font-mono text-[12.5px]">proxy_start、proxy_stop</span>],
            [<InlineCode key="diag">diagnostics</InlineCode>, <span key="diag-tools" className="font-mono text-[12.5px]">doctor、prune、version</span>],
            [<InlineCode key="all">all</InlineCode>, "上述配置组中的所有工具"],
          ]}
        />
        <DocP>
          除 <InlineCode>tools_profiles</InlineCode> 外，所有工具都接受共享的 <InlineCode>cwd</InlineCode>、{" "}
          <InlineCode>extraArgs</InlineCode> 和 <InlineCode>timeoutMs</InlineCode> 参数。<InlineCode>cwd</InlineCode>{" "}
          默认为服务器的工作目录，<InlineCode>extraArgs</InlineCode> 会追加在工具的类型化参数之后，<InlineCode>timeoutMs</InlineCode>{" "}
          默认为 120000。
        </DocP>
        <DocP>
          错误的参数（未知或类型不对）以及调用未启用的工具会返回带 <InlineCode>isError: true</InlineCode>{" "}
          的工具结果并说明修复方法，让模型能够纠正调用；未知参数会列出该工具自身的参数。
        </DocP>
      </DocSection>

      <DocSection id="client-config" title="客户端配置">
        <DocP>默认 core 配置组使用以下客户端配置：</DocP>
        <CodeBlock
          label="mcp.json"
          code={`{ "mcpServers": { "portless": { "command": "portless", "args": ["mcp"] } } }`}
        />
        <DocP>启用所有工具使用以下配置：</DocP>
        <CodeBlock
          label="mcp.json"
          code={`{ "mcpServers": { "portless": { "command": "portless", "args": ["mcp", "--tools", "all"] } } }`}
        />
      </DocSection>

      <DocSection id="limitations" title="限制">
        <DocP>服务器不暴露开发服务器启动命令：</DocP>
        <Callout>
          <InlineCode>portless run</InlineCode>、<InlineCode>portless &lt;name&gt; &lt;cmd&gt;</InlineCode>、{" "}
          <InlineCode>portless --name &lt;name&gt; &lt;cmd&gt;</InlineCode> 以及零参数模式都会在前台启动开发服务器，而 MCP 没有脱离（detached）形式。
          <InlineCode>portless proxy start --foreground</InlineCode> 会阻塞。
        </Callout>
        <DocP>
          <InlineCode>portless trust</InlineCode>、<InlineCode>portless clean</InlineCode>、<InlineCode>portless hosts sync</InlineCode>、
          <InlineCode>portless hosts clean</InlineCode> 以及 <InlineCode>portless service</InlineCode> 可能提示 sudo 并需要 TTY。
          <InlineCode>portless mcp</InlineCode> 和 <InlineCode>portless mcp --help</InlineCode>{" "}
          被省略，因为它们分别是服务器本身和面向人类的帮助。
        </DocP>
      </DocSection>
    </div>
  );
}
