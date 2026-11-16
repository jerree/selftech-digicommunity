import { useEffect } from "react";

function setMeta(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute("content", value);
}

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);

    // Each page points search engines at its own address.
    const url = window.location.origin + window.location.pathname;
    setMeta('meta[property="og:url"]', url);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description]);
}
