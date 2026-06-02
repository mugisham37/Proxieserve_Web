import * as React from "react";
import { cn } from "@/lib/utils";
import type { PaymentRecord } from "@/lib/dashboard-data";

const STATUS_BADGE: Record<PaymentRecord["status"], { label: string; className: string }> = {
  paid:     { label: "Paid",     className: "bg-[var(--ok-soft)] text-[var(--ok)]" },
  pending:  { label: "Pending",  className: "bg-[var(--warn-soft)] text-[var(--warn)]" },
  refunded: { label: "Refunded", className: "bg-[var(--info-soft)] text-[var(--info)]" },
};

interface PaymentHistoryRowProps {
  payment: PaymentRecord;
}

function formatAmount(amount: number): string {
  return `RWF ${amount.toLocaleString("en-RW")}`;
}

export function PaymentHistoryRow({ payment }: PaymentHistoryRowProps) {
  const badge = STATUS_BADGE[payment.status];

  return (
    <div
      className="flex items-baseline justify-between gap-4 py-[14px] border-b border-[var(--rule-soft)] last:border-b-0"
      role="row"
    >
      {/* Left: description + method */}
      <div className="min-w-0">
        <p className="font-sans text-[13.5px] text-[var(--ink)] m-0 leading-snug truncate">
          {payment.description}
        </p>
        <p className="font-mono text-[11px] text-[var(--ink-muted)] mt-[2px] m-0">
          {payment.method} · <time dateTime={payment.paidAt}>{payment.paidAt}</time>
        </p>
      </div>

      {/* Right: amount + status */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-mono text-[15px] font-bold text-[var(--ink)]">
          {formatAmount(payment.amount)}
        </span>
        <span
          className={cn(
            "inline-flex items-center px-[8px] py-[2px] rounded-[999px]",
            "font-sans text-[10px] font-semibold leading-none",
            badge.className
          )}
        >
          {badge.label}
        </span>
      </div>
    </div>
  );
}
