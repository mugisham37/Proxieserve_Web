import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  color?: "brand" | "ok" | "ink";
}

export function ProgressBar({ value, className, color = "ink" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const colorClass = {
    brand: "bg-[var(--brand)]",
    ok: "bg-[var(--ok)]",
    ink: "bg-[var(--ink)]",
  }[color];

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-1 w-full rounded-full bg-[var(--rule-soft)] overflow-hidden", className)}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-200", colorClass)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
