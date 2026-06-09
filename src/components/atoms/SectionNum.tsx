import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionNumProps extends React.HTMLAttributes<HTMLSpanElement> {
  num: string;
  label: string;
}

export function SectionNum({ num, label, className, ...props }: SectionNumProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] font-medium text-[var(--ink-muted)] uppercase tracking-wider",
        className
      )}
      {...props}
    >
      <span>{num.padStart(2, "0")}</span>
      <span className="w-px h-3 bg-[var(--rule-strong)]" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}
