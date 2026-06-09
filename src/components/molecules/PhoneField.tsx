"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PhoneFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export function PhoneField({ value, onChange, error, required, className }: PhoneFieldProps) {
  const id = React.useId();

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={`${id}-phone`} className="font-sans text-[13px] font-medium text-[var(--ink)]">
        Phone number{required && <span className="text-[var(--danger)] ml-0.5">*</span>}
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          className="shrink-0 flex items-center gap-1.5 px-3 py-2.5 rounded-[var(--r-md)] border border-[var(--rule-strong)] bg-[var(--paper)] font-sans text-[14px] text-[var(--ink)] hover:border-[var(--ink-muted)] transition-colors"
          aria-label="Country code: Rwanda +250"
        >
          🇷🇼 <span className="font-mono text-[13px]">+250</span>
        </button>
        <input
          id={`${id}-phone`}
          type="tel"
          inputMode="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="78 8 123 456"
          required={required}
          aria-invalid={!!error}
          className={cn(
            "flex-1 rounded-[var(--r-md)] border bg-[var(--paper)] text-[var(--ink)] font-sans text-[14px]",
            "px-3 py-2.5 transition-colors duration-[120ms] placeholder:text-[var(--ink-subtle)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-1",
            error ? "border-[var(--danger)]" : "border-[var(--rule-strong)] hover:border-[var(--ink-muted)]"
          )}
        />
      </div>
      {error && (
        <p role="alert" className="font-sans text-[12px] text-[var(--danger)]">{error}</p>
      )}
      <p className="font-sans text-[12px] text-[var(--ink-muted)]">
        We&apos;ll only contact you about this application
      </p>
    </div>
  );
}
