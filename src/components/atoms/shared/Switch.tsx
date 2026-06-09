import * as React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
}

export function Switch({ checked, onChange, label, name, className, disabled }: SwitchProps) {
  return (
    <label className={cn("inline-flex items-center gap-3 cursor-pointer select-none", disabled && "opacity-50 cursor-not-allowed", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        name={name}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative w-10 h-6 rounded-[var(--r-pill)] border transition-colors duration-[var(--m-base)] focus-visible:outline-none",
          "focus-visible:[box-shadow:var(--focus-ring)]",
          checked
            ? "bg-[var(--ink)] border-[var(--ink)]"
            : "bg-transparent border-[var(--rule-strong)]"
        )}
      >
        <span
          className={cn(
            "absolute top-[3px] w-[18px] h-[18px] rounded-full transition-all duration-[var(--m-base)]",
            checked
              ? "left-[calc(100%-21px)] bg-[var(--paper)]"
              : "left-[3px] bg-[var(--ink-muted)]"
          )}
        />
      </button>
      {label && (
        <span className="font-sans text-[14px] text-[var(--ink)] leading-snug">{label}</span>
      )}
    </label>
  );
}
