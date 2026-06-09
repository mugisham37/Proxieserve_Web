"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast, type Toast, type ToastVariant } from "@/lib/toast-context";

// ─── Single toast ─────────────────────────────────────────────────────────────

const VARIANT_STYLES: Record<ToastVariant, { wrapper: string; icon: React.ElementType; iconClass: string }> = {
  default: {
    wrapper: "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]",
    icon: Info,
    iconClass: "text-[var(--paper)]",
  },
  success: {
    wrapper: "bg-[var(--paper)] text-[var(--ink)] border-[var(--rule-strong)]",
    icon: CheckCircle,
    iconClass: "text-[var(--ok)]",
  },
  error: {
    wrapper: "bg-[var(--danger-soft)] text-[var(--danger)] border-[var(--danger)]",
    icon: AlertCircle,
    iconClass: "text-[var(--danger)]",
  },
  warning: {
    wrapper: "bg-[var(--warn-soft)] text-[var(--warn)] border-[var(--warn)]",
    icon: AlertTriangle,
    iconClass: "text-[var(--warn)]",
  },
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const [paused, setPaused] = React.useState(false);
  const elapsed = React.useRef(0);
  const startRef = React.useRef<number>(Date.now());

  React.useEffect(() => {
    if (paused) return;
    const remaining = toast.duration - elapsed.current;
    const t = setTimeout(() => onDismiss(toast.id), remaining);
    startRef.current = Date.now();
    return () => {
      clearTimeout(t);
      elapsed.current += Date.now() - startRef.current;
    };
  }, [paused, toast.id, toast.duration, onDismiss]);

  const cfg = VARIANT_STYLES[toast.variant];
  const Icon = cfg.icon;
  const role = toast.variant === "error" ? "alert" : "status";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      role={role}
      aria-live={role === "alert" ? "assertive" : "polite"}
      aria-atomic="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        "flex items-center gap-[10px]",
        "min-w-[260px] max-w-[420px] w-max",
        "px-[14px] py-[11px]",
        "rounded-[var(--r-md)] border shadow-[var(--sh-raised)]",
        "font-sans text-[13px] font-medium",
        cfg.wrapper
      )}
    >
      <Icon size={15} className={cn("shrink-0", cfg.iconClass)} aria-hidden="true" />
      <span className="flex-1 leading-[1.4]">{toast.message}</span>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="shrink-0 opacity-60 hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current rounded-sm transition-opacity"
      >
        <X size={13} />
      </button>
    </motion.div>
  );
}

// ─── Toaster (stack) ──────────────────────────────────────────────────────────

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      aria-label="Notifications"
      className={cn(
        "fixed z-[100] flex flex-col gap-[8px]",
        "bottom-[20px] right-[20px]",
        "max-sm:right-1/2 max-sm:translate-x-1/2 max-sm:bottom-[20px] max-sm:items-center",
        "pointer-events-none"
      )}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
