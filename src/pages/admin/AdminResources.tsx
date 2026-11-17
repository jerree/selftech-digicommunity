import { useCallback, useEffect, useState } from "react";
import type { ResourceRow } from "../../lib/db";
import { resourceTopics, type ResourceTopicId } from "../../lib/site";
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
  useConfirm,
} from "./ui";

type ResourceType = "Guide" | "Article" | "Checklist";

type Draft = {
  title: string;
  summary: string;
  topic: ResourceTopicId;
  type: ResourceType;
  read_time: string;
  href: string;
  published: boolean;
};

const types: ResourceType[] = ["Guide", "Article", "Checklist"];

const blank: Draft = {
  title: "",
  summary: "",
  topic: "digital-outreach",
  type: "Guide",
  read_time: "",
  href: "",
  published: true,
};

export default function AdminResources() {
  const [rows, setRows] = useState<ResourceRow[] | null>(null);
  const [editing, setEditing] = useState<ResourceRow | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(blank);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const client = supabase;
  const { confirm, dialog } = useConfirm();

  const load = useCallback(async () => {
    if (!client) return;
    const { data, error: loadError } = await client
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });
    if (loadError) {
      setError(loadError.message);
      return;
    }
    setRows(data as ResourceRow[]);
  }, [client]);

  useEffect(() => {
    load();
  }, [load]);

  const startNew = () => {
    setEditing("new");
    setDraft(blank);
    setError("");
  };

  const startEdit = (row: ResourceRow) => {
    setEditing(row);
    setDraft({
      title: row.title,
      summary: row.summary,
      topic: row.topic,
      type: row.type,
      read_time: row.read_time ?? "",
      href: row.href,
      published: row.published,
    });
    setError("");
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!client) return;
    if (!draft.title.trim() || !draft.summary.trim() || !draft.href.trim()) {
      setError("Title, summary and link are required.");
      return;
    }
    setSaving(true);
    setError("");
    const payload = {
      title: draft.title.trim(),
      summary: draft.summary.trim(),
      topic: draft.topic,
      type: draft.type,
      read_time: draft.read_time.trim() || null,
      href: draft.href.trim(),
      published: draft.published,
    };
    const result =
      editing && editing !== "new"
        ? await client.from("resources").update(payload).eq("id", editing.id)
        : await client.from("resources").insert(payload);
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
      title: "Delete resource?",
      message: "This resource will be permanently deleted.",
    });
    if (!confirmed) return;
    const { error: deleteError } = await client.from("resources").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    load();
  };

  const topicTitle = (id: ResourceTopicId) =>
    resourceTopics.find((topic) => topic.id === id)?.title ?? id;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Resources"
        description="Published resources appear on the Resources page."
        action={
          <PrimaryButton type="button" onClick={startNew}>
            Add resource
          </PrimaryButton>
        }
      />

      {error && <Notice>{error}</Notice>}

      {editing !== null && (
        <form onSubmit={save} className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="font-display text-[1.2rem] font-semibold tracking-tight text-ink">
            {editing === "new" ? "New resource" : "Edit resource"}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field id="resource-title" label="Title" className="sm:col-span-2">
              <input
                id="resource-title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className={inputClass}
                required
              />
            </Field>
            <Field id="resource-summary" label="Summary" className="sm:col-span-2">
              <textarea
                id="resource-summary"
                rows={3}
                value={draft.summary}
                onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
                className={`${inputClass} resize-y`}
                required
              />
            </Field>
            <Field id="resource-topic" label="Topic">
              <select
                id="resource-topic"
                value={draft.topic}
                onChange={(e) => setDraft({ ...draft, topic: e.target.value as ResourceTopicId })}
                className={selectClass}
              >
                {resourceTopics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="resource-type" label="Type">
              <select
                id="resource-type"
                value={draft.type}
                onChange={(e) => setDraft({ ...draft, type: e.target.value as ResourceType })}
                className={selectClass}
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="resource-read-time" label="Read time" hint="Optional, e.g. 5 min read">
              <input
                id="resource-read-time"
                value={draft.read_time}
                onChange={(e) => setDraft({ ...draft, read_time: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field
              id="resource-href"
              label="Link"
              hint="An internal path like /resources/... or a full https:// link"
            >
              <input
                id="resource-href"
                value={draft.href}
                onChange={(e) => setDraft({ ...draft, href: e.target.value })}
                className={inputClass}
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
              {saving ? "Saving…" : "Save resource"}
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
        <EmptyState title="No resources yet">Publish your first guide, article or checklist.</EmptyState>
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
                  {topicTitle(row.topic)} · {row.type}
                  {row.read_time ? ` · ${row.read_time}` : ""} · {formatDate(row.created_at)}
                </p>
                <p className="mt-1 max-w-2xl text-[0.85rem] text-ink/60">{row.summary}</p>
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
