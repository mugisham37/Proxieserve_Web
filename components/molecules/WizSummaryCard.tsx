import * as React from "react";
import { cn } from "@/lib/utils";
import { type Service } from "@/lib/services-data";

interface WizSummaryCardProps {
  service: Service;
  className?: string;
}

export function WizSummaryCard({ service, className }: WizSummaryCardProps) {
  return (
    <div className={cn("bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-5 flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-0.5">
        <span className="eyebrow text-[var(--ink-subtle)]">Service</span>
        <span className="font-serif text-[16px] font-medium text-[var(--ink)] italic">{service.name}</span>
      </div>

      <div className="flex flex-col gap-3 border-t border-[var(--rule-soft)] pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-sans text-[12px] text-[var(--ink-muted)]">Service fee</span>
          <span className="font-mono text-[13px] font-medium text-[var(--ink)]">
            RWF {service.fee.toLocaleString()}
          </span>
        </div>
        {service.urgentFee && (
          <div className="flex items-center justify-between gap-2">
            <span className="font-sans text-[12px] text-[var(--ink-muted)]">Urgent fee</span>
            <span className="font-mono text-[13px] font-medium text-[var(--ink)]">
              RWF {service.urgentFee.toLocaleString()}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <span className="font-sans text-[12px] text-[var(--ink-muted)]">Turnaround</span>
          <span className="font-sans text-[13px] font-medium text-[var(--ink)]">{service.eta}</span>
        </div>
        {service.flags.inPersonRequired && (
          <div className="flex items-start gap-2 bg-[var(--warn-soft)] rounded-[var(--r-sm)] px-3 py-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
              <path d="M7 1L13 12H1L7 1Z" stroke="var(--warn)" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M7 5.5V8" stroke="var(--warn)" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="7" cy="10" r="0.6" fill="var(--warn)" />
            </svg>
            <span className="font-sans text-[12px] text-[var(--warn)] leading-snug">
              One in-person visit required
            </span>
          </div>
        )}
      </div>

      <p className="font-sans text-[11px] text-[var(--ink-subtle)] border-t border-[var(--rule-soft)] pt-3 leading-relaxed">
        You pay nothing now — your agent confirms the total before any payment is collected.
      </p>
    </div>
  );
}
