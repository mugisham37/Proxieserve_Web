"use client";

import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { MkIcon } from "@/src/components/atoms/MkIcon";
import { PasswordStrengthBar } from "@/src/components/atoms/PasswordStrengthBar";

interface PasswordFieldInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  error?: string;
  registration: UseFormRegisterReturn;
  autoComplete?: string;
  labelRight?: React.ReactNode;
  showStrength?: boolean;
  watchedValue?: string;
}

export function PasswordFieldInput({
  id,
  label,
  placeholder = "Min 8 characters",
  error,
  registration,
  autoComplete = "current-password",
  labelRight,
  showStrength,
  watchedValue = "",
}: PasswordFieldInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="flex items-center justify-between text-[13px] font-medium text-[var(--text)]"
        >
          <span>{label}</span>
          {labelRight}
        </label>
      )}
      <div
        className="flex items-center gap-2 px-3 bg-[var(--bg)] border rounded-[10px] transition-all duration-[120ms] focus-within:border-[var(--brand)] focus-within:[box-shadow:0_0_0_3px_var(--brand-soft)]"
        style={{
          borderColor: error ? "var(--danger)" : "var(--border)",
          boxShadow: error ? "0 0 0 3px rgba(249,112,102,.12)" : undefined,
        }}
      >
        <MkIcon name="lock" size={16} className="text-[var(--text-subtle)] flex-shrink-0" />
        <input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="flex-1 py-[10px] text-[14px] bg-transparent border-none outline-none text-[var(--text)] placeholder:text-[var(--text-subtle)]"
          {...registration}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="p-1 text-[var(--text-subtle)] hover:text-[var(--text)] transition-colors duration-[120ms] rounded flex-shrink-0"
          aria-label={show ? "Hide password" : "Show password"}
        >
          <MkIcon name={show ? "eyeOff" : "eye"} size={16} />
        </button>
      </div>
      {showStrength && <PasswordStrengthBar password={watchedValue} />}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[12px] text-[var(--danger)]">
          {error}
        </p>
      )}
    </div>
  );
}
