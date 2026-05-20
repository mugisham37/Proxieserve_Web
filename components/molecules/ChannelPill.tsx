"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ChannelStatus = "pending" | "delivering" | "delivered" | "failed";

interface ChannelPillProps {
  channel: "sms" | "whatsapp" | "email";
  status: ChannelStatus;
  value?: string; // phone number or email
  className?: string;
}

const CHANNEL_LABELS: Record<string, string> = {
  sms: "SMS",
  whatsapp: "WhatsApp",
  email: "Email",
};

const STATUS_LABELS: Record<ChannelStatus, string> = {
  pending: "Queued",
  delivering: "Delivering…",
  delivered: "Delivered",
  failed: "Failed",
};

export function ChannelPill({ channel, status, value, className }: ChannelPillProps) {
  const isDelivered = status === "delivered";
  const isFailed = status === "failed";
  const isPending = status === "pending" || status === "delivering";

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-3.5 py-2 rounded-[var(--r-pill)] border",
        isDelivered && "bg-[var(--ok-soft)] border-[var(--ok)]",
        isFailed && "bg-[var(--danger-soft)] border-[var(--danger)]",
        isPending && "bg-[var(--paper)] border-[var(--rule-strong)]",
        className
      )}
    >
      {/* Status dot / icon */}
      <AnimatePresence mode="wait" initial={false}>
        {isDelivered && (
          <motion.span
            key="check"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center w-4 h-4 rounded-full bg-[var(--ok)]"
            aria-hidden="true"
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1.5 4l1.5 1.5 3.5-3.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        )}
        {isFailed && (
          <motion.span
            key="x"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="w-2 h-2 rounded-full bg-[var(--danger)]"
            aria-hidden="true"
          />
        )}
        {isPending && (
          <motion.span
            key="pulse"
            className="w-2 h-2 rounded-full bg-[var(--ink-subtle)]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col min-w-0">
        <span className="font-sans text-[12px] font-medium text-[var(--ink)]">
          {CHANNEL_LABELS[channel]}
          {value && (
            <span className="font-normal text-[var(--ink-muted)] ml-1">· {value}</span>
          )}
        </span>
        <span
          className={cn(
            "font-sans text-[11px]",
            isDelivered && "text-[var(--ok)]",
            isFailed && "text-[var(--danger)]",
            isPending && "text-[var(--ink-subtle)]"
          )}
        >
          {STATUS_LABELS[status]}
        </span>
      </div>
    </div>
  );
}
