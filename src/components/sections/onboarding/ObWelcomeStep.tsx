import { MkIcon } from "@/src/components/atoms/MkIcon";
import { ObWelcomeCard } from "@/src/components/molecules/ObWelcomeCard";

const WELCOME_CARDS = [
  {
    icon: "link2" as const,
    title: "Connect your store & ad accounts",
    desc: "OAuth into Shopify or WooCommerce, then link Meta and Google Ads.",
  },
  {
    icon: "creditCard" as const,
    title: "Set up payment rails",
    desc: "Connect Stripe and/or Mobile Money so customers can pay.",
  },
  {
    icon: "target" as const,
    title: "Describe your product & audience",
    desc: "Tell SolAI what you sell, who buys it, and your daily budget.",
  },
  {
    icon: "rocket" as const,
    title: "Review & launch",
    desc: "Confirm everything, agree to spend caps, and let SolAI build your first campaign.",
  },
];

const TRUST_ITEMS = [
  { icon: "shield" as const, text: "Hard spend caps — SolAI can never exceed your limit" },
  { icon: "zap" as const, text: 'Every decision explained with a "Why?" button' },
  { icon: "globe" as const, text: "Data stored in AWS af-south-1 (Cape Town)" },
];

export function ObWelcomeStep() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-[80px] h-[80px] rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center mb-5">
        <MkIcon name="rocket" size={40} />
      </div>

      <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] mb-2">
        Welcome to SolAI
      </h1>
      <p className="text-[15px] text-[var(--text-muted)] mb-8 max-w-[480px]">
        You&apos;re about 5 minutes away from your first autonomous campaign. Here&apos;s what we&apos;ll set up:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-7 text-left">
        {WELCOME_CARDS.map((card) => (
          <ObWelcomeCard key={card.title} icon={card.icon} title={card.title} desc={card.desc} />
        ))}
      </div>

      <div className="w-full flex flex-col gap-2 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[14px] text-left">
        {TRUST_ITEMS.map((item) => (
          <div key={item.text} className="flex items-center gap-2 text-[13px] text-[var(--text-muted)]">
            <span className="text-[var(--brand)] flex-shrink-0">
              <MkIcon name={item.icon} size={16} />
            </span>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
