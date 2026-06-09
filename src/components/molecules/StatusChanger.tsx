"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { AgentStatus } from "@/lib/types/agent";

const STATUS_OPTIONS: { value: AgentStatus; label: string }[] = [
  { value: "action-required", label: "Action required" },
  { value: "received", label: "Received" },
  { value: "under-review", label: "Under review" },
  { value: "in-progress", label: "In progress" },
  { value: "submitted-to-authority", label: "Submitted to authority" },
  { value: "awaiting-response", label: "Awaiting response" },
  { value: "completed", label: "Completed" },
  { value: "rejected", label: "Rejected" },
];

interface StatusChangerProps {
  value: AgentStatus;
  onChange: (status: AgentStatus) => void;
  id?: string;
}

export function StatusChanger({ value, onChange, id = "case-status" }: StatusChangerProps) {
  const liveRef = React.useRef<HTMLSpanElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as AgentStatus;
    onChange(next);
    if (liveRef.current) {
      liveRef.current.textContent = `Status changed to ${STATUS_OPTIONS.find((o) => o.value === next)?.label}`;
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <label htmlFor={id} className="sr-only">
        Case status
      </label>
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className={cn(
          "appearance-none pl-[12px] pr-[32px] h-[32px]",
          "bg-[var(--paper)] border border-[var(--rule)]",
          "rounded-[var(--r-pill)]",
          "font-sans text-[12px] font-medium text-[var(--ink)]",
          "cursor-pointer",
          "transition-colors duration-[var(--m-fast)]",
          "hover:border-[var(--ink-muted)]",
          "focus:outline-none focus:border-[var(--ink)]"
        )}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {/* Chevron */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 text-[var(--ink-muted)]"
      >
        ▾
      </span>
      {/* Live region for screen readers */}
      <span ref={liveRef} role="status" aria-live="polite" className="sr-only" />
    </div>
  );
}
