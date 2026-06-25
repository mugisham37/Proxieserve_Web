"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { UiService } from "@/lib/service-ui-types";
import { useApplication } from "@/lib/application-context";
import { useAuth } from "@/lib/auth-context";
import { BigCodeChip } from "@/components/molecules/tracker/BigCodeChip";
import { ChannelPill } from "@/components/molecules/shared/ChannelPill";
import { WhatNextItem } from "@/components/molecules/marketing/WhatNextItem";
import { ConfirmPrefCard } from "@/components/molecules/shared/ConfirmPrefCard";

interface WizStep5ConfirmationProps {
  service: UiService;
}

export function WizStep5Confirmation({ service }: WizStep5ConfirmationProps) {
  const { uiState, draft, dispatch } = useApplication();
  const { session } = useAuth();
  const [waStatus, setWaStatus] = React.useState<"pending" | "delivering" | "delivered">("pending");
  const code = uiState.confirmedCode;

  React.useEffect(() => {
    if (!code) return;
    const t1 = setTimeout(() => setWaStatus("delivering"), 800);
    const t2 = setTimeout(() => setWaStatus("delivered"), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [code]);

  if (!code) {
    return (
      <div className="container py-16 text-center">
        <p className="font-sans text-[14px] text-[var(--ink-muted)]">No confirmation code available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-12 py-8 max-w-[640px] mx-auto text-center">
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative flex items-center justify-center w-20 h-20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, duration: 0.3, ease: [0.2, 0, 0, 1] }}
            className="absolute inset-0 rounded-full bg-[var(--ok-soft)]"
          />
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className="relative z-10"
            aria-hidden="true"
          >
            <motion.path
              d="M8 20l8 8 16-16"
              stroke="var(--ok)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
            />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-[clamp(28px,5vw,48px)] font-medium italic text-[var(--ink)]">
            You&apos;re <em>all set.</em>
          </h1>
          <p className="font-sans text-[15px] text-[var(--ink-muted)] max-w-[440px]">
            Your {service.name} application has been received. Your agent will be in touch within 2 business hours.
          </p>
        </div>
      </motion.div>

      {/* Tracking code */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3, ease: [0.2, 0, 0, 1] }}
        className="w-full"
      >
        <BigCodeChip code={code} />
      </motion.div>

      {/* Channel status */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.3, ease: [0.2, 0, 0, 1] }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        <ChannelPill
          channel="sms"
          status="delivered"
          value={draft.personal.phone ? `+250 ${draft.personal.phone}` : undefined}
        />
        {draft.personal.whatsapp && (
          <ChannelPill
            channel="whatsapp"
            status={waStatus}
            value={draft.personal.phone ? `+250 ${draft.personal.phone}` : undefined}
          />
        )}
        {draft.personal.email && (
          <ChannelPill
            channel="email"
            status="delivered"
            value={draft.personal.email}
          />
        )}
      </motion.div>

      {/* What happens next */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.3, ease: [0.2, 0, 0, 1] }}
        className="w-full bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-6 text-left"
      >
        <span className="eyebrow text-[var(--ink-subtle)] block mb-5">What happens next</span>
        <div className="flex flex-col gap-5">
          <WhatNextItem
            num={1}
            title="Agent review"
            body="Your assigned agent reviews your application and contacts you within 2 business hours to confirm details."
          />
          <WhatNextItem
            num={2}
            title="Track your application"
            body={`Use code ${code} at any time on the Hebuza website to check your application status.`}
          />
          {service.fee > 0 ? (
            <WhatNextItem
              num={3}
              title="Pay your service fee"
              body={`Your service fee is ready to pay now. Click "Proceed to payment" below to complete it securely online.`}
            />
          ) : (
            <WhatNextItem
              num={3}
              title="No payment needed"
              body="This service has no platform fee. Your agent will guide you on any government office payments required."
            />
          )}
        </div>
      </motion.div>

      {/* CTA row */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.3, ease: [0.2, 0, 0, 1] }}
        className="flex flex-col items-center gap-3 w-full"
      >
        {/* Payment CTA — shown when service has a fee */}
        {service.fee > 0 && (
          <Link
            href={`/pay/${code}/method-choice`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[var(--r-pill)] bg-[var(--ink)] text-[var(--paper)] font-serif italic text-[16px] hover:opacity-90 transition-opacity"
          >
            Proceed to payment →
          </Link>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {session ? (
            <Link
              href={`/app/${code}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--r-pill)] border border-[var(--rule-strong)] font-serif italic text-[15px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
            >
              View in your dashboard →
            </Link>
          ) : (
            <Link
              href={`/?track=${code}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--r-pill)] border border-[var(--rule-strong)] font-serif italic text-[15px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
            >
              {service.fee > 0 ? "Pay later — track application" : "Track my application →"}
            </Link>
          )}
          {!service.fee && !session && (
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--r-pill)] border border-[var(--rule-strong)] font-serif italic text-[15px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
            >
              Browse services
            </Link>
          )}
        </div>
      </motion.div>

      {/* Notification preference */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.3 }}
        className="w-full"
      >
        <ConfirmPrefCard
          whatsappEnabled={draft.personal.whatsapp}
          phone={draft.personal.phone ? `+250 ${draft.personal.phone}` : undefined}
          onToggle={(v) =>
            dispatch({ type: "PATCH_PERSONAL", payload: { whatsapp: v } })
          }
        />
      </motion.div>
    </div>
  );
}
