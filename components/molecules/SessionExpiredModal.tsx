"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SessionExpiredModalProps {
  isOpen: boolean;
}

export function SessionExpiredModal({ isOpen }: SessionExpiredModalProps) {
  // Trap focus when open
  const dialogRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim */}
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-[var(--ink)]/60 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Card */}
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="session-expired-title"
            aria-describedby="session-expired-desc"
            ref={dialogRef}
            tabIndex={-1}
            className={cn(
              "fixed inset-0 z-[201] flex items-center justify-center p-5",
              "focus-visible:outline-none"
            )}
          >
            <div className="w-full max-w-[400px] bg-[var(--paper)] border border-[var(--ink)] rounded-[var(--r-xl)] p-10 text-center">
              {/* Lock icon */}
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--ink)] text-[var(--paper)] mx-auto mb-6"
                aria-hidden="true"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="4" y="9" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 9V7a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="10" cy="13" r="1.25" fill="currentColor"/>
                </svg>
              </div>

              {/* Heading */}
              <h3
                id="session-expired-title"
                className="font-serif text-[22px] font-medium text-[var(--ink)] m-0 mb-3"
              >
                Your session has expired.
              </h3>

              {/* Description */}
              <p
                id="session-expired-desc"
                className="font-sans text-[14px] text-[var(--ink-muted)] mb-7 leading-relaxed"
              >
                For your security, you have been signed out after a period of inactivity.
                Sign back in to continue managing your applications.
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/login?next=/dashboard"
                  className={cn(
                    "flex items-center justify-center w-full px-5 py-3 rounded-[999px]",
                    "font-sans text-[14px] font-semibold",
                    "bg-[var(--ink)] text-[var(--paper)]",
                    "transition-opacity duration-[var(--m-fast)]",
                    "hover:opacity-85",
                    "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
                  )}
                >
                  Sign back in
                </Link>

                <Link
                  href="/track"
                  className={cn(
                    "flex items-center justify-center w-full px-5 py-3 rounded-[999px]",
                    "font-sans text-[14px] font-semibold",
                    "bg-transparent text-[var(--ink-muted)] border border-[var(--rule)]",
                    "transition-colors duration-[var(--m-fast)]",
                    "hover:border-[var(--ink)] hover:text-[var(--ink)]",
                    "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
                  )}
                >
                  Continue as guest
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
