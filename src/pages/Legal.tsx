import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Clock } from "lucide-react";
import { Action } from "../components/ui/Action";
import { Reveal } from "../components/ui/Reveal";
import { Eyebrow } from "../components/ui/SectionHeading";
import { usePageMeta } from "../lib/usePageMeta";
import { privacyPolicy, termsOfUse, type LegalDoc } from "../lib/legal";

function LegalPage({ doc, description }: { doc: LegalDoc; description: string }) {
  const { pathname } = useLocation();
  const published = doc.sections.length > 0;

  usePageMeta(`${doc.title} | Selftech DigiCommunity`, description);

  // Keep the placeholder out of search results until real text is added.
  useEffect(() => {
    if (published) return;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, [published]);

  return (
    <main id="main">
      <section className="relative overflow-hidden bg-bone pt-[74px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="grid-lines absolute inset-0 [clip-path:inset(74px_0_0_0)]" />
          <div className="absolute -left-24 -top-24 size-[28rem] glow [--glow:var(--color-blue-soft)]" />
          <div className="absolute -right-24 bottom-0 size-[24rem] glow [--glow:color-mix(in_oklab,var(--color-green)_10%,transparent)]" />
        </div>

        <div className="container-page relative pb-14 pt-6 lg:pb-16 lg:pt-8">
          <Reveal>
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <Eyebrow>Legal</Eyebrow>
              {doc.updated && (
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink/45">
                  Last updated {doc.updated}
                </p>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 text-[clamp(2.5rem,4.8vw,4.2rem)] leading-[0.96] tracking-[-0.045em] text-ink">
              {doc.title}
            </h1>
            {doc.intro && (
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink/70">{doc.intro}</p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="relative bg-cream py-14 lg:py-20">
        <div className="container-page">
          {!published ? (
            <Reveal>
              <div className="max-w-2xl rounded-[1.75rem] border border-dashed border-ink/25 bg-white p-7 sm:p-10">
                <span className="grid size-12 place-items-center rounded-full bg-green/15 text-green-deep">
                  <Clock className="size-6" />
                </span>
                <h2 className="mt-6 font-display text-[1.7rem] font-semibold leading-tight tracking-tight text-ink">
                  This document is being finalized.
                </h2>
                <p className="mt-3 text-[1rem] leading-relaxed text-ink/65">
                  The full {doc.title.toLowerCase()} will be published here soon. If you have a
                  question in the meantime, including about how your details are used, please get in
                  touch and we will be glad to help.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Action to="/contact" variant="ink">
                    Contact us
                  </Action>
                  <Action to="/" variant="outline">
                    Back to home
                  </Action>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <aside className="lg:col-span-4">
                <nav aria-label="On this page" className="lg:sticky lg:top-28">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-ink/45">
                    On this page
                  </p>
                  <ol className="mt-4 space-y-1">
                    {doc.sections.map((section, i) => (
                      <li key={section.heading}>
                        <Link
                          to={`${pathname}#section-${i + 1}`}
                          className="flex gap-3 rounded-lg py-1.5 text-[0.95rem] text-ink/70 transition-colors hover:text-ink"
                        >
                          <span className="tabular-nums text-ink/35">{String(i + 1).padStart(2, "0")}</span>
                          {section.heading}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              <article className="lg:col-span-8">
                {doc.sections.map((section, i) => (
                  <section
                    key={section.heading}
                    id={`section-${i + 1}`}
                    className="scroll-mt-28 border-t border-ink/10 py-9 first:border-t-0 first:pt-0"
                  >
                    <h2 className="font-display text-[1.5rem] font-semibold leading-tight tracking-tight text-ink">
                      <span className="mr-3 tabular-nums text-ink/30">{String(i + 1).padStart(2, "0")}</span>
                      {section.heading}
                    </h2>
                    <div className="mt-4 max-w-2xl space-y-4 text-[1.02rem] leading-relaxed text-ink/75">
                      {section.body.map((paragraph, p) => (
                        <p key={p}>{paragraph}</p>
                      ))}
                      {section.list && (
                        <ul className="list-disc space-y-2 pl-5 marker:text-green">
                          {section.list.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </section>
                ))}
              </article>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export function PrivacyPage() {
  return (
    <LegalPage
      doc={privacyPolicy}
      description="How Selftech DigiCommunity collects, uses and protects the details you share with us."
    />
  );
}

export function TermsPage() {
  return (
    <LegalPage
      doc={termsOfUse}
      description="The terms for using the Selftech DigiCommunity website and services."
    />
  );
}
