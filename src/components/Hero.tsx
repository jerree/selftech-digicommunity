import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Sparkles } from "lucide-react";
import { Action } from "./ui/Action";
import { Marquee } from "./ui/Marquee";
import { RevealLines } from "./ui/Reveal";

const ticker = [
  "Now enrolling: Youth Digital Skills Academy",
  "Free community digital literacy workshops",
  "Church website & communications support",
  "Responsible AI training for ministries",
  "Community partnerships open for 2026",
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mainY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const smallY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, 55]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-bone pt-[74px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0" />
        <div className="absolute -top-40 right-[-10%] size-[38rem] rounded-full bg-blue/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-5%] size-[30rem] rounded-full bg-green/10 blur-[110px]" />
      </div>

      <div className="relative border-b border-ink/10 bg-ink text-cream">
        <div className="flex items-center">
          <div className="hidden shrink-0 items-center gap-2 border-r border-white/12 px-6 py-2.5 text-[0.62rem] font-bold uppercase tracking-[0.26em] text-cream/90 sm:flex">
            <span className="size-1.5 rounded-full bg-green [animation:pulse-dot_2.4s_ease-in-out_infinite]" />
            Enrollment open
          </div>
          <Marquee
            duration={44}
            className="min-w-0 flex-1 py-2.5 [mask-image:linear-gradient(to_right,transparent,black_1.5%,black_98.5%,transparent)]"
          >
            {ticker.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-6 whitespace-nowrap px-6 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-cream/60"
              >
                {item}
                <Sparkles className="size-3 text-green/70" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      <div className="container-page relative pb-16 pt-12 lg:pb-24 lg:pt-16">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="relative z-10 lg:col-span-7">
            <div className="mb-7 flex items-center gap-3 overflow-hidden text-[0.66rem] font-bold uppercase tracking-[0.26em] text-ink/55">
              <span className="h-px w-9 bg-green" />
              Digital skills · Stronger communities
            </div>

            <h1 className="text-[clamp(2.9rem,6.2vw,5.5rem)] leading-[0.92] tracking-[-0.045em] text-ink">
              <RevealLines
                lines={[
                  "The digital",
                  "future should",
                  <>
                    include{" "}
                    <span className="relative font-serif font-normal italic tracking-[-0.02em] text-blue underline decoration-green/60 decoration-[0.055em] underline-offset-[0.17em]">everyone</span>
                    .
                  </>,
                ]}
                delay={0.15}
              />
            </h1>

            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-[34rem] text-[1.02rem] leading-relaxed text-ink/65 sm:text-[1.08rem]"
            >
              We equip individuals, churches, young people, families and underserved
              communities with the digital skills, resources and opportunities to thrive in a
              connected world.
            </motion.p>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Action to="/programs" variant="ink">
                Explore our programs
              </Action>
              <Action to="/get-involved" variant="outline">
                Partner with us
              </Action>
            </motion.div>

            <motion.div
              initial={reduce ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.15 }}
              className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-ink/10 pt-6 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink/45"
            >
              {["Churches", "Youth", "Families", "Seniors", "Communities"].map((item, i) => (
                <span key={item} className="flex items-center gap-5">
                  {i !== 0 && <span className="size-1 rounded-full bg-ink/20" />}
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-[30rem] lg:max-w-none">
              <div className="absolute -right-3 -top-3 size-24 rounded-full border border-green/30" />

              <motion.div
                initial={reduce ? undefined : { opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={reduce ? undefined : { y: mainY }}
                className="relative z-10 overflow-hidden rounded-[2rem] bg-ink shadow-[0_40px_80px_-40px_rgba(7,23,47,0.55)]"
              >
                <div className="aspect-[4/5]">
                  <img
                    src="/assets/hero.jpg"
                    alt="Young learners and an educator working together on laptops"
                    className="size-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-cream/60">
                      Inside the classroom
                    </p>
                    <p className="mt-1.5 font-display text-lg font-semibold leading-tight text-cream">
                      Learning that changes
                      <br />
                      what comes next.
                    </p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-cream/25 bg-white/10 backdrop-blur-md">
                    <ArrowDown className="size-4 -rotate-45 text-cream" />
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={reduce ? undefined : { opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={reduce ? undefined : { y: smallY }}
                className="absolute -left-4 -top-4 z-20 w-32 overflow-hidden rounded-2xl border-4 border-bone bg-sand shadow-2xl sm:-left-5 sm:-top-5 sm:w-36"
              >
                <div className="aspect-[4/3]">
                  <img
                    src="/assets/community.jpg"
                    alt="A volunteer helping an older woman use a smartphone"
                    className="size-full object-cover"
                    loading="eager"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                style={reduce ? undefined : { y: badgeY }}
                className="absolute -right-2 top-8 z-20 w-[12.5rem] rounded-2xl border border-ink/10 bg-cream/95 p-4 shadow-[0_20px_50px_-20px_rgba(7,23,47,0.35)] backdrop-blur-md sm:-right-6"
              >
                <div className="flex items-center gap-2">
                  <span className="flex shrink-0 -space-x-2">
                    <span className="size-6 rounded-full border-2 border-cream bg-blue" />
                    <span className="size-6 rounded-full border-2 border-cream bg-green" />
                    <span className="size-6 rounded-full border-2 border-cream bg-teal" />
                  </span>
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-ink/45">
                    Four programs
                  </span>
                </div>
                <p className="mt-3 font-display text-[1.35rem] font-semibold leading-none tracking-tight text-ink">
                  One mission<span className="text-blue">.</span>
                </p>
                <p className="mt-1.5 text-[0.72rem] leading-snug text-ink/55">
                  Digital confidence, built with community.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-ink/10">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-5">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.26em] text-ink/40">
            Working alongside
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[0.8rem] font-semibold text-ink/55">
            <span>Churches</span>
            <span>Schools</span>
            <span>NGOs</span>
            <span>Small businesses</span>
            <span>Public agencies</span>
          </div>
        </div>
      </div>
    </section>
  );
}
