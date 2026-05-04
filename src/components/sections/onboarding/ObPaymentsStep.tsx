"use client";

import { ObRailCard } from "@/src/components/molecules/ObRailCard";
import { ObInfoBanner } from "@/src/components/molecules/ObInfoBanner";
import type { RailKey } from "@/src/types";

interface RailConfig {
  key: RailKey;
  label: string;
  desc: string;
  tag: string;
  detail?: string;
}

const RAILS: RailConfig[] = [
  {
    key: "stripe",
    label: "Stripe",
    desc: "Cards, Apple Pay, Google Pay. International customers.",
    tag: "International",
    detail: "Connected · Inema Boutique · acct_1N…7xQ",
  },
  {
    key: "momo",
    label: "MTN Mobile Money",
    desc: "MoMo payments for Rwanda, Uganda, Ghana, Cameroon.",
    tag: "East & West Africa",
    detail: "Connected · Merchant ID: MM-2847",
  },
  {
    key: "airtel",
    label: "Airtel Money",
    desc: "Airtel Money for Kenya, Uganda, Tanzania, Malawi.",
    tag: "East Africa",
  },
  {
    key: "flutterwave",
    label: "Flutterwave",
    desc: "Cards + bank transfer + USSD. Nigeria, Ghana, South Africa.",
    tag: "Pan-Africa",
  },
];

interface ObPaymentsStepProps {
  rails: Record<RailKey, boolean>;
  onToggle: (key: RailKey) => void;
}

export function ObPaymentsStep({ rails, onToggle }: ObPaymentsStepProps) {
  return (
    <div>
      <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] mb-2">
        Set up payment rails
      </h1>
      <p className="text-[15px] text-[var(--text-muted)] mb-7">
        Choose how your customers will pay. You can enable multiple rails — SolAI&apos;s Sales Agent
        will offer the best option based on the buyer&apos;s location.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {RAILS.map((rail) => (
          <ObRailCard
            key={rail.key}
            label={rail.label}
            desc={rail.desc}
            tag={rail.tag}
            active={rails[rail.key]}
            detail={rail.detail}
            onToggle={() => onToggle(rail.key)}
          />
        ))}
      </div>

      <ObInfoBanner>
        MoMo and Airtel settlements take ~24 hours. SolAI shows settlement status in the Orders view.
      </ObInfoBanner>
    </div>
  );
}
