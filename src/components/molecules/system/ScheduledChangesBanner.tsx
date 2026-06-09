import * as React from "react";
import { CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingRow } from "@/lib/types/admin";

interface ScheduledChangesBannerProps {
  rows: PricingRow[];
  className?: string;
}

export function ScheduledChangesBanner({ rows, className }: ScheduledChangesBannerProps) {
  const scheduled = rows.filter((r) => r.scheduledChange);
  if (scheduled.length === 0) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-start gap-[12px]",
        "px-[16px] py-[12px]",
        "rounded-[var(--r-md)] border border-[var(--warn-soft)]",
        "bg-[var(--warn-soft)]",
        className
      )}
    >
      <CalendarClock
        size={16}
        className="shrink-0 mt-[1px] text-[var(--warn)]"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-[4px]">
        <p className="font-sans text-[13px] font-medium text-[var(--ink)]">
          {scheduled.length} scheduled fee{scheduled.length > 1 ? " changes" : " change"} upcoming
        </p>
        <ul className="flex flex-col gap-[2px]">
          {scheduled.map((row) => (
            <li
              key={row.id}
              className="font-sans text-[12px] text-[var(--ink-muted)]"
            >
              <span className="font-medium text-[var(--ink)]">{row.service}</span>
              {" — "}RWF {row.scheduledChange!.newStandardFee.toLocaleString()} standard
              {" "}effective{" "}
              <span className="font-mono">{row.scheduledChange!.effectiveDate}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
