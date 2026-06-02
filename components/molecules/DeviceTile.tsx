"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DeviceTileProps {
  deviceName: string;
  meta: string;
  isCurrentDevice?: boolean;
  onRevoke?: () => void;
}

export function DeviceTile({ deviceName, meta, isCurrentDevice = false, onRevoke }: DeviceTileProps) {
  return (
    <div className="grid grid-cols-[32px_1fr_auto] gap-3 items-center py-[14px] border-t border-[var(--rule)] first:border-t-0">
      {/* Icon */}
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--cream-2)] text-[var(--ink-muted)] shrink-0">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <rect x="1" y="2" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M4 13h6M7 11v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </span>

      {/* Info */}
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-sans text-[14px] font-semibold text-[var(--ink)] m-0 truncate">{deviceName}</p>
          {isCurrentDevice && (
            <span className="inline-flex items-center px-[8px] py-[2px] bg-[var(--ok-soft)] text-[var(--ok)] rounded-[999px] font-sans text-[11px] font-medium">
              This device
            </span>
          )}
        </div>
        <p className="font-mono text-[11px] text-[var(--ink-muted)] mt-[2px] m-0">{meta}</p>
      </div>

      {/* Revoke */}
      {!isCurrentDevice && onRevoke && (
        <button
          type="button"
          onClick={onRevoke}
          className={cn(
            "px-3 py-[5px] rounded-[999px]",
            "font-sans text-[11px] font-semibold",
            "bg-transparent border border-[var(--rule)]",
            "text-[var(--ink-muted)]",
            "transition-colors duration-[var(--m-fast)]",
            "hover:border-[var(--danger)] hover:text-[var(--danger)]",
            "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]",
            "shrink-0"
          )}
        >
          Revoke
        </button>
      )}
    </div>
  );
}
