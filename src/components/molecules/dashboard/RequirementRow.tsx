import * as React from "react";
import { FileText, CreditCard, Camera, ClipboardList, Receipt, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ServiceRequirement } from "@/lib/services-data";

const DOC_ICONS: Record<ServiceRequirement["docType"], React.ElementType> = {
  id: CreditCard,
  certificate: FileText,
  photo: Camera,
  form: ClipboardList,
  proof: Receipt,
  other: File,
};

const STATUS_STYLES: Record<string, string> = {
  required: "text-[var(--ink)] bg-[var(--cream)] border-[var(--rule)]",
  optional: "text-[var(--ink-muted)] bg-transparent border-[var(--rule-soft)]",
  conditional: "text-[var(--warn)] bg-[var(--warn-soft)] border-transparent",
};

const STATUS_LABELS: Record<string, string> = {
  required: "Required",
  optional: "Optional",
  conditional: "Conditional",
};

interface RequirementRowProps {
  requirement: ServiceRequirement;
  className?: string;
}

export function RequirementRow({ requirement, className }: RequirementRowProps) {
  const Icon = DOC_ICONS[requirement.docType];
  const status = requirement.status ?? "required";

  return (
    <div className={cn("flex items-start gap-3 py-3.5 border-b border-[var(--rule-soft)] last:border-0", className)}>
      <span className="mt-0.5 shrink-0 w-7 h-7 rounded-[var(--r-sm)] bg-[var(--cream)] border border-[var(--rule-soft)] flex items-center justify-center">
        <Icon size={13} className="text-[var(--ink-muted)]" aria-hidden="true" />
      </span>

      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="font-sans text-[14px] text-[var(--ink)] leading-snug">{requirement.label}</span>
        {requirement.note && (
          <span className="font-sans text-[12px] text-[var(--ink-subtle)] leading-snug">{requirement.note}</span>
        )}
      </div>

      <span
        className={cn(
          "shrink-0 mt-0.5 font-sans text-[11px] font-semibold uppercase tracking-[0.08em] px-2 py-0.5 rounded-[var(--r-pill)] border",
          STATUS_STYLES[status]
        )}
      >
        {STATUS_LABELS[status]}
      </span>
    </div>
  );
}
