import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Phone,
  Plus,
} from "lucide-react";
import { programs } from "../lib/site";
import { Action } from "../components/ui/Action";
import { Eyebrow } from "../components/ui/SectionHeading";
import { Reveal, RevealLines } from "../components/ui/Reveal";
import { usePageMeta } from "../lib/usePageMeta";

const formats = ["In-person workshops", "Online sessions", "Hybrid cohorts"];
const levels = ["Complete beginner", "Some experience", "Confident user"];

const tiles = {
  blue: "bg-blue text-white",
  green: "bg-green text-white",
  teal: "bg-teal text-white",
  ink: "bg-ink text-cream",
} as const;

type Values = {
  name: string;
  email: string;
  phone: string;
  location: string;
  program: string;
  format: string;
  experience: string;
  motivation: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  name: "",
  email: "",
  phone: "",
  location: "",
  program: "",
  format: "",
  experience: "",
  motivation: "",
  consent: false,
};

const control = (invalid?: boolean) =>
  `w-full rounded-xl border bg-cream/70 px-4 py-3 text-[0.9rem] text-ink transition-colors placeholder:text-ink/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue/10 ${
    invalid ? "border-[#c65a4a]" : "border-ink/12 focus:border-blue"
  }`;

function Field({
  id,
  label,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink/45"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.72rem] font-semibold text-[#b03a2e]">
          {error}
        </p>
      )}
    </div>
  );
}

