import * as React from "react";
import { cn } from "@/lib/utils";
import { DocThumb } from "@/components/atoms/DocThumb";
import { PillButton } from "@/components/atoms/PillButton";
import type { DashboardDocument } from "@/lib/dashboard-data";

interface DashDocRowProps {
  doc: DashboardDocument;
}

const VERIFICATION_BADGE: Record<DashboardDocument["verificationStatus"], { label: string; className: string }> = {
  verified: { label: "Verified", className: "bg-[var(--ok-soft)] text-[var(--ok)]" },
  pending: { label: "Pending", className: "bg-[var(--warn-soft)] text-[var(--warn)]" },
  rejected: { label: "Rejected", className: "bg-[var(--danger-soft)] text-[var(--danger)]" },
};

export function DashDocRow({ doc }: DashDocRowProps) {
  const badge = VERIFICATION_BADGE[doc.verificationStatus];

  return (
    <li className="grid grid-cols-[40px_1fr_auto] gap-[14px] items-center px-3 py-3 bg-[var(--cream)] border border-[var(--rule)] rounded-[var(--r-md)]">
      <DocThumb ext={doc.ext} />

      <div className="min-w-0">
        <p className="font-sans text-[14px] font-medium text-[var(--ink)] truncate m-0">{doc.label}</p>
        <div className="flex items-center gap-2 mt-[3px]">
          <p className="font-mono text-[11px] text-[var(--ink-muted)] m-0">{doc.uploadedAt} · {doc.size}</p>
          <span className={cn("inline-flex items-center px-[7px] py-[1px] rounded-[999px] font-sans text-[10px] font-semibold", badge.className)}>
            {badge.label}
          </span>
        </div>
      </div>

      <PillButton
        size="sm"
        variant="ghost"
        className="text-[12px] px-[14px] py-[6px]"
        aria-label={`Download ${doc.label}`}
      >
        Download
      </PillButton>
    </li>
  );
}
