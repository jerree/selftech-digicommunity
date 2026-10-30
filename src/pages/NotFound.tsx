import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Home as HomeIcon } from "lucide-react";
import { Action } from "../components/ui/Action";
import { Reveal } from "../components/ui/Reveal";
import { Eyebrow } from "../components/ui/SectionHeading";
import { navRoutes } from "../lib/site";
import { usePageMeta } from "../lib/usePageMeta";

export default function NotFound() {
  const { pathname } = useLocation();

  usePageMeta(
    "Page not found | Selftech DigiCommunity",
    "The page you were looking for could not be found. Head back home or explore our programs, events and resources."
  );

  // Ask search engines not to index this URL (a single-page app cannot send a real 404 status).
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  const suggestions = navRoutes.filter((r) => r.to !== "/");

  return (
    <main id="main">
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-bone pt-[74px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="grid-lines absolute inset-0 [clip-path:inset(74px_0_0_0)]" />
          <div className="absolute -left-24 -top-24 size-[28rem] rounded-full bg-blue-soft blur-[120px]" />
          <div className="absolute -right-24 bottom-0 size-[24rem] rounded-full bg-green/10 blur-[110px]" />
        </div>

        <div className="container-page relative py-16 lg:py-20">
          <Reveal>
            <Eyebrow className="border-b border-ink/10 pb-4">Error 404</Eyebrow>
          </Reveal>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal delay={0.05}>
                <p
                  aria-hidden="true"
                  className="select-none font-display text-[clamp(6.5rem,20vw,14rem)] font-bold leading-[0.85] tracking-[-0.06em] text-[#0a1f4d]"
                >
                  4<span className="font-serif font-normal italic text-blue">0</span>4
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <h1 className="mt-6 text-[clamp(2rem,4vw,3.2rem)] leading-[0.98] tracking-[-0.04em] text-[#0a1f4d]">
                  We can’t find that page.
                </h1>
                <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-[#46536c]">
                  The link may be broken, or the page may have moved. Nothing is wrong on your end.
                  Head back home, or pick one of the pages on the right.
                </p>
                {pathname !== "/" && (
                  <p className="mt-4 max-w-full truncate rounded-full border border-ink/10 bg-white px-4 py-2 text-[0.8rem] font-semibold text-[#46536c] sm:w-fit">
                    <span className="text-ink/40">You tried: </span>
                    {pathname}
                  </p>
                )}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Action to="/" variant="ink" icon={HomeIcon}>
                    Back to home
                  </Action>
                  <Action to="/contact" variant="outline">
                    Contact us
                  </Action>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2} y={30} className="lg:col-span-5">
              <nav
                aria-label="Helpful pages"
                className="rounded-[2rem] border border-ink/10 bg-white p-6 sm:p-8"
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-ink/40">
                  Try one of these
                </p>
                <ul className="mt-3">
                  {suggestions.map((route) => (
                    <li key={route.to} className="border-b border-ink/10 last:border-0">
                      <Link
                        to={route.to}
                        className="group flex items-center justify-between gap-4 py-3.5"
                      >
                        <span className="font-display text-[1.2rem] font-semibold tracking-tight text-[#0a1f4d]">
                          {route.label}
                        </span>
                        <ArrowUpRight className="size-5 text-ink/30 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
