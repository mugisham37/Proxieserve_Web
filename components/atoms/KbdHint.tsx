import * as React from "react";
import { cn } from "@/lib/utils";

interface KbdHintProps {
  children: React.ReactNode;
  className?: string;
}

export function KbdHint({ children, className }: KbdHintProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center",
        "px-[5px] py-[1px] min-w-[18px] h-[18px]",
        "font-mono text-[10px] font-medium",
        "bg-[var(--paper-2)] text-[var(--ink-muted)]",
        "border border-[var(--rule-strong)] rounded-[var(--r-sm)]",
        "shadow-[0_1px_0_var(--rule-strong)]",
        className
      )}
    >
      {children}
    </kbd>
  );
}
