import * as React from "react";
import { cn } from "@/lib/utils";
import type { SLAState } from "@/lib/types/agent";

interface SLABadgeProps {
  state: SLAState;
  label: string;
  className?: string;
}

export function SLABadge({ state, label, className }: SLABadgeProps) {
  if (state === "ok") return null;

  return (
    <span
      className={cn(
        "inline-flex items-center px-[6px] py-[2px] rounded-[var(--r-pill)]",
        "font-mono text-[11px] font-medium whitespace-nowrap",
        state === "over" &&
          "bg-[var(--danger-soft)] text-[var(--danger)]",
        state === "warn" &&
          "bg-[var(--warn-soft)] text-[var(--warn)]",
        className
      )}
    >
      {label}
    </span>
  );
}
