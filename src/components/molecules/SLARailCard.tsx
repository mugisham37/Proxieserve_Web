import * as React from "react";
import { cn } from "@/lib/utils";
import { PriorityDot } from "@/components/atoms/agent/PriorityDot";
import type { CaseDetail } from "@/lib/types/agent";

interface SLARailCardProps {
  detail: Pick<
    CaseDetail,
    "priority" | "ageDisplay" | "slaState" | "slaTarget" | "turnaroundEst"
  >;
}

function RailLine({ label, value, valueClassName }: { label: string; value: React.ReactNode; valueClassName?: string }) {
  return (
    <div className="flex items-center justify-between gap-[8px] py-[8px] border-b border-[var(--rule)] last:border-0">
      <span className="font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--ink-muted)] shrink-0">
        {label}
      </span>
      <span className={cn("font-sans text-[13px] text-right", valueClassName ?? "text-[var(--ink)]")}>
        {value}
      </span>
    </div>
  );
}

export function SLARailCard({ detail }: SLARailCardProps) {
  return (
    <div className="bg-[var(--paper)] rounded-[var(--r-lg)] border border-[var(--rule)] p-[18px]">
      <h3 className="font-sans text-[12px] font-semibold text-[var(--ink)] mb-[6px]">
        SLA &amp; priority
      </h3>
      <RailLine
        label="Priority"
        value={
          <span className="flex items-center gap-[6px]">
            <PriorityDot priority={detail.priority} />
            <span className="capitalize">{detail.priority}</span>
          </span>
        }
      />
      <RailLine label="Age" value={<span className="font-mono text-[12px]">{detail.ageDisplay}</span>} />
      <RailLine
        label="SLA target"
        value={detail.slaTarget}
        valueClassName={
          detail.slaState === "over"
            ? "text-[var(--danger)] font-medium"
            : detail.slaState === "warn"
            ? "text-[var(--warn)] font-medium"
            : "text-[var(--ok)]"
        }
      />
      <RailLine label="Turnaround est." value={detail.turnaroundEst} />
    </div>
  );
}
