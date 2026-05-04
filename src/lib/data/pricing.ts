import type { PricingTier, CurrencyCode } from "@/src/types";

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "01 · Starter",
    baseUsd: 0,
    period: "Free forever",
    annualUsd: 0,
    desc: "Try SolAI with one product, one channel, and US$ 500/month ad-spend headroom.",
    features: [
      "1 product",
      "Meta Ads only",
      "WhatsApp + web widget",
      "Stripe payments",
      "Full audit trail",
    ],
    ctaLabel: "Start free",
  },
  {
    id: "growth",
    name: "02 · Growth",
    baseUsd: 99,
    period: "per month",
    annualUsd: 79,
    desc: "Full platform. All channels. All payment rails. Unlimited products.",
    features: [
      "Unlimited products",
      "Meta + Google Ads",
      "All 5 chat channels",
      "Stripe + MoMo + Airtel",
      "Up to US$ 10,000/mo ad spend",
      "CRM integrations",
      "Priority support",
    ],
    ctaLabel: "Start free trial",
    featured: true,
  },
  {
    id: "scale",
    name: "03 · Scale",
    baseUsd: 349,
    period: "per month",
    annualUsd: 279,
    desc: "High-volume sellers. Custom caps. Dedicated support. SLA.",
    features: [
      "Everything in Growth",
      "Unlimited ad spend",
      "TikTok Ads (beta)",
      "Custom CRM webhooks",
      "Compliance exports",
      "99.9% SLA",
    ],
    ctaLabel: "Talk to sales",
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
  const value = usd * CURRENCY_RATES[currency];
  const isZeroDecimal = ZERO_DECIMAL.includes(currency);
  const formatted = isZeroDecimal
    ? Math.round(value).toLocaleString("en-US")
    : value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  return `${currency} ${formatted}`;
}
