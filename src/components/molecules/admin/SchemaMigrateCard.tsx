import * as React from "react";
import { cn } from "@/lib/utils";

interface MigrationChanges {
  added: string[];
  changed: string[];
  removed: string[];
}

interface SchemaMigrateCardProps {
  changes?: MigrationChanges;
  onUpdate: () => void;
  onReset: () => void;
  className?: string;
}

export function SchemaMigrateCard({ changes, onUpdate, onReset, className }: SchemaMigrateCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--r-lg)] bg-[var(--brand-soft)] border-l-[3px] border-[var(--brand)] px-5 py-5",
        className
      )}
    >
      <span className="eyebrow text-[var(--brand-ink)] block mb-2">Application updated</span>
      <h3 className="font-serif text-[17px] font-medium italic text-[var(--ink)] mb-1">
        We&apos;ve updated this service&apos;s application form
      </h3>
      <p className="font-sans text-[13px] text-[var(--ink-muted)] mb-4">
        Your saved draft needs to be updated to work with the new form structure.
      </p>

      {changes && (
        <ul className="flex flex-col gap-1.5 mb-5">
          {changes.added.map((f) => (
            <li key={f} className="flex items-center gap-2 font-sans text-[12.5px] text-[var(--ok)]">
              <span className="w-3.5 h-3.5 rounded-full bg-[var(--ok)] flex items-center justify-center shrink-0">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                  <path d="M4 1.5v5M1.5 4h5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
              New: {f}
            </li>
          ))}
          {changes.changed.map((f) => (
            <li key={f} className="flex items-center gap-2 font-sans text-[12.5px] text-[var(--warn)]">
              <span className="w-3.5 h-3.5 rounded-full bg-[var(--warn)] flex items-center justify-center shrink-0" aria-hidden="true">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M4 2v2.5M4 5.5v.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
              Changed: {f}
            </li>
          ))}
          {changes.removed.map((f) => (
            <li key={f} className="flex items-center gap-2 font-sans text-[12.5px] text-[var(--danger)]">
              <span className="w-3.5 h-3.5 rounded-full bg-[var(--danger)] flex items-center justify-center shrink-0" aria-hidden="true">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M2 2l4 4M6 2l-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
              Removed: {f}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={onUpdate}
          className="px-4 py-2 rounded-[var(--r-md)] bg-[var(--brand)] text-white font-sans text-[13px] font-medium hover:opacity-90 transition-opacity"
        >
          Update my draft
        </button>
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 rounded-[var(--r-md)] border border-[var(--rule-strong)] font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
        >
          Start fresh
        </button>
      </div>
    </div>
  );
}
