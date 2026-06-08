import * as React from "react";
import { formatRWF, computeVAT } from "@/lib/types/payment";
import { cn } from "@/lib/utils";

interface DarkFeeSummaryProps {
  serviceName: string;
  serviceFee: number;
  governmentFee?: number;
  vatRate?: number;
  platformFee?: number;
  className?: string;
}

function Row({
  label,
  value,
  muted,
  total,
}: {
  label: string;
  value: string;
  muted?: boolean;
  total?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4",
        total && "pt-3 border-t border-[rgba(246,236,210,0.15)] mt-1"
      )}
    >
      <span
        className={cn(
          "font-sans text-[13px]",
          muted ? "text-[rgba(246,236,210,0.45)]" : "text-[rgba(246,236,210,0.7)]"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "font-mono text-[13px] tabular-nums",
          total ? "text-[rgba(246,236,210,0.95)] font-medium text-[14px]" : "text-[rgba(246,236,210,0.8)]"
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function DarkFeeSummary({
  serviceName,
  serviceFee,
  governmentFee = 0,
  vatRate = 0.18,
  platformFee = 0,
  className,
}: DarkFeeSummaryProps) {
  const vatAmount = computeVAT(serviceFee, vatRate);

  return (
    <aside
      aria-label="Fee summary"
      className={cn(
        "rounded-[var(--r-lg)] bg-[var(--ink)] p-5 flex flex-col gap-3",
        className
      )}
    >
      <div className="border-b border-[rgba(246,236,210,0.12)] pb-3 mb-1">
        <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-[rgba(246,236,210,0.45)] mb-1">
          Fee summary
        </p>
        <p className="font-serif italic text-[rgba(246,236,210,0.9)] text-[15px] leading-snug">
          {serviceName}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Row label="Service fee" value={formatRWF(serviceFee)} />
        <Row label={`VAT (included, ${Math.round(vatRate * 100)}%)`} value={formatRWF(vatAmount)} muted />
        <Row label="Platform fee" value={platformFee === 0 ? "Free" : formatRWF(platformFee)} muted />
        <Row label="Total due now" value={formatRWF(serviceFee + platformFee)} total />
      </div>

      {governmentFee > 0 && (
        <p className="font-sans text-[11px] text-[rgba(246,236,210,0.35)] leading-snug mt-1 pt-3 border-t border-[rgba(246,236,210,0.08)]">
          Government fee of {formatRWF(governmentFee)} is paid separately at the office.
        </p>
      )}
    </aside>
  );
}
