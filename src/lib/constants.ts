import type { NavLink, FooterColumn } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/africa", label: "For Africa" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "For Africa", href: "/africa" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export const LOGO_ITEMS = [
  "Shopify",
  "WooCommerce",
  "Meta Ads",
  "Google Ads",
  "WhatsApp",
  "Stripe",
  "MTN MoMo",
];

export const COMPLIANCE_BADGES = [
  "Rwanda DPL",
  "POPIA",
  "NDPR",
  "GDPR-Ready",
  "SOC 2",
  "af-south-1",
];

export const SPEND_RANGES = [
  "Under $500/mo",
  "$500–$2,000/mo",
  "$2,000–$10,000/mo",
  "$10,000–$50,000/mo",
  "$50,000+/mo",
];

export const PLATFORMS = [
  "Shopify",
  "WooCommerce",
  "Custom store",
  "Other",
];

export const COMPARISON_WITHOUT = [
  "Ad budgets bleed with no one watching",
  "Leads go cold in unanswered DMs",
  "No idea which creative is working",
  "Agencies cost US$ 1,000–5,000/month",
  "Mobile money customers can't check out",
  "No audit trail — \"trust us\" is the answer",
  "One language, one channel, one market",
];

export const COMPARISON_WITH = [
  "Every 15 min, budget flows to winners",
  "Sales Agent closes in WhatsApp, IG, Messenger",
  "A/B tests run automatically — losers paused",
  "One upload replaces the agency",
  "Stripe + MoMo + Airtel — all first-class",
  "Every decision logged with reasoning",
  "Four languages, five channels, global reach",
];

export const STATS = [
  { value: "15 min", label: "Optimisation cycle" },
  { value: "5", label: "Autonomous agents" },
  { value: "< 60s", label: "Chat-to-checkout" },
  { value: "100%", label: "Decisions explained" },
];
