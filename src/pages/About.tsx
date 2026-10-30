import {
  Accessibility,
  BookOpen,
  Cpu,
  Eye,
  Globe2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Scale,
  ShieldCheck,
  Sprout,
  Users,
} from "lucide-react";
import { Action } from "../components/ui/Action";
import { Reveal, RevealLines } from "../components/ui/Reveal";
import { Eyebrow } from "../components/ui/SectionHeading";
import { usePageMeta } from "../lib/usePageMeta";

const values = [
  { name: "Inclusion", copy: "Everyone has a place at the table.", icon: Users },
  { name: "Integrity", copy: "We do what we say, and we say what is true.", icon: Scale },
  { name: "Innovation", copy: "We try better ways, then share what works.", icon: Lightbulb },
  { name: "Accessibility", copy: "Clear language, patient teaching, no barriers.", icon: Accessibility },
  { name: "Lifelong learning", copy: "Curiosity at every age and stage.", icon: BookOpen },
  { name: "Community empowerment", copy: "Local people lead local change.", icon: Sprout },
  { name: "Responsible technology", copy: "Safety and ethics before speed.", icon: Cpu },
  { name: "Collaboration", copy: "We go further together.", icon: Handshake },
];

const approach = [
  {
    icon: HeartHandshake,
    title: "Inclusion and accessibility",
    copy: "We design every session, resource and space so that people with different abilities, devices and levels of experience can take part fully.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible technology and AI",
    copy: "We teach safe, ethical and practical use of digital tools, including AI, so people can question what they see and protect what matters.",
  },
  {
    icon: Users,
    title: "Community-centered development",
    copy: "Programs are shaped with the people they serve, not for them, so learning fits real lives, schedules and priorities.",
  },
  {
    icon: Handshake,
    title: "Partnerships and collaboration",
    copy: "We work with churches, schools, local organizations and volunteers to extend reach and keep support going after a session ends.",
  },
];

const audiences = [
  "Churches",
  "Young people",
  "Families",
  "Seniors",
  "Educators",
  "Community groups",
];

const teamAreas = [
  { icon: Users, label: "Leadership and direction" },
  { icon: GraduationCap, label: "Program facilitators" },
  { icon: HeartHandshake, label: "Community partners" },
];

function AboutHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-bone pt-[74px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0 [clip-path:inset(74px_0_0_0)]" />
        <div className="absolute -right-32 -top-24 size-[30rem] rounded-full bg-blue-soft blur-[120px]" />
        <div className="absolute -left-24 bottom-0 size-[24rem] rounded-full bg-green/10 blur-[110px]" />
      </div>
      <div className="container-page relative pb-14 pt-6 lg:pb-20 lg:pt-8">
        <Reveal>
          <div className="flex items-end justify-between">
            <Eyebrow className="border-b border-ink/10 pb-4">About us</Eyebrow>
            <p className="hidden text-[0.62rem] font-bold uppercase tracking-[0.24em] text-ink/40 sm:block border-b border-ink/10 pb-4">
              Digital empowerment / Community development
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="text-[clamp(2.5rem,4.8vw,4.4rem)] leading-[0.96] tracking-[-0.045em] text-ink md:text-[clamp(2.8rem,5.4vw,3.6rem)] lg:text-[clamp(2.5rem,4.8vw,4.4rem)]">
              <RevealLines
                delay={0.1}
                lines={[
                  "Helping every person",
                  "take part in the",
                  <>
                    digital <span className="font-serif italic text-blue">economy</span>.
                  </>,
                ]}
              />
            </h1>
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-ink/65">
                Selftech DigiCommunity is a digital empowerment and community development
                organization. We help people use technology with confidence, safety and purpose.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Action to="/programs" variant="ink">
                  Explore programs
                </Action>
                <Action to="/get-involved" variant="outline">
                  Work with us
                </Action>
              </div>
            </Reveal>
          </div>

          <div className="relative lg:col-span-5">
            <Reveal delay={0.2} y={36}>
              <div className="group relative overflow-hidden rounded-[2rem] bg-ink shadow-[0_40px_80px_-40px_rgba(7,23,47,0.55)]">
                <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-square">
                  <img
                    src="/assets/community.jpg"
                    alt="A volunteer helping an older woman use a smartphone"
                    className="size-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.04]"
                    loading="eager"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-cream/60">
                    In the community
                  </p>
                  <p className="mt-1.5 max-w-xs font-display text-lg font-semibold leading-tight text-cream">
                    People first. Technology second.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="relative bg-cream py-20 lg:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow index="01">Who we are</Eyebrow>
              <h2 className="mt-6 max-w-sm text-[clamp(2rem,3.4vw,3rem)] leading-[1] text-ink">
                We meet people where they are, and stay for what comes next.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 flex items-center gap-4 border-t border-ink/10 pt-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white ring-1 ring-ink/10">
                  <img
                    src="/assets/logo-256.png"
                    alt=""
                    className="size-8 object-contain mix-blend-multiply"
                    width={32}
                    height={32}
                  />
                </span>
                <p className="max-w-[13rem] text-[0.78rem] font-semibold leading-relaxed text-ink/55">
                  A community-first approach to digital confidence.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <Reveal>
            <p className="text-[clamp(1.15rem,1.8vw,1.45rem)] leading-[1.5] text-ink/80">
              Selftech DigiCommunity exists because the digital world moves fast, and too many
              people are being left at the door. We work alongside churches, young people,
              families, seniors and the organizations that serve them, turning everyday
              technology into a tool for learning, connection and opportunity.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-ink/60">
              We are not here to hand out devices or run one-off sessions. We build confidence
              that lasts: patient training, practical resources and partnerships that keep going
              after the workshop ends.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-10">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {audiences.map((audience) => (
                <div
                  key={audience}
                  className="rounded-xl border border-ink/10 bg-white/60 px-4 py-3 text-[0.8rem] font-semibold text-ink/70"
                >
                  {audience}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16} className="mt-10">
            <div className="group relative overflow-hidden rounded-2xl bg-ink">
              <img
                src="/assets/hero.jpg"
                alt="Young learners and an educator working together on laptops"
                className="aspect-[16/9] w-full object-cover opacity-90 transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 max-w-md text-[0.85rem] font-semibold leading-relaxed text-cream">
                Learning that changes what comes next.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section id="mission" className="relative bg-bone py-20 lg:py-28">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <Eyebrow index="02">Mission and vision</Eyebrow>
            <h2 className="mt-6 max-w-lg text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.98] text-ink">
              A clear destination. A practical path.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
            <p className="text-[0.95rem] leading-relaxed text-ink/60">
              Our mission keeps us useful. Our vision keeps us honest. Both are measured by what
              people can do after we leave the room.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal>
            <article className="group relative flex h-full min-h-[23rem] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-ink p-7 text-cream sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-5 top-3 font-display text-[10rem] font-bold leading-[0.8] tracking-tighter text-cream/[0.07] transition-transform duration-700 ease-expo group-hover:-translate-y-2"
              >
                01
              </div>
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-white/10">
                    <Globe2 className="size-5 text-green" />
                  </span>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-cream/50">
                    Our mission
                  </p>
                </div>
                <p className="mt-8 max-w-md text-[clamp(1.2rem,2vw,1.55rem)] font-display font-semibold leading-[1.25] tracking-tight text-cream">
                  A digitally empowered society where every person and community has the skills,
                  resources and opportunities to participate meaningfully in the digital economy.
                </p>
              </div>
              <div className="relative mt-10 flex flex-wrap gap-2 border-t border-cream/10 pt-5">
                {["Skills", "Resources", "Opportunity"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cream/15 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cream/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="group relative flex h-full min-h-[23rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white p-7 sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-5 top-3 font-display text-[10rem] font-bold leading-[0.8] tracking-tighter text-ink/[0.04] transition-transform duration-700 ease-expo group-hover:-translate-y-2"
              >
                02
              </div>
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-blue-soft">
                    <Eye className="size-5 text-blue" />
                  </span>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-ink/45">
                    Our vision
                  </p>
                </div>
                <p className="mt-8 max-w-md text-[clamp(1.2rem,2vw,1.55rem)] font-display font-semibold leading-[1.25] tracking-tight text-ink">
                  A society where everyone can access, understand, and use digital technology
                  confidently, safely, and productively.
                </p>
              </div>
              <div className="relative mt-10 flex flex-wrap gap-2 border-t border-ink/10 pt-5">
                {["Confident", "Safe", "Productive"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink/10 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink/45"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section id="values" className="grain relative overflow-hidden bg-ink py-20 text-cream lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 size-[28rem] rounded-full bg-blue/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-[24rem] rounded-full bg-green/10 blur-[110px]"
      />
      <div className="container-page relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <Eyebrow index="03" tone="light">
              Core values
            </Eyebrow>
            <h2 className="mt-6 max-w-lg text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.98] text-cream">
              What we stand for, in practice.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
            <p className="text-[0.95rem] leading-relaxed text-cream/60">
              Eight commitments guide how we teach, who we partner with and how we handle the
              trust people place in us.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 lg:grid-cols-4">
            {values.map((value, i) => (
              <div
                key={value.name}
                className="group relative flex min-h-[12rem] flex-col items-center justify-center bg-ink px-5 py-8 text-center transition-colors duration-500 hover:bg-cream sm:px-6"
              >
                <span className="absolute right-4 top-4 text-[0.62rem] font-bold tabular-nums tracking-[0.16em] text-cream/35 transition-colors duration-500 group-hover:text-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid size-11 place-items-center rounded-full border border-cream/15 text-green transition-colors duration-500 group-hover:border-ink/10 group-hover:bg-ink/5 group-hover:text-ink">
                  <value.icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-[1.05rem] font-semibold leading-tight tracking-tight text-cream transition-colors duration-500 group-hover:text-ink">
                  {value.name}
                </h3>
                <p className="mt-2 max-w-[13rem] text-[0.75rem] leading-relaxed text-cream/45 transition-colors duration-500 group-hover:text-ink/55">
                  {value.copy}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" className="relative bg-cream py-20 lg:py-28">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <Eyebrow index="04">Our approach</Eyebrow>
            <h2 className="mt-6 max-w-lg text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.98] text-ink">
              How we show up.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
            <p className="text-[0.95rem] leading-relaxed text-ink/60">
              Four principles shape every program, conversation and partnership. They are the
              reason our work holds up after the room clears.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {approach.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <article className="group flex h-full flex-col rounded-[1.5rem] border border-ink/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_24px_60px_-32px_rgba(7,23,47,0.35)] sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-full bg-blue-soft text-blue transition-colors duration-500 group-hover:bg-ink group-hover:text-cream">
                    <item.icon className="size-5" />
                  </span>
                  <span className="text-[0.68rem] font-bold tabular-nums tracking-[0.16em] text-ink/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-14 max-w-xs font-display text-[1.35rem] font-semibold leading-tight tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-[0.9rem] leading-relaxed text-ink/60">
                  {item.copy}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="bg-bone py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <div className="grid gap-10 rounded-[2rem] border border-ink/10 bg-cream p-7 sm:p-10 lg:grid-cols-12 lg:items-center lg:p-12">
            <div className="lg:col-span-7">
              <Eyebrow index="05">Team and leadership</Eyebrow>
              <h2 className="mt-6 max-w-md text-[clamp(2rem,3.6vw,3rem)] leading-[1] text-ink">
                The people behind the work.
              </h2>
              <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink/60">
                Our team brings together trainers, community builders and technology
                professionals who believe digital confidence belongs to everyone. Full profiles
                are on the way.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-ink p-6 text-cream sm:p-7">
                <div className="flex items-center justify-between border-b border-cream/10 pb-5">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-cream/45">
                    Team profiles
                  </p>
                  <span className="rounded-full border border-green/30 bg-green/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-green">
                    Coming soon
                  </span>
                </div>
                <p className="mt-6 font-serif text-[2.6rem] italic leading-none text-cream/85">
                  Soon.
                </p>
                <ul className="mt-6 space-y-1">
                  {teamAreas.map((area) => (
                    <li
                      key={area.label}
                      className="flex items-center gap-3 border-t border-cream/10 py-3 first:border-t-0"
                    >
                      <area.icon className="size-4 shrink-0 text-green" />
                      <span className="text-[0.82rem] font-semibold text-cream/70">
                        {area.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section id="join" className="bg-bone pb-20 pt-4 lg:pb-28">
      <div className="container-page">
        <div className="border-t border-ink/10 pt-16 lg:pt-20">
          <Reveal>
            <Eyebrow index="06">Be part of it</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[0.95] tracking-[-0.04em] text-ink">
              This work grows with{" "}
              <span className="font-serif italic text-blue">people like you</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Action to="/get-involved" variant="ink">
                Get involved
              </Action>
              <Action to="/contact" variant="outline">
                Contact us
              </Action>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-12 grid gap-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
              {[
                { label: "Volunteer", copy: "Share your time and skills." },
                { label: "Partner with us", copy: "Bring a program to your community." },
                { label: "Support the work", copy: "Help more people get started." },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[0.82rem] font-bold text-ink">{item.label}</p>
                  <p className="mt-1 text-[0.8rem] leading-relaxed text-ink/55">{item.copy}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  usePageMeta(
    "About | Selftech DigiCommunity",
    "A digital empowerment and community development organization helping every person take part in the digital economy."
  );

  return (
    <main id="main">
      <AboutHero />
      <Story />
      <MissionVision />
      <Values />
      <Approach />
      <Team />
      <Closing />
    </main>
  );
}
