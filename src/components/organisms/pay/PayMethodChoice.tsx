"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PaymentMethodCard } from "@/components/molecules/payment/PaymentMethodCard";
import { DarkFeeSummary } from "@/components/molecules/payment/DarkFeeSummary";
import { TrustStrip } from "@/components/molecules/marketing/TrustStrip";
import { usePayment } from "@/lib/payment-context";
import type { PaymentMethod } from "@/lib/types/payment";
import { formatRWF } from "@/lib/types/payment";

const METHODS: {
  method: PaymentMethod;
  label: string;
  description: string;
  isOffPlatform?: boolean;
  slug: string;
}[] = [
  {
    method: "mtn-momo",
    label: "MTN Mobile Money",
    description: "Push notification to your registered MoMo number. Approve in the MoMo app or dial *182#.",
    slug: "mobile-money",
  },
  {
    method: "airtel-money",
    label: "Airtel Money",
    description: "Push notification to your Airtel Money number. Approve in the Airtel Money app.",
    slug: "mobile-money",
  },
  {
    method: "card",
    label: "Debit or credit card",
    description: "Visa and Mastercard accepted. Your card details are handled by our certified processor.",
    slug: "card",
  },
  {
    method: "agent",
    label: "Pay via agent",
    description: "Hand cash or transfer directly to your assigned ProxiServe agent. Slower — up to 24h to confirm.",
    isOffPlatform: true,
    offPlatformLabel: "Off-platform",
    slug: "awaiting-agent",
  } as { method: PaymentMethod; label: string; description: string; isOffPlatform?: boolean; offPlatformLabel?: string; slug: string },
];

export function PayMethodChoice() {
  const router = useRouter();
  const { session, dispatch } = usePayment();
  const [selected, setSelected] = React.useState<PaymentMethod>("mtn-momo");

  const { applicationId, serviceName, serviceFee, governmentFee, vatRate, platformFee } = session;

  function handleSelect(method: PaymentMethod, slug: string) {
    setSelected(method);
    dispatch({ type: "SET_METHOD", payload: method });
    if (slug === "awaiting-agent") {
      router.push(`/pay/${applicationId}/awaiting-agent`);
    } else {
      router.push(`/pay/${applicationId}/${slug}`);
    }
  }

  return (
    <div className="w-full max-w-[var(--w-app)] mx-auto px-4 sm:px-8 py-10">
      <div className="grid grid-cols-1 gap-10" style={{ gridTemplateColumns: "1fr" }}>
        {/* On 920px+ use two-column via inline style override */}
        <style>{`@media(min-width:920px){#pay-grid{grid-template-columns:1fr var(--pay-sidebar)!important}}`}</style>
        {/* Main column */}
        <div className="flex flex-col gap-8 min-w-0">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            className="flex flex-col gap-2"
          >
            <span className="eyebrow text-[var(--ink-subtle)]">Step 6 of 6 — Payment</span>
            <h1 className="font-serif text-[clamp(28px,4vw,40px)] font-medium italic text-[var(--ink)]">
              How would you like to <em>pay?</em>
            </h1>
            <p className="font-sans text-[15px] text-[var(--ink-muted)]">
              Your service fee of <strong className="font-medium text-[var(--ink)]">{formatRWF(serviceFee)}</strong> is confirmed. No extra platform fee.
            </p>
          </motion.div>

          {/* Method list */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3, ease: [0.2, 0, 0, 1] }}
          >
            <div
              role="radiogroup"
              aria-label="Choose payment method"
              className="flex flex-col gap-3"
            >
              {METHODS.map(({ method, label, description, isOffPlatform, slug, ...rest }) => (
                <PaymentMethodCard
                  key={method}
                  method={method}
                  label={label}
                  description={description}
                  isSelected={selected === method}
                  isOffPlatform={isOffPlatform}
                  offPlatformLabel={(rest as { offPlatformLabel?: string }).offPlatformLabel}
                  onClick={() => handleSelect(method, slug)}
                />
              ))}
            </div>
          </motion.div>

          <TrustStrip />

          {/* Inline fee summary for narrow screens (below 920px) */}
          <div className="block" style={{ display: "none" }} aria-hidden="true" id="pay-summary-inline-placeholder" />
          <DarkFeeSummary
            serviceName={serviceName}
            serviceFee={serviceFee}
            governmentFee={governmentFee}
            vatRate={vatRate}
            platformFee={platformFee}
            className="block lg:hidden"
          />
        </div>

        {/* Sticky sidebar — 920px+ only via Tailwind lg */}
        <aside className="hidden lg:block self-start sticky top-8" style={{ width: "var(--pay-sidebar)" }}>
          <DarkFeeSummary
            serviceName={serviceName}
            serviceFee={serviceFee}
            governmentFee={governmentFee}
            vatRate={vatRate}
            platformFee={platformFee}
          />
        </aside>
      </div>
    </div>
  );
}