function RegisterHero() {
  return (
    <section className="relative overflow-hidden bg-bone pt-[74px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0 [clip-path:inset(74px_0_0_0)]" />
        <div className="absolute -left-24 -top-24 size-[28rem] rounded-full bg-blue-soft blur-[120px]" />
        <div className="absolute -right-24 bottom-0 size-[24rem] rounded-full bg-green/10 blur-[110px]" />
      </div>
      <div className="container-page relative pb-10 pt-6 lg:pb-14 lg:pt-8">
        <Reveal>
          <div className="flex items-end justify-between">
            <Eyebrow className="border-b border-ink/10 pb-4">Join a program</Eyebrow>
            <p className="hidden text-[0.62rem] font-bold uppercase tracking-[0.24em] text-ink/40 sm:block border-b border-ink/10 pb-4">
              Four programs / One form
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid items-end gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="text-[clamp(2.6rem,5vw,4.2rem)] leading-[0.95] tracking-[-0.045em] text-ink">
              <RevealLines
                delay={0.1}
                lines={[
                  "Register for",
                  <>
                    <span className="font-serif italic text-blue">training</span>.
                  </>,
                ]}
              />
            </h1>
          </div>
          <Reveal delay={0.2} className="lg:col-span-5">
            <p className="max-w-md text-[0.98rem] leading-relaxed text-ink/65">
              Fill in your details and you will receive a registration number straight away.
            </p>
            <p className="mt-3 text-[0.8rem] leading-relaxed text-ink/45">
              Prefer to talk first? Call{" "}
              <a
                href="tel:+14432563727"
                className="font-semibold text-ink/70 underline underline-offset-2 hover:text-ink"
              >
                (443) 256-3727
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProgramAside({ selected }: { selected?: (typeof programs)[number] }) {
  const Icon = selected?.icon;
  return (
    <aside className="space-y-4">
      <div className="rounded-[1.75rem] border border-ink/10 bg-cream p-6 sm:p-7">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-ink/40">
          Your program
        </p>

        {selected && Icon ? (
          <>
            <div className="mt-4 flex items-center gap-3">
              <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${tiles[selected.theme]}`}>
                <Icon className="size-5" strokeWidth={1.8} />
              </span>
              <p className="font-display text-[1.02rem] font-semibold leading-tight tracking-tight text-ink">
                {selected.title}
              </p>
            </div>
            <p className="mt-4 text-[0.82rem] leading-relaxed text-ink/60">{selected.description}</p>
            <div className="mt-5 border-t border-ink/10 pt-4">
              <p className="text-[0.56rem] font-bold uppercase tracking-[0.22em] text-ink/40">
                Who it is for
              </p>
              <ul className="mt-2.5 space-y-2">
                {selected.who.map((person) => (
                  <li key={person} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-green" strokeWidth={2.75} />
                    <span className="text-[0.8rem] leading-snug text-ink/65">{person}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="mt-4 text-[0.85rem] leading-relaxed text-ink/60">
            Pick a program in the form and its details will appear here. Not sure yet? Call us and
            we will help you choose.
          </p>
        )}

        <div className="mt-5 border-t border-ink/10 pt-4">
          <p className="text-[0.56rem] font-bold uppercase tracking-[0.22em] text-ink/40">
            Delivery formats
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {formats.map((format) => (
              <span
                key={format}
                className="rounded-full border border-ink/10 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-ink/50"
              >
                {format}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[1.75rem] bg-ink p-6 text-cream sm:p-7">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-cream/40">
          What happens next
        </p>
        <ol className="mt-4 space-y-3">
          {[
            "Submit the form and get your registration number.",
            "We match you with the next available session.",
            "We confirm the format and date with you.",
          ].map((step, i) => (
            <li key={step} className="flex gap-3 border-t border-cream/10 pt-3 first:border-0 first:pt-0">
              <span className="font-display text-[0.68rem] font-semibold tabular-nums text-green">
                0{i + 1}
              </span>
              <span className="text-[0.8rem] leading-snug text-cream/60">{step}</span>
            </li>
          ))}
        </ol>
        <a
          href="tel:+14432563727"
          className="mt-5 inline-flex items-center gap-2 border-t border-cream/10 pt-4 text-[0.8rem] font-semibold text-cream/70 transition-colors hover:text-cream"
        >
          <Phone className="size-4 text-green" />
          Questions first? Call us
        </a>
      </div>
    </aside>
  );
}

function RegisterSection({
  programTitle,
  onProgramChange,
}: {
  programTitle: string;
  onProgramChange: (title: string) => void;
}) {
  const [values, setValues] = useState<Values>({ ...empty, program: programTitle });
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<{ number: string; values: Values } | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const selected = programs.find((program) => program.title === values.program);

  useEffect(() => {
    if (result) resultRef.current?.scrollIntoView({ block: "center" });
  }, [result]);

  const update = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Errors = {};

    if (values.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Enter a valid email address.";
    if (values.phone.replace(/\D/g, "").length < 7)
      next.phone = "Enter a phone number we can reach you on.";
    if (values.location.trim().length < 2) next.location = "Enter your state or location.";
    if (!values.program) next.program = "Choose a program.";
    if (!values.format) next.format = "Choose a training format.";
    if (!values.experience) next.experience = "Select your experience level.";
    if (!values.consent) next.consent = "Please accept the privacy terms to continue.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      const first = (
        ["name", "email", "phone", "location", "program", "format", "experience", "consent"] as const
      ).find((key) => next[key]);
      if (first) document.getElementById(first)?.focus();
      return;
    }

    const number = `SDC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setResult({ number, values: { ...values } });
  };

  const reset = () => {
    setResult(null);
    setCopied(false);
    setValues({ ...empty, program: programTitle });
    setErrors({});
  };

  const copy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.number);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="form" className="bg-cream py-14 lg:py-20">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <ProgramAside selected={selected} />
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-8">
            <div ref={resultRef} className="scroll-mt-28">
              {result ? (
                <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 sm:p-8 lg:p-9">
                  <div className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-green/15 text-green">
                      <CheckCircle2 className="size-6" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-green">
                        Registration received
                      </p>
                      <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-ink">
                        You are on the list.
                      </h2>
                      <p className="mt-3 max-w-md text-[0.88rem] leading-relaxed text-ink/60">
                        Your registration number is ready. Keep it handy for any questions about
                        your registration.
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-dashed border-ink/20 bg-cream p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[0.56rem] font-bold uppercase tracking-[0.22em] text-ink/40">
                        Registration number
                      </p>
                      <p className="mt-1 font-display text-[1.65rem] font-semibold tabular-nums tracking-tight text-ink">
                        {result.number}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={copy}
                      className="inline-flex items-center gap-2 self-start rounded-full border border-ink/15 bg-white px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-ink/60 transition-colors hover:border-ink/30 hover:text-ink sm:self-auto"
                    >
                      {copied ? <Check className="size-3.5 text-green" /> : <Copy className="size-3.5" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>

                  <dl className="mt-6 grid gap-x-8 gap-y-4 border-t border-ink/10 pt-6 sm:grid-cols-2">
                    {[
                      ["Name", result.values.name],
                      ["Program", result.values.program],
                      ["Format", result.values.format],
                      ["Experience", result.values.experience],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-[0.56rem] font-bold uppercase tracking-[0.22em] text-ink/40">
                          {label}
                        </dt>
                        <dd className="mt-1 text-[0.85rem] font-semibold text-ink/75">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-6">
                    <Action to="/programs" variant="ink">
                      Back to programs
                    </Action>
                    <button
                      type="button"
                      onClick={reset}
                      className="link-line text-[0.82rem] font-bold text-ink/60 transition-colors hover:text-ink"
                    >
                      Register another person
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  noValidate
                  className="rounded-[1.75rem] border border-ink/10 bg-white p-6 sm:p-8 lg:p-9"
                >
                  <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 pb-5">
                    <div>
                      <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-ink/40">
                        Registration form
                      </p>
                      <h2 className="mt-2 font-display text-[1.45rem] font-semibold tracking-tight text-ink">
                        Tell us about you
                      </h2>
                    </div>
                    <p className="text-[0.66rem] font-semibold text-ink/35">
                      All fields are required unless marked optional
                    </p>
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Full name" error={errors.name}>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={(event) => update("name", event.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={control(Boolean(errors.name))}
                      />
                    </Field>

                    <Field id="email" label="Email address" error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(event) => update("email", event.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={control(Boolean(errors.email))}
                      />
                    </Field>

                    <Field id="phone" label="Phone number" error={errors.phone}>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={(event) => update("phone", event.target.value)}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={control(Boolean(errors.phone))}
                      />
                    </Field>

                    <Field id="location" label="State or location" error={errors.location}>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        autoComplete="address-level1"
                        value={values.location}
                        onChange={(event) => update("location", event.target.value)}
                        aria-invalid={Boolean(errors.location)}
                        aria-describedby={errors.location ? "location-error" : undefined}
                        className={control(Boolean(errors.location))}
                      />
                    </Field>

                    <Field
                      id="program"
                      label="Program of interest"
                      error={errors.program}
                      className="sm:col-span-2"
                    >
                      <div className="relative">
                        <select
                          id="program"
                          name="program"
                          value={values.program}
                          onChange={(event) => {
                            update("program", event.target.value);
                            onProgramChange(event.target.value);
                          }}
                          aria-invalid={Boolean(errors.program)}
                          aria-describedby={errors.program ? "program-error" : undefined}
                          className={`${control(Boolean(errors.program))} appearance-none pr-10`}
                        >
                          <option value="">Select a program</option>
                          {programs.map((program) => (
                            <option key={program.id} value={program.title}>
                              {program.title}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
                      </div>
                    </Field>

                    <Field id="format" label="Preferred training format" error={errors.format}>
                      <div className="relative">
                        <select
                          id="format"
                          name="format"
                          value={values.format}
                          onChange={(event) => update("format", event.target.value)}
                          aria-invalid={Boolean(errors.format)}
                          aria-describedby={errors.format ? "format-error" : undefined}
                          className={`${control(Boolean(errors.format))} appearance-none pr-10`}
                        >
                          <option value="">Select a format</option>
                          {formats.map((format) => (
                            <option key={format} value={format}>
                              {format}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
                      </div>
                    </Field>

                    <Field id="experience" label="Experience level" error={errors.experience}>
                      <div className="relative">
                        <select
                          id="experience"
                          name="experience"
                          value={values.experience}
                          onChange={(event) => update("experience", event.target.value)}
                          aria-invalid={Boolean(errors.experience)}
                          aria-describedby={errors.experience ? "experience-error" : undefined}
                          className={`${control(Boolean(errors.experience))} appearance-none pr-10`}
                        >
                          <option value="">Select a level</option>
                          {levels.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink/40" />
                      </div>
                    </Field>

                    <Field
                      id="motivation"
                      label="Why would you like to join? (optional)"
                      className="sm:col-span-2"
                    >
                      <textarea
                        id="motivation"
                        name="motivation"
                        rows={4}
                        value={values.motivation}
                        onChange={(event) => update("motivation", event.target.value)}
                        className={`${control()} resize-y`}
                      />
                    </Field>

                    <div className="sm:col-span-2">
                      <label className="flex cursor-pointer items-start gap-3 text-[0.78rem] leading-relaxed text-ink/55">
                        <input
                          id="consent"
                          name="consent"
                          type="checkbox"
                          checked={values.consent}
                          onChange={(event) => update("consent", event.target.checked)}
                          aria-invalid={Boolean(errors.consent)}
                          aria-describedby={errors.consent ? "consent-error" : undefined}
                          className="mt-0.5 size-4 shrink-0 accent-blue"
                        />
                        <span>
                          I agree that Selftech DigiCommunity may store and use these details to
                          respond to me, as described in the{" "}
                          <Link
                            to="/privacy"
                            className="font-semibold text-ink underline underline-offset-2 hover:text-blue-deep"
                          >
                            privacy policy
                          </Link>
                          .
                        </span>
                      </label>
                      {errors.consent && (
                        <p id="consent-error" role="alert" className="mt-1.5 text-[0.72rem] font-semibold text-[#b03a2e]">
                          {errors.consent}
                        </p>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-4 sm:col-span-2">
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-[0.92rem] font-semibold tracking-tight text-cream transition-colors duration-500 hover:bg-ink-2"
                      >
                        Submit registration
                        <span className="grid size-9 place-items-center rounded-full bg-white/12 transition-transform duration-500 ease-expo group-hover:rotate-45">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </button>
                      <p className="text-[0.72rem] leading-relaxed text-ink/40">
                        Takes a few minutes. No account needed.
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function UpcomingEvents({ programTitle }: { programTitle: string }) {
  const selected = programs.find((program) => program.title === programTitle);

  return (
    <section id="events" className="bg-bone py-16 lg:py-24">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Upcoming events</Eyebrow>
            <h2 className="mt-6 max-w-md text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.98] text-ink">
              Sessions and workshops will show up here.
            </h2>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-ink/60">
              Only confirmed events are listed. Check back soon, or talk to us about hosting a
              session in your community.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Action to="/contact" variant="ink">
                Talk to us
              </Action>
              <Action to="/programs" variant="outline">
                Browse programs
              </Action>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="rounded-[1.75rem] border border-dashed border-ink/20 bg-cream p-7 sm:p-9">
              <span className="grid size-12 place-items-center rounded-xl bg-white text-ink/40 ring-1 ring-ink/10">
                <CalendarDays className="size-5" strokeWidth={1.8} />
              </span>
              <p className="mt-6 font-display text-[1.3rem] font-semibold tracking-tight text-ink">
                No events scheduled
              </p>
              <p className="mt-2 max-w-md text-[0.88rem] leading-relaxed text-ink/55">
                {selected
                  ? `Upcoming sessions for ${selected.title} will be listed here.`
                  : "Upcoming sessions will be listed here."}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const generalFaqs = [
  {
    question: "Do I need technical experience to join?",
    answer: "No. Sessions start from the basics and are designed for complete beginners.",
  },
  {
    question: "Can you run a workshop in our community?",
    answer: "Yes. Contact us to discuss hosting a workshop for your group.",
  },
  {
    question: "Can I register on behalf of a group?",
    answer: "Yes. Individuals, churches, schools and organizations are all welcome.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "You receive a registration number straight away, and we match you with the next available session.",
  },
];

function Faqs({ programTitle }: { programTitle: string }) {
  const selected = programs.find((program) => program.title === programTitle);
  const faqs = selected?.faqs ?? generalFaqs;

  return (
    <section id="faq" className="bg-cream py-16 lg:py-24">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Frequently asked questions</Eyebrow>
            <h2 className="mt-6 max-w-sm text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.98] text-ink">
              Questions, <span className="font-serif italic text-blue">answered</span>.
            </h2>
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-ink/60">
              {selected
                ? `Common questions about ${selected.title}.`
                : "Common questions about joining a program."}
            </p>
            <p className="mt-6 text-[0.8rem] leading-relaxed text-ink/45">
              Still unsure? Call{" "}
              <a
                href="tel:+14432563727"
                className="font-semibold text-ink/70 underline underline-offset-2 hover:text-ink"
              >
                (443) 256-3727
              </a>{" "}
              or{" "}
              <Link
                to="/contact"
                className="font-semibold text-ink/70 underline underline-offset-2 hover:text-ink"
              >
                contact us
              </Link>
              .
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-8">
            <div className="border-t border-ink/10">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-ink/10">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-[1rem] font-semibold leading-snug tracking-tight text-ink sm:text-[1.08rem]">
                      {faq.question}
                    </span>
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-ink/15 text-ink/45 transition-colors duration-300 group-open:border-ink group-open:bg-ink group-open:text-cream">
                      <Plus className="size-4 transition-transform duration-300 group-open:rotate-45" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-5 pr-10 text-[0.88rem] leading-relaxed text-ink/60">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function RegisterPage() {
  const [params] = useSearchParams();
  const [programTitle, setProgramTitle] = useState(
    programs.find((program) => program.id === (params.get("program") ?? ""))?.title ?? ""
  );

  usePageMeta(
    "Join a Program | Selftech DigiCommunity",
    "Register for a Selftech DigiCommunity digital skills program."
  );

  return (
    <main id="main">
      <RegisterHero />
      <RegisterSection programTitle={programTitle} onProgramChange={setProgramTitle} />
      <UpcomingEvents programTitle={programTitle} />
      <Faqs programTitle={programTitle} />
    </main>
  );
}
