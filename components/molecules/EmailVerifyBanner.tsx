"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailVerifyBannerProps {
  email?: string;
  onResend?: () => void;
  onChangeEmail?: () => void;
  visible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function EmailVerifyBanner({
  email = "your email",
  onResend,
  onChangeEmail,
  visible = true,
  onDismiss,
  className,
}: EmailVerifyBannerProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          role="status"
          className={cn(
            "w-full bg-[var(--brand-soft)] border-b border-[var(--brand)] border-opacity-30",
            className
          )}
        >
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-2.5 flex items-center gap-3 flex-wrap">
            <p className="font-sans text-[13px] text-[var(--brand-ink)] flex-1 min-w-0">
              Please verify your email — we sent a link to{" "}
              <strong className="font-semibold">{email}</strong>
            </p>
            <div className="flex items-center gap-3 shrink-0">
              {onResend && (
                <button
                  type="button"
                  onClick={onResend}
                  className="font-sans text-[13px] font-medium text-[var(--brand-ink)] underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  Resend
                </button>
              )}
              {onChangeEmail && (
                <button
                  type="button"
                  onClick={onChangeEmail}
                  className="font-sans text-[13px] text-[var(--brand-ink)] hover:opacity-80 transition-opacity"
                >
                  Change email
                </button>
              )}
              {onDismiss && (
                <button
                  type="button"
                  onClick={onDismiss}
                  aria-label="Dismiss"
                  className="text-[var(--brand-ink)] hover:opacity-70 transition-opacity"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
