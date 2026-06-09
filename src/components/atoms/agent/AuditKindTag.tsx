import * as React from "react";
import { cn } from "@/lib/utils";
import type { AuditKind } from "@/lib/types/admin";

interface AuditKindTagProps {
  kind: AuditKind;
  className?: string;
}

const kindStyles: Record<AuditKind, string> = {
  Privileged: "bg-[var(--danger-soft)] text-[var(--danger)]",
  Money: "bg-[var(--ok-soft)] text-[var(--ok)]",
  Config: "bg-[var(--info-soft)] text-[var(--info)]",
  Assignment: "bg-[var(--warn-soft)] text-[var(--warn)]",
};

export function AuditKindTag({ kind, className }: AuditKindTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-[8px] py-[2px]",
        "font-mono text-[10px] tracking-[0.06em] uppercase",
        "rounded-[var(--r-sm)]",
        kindStyles[kind],
        className
      )}
    >
      {kind}
    </span>
  );
}
