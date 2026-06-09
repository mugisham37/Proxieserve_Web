"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/atoms/shared/PillButton";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  onEmailCapture?: (email: string) => void;
}

export function EmptyState({
  title = "Nothing here yet",
  description = "No services are currently listed. Enter your email to be notified when they're available.",
  onEmailCapture,
  className,
  ...props
}: EmptyStateProps) {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      onEmailCapture?.(email);
      setSubmitted(true);
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-5 p-12 text-center",
        "border-2 border-dashed border-[var(--rule)] rounded-[var(--r-xl)]",
        className
      )}
      {...props}
    >
      <span className="font-serif italic text-[48px] text-[var(--ink-subtle)] leading-none select-none" aria-hidden="true">
        ∅
      </span>
      <div>
        <h3 className="t-h3 text-[var(--ink)] mb-2">{title}</h3>
        <p className="font-sans text-[14px] text-[var(--ink-muted)] max-w-sm">{description}</p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-sm">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 rounded-[var(--r-md)] border border-[var(--rule-strong)] bg-[var(--paper)] text-[var(--ink)] font-sans text-[14px] px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]"
          />
          <PillButton type="submit" variant="solid" size="sm">Notify me</PillButton>
        </form>
      ) : (
        <p className="font-sans text-[13px] text-[var(--ok)]">✓ You're on the list</p>
      )}
    </div>
  );
}
