"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PriorityDot } from "@/components/atoms/agent/PriorityDot";
import { SLABadge } from "@/components/atoms/agent/SLABadge";
import { StatusPill } from "@/components/atoms/shared/StatusPill";
import type { AgentCase } from "@/lib/types/agent";

const STATUS_VARIANT: Record<string, "brand" | "ok" | "warn" | "danger" | "info"> = {
  "action-required": "danger",
  "received": "info",
  "under-review": "info",
  "in-progress": "brand",
  "submitted-to-authority": "warn",
  "awaiting-response": "warn",
  "completed": "ok",
  "rejected": "danger",
};

const STATUS_LABEL: Record<string, string> = {
  "action-required": "Action required",
  "received": "Received",
  "under-review": "Under review",
  "in-progress": "In progress",
  "submitted-to-authority": "Submitted",
  "awaiting-response": "Awaiting",
  "completed": "Completed",
  "rejected": "Rejected",
};

interface CaseCardProps {
  case_: AgentCase;
  className?: string;
}

export function CaseCard({ case_: c, className }: CaseCardProps) {
  return (
    <Link
      href={`/agent/case/${c.code}`}
      className={cn(
        "block p-[16px]",
        "bg-[var(--paper)] rounded-[var(--r-lg)]",
        "border border-[var(--rule)]",
        "transition-colors duration-[var(--m-fast)]",
        "hover:border-[var(--ink)] hover:bg-[var(--paper-2)]",
        "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
        className
      )}
    >
      {/* Top row: code + SLA badge */}
      <div className="flex items-center justify-between gap-[8px] mb-[8px]">
        <span className="font-mono text-[11px] text-[var(--ink-muted)] tracking-tight">
          {c.code}
        </span>
        {c.slaState !== "ok" ? (
          <SLABadge state={c.slaState} label={c.ageDisplay} />
        ) : (
          <span className="font-mono text-[11px] text-[var(--ink-subtle)]">
            {c.ageDisplay}
          </span>
        )}
      </div>

      {/* Service name */}
      <p className="font-serif text-[16px] text-[var(--ink)] mb-[6px]">
        {c.serviceNameBase}{" "}
        <em className="italic font-normal">{c.serviceNameItalic}</em>
      </p>

      {/* Client + status row */}
      <div className="flex items-center justify-between gap-[8px] mb-[8px]">
        <div className="flex items-center gap-[6px]">
          <span
            aria-hidden="true"
            className={cn(
              "inline-flex items-center justify-center",
              "w-[24px] h-[24px] rounded-full shrink-0",
              "bg-[var(--brand-soft)] text-[var(--brand-ink)]",
              "font-sans text-[10px] font-semibold"
            )}
          >
            {c.clientInitials}
          </span>
          <span className="font-sans text-[13px] text-[var(--ink-muted)]">
            {c.clientName}
          </span>
        </div>
        <StatusPill
          label={STATUS_LABEL[c.status] ?? c.status}
          variant={STATUS_VARIANT[c.status] ?? "info"}
        />
      </div>

      {/* Next action */}
      <div className="flex items-center gap-[6px]">
        <PriorityDot priority={c.priority} />
        <span className="font-sans text-[12px] text-[var(--ink-muted)] truncate">
          {c.nextAction}
        </span>
      </div>
    </Link>
  );
}
