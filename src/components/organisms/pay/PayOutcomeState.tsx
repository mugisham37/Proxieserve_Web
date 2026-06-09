"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  WifiOff,
  Loader2,
  ShieldX,
  Users,
  ReceiptText,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { PaymentResultHero } from "@/components/molecules/PaymentResultHero";
import { StaleFeeNotice } from "@/components/molecules/StaleFeeNotice";
import { DisputeForm } from "@/components/molecules/DisputeForm";
import { PayStatusTag } from "@/components/atoms/payment/PayStatusTag";
import { usePayment } from "@/lib/payment-context";
import type { PaymentOutcome } from "@/lib/types/payment";

interface StateConfig {
  variant: "ok" | "danger" | "warn" | "info" | "brand";
  icon: React.ReactNode;
  heading: string;
  body: string;
  tags: { label: string; variant: "ok" | "warn" | "danger" | "info" | "brand" | "muted" }[];
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryAction?: (ctx: ActionContext) => void;
  secondaryAction?: (ctx: ActionContext) => void;
}

interface ActionContext {
  router: ReturnType<typeof useRouter>;
  applicationId: string;
}

const STATE_CONFIGS: Record<PaymentOutcome, StateConfig> = {
  timeout: {
    variant: "warn",
    icon: <Clock size={36} strokeWidth={1.5} />,
    heading: "Prompt expired",
    body: "The push notification timed out after 2 minutes. No money left your account. You can resend the prompt or use a different payment method.",
    tags: [{ label: "No charge made", variant: "ok" }, { label: "Timeout", variant: "warn" }],
    primaryLabel: "Try mobile money again",
    secondaryLabel: "Choose another method",
    primaryAction: ({ router, applicationId }) => router.push(`/pay/${applicationId}/mobile-money`),
    secondaryAction: ({ router, applicationId }) => router.push(`/pay/${applicationId}/method-choice`),
  },
  declined: {
    variant: "danger",
    icon: <XCircle size={36} strokeWidth={1.5} />,
    heading: "Payment declined",
    body: "Your payment was declined. No money left your account. Please check your balance, then try again or use a different method.",
    tags: [{ label: "No charge made", variant: "ok" }, { label: "Declined", variant: "danger" }],
    primaryLabel: "Try again",
    secondaryLabel: "Choose another method",
    primaryAction: ({ router }) => router.back(),
    secondaryAction: ({ router, applicationId }) => router.push(`/pay/${applicationId}/method-choice`),
  },
  "awaiting-agent": {
    variant: "info",
    icon: <Users size={36} strokeWidth={1.5} />,
    heading: "Waiting for agent confirmation",
    body: "You've chosen to pay via your assigned agent. Your agent will confirm receipt within 24 hours. You'll be notified by SMS and WhatsApp.",
    tags: [{ label: "Off-platform", variant: "warn" }, { label: "Up to 24h", variant: "info" }],
    primaryLabel: "Track my application",
    secondaryLabel: "Contact support",
    primaryAction: ({ router, applicationId }) => router.push(`/app/${applicationId}`),
    secondaryAction: ({ router }) => router.push("/contact"),
  },
  "already-paid": {
    variant: "ok",
    icon: <CheckCircle2 size={36} strokeWidth={1.5} />,
    heading: "You're all paid up",
    body: "This application has already been paid. Nothing is due. If you believe this is an error, contact support.",
    tags: [{ label: "Paid", variant: "ok" }],
    primaryLabel: "View receipt",
    secondaryLabel: "Track application",
    primaryAction: ({ router, applicationId }) => router.push(`/pay/${applicationId}/receipt`),
    secondaryAction: ({ router, applicationId }) => router.push(`/app/${applicationId}`),
  },
  dispute: {
    variant: "brand",
    icon: <AlertTriangle size={36} strokeWidth={1.5} />,
    heading: "Something went wrong?",
    body: "If you were charged but your application wasn't updated, or you see an unexpected amount, submit a dispute below. Our team responds within 2 business hours.",
    tags: [{ label: "Dispute", variant: "brand" }],
  },
  "refund-issued": {
    variant: "ok",
    icon: <ReceiptText size={36} strokeWidth={1.5} />,
    heading: "Your refund is on its way",
    body: "We've processed a refund for this payment. Mobile Money refunds typically arrive within 2 hours. Card refunds take 5–10 business days depending on your bank.",
    tags: [{ label: "Refund issued", variant: "ok" }],
    primaryLabel: "Track application",
    primaryAction: ({ router, applicationId }) => router.push(`/app/${applicationId}`),
  },
  "connection-lost": {
    variant: "warn",
    icon: <WifiOff size={36} strokeWidth={1.5} />,
    heading: "Connection lost mid-payment",
    body: "Your connection dropped during the payment. Do not try to pay again until you check your payment status — you may already be charged. Contact support to reconcile.",
    tags: [{ label: "Don't pay again", variant: "danger" }, { label: "Check status", variant: "warn" }],
    primaryLabel: "Check payment status",
    secondaryLabel: "Contact support",
    primaryAction: ({ router, applicationId }) => router.push(`/app/${applicationId}`),
    secondaryAction: ({ router }) => router.push("/contact"),
  },
  "3ds-failed": {
    variant: "danger",
    icon: <ShieldX size={36} strokeWidth={1.5} />,
    heading: "Verification failed",
    body: "Your bank's 3D Secure verification didn't complete. No money left your account. You can try the card again, or use a different payment method.",
    tags: [{ label: "No charge made", variant: "ok" }, { label: "3DS failed", variant: "danger" }],
    primaryLabel: "Try card again",
    secondaryLabel: "Choose another method",
    primaryAction: ({ router, applicationId }) => router.push(`/pay/${applicationId}/card`),
    secondaryAction: ({ router, applicationId }) => router.push(`/pay/${applicationId}/method-choice`),
  },
  "fee-changed": {
    variant: "warn",
    icon: <TrendingUp size={36} strokeWidth={1.5} />,
    heading: "Fee has been updated",
    body: "The service fee changed since you opened this page. Please review the new amount before continuing.",
    tags: [{ label: "Fee changed", variant: "warn" }],
  },
  processing: {
    variant: "info",
    icon: <Loader2 size={36} strokeWidth={1.5} className="animate-spin" />,
    heading: "Processing your payment…",
    body: "Please wait — this usually takes a few seconds. Do not close this page or press back.",
    tags: [{ label: "Processing", variant: "info" }],
  },
  "pay-agent-confirm": {
    variant: "info",
    icon: <Users size={36} strokeWidth={1.5} />,
    heading: "Awaiting agent confirmation",
    body: "Your agent received your payment. Once they confirm receipt, your application will move to the next step. This can take up to 24 hours.",
    tags: [{ label: "Pending", variant: "info" }, { label: "Up to 24h", variant: "muted" }],
    primaryLabel: "Contact your agent",
    secondaryLabel: "Track application",
    primaryAction: ({ router }) => router.push("/dashboard"),
    secondaryAction: ({ router, applicationId }) => router.push(`/app/${applicationId}`),
  },
};

