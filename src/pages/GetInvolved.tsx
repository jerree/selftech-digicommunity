import { useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight, CheckCircle2, Phone } from "lucide-react";
import { Action } from "../components/ui/Action";
import { Eyebrow } from "../components/ui/SectionHeading";
import { Reveal, RevealLines } from "../components/ui/Reveal";
import { usePageMeta } from "../lib/usePageMeta";
import { involvements } from "../lib/site";

type Values = {
  type: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
};
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  type: involvements[0].title,
  name: "",
  organization: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
};

const control = (invalid?: boolean) =>
  `w-full rounded-xl border bg-cream/70 px-4 py-3.5 text-[1rem] text-ink transition-colors placeholder:text-ink/35 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue/10 ${
    invalid ? "border-[#c65a4a]" : "border-ink/15 focus:border-blue"
  }`;

function Field({
  id,
  label,
  optional,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[0.9rem] font-semibold text-ink">
        {label}
        {optional && <span className="ml-1.5 font-normal text-ink/50">(optional)</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.85rem] font-semibold text-[#b03a2e]">
          {error}
        </p>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- Hero */

function InvolvedHero({ onStart }: { onStart: () => void }) {
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
            <Eyebrow className="border-b border-ink/10 pb-4">Get involved</Eyebrow>
            <p className="hidden text-[0.7rem] font-bold uppercase tracking-[0.24em] text-ink/45 sm:block border-b border-ink/10 pb-4">
              Volunteer / Partner / Support
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="text-[clamp(2.5rem,4.8vw,4.2rem)] leading-[0.96] tracking-[-0.045em] text-ink">
              <RevealLines
                delay={0.1}
                lines={[
                  "Help build a",
                  "digitally empowered",
                  <>
                    <span className="font-serif italic text-blue">society</span>.
                  </>,
                ]}
              />
            </h1>
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/70">
                Whether you have an hour, a venue, a laptop or a whole organization behind you,
                there is a place for you in this work.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onStart}
                  className="inline-flex items-center gap-3 rounded-full bg-ink py-1.5 pl-6 pr-1.5 text-[0.95rem] font-semibold text-cream transition-transform hover:-translate-y-0.5"
                >
                  Tell us how you’d help
                  <span className="grid size-10 place-items-center rounded-full bg-white/15">
                    <ArrowDown className="size-4" />
                  </span>
                </button>
                <Action to="/contact" variant="outline">
                  Contact us
                </Action>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={30} className="lg:col-span-5">
            <figure className="relative overflow-hidden rounded-[1.75rem]">
              <img
                src="/assets/community.jpg"
                alt="A Selftech trainer helping an older woman use a smartphone"
                width={1200}
                height={912}
                className="aspect-[4/3.2] w-full object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 right-4 max-w-[19rem] rounded-2xl bg-ink/90 px-4 py-3 text-cream backdrop-blur">
                <span className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-cream/55">
                  In the community
                </span>
                <span className="mt-1 block text-[0.95rem] font-semibold leading-snug">
                  People first. Technology second.
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Ways */

function Ways({ onPick }: { onPick: (title: string) => void }) {
  return (
    <section id="ways" className="relative bg-[#f6f4ee] py-16 lg:py-24">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow index="01">Three ways in</Eyebrow>
            <h2 className="mt-6 max-w-xl text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.98] text-[#0a1f4d]">
              Choose how you’d like to help.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="text-[1rem] leading-relaxed text-[#46536c]">
              Give an hour, share a skill, open a door. Pick a path and we will take it from
              there.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {involvements.map((item, i) => {
            const dark = item.tone === "dark";
            return (
              <Reveal key={item.title} delay={i * 0.07}>
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 sm:p-9 ${
                    dark ? "bg-[#071a3f]" : "border border-[#e2ded2] bg-white"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute right-6 top-3 select-none font-display text-[5.5rem] font-bold leading-none tracking-tighter tabular-nums ${
                      dark ? "text-[#2a4478]" : "text-[#eeeff2]"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative h-1.5 w-12 rounded-full ${
                      dark ? "bg-[#4fd186]" : "bg-[#17803d]"
                    }`}
                  />
                  <h3
                    className={`relative mt-5 font-display text-[1.6rem] font-semibold leading-tight tracking-tight ${
                      dark ? "text-white" : "text-[#0a1f4d]"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`relative mt-4 text-[1rem] leading-8 ${
                      dark ? "text-[#c5d2ec]" : "text-[#46536c]"
                    }`}
                  >
                    {item.copy}
                  </p>
                  <div className="mt-auto pt-8">
                  <button
                    type="button"
                    onClick={() => onPick(item.title)}
                    className={`group relative inline-flex items-center gap-4 self-start rounded-full py-2 pl-7 pr-2 text-[1.02rem] font-semibold tracking-tight transition-colors duration-500 ${
                      dark
                        ? "bg-white text-[#0a1f4d] hover:bg-[#f6f4ee]"
                        : "bg-[#0a1f4d] text-white hover:bg-[#12306e]"
                    }`}
                  >
                    <span>Choose this</span>
                    <span
                      className={`grid size-11 place-items-center rounded-full transition-transform duration-500 ease-expo group-hover:rotate-45 ${
                        dark ? "bg-[#f6f4ee] text-[#0a1f4d]" : "bg-[#31436a] text-white"
                      }`}
                    >
                      <ArrowUpRight className="size-4" />
                    </span>
                  </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Form */

function InvolvedForm({
  values,
  setValues,
  formRef,
}: {
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Values>>;
  formRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<Values | null>(null);

  const update = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((c) => ({ ...c, [key]: value }));
    setErrors((c) => (c[key] ? { ...c, [key]: undefined } : c));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Enter a valid email address.";
    if (values.message.trim().length < 10) next.message = "Tell us a little about how you’d like to help.";
    if (!values.consent) next.consent = "Please accept the privacy terms to continue.";
    setErrors(next);

    const first = (["name", "email", "message", "consent"] as const).find((k) => next[k]);
    if (first) {
      document.getElementById(`gi-${first}`)?.focus();
      return;
    }

    // TODO: send `values` to your backend or email service here.
    // For now the form only validates and shows the confirmation below.
    setDone({ ...values });
  };

  const reset = () => {
    setDone(null);
    setValues(empty);
    setErrors({});
  };

  return (
    <section id="get-involved-form" className="relative bg-bone py-16 lg:py-24">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <Eyebrow index="02">Get started</Eyebrow>
            <h2 className="mt-6 text-[clamp(2.1rem,4vw,3.2rem)] leading-[0.98] text-ink">
              Tell us how you’d like to help.
            </h2>
            <p className="mt-5 max-w-sm text-[1rem] leading-relaxed text-ink/65">
              No long forms. Share a few details and we will take it from there.
            </p>
            <div className="mt-8 rounded-[1.25rem] border border-ink/10 bg-cream p-5">
              <p className="flex items-center gap-2 text-[0.95rem] font-semibold text-ink">
                <Phone className="size-4 text-green-deep" /> Prefer to talk it through?
              </p>
              <p className="mt-1 text-[0.92rem] text-ink/60">Call and a real person will pick up.</p>
              <div className="mt-3 flex flex-col gap-1 text-[0.98rem] font-semibold">
                <a href="tel:+14432563727" className="link-line w-fit text-ink">
                  (443) 256-3727
                </a>
                <a href="tel:+13142711939" className="link-line w-fit text-ink">
                  (314) 271-1939
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-8">
            <div ref={formRef} className="scroll-mt-28">
              {done ? (
                <div role="status" className="rounded-[1.75rem] border border-ink/10 bg-white p-8 sm:p-10">
                  <span className="grid size-12 place-items-center rounded-full bg-green/15 text-green-deep">
                    <CheckCircle2 className="size-6" />
                  </span>
                  <h3 className="mt-6 font-display text-[1.8rem] font-semibold leading-tight tracking-tight text-ink">
                    Thank you, {done.name.split(" ")[0]}.
                  </h3>
                  <p className="mt-3 max-w-lg text-[1rem] leading-relaxed text-ink/65">
                    We have noted that you would like to <strong>{done.type.toLowerCase()}</strong>{" "}
                    and will reach out on {done.email}.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-6 text-[0.92rem] font-bold text-ink"
                  >
                    <span className="link-line">Send another response</span>
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  noValidate
                  className="rounded-[1.75rem] border border-ink/10 bg-white p-6 sm:p-8 lg:p-9"
                >
                  <fieldset>
                    <legend className="text-[0.9rem] font-semibold text-ink">I’d like to</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {involvements.map((item) => (
                        <label key={item.title} className="cursor-pointer">
                          <input
                            type="radio"
                            name="gi-type"
                            value={item.title}
                            checked={values.type === item.title}
                            onChange={() => update("type", item.title)}
                            className="peer sr-only"
                          />
                          <span className="inline-block rounded-full border border-ink/20 bg-white px-4 py-2.5 text-[0.92rem] font-semibold text-ink transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-focus-visible:ring-4 peer-focus-visible:ring-blue/20">
                            {item.title}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <Field id="gi-name" label="Full name" error={errors.name}>
                      <input
                        id="gi-name"
                        autoComplete="name"
                        value={values.name}
                        onChange={(e) => update("name", e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "gi-name-error" : undefined}
                        className={control(!!errors.name)}
                      />
                    </Field>
                    <Field id="gi-organization" label="Organization" optional>
                      <input
                        id="gi-organization"
                        autoComplete="organization"
                        value={values.organization}
                        onChange={(e) => update("organization", e.target.value)}
                        className={control()}
                      />
                    </Field>
                    <Field id="gi-email" label="Email" error={errors.email}>
                      <input
                        id="gi-email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => update("email", e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "gi-email-error" : undefined}
                        className={control(!!errors.email)}
                      />
                    </Field>
                    <Field id="gi-phone" label="Phone" optional>
                      <input
                        id="gi-phone"
                        type="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className={control()}
                      />
                    </Field>
                    <Field
                      id="gi-message"
                      label="How would you like to help?"
                      error={errors.message}
                      className="sm:col-span-2"
                    >
                      <textarea
                        id="gi-message"
                        rows={5}
                        value={values.message}
                        onChange={(e) => update("message", e.target.value)}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "gi-message-error" : undefined}
                        className={`${control(!!errors.message)} resize-y`}
                      />
                    </Field>
                  </div>

                  <div className="mt-6">
                    <label className="flex cursor-pointer items-start gap-3 text-[0.92rem] leading-relaxed text-ink/65">
                      <input
                        id="gi-consent"
                        type="checkbox"
                        checked={values.consent}
                        onChange={(e) => update("consent", e.target.checked)}
                        aria-invalid={!!errors.consent}
                        className="mt-1 size-4.5 accent-green"
                      />
                      <span>
                        I agree that Selftech DigiCommunity may store and use these details to
                        respond to me.
                      </span>
                    </label>
                    {errors.consent && (
                      <p role="alert" className="mt-1.5 text-[0.85rem] font-semibold text-[#b03a2e]">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="mt-7 inline-flex items-center gap-3 rounded-full bg-ink py-1.5 pl-7 pr-1.5 text-[0.98rem] font-semibold text-cream transition-transform hover:-translate-y-0.5"
                  >
                    Send
                    <span className="grid size-10 place-items-center rounded-full bg-white/15">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function GetInvolvedPage() {
  const [values, setValues] = useState<Values>(empty);
  const formRef = useRef<HTMLDivElement>(null);

  usePageMeta(
    "Get Involved | Selftech DigiCommunity",
    "Volunteer, partner or support Selftech DigiCommunity and help build a digitally empowered society."
  );

  const goToForm = (type?: string) => {
    if (type) setValues((c) => ({ ...c, type }));
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => document.getElementById("gi-name")?.focus({ preventScroll: true }), 500);
  };

  return (
    <main id="main">
      <InvolvedHero onStart={() => goToForm()} />
      <Ways onPick={goToForm} />
      <InvolvedForm values={values} setValues={setValues} formRef={formRef} />
    </main>
  );
}
