import { useCallback, useEffect, useState } from "react";
import { Download } from "lucide-react";
import type { Subscriber } from "../../lib/db";
import { supabase } from "../../lib/supabase";
import { ListToolbar, Pagination, useListQuery } from "./list";
import {
  AdminPageHeader,
  DangerButton,
  EmptyState,
  Loading,
  Notice,
  SecondaryButton,
  formatDateTime,
  useConfirm,
} from "./ui";

const searchText = (row: Subscriber) => row.email;

export default function AdminSubscribers() {
  const [rows, setRows] = useState<Subscriber[] | null>(null);
  const [error, setError] = useState("");
  const client = supabase;
  const { confirm, dialog } = useConfirm();

  const load = useCallback(async () => {
    if (!client) return;
    const { data, error: loadError } = await client
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });
    if (loadError) {
      setError(loadError.message);
      return;
    }
    setRows(data as Subscriber[]);
  }, [client]);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id: string) => {
    if (!client) return;
    const confirmed = await confirm({
      title: "Remove subscriber?",
      message: "They will stop appearing in your subscriber list.",
      confirmLabel: "Remove",
    });
    if (!confirmed) return;
    const { error: deleteError } = await client
      .from("newsletter_subscribers")
      .delete()
      .eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setRows((current) => (current ? current.filter((row) => row.id !== id) : current));
  };

  const exportCsv = () => {
    if (!rows || rows.length === 0) return;
    const csv = [
      "email,subscribed_at",
      ...rows.map((row) => `${row.email},${row.created_at}`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "newsletter-subscribers.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const { query, setQuery, page, setPage, pageCount, total, visible } = useListQuery({
    rows,
    searchText,
    pageSize: 15,
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Subscribers"
        description="People who signed up for news, events and resources."
        action={
          <SecondaryButton type="button" onClick={exportCsv} disabled={!rows || rows.length === 0}>
            <Download className="size-4" />
            Export CSV
          </SecondaryButton>
        }
      />

      {error && <Notice>{error}</Notice>}
      {rows === null ? (
        <Loading />
      ) : rows.length === 0 ? (
        <EmptyState title="No subscribers yet">
          Newsletter sign-ups from the home page will appear here.
        </EmptyState>
      ) : (
        <div className="space-y-4">
          <ListToolbar
            query={query}
            onQueryChange={setQuery}
            placeholder="Search by email…"
            total={total}
          />
          {visible && visible.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
              <table className="w-full text-left">
                <thead className="bg-bone text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink/45">
                  <tr>
                    <th className="px-5 py-3">Email</th>
                    <th className="hidden px-5 py-3 sm:table-cell">Subscribed</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((row) => (
                    <tr key={row.id} className="border-t border-ink/10">
                      <td className="px-5 py-3 text-[0.9rem] font-semibold text-ink">{row.email}</td>
                      <td className="hidden px-5 py-3 text-[0.82rem] text-ink/50 sm:table-cell">
                        {formatDateTime(row.created_at)}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <DangerButton onClick={() => remove(row.id)}>Remove</DangerButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState title="No matches">Try a different search.</EmptyState>
          )}
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      )}
      {dialog}
    </div>
  );
}
