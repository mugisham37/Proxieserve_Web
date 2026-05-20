"use client";

import * as React from "react";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormField } from "@/components/atoms/FormField";
import { AppButton } from "@/components/atoms/AppButton";

interface WaitlistCardProps {
  serviceName: string;
  className?: string;
}

export function WaitlistCard({ serviceName, className }: WaitlistCardProps) {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-[var(--r-lg)] bg-[var(--warn-soft)] border border-[rgba(201,122,31,0.2)] p-6",
        className
      )}
      role="region"
      aria-label="Waitlist"
    >
      <div className="flex items-start gap-3">
        <Users size={18} className="mt-0.5 shrink-0 text-[var(--warn)]" aria-hidden="true" />
        <div>
          <p className="font-sans text-[14px] font-semibold text-[var(--ink)]">Currently at capacity</p>
          <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-0.5 leading-snug">
            {serviceName} is temporarily full. Join the waitlist to be notified when capacity opens.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="rounded-[var(--r-md)] bg-[var(--ok-soft)] border border-[rgba(63,122,78,0.2)] px-4 py-3">
          <p className="font-sans text-[13px] text-[var(--ok)] font-medium">
            You&apos;re on the list. We&apos;ll notify you by email.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <FormField
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            placeholder="you@example.com"
            required
          />
          <AppButton type="submit" variant="default" size="sm" disabled={!email}>
            Join waitlist
          </AppButton>
        </form>
      )}
    </div>
  );
}
