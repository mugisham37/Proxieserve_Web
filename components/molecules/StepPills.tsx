import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepPillsProps {
  current: 1 | 2;
  total?: number;
  className?: string;
}

export function StepPills({ current, total = 2, className }: StepPillsProps) {
  return (
    <div className={cn("flex items-center gap-2 mb-6", className)} aria-label="Progress">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const isDone = step < current;
        const isActive = step === current;

        return (
          <React.Fragment key={step}>
            <span
              aria-current={isActive ? "step" : undefined}
              className={cn(
                "inline-flex items-center justify-center w-6 h-6 rounded-full",
                "font-sans text-[11px] font-semibold transition-colors duration-200",
                isDone && "bg-[var(--ok)] text-white",
                isActive && "bg-[var(--ink)] text-[var(--paper)]",
                !isDone && !isActive && "bg-[var(--rule)] text-[var(--ink-muted)]"
              )}
            >
              {isDone ? <Check size={12} strokeWidth={2.5} /> : step}
            </span>
            {step < total && (
              <div
                className={cn(
                  "flex-1 h-px max-w-[32px]",
                  isDone ? "bg-[var(--ok)]" : "bg-[var(--rule)]"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
