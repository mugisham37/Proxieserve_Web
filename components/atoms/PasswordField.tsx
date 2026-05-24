"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordFieldProps {
  id: string;
  name?: string;
  label?: string;
  placeholder?: string;
  autoComplete?: "current-password" | "new-password";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      id,
      name,
      label,
      placeholder = "••••••••",
      autoComplete = "current-password",
      value,
      onChange,
      onBlur,
      error,
      disabled,
      className,
    },
    ref
  ) => {
    const [show, setShow] = React.useState(false);
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
        <div className="relative flex items-center">
          <input
            ref={ref}
            id={id}
            name={name ?? id}
            type={show ? "text" : "password"}
            autoComplete={autoComplete}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "w-full h-12 px-4 pr-12 rounded-[var(--r-md)] border bg-[var(--paper)]",
              "font-sans text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-subtle)]",
              "transition-[border-color,box-shadow] duration-[120ms]",
              "outline-none focus:shadow-[var(--focus-ring)]",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              error
                ? "border-[var(--danger)] focus:border-[var(--danger)] focus:shadow-[0_0_0_3px_rgba(184,58,42,0.2)]"
                : "border-[var(--rule-strong)] hover:border-[var(--ink-muted)] focus:border-[var(--ink)]"
            )}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            disabled={disabled}
            aria-pressed={show}
            aria-label={show ? "Hide password" : "Show password"}
            className={cn(
              "absolute right-3 flex items-center justify-center w-8 h-8 rounded-[var(--r-sm)]",
              "text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--cream)]",
              "transition-colors duration-[120ms] outline-none",
              "focus-visible:shadow-[var(--focus-ring)]",
              "disabled:opacity-40 disabled:cursor-not-allowed"
            )}
          >
            {show ? <EyeOff size={16} strokeWidth={1.8} /> : <Eye size={16} strokeWidth={1.8} />}
          </button>
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
PasswordField.displayName = "PasswordField";
