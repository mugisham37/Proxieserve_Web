"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { DRAFT_EXPIRY_HOURS } from "@/lib/application-types";

interface DraftExpiryBannerProps {
  createdAt: string; // ISO string
  onSubmitNow: () => void;
  onDismiss: () => void;
  className?: string;
}

function getHoursLeft(createdAt: string): number {
  const elapsed = (Date.now() - new Date(createdAt).getTime()) / 3600000;
  return Math.max(0, Math.ceil(DRAFT_EXPIRY_HOURS - elapsed));
}

export function DraftExpiryBanner({ createdAt, onSubmitNow, onDismiss, className }: DraftExpiryBannerProps) {
  const [hoursLeft, setHoursLeft] = React.useState(() => getHoursLeft(createdAt));

  React.useEffect(() => {
    const t = setInterval(() => setHoursLeft(getHoursLeft(createdAt)), 60000);
    return () => clearInterval(t);
  }, [createdAt]);

  return (
    <div
      className={cn(
        "bg-[var(--cream-2)] border border-[var(--rule)] rounded-[var(--r-md)] px-4 py-3",
        "grid grid-cols-[1fr_auto] gap-3 items-center",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[var(--warn)]" aria-hidden="true">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-sans text-[13px] text-[var(--ink)]">
          Draft expires in{" "}
          <span className="font-mono text-[var(--warn)] font-medium">{hoursLeft}h</span>
          {" "}—{" "}
          <button
            type="button"
            onClick={onSubmitNow}
            className="underline underline-offset-2 hover:no-underline transition-all"
          >
            submit now
          </button>
        </span>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss expiry warning"
        className="flex items-center justify-center w-6 h-6 rounded text-[var(--ink-subtle)] hover:text-[var(--ink)] transition-colors shrink-0"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
