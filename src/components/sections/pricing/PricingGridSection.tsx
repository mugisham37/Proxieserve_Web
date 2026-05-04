import { PriceCard } from "@/src/components/molecules/PriceCard";
import { MkIcon } from "@/src/components/atoms/MkIcon";
import { PRICING_TIERS, CURRENCY_RATES, formatPrice } from "@/src/lib/data/pricing";
import type { CurrencyCode, PlanType } from "@/src/types";

interface PricingGridSectionProps {
  planType: PlanType;
  currency: CurrencyCode;
}

export function PricingGridSection({ planType, currency }: PricingGridSectionProps) {
  const perfRevenue = 10000;
  const perfFee = perfRevenue * 0.08;

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12 md:px-8">
      {planType === "subscription" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <PriceCard key={tier.id} tier={tier} currency={currency} />
          ))}
        </div>
      )}

      {planType === "performance" && (
        <div className="max-w-[560px] mx-auto">
          <div className="bg-surface border border-brand rounded-[14px] p-8">
            <p className="font-mono text-[11px] text-text-subtle uppercase tracking-[0.06em] mb-3">
              Performance · &quot;We only win when you win&quot;
            </p>

            <div className="font-mono text-[clamp(28px,4vw,40px)] font-semibold text-text [font-feature-settings:'tnum'] mb-1">
              8%<span className="text-[16px] font-normal text-text-muted"> of attributed revenue</span>
            </div>

            <p className="text-[14px] text-text-muted leading-[1.6] mt-4 mb-6">
              SolAI takes a percentage of incremental, attributable revenue — revenue that the audit log can prove was driven by SolAI-managed campaigns or conversations.
            </p>

            {/* Example calc */}
            <div className="bg-bg border border-border rounded-[10px] p-4 mb-6">
              <p className="text-[13px] font-medium text-text mb-3">
                Example at {formatPrice(perfRevenue, currency)} monthly revenue
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[14px]">
                  <span className="text-text-muted">Your revenue</span>
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
                  <span className="font-mono text-success [font-feature-settings:'tnum']">
                    {formatPrice(perfRevenue - perfFee, currency)}
                  </span>
                </div>
              </div>
            </div>

            <ul className="list-none p-0 m-0 mb-6 flex flex-col gap-3">
              {[
                "No monthly fee — only pay on results",
                "Audit-grade attribution chain",
                "Monthly signed settlement statements",
                "Dispute any attributed conversion",
                "Full platform access",
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-[14px] text-text-muted">
                  <MkIcon name="check" size={16} className="text-success shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>

            <a
              href="/contact"
              className="block w-full text-center py-3 text-[14px] font-semibold bg-brand text-white rounded-[10px] no-underline hover:no-underline hover:bg-[#4A6BEE] transition-all duration-150"
            >
              Apply for performance pricing
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
