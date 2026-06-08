"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Info,
  RefreshCw,
} from "lucide-react";
import { PillButton } from "@/components/atoms/PillButton";
import { cn } from "@/lib/utils";

type ResultVariant = "ok" | "danger" | "warn" | "info" | "brand";

interface ResultAction {
  label: string;
  onClick: () => void;
  variant?: "solid" | "default" | "ghost";
}

interface PaymentResultHeroProps {
  variant: ResultVariant;
  icon?: React.ReactNode;
  heading: string;
  body: string;
  primaryAction?: ResultAction;
  secondaryAction?: ResultAction;
  children?: React.ReactNode;
  className?: string;
}

const defaultIcons: Record<ResultVariant, React.ReactNode> = {
  ok: <CheckCircle size={36} strokeWidth={1.5} />,
  danger: <XCircle size={36} strokeWidth={1.5} />,
  warn: <Clock size={36} strokeWidth={1.5} />,
  info: <Info size={36} strokeWidth={1.5} />,
  brand: <AlertTriangle size={36} strokeWidth={1.5} />,
};

const iconColors: Record<ResultVariant, string> = {
  ok: "var(--ok)",
  danger: "var(--danger)",
  warn: "var(--warn)",
  info: "var(--info)",
  brand: "var(--brand-ink)",
};

const bgColors: Record<ResultVariant, string> = {
  ok: "var(--ok-soft)",
  danger: "var(--danger-soft)",
  warn: "var(--warn-soft)",
  info: "var(--info-soft)",
  brand: "var(--brand-soft)",
};

export function PaymentResultHero({
  variant,
  icon,
  heading,
  body,
  primaryAction,
  secondaryAction,
  children,
  className,
}: PaymentResultHeroProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-6 text-center w-full max-w-[480px] mx-auto py-8",
        className
      )}
    >
      {/* Icon circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
        className="flex items-center justify-center w-[72px] h-[72px] rounded-full flex-shrink-0"
        style={{ background: bgColors[variant], color: iconColors[variant] }}
        aria-hidden="true"
      >
        {icon ?? defaultIcons[variant]}
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3, ease: [0.2, 0, 0, 1] }}
        className="flex flex-col gap-2"
      >
        <h1 className="font-serif text-[clamp(24px,4vw,36px)] font-medium italic text-[var(--ink)]">
          {heading}
        </h1>
        <p className="font-sans text-[14.5px] text-[var(--ink-muted)] leading-relaxed max-w-[360px]">
          {body}
        </p>
      </motion.div>

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3, ease: [0.2, 0, 0, 1] }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {primaryAction && (
            <PillButton variant="solid" size="md" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </PillButton>
          )}
          {secondaryAction && (
            <PillButton variant="default" size="md" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </PillButton>
          )}
        </motion.div>
      )}

      {/* Optional slotted content (e.g. dispute form, stale fee notice) */}
      {children && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="w-full"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
