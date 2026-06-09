"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  value: string; // 6-char string, "" for empty
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

export function OTPInput({
  value,
  onChange,
  onComplete,
  error = false,
  disabled = false,
  className,
}: OTPInputProps) {
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? "");
  const shouldReduceMotion = useReducedMotion();

  // Track shake trigger — increments each time error becomes true
  const [shakeKey, setShakeKey] = React.useState(0);
  const prevError = React.useRef(false);
  React.useEffect(() => {
    if (error && !prevError.current) {
      setShakeKey((k) => k + 1);
    }
    prevError.current = error;
  }, [error]);

  function focusCell(index: number) {
    inputRefs.current[index]?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, idx: number) {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[idx]) {
        const next = digits.map((d, i) => (i === idx ? "" : d)).join("");
        onChange(next);
      } else if (idx > 0) {
        const next = digits.map((d, i) => (i === idx - 1 ? "" : d)).join("");
        onChange(next);
        focusCell(idx - 1);
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      e.preventDefault();
      focusCell(idx - 1);
    } else if (e.key === "ArrowRight" && idx < 5) {
      e.preventDefault();
      focusCell(idx + 1);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) return;
    const digit = raw.slice(-1);
    const next = digits.map((d, i) => (i === idx ? digit : d)).join("");
    onChange(next);
    if (next.length === 6) {
      onComplete?.(next);
    }
    if (idx < 5) {
      focusCell(idx + 1);
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const padded = pasted.padEnd(6, "").slice(0, 6);
    onChange(padded);
    if (pasted.length === 6) {
      onComplete?.(padded);
    }
    const nextIdx = Math.min(pasted.length, 5);
    focusCell(nextIdx);
  }

  // Auto-focus first empty cell on mount
  React.useEffect(() => {
    const firstEmpty = digits.findIndex((d) => !d);
    focusCell(firstEmpty === -1 ? 0 : firstEmpty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shakeVariants = {
    shake: {
      x: shouldReduceMotion ? 0 : [0, -6, 6, -4, 4, -2, 2, 0],
      transition: { duration: 0.32, ease: "easeInOut" as const },
    },
  };

  return (
    <motion.div
      key={shakeKey}
      animate={shakeKey > 0 ? "shake" : undefined}
      variants={shakeVariants}
      className={cn("flex gap-2 sm:gap-3", className)}
      role="group"
      aria-label="6-digit verification code"
    >
      {digits.map((digit, idx) => (
        <motion.span
          key={idx}
          animate={digit ? { scale: [0.88, 1] } : { scale: 1 }}
          transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.08, ease: [0.2, 0, 0, 1] }}
          className="relative"
        >
          <input
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            pattern="[0-9]"
            autoComplete={idx === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${idx + 1}`}
            value={digit}
            disabled={disabled}
            onChange={(e) => handleInput(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            className={cn(
              "h-12 w-10 sm:h-14 sm:w-12 rounded-[var(--r-md)] border text-center",
              "font-mono text-[20px] font-medium text-[var(--ink)]",
              "bg-[var(--paper)] transition-[border-color,box-shadow]",
              "focus:outline-none focus:shadow-[var(--focus-ring)]",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              digit
                ? "border-[var(--ink)]"
                : "border-[var(--rule-strong)]",
              error && "border-[var(--danger)] shadow-[0_0_0_3px_rgba(184,58,42,0.2)]",
              "duration-[120ms]"
            )}
          />
        </motion.span>
      ))}
    </motion.div>
  );
}
