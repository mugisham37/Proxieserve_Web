"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface WizSaveStateProps {
  status: "idle" | "saving" | "saved";
  className?: string;
}

export function WizSaveState({ status, className }: WizSaveStateProps) {
  if (status === "idle") return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={cn("flex items-center gap-1.5 font-sans text-[12px] text-[var(--ink-muted)]", className)}
    >
      {status === "saving" ? (
        <>
          <span
            className="w-2.5 h-2.5 rounded-full border-2 border-[var(--ink-muted)] border-t-transparent animate-spin"
            aria-hidden="true"
          />
          Saving…
        </>
      ) : (
        <>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
            <path d="M1.5 5.5L4.5 8.5L9.5 2.5" stroke="var(--ok)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[var(--ok)]">Saved just now</span>
        </>
      )}
    </div>
  );
}
