import * as React from "react";
import { cn } from "@/lib/utils";

interface DocOverviewProps {
  requiredDone: number;
  requiredTotal: number;
  optionalAdded: number;
  optionalTotal: number;
  totalBytes: number;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 KB";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocOverview({
  requiredDone,
  requiredTotal,
  optionalAdded,
  optionalTotal,
  totalBytes,
  className,
}: DocOverviewProps) {
  const allRequiredDone = requiredDone >= requiredTotal;

  return (
    <div
      className={cn(
        "flex flex-wrap gap-x-6 gap-y-2 px-4 py-3 rounded-[var(--r-md)] border border-[var(--rule-soft)] bg-[var(--paper)]",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-sans text-[11px] font-medium",
            allRequiredDone
              ? "bg-[var(--ok-soft)] text-[var(--ok)]"
              : "bg-[var(--cream)] text-[var(--ink-muted)]"
          )}
        >
          {allRequiredDone && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          Required {requiredDone}/{requiredTotal}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-sans text-[12px] text-[var(--ink-muted)]">
          Optional{" "}
          <span className="text-[var(--ink)] font-medium">{optionalAdded}/{optionalTotal}</span>
        </span>
      </div>

      {totalBytes > 0 && (
        <div className="flex items-center gap-1 ml-auto">
          <span className="font-sans text-[11px] text-[var(--ink-subtle)]">Total size</span>
          <span className="font-mono text-[11px] text-[var(--ink-muted)]">{formatBytes(totalBytes)}</span>
        </div>
      )}
    </div>
  );
}
