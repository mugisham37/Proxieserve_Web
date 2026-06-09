import * as React from "react";
import { cn } from "@/lib/utils";

interface ReceiptRowProps {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  status?: "ok" | "muted";
  className?: string;
}

export function ReceiptRow({ label, value, mono, status, className }: ReceiptRowProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 py-2.5", className)}>
      <span className="font-sans text-[13px] text-[var(--ink-muted)] flex-shrink-0">
        {label}
      </span>
      <span
        className={cn(
          "text-[13px] text-right",
          mono ? "font-mono" : "font-sans",
          status === "ok"
            ? "text-[var(--ok)] font-medium"
            : status === "muted"
            ? "text-[var(--ink-muted)]"
            : "text-[var(--ink)]"
        )}
      >
        {value}
      </span>
    </div>
  );
}
