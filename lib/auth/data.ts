import type { IconName } from "@/types";

export const SIGNUP_PANEL_STEPS = [
  {
    num: "01",
    title: "Verify your email",
    desc: "A 6-digit code lands in your inbox.",
  },
  {
    num: "02",
    title: "Connect your store",
    desc: "OAuth into Shopify, WooCommerce, or paste a product URL.",
  },
  {
    num: "03",
    title: "Set your spend cap",
    desc: "Choose a daily limit. SolAI can never exceed it.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "Upload a product and SolAI builds your first campaign.",
  },
] as const;

export const SIGNUP_TRUST_BADGES: { icon: IconName; label: string }[] = [
  { icon: "shield", label: "Hard spend caps" },
  { icon: "eye", label: "100% explainable" },
  { icon: "globe", label: "GDPR · Rwanda DPL" },
];

export const SIGNIN_TESTIMONIAL = {
  quote:
    '"I uploaded my ceramics, set a RWF 50,000 daily cap, and walked away. Two weeks later — 340 orders."',
  name: "Marie Uwimana",
  company: "Inema Boutique",
  location: "Kigali",
  avatarInitials: "MU",
  avatarColor: "rgba(52,211,153,.15)",
  avatarTextColor: "var(--success)",
};

export const SIGNIN_PANEL_STATS = [
  { value: "15 min", label: "Optimisation cycle" },
  { value: "5", label: "Autonomous agents" },
  { value: "100%", label: "Decisions explained" },
] as const;

export const RECOVERY_CODES = [
  "HXKW-9F3P",
  "QRJN-7D2T",
  "LMVB-4A8S",
  "WNGT-6C1R",
  "PZFX-5E7Y",
  "DJMK-2H9U",
  "BTRL-8G4V",
  "YSCN-3K6W",
] as const;

export const TWOFA_TRUST_BADGES: { icon: IconName; label: string }[] = [
  { icon: "lock", label: "Encrypted at rest" },
  { icon: "shield", label: "SOC 2 ready" },
];
