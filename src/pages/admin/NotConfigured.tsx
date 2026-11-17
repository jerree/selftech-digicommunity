export function NotConfigured() {
  return (
    <div className="grid min-h-screen place-items-center bg-bone p-6">
      <div className="w-full max-w-xl rounded-[1.75rem] border border-ink/10 bg-white p-8">
        <span className="inline-flex rounded-full bg-blue-soft px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-blue-deep">
          Setup needed
        </span>
        <h1 className="mt-5 font-display text-[1.8rem] font-semibold leading-tight tracking-tight text-ink">
          Connect the admin area.
        </h1>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/60">
          The backend is not configured on this deployment yet. Add the two Supabase environment
          variables in Vercel (Project → Settings → Environment Variables), then redeploy.
        </p>
        <ol className="mt-5 list-decimal space-y-2 pl-5 text-[0.9rem] leading-relaxed text-ink/70">
          <li>Create a free project at supabase.com.</li>
          <li>
            Open the SQL Editor and run the file <code className="rounded bg-bone px-1.5 py-0.5">supabase/schema.sql</code>{" "}
            from this repository.
          </li>
          <li>
            Copy the Project URL and anon key from Supabase → Settings → API into{" "}
            <code className="rounded bg-bone px-1.5 py-0.5">VITE_SUPABASE_URL</code> and{" "}
            <code className="rounded bg-bone px-1.5 py-0.5">VITE_SUPABASE_ANON_KEY</code>.
          </li>
          <li>
            Create staff logins in Supabase → Authentication → Users, turn off public sign-ups,
            then add each user&apos;s ID to the staff allowlist:
            <pre className="mt-2 overflow-x-auto rounded-lg bg-bone p-3 text-[0.78rem] text-ink/70">
{`insert into public.staff (user_id)
select id from auth.users
where email = 'staff@example.com';`}
            </pre>
          </li>
        </ol>
        <a
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-[0.85rem] font-semibold text-cream"
        >
          Back to the website
        </a>
      </div>
    </div>
  );
}
