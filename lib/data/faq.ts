import type { FAQItem } from "@/types";

export const FAQ_ITEMS: FAQItem[] = [
  {
    q: "Do I need a Meta or Google ads account?",
    a: "Yes — SolAI runs campaigns inside your own ad accounts so you always own the data and spend. Setup takes less than 5 minutes: connect once via OAuth and SolAI manages everything from there.",
  },
  {
    q: "How does SolAI explain its decisions?",
    a: "Every automated action — a budget shift, a creative swap, a paused campaign — is logged in real time with the model's reasoning: which signals it saw, what threshold triggered the action, and what outcome it predicted. You can audit any decision in the timeline.",
  },
  {
    q: "Which payment methods does SolAI support for closing sales?",
    a: "Stripe (cards) in all supported countries, plus MTN Mobile Money, Airtel Money, M-Pesa, and Wave across Rwanda, Uganda, Kenya, Nigeria, and Senegal. Zero-decimal currencies (RWF, KES, NGN) are handled natively.",
  },
  {
    q: "Can I set a hard spend cap so it never overspends?",
    a: "Yes — you set a daily cap and a total cap. The Planner Agent respects both and will never exceed them. If the cap is approached, it automatically scales back bids rather than pause campaigns mid-flight.",
  },
  {
    q: "Is my customer data stored in Africa?",
    a: "Conversation transcripts and order data are stored in AWS af-south-1 (Cape Town) by default. You can select a different region in Settings. SolAI is compliant with Rwanda's Data Protection Law, South Africa's POPIA, and Nigeria's NDPR.",
  },
  {
    q: "What languages does the sales agent speak?",
    a: "English, French, Kinyarwanda, and Swahili out of the box. The agent detects the customer's language from the first message and replies in kind. Additional languages can be requested — get in touch.",
  },
];
