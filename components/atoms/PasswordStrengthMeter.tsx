"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function scorePassword(password: string): 0 | 1 | 2 | 3 | 4 {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password) || password.length >= 12) score++;
  return score as 0 | 1 | 2 | 3 | 4;
}

type StrengthLevel = "none" | "weak" | "okay" | "strong";

function getLevel(score: number): StrengthLevel {
  if (score === 0) return "none";
  if (score < 2) return "weak";
  if (score < 4) return "okay";
  return "strong";
}

const LABEL: Record<StrengthLevel, string> = {
  none: "",
  weak: "Too weak",
  okay: "Okay",
  strong: "Strong",
};

const BAR_COLOR: Record<StrengthLevel, string> = {
  none: "bg-[var(--rule)]",
  weak: "bg-[var(--danger)]",
  okay: "bg-[var(--warn)]",
  strong: "bg-[var(--ok)]",
};

const FILLED: Record<StrengthLevel, number> = {
  none: 0,
  weak: 1,
  okay: 2,
  strong: 4,
};

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

export function PasswordStrengthMeter({ password, className }: PasswordStrengthMeterProps) {
  const score = scorePassword(password);
  const level = getLevel(score);
  const filled = FILLED[level];
  const color = BAR_COLOR[level];
  const label = LABEL[level];

  return (
    <div className={cn("flex flex-col gap-1.5", className)} aria-label={`Password strength: ${label || "not entered"}`}>
      <div className="flex gap-1" role="presentation">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-[background-color] duration-200",
              i < filled ? color : "bg-[var(--rule)]"
            )}
          />
        ))}
      </div>
      {label && (
        <p
          className={cn(
            "font-sans text-[12px] leading-none",
            level === "weak" && "text-[var(--danger)]",
            level === "okay" && "text-[var(--warn)]",
            level === "strong" && "text-[var(--ok)]"
          )}
        >
          {label}
        </p>
      )}
    </div>
  );
}
