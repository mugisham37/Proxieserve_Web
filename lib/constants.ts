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
      { label: "Changelog", href: "#" },
      { label: "Roadmap", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Data Processing", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Compliance", href: "#" },
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
  "Hours spent manually adjusting bids",
  "Copy-paste between Meta, Google, WhatsApp",
  "No explanation for why ROAS dropped",
  "Payments limited to cards only",
  "Data scattered across 4+ tools",
  "Compliance handled separately",
];

export const COMPARISON_WITH = [
  "Campaigns self-optimise every 15 minutes",
  "One upload drives every channel",
  "Every decision logged with reasoning",
  "Mobile Money + Stripe from day one",
  "Single dashboard, full audit trail",
  "Rwanda DPL, POPIA, NDPR built in",
];

export const STATS = [
  { value: "15 min", label: "Optimisation cycle" },
  { value: "5 min", label: "Time to first campaign" },
  { value: "4", label: "Languages supported" },
  { value: "5+", label: "Payment rails" },
];
