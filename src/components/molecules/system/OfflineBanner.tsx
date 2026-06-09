"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface OfflineBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  onRetry?: () => void;
}

export function OfflineBanner({ onRetry, className, ...props }: OfflineBannerProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 bg-[var(--ink)] text-[var(--paper)] rounded-[var(--r-md)]",
        "font-sans text-[13px]",
        className
      )}
      role="status"
      {...props}
    >
      <span className="pulse-dot shrink-0" aria-hidden="true" />
      <span className="flex-1">You&apos;re offline — showing cached content</span>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="font-medium text-[var(--brand)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]"
        >
          Retry
        </button>
      )}
    </div>
  );
}
