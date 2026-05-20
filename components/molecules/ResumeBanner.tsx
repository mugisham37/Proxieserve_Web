"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ResumeBannerProps {
  serviceName: string;
  startedAt: string; // ISO string
  onDismiss: () => void;
  className?: string;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  return `${Math.floor(hours / 24)} day${Math.floor(hours / 24) !== 1 ? "s" : ""} ago`;
}

export function ResumeBanner({ serviceName, startedAt, onDismiss, className }: ResumeBannerProps) {
  const [ago, setAgo] = React.useState(() => timeAgo(startedAt));

  React.useEffect(() => {
    const t = setInterval(() => setAgo(timeAgo(startedAt)), 60000);
    return () => clearInterval(t);
  }, [startedAt]);

  return (
    <motion.div
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className={cn(
        "bg-[var(--ink)] text-[var(--paper)] rounded-[var(--r-lg)] px-4 py-3",
        "grid grid-cols-[1fr_auto] gap-3 items-center",
        className
      )}
    >
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-sans text-[13px] font-semibold truncate">
          Continue your application
        </span>
        <span className="font-sans text-[12px] text-[var(--ink-subtle)] dark:text-[rgba(242,235,215,0.6)] truncate">
          {serviceName} · started {ago}
        </span>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss resume banner"
        className="flex items-center justify-center w-7 h-7 rounded-[var(--r-sm)] text-[rgba(242,235,215,0.5)] hover:text-[var(--paper)] transition-colors shrink-0"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>
  );
}
