"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PhonePreviewProps {
  message: string;
  channel: string;
  className?: string;
}

const CHANNEL_NAMES: Record<string, string> = {
  whatsapp: "WhatsApp",
  sms: "SMS",
  email: "Email",
  "in-app": "In-app",
};

export function PhonePreview({ message, channel, className }: PhonePreviewProps) {
  const channelName = CHANNEL_NAMES[channel] ?? channel;
  const isEmpty = !message.trim();

  return (
    <div
      aria-label={`Message preview for ${channelName}`}
      className={cn("flex flex-col items-center", className)}
    >
      {/* Phone frame */}
      <div
        className={cn(
          "relative w-[200px] rounded-[28px] border-[6px]",
          "border-[var(--ink)] bg-[var(--cream-2)]",
          "shadow-[var(--sh-raised)] overflow-hidden"
        )}
      >
        {/* Status bar */}
        <div
          className="h-[20px] bg-[var(--ink)] flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-[40px] h-[8px] rounded-full bg-[var(--ink-2)]" />
        </div>

        {/* Channel header */}
        <div
          className={cn(
            "px-[12px] py-[8px]",
            channel === "whatsapp"
              ? "bg-[var(--ok)] text-white"
              : "bg-[var(--info)] text-white"
          )}
        >
          <p className="font-sans text-[11px] font-medium">ProxiServe</p>
          <p className="font-sans text-[9px] opacity-80">{channelName}</p>
        </div>

        {/* Message bubble */}
        <div className="p-[12px] min-h-[80px]">
          <AnimatePresence mode="wait">
            {isEmpty ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-sans text-[10px] text-[var(--ink-subtle)] italic"
              >
                Your message will appear here…
              </motion.p>
            ) : (
              <motion.div
                key="message"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.12 }}
                className={cn(
                  "rounded-[10px] rounded-tl-[2px]",
                  "px-[10px] py-[8px]",
                  channel === "whatsapp"
                    ? "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
                    : "bg-[var(--info-soft)]"
                )}
              >
                <p className="font-sans text-[10px] leading-[1.5] text-[var(--ink)]">
                  {message}
                </p>
                <p className="font-mono text-[8px] text-[var(--ink-subtle)] text-right mt-[4px]">
                  {new Date().toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom bar */}
        <div
          className="h-[16px] bg-[var(--cream)] flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-[32px] h-[4px] rounded-full bg-[var(--rule)]" />
        </div>
      </div>

      <p className="font-mono text-[10px] text-[var(--ink-muted)] mt-[8px]">
        {channelName} preview
      </p>
    </div>
  );
}
