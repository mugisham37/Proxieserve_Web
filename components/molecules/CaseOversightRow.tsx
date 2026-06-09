import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusPill } from "@/components/atoms/StatusPill";
import { AppButton } from "@/components/atoms/AppButton";
import type { OversightCase } from "@/lib/types/admin";

interface CaseOversightRowProps {
  item: OversightCase;
  onIntervene: () => void;
}

const statusPillMap: Record<
  OversightCase["status"],
  { label: string; variant: "ok" | "warn" | "danger" | "info" | "brand" }
> = {
  "in-progress": { label: "In progress", variant: "info" },
  "sla-breach": { label: "SLA breach", variant: "danger" },
  disputed: { label: "Disputed", variant: "warn" },
  escalated: { label: "Escalated", variant: "danger" },
  resolved: { label: "Resolved", variant: "ok" },
};

export function CaseOversightRow({ item, onIntervene }: CaseOversightRowProps) {
  const pill = statusPillMap[item.status];
  const needsAction =
    item.status === "sla-breach" ||
    item.status === "disputed" ||
    item.status === "escalated";

  return (
    <tr
      className={cn(
        "border-b border-[var(--rule-soft)]",
        "transition-colors duration-[var(--m-fast)] hover:bg-[var(--paper-2)]",
        needsAction && "bg-[var(--danger-soft)]/30"
      )}
    >
      {/* Code */}
      <td className="px-[16px] py-[12px]">
        <span className="font-mono text-[12px] text-[var(--ink)]">{item.code}</span>
      </td>

      {/* Service */}
      <td className="px-[12px] py-[12px] font-sans text-[13px] text-[var(--ink)]">
        {item.service}
      </td>

      {/* Agent */}
      <td className="px-[12px] py-[12px] font-sans text-[13px] text-[var(--ink-muted)]">
        {item.agent}
      </td>

      {/* Client */}
      <td className="px-[12px] py-[12px] font-sans text-[13px] text-[var(--ink-muted)]">
        {item.client}
      </td>

      {/* Status */}
      <td className="px-[12px] py-[12px]">
        <StatusPill label={pill.label} variant={pill.variant} />
      </td>

      {/* Issue */}
      <td className="px-[12px] py-[12px]">
        {item.issue ? (
          <div className="flex items-center gap-[6px]">
            <AlertCircle
              size={13}
              className="shrink-0 text-[var(--danger)]"
              aria-hidden="true"
            />
            <span className="font-sans text-[12px] text-[var(--danger)]">
              {item.issue}
            </span>
          </div>
        ) : (
          <span className="text-[var(--ink-subtle)] text-[12px]">—</span>
        )}
      </td>

      {/* Action */}
      <td className="px-[12px] py-[12px] pr-[16px]">
        {needsAction && (
          <AppButton
            variant="ghost"
            size="sm"
            onClick={onIntervene}
            aria-label={`Intervene on case ${item.code}`}
          >
            Intervene
          </AppButton>
        )}
      </td>
    </tr>
  );
}
