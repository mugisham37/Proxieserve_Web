"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/atoms/wizard/ProgressBar";

const STEP_LABELS = ["Personal", "Service", "Documents", "Review", "Done"];

interface WizStepperProps {
  currentStep: number; // 1–5
  className?: string;
}

export function WizStepper({ currentStep, className }: WizStepperProps) {
  return (
    <div className={cn("hidden sm:flex items-center gap-0 relative", className)}>
      {STEP_LABELS.map((label, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <React.Fragment key={stepNum}>
            {/* Node */}
            <div className="flex flex-col items-center gap-1.5 relative z-10">
              <span
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-mono text-[12px] font-semibold transition-all duration-200 border",
                  isDone
                    ? "bg-[var(--ok)] border-[var(--ok)] text-white"
                    : isActive
                    ? "bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)]"
                    : "bg-[var(--paper)] border-[var(--rule-strong)] text-[var(--ink-muted)]"
                )}
              >
                {isDone ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  String(stepNum).padStart(2, "0")
                )}
              </span>
              <span
                className={cn(
                  "font-sans text-[11px] whitespace-nowrap transition-colors",
                  isActive ? "text-[var(--ink)] font-medium" : "text-[var(--ink-subtle)]"
                )}
              >
                {label}
              </span>
            </div>

            {/* Connector */}
            {i < STEP_LABELS.length - 1 && (
              <div className="flex-1 h-px mx-1 mt-[-14px] relative overflow-hidden">
                <div className="w-full h-px bg-[var(--rule-soft)]" />
                <div
                  className="absolute inset-0 h-px bg-[var(--ok)] transition-transform duration-300 origin-left"
                  style={{ transform: `scaleX(${isDone ? 1 : 0})` }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function WizStepperMobile({ currentStep, className }: WizStepperProps) {
  const label = STEP_LABELS[currentStep - 1] ?? "";
  const pct = ((currentStep - 1) / (STEP_LABELS.length - 1)) * 100;

  return (
    <div className={cn("sm:hidden flex flex-col gap-2 px-5 py-3 border-b border-[var(--rule-soft)]", className)}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-[var(--ink-muted)]">
          Step {currentStep} of {STEP_LABELS.length}
        </span>
        <span className="font-sans text-[13px] font-medium text-[var(--ink)]">{label}</span>
      </div>
      <ProgressBar value={pct} color="ink" />
    </div>
  );
}
