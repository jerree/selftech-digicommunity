import { useCallback, useEffect, useState } from "react";
import type { EventRow } from "../../lib/db";
import { eventKinds, type EventFormat, type EventKind } from "../../lib/site";
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
  selectClass,
} from "./ui";

type Draft = {
  title: string;
  date: string;
  time: string;
  kind: EventKind;
  format: EventFormat;
  location: string;
  summary: string;
  published: boolean;
};

const blank: Draft = {
  title: "",
  date: "",
  time: "",
  kind: "Workshop",
  format: "In person",
  location: "",
  summary: "",
  published: true,
};

const formats: EventFormat[] = ["In person", "Online", "Hybrid"];

export default function AdminEvents() {
  const [rows, setRows] = useState<EventRow[] | null>(null);
  const [editing, setEditing] = useState<EventRow | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(blank);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const client = supabase;

  const load = useCallback(async () => {
    if (!client) return;
    const { data, error: loadError } = await client
      .from("events")
      .select("*")
      .order("date", { ascending: true });
    if (loadError) {
      setError(loadError.message);
      return;
    }
    setRows(data as EventRow[]);
  }, [client]);

  useEffect(() => {
    load();
  }, [load]);

  const startNew = () => {
    setEditing("new");
    setDraft(blank);
    setError("");
  };

  const startEdit = (row: EventRow) => {
    setEditing(row);
    setDraft({
      title: row.title,
      date: row.date,
      time: row.time ?? "",
      kind: row.kind,
      format: row.format,
      location: row.location,
      summary: row.summary,
      published: row.published,
    });
    setError("");
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!client) return;
    if (!draft.title.trim() || !draft.date || !draft.location.trim() || !draft.summary.trim()) {
      setError("Title, date, location and summary are required.");
      return;
    }
    setSaving(true);
    setError("");
    const payload = {
      title: draft.title.trim(),
      date: draft.date,
      time: draft.time.trim() || null,
      kind: draft.kind,
      format: draft.format,
      location: draft.location.trim(),
      summary: draft.summary.trim(),
      published: draft.published,
    };
    const result =
      editing && editing !== "new"
        ? await client.from("events").update(payload).eq("id", editing.id)
        : await client.from("events").insert(payload);
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
    if (!client || !window.confirm("Delete this event permanently?")) return;
    const { error: deleteError } = await client.from("events").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    load();
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Events"
        description="Published events appear on the Training & Events page and the home page."
        action={
          <PrimaryButton type="button" onClick={startNew}>
            Add event
          </PrimaryButton>
        }
      />

      {error && <Notice>{error}</Notice>}

      {editing !== null && (
        <form onSubmit={save} className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-display text-[1.2rem] font-semibold tracking-tight text-ink">
            {editing === "new" ? "New event" : "Edit event"}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field id="event-title" label="Title" className="sm:col-span-2">
              <input
                id="event-title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className={inputClass}
                required
              />
            </Field>
            <Field id="event-date" label="Date">
              <input
                id="event-date"
                type="date"
                value={draft.date}
                onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                className={inputClass}
                required
              />
            </Field>
            <Field id="event-time" label="Time" hint="Optional, e.g. 10:00 am – 1:00 pm">
              <input
                id="event-time"
                value={draft.time}
                onChange={(e) => setDraft({ ...draft, time: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field id="event-kind" label="Type">
              <select
                id="event-kind"
                value={draft.kind}
                onChange={(e) => setDraft({ ...draft, kind: e.target.value as EventKind })}
                className={selectClass}
              >
                {eventKinds.map((kind) => (
                  <option key={kind} value={kind}>
                    {kind}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="event-format" label="Format">
              <select
                id="event-format"
                value={draft.format}
                onChange={(e) => setDraft({ ...draft, format: e.target.value as EventFormat })}
                className={selectClass}
              >
                {formats.map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="event-location" label="Location" className="sm:col-span-2">
              <input
                id="event-location"
                value={draft.location}
                onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                className={inputClass}
                required
              />
            </Field>
            <Field id="event-summary" label="Summary" className="sm:col-span-2">
              <textarea
                id="event-summary"
                rows={3}
                value={draft.summary}
                onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
                className={`${inputClass} resize-y`}
                required
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
              {saving ? "Saving…" : "Save event"}
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
        <EmptyState title="No events yet">Add your first workshop, webinar or community event.</EmptyState>
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
                  {formatDate(row.date)}
                  {row.time ? ` · ${row.time}` : ""} · {row.kind} · {row.format}
                </p>
                <p className="mt-1 text-[0.85rem] text-ink/60">{row.location}</p>
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
