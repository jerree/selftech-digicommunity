import { Quote } from "lucide-react";
import { capabilities } from "../lib/site";
import { Eyebrow, TextLink } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Marquee } from "./ui/Marquee";

const pillars = [
  { title: "Access", copy: "Devices, tools and connectivity where they are needed." },
  { title: "Confidence", copy: "Patient, practical teaching with no jargon and no judgment." },
  { title: "Opportunity", copy: "Clear pathways from first click to real-world progress." },
];

export function Mission() {
  return (
    <section id="mission" className="relative overflow-hidden bg-cream">
      <div className="container-page py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow index="01">Our mission</Eyebrow>
              <h2 className="mt-6 text-[clamp(2.2rem,4.4vw,3.7rem)] leading-[0.98] text-ink">
                Building a digitally{" "}
                <span className="font-serif font-normal italic text-green">empowered</span>{" "}
                society.
              </h2>
              <p className="mt-7 max-w-md text-[0.98rem] leading-relaxed text-ink/60">
                Through accessible technology training, digital inclusion, responsible AI
                adoption and community partnerships, we open doors so more people can learn,
                connect, work and access services online, confidently and safely.
              </p>
              <div className="mt-8">
                <TextLink href="/about">See how we work</TextLink>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-12 hidden lg:block">
              <div className="flex items-center gap-4 border-t border-ink/10 pt-6">
                <span className="grid size-12 place-items-center rounded-full bg-white ring-1 ring-ink/10">
                  <img
                    src="/assets/logo-256.png"
                    alt=""
                    className="size-8 object-contain mix-blend-multiply"
                  />
                </span>
                <div>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-ink/40">
                    Rooted in community
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink/70">
                    People first. Technology second.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <figure className="relative overflow-hidden rounded-[1.8rem] border border-ink/10 bg-bone p-7 sm:p-10">
                <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full border border-blue/15" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-green/[0.06] blur-2xl" />

                <Quote className="size-9 text-blue/25" strokeWidth={1.5} />
                <blockquote className="mt-5 max-w-xl font-display text-[clamp(1.35rem,2.3vw,1.85rem)] font-medium leading-[1.28] tracking-[-0.02em] text-ink/85">
                  A digitally empowered society where every person and community has the{" "}
                  <span className="font-serif font-normal italic text-blue">
                    skills, resources and opportunities
                  </span>{" "}
                  to participate meaningfully in the digital economy.
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-ink/40">
                  <span className="h-px w-8 bg-ink/25" />
                  Our mission statement
                </figcaption>
              </figure>
            </Reveal>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={0.12 + i * 0.08}>
                  <div className="group h-full rounded-2xl border border-ink/10 bg-white/60 p-5 transition-colors duration-500 hover:border-ink/20 hover:bg-white">
                    <span className="font-display text-[0.7rem] font-semibold tabular-nums text-ink/30">
                      0{i + 1}
                    </span>
                    <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-ink">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-[0.8rem] leading-relaxed text-ink/55">{pillar.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-ink/10 bg-bone/60">
        <Marquee duration={40}>
          {capabilities.map((cap) => (
            <span
              key={cap.label}
              className="flex items-center gap-2.5 whitespace-nowrap px-7 py-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink/45"
            >
              <cap.icon className="size-3.5 text-green" strokeWidth={2} />
              {cap.label}
              <span className="ml-6 size-1 rounded-full bg-ink/15" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
