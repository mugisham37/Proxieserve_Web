import * as React from "react";
import { Pencil, WrapText } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusPill } from "@/components/atoms/StatusPill";
import { AdminVersionBadge } from "@/components/atoms/AdminVersionBadge";
import { AppButton } from "@/components/atoms/AppButton";
import type { ServiceRow } from "@/lib/types/admin";

interface ServiceCatalogueRowProps {
  service: ServiceRow;
  isActive: boolean;
  onEdit: () => void;
  onBuild: () => void;
}

const statusPillMap: Record<
  ServiceRow["status"],
  { label: string; variant: "ok" | "warn" | "danger" }
> = {
  active: { label: "Active", variant: "ok" },
  inactive: { label: "Inactive", variant: "danger" },
  draft: { label: "Draft", variant: "warn" },
};

function formatFee(amount: number) {
  return `RWF ${amount.toLocaleString()}`;
}

export function ServiceCatalogueRow({
  service,
  isActive,
  onEdit,
  onBuild,
}: ServiceCatalogueRowProps) {
  const pill = statusPillMap[service.status];

  return (
    <tr
      className={cn(
        "border-b border-[var(--rule-soft)]",
        "transition-colors duration-[var(--m-fast)] hover:bg-[var(--paper-2)]",
        isActive && "bg-[var(--brand-soft)]/20"
      )}
    >
      {/* Name */}
      <td className="px-[16px] py-[12px]">
        <span className="font-sans text-[13px] font-medium text-[var(--ink)]">
          {service.name}
        </span>
      </td>

      {/* Category */}
      <td className="px-[12px] py-[12px] font-sans text-[13px] text-[var(--ink-muted)]">
        {service.category}
      </td>

      {/* Fee */}
      <td className="px-[12px] py-[12px] font-mono text-[13px] text-[var(--ink)] text-right">
        {formatFee(service.fee)}
      </td>

      {/* ETA */}
      <td className="px-[12px] py-[12px] font-sans text-[12px] text-[var(--ink-muted)]">
        {service.eta}
      </td>

      {/* Schema version */}
      <td className="px-[12px] py-[12px]">
        <AdminVersionBadge
          version={service.schemaVersion}
          isLatest={
            service.status === "active" &&
            !service.schemaVersion.includes("draft")
          }
        />
      </td>

      {/* 30d volume */}
      <td className="px-[12px] py-[12px] font-mono text-[13px] text-[var(--ink)] text-right">
        {service.volume30d.toLocaleString()}
      </td>

      {/* Status */}
      <td className="px-[12px] py-[12px]">
        <StatusPill label={pill.label} variant={pill.variant} />
      </td>

      {/* Actions */}
      <td className="px-[12px] py-[12px] pr-[16px]">
        <div className="flex items-center gap-[6px]">
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${service.name}`}
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
          <AppButton
            variant={isActive ? "solid" : "ghost"}
            size="sm"
            onClick={onBuild}
            aria-label={`Build schema for ${service.name}`}
          >
            <WrapText size={12} aria-hidden="true" />
            Schema
          </AppButton>
        </div>
      </td>
    </tr>
  );
}
