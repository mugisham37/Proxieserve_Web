import * as React from "react";
import { Check, X, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingRow } from "@/lib/types/admin";

interface PricingTableRowProps {
  row: PricingRow;
  onEdit: () => void;
  onDelete: () => void;
}

function formatFee(amount: number) {
  return `RWF ${amount.toLocaleString()}`;
}

export function PricingTableRow({ row, onDelete, onEdit }: PricingTableRowProps) {
  return (
    <tr className="border-b border-[var(--rule-soft)] transition-colors duration-[var(--m-fast)] hover:bg-[var(--paper-2)]">
      {/* Service */}
      <td className="px-[16px] py-[12px] font-sans text-[13px] font-medium text-[var(--ink)]">
        {row.service}
      </td>

      {/* Standard fee */}
      <td className="px-[12px] py-[12px] font-mono text-[13px] text-[var(--ink)] text-right">
        {formatFee(row.standardFee)}
      </td>

      {/* Urgent fee */}
      <td className="px-[12px] py-[12px] font-mono text-[13px] text-[var(--ink)] text-right">
        {formatFee(row.urgentFee)}
      </td>

      {/* Gov passthrough */}
      <td className="px-[12px] py-[12px] text-center">
        {row.govFeePassthrough ? (
          <Check
            size={15}
            className="mx-auto text-[var(--ok)]"
            aria-label="Yes"
          />
        ) : (
          <X
            size={15}
            className="mx-auto text-[var(--ink-subtle)]"
            aria-label="No"
          />
        )}
      </td>

      {/* Effective date */}
      <td className="px-[12px] py-[12px] font-mono text-[12px] text-[var(--ink-muted)]">
        {row.effectiveDate}
        {row.scheduledChange && (
          <div className="text-[var(--warn)] text-[10px] mt-[2px]">
            → {formatFee(row.scheduledChange.newStandardFee)} on {row.scheduledChange.effectiveDate}
          </div>
        )}
      </td>

      {/* Actions */}
      <td className="px-[12px] py-[12px] pr-[16px]">
        <div className="flex items-center gap-[6px] justify-end">
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit pricing for ${row.service}`}
            className={cn(
              "w-[28px] h-[28px] rounded-[var(--r-sm)]",
              "flex items-center justify-center",
              "text-[var(--ink-muted)] hover:bg-[var(--cream)] hover:text-[var(--ink)]",
              "transition-colors duration-[var(--m-fast)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            )}
          >
            <Pencil size={13} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete pricing row for ${row.service}`}
            className={cn(
              "w-[28px] h-[28px] rounded-[var(--r-sm)]",
              "flex items-center justify-center",
              "text-[var(--ink-muted)] hover:bg-[var(--danger-soft)] hover:text-[var(--danger)]",
              "transition-colors duration-[var(--m-fast)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            )}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
}
