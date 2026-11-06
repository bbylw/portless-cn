import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DocsHeader } from "../components/docs/DocsHeader";
import { DocsSidebar } from "../components/docs/DocsSidebar";
import { DocsMobileNav } from "../components/docs/DocsMobileNav";
import { DocsPageHeader } from "../components/docs/DocsPageHeader";
import { DocsPager } from "../components/docs/DocsPager";
import { OnThisPage } from "../components/docs/OnThisPage";
import { Footer } from "../components/Footer";
import { getAdjacentDocsPages, getDocsPage } from "../navigation/docsNav";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export function DocsLayout() {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const page = getDocsPage(location.pathname);

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  useDocumentMeta(
    page ? `${page.title} · portless 文档` : "文档 · portless",
    page?.description ?? "portless 文档中心。",
    location.pathname,
  );

  if (!page) return null;

  const { previous, next } = getAdjacentDocsPages(page.path);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <DocsHeader onOpenNav={() => setNavOpen(true)} />
      <DocsMobileNav open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="mx-auto flex max-w-[1440px] items-start px-4 sm:px-6 lg:px-8">
        <DocsSidebar className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[240px] shrink-0 overflow-y-auto border-r border-white/[0.07] py-10 pr-4 lg:block" />

        <main className="min-w-0 flex-1 py-10 lg:px-10">
          <article className="mx-auto w-full max-w-[780px]">
            <DocsPageHeader page={page} />
            <Outlet />
            <DocsPager previous={previous} next={next} />
          </article>
        </main>

        <OnThisPage page={page} />
      </div>

      <Footer />
    </div>
  );
}
