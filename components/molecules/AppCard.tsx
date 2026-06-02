import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { StatusPill } from "@/components/atoms/StatusPill";
import type { ApplicationSummary, AppStatus } from "@/lib/dashboard-data";

const STATUS_STRIP: Record<AppStatus, string> = {
  received: "bg-[var(--info)]",
  "in-progress": "bg-[var(--brand)]",
  "action-required": "bg-[var(--warn)]",
  "on-hold": "bg-[var(--warn)]",
  completed: "bg-[var(--ok)]",
  rejected: "bg-[var(--danger)]",
  archived: "bg-[var(--ink-subtle)]",
};

const STATUS_PILL_VARIANT: Record<AppStatus, "info" | "brand" | "warn" | "ok" | "danger"> = {
  received: "info",
  "in-progress": "brand",
  "action-required": "warn",
  "on-hold": "warn",
  completed: "ok",
  rejected: "danger",
  archived: "brand",
};

const STATUS_LABEL: Record<AppStatus, string> = {
  received: "Received",
  "in-progress": "In progress",
  "action-required": "Action required",
  "on-hold": "On hold",
  completed: "Completed",
  rejected: "Rejected",
  archived: "Archived",
};

interface AppCardProps {
  app: ApplicationSummary;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Link
      href={`/dashboard/applications/${app.code}`}
      role="article"
      aria-label={`${app.code} — ${app.serviceName} — ${STATUS_LABEL[app.status]}`}
      className={cn(
        "flex flex-col bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] overflow-hidden",
        "transition-[transform,box-shadow] duration-[var(--m-fast)]",
        "hover:-translate-y-[2px] hover:[box-shadow:var(--sh-subtle)]",
        "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
      )}
    >
      {/* Status strip */}
      <div className={cn("h-2 shrink-0", STATUS_STRIP[app.status])} aria-hidden="true" />

      {/* Body */}
      <div className="flex flex-col gap-[14px] px-6 py-[22px] flex-1">
        {/* Category + status */}
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">
            {app.serviceCategory}
          </span>
          <StatusPill variant={STATUS_PILL_VARIANT[app.status]} label={STATUS_LABEL[app.status]} />
        </div>

        {/* Service name */}
        <p className="font-serif text-[22px] leading-[1.2] text-[var(--ink)] m-0">
          {app.serviceName}
        </p>

        {/* PRX code */}
        <p className="font-mono text-[12px] font-semibold text-[var(--ink-muted)] tracking-[0.05em] m-0">
          {app.code}
        </p>

        {/* Progress dots */}
        <div
          className="flex gap-1"
          role="progressbar"
          aria-valuenow={app.completedSteps}
          aria-valuemin={0}
          aria-valuemax={app.progressSteps}
          aria-label={`${app.completedSteps} of ${app.progressSteps} steps complete`}
        >
          {Array.from({ length: app.progressSteps }).map((_, i) => {
            const isDone = i < app.completedSteps;
            const isActive = i === app.completedSteps && app.completedSteps < app.progressSteps;
            return (
              <span
                key={i}
                className={cn(
                  "flex-1 h-1 rounded-[2px]",
                  isDone && "bg-[var(--ink)]",
                  isActive && "bg-[var(--brand)] [box-shadow:0_0_0_2px_var(--brand-soft)]",
                  !isDone && !isActive && "bg-[var(--rule)]"
                )}
              />
            );
          })}
        </div>

        {/* Meta row */}
        <div className="flex items-start justify-between gap-4 pt-3 border-t border-[var(--rule-soft)]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)] mb-[2px]">Submitted</p>
            <p className="font-sans text-[13.5px] text-[var(--ink)]">{app.submittedAt}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)] mb-[2px]">Est. completion</p>
            <p className="font-sans text-[13.5px] text-[var(--ink)]">{app.estimatedCompletion}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)] mb-[2px]">Tier</p>
            <p className="font-sans text-[13.5px] text-[var(--ink)]">{app.tier}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
