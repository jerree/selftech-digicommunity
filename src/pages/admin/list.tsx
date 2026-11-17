import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { SubmissionStatus } from "../../lib/db";
import { inputClass, selectClass } from "./ui";

export type StatusFilterValue = "all" | SubmissionStatus;

export function useListQuery<T>({
  rows,
  searchText,
  filter,
  pageSize = 10,
}: {
  rows: T[] | null;
  searchText: (row: T) => string;
  filter?: (row: T) => boolean;
  pageSize?: number;
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!rows) return null;
    const needle = query.trim().toLowerCase();
    return rows.filter(
      (row) =>
        (!needle || searchText(row).toLowerCase().includes(needle)) &&
        (!filter || filter(row))
    );
  }, [rows, query, searchText, filter]);

  const total = filtered?.length ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount);
  const visible = filtered
    ? filtered.slice((safePage - 1) * pageSize, safePage * pageSize)
    : null;

  return {
    query,
    setQuery: (value: string) => {
      setQuery(value);
      setPage(1);
    },
    page: safePage,
    setPage,
    pageCount,
    total,
    visible,
  };
}

export function ListToolbar({
  query,
  onQueryChange,
  placeholder = "Search…",
  status,
  onStatusChange,
  total,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder?: string;
  status?: StatusFilterValue;
  onStatusChange?: (value: StatusFilterValue) => void;
  total?: number;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/35" />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className={`${inputClass} pl-11`}
        />
      </div>
      {onStatusChange && (
        <select
          value={status ?? "all"}
          onChange={(event) => onStatusChange(event.target.value as StatusFilterValue)}
          aria-label="Filter by status"
          className={`${selectClass} sm:w-44`}
        >
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="archived">Archived</option>
        </select>
      )}
      {typeof total === "number" && (
        <p className="text-[0.8rem] font-semibold text-ink/45 sm:whitespace-nowrap">
          {total} {total === 1 ? "result" : "results"}
        </p>
      )}
    </div>
  );
}

export function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  if (pageCount <= 1) return null;

  return (
    <nav className="flex items-center justify-between gap-3" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-white px-4 py-2 text-[0.8rem] font-semibold text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
        Previous
      </button>
      <p className="text-[0.8rem] font-semibold text-ink/45">
        Page {page} of {pageCount}
      </p>
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= pageCount}
        className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-white px-4 py-2 text-[0.8rem] font-semibold text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
