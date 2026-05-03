import type { AfricaCardItem } from "@/types";

export const AFRICA_CARDS: AfricaCardItem[] = [
  {
    icon: "creditCard",
    title: "All the payment rails",
    desc: "MTN MoMo, Airtel Money, M-Pesa, Wave, and Stripe are supported out of the box. Zero-decimal currencies handled natively.",
    badges: ["MTN MoMo", "Airtel Money", "M-Pesa", "Wave", "Stripe"],
    isAccentRwanda: true,
  },
  {
    icon: "messageCircle",
    title: "WhatsApp-first commerce",
    desc: "Most African buyers prefer WhatsApp over web checkout. SolAI's Sales Agent lives where your customers already are.",
    badges: ["WhatsApp", "Messenger", "Instagram DM"],
  },
  {
    icon: "globe",
    title: "4 languages built in",
    desc: "The Sales Agent detects the customer's language and replies in kind — no configuration needed.",
    chips: ["English", "French", "Kinyarwanda", "Swahili"],
  },
  {
    icon: "smartphone",
    title: "Works on mid-tier Android",
    desc: "The dashboard is optimised for 4G and low-end devices. No app download required — runs in any browser.",
  },
  {
    icon: "shield",
    title: "Data stays in Africa",
    desc: "Customer data defaults to AWS af-south-1 (Cape Town). Rwanda DPL, POPIA, and NDPR compliance built in.",
    badges: ["af-south-1", "Rwanda DPL", "POPIA", "NDPR"],
  },
  {
    icon: "refreshCw",
    title: "Multi-currency reporting",
    desc: "View all spend and revenue in US$, EUR, RWF, KES, NGN, ZAR, or XOF — switch at any time, real exchange rates.",
    badges: ["US$", "EUR", "RWF", "KES", "NGN", "ZAR"],
  },
];

export const AFRICA_STATS = [
  { value: "Kigali", label: "HQ & primary market" },
  { value: "4", label: "languages supported" },
  { value: "5+", label: "payment rails" },
  { value: "af-south-1", label: "data residency" },
];
