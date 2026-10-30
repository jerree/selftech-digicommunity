import { Link } from "react-router-dom";
import { ArrowUpRight, Phone } from "lucide-react";
import { involvements } from "../lib/site";
import { Eyebrow } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function Involved() {
  return (
    <section id="involved" className="relative overflow-hidden bg-cream py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Eyebrow index="06">Get involved</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-[clamp(2.2rem,4.4vw,3.7rem)] leading-[0.98] text-ink">
              There is a place for you in{" "}
              <span className="font-serif font-normal italic text-blue">this work</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-xs text-[0.95rem] leading-relaxed text-ink/55">
              Give an hour, share a skill, open a door. Every contribution widens access for
              someone else.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {involvements.map((item, i) => {
            const Icon = item.icon;
            const dark = item.tone === "dark";
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <Link
                  to={item.href}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border p-7 transition-all duration-500 hover:-translate-y-1.5 sm:p-8 ${
                    dark
                      ? "border-ink bg-ink text-cream hover:shadow-[0_35px_70px_-30px_rgba(7,23,47,0.65)]"
                      : "border-ink/10 bg-white text-ink hover:border-ink/25 hover:shadow-[0_30px_60px_-35px_rgba(7,23,47,0.3)]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-4 right-6 select-none font-display text-[4.2rem] font-semibold leading-none tracking-tighter ${
                      dark ? "text-cream/15" : "text-ink/[0.12]"
                    }`}
                  >
                    0{i + 1}
                  </span>

                  <div className="flex items-start justify-between">
                    <span
                      className={`grid size-12 place-items-center rounded-xl transition-transform duration-500 ease-expo group-hover:-rotate-6 ${
                        dark ? "bg-white/10 text-green" : "bg-blue-soft text-blue-deep"
                      }`}
                    >
                      <Icon className="size-5.5" strokeWidth={1.75} />
                    </span>
                    <span
                      className={`grid size-9 place-items-center rounded-full border transition-all duration-500 group-hover:rotate-45 ${
                        dark
                          ? "border-cream/20 bg-white/5 text-cream"
                          : "border-ink/15 text-ink group-hover:bg-ink group-hover:text-cream"
                      }`}
                    >
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>

                  <h3 className="relative mt-8 font-display text-[1.35rem] font-semibold leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <p
                    className={`relative mt-3 text-[0.86rem] leading-relaxed ${
                      dark ? "text-cream/60" : "text-ink/55"
                    }`}
                  >
                    {item.copy}
                  </p>
                  <span
                    className={`relative mt-auto pt-8 text-[0.78rem] font-bold ${
                      dark ? "text-green" : "text-blue-deep"
                    }`}
                  >
                    <span className="link-line">{item.action}</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div
            id="contact"
            className="mt-16 flex flex-col gap-6 rounded-[1.4rem] border border-ink/10 bg-bone/70 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8"
          >
            <div className="flex items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-green-deep ring-1 ring-ink/10">
                <Phone className="size-4.5" />
              </span>
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-ink/40">
                  Prefer to talk it through?
                </p>
                <p className="mt-1 text-sm font-semibold text-ink/75">
                  Call us and a real person will pick up.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold">
              <a href="tel:+14432563727" className="link-line text-ink">
                (443) 256-3727
              </a>
              <a href="tel:+13142711939" className="link-line text-ink">
                (314) 271-1939
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
