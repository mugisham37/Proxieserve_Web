"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboarding } from "@/lib/onboarding-context";

// ─── Coachmark Portal ─────────────────────────────────────────────────────────

interface CoachmarkPosition {
  top: number;
  left: number;
  placement: "above" | "below" | "right";
}

function getPosition(targetEl: HTMLElement): CoachmarkPosition {
  const rect = targetEl.getBoundingClientRect();
  const panelWidth = 280;
  const panelHeight = 140;
  const gap = 12;
  const vpH = window.innerHeight;
  const vpW = window.innerWidth;

  // Try below first
  if (rect.bottom + gap + panelHeight < vpH) {
    return {
      top: rect.bottom + gap + window.scrollY,
      left: Math.min(
        Math.max(8, rect.left + window.scrollX),
        vpW - panelWidth - 8
      ),
      placement: "below",
    };
  }

  // Try above
  if (rect.top - gap - panelHeight > 0) {
    return {
      top: rect.top - gap - panelHeight + window.scrollY,
      left: Math.min(
        Math.max(8, rect.left + window.scrollX),
        vpW - panelWidth - 8
      ),
      placement: "above",
    };
  }

  // Fallback: right
  return {
    top: rect.top + window.scrollY,
    left: Math.min(rect.right + gap + window.scrollX, vpW - panelWidth - 8),
    placement: "right",
  };
}

// ─── Main component ───────────────────────────────────────────────────────────

export function Coachmark() {
  const { state, steps, next, skip } = useOnboarding();
  const { active, step, role } = state;

  const currentStep = steps[step];
  const totalSteps = steps.length;
  const isLast = step === totalSteps - 1;

  const [position, setPosition] = React.useState<CoachmarkPosition | null>(null);
  const [targetEl, setTargetEl] = React.useState<HTMLElement | null>(null);

  // Locate target element and compute position
  React.useEffect(() => {
    if (!active || !currentStep) {
      setPosition(null);
      setTargetEl(null);
      return;
    }

    const el = document.getElementById(currentStep.targetId);
    if (!el) {
      // Target not on this page — skip to next
      next();
      return;
    }

    setTargetEl(el);
    setPosition(getPosition(el));

    // Highlight ring
    el.style.setProperty("outline", "3px solid rgba(201,67,122,0.5)");
    el.style.setProperty("outline-offset", "4px");
    el.style.setProperty("border-radius", "var(--r-md, 8px)");

    return () => {
      el.style.removeProperty("outline");
      el.style.removeProperty("outline-offset");
      el.style.removeProperty("border-radius");
    };
  }, [active, currentStep, next]);

  // Recompute position on scroll/resize
  React.useEffect(() => {
    if (!targetEl) return;

    function update() {
      setPosition(getPosition(targetEl!));
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetEl]);

  // Escape to skip
  React.useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") skip();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, skip]);

  const show = active && position !== null && currentStep !== undefined;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Scrim — click to skip */}
          <motion.div
            key="coachmark-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[9998]"
            onClick={skip}
            aria-hidden="true"
          />

          {/* Tooltip panel */}
          <motion.div
            key={`coachmark-step-${step}`}
            role="dialog"
            aria-modal="false"
            aria-label={`Onboarding step ${step + 1} of ${totalSteps}: ${currentStep.title}`}
            initial={{ opacity: 0, y: position!.placement === "above" ? 6 : -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: position!.top,
              left: position!.left,
              width: 280,
              zIndex: 9999,
            }}
            className={cn(
              "rounded-[var(--r-lg)] p-[16px]",
              "bg-[var(--ink)] text-[var(--cream)]",
              "shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-[8px]">
              <p className="font-serif italic text-[15px] leading-snug text-[var(--cream)]">
                {currentStep.title}
              </p>
              <button
                type="button"
                onClick={skip}
                aria-label="Skip tour"
                className={cn(
                  "shrink-0 w-[24px] h-[24px] flex items-center justify-center",
                  "rounded-[var(--r-sm)] opacity-60",
                  "hover:opacity-100 hover:bg-white/10",
                  "transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                )}
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <p className="font-sans text-[13px] leading-relaxed text-[var(--cream-2)] mb-[14px]">
              {currentStep.body}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              {/* Step dots */}
              <div className="flex items-center gap-[5px]" aria-hidden="true">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "block rounded-full transition-all duration-[200ms]",
                      i === step
                        ? "w-[16px] h-[6px] bg-[var(--brand)]"
                        : "w-[6px] h-[6px] bg-white/30"
                    )}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-[8px]">
                <button
                  type="button"
                  onClick={skip}
                  className="font-sans text-[12px] text-white/50 hover:text-white/80 transition-colors focus-visible:outline-none"
                >
                  Skip
                </button>
                <button
                  type="button"
                  onClick={next}
                  className={cn(
                    "font-sans text-[12px] font-medium px-[12px] py-[5px]",
                    "bg-[var(--brand)] text-white rounded-[var(--r-pill)]",
                    "hover:opacity-90 transition-opacity",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
                  )}
                >
                  {isLast ? "Done" : "Next →"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
