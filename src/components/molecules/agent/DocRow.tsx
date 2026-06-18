import * as React from "react";
import { DocThumb } from "@/components/atoms/shared/DocThumb";
import { PillButton } from "@/components/atoms/shared/PillButton";
import type { DocFile } from "@/lib/tracker-ui-types";

interface DocRowProps {
  doc: DocFile;
  /** Authenticated users can view; guests cannot */
  canView?: boolean;
}

export function DocRow({ doc, canView = false }: DocRowProps) {
  return (
    <li className="grid grid-cols-[40px_1fr_auto] gap-[14px] items-center px-3 py-3 bg-[var(--cream)] border border-[var(--rule)] rounded-[var(--r-md)]">
      <DocThumb ext={doc.ext} />

      <div className="min-w-0">
        <p className="font-sans text-[14px] font-medium text-[var(--ink)] truncate m-0">{doc.label}</p>
        <p className="font-mono text-[11px] text-[var(--ink-muted)] mt-[2px] m-0">{doc.uploadedAt}</p>
      </div>

      <PillButton
        size="sm"
        variant="ghost"
        disabled={!canView || doc.restricted}
        aria-label={canView && !doc.restricted ? `View ${doc.label}` : `View — requires sign in`}
        className="text-[12px] px-[14px] py-[6px]"
      >
        View
      </PillButton>
    </li>
  );
}
