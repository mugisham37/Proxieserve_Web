import * as React from "react";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/services-data";

interface FeeSummaryProps {
  service: Service;
  className?: string;
}

const GOV_FEE = 2000; // RWF flat government processing fee

export function FeeSummary({ service, className }: FeeSummaryProps) {
  const total = service.fee + GOV_FEE;

  return (
    <div className={cn("bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-5 flex flex-col gap-3", className)}>
      <span className="eyebrow text-[var(--ink-subtle)]">Fee summary</span>

      <div className="flex flex-col gap-2.5 border-t border-[var(--rule-soft)] pt-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-sans text-[13px] text-[var(--ink-muted)]">Service fee</span>
          <span className="font-mono text-[13px] text-[var(--ink)]">
            RWF {service.fee.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="font-sans text-[13px] text-[var(--ink-muted)]">Government processing</span>
          <span className="font-mono text-[13px] text-[var(--ink)]">
            RWF {GOV_FEE.toLocaleString()}
          </span>
        </div>

        <div className="flex items-start gap-1.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5 text-[var(--ink-subtle)]" aria-hidden="true">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
            <path d="M7 6.5V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="7" cy="4.5" r="0.6" fill="currentColor" />
          </svg>
          <span className="font-sans text-[11px] text-[var(--ink-subtle)]">
            VAT may apply depending on your tax registration status
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-[var(--rule)] pt-3">
        <span className="font-sans text-[14px] font-semibold text-[var(--ink)]">Estimated total</span>
        <span className="font-mono text-[16px] font-semibold text-[var(--ink)]">
          RWF {total.toLocaleString()}
        </span>
      </div>

      <p className="font-sans text-[11.5px] text-[var(--ink-subtle)] leading-relaxed border-t border-[var(--rule-soft)] pt-3">
        You pay nothing now — your agent confirms the exact total before any payment is collected.
      </p>
    </div>
  );
}
