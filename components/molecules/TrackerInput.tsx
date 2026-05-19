"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatTrackerCode, isValidTrackerCode, TRACKER_ERROR } from "@/lib/tracker";
import { STORAGE_KEYS, setItem } from "@/lib/storage";
import { PillButton } from "@/components/atoms/PillButton";

interface TrackerInputProps {
  onSubmit?: (code: string) => void;
  className?: string;
}

export function TrackerInput({ onSubmit, className }: TrackerInputProps) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const errorId = React.useId();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatTrackerCode(e.target.value);
    setValue(formatted);
    if (error) setError(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidTrackerCode(value)) {
      setError(TRACKER_ERROR);
      return;
    }
    setError(null);
    setSubmitted(true);
    setItem(STORAGE_KEYS.LAST_CODE, value);
    onSubmit?.(value);
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-3", className)} noValidate>
      <div className="relative">
        <input
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="PRX-YYYY-NNNNN"
          value={value}
          onChange={handleChange}
          aria-label="Tracking code"
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          maxLength={15}
          className={cn(
            "w-full rounded-[var(--r-md)] border bg-[var(--paper)] text-[var(--ink)]",
            "font-mono text-[16px] tracking-[0.05em] placeholder:text-[var(--ink-subtle)]",
            "px-4 py-3.5 pr-12",
            "transition-colors duration-[120ms]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-1",
            error
              ? "border-[var(--danger)]"
              : "border-[var(--rule-strong)] hover:border-[var(--ink-muted)]"
          )}
        />
        {value && !error && (
          <button
            type="button"
            onClick={() => { setValue(""); setError(null); setSubmitted(false); }}
            aria-label="Clear"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="t-caption text-[var(--danger)]">
          {error}
        </p>
      )}

      {submitted && !error && (
        <p role="status" className="t-caption text-[var(--ok)]">
          Code accepted — finding your application…
        </p>
      )}

      <PillButton type="submit" variant="solid" size="md" arrow className="self-start">
        Track application
      </PillButton>
    </form>
  );
}
