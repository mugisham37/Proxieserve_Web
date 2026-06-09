import * as React from "react";
import { cn } from "@/lib/utils";

interface AdminVersionBadgeProps {
  version: string;
  isLatest?: boolean;
  className?: string;
}

export function AdminVersionBadge({ version, isLatest = false, className }: AdminVersionBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-[7px] py-[2px]",
        "font-mono text-[10px] tracking-[0.06em]",
        "rounded-[var(--r-sm)] border",
        isLatest
          ? "bg-[var(--ok-soft)] text-[var(--ok)] border-[var(--ok-soft)]"
          : version.includes("draft")
          ? "bg-[var(--warn-soft)] text-[var(--warn)] border-[var(--warn-soft)]"
          : "bg-[var(--paper-2)] text-[var(--ink-muted)] border-[var(--rule)]",
        className
      )}
    >
      {version}
    </span>
  );
}
