"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MultiTabConflictBannerProps {
  onResume: () => void;
  onDismiss: () => void;
  className?: string;
}

export function MultiTabConflictBanner({ onResume, onDismiss, className }: MultiTabConflictBannerProps) {
  return (
    <motion.div
      initial={{ y: -4, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
      role="alert"
      className={cn(
        "bg-[var(--warn-soft)] border-l-[3px] border-[var(--warn)] rounded-[var(--r-md)] px-4 py-3",
        "flex items-center gap-3 flex-wrap",
        className
      )}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[var(--warn)]" aria-hidden="true">
        <path d="M8 1.5L14.5 13H1.5L8 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M8 6.5V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="8" cy="11" r="0.65" fill="currentColor" />
      </svg>

      <span className="flex-1 font-sans text-[13px] text-[var(--ink)]">
        This application is open in another tab — changes may conflict.
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onResume}
          className="px-3 py-1.5 rounded-[var(--r-md)] bg-[var(--warn)] text-white font-sans text-[12px] font-medium hover:opacity-90 transition-opacity"
        >
          Edit here
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="px-3 py-1.5 rounded-[var(--r-md)] border border-[var(--rule-strong)] font-sans text-[12px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
        >
          Dismiss
        </button>
      </div>
    </motion.div>
  );
}
