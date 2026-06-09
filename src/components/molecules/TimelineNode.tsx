import * as React from "react";
import { cn } from "@/lib/utils";
import { TimelineDot } from "@/components/atoms/TimelineDot";
import type { TimelineStep } from "@/lib/tracker-data";

interface TimelineNodeProps {
  step: TimelineStep;
}

export function TimelineNode({ step }: TimelineNodeProps) {
  const isUpcoming = step.status === "upcoming";
  const isCurrent = step.status === "current";

  return (
    <li
      className="grid grid-cols-[24px_1fr_auto] max-[600px]:grid-cols-[24px_1fr] gap-x-4 gap-y-0 py-3 items-start relative"
      aria-current={isCurrent ? "step" : undefined}
    >
      <TimelineDot status={step.status} />

      {/* Body */}
      <div className="min-w-0">
        <p
          className={cn(
            "font-serif text-[17px] font-medium leading-[1.3] m-0",
            isUpcoming && "text-[var(--ink-muted)] font-normal italic"
          )}
        >
          {step.title}
          {isCurrent && <span className="sr-only"> (current step)</span>}
        </p>
        {step.description && (
          <p className="font-sans text-[13px] text-[var(--ink-muted)] leading-[1.5] mt-1 m-0">
            {step.description}
          </p>
        )}
      </div>

      {/* Date — right-aligned on desktop, left-aligned below body on mobile */}
      {step.date && (
        <p
          className={cn(
            "font-mono text-[11px] tracking-[0.05em] text-right whitespace-nowrap pt-[6px] self-start",
            "max-[600px]:col-start-2 max-[600px]:text-left max-[600px]:pt-0",
            isCurrent ? "text-[var(--brand-ink)] font-medium" : "text-[var(--ink-subtle)]"
          )}
        >
          {step.estimated && (
            <span className="opacity-70 mr-[2px]">EST.</span>
          )}
          {step.date}
        </p>
      )}

      {step.status === "done" && (
        <span className="sr-only">Completed</span>
      )}
    </li>
  );
}
