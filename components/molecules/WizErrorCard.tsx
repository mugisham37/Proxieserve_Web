import * as React from "react";
import { cn } from "@/lib/utils";

interface WizErrorCardProps {
  message?: string;
  incidentId?: string;
  onRetry: () => void;
  onContact?: () => void;
  className?: string;
}

export function WizErrorCard({ message, incidentId, onRetry, onContact, className }: WizErrorCardProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-[var(--r-md)] bg-[var(--danger-soft)] border-l-[3px] border-[var(--danger)] px-4 py-4",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="shrink-0 mt-0.5 text-[var(--danger)]"
          aria-hidden="true"
        >
          <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M9 5.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="12.5" r="0.8" fill="currentColor" />
        </svg>
        <div className="flex flex-col gap-2 flex-1">
          <div>
            <h4 className="font-sans text-[13px] font-semibold text-[var(--danger)]">
              Something went wrong
            </h4>
            <p className="font-sans text-[12.5px] text-[var(--ink-muted)] mt-0.5">
              {message ?? "We couldn't send your application. Your draft is saved — please try again."}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={onRetry}
              className="px-3 py-1.5 rounded-[var(--r-md)] bg-[var(--danger)] text-white font-sans text-[12px] font-medium hover:opacity-90 transition-opacity"
            >
              Try again
            </button>
            {onContact && (
              <button
                type="button"
                onClick={onContact}
                className="px-3 py-1.5 rounded-[var(--r-md)] border border-[var(--rule-strong)] font-sans text-[12px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
              >
                Contact support
              </button>
            )}
          </div>

          {incidentId && (
            <p className="font-mono text-[10px] text-[var(--ink-subtle)] opacity-80">
              Incident: {incidentId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
