import type { PricingTier, CurrencyCode } from "@/types";

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    baseUsd: 0,
    period: "Free forever",
    annualUsd: 0,
    desc: "One product, one campaign. Get your first sale with SolAI — no card required.",
    features: [
      "1 active product",
      "Meta or Google (one channel)",
      "WhatsApp Sales Agent (100 conversations/mo)",
      "Stripe payments",
      "7-day audit log",
      "Email support",
    ],
    ctaLabel: "Start free",
  },
  {
    id: "growth",
    name: "Growth",
    baseUsd: 99,
    period: "per month",
    annualUsd: 79,
    desc: "Multi-channel campaigns, Mobile Money, and unlimited conversations for growing sellers.",
    features: [
      "10 active products",
      "Meta + Google simultaneously",
      "Unlimited Sales Agent conversations",
      "Stripe + MTN MoMo + M-Pesa",
      "4 languages",
      "30-day audit log",
      "Priority chat support",
    ],
    ctaLabel: "Start Growth",
    featured: true,
  },
  {
    id: "scale",
    name: "Scale",
    baseUsd: 349,
    period: "per month",
    annualUsd: 279,
    desc: "Unlimited products, all payment rails, custom agent training, and dedicated support.",
    features: [
      "Unlimited products",
      "All channels + custom channels",
      "Custom Sales Agent training",
      "All payment rails incl. Wave & Airtel",
      "90-day audit log",
      "Data residency choice",
      "Dedicated account manager",
    ],
    ctaLabel: "Contact sales",
  },
];

export const CURRENCY_RATES: Record<CurrencyCode, number> = {
  "US$": 1,
  EUR: 0.92,
  RWF: 1350,
  KES: 153,
  NGN: 1550,
  ZAR: 18.5,
};

const ZERO_DECIMAL: CurrencyCode[] = ["RWF", "KES", "NGN"];

export function formatPrice(usd: number, currency: CurrencyCode): string {
  if (usd === 0) return "Free";
  const value = usd * CURRENCY_RATES[currency];
  const isZeroDecimal = ZERO_DECIMAL.includes(currency);
  const formatted = isZeroDecimal
    ? Math.round(value).toLocaleString("en-US")
    : value.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
  return `${currency} ${formatted}`;
}
