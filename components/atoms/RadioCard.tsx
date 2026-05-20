import * as React from "react";
import { cn } from "@/lib/utils";

interface RadioCardProps {
  value: string;
  label: string;
  description?: string;
  name: string;
  checked: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function RadioCard({ value, label, description, name, checked, onChange, disabled, className }: RadioCardProps) {
  return (
    <label
      className={cn(
        "relative flex items-start gap-3 p-4 rounded-[var(--r-md)] border cursor-pointer select-none",
        "transition-all duration-[var(--m-fast)]",
        checked
          ? "border-[var(--ink)] bg-[var(--paper-2)]"
          : "border-[var(--rule)] bg-[var(--paper)] hover:border-[var(--rule-strong)] hover:bg-[var(--cream)]",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => !disabled && onChange(value)}
        disabled={disabled}
        className="sr-only"
      />
      {/* Custom radio dot */}
      <span
        className={cn(
          "mt-0.5 shrink-0 w-4 h-4 rounded-full border-2 transition-all duration-[var(--m-fast)] flex items-center justify-center",
          checked ? "border-[var(--ink)]" : "border-[var(--rule-strong)]"
        )}
      >
        {checked && <span className="w-[7px] h-[7px] rounded-full bg-[var(--ink)]" />}
      </span>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="font-sans text-[14px] font-medium text-[var(--ink)] leading-snug">{label}</span>
        {description && (
          <span className="font-sans text-[12px] text-[var(--ink-muted)] leading-snug">{description}</span>
        )}
      </div>
    </label>
  );
}
