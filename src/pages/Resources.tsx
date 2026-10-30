import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import { Action } from "../components/ui/Action";
import { Eyebrow } from "../components/ui/SectionHeading";
import { Reveal, RevealLines } from "../components/ui/Reveal";
import { usePageMeta } from "../lib/usePageMeta";
import { resources, resourceTopics, type Resource, type ResourceTopicId } from "../lib/site";

type Filter = "all" | ResourceTopicId;

const topicTitle = (id: ResourceTopicId) => resourceTopics.find((t) => t.id === id)?.title ?? id;
const countFor = (id: ResourceTopicId) => resources.filter((r) => r.topic === id).length;

/* ----------------------------------------------------------------- Hero */

function ResourcesHero() {
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
            <Eyebrow className="border-b border-ink/10 pb-4">Resources</Eyebrow>
            <p className="hidden text-[0.7rem] font-bold uppercase tracking-[0.24em] text-ink/45 sm:block border-b border-ink/10 pb-4">
              Guides / Safety / Learning
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="text-[clamp(2.5rem,4.8vw,4.2rem)] leading-[0.96] tracking-[-0.045em] text-ink">
              <RevealLines
                delay={0.1}
                lines={[
                  "Guides for learning",
                  "and staying",
                  <>
                    <span className="font-serif italic text-blue">safe online</span>.
                  </>,
                ]}
              />
            </h1>
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/70">
                Plain-language articles and how-tos, written for the people we teach.{" "}
                {resources.length === 0
                  ? "The first guides are being prepared now."
                  : "New guides are added as they are published."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Action to="/#newsletter" variant="ink">
                  Get notified
                </Action>
                <Action to="/contact" variant="outline">
                  Suggest a guide
                </Action>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={30} className="lg:col-span-5">
            <div className="rounded-[1.75rem] bg-ink p-6 text-cream sm:p-7">
              <div className="flex items-center justify-between border-b border-cream/10 pb-4">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-cream/55">
                  In the library
                </p>
                <span className="text-[0.7rem] font-semibold tabular-nums text-cream/45">
                  0{resourceTopics.length} topics
                </span>
              </div>
              <ul>
                {resourceTopics.map((topic) => {
                  const Icon = topic.icon;
                  const n = countFor(topic.id);
                  return (
                    <li
                      key={topic.id}
                      className="flex items-center gap-3.5 border-b border-cream/10 py-3.5 last:border-0"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-cream/10 text-cream">
                        <Icon className="size-4" strokeWidth={1.9} />
                      </span>
                      <span className="flex-1 font-display text-[1rem] font-semibold tracking-tight text-cream/90">
                        {topic.title}
                      </span>
                      <span className="rounded-full border border-cream/20 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-cream/60">
                        {n === 0 ? "Soon" : `${n} ${n === 1 ? "guide" : "guides"}`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Guides */

function ResourceCard({ resource }: { resource: Resource }) {
  const external = resource.href.startsWith("http");
  const inner = (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-green/15 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-green-deep">
          {topicTitle(resource.topic)}
        </span>
        <span className="rounded-full border border-ink/15 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-ink/60">
          {resource.type}
        </span>
        {resource.readTime && (
          <span className="flex items-center gap-1.5 text-[0.82rem] text-ink/55">
            <Clock className="size-3.5" /> {resource.readTime}
          </span>
        )}
      </div>
      <h3 className="mt-4 font-display text-[1.3rem] font-semibold leading-tight tracking-tight text-ink">
        {resource.title}
      </h3>
      <p className="mt-2 text-[0.98rem] leading-relaxed text-ink/65">{resource.summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-[0.9rem] font-bold text-ink">
        <span className="link-line">Read</span>
        <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </>
  );
  const cls =
    "group block h-full rounded-[1.5rem] border border-ink/10 bg-white p-6 transition-colors hover:border-ink/30 sm:p-7";
  return external ? (
    <a href={resource.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link to={resource.href} className={cls}>
      {inner}
    </Link>
  );
}

function Guides({ filter, setFilter }: { filter: Filter; setFilter: (f: Filter) => void }) {
  const visible = useMemo(
    () => (filter === "all" ? resources : resources.filter((r) => r.topic === filter)),
    [filter]
  );
  const topicsWithGuides = resourceTopics.filter((t) => countFor(t.id) > 0);

  return (
    <section id="guides" className="relative bg-bone py-16 lg:py-24">
      <div className="container-page">
        <Reveal>
          <Eyebrow index="01">The guides</Eyebrow>
          <h2 className="mt-6 max-w-xl text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.98] text-ink">
            Read, learn, keep for later.
          </h2>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {([{ id: "all", title: "All" }, ...topicsWithGuides] as { id: Filter; title: string }[]).map(
            (t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={filter === t.id}
                onClick={() => setFilter(t.id)}
                className={`rounded-full border px-4 py-2.5 text-[0.9rem] font-semibold transition-colors ${
                  filter === t.id
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/20 bg-white text-ink hover:border-ink"
                }`}
              >
                {t.title}
              </button>
            )
          )}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {visible.map((resource, i) => (
            <Reveal key={resource.id} delay={(i % 2) * 0.06}>
              <ResourceCard resource={resource} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ CTA */

function ResourcesCta() {
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
              <Eyebrow tone="light">
                Stay in the loop
              </Eyebrow>
              <h2 className="mt-6 max-w-2xl text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98] text-cream">
                Be first to know when guides go{" "}
                <span className="font-serif italic text-green">live.</span>
              </h2>
              <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-cream/70">
                One short email when something new is published. No spam, and you can leave any
                time.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
              <Action to="/#newsletter" variant="light">
                Get notified
              </Action>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 text-[0.92rem] font-semibold text-cream/80 transition-colors hover:text-cream"
              >
                <span className="link-line">Suggest a guide</span>
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  const [filter, setFilter] = useState<Filter>("all");

  usePageMeta(
    "Resources | Selftech DigiCommunity",
    "Plain-language guides for learning and staying safe online from Selftech DigiCommunity."
  );

  return (
    <main id="main">
      <ResourcesHero />
      {resources.length > 0 && <Guides filter={filter} setFilter={setFilter} />}
      <ResourcesCta />
    </main>
  );
}
