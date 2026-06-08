"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const CONFIRM_PHRASE = "delete my account";

interface DangerZoneProps {
  onDelete?: () => void;
  isDeleting?: boolean;
  className?: string;
}

export function DangerZone({ onDelete, isDeleting, className }: DangerZoneProps) {
  const [confirmValue, setConfirmValue] = React.useState("");
  const inputId = React.useId();
  const isConfirmed = confirmValue.toLowerCase().trim() === CONFIRM_PHRASE;

  return (
    <section
      className={cn(
        "rounded-[var(--r-md)] border border-[var(--danger)] bg-[var(--paper)] overflow-hidden",
        className
      )}
    >
      <div className="px-[28px] pt-[24px] pb-[20px] border-b border-[var(--danger)]/20">
        <h2 className="font-serif text-[20px] font-normal text-[var(--danger)] leading-[1.25]">
          Danger zone
        </h2>
        <p className="font-sans text-[13px] text-[var(--ink-muted)] mt-[4px]">
          These actions are permanent and cannot be undone.
        </p>
      </div>

      <div className="px-[28px] py-[24px]">
        <p className="font-sans text-[14px] font-medium text-[var(--ink)] mb-[4px]">
          Delete my account
        </p>
        <p className="font-sans text-[13px] text-[var(--ink-muted)] mb-[20px] max-w-[480px]">
          All your data, applications, documents, and message history will be permanently
          erased. This cannot be recovered. Active applications will be cancelled.
        </p>

        {/* Confirm input */}
        <div className="mb-[16px] max-w-[380px]">
          <label
            htmlFor={inputId}
            className="block font-sans text-[12px] text-[var(--ink-muted)] mb-[6px]"
          >
            Type{" "}
            <span className="font-mono text-[var(--ink)] font-medium">
              {CONFIRM_PHRASE}
            </span>{" "}
            to confirm
          </label>
          <input
            id={inputId}
            type="text"
            value={confirmValue}
            onChange={(e) => setConfirmValue(e.target.value)}
            placeholder={CONFIRM_PHRASE}
            autoComplete="off"
            className={cn(
              "w-full h-[40px] px-[12px] rounded-[var(--r-md)]",
              "border font-sans text-[13px] text-[var(--ink)]",
              "bg-[var(--cream)] placeholder:text-[var(--ink-muted)]/50",
              "outline-none focus:border-[var(--danger)] transition-colors duration-[var(--m-fast)]",
              isConfirmed
                ? "border-[var(--danger)]"
                : "border-[var(--rule)]"
            )}
          />
        </div>

        {/* Delete button */}
        <button
          type="button"
          onClick={onDelete}
          disabled={!isConfirmed || isDeleting}
          aria-disabled={!isConfirmed}
          className={cn(
            "inline-flex items-center justify-center gap-[8px]",
            "h-[40px] px-[20px] rounded-[var(--r-pill)]",
            "font-sans text-[13px] font-medium",
            "transition-colors duration-[var(--m-fast)]",
            "focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]",
            isConfirmed && !isDeleting
              ? "bg-[var(--danger)] text-white hover:bg-[var(--danger)]/90 cursor-pointer"
              : "bg-[var(--rule)] text-[var(--ink-muted)] cursor-not-allowed"
          )}
        >
          {isDeleting ? (
            <>
              <span className="w-[14px] h-[14px] border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Deleting…
            </>
          ) : (
            "Delete my account"
          )}
        </button>
      </div>
    </section>
  );
}
