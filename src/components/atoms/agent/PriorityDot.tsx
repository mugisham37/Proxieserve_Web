import * as React from "react";
import { cn } from "@/lib/utils";
import type { Priority } from "@/lib/types/agent";

interface PriorityDotProps {
  priority: Priority;
  className?: string;
}

const LABEL: Record<Priority, string> = {
  high: "High priority",
  mid: "Medium priority",
  low: "Low priority",
};

export function PriorityDot({ priority, className }: PriorityDotProps) {
  return (
    <span
      aria-label={LABEL[priority]}
      role="img"
      className={cn(
        "inline-block w-[7px] h-[7px] rounded-full shrink-0",
        priority === "high" && "bg-[var(--danger)]",
        priority === "mid" && "bg-[var(--warn)]",
        priority === "low" && "bg-[var(--ink-subtle)]",
        className
      )}
    />
  );
}
