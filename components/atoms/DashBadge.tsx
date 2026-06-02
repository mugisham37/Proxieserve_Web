import * as React from "react";
import { cn } from "@/lib/utils";

interface DashBadgeProps {
  count: number;
  variant?: "brand" | "ok" | "warn";
  className?: string;
}

export function DashBadge({ count, variant = "brand", className }: DashBadgeProps) {
  if (count <= 0) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "min-w-[20px] h-5 px-[6px]",
        "font-mono text-[10px] font-semibold leading-none",
        "rounded-[999px]",
        variant === "brand" && "bg-[var(--brand)] text-white",
        variant === "ok" && "bg-[var(--ok-soft)] text-[var(--ok)]",
        variant === "warn" && "bg-[var(--warn-soft)] text-[var(--warn)]",
        className
      )}
      aria-hidden="true"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
