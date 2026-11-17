import { useCallback, useEffect, useState } from "react";
import type { ContactMessage } from "../../lib/db";
import { supabase } from "../../lib/supabase";
import {
  ListToolbar,
  Pagination,
  useListQuery,
  type StatusFilterValue,
} from "./list";
import {
  AdminPageHeader,
  DangerButton,
  EmptyState,
  Loading,
  Notice,
  StatusPill,
  StatusSelect,
  formatDateTime,
  useConfirm,
} from "./ui";

const searchText = (row: ContactMessage) =>
  `${row.name} ${row.email} ${row.subject} ${row.message} ${row.topic}`;

export default function AdminMessages() {
  const [rows, setRows] = useState<ContactMessage[] | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<StatusFilterValue>("all");
  const client = supabase;
  const { confirm, dialog } = useConfirm();

  const load = useCallback(async () => {
    if (!client) return;
    const { data, error: loadError } = await client
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (loadError) {
      setError(loadError.message);
      return;
    }
    setRows(data as ContactMessage[]);
  }, [client]);

  useEffect(() => {
    load();
  }, [load]);

  const setRowStatus = async (id: string, nextStatus: ContactMessage["status"]) => {
    if (!client) return;
    const { error: updateError } = await client
      .from("contact_messages")
      .update({ status: nextStatus })
      .eq("id", id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setRows((current) =>
      current
        ? current.map((row) => (row.id === id ? { ...row, status: nextStatus } : row))
        : current
    );
  };

  const remove = async (id: string) => {
    if (!client) return;
    const confirmed = await confirm({
      title: "Delete message?",
      message: "This message will be permanently deleted.",
    });
    if (!confirmed) return;
    const { error: deleteError } = await client.from("contact_messages").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setRows((current) => (current ? current.filter((row) => row.id !== id) : current));
  };

  const { query, setQuery, page, setPage, pageCount, total, visible } = useListQuery({
    rows,
    searchText,
    filter: (row) => status === "all" || row.status === status,
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Messages"
        description="Enquiries sent through the Contact page."
      />

      {error && <Notice>{error}</Notice>}
      {rows === null ? (
        <Loading />
      ) : rows.length === 0 ? (
        <EmptyState title="No messages yet">New contact form submissions will appear here.</EmptyState>
      ) : (
        <div className="space-y-4">
          <ListToolbar
            query={query}
            onQueryChange={setQuery}
            placeholder="Search messages…"
            status={status}
            onStatusChange={(value) => { setStatus(value); setPage(1); }}
            total={total}
          />
          {visible && visible.length > 0 ? (
            <ul className="space-y-3">
              {visible.map((row) => (
                <li key={row.id} className="rounded-2xl border border-ink/10 bg-white p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-[1.05rem] font-semibold text-ink">
                          {row.name}
                        </span>
                        <StatusPill status={row.status} />
                        <span className="rounded-full bg-bone px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-ink/55">
                          {row.topic}
                        </span>
                      </div>
                      <p className="mt-1 text-[0.82rem] text-ink/50">
                        {row.email} · {formatDateTime(row.created_at)}
                      </p>
                      <p className="mt-2 text-[0.95rem] font-semibold text-ink">{row.subject}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusSelect
                        value={row.status}
                        onChange={(nextStatus) => setRowStatus(row.id, nextStatus)}
                      />
                      <DangerButton onClick={() => remove(row.id)}>Delete</DangerButton>
                    </div>
                  </div>
                  <details className="mt-3">
                    <summary className="cursor-pointer text-[0.8rem] font-bold text-ink/60 hover:text-ink">
                      Read message
                    </summary>
                    <p className="mt-2 whitespace-pre-wrap rounded-xl bg-bone p-4 text-[0.9rem] leading-relaxed text-ink/70">
                      {row.message}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="No matches">Try a different search or status filter.</EmptyState>
          )}
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      )}
      {dialog}
    </div>
  );
}
