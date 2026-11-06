import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Install } from "../components/Install";
import { DocsExplorer } from "../components/DocsExplorer";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const TITLE = "portless — 用具名的 .localhost URL 取代端口号";
const DESCRIPTION = "用稳定、具名的 .localhost URL 取代端口号，默认 HTTPS + HTTP/2，零配置启动。";

export function LandingPage() {
  useDocumentMeta(TITLE, DESCRIPTION, "/");

  return (
    <>
      <Hero />
      <Features />
      <Install />
      <DocsExplorer />
    </>
  );
}
