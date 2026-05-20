import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ServicePricingTier } from "@/lib/services-data";

interface PricingTierCardProps {
  tier: ServicePricingTier;
  highlighted?: boolean;
  className?: string;
}

export function PricingTierCard({ tier, highlighted, className }: PricingTierCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-[var(--r-lg)] border p-6",
        highlighted
          ? "bg-[var(--brand-soft)] border-[var(--brand)] shadow-[var(--sh-subtle)]"
          : "bg-[var(--paper)] border-[var(--rule)]",
        className
      )}
    >
      {/* Tier label */}
      <div className="flex items-center justify-between gap-2">
        <span className="t-h4 text-[var(--ink-muted)]">{tier.label}</span>
        {highlighted && (
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--brand)] bg-[var(--brand)] bg-opacity-10 px-2 py-0.5 rounded-[var(--r-pill)]">
            Popular
          </span>
        )}
      </div>

      {/* Fee */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[32px] font-medium text-[var(--ink)] leading-none">
          RWF {tier.fee.toLocaleString()}
        </span>
        <span className="font-sans text-[13px] text-[var(--ink-muted)]">{tier.eta}</span>
      </div>

      {/* Includes list */}
      <ul className="flex flex-col gap-2.5">
        {tier.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check
              size={14}
              className={cn(
                "mt-0.5 shrink-0",
                highlighted ? "text-[var(--brand)]" : "text-[var(--ok)]"
              )}
              aria-hidden="true"
            />
            <span className="font-sans text-[13px] text-[var(--ink-muted)] leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
