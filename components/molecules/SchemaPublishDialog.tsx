"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { X, GitMerge } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/atoms/AppButton";

interface SchemaPublishDialogProps {
  draftCount: number;
  onPublish: (mode: "auto" | "manual") => void;
  onCancel: () => void;
}

export function SchemaPublishDialog({
  draftCount,
  onPublish,
  onCancel,
}: SchemaPublishDialogProps) {
  const [mode, setMode] = React.useState<"auto" | "manual">("auto");

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="schema-publish-title"
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
          "relative z-10 w-full max-w-[480px]",
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
            className="w-[36px] h-[36px] rounded-[var(--r-md)] bg-[var(--info-soft)] flex items-center justify-center shrink-0"
          >
            <GitMerge size={18} className="text-[var(--info)]" />
          </div>
          <div>
            <h2
              id="schema-publish-title"
              className="font-serif text-[18px] text-[var(--ink)]"
            >
              Publish schema
            </h2>
            <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-[2px]">
              There are{" "}
              <strong className="font-medium text-[var(--warn)]">
                {draftCount} in-progress applications
              </strong>{" "}
              using the current schema version. Choose how to handle them.
            </p>
          </div>
        </div>

        {/* Migration options */}
        <div className="flex flex-col gap-[8px]" role="radiogroup" aria-label="Migration mode">
          {[
            {
              value: "auto" as const,
              label: "Automatic migration",
              desc: "Existing drafts are silently migrated to the new schema. New fields default to empty.",
            },
            {
              value: "manual" as const,
              label: "Manual migration",
              desc: "Agents are notified to review each affected case. Applications stay on the old schema until reviewed.",
            },
          ].map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex items-start gap-[12px] p-[14px] cursor-pointer",
                "rounded-[var(--r-md)] border transition-all duration-[var(--m-fast)]",
                mode === opt.value
                  ? "border-[var(--brand)] bg-[var(--brand-soft)]/30"
                  : "border-[var(--rule)] hover:border-[var(--ink-muted)]"
              )}
            >
              <input
                type="radio"
                name="migration-mode"
                value={opt.value}
                checked={mode === opt.value}
                onChange={() => setMode(opt.value)}
                className="mt-[2px] accent-[var(--brand)]"
              />
              <div>
                <p className="font-sans text-[13px] font-medium text-[var(--ink)]">
                  {opt.label}
                </p>
                <p className="font-sans text-[12px] text-[var(--ink-muted)] mt-[2px]">
                  {opt.desc}
                </p>
              </div>
            </label>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-[10px] pt-[4px]">
          <AppButton variant="ghost" size="md" onClick={onCancel}>
            Cancel
          </AppButton>
          <AppButton
            variant="brand"
            size="md"
            onClick={() => onPublish(mode)}
          >
            Publish schema
          </AppButton>
        </div>
      </motion.div>
    </div>
  );
}
