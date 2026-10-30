import { useRef, useState } from "react";
import { steps } from "../lib/site";
import { Eyebrow, TextLink } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function Process() {
  const [hovered, setHovered] = useState<number | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToStep = (index: number) => {
    stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="process" className="relative overflow-hidden bg-cream py-20 lg:py-28">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Eyebrow index="04">How we work</Eyebrow>
                <h2 className="mt-6 text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[0.98] text-ink">
                  A method built on{" "}
                  <span className="font-serif font-normal italic text-blue">listening</span>.
                </h2>
                <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ink/60">
                  We do not arrive with a one-size-fits-all curriculum. We start with the people,
                  then build the program around them. Four clear steps, no guesswork.
                </p>

                <div className="mt-10 hidden lg:block">
                  <div className="flex items-center gap-2">
                    {steps.map((step, i) => (
                      <div key={step.number} className="flex items-center gap-2">
                        {i !== 0 && (
                          <span
                            className={`h-px w-5 transition-colors duration-300 ${
                              hovered === i || hovered === i - 1 ? "bg-green" : "bg-ink/15"
                            }`}
                          />
                        )}
                        <button
                          type="button"
                          onMouseEnter={() => setHovered(i)}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => setHovered(i)}
                          onBlur={() => setHovered(null)}
                          onClick={() => scrollToStep(i)}
                          aria-label={`Jump to step ${step.number}: ${step.title}`}
                          className={`grid size-9 place-items-center rounded-full border font-display text-[0.7rem] font-semibold tabular-nums transition-all duration-300 ${
                            hovered === i
                              ? "scale-110 border-green bg-green text-white"
                              : "border-ink/15 text-ink/40 hover:border-green/50 hover:text-ink/70"
                          }`}
                        >
                          {step.number}
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 flex h-5 items-center text-[0.62rem] font-bold uppercase tracking-[0.22em] text-ink/40">
                    {hovered === null ? (
                      "Four steps, one goal"
                    ) : (
                      <>
                        Step {steps[hovered].number} of 0{steps.length}
                        <span className="ml-2 normal-case tracking-normal text-ink/70">
                          {steps[hovered].title}
                        </span>
                      </>
                    )}
                  </p>
                </div>

                <div className="mt-8">
                  <TextLink href="/contact">Start a conversation</TextLink>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-ink/10">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = hovered === i;
                return (
                  <Reveal key={step.number} delay={0.04}>
                    <div
                      ref={(el) => {
                        stepRefs.current[i] = el;
                      }}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      className="group relative grid grid-cols-[auto_1fr] gap-5 border-b border-ink/10 py-8 sm:gap-8 sm:py-10"
                    >
                      <span
                        className={`absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-green to-blue/0 transition-transform duration-700 ease-expo ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                      <div className="flex flex-col items-center gap-4">
                        <span
                          className={`font-display text-[1.4rem] font-semibold leading-none tabular-nums transition-colors duration-500 sm:text-[1.8rem] ${
                            isActive ? "text-green" : "text-ink/25"
                          }`}
                        >
                          {step.number}
                        </span>
                        <span
                          className={`hidden h-full min-h-10 w-px flex-1 transition-colors duration-500 sm:block ${
                            isActive ? "bg-green/40" : "bg-ink/10"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="max-w-md font-display text-[1.4rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[1.7rem]">
                            {step.title}
                          </h3>
                          <span
                            className={`grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                              isActive
                                ? "border-green/40 bg-green/10 text-green-deep"
                                : "border-ink/10 bg-white/50 text-ink/40"
                            }`}
                          >
                            <Icon className="size-4.5" strokeWidth={1.8} />
                          </span>
                        </div>
                        <p className="mt-3 max-w-lg text-[0.92rem] leading-relaxed text-ink/55">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
