import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/atoms/shared/Wordmark";
import { WizSaveState } from "./WizSaveState";

interface WizTopBarProps {
  serviceName: string;
  serviceSlug: string;
  saveStatus: "idle" | "saving" | "saved";
  isDirty?: boolean;
  className?: string;
}

export function WizTopBar({ serviceName, serviceSlug, saveStatus, isDirty, className }: WizTopBarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-[var(--paper)] border-b border-[var(--rule)] px-5 sm:px-8 h-14 flex items-center justify-between gap-4",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Wordmark href="/" size="sm" />
        <span className="text-[var(--rule-strong)] hidden sm:block" aria-hidden="true">/</span>
        <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1 min-w-0">
          <Link
            href={`/services/${serviceSlug}`}
            className="font-mono text-[11px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors truncate"
          >
            {serviceName}
          </Link>
          <span className="font-mono text-[11px] text-[var(--ink-subtle)]" aria-hidden="true">/</span>
          <span className="font-mono text-[11px] text-[var(--ink-muted)]">Application</span>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <WizSaveState status={saveStatus} />
        <Link
          href={`/services/${serviceSlug}`}
          onClick={isDirty ? (e) => {
            if (!window.confirm("Your draft is saved. Leave the application?")) {
              e.preventDefault();
            }
          } : undefined}
          className="font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
        >
          Exit
        </Link>
      </div>
    </header>
  );
}
