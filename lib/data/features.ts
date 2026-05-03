import type { FeatureItem } from "@/types";

export const FEATURES: FeatureItem[] = [
  {
    icon: "zap",
    title: "5-Agent System",
    desc: "Planner, Creative, Optimiser, Sales Agent, and Handoff Agent work in parallel — each specialist, each accountable.",
    detail:
      "The Planner sets strategy and budget allocation. Creative generates and A/B-tests ad copy and images. Optimiser monitors ROAS every 15 minutes. Sales Agent handles every WhatsApp/Messenger conversation. Handoff coordinates order fulfilment.",
  },
  {
    icon: "messageCircle",
    title: "Conversational Sales Agent",
    desc: "Qualifies leads, answers objections, sends payment links, and confirms orders — 24/7, in the customer's language.",
    detail:
      "Powered by a fine-tuned model trained on thousands of successful e-commerce conversations across Africa. Handles price negotiations, size queries, and delivery questions without human escalation.",
  },
  {
    icon: "eye",
    title: "100% Explainable AI",
    desc: "Every automated decision comes with the model's reasoning. Budget shifts, creative swaps, audience changes — all logged.",
    detail:
      "The 'Why?' button is attached to every KPI on the dashboard. Tap it to see which signals triggered the action, what threshold was crossed, and what outcome the model predicted. Fully auditable.",
  },
  {
    icon: "shield",
    title: "Budget Control",
    desc: "Set daily and total caps. The system never exceeds them — it scales back gracefully rather than pause mid-flight.",
    detail:
      "Nested envelopes: global cap → per-platform cap → per-campaign cap. Any overage at a lower level triggers automatic rebalancing upstream. You can adjust caps at any time from the dashboard.",
  },
  {
    icon: "creditCard",
    title: "Africa-First Payments",
    desc: "MTN MoMo, Airtel Money, M-Pesa, Wave, and Stripe — customers pay the way they already pay.",
    detail:
      "Zero-decimal currencies (RWF, KES, NGN, XOF) handled natively. Payment confirmation via SMS when data is spotty. Reconciliation report available daily in your preferred currency.",
  },
  {
    icon: "refreshCw",
    title: "Real-time Optimisation",
    desc: "The Optimiser agent checks every campaign every 15 minutes and reallocates budget automatically.",
    detail:
      "Uses a multi-armed bandit algorithm with Thompson sampling. Winning audiences and creatives receive more budget; losers are paused after 3 consecutive underperforming cycles. Every reallocation is explained.",
  },
  {
    icon: "globe",
    title: "Multi-Channel, Multi-Language",
    desc: "Meta, Google, WhatsApp, Instagram, Messenger — one upload, every channel. Four languages built in.",
    detail:
      "English, French, Kinyarwanda, and Swahili. The Sales Agent detects the customer's language from the first message and replies in kind. Channel mix is automatically optimised per product category.",
  },
  {
    icon: "lock",
    title: "Compliance Built In",
    desc: "Rwanda DPL, South Africa POPIA, Nigeria NDPR, GDPR — data residency, consent, and proof-of-consent included.",
    detail:
      "Customer data defaults to AWS af-south-1 (Cape Town). Consent banners are region-aware. Proof-of-consent export is available for any audit. No extra compliance tooling required.",
  },
];
