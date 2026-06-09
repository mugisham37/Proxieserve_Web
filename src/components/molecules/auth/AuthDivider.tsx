import * as React from "react";
import { cn } from "@/lib/utils";

interface AuthDividerProps {
  label?: string;
  className?: string;
}

export function AuthDivider({ label = "or", className }: AuthDividerProps) {
  return (
    <div className={cn("flex items-center gap-3 my-1", className)}>
      <div className="flex-1 h-px bg-[var(--rule)]" />
      <span className="font-sans text-[12px] text-[var(--ink-muted)] leading-none">
        {label}
      </span>
      <div className="flex-1 h-px bg-[var(--rule)]" />
    </div>
  );
}
