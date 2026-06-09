import * as React from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuditKindTag } from "@/components/atoms/AuditKindTag";
import type { AuditEntry } from "@/lib/types/admin";

interface AuditRowProps {
  entry: AuditEntry;
}

const actorBadgeStyles: Record<AuditEntry["actorType"], string> = {
  admin: "bg-[var(--brand-soft)] text-[var(--brand-ink)]",
  agent: "bg-[var(--paper-2)] text-[var(--ink-muted)]",
  system: "bg-[var(--info-soft)] text-[var(--info)]",
};

function formatTimestamp(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

export function AuditRow({ entry }: AuditRowProps) {
  return (
    <div
      role="listitem"
      className={cn(
        "flex items-start gap-[12px]",
        "px-[16px] py-[12px]",
        "border-b border-[var(--rule-soft)]",
        "transition-colors duration-[var(--m-fast)] hover:bg-[var(--paper-2)]"
      )}
    >
      {/* Immutability lock — state #3 */}
      <Lock
        size={13}
        className="shrink-0 mt-[3px] text-[var(--ink-subtle)]"
        aria-label="Immutable log entry"
      />

      {/* Timestamp */}
      <time
        dateTime={entry.timestamp}
        className="shrink-0 font-mono text-[11px] text-[var(--ink-muted)] w-[130px] mt-[1px]"
      >
        {formatTimestamp(entry.timestamp)}
      </time>

      {/* Actor badge */}
      <span
        className={cn(
          "shrink-0 inline-flex items-center px-[7px] py-[2px]",
          "font-mono text-[10px] tracking-[0.06em] rounded-[var(--r-sm)]",
          actorBadgeStyles[entry.actorType]
        )}
      >
        {entry.actor}
      </span>

      {/* Description */}
      <p className="flex-1 font-sans text-[13px] leading-[1.5] text-[var(--ink)] min-w-0">
        {entry.description}
      </p>

      {/* Kind tag */}
      <AuditKindTag kind={entry.kind} className="shrink-0" />
    </div>
  );
}
