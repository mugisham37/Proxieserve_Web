"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { PricingGridSection } from "@/components/sections/pricing/PricingGridSection";
import { CurrencySelect } from "@/components/molecules/CurrencySelect";
import { CTASection } from "@/components/sections/landing/CTASection";
import { cn } from "@/lib/utils";
import type { CurrencyCode, PlanType } from "@/types";

export default function PricingPage() {
  const [planType, setPlanType] = useState<PlanType>("subscription");
  const [currency, setCurrency] = useState<CurrencyCode>("US$");

  return (
    <div>
      <div className="max-w-[1280px] mx-auto px-4 pt-10 pb-8 border-b border-border md:px-8 md:pt-16">
        <SectionLabel>Pricing</SectionLabel>
        <h1 className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] text-text mb-3">
          Simple, transparent pricing.
        </h1>
        <p className="text-[clamp(16px,1.8vw,18px)] text-text-muted max-w-[600px] leading-[1.7] mb-6">
          Two models. One audit log. We only win when you win.
        </p>

        {/* Controls */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="inline-flex bg-surface-2 border border-border rounded-[10px] p-1 gap-0.5">
            {(["subscription", "performance"] as PlanType[]).map((type) => (
              <button
                key={type}
                onClick={() => setPlanType(type)}
                className={cn(
                  "px-4 py-2 text-[13px] font-medium rounded-[7px] cursor-pointer border-none transition-all duration-[120ms] capitalize",
                  planType === type
                    ? "bg-brand text-white"
                    : "bg-transparent text-text-muted hover:text-text"
                )}
              >
                {type}
              </button>
            ))}
          </div>
          <CurrencySelect value={currency} onValueChange={setCurrency} />
        </div>
      </div>

      <PricingGridSection planType={planType} currency={currency} />
      <CTASection />
    </div>
  );
}
