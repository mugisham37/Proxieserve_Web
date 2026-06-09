"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/atoms/PillButton";

interface WizFooterProps {
  step: number;
  serviceSlug: string;
  onNext: () => void;
  isSubmitting?: boolean;
  nextLabel?: string;
  canGoBack?: boolean;
  className?: string;
}

export function WizFooter({ step, serviceSlug, onNext, isSubmitting, nextLabel, canGoBack = true, className }: WizFooterProps) {
  const isLastStep = step === 4;
  const defaultNextLabel = isLastStep ? "Send application" : `Next — ${["Service details", "Documents", "Review", ""][step - 1] ?? "Continue"}`;
  const label = nextLabel ?? defaultNextLabel;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-30 bg-[var(--paper)] border-t border-[var(--rule)]",
        "px-5 sm:px-8 flex items-center justify-between gap-4 h-16",
        "pb-[env(safe-area-inset-bottom)]",
        "sm:static sm:bg-transparent sm:border-none sm:px-0 sm:h-auto sm:pb-0 sm:mt-2",
        className
      )}
    >
      {canGoBack && step > 1 ? (
        <Link
          href={`/services/${serviceSlug}/apply/${step - 1}`}
          className="font-sans text-[14px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
        >
          ← Back
        </Link>
      ) : (
        <span />
      )}

      <PillButton
        variant="brand"
        size="md"
        arrow={!isLastStep}
        onClick={onNext}
        disabled={isSubmitting}
        className={cn("min-w-[160px] justify-center", isLastStep && "bg-[var(--brand)] text-white")}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" aria-hidden="true" />
            Sending…
          </span>
        ) : (
          label
        )}
      </PillButton>
    </div>
  );
}
