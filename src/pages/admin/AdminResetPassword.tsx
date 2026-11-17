import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import { Field, Notice, PrimaryButton, inputClass } from "./ui";
import { NotConfigured } from "./NotConfigured";

type Status = "checking" | "ready" | "invalid" | "done";

export default function AdminResetPassword() {
  const [status, setStatus] = useState<Status>("checking");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    document.title = "Reset password | Selftech DigiCommunity";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    let active = true;

    const cleanUrl = () => {
      window.history.replaceState({}, "", "/admin/reset-password");
    };

    const init = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        const { error: exchangeError } = await client.auth.exchangeCodeForSession(code);
        if (!active) return;
        if (exchangeError) {
          setStatus("invalid");
          return;
        }
        cleanUrl();
        setStatus("ready");
        return;
      }
      const { data } = await client.auth.getSession();
      if (!active) return;
      if (data.session) {
        cleanUrl();
        setStatus("ready");
      } else {
        setStatus("invalid");
      }
    };

    init();

    const { data: listener } = client.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        cleanUrl();
        setStatus("ready");
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!isSupabaseConfigured) return <NotConfigured />;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Those passwords do not match.");
      return;
    }
    setPending(true);
    setError("");
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setPending(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setStatus("done");
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
          {status === "checking" && (
            <p className="py-6 text-center text-[0.9rem] text-ink/45">Checking your link…</p>
          )}

          {status === "invalid" && (
            <>
              <h1 className="font-display text-[1.8rem] font-semibold leading-tight tracking-tight text-ink">
                Link expired
              </h1>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/60">
                This password reset link is invalid or has expired. Request a new one from the sign
                in page.
              </p>
              <Link
                to="/admin/login"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-[0.85rem] font-semibold text-cream"
              >
                Back to sign in
              </Link>
            </>
          )}

          {status === "ready" && (
            <>
              <h1 className="font-display text-[1.8rem] font-semibold leading-tight tracking-tight text-ink">
                Choose a new password
              </h1>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/55">
                Use at least 8 characters. You will stay signed in after saving.
              </p>

              <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
                <Field id="reset-password" label="New password">
                  <input
                    id="reset-password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className={inputClass}
                    required
                  />
                </Field>
                <Field id="reset-confirm" label="Confirm password">
                  <input
                    id="reset-confirm"
                    type="password"
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                    className={inputClass}
                    required
                  />
                </Field>

                {error && <Notice>{error}</Notice>}

                <PrimaryButton type="submit" disabled={pending} className="w-full">
                  {pending ? "Saving…" : "Save new password"}
                </PrimaryButton>
              </form>
            </>
          )}

          {status === "done" && (
            <>
              <h1 className="font-display text-[1.8rem] font-semibold leading-tight tracking-tight text-ink">
                Password updated
              </h1>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/60">
                Your new password is saved and you are signed in.
              </p>
              <Link
                to="/admin"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-[0.85rem] font-semibold text-cream"
              >
                Go to dashboard
              </Link>
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
