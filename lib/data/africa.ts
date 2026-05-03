import type { AfricaCardItem } from "@/types";

export const AFRICA_CARDS: AfricaCardItem[] = [
  {
    icon: "creditCard",
    title: "Payment rails that work here",
    desc: "MTN MoMo, Airtel Money, Flutterwave, Paystack — alongside Stripe for international cards. Your rural customer in Musanze pays the same way your diaspora customer in London does.",
    badges: ["MTN MoMo", "Airtel Money", "Flutterwave", "Paystack", "Stripe"],
    isAccentRwanda: true,
  },
  {
    icon: "messageCircle",
    title: "WhatsApp-first commerce",
    desc: "In East and West Africa, WhatsApp is the store. SolAI's Sales Agent qualifies, negotiates, and closes in WhatsApp — generating MoMo or Airtel payment links right in the chat.",
    badges: ["WhatsApp", "Messenger", "Instagram DM"],
  },
  {
    icon: "globe",
    title: "Four languages at launch",
    desc: "English, French, Kinyarwanda, and Swahili. The Sales Agent converses in the customer's language. The dashboard adapts to the seller's preference.",
    chips: ["English", "Français", "Ikinyarwanda", "Kiswahili"],
  },
  {
    icon: "smartphone",
    title: "Built for mid-tier Android",
    desc: "Every screen works at 375px on slow 3G. Skeleton loading, optimistic UI, minimal JS. Your seller in Nairobi gets the same experience as one in New York.",
  },
  {
    icon: "shield",
    title: "Data stays in Africa",
    desc: "AWS af-south-1 (Cape Town). Compliant with Rwanda's Data Protection Law, POPIA, and GDPR. 72-hour breach notification. NCSA registered.",
    badges: ["af-south-1", "Rwanda DPL", "POPIA", "GDPR"],
  },
  {
    icon: "users",
    title: "Sellers across the continent",
    desc: "From Kigali to Lagos, Cape Town to Dakar — SolAI supports RWF, KES, NGN, ZAR, XOF, and EUR with zero-decimal handling done right.",
    badges: ["RWF", "KES", "NGN", "ZAR", "XOF", "EUR"],
  },
];

export const AFRICA_STATS = [
  { value: "🇷🇼", label: "Headquartered in Kigali" },
  { value: "4", label: "Languages at launch" },
  { value: "5+", label: "Payment rails" },
  { value: "af-south-1", label: "Data residency" },
];
