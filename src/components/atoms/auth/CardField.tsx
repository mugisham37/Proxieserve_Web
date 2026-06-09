"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type CardBrand = "visa" | "mastercard" | null;

interface CardFieldChangePayload {
  raw: string;
  formatted: string;
  brand: CardBrand;
}

interface CardFieldProps {
  value: string;
  onChange: (payload: CardFieldChangePayload) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

function detectBrand(digits: string): CardBrand {
  if (digits.startsWith("4")) return "visa";
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "mastercard";
  return null;
}

function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

export function CardField({
  value,
  onChange,
  error,
  disabled,
  className,
}: CardFieldProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = formatCardNumber(raw);
    const brand = detectBrand(raw);
    onChange({ raw, formatted, brand });
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="1234 5678 9012 3456"
        maxLength={19}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        aria-label="Card number"
        aria-invalid={!!error}
        className={cn(
          "w-full rounded-[var(--r-md)] border bg-[var(--paper)] px-4 py-3",
          "font-mono text-[16px] text-[var(--ink)] tracking-wider",
          "placeholder:text-[var(--ink-subtle)] placeholder:font-mono placeholder:tracking-wider",
          "transition-[border-color,box-shadow] duration-[120ms]",
          "focus:outline-none focus:shadow-[var(--focus-ring)]",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          error
            ? "border-[var(--danger)] shadow-[0_0_0_3px_rgba(184,58,42,0.15)]"
            : "border-[var(--rule-strong)] focus:border-[var(--ink)]"
        )}
      />
      {error && (
        <p role="alert" className="text-[12px] text-[var(--danger)] font-sans">
          {error}
        </p>
      )}
    </div>
  );
}
