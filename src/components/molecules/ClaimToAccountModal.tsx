"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { PillButton } from "@/components/atoms/PillButton";

interface ClaimToAccountModalProps {
  code: string;
  serviceName: string;
  onDismiss: () => void;
}

export function ClaimToAccountModal({ code, serviceName, onDismiss }: ClaimToAccountModalProps) {
  return (
    <AnimatePresence>
      {/* Scrim */}
      <motion.div
        key="scrim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[60] bg-[var(--ink)]/40"
        onClick={onDismiss}
        aria-hidden="true"
      />

      {/* Card */}
      <motion.div
        key="card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="claim-modal-heading"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.24, ease: [0.2, 0, 0, 1] }}
        className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="pointer-events-auto w-full max-w-[460px] bg-[var(--paper)] border border-[var(--ink)] rounded-[var(--r-xl)] p-8 [box-shadow:var(--sh-overlay)]">
          {/* Top icon */}
          <div className="w-12 h-12 rounded-full bg-[var(--brand-soft)] flex items-center justify-center mb-5 text-[22px]" aria-hidden="true">
            💾
          </div>

          <h3 id="claim-modal-heading" className="font-serif font-medium text-[22px] m-0 mb-3 text-[var(--ink)]">
            Save this to your account?
          </h3>
          <p className="font-sans text-[14px] text-[var(--ink-muted)] leading-[1.6] mb-6 m-0">
            You&apos;ve viewed <strong className="font-medium text-[var(--ink)]">{serviceName}</strong> ({code}) more than once.
            Create a free account to track all your applications in one place — no more hunting for codes.
          </p>

          <div className="flex flex-wrap gap-3">
            <PillButton variant="solid" size="sm" asChild className="flex-1 justify-center">
              <Link href={`/signup?code=${encodeURIComponent(code)}`}>
                Save it →
              </Link>
            </PillButton>
            <PillButton
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="shrink-0"
            >
              Maybe later
            </PillButton>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
