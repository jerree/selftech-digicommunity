import { useCallback, useEffect, useState } from "react";
import type { StoryRow } from "../../lib/db";
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
  formatDate,
  inputClass,
} from "./ui";

type Draft = {
  title: string;
  quote: string;
  author: string;
  program: string;
  published: boolean;
};

const blank: Draft = { title: "", quote: "", author: "", program: "", published: true };

export default function AdminStories() {
  const [rows, setRows] = useState<StoryRow[] | null>(null);
  const [editing, setEditing] = useState<StoryRow | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(blank);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const client = supabase;

  const load = useCallback(async () => {
    if (!client) return;
    const { data, error: loadError } = await client
      .from("stories")
      .select("*")
      .order("created_at", { ascending: false });
    if (loadError) {
      setError(loadError.message);
      return;
    }
    setRows(data as StoryRow[]);
  }, [client]);

  useEffect(() => {
    load();
  }, [load]);

  const startNew = () => {
    setEditing("new");
    setDraft(blank);
    setError("");
  };

  const startEdit = (row: StoryRow) => {
    setEditing(row);
    setDraft({
      title: row.title,
      quote: row.quote,
      author: row.author ?? "",
      program: row.program ?? "",
      published: row.published,
    });
    setError("");
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!client) return;
    if (!draft.title.trim() || !draft.quote.trim()) {
      setError("Title and quote are required.");
      return;
    }
    setSaving(true);
    setError("");
    const payload = {
      title: draft.title.trim(),
      quote: draft.quote.trim(),
      author: draft.author.trim() || null,
      program: draft.program.trim() || null,
      published: draft.published,
    };
    const result =
      editing && editing !== "new"
        ? await client.from("stories").update(payload).eq("id", editing.id)
        : await client.from("stories").insert(payload);
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
    if (!client || !window.confirm("Delete this story permanently?")) return;
    const { error: deleteError } = await client.from("stories").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    load();
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Success stories"
        description="Published stories appear on the home page, with the latest one shown first."
        action={
          <PrimaryButton type="button" onClick={startNew}>
            Add story
          </PrimaryButton>
        }
      />

      {error && <Notice>{error}</Notice>}

      {editing !== null && (
        <form onSubmit={save} className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-display text-[1.2rem] font-semibold tracking-tight text-ink">
            {editing === "new" ? "New story" : "Edit story"}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field id="story-title" label="Title" className="sm:col-span-2">
              <input
                id="story-title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className={inputClass}
                required
              />
            </Field>
            <Field
              id="story-quote"
              label="Quote"
              hint="The participant's own words, shared with permission"
              className="sm:col-span-2"
            >
              <textarea
                id="story-quote"
                rows={4}
                value={draft.quote}
                onChange={(e) => setDraft({ ...draft, quote: e.target.value })}
                className={`${inputClass} resize-y`}
                required
              />
            </Field>
            <Field id="story-author" label="Author" hint="Optional, e.g. first name only">
              <input
                id="story-author"
                value={draft.author}
                onChange={(e) => setDraft({ ...draft, author: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field id="story-program" label="Program" hint="Optional, e.g. Youth Digital Skills Academy">
              <input
                id="story-program"
                value={draft.program}
                onChange={(e) => setDraft({ ...draft, program: e.target.value })}
                className={inputClass}
              />
            </Field>
            <label className="flex items-center gap-2 text-[0.85rem] font-semibold text-ink/70 sm:col-span-2">
              <input
                type="checkbox"
                checked={draft.published}
                onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
                className="size-4 accent-green"
              />
              Published on the website
            </label>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <PrimaryButton type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save story"}
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
        <EmptyState title="No stories yet">
          Add a participant or community story once you have permission to share it.
        </EmptyState>
      ) : (
        <ul className="space-y-3">
          {rows.map((row) => (
            <li
              key={row.id}
              className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-5"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-[1.05rem] font-semibold text-ink">
                    {row.title}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] ${
                      row.published ? "bg-green-soft text-green-deep" : "bg-sand text-ink/55"
                    }`}
                  >
                    {row.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="mt-1 text-[0.82rem] text-ink/50">
                  {row.author ?? "Anonymous"}
                  {row.program ? ` · ${row.program}` : ""} · {formatDate(row.created_at)}
                </p>
                <p className="mt-1 max-w-2xl text-[0.85rem] italic text-ink/60">“{row.quote}”</p>
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
    </div>
  );
}
