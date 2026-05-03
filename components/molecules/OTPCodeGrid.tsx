"use client";

import { useRef } from "react";

interface OTPCodeGridProps {
  value: string[];
  onChange: (digits: string[]) => void;
  onComplete?: (code: string) => void;
  error?: string;
}

export function OTPCodeGrid({ value, onChange, onComplete, error }: OTPCodeGridProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (i: number, raw: string) => {
    if (!/^\d*$/.test(raw)) return;
    const next = [...value];
    next[i] = raw.slice(-1);
    onChange(next);
    if (raw && i < 5) refs.current[i + 1]?.focus();
    if (raw && i === 5) {
      const full = next.join("");
      if (full.length === 6) onComplete?.(full);
    }
  };

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = [...value];
    pasted.split("").forEach((d, idx) => {
      if (idx < 6) next[idx] = d;
    });
    onChange(next);
    const focusIdx = Math.min(pasted.length, 5);
    refs.current[focusIdx]?.focus();
    if (pasted.length === 6) onComplete?.(pasted);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-center">
        {value.map((d, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${i + 1}`}
            aria-invalid={!!error}
            onChange={(e) => handleInput(i, e.target.value)}
            onKeyDown={(e) => handleKey(i, e)}
            onPaste={handlePaste}
            className="w-12 h-14 text-center font-mono text-[24px] font-semibold text-[var(--text)] bg-[var(--bg)] border-[1.5px] rounded-[10px] outline-none transition-all duration-[120ms] focus:border-[var(--brand)] focus:[box-shadow:0_0_0_3px_var(--brand-soft)] sm:w-14"
            style={{ borderColor: error ? "var(--danger)" : "var(--border)" }}
          />
        ))}
      </div>
      {error && (
        <p role="alert" className="text-[12px] text-[var(--danger)] text-center">
          {error}
        </p>
      )}
    </div>
  );
}
