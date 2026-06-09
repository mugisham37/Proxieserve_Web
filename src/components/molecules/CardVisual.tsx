"use client";

import * as React from "react";
import type { CardBrand } from "@/components/atoms/auth/CardField";
import { cn } from "@/lib/utils";

interface CardVisualProps {
  cardNumber?: string;
  cardholderName?: string;
  expiry?: string;
  brand?: CardBrand;
  className?: string;
}

function BrandMark({ brand }: { brand: CardBrand }) {
  if (brand === "visa") {
    return (
      <span className="font-serif italic text-[18px] font-medium text-[rgba(246,236,210,0.9)] tracking-wider select-none">
        VISA
      </span>
    );
  }
  if (brand === "mastercard") {
    return (
      <svg width="38" height="24" viewBox="0 0 38 24" aria-label="Mastercard" role="img">
        <circle cx="15" cy="12" r="12" fill="#EB001B" opacity="0.9" />
        <circle cx="23" cy="12" r="12" fill="#F79E1B" opacity="0.9" />
        <path d="M19 4.8a12 12 0 0 1 0 14.4A12 12 0 0 1 19 4.8Z" fill="#FF5F00" opacity="0.85" />
      </svg>
    );
  }
  return (
    <span className="font-sans text-[11px] text-[rgba(246,236,210,0.3)] uppercase tracking-wider">
      Card
    </span>
  );
}

function maskNumber(formatted: string) {
  if (!formatted || formatted.trim() === "") {
    return "•••• •••• •••• ••••";
  }
  const groups = formatted.split(" ");
  return groups
    .map((g, i) => {
      if (i < groups.length - 1) return g.replace(/\d/g, "•");
      return g.padEnd(4, "•");
    })
    .join(" ");
}

export function CardVisual({
  cardNumber = "",
  cardholderName = "",
  expiry = "",
  brand = null,
  className,
}: CardVisualProps) {
  const displayNumber = maskNumber(cardNumber);
  const displayName = cardholderName.toUpperCase() || "YOUR NAME";
  const displayExpiry = expiry || "MM / YY";

  return (
    <div
      className={cn(
        "card-visual-clip w-full max-w-[420px] aspect-[1.586/1] relative",
        "rounded-[var(--r-lg)] overflow-hidden select-none",
        className
      )}
      style={{
        background: `linear-gradient(135deg, var(--card-dark-start) 0%, var(--card-dark-end) 100%)`,
      }}
      aria-hidden="true"
    >
      {/* Chip */}
      <div
        className="absolute top-6 left-6 w-9 h-7 rounded-[5px]"
        style={{
          background: `linear-gradient(135deg, var(--card-chip-start), var(--card-chip-end))`,
        }}
      >
        <div className="w-full h-full opacity-30 grid grid-cols-2 grid-rows-2 gap-[2px] p-[3px]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-[2px] bg-[rgba(0,0,0,0.4)]" />
          ))}
        </div>
      </div>

      {/* Brand mark */}
      <div className="absolute top-5 right-5 flex items-center">
        <BrandMark brand={brand} />
      </div>

      {/* Card number */}
      <div className="absolute bottom-[56px] left-6 right-6">
        <p className="font-mono text-[18px] sm:text-[20px] tracking-[0.12em] text-[rgba(246,236,210,0.85)] leading-none">
          {displayNumber}
        </p>
      </div>

      {/* Cardholder + expiry row */}
      <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="font-sans text-[9px] uppercase tracking-[0.14em] text-[rgba(246,236,210,0.4)]">
            Card holder
          </span>
          <span className="font-mono text-[11px] tracking-[0.06em] text-[rgba(246,236,210,0.75)] truncate max-w-[180px]">
            {displayName}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 items-end">
          <span className="font-sans text-[9px] uppercase tracking-[0.14em] text-[rgba(246,236,210,0.4)]">
            Expires
          </span>
          <span className="font-mono text-[11px] tracking-[0.06em] text-[rgba(246,236,210,0.75)]">
            {displayExpiry}
          </span>
        </div>
      </div>
    </div>
  );
}
