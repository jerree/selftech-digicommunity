import { BadgeCheck, Clock3 } from "lucide-react";
import { impact } from "../lib/site";
import { Eyebrow } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Action } from "./ui/Action";

export function Impact() {
  return (
    <section id="impact" className="grain relative overflow-hidden bg-ink py-20 text-cream lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cream/25 to-transparent" />
        <div className="absolute -right-32 top-10 size-[30rem] rounded-full bg-blue/20 blur-[130px]" />
        <div className="absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-green/15 blur-[120px]" />
      </div>

      <div className="container-page relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Eyebrow index="03" tone="light">
              Our impact
            </Eyebrow>
            <h2 className="mt-6 max-w-2xl text-[clamp(2.2rem,4.4vw,3.7rem)] leading-[0.98] text-cream">
              Progress we can{" "}
              <span className="font-serif font-normal italic text-green">stand behind</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-cream/55">
              We only publish figures once they are confirmed. No inflated numbers. No vague
              claims. Just the record of what our community has actually achieved.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 md:grid-cols-3">
          {impact.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.05} className="bg-ink">
              <div className="group relative h-full bg-ink p-6 transition-colors duration-500 hover:bg-ink-2 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="font-display text-[clamp(2.8rem,5vw,4rem)] font-semibold leading-none tracking-tighter text-cream/25">
                    <span aria-hidden="true">{stat.value}</span>
                    <span className="sr-only">Data not yet published</span>
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-cream/15 px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-[0.14em] text-cream/40">
                    <Clock3 className="size-2.5" />
                    Pending
                  </span>
                </div>
                <p className="mt-8 font-display text-[0.95rem] font-semibold tracking-tight text-cream/90">
                  {stat.label}
                </p>
                <p className="mt-1 text-[0.72rem] text-cream/35">{stat.note}</p>
                <span className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-green to-blue transition-transform duration-700 ease-expo group-hover:scale-x-100 sm:inset-x-8" />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2.5 text-[0.78rem] text-cream/45">
            <BadgeCheck className="size-4 shrink-0 text-green" />
            Verified figures will be published here as they are confirmed.
          </p>
          <Action to="/contact" variant="light">
            Help us document the impact
          </Action>
        </div>
      </div>
    </section>
  );
}
