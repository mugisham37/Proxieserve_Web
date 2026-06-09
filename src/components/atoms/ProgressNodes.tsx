import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressStep {
  label: string;
  state: "done" | "active" | "todo";
}

interface ProgressNodesProps {
  steps: ProgressStep[];
  className?: string;
}

export function ProgressNodes({ steps, className }: ProgressNodesProps) {
  const doneCount = steps.filter((s) => s.state === "done").length;

  return (
    <div
      className={cn("flex gap-0.75", className)}
      aria-label={`Progress: ${doneCount} of ${steps.length} steps done`}
    >
      {steps.map((step, i) => (
        <span
          key={i}
          title={step.label}
          className={cn(
            "flex-1 h-1 rounded-[99px]",
            step.state === "done" && "bg-(--ink)",
            step.state === "active" && "bg-(--brand)",
            step.state === "todo" && "bg-(--rule)"
          )}
        />
      ))}
    </div>
  );
}
