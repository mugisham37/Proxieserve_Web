import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface IdempotencyCardProps {
  existingCode?: string;
  className?: string;
}

export function IdempotencyCard({ existingCode, className }: IdempotencyCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--r-md)] bg-[var(--info-soft)] border-l-[3px] border-[var(--info)] px-4 py-4",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="shrink-0 mt-0.5 text-[var(--info)]"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M10 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="6.5" r="0.85" fill="currentColor" />
        </svg>
        <div className="flex flex-col gap-2 flex-1">
          <div>
            <h4 className="font-sans text-[13px] font-semibold text-[var(--info)]">
              Application already submitted
            </h4>
            <p className="font-sans text-[12.5px] text-[var(--ink-muted)] mt-0.5">
              It looks like you already sent this application. Submitting again won&apos;t create a duplicate.
            </p>
          </div>

          {existingCode && (
            <div className="flex items-center gap-2 bg-[var(--paper)] rounded-[var(--r-sm)] px-3 py-2 border border-[var(--rule-soft)]">
              <span className="font-sans text-[12px] text-[var(--ink-muted)]">Your code</span>
              <span className="font-mono text-[13px] font-semibold text-[var(--ink)] ml-1">{existingCode}</span>
            </div>
          )}

          {existingCode && (
            <Link
              href={`/?track=${existingCode}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[var(--r-md)] bg-[var(--info)] text-white font-sans text-[13px] font-medium hover:opacity-90 transition-opacity w-fit"
            >
              Track instead →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
