"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type AuthBannerVariant = "danger" | "warn" | "info" | "ok";

interface AuthBannerAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface AuthBannerProps {
  variant: AuthBannerVariant;
  message: string;
  action?: AuthBannerAction;
  visible?: boolean;
  className?: string;
}

const STYLES: Record<AuthBannerVariant, { bg: string; border: string; text: string; link: string }> = {
  danger: {
    bg: "bg-[var(--danger-soft)]",
    border: "border-l-[3px] border-[var(--danger)]",
    text: "text-[var(--danger)]",
    link: "text-[var(--danger)] underline hover:opacity-80",
  },
  warn: {
    bg: "bg-[var(--warn-soft)]",
    border: "border-l-[3px] border-[var(--warn)]",
    text: "text-[var(--warn)]",
    link: "text-[var(--warn)] underline hover:opacity-80",
  },
  info: {
    bg: "bg-[var(--info-soft)]",
    border: "border-l-[3px] border-[var(--info)]",
    text: "text-[var(--info)]",
    link: "text-[var(--info)] underline hover:opacity-80",
  },
  ok: {
    bg: "bg-[var(--ok-soft)]",
    border: "border-l-[3px] border-[var(--ok)]",
    text: "text-[var(--ok)]",
    link: "text-[var(--ok)] underline hover:opacity-80",
  },
};

export function AuthBanner({
  variant,
  message,
  action,
  visible = true,
  className,
}: AuthBannerProps) {
  const s = STYLES[variant];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          role={variant === "danger" || variant === "warn" ? "alert" : "status"}
          className={cn(
            "rounded-[var(--r-md)] px-4 py-3",
            s.bg,
            s.border,
            className
          )}
        >
          <p className={cn("font-sans text-[13px] leading-snug", s.text)}>
            {message}
            {action && (
              <>
                {" "}
                {action.href ? (
                  <a href={action.href} className={s.link}>
                    {action.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={action.onClick}
                    className={cn(s.link, "cursor-pointer")}
                  >
                    {action.label}
                  </button>
                )}
              </>
            )}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
