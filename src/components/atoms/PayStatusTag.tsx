import * as React from "react";
import { cn } from "@/lib/utils";

type PayStatusVariant = "ok" | "warn" | "danger" | "info" | "brand" | "muted";

interface PayStatusTagProps {
  variant: PayStatusVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<PayStatusVariant, string> = {
  ok: "bg-[var(--ok-soft)] text-[var(--ok)]",
  warn: "bg-[var(--warn-soft)] text-[var(--warn)]",
  danger: "bg-[var(--danger-soft)] text-[var(--danger)]",
  info: "bg-[var(--info-soft)] text-[var(--info)]",
  brand: "bg-[var(--brand-soft)] text-[var(--brand-ink)]",
  muted: "bg-[var(--cream-2)] text-[var(--ink-muted)]",
};

export function PayStatusTag({ variant, children, className }: PayStatusTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--r-pill)] px-2.5 py-1",
        "font-mono text-[10px] font-medium uppercase tracking-[0.1em]",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
