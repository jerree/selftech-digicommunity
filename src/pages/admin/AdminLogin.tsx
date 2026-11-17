import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import { Field, Notice, PrimaryButton, inputClass } from "./ui";
import { NotConfigured } from "./NotConfigured";

export default function AdminLogin() {
  const [mode, setMode] = useState<"signin" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin sign in | Selftech DigiCommunity";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) navigate("/admin", { replace: true });
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  if (!isSupabaseConfigured) return <NotConfigured />;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setPending(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setPending(false);
    if (signInError) {
      setError("That email and password did not match. Please try again.");
      return;
    }
    navigate("/admin", { replace: true });
  };

  const sendReset = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    const address = email.trim();
    if (!address) {
      setError("Enter your email address first.");
      return;
    }
    setPending(true);
    setError("");
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(address, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    setPending(false);
    if (resetError) {
      setError("We could not send the reset email. Please try again.");
      return;
    }
    setResetSent(true);
  };

  const showForgot = () => {
    setMode("forgot");
    setError("");
    setResetSent(false);
  };

  const showSignIn = () => {
    setMode("signin");
    setError("");
    setResetSent(false);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-bone px-5 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-baseline justify-center gap-2">
          <span className="font-display text-[1.35rem] font-semibold tracking-tight text-ink">
            Selftech
          </span>
          <span className="rounded-full border border-ink/20 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-ink/50">
            Admin
          </span>
        </Link>

        <div className="mt-8 rounded-[1.75rem] border border-ink/10 bg-white p-7 sm:p-9">
          {mode === "signin" ? (
            <>
              <h1 className="font-display text-[1.8rem] font-semibold leading-tight tracking-tight text-ink">
                Staff sign in
              </h1>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/55">
                Use the email and password created for you in Supabase.
              </p>

              <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
                <Field id="admin-email" label="Email">
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={inputClass}
                    required
                  />
                </Field>
                <Field id="admin-password" label="Password">
                  <input
                    id="admin-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className={inputClass}
                    required
                  />
                </Field>

                {error && <Notice>{error}</Notice>}

                <PrimaryButton type="submit" disabled={pending} className="w-full">
                  {pending ? "Signing in…" : "Sign in"}
                </PrimaryButton>

                <button
                  type="button"
                  onClick={showForgot}
                  className="mx-auto block text-[0.8rem] font-semibold text-ink/55 underline underline-offset-2 hover:text-ink"
                >
                  Forgot password?
                </button>
              </form>
            </>
          ) : resetSent ? (
            <>
              <h1 className="font-display text-[1.8rem] font-semibold leading-tight tracking-tight text-ink">
                Check your inbox
              </h1>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/60">
                If that email has an account, a reset link is on its way. Open it on this device to
                choose a new password.
              </p>
              <button
                type="button"
                onClick={showSignIn}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-[0.85rem] font-semibold text-cream"
              >
                Back to sign in
              </button>
            </>
          ) : (
            <>
              <h1 className="font-display text-[1.8rem] font-semibold leading-tight tracking-tight text-ink">
                Reset your password
              </h1>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/55">
                Enter the email address used for your staff account and we will send a reset link.
              </p>

              <form onSubmit={sendReset} className="mt-7 space-y-4" noValidate>
                <Field id="reset-email" label="Email">
                  <input
                    id="reset-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={inputClass}
                    required
                  />
                </Field>

                {error && <Notice>{error}</Notice>}

                <PrimaryButton type="submit" disabled={pending} className="w-full">
                  {pending ? "Sending…" : "Send reset link"}
                </PrimaryButton>

                <button
                  type="button"
                  onClick={showSignIn}
                  className="mx-auto block text-[0.8rem] font-semibold text-ink/55 underline underline-offset-2 hover:text-ink"
                >
                  Back to sign in
                </button>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-[0.8rem] text-ink/45">
          <Link to="/" className="font-semibold text-ink/65 underline underline-offset-2 hover:text-ink">
            Back to the website
          </Link>
        </p>
      </div>
    </div>
  );
}
