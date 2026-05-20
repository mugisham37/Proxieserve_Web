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

interface RequirementRowProps {
  requirement: ServiceRequirement;
  className?: string;
}

export function RequirementRow({ requirement, className }: RequirementRowProps) {
  const Icon = DOC_ICONS[requirement.docType];

  return (
    <div className={cn("flex items-start gap-3 py-3 border-b border-[var(--rule-soft)] last:border-0", className)}>
      <span className="mt-0.5 shrink-0 w-7 h-7 rounded-[var(--r-sm)] bg-[var(--cream)] border border-[var(--rule-soft)] flex items-center justify-center">
        <Icon size={14} className="text-[var(--ink-muted)]" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-sans text-[14px] text-[var(--ink)] leading-snug">{requirement.label}</span>
        {requirement.note && (
          <span className="font-sans text-[12px] text-[var(--ink-subtle)]">{requirement.note}</span>
        )}
      </div>
    </div>
  );
}
