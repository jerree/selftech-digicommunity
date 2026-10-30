import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import { Action } from "../components/ui/Action";
import { Eyebrow } from "../components/ui/SectionHeading";
import { Reveal, RevealLines } from "../components/ui/Reveal";
import { usePageMeta } from "../lib/usePageMeta";
import { eventKinds, events, startSteps, type EventKind, type SiteEvent } from "../lib/site";

type Filter = "All" | EventKind;

const pad = (n: number) => String(n).padStart(2, "0");
const keyOf = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

function parseDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ----------------------------------------------------------------- Hero */

function EventsHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-bone pt-[74px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0 [clip-path:inset(74px_0_0_0)]" />
        <div className="absolute -left-24 -top-24 size-[28rem] rounded-full bg-blue-soft blur-[120px]" />
        <div className="absolute -right-24 bottom-0 size-[24rem] rounded-full bg-green/10 blur-[110px]" />
      </div>

      <div className="container-page relative pb-14 pt-6 lg:pb-20 lg:pt-8">
        <Reveal>
          <div className="flex items-end justify-between">
            <Eyebrow className="border-b border-ink/10 pb-4">Training and events</Eyebrow>
            <p className="hidden text-[0.7rem] font-bold uppercase tracking-[0.24em] text-ink/45 sm:block border-b border-ink/10 pb-4">
              Workshops / Webinars / Community
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="text-[clamp(2.5rem,4.8vw,4.2rem)] leading-[0.96] tracking-[-0.045em] text-ink">
              <RevealLines
                delay={0.1}
                lines={[
                  "Workshops, webinars",
                  "and community",
                  <>
                    <span className="font-serif italic text-blue">events</span>.
                  </>,
                ]}
              />
            </h1>
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/70">
                Only confirmed events are listed here, so every date you see is a date you can
                plan around.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Action to="/contact" variant="ink">
                  Ask about a session
                </Action>
                <Action href="#how" variant="outline" icon={ArrowDown}>
                  How sessions work
                </Action>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={30} className="lg:col-span-5">
            <figure className="relative overflow-hidden rounded-[1.75rem]">
              <img
                src="/assets/hero.jpg"
                alt="A trainer helping four young learners use a laptop in a Selftech digital skills class"
                width={1408}
                height={1056}
                className="aspect-[4/3.2] w-full object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 right-4 max-w-[19rem] rounded-2xl bg-ink/90 px-4 py-3 text-cream backdrop-blur">
                <span className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-cream/55">
                  In the classroom
                </span>
                <span className="mt-1 block text-[0.95rem] font-semibold leading-snug">
                  Learning that changes what comes next.
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Schedule */

function MonthCalendar({ upcoming }: { upcoming: SiteEvent[] }) {
  const [offset, setOffset] = useState(0);
  const today = new Date();
  const view = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const year = view.getFullYear();
  const month = view.getMonth();
  const lead = (view.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const marked = useMemo(() => {
    const map = new Map<number, number>();
    for (const event of upcoming) {
      const d = parseDate(event.date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        map.set(d.getDate(), (map.get(d.getDate()) ?? 0) + 1);
      }
    }
    return map;
  }, [upcoming, year, month]);

  const isThisMonth = offset === 0;
  const todayDate = today.getDate();

  return (
    <div className="rounded-[2rem] border border-ink/10 bg-white p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[1.35rem] font-semibold tracking-tight text-[#0a1f4d]">
          {view.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOffset((v) => v - 1)}
            disabled={offset <= 0}
            aria-label="Previous month"
            className="grid size-10 place-items-center rounded-full border border-ink/15 text-[#0a1f4d] transition-colors hover:bg-[#0a1f4d] hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setOffset((v) => v + 1)}
            disabled={offset >= 11}
            aria-label="Next month"
            className="grid size-10 place-items-center rounded-full border border-ink/15 text-[#0a1f4d] transition-colors hover:bg-[#0a1f4d] hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1.5 text-center sm:gap-2">
        {weekdays.map((d) => (
          <span
            key={d}
            className="pb-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#46536c]"
          >
            {d}
          </span>
        ))}
        {Array.from({ length: lead }).map((_, i) => (
          <span key={`e${i}`} aria-hidden="true" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const count = marked.get(day) ?? 0;
          const isToday = isThisMonth && day === todayDate;
          const past = isThisMonth && day < todayDate;
          return (
            <span
              key={day}
              aria-label={
                count
                  ? `${day} ${view.toLocaleDateString("en-GB", { month: "long" })}, ${count} event${count > 1 ? "s" : ""}`
                  : undefined
              }
              className={`relative grid aspect-square place-items-center rounded-xl text-[0.9rem] ${
                isToday
                  ? "bg-[#0b66e4] font-semibold text-white"
                  : count
                    ? "bg-[#17803d] font-semibold text-white"
                    : past
                      ? "border border-dashed border-[#d9d4c6]/70 text-[#46536c]/40"
                      : "border border-dashed border-[#d9d4c6] text-[#46536c]"
              }`}
            >
              {day}
            </span>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink/10 pt-4 text-[0.82rem] text-[#46536c]">
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#0b66e4]" /> Today
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#17803d]" /> Confirmed event
        </span>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: SiteEvent }) {
  const d = parseDate(event.date);
  return (
    <li className="flex gap-5 rounded-[2rem] border border-ink/10 bg-white p-5 sm:p-6">
      <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 flex-col items-center justify-center rounded-2xl bg-[#0a1f4d] text-white">
        <span className="font-display text-[1.7rem] font-semibold leading-none tabular-nums">
          {d.getDate()}
        </span>
        <span className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cream/60">
          {d.toLocaleDateString("en-GB", { month: "short" })}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#17803d]/12 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#17803d]">
            {event.kind}
          </span>
          <span className="rounded-full border border-ink/15 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-ink/60">
            {event.format}
          </span>
        </div>
        <h3 className="mt-3 font-display text-[1.25rem] font-semibold leading-tight tracking-tight text-ink">
          {event.title}
        </h3>
        <ul className="mt-2 space-y-1 text-[0.92rem] text-ink/65">
          {event.time && (
            <li className="flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-ink/40" /> {event.time}
            </li>
          )}
          <li className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-ink/40" /> {event.location}
          </li>
        </ul>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/65">{event.summary}</p>
        <Link
          to={event.registerTo ?? "/register"}
          className="group mt-4 inline-flex items-center gap-2 text-[0.9rem] font-bold text-ink"
        >
          <span className="link-line">Register</span>
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </li>
  );
}

function EmptyState({ filter }: { filter: Filter }) {
  return (
    <div className="flex h-full flex-col justify-center rounded-[2rem] border border-dashed border-[#d9d4c6] bg-white p-7 sm:p-10">
      <CalendarDays className="size-9 text-[#17803d]" strokeWidth={1.6} />
      <h3 className="mt-5 max-w-md font-display text-[clamp(1.6rem,2.8vw,2.1rem)] font-semibold leading-[1.1] tracking-tight text-[#0a1f4d]">
        {filter === "All"
          ? "Check back soon, or ask us about upcoming sessions."
          : `No ${filter.toLowerCase()}s are scheduled right now.`}
      </h3>
      <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-[#46536c]">
        Prefer not to wait? We can bring a workshop to your church, school or community space.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Action to="/contact" variant="ink" className="bg-[#0a1f4d]! hover:bg-[#0e2a63]!">
          Contact us
        </Action>
        <Action to="/#newsletter" variant="outline">
          Get notified
        </Action>
      </div>
    </div>
  );
}

function Schedule() {
  const [filter, setFilter] = useState<Filter>("All");
  const now = new Date();
  const todayKey = keyOf(now.getFullYear(), now.getMonth(), now.getDate());

  const upcoming = useMemo(
    () => events.filter((e) => e.date >= todayKey).sort((a, b) => a.date.localeCompare(b.date)),
    [todayKey]
  );
  const visible = filter === "All" ? upcoming : upcoming.filter((e) => e.kind === filter);
  const countFor = (f: Filter) =>
    f === "All" ? upcoming.length : upcoming.filter((e) => e.kind === f).length;

  return (
    <section id="calendar" className="relative bg-[#f6f4ee] py-16 lg:py-24">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow index="01">On the calendar</Eyebrow>
            <h2 className="mt-6 max-w-xl text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.98] text-[#0a1f4d]">
              {upcoming.length === 0 ? "No upcoming events yet." : "What’s coming up."}
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="text-[1rem] leading-relaxed text-[#46536c]">
              New sessions are added as soon as they are confirmed. Until then, tell us what your
              group needs and we will plan with you.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="mt-10">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by event type">
            {(["All", ...eventKinds] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2.5 text-[0.9rem] font-semibold transition-colors ${
                  filter === f
                    ? "border-[#0a1f4d] bg-[#0a1f4d] text-white"
                    : "border-[#0a1f4d]/15 bg-white text-[#0a1f4d] hover:border-[#0a1f4d]"
                }`}
              >
                {f === "Community event" ? "Community" : f === "All" ? "All" : `${f}s`}
                <span className="ml-2 tabular-nums opacity-60">{countFor(f)}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 grid items-stretch gap-6 lg:grid-cols-12">
          <Reveal delay={0.08} className="lg:col-span-5">
            <MonthCalendar upcoming={upcoming} />
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-7">
            {visible.length === 0 ? (
              <EmptyState filter={filter} />
            ) : (
              <ul className="space-y-4">
                {visible.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </ul>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ How */

function HowSessionsWork() {
  return (
    <section id="how" className="relative bg-[#efece3] py-20 lg:py-24">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow index="02">How sessions work</Eyebrow>
            <h2 className="mt-6 max-w-xl text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.98] text-[#0a1f4d]">
              From first question to first session.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="text-[1rem] leading-relaxed text-[#46536c]">
              No long forms or technical requirements. Tell us who you want to reach and we will
              take it from there.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {startSteps.map((step, i) => {
            const dark = i === 1;
            return (
              <Reveal key={step.number} delay={i * 0.07}>
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 sm:p-9 ${
                    dark ? "bg-[#071a3f]" : "border border-ink/5 bg-white"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute right-6 top-3 select-none font-display text-[5.5rem] font-bold leading-none tracking-tighter tabular-nums ${
                      dark ? "text-[#2a4478]" : "text-[#eeeff2]"
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative h-1.5 w-12 rounded-full ${
                      dark ? "bg-[#4fd186]" : "bg-[#17803d]"
                    }`}
                  />
                  <h3
                    className={`relative mt-5 font-display text-[1.5rem] font-semibold tracking-tight ${
                      dark ? "text-white" : "text-[#0a1f4d]"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`relative mt-4 text-[1rem] leading-8 ${
                      dark ? "text-[#c5d2ec]" : "text-[#46536c]"
                    }`}
                  >
                    {step.copy}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HostCta() {
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
                Host a session
              </Eyebrow>
              <h2 className="mt-6 max-w-2xl text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98] text-cream">
                Want a session in your{" "}
                <span className="font-serif italic text-green">space?</span>
              </h2>
              <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-cream/70">
                In-person workshops, online sessions or hybrid cohorts. Tell us what suits your
                group and we will help you plan it.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
              <Action to="/register" variant="light">
                Join a program
              </Action>
              <a
                href="tel:+14432563727"
                className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-cream/65 transition-colors hover:text-cream"
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

export default function TrainingAndEvents() {
  usePageMeta(
    "Training and Events | Selftech DigiCommunity",
    "Workshops, webinars and community events from Selftech DigiCommunity. Only confirmed events are listed."
  );

  return (
    <main id="main">
      <EventsHero />
      <Schedule />
      <HowSessionsWork />
      <HostCta />
    </main>
  );
}
