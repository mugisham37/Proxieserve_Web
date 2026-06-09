"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/atoms/AppButton";
import type { PermissionDialogState } from "@/lib/types/admin";

interface PermissionBoundaryDialogProps {
  dialog: PermissionDialogState;
  onConfirm: (reason: string, notifyAgent: boolean) => void;
  onCancel: () => void;
}

export function PermissionBoundaryDialog({
  dialog,
  onConfirm,
  onCancel,
}: PermissionBoundaryDialogProps) {
  const [reason, setReason] = React.useState("");
  const [notifyAgent, setNotifyAgent] = React.useState(true);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Trap Escape key
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  const canConfirm = reason.trim().length >= 10;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="perm-dialog-title"
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
          "relative z-10 w-full max-w-[440px]",
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
            className="w-[36px] h-[36px] rounded-[var(--r-md)] bg-[var(--warn-soft)] flex items-center justify-center shrink-0"
          >
            <ShieldAlert size={18} className="text-[var(--warn)]" />
          </div>
          <div>
            <h2
              id="perm-dialog-title"
              className="font-serif text-[18px] text-[var(--ink)]"
            >
              Intervene on {dialog.caseCode}
            </h2>
            <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-[2px]">
              You are taking over a case assigned to{" "}
              <strong className="font-medium text-[var(--ink)]">
                {dialog.agentName}
              </strong>
              . This action is logged.
            </p>
          </div>
        </div>

        {/* Reason field */}
        <div className="flex flex-col gap-[6px]">
          <label
            htmlFor="perm-reason"
            className="font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--ink-muted)]"
          >
            Reason for intervention{" "}
            <span className="text-[var(--danger)]" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            ref={textareaRef}
            id="perm-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder="Describe why you are intervening (min 10 characters)…"
            aria-required="true"
            aria-describedby="perm-reason-hint"
            className={cn(
              "w-full resize-none px-[12px] py-[10px]",
              "bg-[var(--cream)] border border-[var(--rule)]",
              "rounded-[var(--r-md)] font-sans text-[13px] text-[var(--ink)]",
              "placeholder:text-[var(--ink-subtle)]",
              "focus:outline-none focus:border-[var(--ink)]",
              "transition-colors duration-[var(--m-fast)]"
            )}
          />
          <p
            id="perm-reason-hint"
            className="font-sans text-[11px] text-[var(--ink-subtle)]"
          >
            {reason.trim().length}/10 characters minimum
          </p>
        </div>

        {/* Notify toggle */}
        <label className="flex items-center gap-[10px] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={notifyAgent}
            onChange={(e) => setNotifyAgent(e.target.checked)}
            className="w-[16px] h-[16px] accent-[var(--brand)] rounded"
          />
          <span className="font-sans text-[13px] text-[var(--ink)]">
            Notify {dialog.agentName} via in-app message
          </span>
        </label>

        {/* Actions */}
        <div className="flex items-center justify-end gap-[10px] pt-[4px]">
          <AppButton variant="ghost" size="md" onClick={onCancel}>
            Cancel
          </AppButton>
          <AppButton
            variant="solid"
            size="md"
            disabled={!canConfirm}
            onClick={() => onConfirm(reason.trim(), notifyAgent)}
          >
            Confirm intervention
          </AppButton>
        </div>
      </motion.div>
    </div>
  );
}
