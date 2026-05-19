import * as React from "react";
import { cn } from "@/lib/utils";
import { CodeChip } from "@/components/atoms/CodeChip";
import { StatusPill } from "@/components/atoms/StatusPill";
import { Avatar } from "@/components/atoms/Avatar";

interface TimelineStep {
  label: string;
  done: boolean;
}

interface HeroStatusCardProps extends React.HTMLAttributes<HTMLDivElement> {
  code?: string;
  serviceName?: string;
  agentInitials?: string;
  agentName?: string;
  steps?: TimelineStep[];
}

export function HeroStatusCard({
  className,
  code = "PRX-2026-00483",
  serviceName = "Business Registration",
  agentInitials = "AM",
  agentName = "Agent Mukamana",
  steps = [
    { label: "Received", done: true },
    { label: "In Review", done: true },
    { label: "Processing", done: false },
    { label: "Complete", done: false },
  ],
  ...props
}: HeroStatusCardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-xl)]",
        "p-5 shadow-[var(--sh-raised)]",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="font-mono text-[11px] text-[var(--ink-muted)] mb-1 uppercase tracking-wider">Tracking Code</p>
          <CodeChip code={code} size="md" />
        </div>
        <StatusPill variant="info" label="In Progress" />
      </div>

      <p className="font-serif text-[19px] text-[var(--ink)] leading-snug mb-4">{serviceName}</p>

      <div className="flex items-center gap-2 mb-5">
        <Avatar initials={agentInitials} size="sm" color="brand" />
        <span className="font-sans text-[12px] text-[var(--ink-muted)]">{agentName}</span>
      </div>

      {/* Mini timeline */}
      <div className="flex items-center gap-0">
        {steps.map((step, i) => (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-2.5 h-2.5 rounded-full border-2",
                  step.done
                    ? "bg-[var(--ok)] border-[var(--ok)]"
                    : "bg-transparent border-[var(--rule-strong)]"
                )}
              />
              <span className="font-sans text-[10px] text-[var(--ink-subtle)] whitespace-nowrap">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 mx-1 mb-4",
                  steps[i + 1].done ? "bg-[var(--ok)]" : "bg-[var(--rule)]"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
