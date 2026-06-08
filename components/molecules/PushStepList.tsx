"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type StepState = "done" | "active" | "pending";

const STEPS = [
  { label: "Prompt sent", description: "We sent a push notification to your phone" },
  { label: "You approve", description: "Open MTN MoMo and confirm the payment" },
  { label: "Payment confirmed", description: "Funds received — receipt is issued" },
];

interface PushStepListProps {
  activeStep?: 0 | 1 | 2;
  className?: string;
}

function stepState(idx: number, activeStep: number): StepState {
  if (idx < activeStep) return "done";
  if (idx === activeStep) return "active";
  return "pending";
}

export function PushStepList({ activeStep = 1, className }: PushStepListProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ol
      className={cn("flex flex-col gap-4 w-full max-w-[360px]", className)}
      aria-label="Payment progress"
    >
      {STEPS.map((step, idx) => {
        const state = stepState(idx, activeStep);
        return (
          <li key={step.label} className="flex items-start gap-3">
            {/* Step indicator */}
            <div className="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors duration-200"
              style={{
                borderColor: state === "pending" ? "var(--rule-strong)" : "var(--ink)",
                background: state === "done" ? "var(--ok-soft)" : state === "active" ? "var(--ink)" : "transparent",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {state === "done" ? (
                  <motion.span
                    key="check"
                    initial={shouldReduceMotion ? {} : { scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                  >
                    <Check size={13} strokeWidth={2.5} className="text-[var(--ok)]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="num"
                    initial={shouldReduceMotion ? {} : { scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      "font-mono text-[11px] font-semibold",
                      state === "active" ? "text-[var(--paper)]" : "text-[var(--ink-subtle)]"
                    )}
                  >
                    {idx + 1}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {/* Text */}
            <div className="flex flex-col gap-0.5">
              <span className={cn(
                "font-serif text-[14px]",
                state === "active" ? "font-medium text-[var(--ink)]" : "text-[var(--ink-muted)]"
              )}>
                {step.label}
              </span>
              {state === "active" && (
                <span className="font-sans text-[12px] text-[var(--ink-muted)]">
                  {step.description}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
