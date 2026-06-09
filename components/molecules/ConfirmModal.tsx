"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
  title: string;
  body: string;
  withNote?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: "danger" | "brand" | "default";
  onConfirm: (note?: string) => void;
  onCancel: () => void;
}

export function ConfirmModal({
  title,
  body,
  withNote = false,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "default",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const prefersReduced = useReducedMotion();
  const [note, setNote] = React.useState("");
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  // Focus cancel button on mount
  React.useEffect(() => {
    cancelRef.current?.focus();
  }, []);

  // Trap focus & handle Escape
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    },
    [onCancel]
  );

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-[20px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--ink)]/45"
        aria-hidden="true"
        onClick={onCancel}
      />

      {/* Card */}
      <motion.div
        initial={prefersReduced ? {} : { scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
        className={cn(
          "relative z-10 w-full max-w-[460px]",
          "bg-[var(--paper)] rounded-[var(--r-lg)]",
          "border border-[var(--rule)] shadow-[var(--sh-overlay)]",
          "p-[28px]"
        )}
      >
        <h2
          id="confirm-modal-title"
          className="font-serif text-[20px] font-normal text-[var(--ink)] mb-[10px]"
          dangerouslySetInnerHTML={{
            __html: title.replace(/\*(.*?)\*/g, "<em class='italic font-normal'>$1</em>"),
          }}
        />
        <p className="font-sans text-[13.5px] text-[var(--ink-muted)] leading-[1.5] mb-[20px]">
          {body}
        </p>

        {withNote && (
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Handover note (recommended)…"
            aria-label="Handover note"
            rows={3}
            className={cn(
              "w-full px-[12px] py-[10px] mb-[20px]",
              "bg-[var(--cream)] border border-[var(--rule)]",
              "rounded-[var(--r-md)] font-sans text-[13px] text-[var(--ink)]",
              "placeholder:text-[var(--ink-subtle)]",
              "resize-none",
              "focus:outline-none focus:border-[var(--ink)]",
              "transition-colors duration-[var(--m-fast)]"
            )}
          />
        )}

        <div className="flex gap-[8px] justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className={cn(
              "px-[16px] h-[36px] rounded-[var(--r-pill)]",
              "border border-[var(--rule)]",
              "font-sans text-[13px] text-[var(--ink-muted)]",
              "transition-colors duration-[var(--m-fast)]",
              "hover:bg-[var(--cream)] hover:text-[var(--ink)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
            )}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => onConfirm(note || undefined)}
            className={cn(
              "px-[16px] h-[36px] rounded-[var(--r-pill)]",
              "font-sans text-[13px] font-medium",
              "transition-colors duration-[var(--m-fast)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
              confirmVariant === "danger"
                ? "bg-[var(--danger)] text-white hover:opacity-90"
                : confirmVariant === "brand"
                ? "bg-[var(--brand)] text-white hover:opacity-90"
                : "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-2)]"
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
