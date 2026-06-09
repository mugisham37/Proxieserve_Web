"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/atoms/PillButton";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ErrorCode = "404" | "500" | "503" | "offline" | "429" | "session";

export interface ErrorAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
}

export interface ErrorPageProps {
  code: ErrorCode;
  headline?: string;
  subline?: string;
  actions?: ErrorAction[];
  incidentId?: string;
  note?: React.ReactNode;
  className?: string;
}

// ─── Per-code defaults ────────────────────────────────────────────────────────

const DEFAULTS: Record<
  ErrorCode,
  { headline: string; subline: string; actions: ErrorAction[] }
> = {
  "404": {
    headline: "We can't find that page.",
    subline: "The link might be old, or there's a typo. Let's get you back somewhere useful.",
    actions: [
      { label: "Go home →", href: "/", variant: "solid" },
      { label: "Track an application", href: "/track", variant: "ghost" },
    ],
  },
  "500": {
    headline: "Something went wrong on our end.",
    subline: "Your data is safe — nothing was lost. We've logged it for our team. Try again in a moment.",
    actions: [
      { label: "Try again ↻", variant: "solid" },
      { label: "Contact support", href: "/contact", variant: "ghost" },
    ],
  },
  "503": {
    headline: "We're doing a little maintenance.",
    subline: "ProxiServe is briefly offline for an upgrade. Your applications are safe and waiting.",
    actions: [
      { label: "Check status page", href: "/status", variant: "ghost" },
    ],
  },
  "offline": {
    headline: "You're offline.",
    subline: "No internet right now. You can still view applications you've already opened — we saved them on this device. New actions will sync when you're back.",
    actions: [
      { label: "View saved applications", href: "/dashboard", variant: "solid" },
      { label: "Retry ↻", variant: "ghost" },
    ],
  },
  "session": {
    headline: "You've been signed out.",
    subline: "For your security we sign you out after a while. Your unsaved work is preserved — sign back in to pick up exactly where you left off.",
    actions: [
      { label: "Sign in →", href: "/login", variant: "solid" },
    ],
  },
  "429": {
    headline: "That's a lot of requests.",
    subline: "You're going faster than we allow, to keep things fair for everyone. Take a short breather and try again in a few seconds.",
    actions: [
      { label: "Try again ↻", variant: "solid" },
    ],
  },
};

// ─── Numeral / icon block ─────────────────────────────────────────────────────

function ErrorVisual({ code }: { code: ErrorCode }) {
  if (code === "503") {
    return (
      <div
        className="w-[72px] h-[72px] rounded-full bg-[var(--warn-soft)] text-[var(--warn)] flex items-center justify-center mx-auto mb-5"
        aria-hidden="true"
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a1.4 1.4 0 0 0 2 2l6-6a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2 2.3-2.3z" />
        </svg>
      </div>
    );
  }

  if (code === "offline") {
    return (
      <div
        className="w-[72px] h-[72px] rounded-full bg-[var(--cream-2)] text-[var(--ink-muted)] flex items-center justify-center mx-auto mb-5"
        aria-hidden="true"
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M2 8.8a15 15 0 0 1 20 0M5 12.8a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M12 20h.01" />
          <path d="m2 2 20 20" strokeWidth="1.8" />
        </svg>
      </div>
    );
  }

  if (code === "session") {
    return (
      <div className="font-serif italic font-normal text-[64px] leading-none text-[var(--warn)] mb-5 select-none" aria-hidden="true">
        ⏱
      </div>
    );
  }

  const colorClass =
    code === "404" ? "text-[var(--brand)]" :
    code === "429" ? "text-[var(--warn)]" :
    "text-[var(--ink)]";

  return (
    <div
      className={cn(
        "font-serif italic font-normal leading-none tracking-[-0.03em] mb-3 select-none",
        "text-[clamp(72px,10vw,88px)]",
        colorClass
      )}
      aria-hidden="true"
    >
      {code}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ErrorPage({
  code,
  headline,
  subline,
  actions,
  incidentId,
  note,
  className,
}: ErrorPageProps) {
  const defaults = DEFAULTS[code];
  const resolvedHeadline = headline ?? defaults.headline;
  const resolvedSubline = subline ?? defaults.subline;
  const resolvedActions = actions ?? defaults.actions;

  const headingRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div
      role="alert"
      className={cn(
        "min-h-[calc(100dvh-80px)] flex items-center justify-center py-16 px-5",
        className
      )}
    >
      <div className="text-center max-w-[420px] w-full">
        <ErrorVisual code={code} />

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-serif font-medium text-[clamp(22px,3.5vw,28px)] leading-[1.2] text-[var(--ink)] m-0 mb-3 focus:outline-none"
        >
          {resolvedHeadline}
        </h1>

        <p className="font-sans text-[14px] text-[var(--ink-muted)] leading-[1.65] m-0 mb-6 max-w-[360px] mx-auto">
          {resolvedSubline}
        </p>

        {note && (
          <p className="font-sans text-[13px] text-[var(--ok)] bg-[var(--ok-soft)] rounded-[var(--r-md)] px-4 py-3 mb-6 leading-[1.55]">
            {note}
          </p>
        )}

        {resolvedActions.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {resolvedActions.map((action) => {
              if (action.href) {
                return (
                  <PillButton key={action.label} variant={action.variant ?? "ghost"} size="sm" asChild>
                    <Link href={action.href}>{action.label}</Link>
                  </PillButton>
                );
              }
              return (
                <PillButton
                  key={action.label}
                  variant={action.variant ?? "ghost"}
                  size="sm"
                  onClick={action.onClick}
                >
                  {action.label}
                </PillButton>
              );
            })}
          </div>
        )}

        {incidentId && (
          <p className="font-mono text-[11px] text-[var(--ink-subtle)] mt-5 tracking-[0.04em]">
            Incident #{incidentId}
          </p>
        )}
      </div>
    </div>
  );
}
