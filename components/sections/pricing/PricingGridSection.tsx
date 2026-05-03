"use client";

import { useState } from "react";
import { PriceCard } from "@/components/molecules/PriceCard";
import { CurrencySelect } from "@/components/molecules/CurrencySelect";
import { MkIcon } from "@/components/atoms/MkIcon";
import { PRICING_TIERS, CURRENCY_RATES, formatPrice } from "@/lib/data/pricing";
import type { CurrencyCode, PlanType } from "@/types";
import { cn } from "@/lib/utils";

export function PricingGridSection() {
  const [planType, setPlanType] = useState<PlanType>("subscription");
  const [currency, setCurrency] = useState<CurrencyCode>("US$");
  const [isAnnual, setIsAnnual] = useState(false);

  const perfRevenue = 50000;
  const perfFee = perfRevenue * 0.08;

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-12 md:px-4">
      {/* Controls */}
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        {/* Plan type toggle */}
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

        {/* Annual toggle (subscription only) */}
        {planType === "subscription" && (
          <button
            onClick={() => setIsAnnual((a) => !a)}
            className={cn(
              "text-[13px] font-medium px-3 py-1.5 rounded-[8px] border cursor-pointer transition-all duration-[120ms]",
              isAnnual
                ? "border-brand text-brand bg-brand-soft"
                : "border-border text-text-muted hover:text-text hover:bg-surface-2"
            )}
          >
            {isAnnual ? "✓ Annual (save ~20%)" : "Switch to annual"}
          </button>
        )}

        {/* Currency */}
        <div className="ml-auto">
          <CurrencySelect value={currency} onValueChange={setCurrency} />
        </div>
      </div>

      {/* Subscription pricing */}
      {planType === "subscription" && (
        <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
          {PRICING_TIERS.map((tier) => (
            <PriceCard
              key={tier.id}
              tier={tier}
              currency={currency}
              isAnnual={isAnnual}
            />
          ))}
        </div>
      )}

      {/* Performance pricing */}
      {planType === "performance" && (
        <div className="max-w-[640px] mx-auto">
          <div className="bg-surface border border-border rounded-[14px] p-8">
            <div className="text-center mb-8">
              <p className="font-mono text-[11px] text-text-subtle uppercase tracking-[0.06em] mb-3">
                Performance
              </p>
              <div className="font-mono text-[clamp(36px,5vw,56px)] font-semibold text-text [font-feature-settings:'tnum']">
                8%
              </div>
              <p className="text-[16px] text-text-muted mt-1">
                of attributed revenue
              </p>
              <p className="text-[14px] text-text-subtle mt-2 max-w-[400px] mx-auto">
                Pay only when SolAI generates revenue for you. No monthly fee.
                Attribution is last-touch within a 7-day window.
              </p>
            </div>

            <ul className="list-none p-0 m-0 mb-6 flex flex-col gap-3">
              {[
                "All channels: Meta, Google, WhatsApp",
                "Unlimited products and conversations",
                "All payment rails including Mobile Money",
                "4 languages, all compliance included",
                "Full audit log and explainability",
                "Monthly invoicing, no upfront cost",
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-[14px] text-text-muted">
                  <MkIcon name="check" size={16} className="text-success shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>

            {/* Example calc */}
            <div className="bg-bg border border-border rounded-[10px] p-4 mb-6">
              <p className="text-[13px] font-medium text-text mb-3">
                Example calculation
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[14px]">
                  <span className="text-text-muted">Revenue attributed</span>
                  <span className="font-mono text-text [font-feature-settings:'tnum']">
                    {formatPrice(perfRevenue, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-text-muted">SolAI fee (8%)</span>
                  <span className="font-mono text-text [font-feature-settings:'tnum']">
                    {formatPrice(perfFee, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-[14px] font-semibold pt-2 border-t border-border">
                  <span className="text-text">You keep</span>
                  <span className="font-mono text-text [font-feature-settings:'tnum']">
                    {formatPrice(perfRevenue - perfFee, currency)}
                  </span>
                </div>
              </div>
            </div>

            <a
              href="/contact"
              className="block w-full text-center py-3 text-[14px] font-semibold bg-brand text-white rounded-[10px] no-underline hover:no-underline hover:bg-[#4A6BEE] transition-all duration-150"
            >
              Get started with Performance
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
