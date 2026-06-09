import * as React from "react";
import { cn } from "@/lib/utils";
import type { CaseDetail } from "@/lib/types/agent";

interface PaymentRailCardProps {
  detail: Pick<
    CaseDetail,
    "paymentStatus" | "paymentAmount" | "paymentMethod" | "paymentDate"
  >;
  onViewReceipt?: () => void;
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

export function PaymentRailCard({ detail, onViewReceipt }: PaymentRailCardProps) {
  return (
    <div className="bg-[var(--paper)] rounded-[var(--r-lg)] border border-[var(--rule)] p-[18px]">
      <div className="flex items-center justify-between mb-[6px]">
        <h3 className="font-sans text-[12px] font-semibold text-[var(--ink)]">
          Payment
        </h3>
        {onViewReceipt && (
          <button
            type="button"
            onClick={onViewReceipt}
            className={cn(
              "font-sans text-[11px] text-[var(--ink-muted)]",
              "underline underline-offset-2",
              "hover:text-[var(--ink)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            )}
          >
            view receipt
          </button>
        )}
      </div>
      <RailLine
        label="Service fee"
        value={
          <span className="font-mono text-[13px]">
            RWF {detail.paymentAmount.toLocaleString()}
          </span>
        }
      />
      <RailLine
        label="Status"
        value={
          detail.paymentStatus === "paid"
            ? `Paid${detail.paymentDate ? ` · ${detail.paymentDate}` : ""}`
            : detail.paymentStatus === "unpaid"
            ? "Unpaid"
            : "Partial"
        }
        valueClassName={
          detail.paymentStatus === "paid"
            ? "text-[var(--ok)] font-medium"
            : "text-[var(--warn)] font-medium"
        }
      />
      <RailLine label="Method" value={detail.paymentMethod} />
    </div>
  );
}
