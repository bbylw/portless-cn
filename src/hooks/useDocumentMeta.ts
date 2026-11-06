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
    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    canonical?.setAttribute("href", `${SITE_URL}${pathname}`);
  }, [title, description, pathname]);
}
