"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { PillButton } from "@/components/atoms/shared/PillButton";
import { formatRWF } from "@/lib/types/payment";
import { cn } from "@/lib/utils";

interface StaleFeeNoticeProps {
  oldFee: number;
  newFee: number;
  onReconfirm: () => void;
  className?: string;
}

export function StaleFeeNotice({
  oldFee,
  newFee,
  onReconfirm,
  className,
}: StaleFeeNoticeProps) {
  const increased = newFee > oldFee;

  return (
    <div
      className={cn(
        "rounded-[var(--r-lg)] border border-[var(--warn)] bg-[var(--warn-soft)] p-5",
        "flex flex-col gap-4",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          size={18}
          strokeWidth={1.5}
          className="text-[var(--warn)] flex-shrink-0 mt-0.5"
        />
        <div className="flex flex-col gap-1">
          <p className="font-serif text-[15px] font-medium text-[var(--ink)]">
            Fee {increased ? "increased" : "updated"}
          </p>
          <p className="font-sans text-[13px] text-[var(--ink-muted)]">
            The service fee changed since you opened this page. Please review before paying.
          </p>
        </div>
      </div>

      {/* Fee diff */}
      <div className="flex items-center gap-3 bg-[var(--paper)] rounded-[var(--r-md)] px-4 py-3">
        <span className="font-mono text-[14px] text-[var(--ink-muted)] line-through tabular-nums">
          {formatRWF(oldFee)}
        </span>
        <span className="text-[var(--ink-subtle)] text-[12px]">→</span>
        <span className="font-mono text-[15px] font-medium text-[var(--ink)] tabular-nums">
          {formatRWF(newFee)}
        </span>
        <span className={cn(
          "ml-auto font-sans text-[11px] font-medium px-2 py-0.5 rounded-[var(--r-pill)]",
          increased
            ? "bg-[var(--danger-soft)] text-[var(--danger)]"
            : "bg-[var(--ok-soft)] text-[var(--ok)]"
        )}>
          {increased ? "↑" : "↓"} {formatRWF(Math.abs(newFee - oldFee))}
        </span>
      </div>

      <PillButton variant="solid" size="sm" onClick={onReconfirm} className="self-start">
        Confirm new fee and continue
      </PillButton>
    </div>
  );
}
