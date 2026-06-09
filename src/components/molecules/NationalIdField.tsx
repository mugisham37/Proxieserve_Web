"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface NationalIdFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

// Rwanda NID: 1 digit, space, 4 digits, space, 1 digit, space, 7 digits, space, 1 digit, space, 2 digits
// 16 digits total, displayed as: X XXXX X XXXXXXX X XX
function formatNationalId(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  const parts: string[] = [];
  if (digits.length > 0) parts.push(digits.slice(0, 1));
  if (digits.length > 1) parts.push(digits.slice(1, 5));
  if (digits.length > 5) parts.push(digits.slice(5, 6));
  if (digits.length > 6) parts.push(digits.slice(6, 13));
  if (digits.length > 13) parts.push(digits.slice(13, 14));
  if (digits.length > 14) parts.push(digits.slice(14, 16));
  return parts.join(" ");
}

export function NationalIdField({ value, onChange, error, required, className }: NationalIdFieldProps) {
  const id = React.useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNationalId(e.target.value);
    onChange(formatted);
  };

  const digitCount = value.replace(/\D/g, "").length;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={`${id}-nid`} className="font-sans text-[13px] font-medium text-[var(--ink)]">
        National ID number{required && <span className="text-[var(--danger)] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          id={`${id}-nid`}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          placeholder="1 1999 8 0000000 1 00"
          required={required}
          aria-invalid={!!error}
          aria-describedby={`${id}-nid-hint`}
          maxLength={23}
          className={cn(
            "w-full rounded-[var(--r-md)] border bg-[var(--paper)] text-[var(--ink)] font-mono text-[14px]",
            "px-3 py-2.5 pr-14 transition-colors duration-[120ms] placeholder:text-[var(--ink-subtle)] placeholder:font-sans",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-1",
            error ? "border-[var(--danger)]" : "border-[var(--rule-strong)] hover:border-[var(--ink-muted)]"
          )}
        />
        <span
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px] tabular-nums",
            digitCount === 16 ? "text-[var(--ok)]" : "text-[var(--ink-subtle)]"
          )}
          aria-hidden="true"
        >
          {digitCount}/16
        </span>
      </div>
      {error && (
        <p role="alert" className="font-sans text-[12px] text-[var(--danger)]">{error}</p>
      )}
      <p id={`${id}-nid-hint`} className="font-sans text-[12px] text-[var(--ink-muted)]">
        16-digit number — formatted automatically as you type
      </p>
    </div>
  );
}
