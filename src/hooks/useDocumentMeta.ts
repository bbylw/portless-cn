import { useEffect } from "react";

const SITE_URL = "https://portless.ndjp.net";

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function useDocumentMeta(title: string, description: string, pathname: string) {
  useEffect(() => {
    // 尾斜杠与首页统一，避免 /docs 与 /docs/ 产生两个 canonical。
    const path = pathname.replace(/\/+$/, "") || "/";
    const url = `${SITE_URL}${path}`;

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, pathname]);
}
