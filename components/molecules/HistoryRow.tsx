import * as React from "react";
import { cn } from "@/lib/utils";
import type { HistoryEntry } from "@/lib/types/dashboard";

interface HistoryRowProps {
  entry: HistoryEntry;
  className?: string;
}

export function HistoryRow({ entry, className }: HistoryRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto] items-start gap-[14px]",
        "px-[16px] py-[14px]",
        "border-b border-[var(--rule)] last:border-b-0",
        className
      )}
    >
      {/* Col 1: date */}
      <p className="font-mono text-[10px] text-[var(--ink-muted)] tracking-[0.06em] uppercase pt-[2px] whitespace-nowrap">
        {entry.completedAt}
      </p>

      {/* Col 2: service name + code · amount on second line */}
      <div className="min-w-0">
        <p className="font-serif text-[14.5px] font-medium text-[var(--ink)] truncate leading-tight">
          {entry.serviceNameBase}
          {entry.serviceNameItalic && (
            <em className="italic font-normal"> {entry.serviceNameItalic}</em>
          )}
        </p>
        <p className="font-mono text-[10px] text-[var(--ink-muted)] tracking-[0.05em] mt-[2px]">
          {entry.code} · RWF {entry.serviceFee.toLocaleString()}
        </p>
      </div>

      {/* Col 3: status pill */}
      <span
        className={cn(
          "inline-flex items-center gap-[5px] px-[10px] py-[3px] rounded-full shrink-0",
          "font-sans text-[11px] font-medium",
          entry.status === "completed"
            ? "bg-[var(--ok-soft)] text-[var(--ok)]"
            : "bg-[var(--cream-2)] text-[var(--ink-muted)]"
        )}
      >
        <span
          className={cn(
            "w-[5px] h-[5px] rounded-full shrink-0",
            entry.status === "completed" ? "bg-[var(--ok)]" : "bg-[var(--ink-muted)]"
          )}
          aria-hidden="true"
        />
        {entry.status === "completed" ? "Done" : "Discontinued"}
      </span>
    </div>
  );
}
