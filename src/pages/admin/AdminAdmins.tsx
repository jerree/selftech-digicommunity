import { useCallback, useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import { supabase } from "../../lib/supabase";
import {
  AdminPageHeader,
  DangerButton,
  EmptyState,
  Field,
  Loading,
  Notice,
  PrimaryButton,
  formatDate,
  formatDateTime,
  inputClass,
} from "./ui";

type AdminRow = {
  userId: string;
  createdAt: string;
  email: string;
  lastSignInAt: string | null;
};

async function callAdmins(body: Record<string, unknown>) {
  if (!supabase) throw new Error("The backend is not configured.");
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("Your session expired. Sign in again.");
  const response = await fetch("/api/admins", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  if (response.status === 404) {
    throw new Error("The admins API is only available on the deployed site.");
  }
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(payload?.error || "Request failed.");
  return payload;
}

export default function AdminAdmins() {
  const [rows, setRows] = useState<AdminRow[] | null>(null);
  const [callerId, setCallerId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [removingId, setRemovingId] = useState("");

  const load = useCallback(async () => {
    try {
      const data = await callAdmins({ action: "list" });
      setRows(data.admins as AdminRow[]);
      setCallerId(data.callerId as string);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load admins.");
      setRows([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addAdmin = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError("");
    setNotice("");
    try {
      await callAdmins({ action: "create", email: email.trim(), password });
      setNotice(
        "Admin added. Share the temporary password with them — they can change it with Forgot password on the sign in page."
      );
      setEmail("");
      setPassword("");
      await load();
    } catch (addError) {
      setError(addError instanceof Error ? addError.message : "Could not add the admin.");
    } finally {
      setPending(false);
    }
  };

  const removeAdmin = async (userId: string) => {
    if (!window.confirm("Remove this person's admin access and delete their login?")) return;
    setRemovingId(userId);
    setError("");
    setNotice("");
    try {
      await callAdmins({ action: "remove", userId });
      setNotice("Admin removed.");
      await load();
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : "Could not remove the admin.");
    } finally {
      setRemovingId("");
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Admins"
        description="People who can sign in and manage this dashboard. All admins have the same access."
      />

      {error && <Notice>{error}</Notice>}
      {notice && <Notice tone="success">{notice}</Notice>}

      <form onSubmit={addAdmin} className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <p className="font-display text-[1.05rem] font-semibold text-ink">Add an admin</p>
        <p className="mt-1 text-[0.85rem] text-ink/55">
          Creates a confirmed login and adds it to the staff list.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field id="admin-new-email" label="Email">
            <input
              id="admin-new-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
              placeholder="name@example.com"
              required
            />
          </Field>
          <Field id="admin-new-password" label="Temporary password" hint="At least 8 characters">
            <input
              id="admin-new-password"
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
              placeholder="Share this with them securely"
              required
            />
          </Field>
        </div>
        <div className="mt-4">
          <PrimaryButton type="submit" disabled={pending}>
            <UserPlus className="size-4" />
            {pending ? "Adding…" : "Add admin"}
          </PrimaryButton>
        </div>
      </form>

      {rows === null ? (
        <Loading />
      ) : rows.length === 0 ? (
        <EmptyState title="No admins found">
          The staff list is empty or could not be loaded.
        </EmptyState>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
          <table className="w-full text-left">
            <thead className="bg-bone text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink/45">
              <tr>
                <th className="px-5 py-3">Email</th>
                <th className="hidden px-5 py-3 sm:table-cell">Added</th>
                <th className="hidden px-5 py-3 lg:table-cell">Last sign in</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const isSelf = row.userId === callerId;
                return (
                  <tr key={row.userId} className="border-t border-ink/10">
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[0.9rem] font-semibold text-ink">{row.email}</span>
                        {isSelf && (
                          <span className="rounded-full bg-blue-soft px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-blue-deep">
                            You
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="hidden px-5 py-3 text-[0.82rem] text-ink/50 sm:table-cell">
                      {formatDate(row.createdAt)}
                    </td>
                    <td className="hidden px-5 py-3 text-[0.82rem] text-ink/50 lg:table-cell">
                      {row.lastSignInAt ? formatDateTime(row.lastSignInAt) : "Never"}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <DangerButton
                        type="button"
                        onClick={() => removeAdmin(row.userId)}
                        disabled={isSelf || removingId === row.userId}
                        title={isSelf ? "You cannot remove your own access" : undefined}
                      >
                        {removingId === row.userId ? "Removing…" : "Remove"}
                      </DangerButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
