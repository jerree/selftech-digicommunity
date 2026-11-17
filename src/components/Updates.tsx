import { ArrowUpRight, CalendarDays, MapPin, Megaphone, Quote, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { usePublishedEvents, useStories } from "../lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

export function Updates() {
  const events = usePublishedEvents();
  const stories = useStories();
  const now = new Date();
  const todayKey = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const next = (events ?? [])
    .filter((event) => event.date >= todayKey)
    .sort((a, b) => a.date.localeCompare(b.date))[0];
  const nextDate = next ? new Date(`${next.date}T00:00:00`) : null;
  const story = (stories ?? [])[0];

  return (
    <section id="events" className="relative overflow-hidden bg-bone py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Eyebrow index="05">Training & stories</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-[clamp(2.2rem,4.4vw,3.7rem)] leading-[0.98] text-ink">
              The next chapter is{" "}
              <span className="font-serif font-normal italic text-green">being written</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-ink/55">
              New sessions, real stories and community milestones will appear here as they
              happen. Come back soon, or be part of the first ones.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <div className="group relative flex h-full min-h-[24rem] flex-col overflow-hidden rounded-[1.7rem] bg-ink p-7 text-cream sm:p-9">
              <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full border border-cream/10" />
              <div className="pointer-events-none absolute -right-6 top-16 size-40 rounded-full bg-blue/20 blur-3xl" />
              <CalendarDays
                className="pointer-events-none absolute -bottom-8 -right-6 size-48 text-cream/[0.04]"
                strokeWidth={1}
              />

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-cream/50">
                  <span className="size-1.5 rounded-full bg-green [animation:pulse-dot_2.4s_ease-in-out_infinite]" />
                  Training & events
                </span>
                <span className="rounded-full border border-cream/15 px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.16em] text-cream/45">
                  {nextDate ? nextDate.getFullYear() : "2026"}
                </span>
              </div>

              {next && nextDate ? (
                <div className="relative mt-auto pt-16">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-cream/15 bg-cream/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-cream/75">
                      {next.kind}
                    </span>
                    <span className="rounded-full border border-cream/15 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-cream/55">
                      {next.format}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[1.8rem] font-semibold leading-[1.1] tracking-tight text-cream">
                    {next.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-[0.88rem] leading-relaxed text-cream/55">
                    {next.summary}
                  </p>
                  <div className="mt-4 space-y-1.5 text-[0.82rem] text-cream/60">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="size-3.5 text-cream/40" />
                      {nextDate.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      {next.time ? ` · ${next.time}` : ""}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="size-3.5 text-cream/40" />
                      {next.location}
                    </p>
                  </div>

                  <Link
                    to="/training-events"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream py-2 pl-5 pr-2 text-[0.85rem] font-bold text-ink transition-colors hover:bg-white"
                  >
                    See event details
                    <span className="grid size-8 place-items-center rounded-full bg-ink text-cream">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="relative mt-auto pt-16">
                  <h3 className="font-display text-[1.8rem] font-semibold leading-[1.1] tracking-tight text-cream">
                    No upcoming events
                    <br />
                    on the calendar yet.
                  </h3>
                  <p className="mt-4 max-w-sm text-[0.88rem] leading-relaxed text-cream/55">
                    New workshops, webinars and community clinics will appear here once they are
                    announced. Subscribers hear about them first.
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-2">
                    {["Workshops", "Webinars", "Community clinics"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-cream/15 px-3 py-1.5 text-[0.65rem] font-semibold text-cream/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/training-events"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream py-2 pl-5 pr-2 text-[0.85rem] font-bold text-ink transition-colors hover:bg-white"
                  >
                    Get notified
                    <span className="grid size-8 place-items-center rounded-full bg-ink text-cream">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="group relative flex h-full min-h-[24rem] flex-col overflow-hidden rounded-[1.7rem] border border-ink/10 bg-cream p-7 sm:p-9">
              <div className="pointer-events-none absolute -bottom-20 -left-16 size-56 rounded-full bg-green/[0.07] blur-2xl" />
              <div className="flex items-center justify-between">
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-ink/45">
                  Success stories
                </span>
                <Quote className="size-7 text-green/30" strokeWidth={1.75} />
              </div>

              {story ? (
                <div className="mt-auto pt-16">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-green-soft text-green-deep">
                      <Quote className="size-4" />
                    </span>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/40">
                      From the community
                    </span>
                  </div>

                  <h3 className="font-display text-[1.5rem] font-semibold leading-[1.15] tracking-tight text-ink">
                    {story.title}
                  </h3>
                  <blockquote className="mt-4 border-l-2 border-green/40 pl-4 text-[0.95rem] leading-relaxed text-ink/65">
                    “{story.quote}”
                  </blockquote>
                  {(story.author || story.program) && (
                    <p className="mt-3 text-[0.82rem] font-semibold text-ink/50">
                      {story.author}
                      {story.author && story.program ? " · " : ""}
                      {story.program}
                    </p>
                  )}

                  <Link
                    to="/programs"
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/20 py-2 pl-5 pr-2 text-[0.85rem] font-bold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
                  >
                    Find a program
                    <span className="grid size-8 place-items-center rounded-full bg-ink text-cream transition-colors group-hover:bg-white/15">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="mt-auto pt-16">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex -space-x-2">
                      <span className="grid size-9 place-items-center rounded-full border-2 border-cream bg-blue-soft text-blue-deep">
                        <Users className="size-4" />
                      </span>
                      <span className="grid size-9 place-items-center rounded-full border-2 border-cream bg-green-soft text-green-deep">
                        <Megaphone className="size-4" />
                      </span>
                    </span>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/40">
                      Collecting field notes
                    </span>
                  </div>

                  <h3 className="font-display text-[1.8rem] font-semibold leading-[1.1] tracking-tight text-ink">
                    Stories coming soon.
                  </h3>
                  <p className="mt-4 max-w-sm text-[0.88rem] leading-relaxed text-ink/55">
                    We&apos;ll share real experiences from participants and communities as they are
                    collected, with their permission, in their own words.
                  </p>

                  <Link
                    to="/programs"
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/20 py-2 pl-5 pr-2 text-[0.85rem] font-bold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
                  >
                    Find a program
                    <span className="grid size-8 place-items-center rounded-full bg-ink text-cream transition-colors group-hover:bg-white/15">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
