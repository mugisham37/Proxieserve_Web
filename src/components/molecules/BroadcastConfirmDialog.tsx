"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/atoms/shared/AppButton";
import type { BroadcastConfirmState } from "@/lib/types/admin";

interface BroadcastConfirmDialogProps {
  state: BroadcastConfirmState;
  onSend: () => void;
  onCancel: () => void;
}

export function BroadcastConfirmDialog({
  state,
  onSend,
  onCancel,
}: BroadcastConfirmDialogProps) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  const CHANNEL_NAMES: Record<string, string> = {
    whatsapp: "WhatsApp",
    sms: "SMS",
    email: "Email",
    "in-app": "In-app",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="broadcast-confirm-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-[16px]"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="absolute inset-0 bg-[var(--ink)]/50 backdrop-blur-[2px]"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.15, ease: [0, 0, 0, 1] }}
        className={cn(
          "relative z-10 w-full max-w-[420px]",
          "bg-[var(--paper)] rounded-[var(--r-xl)]",
          "border border-[var(--rule)] shadow-[var(--sh-overlay)]",
          "p-[28px] flex flex-col gap-[20px]"
        )}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close dialog"
          className={cn(
            "absolute top-[16px] right-[16px]",
            "w-[28px] h-[28px] rounded-[var(--r-md)]",
            "flex items-center justify-center",
            "text-[var(--ink-muted)] hover:bg-[var(--cream)] hover:text-[var(--ink)]",
            "transition-colors duration-[var(--m-fast)]",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
          )}
        >
          <X size={14} />
        </button>

        {/* Header */}
        <div className="flex items-start gap-[12px]">
          <div
            aria-hidden="true"
            className="w-[36px] h-[36px] rounded-[var(--r-md)] bg-[var(--brand-soft)] flex items-center justify-center shrink-0"
          >
            <Send size={16} className="text-[var(--brand)]" />
          </div>
          <div>
            <h2
              id="broadcast-confirm-title"
              className="font-serif text-[18px] text-[var(--ink)]"
            >
              Confirm broadcast
            </h2>
            <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-[2px]">
              Review details before sending
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-[10px]">
          {[
            { label: "Recipients", value: state.reach.toLocaleString() },
            { label: "Est. cost", value: state.estimatedCost },
            { label: "Opt-outs", value: state.optOuts.toLocaleString() },
          ].map((stat) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col gap-[3px] px-[12px] py-[10px]",
                "rounded-[var(--r-md)] border border-[var(--rule)] bg-[var(--cream)]"
              )}
            >
              <span className="font-mono text-[9px] tracking-[0.08em] uppercase text-[var(--ink-muted)]">
                {stat.label}
              </span>
              <span className="font-serif text-[20px] leading-none text-[var(--ink)]">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Channels */}
        <div className="flex flex-col gap-[4px]">
          <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-muted)]">
            Sending via
          </span>
          <div className="flex flex-wrap gap-[6px]">
            {state.channels.map((ch) => (
              <span
                key={ch}
                className="px-[8px] py-[3px] rounded-[var(--r-sm)] bg-[var(--paper-2)] font-mono text-[11px] text-[var(--ink-muted)]"
              >
                {CHANNEL_NAMES[ch] ?? ch}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-[10px] pt-[4px]">
          <AppButton variant="ghost" size="md" onClick={onCancel}>
            Cancel
          </AppButton>
          <AppButton variant="brand" size="md" onClick={onSend}>
            <Send size={13} aria-hidden="true" />
            Send broadcast
          </AppButton>
        </div>
      </motion.div>
    </div>
  );
}
