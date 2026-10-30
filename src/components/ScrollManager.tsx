import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const newPage = previousPath.current !== pathname;
    previousPath.current = pathname;

    if (!hash) {
      window.scrollTo({ top: 0, behavior: newPage ? "instant" : "smooth" });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    const behavior: ScrollBehavior = newPage ? "instant" : "smooth";
    let attempts = 0;

    const timer = window.setInterval(() => {
      const el = document.getElementById(id);
      if (el) {
        window.clearInterval(timer);
        el.scrollIntoView({ behavior, block: "start" });
      } else if (++attempts > 20) {
        window.clearInterval(timer);
      }
    }, 50);

    return () => window.clearInterval(timer);
  }, [pathname, hash, key]);

  return null;
}
