import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { programs } from "../lib/site";
import { Reveal } from "./ui/Reveal";
import { Eyebrow } from "./ui/SectionHeading";

const theme = {
  blue: {
    card: "bg-white border-ink/10",
    panel: "from-blue-soft/90 to-transparent",
    num: "text-blue/25",
    icon: "bg-blue text-white",
    tag: "text-blue-deep",
    point: "text-ink/70",
    check: "text-blue",
    link: "text-ink",
  },
  green: {
    card: "bg-white border-ink/10",
    panel: "from-green-soft/90 to-transparent",
    num: "text-green/25",
    icon: "bg-green text-white",
    tag: "text-green-deep",
    point: "text-ink/70",
    check: "text-green",
    link: "text-ink",
  },
  teal: {
    card: "bg-white border-ink/10",
    panel: "from-[#e2f1f3] to-transparent",
    num: "text-teal/25",
    icon: "bg-teal text-white",
    tag: "text-[#1d7282]",
    point: "text-ink/70",
    check: "text-teal",
    link: "text-ink",
  },
  ink: {
    card: "bg-ink border-ink text-cream",
    panel: "from-white/[0.08] to-transparent",
    num: "text-cream/15",
    icon: "bg-white/12 text-cream",
    tag: "text-green",
    point: "text-cream/65",
    check: "text-green",
    link: "text-cream",
  },
} as const;

export function Programs() {
  const railRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setProgress(p);
    const card = el.firstElementChild as HTMLElement | null;
    if (card) {
      const step = card.offsetWidth + 20;
      setActive(Math.min(programs.length - 1, Math.round(el.scrollLeft / step)));
    }
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const slide = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section id="programs" className="relative overflow-hidden bg-bone py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-ink/10" />
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Eyebrow index="02">Core programs</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-[clamp(2.2rem,4.4vw,3.7rem)] leading-[0.98] text-ink">
              Four ways we build{" "}
              <span className="font-serif font-normal italic text-blue">digital confidence</span>.
            </h2>
            <Link
              to="/programs"
              className="group mt-6 inline-flex items-center gap-2 text-[0.8rem] font-bold text-ink"
            >
              <span className="link-line">View all programs</span>
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col items-start gap-5 lg:items-end">
            <p className="max-w-xs text-[0.92rem] leading-relaxed text-ink/55 lg:text-right">
              Practical, patient and community-led training. Designed for real people and real
              lives.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => slide(-1)}
                aria-label="Previous programs"
                disabled={progress <= 0.01}
                className="grid size-11 place-items-center rounded-full border border-ink/20 text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-cream disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowLeft className="size-4.5" />
              </button>
              <button
                type="button"
                onClick={() => slide(1)}
                aria-label="Next programs"
                disabled={progress >= 0.99}
                className="grid size-11 place-items-center rounded-full border border-ink/20 text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-cream disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowRight className="size-4.5" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-12">
        <div
          ref={railRef}
          role="region"
          aria-label="Programs carousel"
          tabIndex={0}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse") return;
            const el = railRef.current;
            if (!el) return;
            drag.current = {
              down: true,
              startX: e.clientX,
              startScroll: el.scrollLeft,
              moved: false,
            };
            el.classList.add("cursor-grabbing", "select-none");
          }}
          onPointerMove={(e) => {
            const el = railRef.current;
            if (!el || !drag.current.down) return;
            const dx = e.clientX - drag.current.startX;
            if (Math.abs(dx) > 4) drag.current.moved = true;
            el.scrollLeft = drag.current.startScroll - dx;
          }}
          onPointerUp={() => {
            drag.current.down = false;
            railRef.current?.classList.remove("cursor-grabbing", "select-none");
          }}
          onPointerLeave={() => {
            drag.current.down = false;
            railRef.current?.classList.remove("cursor-grabbing", "select-none");
          }}
          onDragStart={(e) => e.preventDefault()}
          onClickCapture={(e) => {
            if (drag.current.moved) {
              e.preventDefault();
              e.stopPropagation();
              drag.current.moved = false;
            }
          }}
          className="program-rail no-scrollbar flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-4 outline-none focus-visible:ring-2 focus-visible:ring-blue/30"
        >
          {programs.map((program) => {
            const t = theme[program.theme];
            const Icon = program.icon;
            return (
              <article
                key={program.id}
                className={`group relative flex w-[86%] shrink-0 snap-start flex-col overflow-hidden rounded-[1.7rem] border p-6 transition-all duration-500 sm:w-[58%] lg:w-[40%] xl:w-[30.5%] ${t.card} ${
                  program.theme === "ink"
                    ? "hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(7,23,47,0.6)]"
                    : "hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-[0_30px_60px_-35px_rgba(7,23,47,0.35)]"
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b ${t.panel}`}
                />
                <div className="relative flex items-start justify-between">
                  <span
                    className={`grid size-12 place-items-center rounded-xl ${t.icon} shadow-sm transition-transform duration-500 ease-expo group-hover:-rotate-6`}
                  >
                    <Icon className="size-5.5" strokeWidth={1.75} />
                  </span>
                  <span
                    className={`font-display text-[2.6rem] font-semibold leading-none tracking-tighter tabular-nums ${t.num}`}
                  >
                    {program.index}
                  </span>
                </div>

                <p
                  className={`relative mt-7 text-[0.62rem] font-bold uppercase tracking-[0.2em] ${t.tag}`}
                >
                  {program.tagline}
                </p>
                <h3
                  className={`relative mt-2.5 font-display text-[1.35rem] font-semibold leading-[1.12] tracking-tight ${
                    program.theme === "ink" ? "text-cream" : "text-ink"
                  }`}
                >
                  {program.title}
                </h3>
                <p className={`relative mt-3 text-[0.85rem] leading-relaxed ${t.point}`}>
                  {program.description}
                </p>

                <ul
                  className={`relative mt-6 space-y-2.5 border-t pt-5 ${
                    program.theme === "ink" ? "border-cream/10" : "border-ink/10"
                  }`}
                >
                  {program.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <Check
                        className={`mt-0.5 size-3.5 shrink-0 ${t.check}`}
                        strokeWidth={2.75}
                      />
                      <span className={`text-[0.8rem] leading-snug ${t.point}`}>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-auto pt-7">
                  <Link
                    to={`/register?program=${program.id}`}
                    className={`inline-flex items-center gap-2 text-[0.8rem] font-bold ${t.link}`}
                  >
                    <span className="link-line">Join this program</span>
                    <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="container-page mt-2 flex items-center gap-4">
        <div className="h-px flex-1 bg-ink/10">
          <div
            className="h-px origin-left bg-ink transition-transform duration-500"
            style={{ transform: `scaleX(${Math.max(0.08, progress || 0.08)})` }}
          />
        </div>
        <span className="font-display text-[0.7rem] font-semibold tabular-nums tracking-wide text-ink/50">
          0{active + 1} / 0{programs.length}
        </span>
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink/30">
          Swipe or scroll
        </span>
      </div>
    </section>
  );
}
