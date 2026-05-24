"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PhoneInputWithCountryProps {
  id: string;
  name?: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const PhoneInputWithCountry = React.forwardRef<
  HTMLInputElement,
  PhoneInputWithCountryProps
>(
  (
    {
      id,
      name,
      label,
      value,
      onChange,
      onBlur,
      error,
      placeholder = "78 8 000 000",
      disabled,
      className,
    },
    ref
  ) => {
    const errorId = `${id}-error`;
    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label
            htmlFor={id}
            className="font-sans text-[13px] font-medium text-[var(--ink)] leading-none"
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            "flex rounded-[var(--r-md)] border bg-[var(--paper)] overflow-hidden",
            "transition-[border-color,box-shadow] duration-[120ms]",
            "focus-within:shadow-[var(--focus-ring)] focus-within:border-[var(--ink)]",
            error
              ? "border-[var(--danger)]"
              : "border-[var(--rule-strong)] hover:border-[var(--ink-muted)]"
          )}
        >
          <div className="flex items-center pl-3 pr-2 border-r border-[var(--rule)] shrink-0">
            <span className="font-sans text-[14px] text-[var(--ink-muted)] leading-none select-none">
              🇷🇼 +250
            </span>
          </div>
          <input
            ref={ref}
            id={id}
            name={name ?? id}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "flex-1 h-12 px-3 bg-transparent",
              "font-sans text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-subtle)]",
              "outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            )}
          />
        </div>
        {error && (
          <p id={errorId} role="alert" className="font-sans text-[12px] text-[var(--danger)] leading-tight">
            {error}
          </p>
        )}
      </div>
    );
  }
);
PhoneInputWithCountry.displayName = "PhoneInputWithCountry";
