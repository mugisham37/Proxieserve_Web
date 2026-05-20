"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OfflineQueueOverlayProps {
  visible: boolean;
  className?: string;
}

export function OfflineQueueOverlay({ visible, className }: OfflineQueueOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "fixed inset-0 z-[100] bg-[var(--ink)] flex flex-col items-center justify-center gap-6 px-6 text-center",
            className
          )}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="offline-title"
          aria-describedby="offline-desc"
        >
          <div className="flex flex-col items-center gap-5">
            {/* Pulsing dot */}
            <div className="relative flex items-center justify-center">
              <motion.span
                className="absolute w-12 h-12 rounded-full bg-[var(--warn)]"
                animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <span className="relative w-5 h-5 rounded-full bg-[var(--warn)]" aria-hidden="true" />
            </div>

            <div className="flex flex-col gap-2">
              <h2
                id="offline-title"
                className="font-serif text-[24px] font-medium italic text-[var(--paper)]"
              >
                You&apos;re offline
              </h2>
              <p
                id="offline-desc"
                className="font-sans text-[14px] text-[rgba(242,235,215,0.7)] max-w-[320px] leading-relaxed"
              >
                Your draft is safe. We&apos;ll send your application automatically when you reconnect.
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-[var(--r-pill)] border border-[rgba(242,235,215,0.15)] bg-[rgba(242,235,215,0.06)]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[rgba(242,235,215,0.5)]" aria-hidden="true">
                <path d="M2 7h2.5l2-4 2 8 2-4H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[12px] text-[rgba(242,235,215,0.5)]">
                Application queued for submission
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
