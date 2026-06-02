import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaVariant?: "ok" | "warn" | "neutral";
  variant?: "default" | "brand";
}

export function StatCard({
  label,
  value,
  delta,
  deltaVariant = "neutral",
  variant = "default",
}: StatCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-3 px-5 py-[18px] border rounded-[var(--r-md)]",
        variant === "brand"
          ? "bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)]"
          : "bg-[var(--paper)] border-[var(--rule)]"
      )}
      aria-label={`Statistic: ${value} ${label}`}
    >
      <p
        className={cn(
          "font-mono text-[10px] uppercase tracking-[0.08em] m-0",
          variant === "brand" ? "text-[rgba(246,236,210,0.65)]" : "text-[var(--ink-muted)]"
        )}
      >
        {label}
      </p>

      <p
        className={cn(
          "font-serif text-[36px] font-normal leading-none m-0",
          variant === "brand" ? "text-[var(--paper)]" : "text-[var(--ink)]"
        )}
      >
        {value}
      </p>

      {delta && (
        <p
          className={cn(
            "font-sans text-[11.5px] m-0",
            deltaVariant === "ok" && "text-[var(--ok)]",
            deltaVariant === "warn" && "text-[var(--warn)]",
            deltaVariant === "neutral" &&
              (variant === "brand" ? "text-[rgba(246,236,210,0.6)]" : "text-[var(--ink-muted)]")
          )}
        >
          {delta}
        </p>
      )}
    </article>
  );
}
