import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineDotProps {
  status: "done" | "current" | "upcoming";
  /** Enable the halo-pulse CSS animation on the current dot (disabled by prefers-reduced-motion) */
  animated?: boolean;
  className?: string;
}

export function TimelineDot({ status, animated = true, className }: TimelineDotProps) {
  return (
    <span
      className={cn(
        "relative z-[1] inline-flex items-center justify-center shrink-0",
        "w-[23px] h-[23px] rounded-full mt-[4px]",
        status === "done" && "bg-[var(--ink)] border border-[var(--ink)] text-[var(--paper)]",
        status === "current" && [
          "bg-[var(--brand)] border border-[var(--brand)]",
          animated && "[animation:halo-pulse_1.6s_ease-in-out_infinite]",
        ],
        status === "upcoming" && "bg-[var(--paper)] border-[1.5px] border-dashed border-[var(--rule-strong)]",
        className
      )}
      aria-hidden="true"
    >
      {status === "done" && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {status === "current" && (
        <span className="absolute inset-[4px] rounded-full bg-white" />
      )}
    </span>
  );
}
