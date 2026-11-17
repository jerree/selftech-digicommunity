import { useCallback, useEffect, useState } from "react";
import type { ImpactRow } from "../../lib/db";
import { supabase } from "../../lib/supabase";
import {
  AdminPageHeader,
  DangerButton,
  EmptyState,
  Field,
  Loading,
  Notice,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  useConfirm,
} from "./ui";

type Draft = {
  label: string;
  value: string;
  note: string;
  sort_order: string;
};

const blank: Draft = { label: "", value: "", note: "", sort_order: "0" };

export default function AdminImpact() {
  const [rows, setRows] = useState<ImpactRow[] | null>(null);
  const [editing, setEditing] = useState<ImpactRow | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(blank);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const client = supabase;
  const { confirm, dialog } = useConfirm();

  const load = useCallback(async () => {
    if (!client) return;
    const { data, error: loadError } = await client
      .from("impact_stats")
      .select("*")
      .order("sort_order", { ascending: true });
    if (loadError) {
      setError(loadError.message);
      return;
    }
    setRows(data as ImpactRow[]);
  }, [client]);

  useEffect(() => {
    load();
  }, [load]);

  const startNew = () => {
    setEditing("new");
    setDraft({ ...blank, sort_order: String((rows?.length ?? 0) + 1) });
    setError("");
  };

  const startEdit = (row: ImpactRow) => {
    setEditing(row);
    setDraft({
      label: row.label,
      value: row.value,
      note: row.note ?? "",
      sort_order: String(row.sort_order),
    });
    setError("");
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!client) return;
    if (!draft.label.trim() || !draft.value.trim()) {
      setError("Label and value are required.");
      return;
    }
    setSaving(true);
    setError("");
    const payload = {
      label: draft.label.trim(),
      value: draft.value.trim(),
      note: draft.note.trim() || null,
      sort_order: Number(draft.sort_order) || 0,
    };
    const result =
      editing && editing !== "new"
        ? await client.from("impact_stats").update(payload).eq("id", editing.id)
        : await client.from("impact_stats").insert(payload);
    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    setEditing(null);
    setDraft(blank);
    load();
  };

  const remove = async (id: string) => {
    if (!client) return;
    const confirmed = await confirm({
      title: "Delete figure?",
      message: "This impact figure will be removed from the website.",
    });
    if (!confirmed) return;
    const { error: deleteError } = await client.from("impact_stats").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    load();
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Impact figures"
        description="These numbers appear on the home page. Use a dash (—) for anything still being verified."
        action={
          <PrimaryButton type="button" onClick={startNew}>
            Add figure
          </PrimaryButton>
        }
      />

      {error && <Notice>{error}</Notice>}

      {editing !== null && (
        <form onSubmit={save} className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-display text-[1.2rem] font-semibold tracking-tight text-ink">
            {editing === "new" ? "New figure" : "Edit figure"}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field id="impact-label" label="Label">
              <input
                id="impact-label"
                value={draft.label}
                onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                className={inputClass}
                required
              />
            </Field>
            <Field id="impact-value" label="Value" hint="For example 120+, 12 or —">
              <input
                id="impact-value"
                value={draft.value}
                onChange={(e) => setDraft({ ...draft, value: e.target.value })}
                className={inputClass}
                required
              />
            </Field>
            <Field id="impact-note" label="Note" hint="Optional small text under the figure">
              <input
                id="impact-note"
                value={draft.note}
                onChange={(e) => setDraft({ ...draft, note: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field id="impact-order" label="Order" hint="Lower numbers appear first">
              <input
                id="impact-order"
                type="number"
                value={draft.sort_order}
                onChange={(e) => setDraft({ ...draft, sort_order: e.target.value })}
                className={inputClass}
              />
            </Field>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save figure"}
            </PrimaryButton>
            <SecondaryButton type="button" onClick={() => setEditing(null)}>
              Cancel
            </SecondaryButton>
          </div>
        </form>
      )}

      {rows === null ? (
        <Loading />
      ) : rows.length === 0 ? (
        <EmptyState title="No figures added yet">
          The website is showing the default pending placeholders until you add figures here.
        </EmptyState>
      ) : (
        <ul className="space-y-3">
          {rows.map((row) => (
            <li
              key={row.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-5"
            >
              <div className="min-w-0">
                <p className="font-display text-[1.05rem] font-semibold text-ink">{row.label}</p>
                <p className="mt-1 text-[0.85rem] text-ink/55">
                  Value: <span className="font-semibold text-ink/75">{row.value}</span>
                  {row.note ? ` · ${row.note}` : ""} · Order {row.sort_order}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <SecondaryButton type="button" onClick={() => startEdit(row)}>
                  Edit
                </SecondaryButton>
                <DangerButton onClick={() => remove(row.id)}>Delete</DangerButton>
              </div>
            </li>
          ))}
        </ul>
      )}
      {dialog}
    </div>
  );
}
