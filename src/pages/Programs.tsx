import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Phone } from "lucide-react";
import { programs, startSteps, type Program } from "../lib/site";
import { Action } from "../components/ui/Action";
import { Reveal, RevealLines } from "../components/ui/Reveal";
import { Eyebrow } from "../components/ui/SectionHeading";
import { usePageMeta } from "../lib/usePageMeta";

const accents = {
  blue: {
    tile: "bg-blue text-white",
    chip: "bg-blue/15 text-blue",
    text: "text-blue-deep",
    check: "text-blue",
  },
  green: {
    tile: "bg-green text-white",
    chip: "bg-green/15 text-green",
    text: "text-green-deep",
    check: "text-green",
  },
  teal: {
    tile: "bg-teal text-white",
    chip: "bg-teal/15 text-teal",
    text: "text-[#1d7282]",
    check: "text-teal",
  },
  ink: {
    tile: "bg-ink text-cream",
    chip: "bg-cream/10 text-cream",
    text: "text-ink",
    check: "text-ink",
  },
} as const;

function ProgramsHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-bone pt-[74px] programs-hero">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0 [clip-path:inset(74px_0_0_0)]" />
        <div className="absolute -left-24 -top-24 size-[28rem] rounded-full bg-blue-soft blur-[120px]" />
        <div className="absolute -right-24 bottom-0 size-[24rem] rounded-full bg-green/10 blur-[110px]" />
      </div>
      <div className="container-page relative pb-14 pt-6 lg:pb-20 lg:pt-8">
        <Reveal>
          <div className="flex items-end justify-between">
            <Eyebrow className="border-b border-ink/10 pb-4">Our programs</Eyebrow>
            <p className="hidden text-[0.62rem] font-bold uppercase tracking-[0.24em] text-ink/40 sm:block border-b border-ink/10 pb-4">
              Four tracks / One outcome
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="text-[clamp(2.5rem,4.6vw,4rem)] leading-[0.96] tracking-[-0.045em] text-ink md:text-[clamp(2.8rem,5.2vw,3.6rem)] lg:text-[clamp(2.5rem,4.6vw,4rem)]">
              <RevealLines
                delay={0.1}
                lines={[
                  "Practical digital",
                  "skills for every",
                  <>
                    part of the <span className="font-serif italic text-blue">community</span>.
                  </>,
                ]}
              />
            </h1>
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-ink/65">
                From church leaders and young people to seniors and educators, every program
                starts with real life and builds skills people can use the same day.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Action to="/register" variant="ink">
                  Join a program
                </Action>
                <Action to="/contact" variant="outline">
                  Talk to us
                </Action>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.2} y={30}>
              <div className="rounded-[1.75rem] bg-ink p-6 text-cream sm:p-7">
                <div className="flex items-center justify-between border-b border-cream/10 pb-4">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-cream/45">
                    Programs at a glance
                  </p>
                  <span className="text-[0.62rem] font-semibold tabular-nums text-cream/35">
                    04 tracks
                  </span>
                </div>
                <ul>
                  {programs.map((program) => {
                    const Icon = program.icon;
                    return (
                      <li key={program.id} className="border-b border-cream/10 last:border-0">
                        <Link
                          to={`/programs#${program.id}`}
                          className="group flex items-center gap-3.5 py-3.5"
                        >
                          <span
                            className={`grid size-9 shrink-0 place-items-center rounded-lg ${accents[program.theme].chip}`}
                          >
                            <Icon className="size-4" strokeWidth={1.9} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[0.55rem] font-bold uppercase tracking-[0.2em] text-cream/30">
                              {program.index}
                            </span>
                            <span className="mt-0.5 block truncate font-display text-[0.92rem] font-semibold tracking-tight text-cream/85 transition-colors group-hover:text-cream">
                              {program.title}
                            </span>
                          </span>
                          <ArrowUpRight className="size-4 shrink-0 text-cream/25 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cream" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramRow({ program }: { program: Program }) {
  const Icon = program.icon;
  const accent = accents[program.theme];

  return (
    <article id={program.id} className="scroll-mt-28 border-b border-ink/10 py-10 lg:py-14">
      <div className="grid gap-9 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3.5">
            <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${accent.tile}`}>
              <Icon className="size-5" strokeWidth={1.8} />
            </span>
            <p
              className={`text-[0.62rem] font-bold uppercase leading-snug tracking-[0.2em] ${accent.text}`}
            >
              <span className="mr-1.5 tabular-nums text-ink/30">{program.index}</span>
              {program.tagline}
            </p>
          </div>
          <h3 className="mt-6 max-w-xs font-display text-[clamp(1.45rem,2.4vw,1.85rem)] font-semibold leading-[1.1] tracking-tight text-ink">
            {program.title}
          </h3>
          <p className="mt-3 max-w-sm text-[0.9rem] leading-relaxed text-ink/60">
            {program.description}
          </p>
          <Link
            to={`/register?program=${program.id}`}
            className="group mt-6 inline-flex items-center gap-2 text-[0.82rem] font-bold text-ink"
          >
            <span className="link-line">Register interest</span>
            <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="lg:col-span-8">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-ink/40">
            What you will learn
          </p>
          <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {program.topics.map((topic) => (
              <li key={topic} className="flex items-start gap-2.5">
                <Check className={`mt-0.5 size-3.5 shrink-0 ${accent.check}`} strokeWidth={2.75} />
                <span className="text-[0.84rem] leading-snug text-ink/70">{topic}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-6 border-t border-ink/10 pt-6 sm:flex-row sm:gap-12">
            <div className="sm:flex-1">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-ink/40">
                Who it is for
              </p>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-ink/60">
                {program.who.join(" · ")}
              </p>
            </div>
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-ink/40">
                Delivery
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {program.formats.map((format) => (
                  <span
                    key={format}
                    className="rounded-full border border-ink/10 px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-ink/50"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProgramList() {
  return (
    <section id="tracks" className="relative bg-cream py-16 lg:py-24">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow index="01">The programs</Eyebrow>
            <h2 className="mt-6 max-w-xl text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.98] text-ink">
              Choose the track that fits your community.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="text-[0.95rem] leading-relaxed text-ink/60">
              Each program is practical, patient and shaped with local partners. Join as an
              individual, bring a group, or host a session in your own space.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 border-t border-ink/10">
          {programs.map((program) => (
            <Reveal key={program.id}>
              <ProgramRow program={program} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GetStarted() {
  return (
    <section id="start" className="relative bg-bone py-20 lg:py-24">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow index="02">Getting started</Eyebrow>
            <h2 className="mt-6 max-w-xl text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.98] text-ink">
              From first question to first session.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="text-[0.95rem] leading-relaxed text-ink/60">
              No long forms or technical requirements. Tell us who you want to reach and we will
              take it from there.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {startSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.07}>
              <div className="flex h-full flex-col rounded-[1.5rem] border border-ink/10 bg-cream p-6 sm:p-7">
                <span className="font-display text-[2.2rem] font-semibold leading-none tracking-tighter tabular-nums text-ink/15">
                  {step.number}
                </span>
                <h3 className="mt-6 font-display text-[1.2rem] font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.86rem] leading-relaxed text-ink/60">{step.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCta() {
  return (
    <section className="bg-bone pb-20 lg:pb-28">
      <div className="container-page">
        <div className="grain relative overflow-hidden rounded-[2rem] bg-ink px-7 py-12 text-cream sm:px-10 lg:px-14 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 size-[24rem] rounded-full bg-blue/20 blur-[110px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 left-1/4 size-[20rem] rounded-full bg-green/15 blur-[100px]"
          />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Eyebrow index="03" tone="light">
                Bring a program
              </Eyebrow>
              <h2 className="mt-6 max-w-2xl text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98] text-cream">
                Ready to start?{" "}
                <span className="font-serif italic text-green">Let us build it together.</span>
              </h2>
              <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-cream/60">
                Tell us about your church, school, family or community. We will help you choose a
                program and a format that works.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
              <Action to="/register" variant="light">
                Join a program
              </Action>
              <a
                href="tel:+14432563727"
                className="inline-flex items-center gap-2 text-[0.82rem] font-semibold text-cream/55 transition-colors hover:text-cream"
              >
                <Phone className="size-4" />
                Or call (443) 256-3727
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProgramsPage() {
  usePageMeta(
    "Our Programs | Selftech DigiCommunity",
    "Digital Church Empowerment, Youth Digital Skills Academy, Community Digital Inclusion, and Digital Health and Education."
  );

  return (
    <main id="main">
      <ProgramsHero />
      <ProgramList />
      <GetStarted />
      <ProgramCta />
    </main>
  );
}
