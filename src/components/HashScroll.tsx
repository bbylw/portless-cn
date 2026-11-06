import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export function HashScroll() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (!hash) {
      if (navigationType !== "POP") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;

    const scrollToAnchor = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (tries < 8) {
        tries += 1;
        requestAnimationFrame(scrollToAnchor);
      }
    };

    requestAnimationFrame(scrollToAnchor);
  }, [pathname, hash, navigationType]);

  return null;
}
