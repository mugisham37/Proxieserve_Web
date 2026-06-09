import * as React from "react";
import { cn } from "@/lib/utils";

interface EnvBadgeProps {
  env?: "production" | "staging";
  className?: string;
}

export function EnvBadge({ env = "production", className }: EnvBadgeProps) {
  const isProduction = env === "production";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--r-pill)]",
        "font-mono text-[11px] font-medium leading-none",
        isProduction
          ? "bg-[var(--ok-soft)] text-[var(--ok)]"
          : "bg-[var(--warn-soft)] text-[var(--warn)]",
        className
      )}
    >
      <span
        className={cn(
          "block w-1.5 h-1.5 rounded-full",
          isProduction ? "bg-[var(--ok)]" : "bg-[var(--warn)]"
        )}
        aria-hidden="true"
      />
      {isProduction ? "Production" : "Staging"}
    </span>
  );
}
