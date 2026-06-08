import * as React from "react";
import { cn } from "@/lib/utils";
import type { DeltaColor } from "@/lib/types/dashboard";

interface StatTileProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaColor?: DeltaColor;
  variant?: "default" | "brand";
  className?: string;
}

export function StatTile({
  label,
  value,
  delta,
  deltaColor = "muted",
  variant = "default",
  className,
}: StatTileProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[4px] px-[18px] py-[16px] rounded-[var(--r-md)] border",
        variant === "default"
          ? "bg-[var(--paper)] border-[var(--rule)] text-[var(--ink)]"
          : "bg-[var(--ink)] border-[var(--ink)] text-[var(--cream)]",
        className
      )}
    >
      <p
        className={cn(
          "font-mono text-[10px] tracking-[0.08em] uppercase",
          variant === "default" ? "text-[var(--ink-muted)]" : "text-[var(--cream)]/65"
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "font-serif text-[36px] leading-[1] font-normal",
          variant === "default" ? "text-[var(--ink)]" : "text-[var(--cream)]"
        )}
      >
        {value}
      </p>
      {delta && (
        <p
          className={cn(
            "font-sans text-[11.5px] leading-[1.4]",
            variant === "brand"
              ? "text-[var(--cream)]/65"
              : deltaColor === "ok"
              ? "text-[var(--ok)]"
              : deltaColor === "brand"
              ? "text-[var(--brand)]"
              : "text-[var(--ink-muted)]"
          )}
        >
          {delta}
        </p>
      )}
    </div>
  );
}
