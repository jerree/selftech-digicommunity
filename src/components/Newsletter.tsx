import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Mail } from "lucide-react";

const words = ["Learn", "Connect", "Work", "Thrive", "Belong"];

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const reduce = useReducedMotion();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!agreed) {
      setError("Please accept the privacy terms to continue.");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <section id="newsletter" className="relative bg-cream pb-6 pt-6 lg:pb-10">
      <div className="container-page">
        <div
          id="join"
          className="grain relative overflow-hidden rounded-[2rem] bg-ink text-cream"
        >
          <div className="pointer-events-none absolute -left-24 -top-24 size-[26rem] rounded-full bg-blue/25 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-32 right-1/3 size-[24rem] rounded-full bg-green/15 blur-[110px]" />

          <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-white/5 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-cream/60">
                <Mail className="size-3 text-green" />
                Stay in the loop
              </span>

              <h2 className="mt-6 max-w-lg text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.98] text-cream">
                The digital future should include{" "}
                <span className="font-serif font-normal italic text-green">everyone</span>.
              </h2>
              <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-cream/55">
                Get news about upcoming training, events and resources. No noise. No spam.
                Unsubscribe anytime.
              </p>

              {sent ? (
                <motion.div
                  initial={reduce ? undefined : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex items-start gap-4 rounded-2xl border border-green/30 bg-green/10 p-5"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-green text-white">
                    <Check className="size-4.5" strokeWidth={3} />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-cream">
                      You&apos;re on the list.
                    </p>
                    <p className="mt-1 text-[0.82rem] text-cream/55">
                      We&apos;ll be in touch at {email} when something new is coming up.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="mt-8" noValidate>
                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="min-w-0 flex-1 rounded-full border border-cream/15 bg-white/[0.06] px-5 py-3.5 text-[0.9rem] text-cream outline-none transition-colors placeholder:text-cream/30 focus:border-cream/40 focus:bg-white/[0.09]"
                    />
                    <button
                      type="submit"
                      className="group inline-flex items-center justify-between gap-3 rounded-full bg-green py-2 pl-6 pr-2 text-[0.88rem] font-bold text-white transition-colors hover:bg-green-deep"
                    >
                      Subscribe
                      <span className="grid size-9 place-items-center rounded-full bg-white/15 transition-transform duration-500 ease-expo group-hover:rotate-45">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </button>
                  </div>

                  <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-[0.72rem] leading-relaxed text-cream/45">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);
                        setError("");
                      }}
                      className="mt-0.5 size-3.5 shrink-0 accent-green"
                    />
                    <span>
                      I agree that Selftech DigiCommunity may store and use these details to
                      respond to me, as described in the{" "}
                      <a
                        href="/privacy"
                        className="text-cream/75 underline underline-offset-2 hover:text-cream"
                      >
                        privacy policy
                      </a>
                      .
                    </span>
                  </label>

                  {error && (
                    <p role="alert" className="mt-3 text-[0.75rem] font-semibold text-[#ffb4a2]">
                      {error}
                    </p>
                  )}
                </form>
              )}

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-cream/10 pt-6 text-[0.78rem] font-semibold">
                <Link to="/register" className="link-line text-cream/80 hover:text-cream">
                  Join a program
                </Link>
                <Link to="/get-involved" className="link-line text-cream/80 hover:text-cream">
                  Become a partner
                </Link>
                <Link to="/contact" className="link-line text-cream/80 hover:text-cream">
                  Contact us
                </Link>
              </div>
            </div>

            <div className="relative hidden min-h-[30rem] overflow-hidden border-l border-cream/10 lg:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-[26rem] rounded-full border border-cream/10" />
                <div className="absolute size-[19rem] rounded-full border border-cream/[0.07]" />
                <div className="absolute size-[12rem] rounded-full bg-green/10 blur-2xl" />
              </div>
              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2">
                {words.map((word, i) => (
                  <div
                    key={word}
                    className="group flex items-baseline justify-between gap-4 border-b border-cream/10 py-2.5"
                  >
                    <span
                      className={`font-display text-[2.5rem] font-semibold leading-none tracking-tighter transition-colors duration-500 group-hover:text-cream/70 ${
                        i === 0
                          ? "text-cream/70"
                          : i === 1
                            ? "text-cream/35"
                            : i === 2
                              ? "text-cream/20"
                              : "text-cream/10"
                      }`}
                    >
                      {word}
                    </span>
                    <span className="text-[0.6rem] font-bold tabular-nums tracking-[0.2em] text-cream/25">
                      0{i + 1}
                    </span>
                  </div>
                ))}
              </div>
              <div className="absolute inset-x-6 bottom-6 flex items-center justify-between rounded-xl border border-cream/10 bg-ink/40 px-4 py-3 backdrop-blur-md">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-cream/45">
                  Free · Community-led · Practical
                </p>
                <span className="size-1.5 rounded-full bg-green [animation:pulse-dot_2.4s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
