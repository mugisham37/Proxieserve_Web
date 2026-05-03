import Link from "next/link";
import { MkIcon } from "@/components/atoms/MkIcon";
import type { PricingTier, CurrencyCode } from "@/types";
import { formatPrice } from "@/lib/data/pricing";
import { cn } from "@/lib/utils";

interface PriceCardProps {
  tier: PricingTier;
  currency: CurrencyCode;
  isAnnual: boolean;
}

export function PriceCard({ tier, currency, isAnnual }: PriceCardProps) {
  const price = isAnnual ? tier.annualUsd : tier.baseUsd;
  const formattedPrice = formatPrice(price, currency);

  return (
    <div
      className={cn(
        "bg-surface border rounded-[14px] p-7 relative",
        tier.featured ? "border-brand" : "border-border"
      )}
    >
      {tier.featured && (
        <span className="absolute -top-3 left-6 text-[11px] font-semibold px-2.5 py-1 bg-brand text-white rounded-sm uppercase tracking-[0.04em]">
          Most popular
        </span>
      )}

      <p className="font-mono text-[11px] text-text-subtle uppercase tracking-[0.06em] mb-3">
        {tier.name}
      </p>

      <div className="font-mono text-[clamp(28px,3vw,40px)] font-semibold text-text [font-feature-settings:'tnum'] mb-1">
        {tier.baseUsd === 0 ? (
          "Free"
        ) : (
          <>
            {formattedPrice}
            <span className="text-[16px] font-normal text-text-muted">/mo</span>
          </>
        )}
      </div>

      {isAnnual && tier.baseUsd > 0 && (
        <p className="text-[13px] text-text-subtle mb-1">
          Billed annually · save{" "}
          {Math.round(((tier.baseUsd - tier.annualUsd) / tier.baseUsd) * 100)}%
        </p>
      )}
      {!isAnnual && tier.baseUsd > 0 && (
        <p className="text-[13px] text-text-subtle mb-1">per month</p>
      )}

      <p className="text-[14px] text-text-muted leading-[1.6] mb-4 mt-2">
        {tier.desc}
      </p>

      <ul className="list-none p-0 m-0 mb-5 flex flex-col gap-2">
        {tier.features.map((feat) => (
          <li key={feat} className="flex items-center gap-2 text-[13px] text-text-muted">
            <MkIcon name="check" size={14} className="text-success shrink-0" />
            {feat}
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={cn(
          "block w-full text-center py-2.5 text-[14px] font-semibold rounded-[10px] no-underline hover:no-underline transition-all duration-150",
          tier.featured
            ? "bg-brand text-white hover:bg-[#4A6BEE]"
            : "bg-transparent text-text border border-border hover:bg-surface-2"
        )}
      >
        {tier.ctaLabel}
      </Link>
    </div>
  );
}
