import * as React from "react";
import { cn } from "@/lib/utils";

const STEP_TIPS: Record<number, string[]> = {
  1: [
    "Use your full legal name as it appears on your ID",
    "Your National ID number is 16 digits — we format it automatically",
    "WhatsApp updates let your agent reach you faster",
  ],
  2: [
    "Answer as accurately as you can — your agent can clarify",
    "Optional fields help us serve you better but aren't required",
    "Notes for your agent are private and not shared publicly",
  ],
  3: [
    "JPG, PNG, and PDF files are all accepted",
    "Maximum file size is 10 MB per document",
    "Photos should be clear and all text legible",
  ],
  4: [
    "Review carefully — this is what we submit on your behalf",
    "You can still edit any step before sending",
    "You pay nothing until your agent confirms your application",
  ],
};

interface WizTipsCardProps {
  step: number;
  className?: string;
}

export function WizTipsCard({ step, className }: WizTipsCardProps) {
  const tips = STEP_TIPS[step];
  if (!tips) return null;

  return (
    <div className={cn("bg-[var(--cream)] border border-[var(--rule-soft)] rounded-[var(--r-lg)] p-5", className)}>
      <span className="eyebrow text-[var(--ink-subtle)] block mb-3">Tips</span>
      <ul className="flex flex-col gap-2.5">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="font-mono text-[10px] text-[var(--ink-subtle)] mt-0.5 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-sans text-[12.5px] text-[var(--ink-muted)] leading-snug">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
