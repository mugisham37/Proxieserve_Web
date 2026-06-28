"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useBackendStatus } from "@/lib/backend-status";

export function BackendStatusBanner({ className }: { className?: string }) {
  const { isBackendOffline, retryHealthCheck } = useBackendStatus();
  const [isRetrying, setIsRetrying] = React.useState(false);

  if (!isBackendOffline) {
    return null;
  }

  async function handleRetry() {
    setIsRetrying(true);
    try {
      await retryHealthCheck();
    } finally {
      setIsRetrying(false);
    }
  }

  return (
    <div
      className={cn(
        "sticky top-0 z-[60] flex items-center gap-3 px-4 py-2.5",
        "bg-[var(--warn-bg,#3d2e00)] text-[var(--paper)] border-b border-[rgba(242,235,215,0.12)]",
        "font-sans text-[13px]",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <span className="pulse-dot shrink-0" aria-hidden="true" />
      <span className="flex-1">
        We&apos;re having trouble connecting to the server. Some features may be unavailable.
      </span>
      <button
        type="button"
        onClick={() => void handleRetry()}
        disabled={isRetrying}
        className="font-medium text-[var(--brand)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] disabled:opacity-60"
      >
        {isRetrying ? "Retrying…" : "Retry"}
      </button>
    </div>
  );
}
