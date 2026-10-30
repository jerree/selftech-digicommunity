import { useState, type ReactNode } from "react";
import { ArrowUpRight, CheckCircle2, Facebook, Instagram, Linkedin, MapPin } from "lucide-react";
import { Eyebrow } from "../components/ui/SectionHeading";
import { Reveal, RevealLines } from "../components/ui/Reveal";
import { Action } from "../components/ui/Action";
import { usePageMeta } from "../lib/usePageMeta";
import { socials } from "../lib/site";

const topics = ["Ask about a program", "Register my interest", "Explore a partnership"];

const socialIcons = { Instagram, Facebook, LinkedIn: Linkedin } as const;

type Values = { topic: string; name: string; email: string; subject: string; message: string; consent: boolean };
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  topic: topics[0],
  name: "",
  email: "",
  subject: topics[0],
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
      <label htmlFor={id} className="block text-[0.9rem] font-semibold text-ink">
        {label}
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

function ContactHero() {
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
            <Eyebrow className="border-b border-ink/10 pb-4">Contact</Eyebrow>
            <p className="hidden text-[0.7rem] font-bold uppercase tracking-[0.24em] text-ink/45 sm:block border-b border-ink/10 pb-4">
              Talk / Register / Partner
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="text-[clamp(2.5rem,4.8vw,4.2rem)] leading-[0.96] tracking-[-0.045em] text-ink">
              <RevealLines
                delay={0.1}
                lines={[
                  "We’d love to",
                  "hear from",
                  <>
                    <span className="font-serif italic text-blue">you</span>.
                  </>,
                ]}
              />
            </h1>
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/70">
                Ask about a program, register your interest, or explore a partnership. Call us or
                send a message and we will get back to you.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Action href="#message" variant="ink">
                  Send a message
                </Action>
                <Action to="/get-involved" variant="outline">
                  Get involved
                </Action>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={30} className="lg:col-span-5">
            <div className="rounded-[1.75rem] bg-ink p-6 text-cream sm:p-8">
              <div className="flex items-center justify-between border-b border-cream/10 pb-4">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-cream/55">
                  Call us
                </p>
                <span className="text-[0.7rem] font-semibold text-cream/45">Two lines</span>
              </div>
              {[
                { label: "Google Voice", number: "(443) 256-3727", tel: "+14432563727" },
                { label: "Additional line", number: "(314) 271-1939", tel: "+13142711939" },
              ].map((line) => (
                <a
                  key={line.tel}
                  href={`tel:${line.tel}`}
                  className="group flex items-center justify-between gap-4 border-b border-cream/10 py-5 last:border-0 last:pb-1"
                >
                  <span>
                    <span className="block text-[0.7rem] font-bold uppercase tracking-[0.16em] text-cream/55">
                      {line.label}
                    </span>
                    <span className="mt-1 block font-display text-[1.6rem] font-semibold tracking-tight">
                      {line.number}
                    </span>
                  </span>
                  <span className="grid size-10 place-items-center rounded-full border border-cream/20 transition-all duration-500 group-hover:rotate-45 group-hover:bg-cream group-hover:text-ink">
                    <ArrowUpRight className="size-4" />
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MessageSection() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<Values | null>(null);

  const update = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((c) => ({ ...c, [key]: value }));
    setErrors((c) => (c[key] ? { ...c, [key]: undefined } : c));
  };

  const pickTopic = (topic: string) => {
    setValues((c) => ({ ...c, topic, subject: topic }));
    setErrors((c) => ({ ...c, subject: undefined }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Enter a valid email address.";
    if (values.subject.trim().length < 2) next.subject = "Add a short subject.";
    if (values.message.trim().length < 10) next.message = "Please tell us a little more.";
    if (!values.consent) next.consent = "Please accept the privacy terms to continue.";
    setErrors(next);

    const first = (["name", "email", "subject", "message", "consent"] as const).find((k) => next[k]);
    if (first) {
      document.getElementById(`ct-${first}`)?.focus();
      return;
    }

    // TODO: send `values` to your backend or email service here.
    // For now the form only validates and shows the confirmation below.
    setDone({ ...values });
  };

  const activeSocials = socials.filter((s) => s.href);

  return (
    <section id="message" className="relative scroll-mt-20 bg-cream py-16 lg:py-24">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <Eyebrow index="01">Write to us</Eyebrow>
            <h2 className="mt-6 text-[clamp(2.1rem,4vw,3.2rem)] leading-[0.98] text-ink">
              Send us a message.
            </h2>
            <div className="mt-8 space-y-6">
              <div>
                <p className="flex items-center gap-2 text-[1rem] font-semibold text-ink">
                  <MapPin className="size-4 text-green-deep" /> Where we work
                </p>
                <p className="mt-1 text-[0.98rem] leading-relaxed text-ink/65">
                  Serving communities across the region, in person and online.
                </p>
              </div>
              <div>
                <p className="text-[1rem] font-semibold text-ink">Follow us</p>
                <p className="mt-1 text-[0.98rem] leading-relaxed text-ink/65">
                  @selftechdigicommunity on Instagram, Facebook and LinkedIn.
                </p>
                {activeSocials.length > 0 && (
                  <div className="mt-3 flex gap-2.5">
                    {activeSocials.map((s) => {
                      const Icon = socialIcons[s.label as keyof typeof socialIcons];
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="grid size-11 place-items-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:bg-ink hover:text-cream"
                        >
                          {Icon && <Icon className="size-[1.1rem]" />}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-8">
            {done ? (
              <div role="status" className="rounded-[1.75rem] border border-ink/10 bg-white p-8 sm:p-10">
                <span className="grid size-12 place-items-center rounded-full bg-green/15 text-green-deep">
                  <CheckCircle2 className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-[1.8rem] font-semibold leading-tight tracking-tight text-ink">
                  Thank you, {done.name.split(" ")[0]}.
                </h3>
                <p className="mt-3 max-w-lg text-[1rem] leading-relaxed text-ink/65">
                  We have your message about “{done.subject}” and will reply to {done.email}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDone(null);
                    setValues(empty);
                    setErrors({});
                  }}
                  className="mt-6 text-[0.92rem] font-bold text-ink"
                >
                  <span className="link-line">Send another message</span>
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
                    {topics.map((topic) => (
                      <label key={topic} className="cursor-pointer">
                        <input
                          type="radio"
                          name="ct-topic"
                          value={topic}
                          checked={values.topic === topic}
                          onChange={() => pickTopic(topic)}
                          className="peer sr-only"
                        />
                        <span className="inline-block rounded-full border border-ink/20 bg-white px-4 py-2.5 text-[0.92rem] font-semibold text-ink transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-focus-visible:ring-4 peer-focus-visible:ring-blue/20">
                          {topic}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <Field id="ct-name" label="Full name" error={errors.name}>
                    <input
                      id="ct-name"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => update("name", e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "ct-name-error" : undefined}
                      className={control(!!errors.name)}
                    />
                  </Field>
                  <Field id="ct-email" label="Email" error={errors.email}>
                    <input
                      id="ct-email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => update("email", e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "ct-email-error" : undefined}
                      className={control(!!errors.email)}
                    />
                  </Field>
                  <Field id="ct-subject" label="Subject" error={errors.subject} className="sm:col-span-2">
                    <input
                      id="ct-subject"
                      value={values.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "ct-subject-error" : undefined}
                      className={control(!!errors.subject)}
                    />
                  </Field>
                  <Field id="ct-message" label="Message" error={errors.message} className="sm:col-span-2">
                    <textarea
                      id="ct-message"
                      rows={6}
                      value={values.message}
                      onChange={(e) => update("message", e.target.value)}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "ct-message-error" : undefined}
                      className={`${control(!!errors.message)} resize-y`}
                    />
                  </Field>
                </div>

                <div className="mt-6">
                  <label className="flex cursor-pointer items-start gap-3 text-[0.92rem] leading-relaxed text-ink/65">
                    <input
                      id="ct-consent"
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
                  Send message
                  <span className="grid size-10 place-items-center rounded-full bg-white/15">
                    <ArrowUpRight className="size-4" />
                  </span>
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  usePageMeta(
    "Contact | Selftech DigiCommunity",
    "Contact Selftech DigiCommunity to ask about a program, register your interest or explore a partnership."
  );

  return (
    <main id="main">
      <ContactHero />
      <MessageSection />
    </main>
  );
}
