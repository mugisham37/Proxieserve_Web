import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoChipProps {
  icon: LucideIcon;
  label: string;
  mono?: boolean;
  className?: string;
}

export function InfoChip({ icon: Icon, label, mono, className }: InfoChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[var(--ink-muted)]",
        mono ? "font-mono text-[13px]" : "font-sans text-[13px]",
        className
      )}
    >
      <Icon size={14} className="shrink-0 text-[var(--ink-subtle)]" aria-hidden="true" />
      {label}
    </span>
  );
}
