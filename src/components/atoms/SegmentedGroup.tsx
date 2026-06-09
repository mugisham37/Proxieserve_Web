import * as React from "react";
import { cn } from "@/lib/utils";

interface SegmentedOption {
  value: string;
  label: string;
}

interface SegmentedGroupProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  className?: string;
}

export function SegmentedGroup({ options, value, onChange, name, className }: SegmentedGroupProps) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className={cn(
        "inline-flex rounded-[var(--r-pill)] border border-[var(--rule)] overflow-hidden bg-[var(--cream)]",
        className
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "px-4 py-1.5 font-sans text-[13px] font-medium transition-all duration-[var(--m-fast)] focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)] relative z-10",
              active
                ? "bg-[var(--ink)] text-[var(--paper)] rounded-[var(--r-pill)]"
                : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
