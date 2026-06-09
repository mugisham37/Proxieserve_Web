"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChecklistStep } from "@/lib/types/agent";

interface ChecklistItemProps {
  step: ChecklistStep;
  onCheck?: (id: string) => void;
}

export function ChecklistItem({ step, onCheck }: ChecklistItemProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className={cn(
        "flex items-start gap-[14px]",
        "px-[20px] py-[14px]",
        "border-b border-[var(--rule)]",
        "transition-colors duration-[var(--m-fast)]",
        step.isCurrent && "bg-[var(--brand-soft)]",
        step.isDone && "opacity-70"
      )}
    >
      {/* Checkbox */}
      <button
        type="button"
        aria-label={step.isDone ? `Uncheck: ${step.label}` : `Check: ${step.label}`}
        aria-pressed={step.isDone}
        onClick={() => onCheck?.(step.id)}
        disabled={step.isDone}
        className={cn(
          "mt-[2px] shrink-0 flex items-center justify-center",
          "w-[20px] h-[20px] rounded-[var(--r-sm)]",
          "border-2 transition-all",
          step.isDone
            ? "bg-[var(--brand)] border-[var(--brand)]"
            : step.isCurrent
            ? "border-[var(--brand)] hover:border-[var(--brand-ink)]"
            : "border-[var(--ink-subtle)] hover:border-[var(--ink-muted)]",
          "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        )}
      >
        {step.isDone && (
          <motion.span
            initial={prefersReduced ? {} : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          >
            <Check size={12} className="text-white" aria-hidden="true" />
          </motion.span>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-sans text-[14px] font-medium",
            step.isDone
              ? "text-[var(--ink-muted)] line-through decoration-[var(--ink-subtle)]"
              : step.isCurrent
              ? "text-[var(--ink)]"
              : "text-[var(--ink)]"
          )}
        >
          {step.label}
        </p>
        <p className="font-sans text-[12px] text-[var(--ink-muted)] mt-[2px]">
          {step.isCurrent ? (
            <span className="text-[var(--brand-ink)] font-medium">
              ⟵ you are here · {step.sublabel}
            </span>
          ) : (
            step.sublabel
          )}
        </p>
      </div>

      {/* Timestamp */}
      {step.doneAt && (
        <span className="shrink-0 font-mono text-[11px] text-[var(--ink-subtle)] mt-[2px]">
          {step.doneAt}
        </span>
      )}
    </div>
  );
}
