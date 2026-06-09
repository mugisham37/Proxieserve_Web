"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/atoms/shared/AppButton";

interface DestructiveConfirmDialogProps {
  entityName: string;
  entityType: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DestructiveConfirmDialog({
  entityName,
  entityType,
  description,
  onConfirm,
  onCancel,
}: DestructiveConfirmDialogProps) {
  const [typed, setTyped] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  const canDelete = typed === entityName;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="destructive-dialog-title"
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
            className="w-[36px] h-[36px] rounded-[var(--r-md)] bg-[var(--danger-soft)] flex items-center justify-center shrink-0"
          >
            <Trash2 size={18} className="text-[var(--danger)]" />
          </div>
          <div>
            <h2
              id="destructive-dialog-title"
              className="font-serif text-[18px] text-[var(--ink)]"
            >
              Delete {entityType}
            </h2>
            <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-[2px]">
              {description ??
                `This action cannot be undone. ${entityType} data will be permanently removed.`}
            </p>
          </div>
        </div>

        {/* Danger box */}
        <div
          className={cn(
            "rounded-[var(--r-md)] border border-[var(--danger-soft)]",
            "bg-[var(--danger-soft)]/40 p-[14px]"
          )}
        >
          <p className="font-sans text-[12px] text-[var(--danger)] mb-[10px]">
            Type{" "}
            <code className="font-mono font-bold px-[4px] py-[1px] bg-[var(--danger-soft)] rounded-[var(--r-sm)]">
              {entityName}
            </code>{" "}
            to confirm deletion
          </p>
          <input
            ref={inputRef}
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={entityName}
            aria-label={`Type ${entityName} to confirm`}
            aria-describedby="destructive-hint"
            autoComplete="off"
            className={cn(
              "w-full h-[38px] px-[12px]",
              "bg-[var(--cream)] border rounded-[var(--r-md)]",
              "font-mono text-[13px] text-[var(--ink)]",
              "placeholder:text-[var(--ink-subtle)]",
              "focus:outline-none transition-colors duration-[var(--m-fast)]",
              canDelete
                ? "border-[var(--ok)] focus:border-[var(--ok)]"
                : "border-[var(--rule)] focus:border-[var(--danger)]"
            )}
          />
          <p
            id="destructive-hint"
            className="font-sans text-[11px] text-[var(--ink-subtle)] mt-[6px]"
          >
            {canDelete ? "✓ Name confirmed" : "Name must match exactly"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-[10px]">
          <AppButton variant="ghost" size="md" onClick={onCancel}>
            Cancel
          </AppButton>
          <button
            type="button"
            disabled={!canDelete}
            onClick={onConfirm}
            className={cn(
              "inline-flex items-center gap-[6px]",
              "px-[16px] py-[8px] rounded-[var(--r-md)]",
              "font-sans text-[14px] font-medium",
              "transition-all duration-[var(--m-fast)]",
              "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
              canDelete
                ? "bg-[var(--danger)] text-white border border-[var(--danger)] hover:bg-[#8b2215] hover:border-[#8b2215] cursor-pointer"
                : "bg-[var(--rule-soft)] text-[var(--ink-subtle)] border border-[var(--rule)] cursor-not-allowed"
            )}
          >
            <Trash2 size={14} aria-hidden="true" />
            Delete {entityType}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
