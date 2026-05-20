import * as React from "react";
import { cn } from "@/lib/utils";

interface ReviewRowProps {
  label: string;
  value?: string | React.ReactNode;
  mono?: boolean;
  className?: string;
}

export function ReviewRow({ label, value, mono, className }: ReviewRowProps) {
  const isEmpty = !value || value === "" || value === false;

  return (
    <div className={cn("flex items-start justify-between gap-4 py-2.5", className)}>
      <span className="font-sans text-[12px] text-[var(--ink-muted)] shrink-0 min-w-[120px]">{label}</span>
      <span
        className={cn(
          "text-right text-[13px] break-words",
          mono ? "font-mono text-[var(--ink)]" : "font-sans text-[var(--ink)]",
          isEmpty && "text-[var(--ink-subtle)] italic"
        )}
      >
        {isEmpty ? "— not provided" : value}
      </span>
    </div>
  );
}