interface PayOutcomeStateProps {
  outcome: PaymentOutcome;
}

export function PayOutcomeState({ outcome }: PayOutcomeStateProps) {
  const router = useRouter();
  const { session } = usePayment();
  const { applicationId, serviceFee } = session;

  const config = STATE_CONFIGS[outcome];
  const ctx: ActionContext = { router, applicationId };

  return (
    <div className="w-full max-w-[640px] mx-auto px-4 sm:px-8 py-12 flex flex-col gap-10">
      {/* Tags */}
      {config.tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {config.tags.map((t) => (
            <PayStatusTag key={t.label} variant={t.variant}>
              {t.label}
            </PayStatusTag>
          ))}
        </motion.div>
      )}

      {/* Result hero */}
      <PaymentResultHero
        variant={config.variant}
        icon={config.icon}
        heading={config.heading.replace(/&apos;/g, "'")}
        body={config.body}
        primaryAction={
          config.primaryLabel && config.primaryAction
            ? { label: config.primaryLabel, onClick: () => config.primaryAction!(ctx) }
            : undefined
        }
        secondaryAction={
          config.secondaryLabel && config.secondaryAction
            ? { label: config.secondaryLabel, onClick: () => config.secondaryAction!(ctx) }
            : undefined
        }
      >
        {/* Slotted content for special states */}
        {outcome === "dispute" && (
          <div className="w-full bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-6 mt-4 text-left">
            <p className="eyebrow text-[var(--ink-subtle)] mb-4">Report a problem</p>
            <DisputeForm applicationId={applicationId} />
          </div>
        )}

        {outcome === "fee-changed" && (
          <StaleFeeNotice
            oldFee={Math.round(serviceFee * 0.87)}
            newFee={serviceFee}
            onReconfirm={() => router.push(`/pay/${applicationId}/method-choice`)}
            className="mt-4 text-left"
          />
        )}

        {outcome === "processing" && (
          <p className="font-mono text-[12px] text-[var(--ink-subtle)] mt-2" aria-live="assertive" aria-busy="true">
            Verifying with payment processor…
          </p>
        )}
      </PaymentResultHero>
    </div>
  );
}
