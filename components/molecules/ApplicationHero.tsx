"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ApplicationSummary, AppStatus } from "@/lib/dashboard-data";

// Status → bg colour + text colour
const STATUS_THEME: Record<AppStatus, { bg: string; text: string; subText: string }> = {
  received:         { bg: "bg-[var(--info)]",        text: "text-white",        subText: "text-white/80" },
  "in-progress":    { bg: "bg-[var(--brand)]",       text: "text-white",        subText: "text-white/80" },
  "action-required":{ bg: "bg-[var(--warn)]",        text: "text-[var(--ink)]", subText: "text-[var(--ink)]/70" },
  "on-hold":        { bg: "bg-[var(--warn)]",        text: "text-[var(--ink)]", subText: "text-[var(--ink)]/70" },
  completed:        { bg: "bg-[var(--ok)]",          text: "text-white",        subText: "text-white/80" },
  rejected:         { bg: "bg-[var(--danger)]",      text: "text-white",        subText: "text-white/80" },
  archived:         { bg: "bg-[var(--ink-subtle)]",  text: "text-white",        subText: "text-white/70" },
};

const STATUS_LABEL: Record<AppStatus, string> = {
  received:          "Received",
  "in-progress":     "In Progress",
  "action-required": "Action Required",
  "on-hold":         "On Hold",
  completed:         "Completed",
  rejected:          "Rejected",
  archived:          "Archived",
};

const STATUS_SUB: Record<AppStatus, string> = {
  received:          "Your application has been received and is awaiting initial review.",
  "in-progress":     "Your application is actively being processed by your agent.",
  "action-required": "Your agent needs additional information or documents from you.",
  "on-hold":         "Processing is temporarily paused pending further information.",
  completed:         "All steps are complete. Your documents are ready for collection.",
  rejected:          "This application could not be processed. See details below.",
  archived:          "This service has been discontinued or archived.",
};

interface ApplicationHeroProps {
  application: ApplicationSummary;
}

export function ApplicationHero({ application }: ApplicationHeroProps) {
  const theme = STATUS_THEME[application.status];

  return (
    <div
      className={cn(
        "relative px-8 py-7 mb-6 rounded-[var(--r-lg)] overflow-hidden",
        "[clip-path:polygon(0_0,calc(100%-18px)_0,100%_18px,100%_100%,18px_100%,0_calc(100%-18px))]",
        theme.bg
      )}
      aria-label={`Application status: ${STATUS_LABEL[application.status]}`}
    >
      {/* Top row: category + updated */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <span className={cn("font-mono text-[11px] uppercase tracking-[0.1em]", theme.subText)}>
          {application.serviceCategory}
        </span>
        <span className={cn("font-mono text-[11px]", theme.subText)}>
          Updated {application.updatedAt}
        </span>
      </div>

      {/* PRX code */}
      <p className={cn("font-mono text-[15px] font-bold tracking-[0.05em] mb-2", theme.text)}>
        {application.code}
      </p>

      {/* Service name headline */}
      <h1
        className={cn(
          "font-serif font-medium leading-[1.15] mb-2",
          "text-[clamp(28px,3.8vw,40px)]",
          theme.text
        )}
      >
        {application.serviceName}
      </h1>

      {/* Sub description */}
      <p className={cn("font-serif text-[16px] leading-[1.5] mb-5", theme.subText)}>
        {STATUS_SUB[application.status]}
      </p>

      {/* Action pills */}
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/dashboard/applications/${application.code}?tab=messages`}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-[999px]",
            "font-sans text-[13px] font-semibold",
            "bg-white/20 backdrop-blur-sm border border-white/30",
            theme.text,
            "transition-colors duration-[var(--m-fast)]",
            "hover:bg-white/30",
            "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 3a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H3l-2 2V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
          </svg>
          Message agent
        </Link>

        <Link
          href={`/dashboard/applications/${application.code}?tab=documents`}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-[999px]",
            "font-sans text-[13px] font-semibold",
            "bg-white/20 backdrop-blur-sm border border-white/30",
            theme.text,
            "transition-colors duration-[var(--m-fast)]",
            "hover:bg-white/30",
            "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 1h5l3 3v9H3V1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            <path d="M8 1v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
          </svg>
          Documents
        </Link>

        {application.status === "action-required" && (
          <Link
            href={`/dashboard/applications/${application.code}?tab=overview`}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-[999px]",
              "font-sans text-[13px] font-bold",
              "bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)]",
              "transition-colors duration-[var(--m-fast)]",
              "hover:bg-[var(--ink-2)]",
              "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
            )}
          >
            Take action →
          </Link>
        )}
      </div>
    </div>
  );
}
