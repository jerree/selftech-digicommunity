import { useCallback, useEffect, useRef, useState } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { SubmissionStatus } from "../../lib/db";

export const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-[0.92rem] text-ink transition-colors placeholder:text-ink/35 focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/10";

export const selectClass = inputClass;

export function Field({
  id,
  label,
  hint,
  className = "",
  children,
}: {
  id?: string;
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink/50">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-1.5 text-[0.75rem] text-ink/45">{hint}</p>}
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-tight tracking-tight text-ink">
          {title}
        </h1>
        {description && <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-ink/60">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function PrimaryButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.85rem] font-semibold text-cream transition-colors hover:bg-ink-2 disabled:cursor-wait disabled:opacity-60 ${className}`}
    />
  );
}

export function SecondaryButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 bg-white px-5 py-2.5 text-[0.85rem] font-semibold text-ink transition-colors hover:border-ink disabled:opacity-60 ${className}`}
    />
  );
}

export function DangerButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#c65a4a]/30 bg-white px-4 py-2 text-[0.8rem] font-semibold text-[#b03a2e] transition-colors hover:border-[#b03a2e] hover:bg-[#fdf1ef] disabled:opacity-60 ${className}`}
    />
  );
}

export function Notice({
  tone = "error",
  children,
}: {
  tone?: "error" | "success" | "info";
  children: ReactNode;
}) {
  const styles = {
    error: "border-[#c65a4a]/30 bg-[#fdf1ef] text-[#8f2f25]",
    success: "border-green/30 bg-green-soft text-green-deep",
    info: "border-blue/20 bg-blue-soft text-blue-deep",
  } as const;
  return (
    <p role={tone === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-[0.85rem] font-semibold ${styles[tone]}`}>
      {children}
    </p>
  );
}

export function Loading() {
  return <p className="py-12 text-center text-[0.9rem] text-ink/45">Loading…</p>;
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink/20 bg-white p-8 text-center">
      <p className="font-display text-[1.15rem] font-semibold text-ink">{title}</p>
      {children && <p className="mt-2 text-[0.9rem] text-ink/55">{children}</p>}
    </div>
  );
}

export function StatusSelect({
  value,
  onChange,
}: {
  value: SubmissionStatus;
  onChange: (value: SubmissionStatus) => void;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as SubmissionStatus)}
      aria-label="Status"
      className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-[0.75rem] font-semibold text-ink focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/10"
    >
      <option value="new">New</option>
      <option value="read">Read</option>
      <option value="archived">Archived</option>
    </select>
  );
}

export function StatusPill({ status }: { status: SubmissionStatus }) {
  const styles = {
    new: "bg-blue-soft text-blue-deep",
    read: "bg-green-soft text-green-deep",
    archived: "bg-sand text-ink/55",
  } as const;
  return (
    <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] ${styles[status]}`}>
      {status}
    </span>
  );
}

const parseDate = (value: string) =>
  new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value);

export function formatDate(value: string) {
  return parseDate(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(value: string) {
  return parseDate(value).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmLabel?: string;
};

export function ConfirmDialog({
  title = "Are you sure?",
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}: {
  title?: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-ink/45 p-4"
      onMouseDown={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-6 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <p
          id="confirm-title"
          className="font-display text-[1.15rem] font-semibold tracking-tight text-ink"
        >
          {title}
        </p>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-ink/60">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <SecondaryButton type="button" onClick={onCancel} autoFocus>
            Cancel
          </SecondaryButton>
          <DangerButton type="button" onClick={onConfirm}>
            {confirmLabel}
          </DangerButton>
        </div>
      </div>
    </div>
  );
}

export function useConfirm() {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolver = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((next: ConfirmOptions | string) => {
    setOptions(typeof next === "string" ? { message: next } : next);
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const close = (value: boolean) => {
    resolver.current?.(value);
    resolver.current = null;
    setOptions(null);
  };

  const dialog = options ? (
    <ConfirmDialog
      title={options.title}
      message={options.message}
      confirmLabel={options.confirmLabel}
      onConfirm={() => close(true)}
      onCancel={() => close(false)}
    />
  ) : null;

  return { confirm, dialog };
}
