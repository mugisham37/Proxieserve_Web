"use client";

import type { UseFormRegisterReturn } from "react-hook-form";
import { MkIcon } from "@/components/atoms/MkIcon";
import type { IconName } from "@/types";

interface AuthFieldInputProps {
  id: string;
  label?: string;
  icon: IconName;
  type: string;
  placeholder: string;
  trailing?: React.ReactNode;
  error?: string;
  registration: UseFormRegisterReturn;
  autoComplete?: string;
  labelRight?: React.ReactNode;
  disabled?: boolean;
}

export function AuthFieldInput({
  id,
  label,
  icon,
  type,
  placeholder,
  trailing,
  error,
  registration,
  autoComplete,
  labelRight,
  disabled,
}: AuthFieldInputProps) {
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
        className="flex items-center gap-2 px-3 bg-[var(--bg)] border rounded-[10px] transition-all duration-[120ms]"
        style={{
          borderColor: error ? "var(--danger)" : "var(--border)",
          boxShadow: error ? "0 0 0 3px rgba(249,112,102,.12)" : undefined,
        }}
        data-focus-ring=""
      >
        <MkIcon name={icon} size={16} className="text-[var(--text-subtle)] flex-shrink-0" />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="flex-1 py-[10px] text-[14px] bg-transparent border-none outline-none text-[var(--text)] placeholder:text-[var(--text-subtle)] disabled:opacity-50"
          {...registration}
        />
        {trailing}
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-[12px] text-[var(--danger)] flex items-center gap-1"
        >
          {error}
        </p>
      )}
    </div>
  );
}
