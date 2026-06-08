"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/lib/types/payment";

interface PaymentMethodCardProps {
  method: PaymentMethod;
  label: string;
  description: string;
  isSelected: boolean;
  isOffPlatform?: boolean;
  offPlatformLabel?: string;
  onClick: () => void;
}

function MethodLogo({ method }: { method: PaymentMethod }) {
  switch (method) {
    case "mtn-momo":
      return (
        <div className="flex items-center justify-center w-14 h-14 rounded-[var(--r-md)] bg-[#FFCB05] flex-shrink-0">
          <span className="font-sans font-black text-[11px] text-[#1a1612] tracking-tight leading-none text-center">
            MTN<br />MoMo
          </span>
        </div>
      );
    case "airtel-money":
      return (
        <div className="flex items-center justify-center w-14 h-14 rounded-[var(--r-md)] bg-[#E40000] flex-shrink-0">
          <span className="font-sans font-black text-[10px] text-white tracking-tight leading-none text-center">
            Airtel<br />Money
          </span>
        </div>
      );
    case "card":
      return (
        <div className="flex items-center justify-center w-14 h-14 rounded-[var(--r-md)] bg-[var(--ink)] flex-shrink-0">
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
            <rect x="0.5" y="0.5" width="27" height="19" rx="3.5" stroke="rgba(246,236,210,0.3)" fill="none" />
            <rect y="5" width="28" height="5" fill="rgba(246,236,210,0.2)" />
            <rect x="4" y="13" width="8" height="3" rx="1" fill="rgba(246,236,210,0.5)" />
          </svg>
        </div>
      );
    case "agent":
      return (
        <div className="flex items-center justify-center w-14 h-14 rounded-[var(--r-md)] bg-[var(--cream-2)] flex-shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="var(--ink-muted)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="9" cy="7" r="4" stroke="var(--ink-muted)" strokeWidth="1.5" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="var(--ink-muted)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      );
  }
}

export function PaymentMethodCard({
  method,
  label,
  description,
  isSelected,
  isOffPlatform,
  offPlatformLabel = "Off-platform",
  onClick,
}: PaymentMethodCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-[var(--r-lg)] border text-left",
        "transition-[background,border-color,box-shadow] duration-[120ms]",
        "focus:outline-none focus-visible:shadow-[var(--focus-ring)]",
        "hover:bg-[var(--paper-2)]",
        isSelected
          ? "bg-[var(--paper)] border-[var(--ink)] shadow-[0_0_0_1px_var(--ink)]"
          : "bg-[var(--paper)] border-[var(--rule)]"
      )}
    >
      <MethodLogo method={method} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-serif text-[15px] font-medium text-[var(--ink)]">
            {label}
          </span>
          {isOffPlatform && (
            <span className="inline-flex items-center rounded-[var(--r-pill)] bg-[var(--warn-soft)] text-[var(--warn)] font-mono text-[9px] uppercase tracking-[0.1em] px-2 py-0.5">
              {offPlatformLabel}
            </span>
          )}
        </div>
        <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-0.5 leading-snug">
          {description}
        </p>
      </div>

      {/* Radio indicator */}
      <div
        className={cn(
          "flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-[120ms]",
          isSelected
            ? "border-[var(--ink)] bg-[var(--ink)]"
            : "border-[var(--rule-strong)] bg-transparent"
        )}
        aria-hidden="true"
      >
        {isSelected && (
          <div className="w-2 h-2 rounded-full bg-[var(--paper)]" />
        )}
      </div>
    </button>
  );
}
