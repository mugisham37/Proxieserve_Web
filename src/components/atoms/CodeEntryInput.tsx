"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatTrackerCode } from "@/lib/tracker";

interface CodeEntryInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function CodeEntryInput({
  value,
  onChange,
  error,
  disabled,
  className,
}: CodeEntryInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(formatTrackerCode(e.target.value));
  }

  return (
    <input
      type="text"
      aria-label="Application tracking code"
      aria-invalid={!!error}
      aria-describedby={error ? "code-entry-error" : undefined}
      value={value}
      onChange={handleChange}
      placeholder="PRX-YYYY-NNNNN"
      disabled={disabled}
      spellCheck={false}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="characters"
      maxLength={15} /* PRX-YYYY-NNNNN = 15 chars */
      className={cn(
        "w-full px-[22px] py-[18px]",
        "font-mono text-[clamp(20px,2.4vw,28px)] font-medium",
        "tracking-[0.08em] uppercase text-center",
        "rounded-[var(--r-pill)] border transition-colors duration-[var(--m-fast)]",
        "placeholder:text-[var(--ink-subtle)] placeholder:font-normal placeholder:tracking-normal",
        "focus:outline-none",
        error
          ? [
              "bg-[var(--danger-soft)] border-[var(--danger)]",
              "focus:border-[var(--danger)] focus:[box-shadow:var(--focus-ring)]",
            ]
          : [
              "bg-[var(--cream)] text-[var(--ink)] border-[var(--rule-strong)]",
              "hover:border-[var(--ink)]",
              "focus:border-[var(--ink)] focus:bg-[var(--paper)] focus:[box-shadow:var(--focus-ring)]",
            ],
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
    />
  );
}
