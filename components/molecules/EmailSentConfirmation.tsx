"use client";

import * as React from "react";
import Link from "next/link";
import { ResendCooldown } from "@/components/atoms/ResendCooldown";
import { cn } from "@/lib/utils";

interface EmailSentConfirmationProps {
  maskedEmail: string;
  onResend: () => void;
  className?: string;
}

export function EmailSentConfirmation({
  maskedEmail,
  onResend,
  className,
}: EmailSentConfirmationProps) {
  return (
    <div className={cn("flex flex-col items-center text-center gap-5 py-4", className)}>
      {/* Animated checkmark circle */}
      <div className="w-14 h-14 rounded-full bg-[var(--ok-soft)] flex items-center justify-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
          style={{ "--ok": "var(--ok)" } as React.CSSProperties}
        >
          <path
            d="M6 14l6 6L22 8"
            stroke="var(--ok)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="30"
            strokeDashoffset="0"
            className="animate-[stroke-draw_0.32s_ease_forwards]"
          />
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-[22px] text-[var(--ink)]">Check your email</h3>
        <p className="font-sans text-[14px] text-[var(--ink-muted)] leading-relaxed max-w-[300px]">
          We sent a password reset link to{" "}
          <span className="font-mono text-[13px] text-[var(--ink)]">{maskedEmail}</span>
        </p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="font-sans text-[13px] text-[var(--ink-muted)]">Didn&apos;t get it?</p>
        <ResendCooldown cooldownSeconds={30} onResend={onResend} />
      </div>

      <Link
        href="/login"
        className="font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors underline underline-offset-2 mt-2"
      >
        ← Back to sign in
      </Link>
    </div>
  );
}
