"use client";

import * as React from "react";
import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/atoms/shared/AppButton";

interface EligibilityGateProps {
  mode?: "overlay" | "inline";
  message?: string;
  className?: string;
  onCheck?: () => void;
}

export function EligibilityGate({
  mode = "inline",
  message = "Eligibility check required before applying.",
  className,
  onCheck,
}: EligibilityGateProps) {
  if (mode === "overlay") {
    return (
      <div
        className={cn(
          "absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-[var(--r-lg)] bg-[var(--cream)] bg-opacity-90 backdrop-blur-[2px] p-4 text-center",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <ShieldAlert size={20} className="text-[var(--info)]" aria-hidden="true" />
        <p className="font-sans text-[13px] text-[var(--ink-muted)] leading-snug max-w-[180px]">{message}</p>
        {onCheck && (
          <AppButton size="sm" variant="default" onClick={onCheck}>
            Check eligibility
          </AppButton>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-[var(--r-md)] bg-[var(--info-soft)] border border-[rgba(46,94,142,0.2)] px-4 py-3",
        className
      )}
      role="alert"
    >
      <ShieldAlert size={16} className="mt-0.5 shrink-0 text-[var(--info)]" aria-hidden="true" />
      <div className="flex flex-col gap-1.5">
        <p className="font-sans text-[13px] text-[var(--ink)] leading-snug">{message}</p>
        {onCheck && (
          <button
            type="button"
            onClick={onCheck}
            className="font-sans text-[12px] text-[var(--info)] font-medium underline underline-offset-2 hover:no-underline self-start"
          >
            Check eligibility →
          </button>
        )}
      </div>
    </div>
  );
}
