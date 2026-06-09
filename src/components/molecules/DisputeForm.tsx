"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { disputeSchema, type DisputeFormData } from "@/lib/payment-schema";
import { PillButton } from "@/components/atoms/PillButton";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const REASONS = [
  "Wrong amount charged",
  "Payment not reflected in my application",
  "Double charged",
  "Refund not received",
  "Other",
];

interface DisputeFormProps {
  applicationId: string;
  onSubmitted?: () => void;
  className?: string;
}

export function DisputeForm({ applicationId, onSubmitted, className }: DisputeFormProps) {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DisputeFormData>({
    resolver: zodResolver(disputeSchema),
    defaultValues: { reason: "", details: "" },
  });

  const details = watch("details") ?? "";

  function onSubmit(data: DisputeFormData) {
    // Frontend-only: log for now, real implementation hooks backend ticket
    console.info("[dispute]", { applicationId, ...data });
    setSubmitted(true);
    onSubmitted?.();
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <div className="w-12 h-12 rounded-full bg-[var(--ok-soft)] flex items-center justify-center">
          <CheckCircle size={22} strokeWidth={1.5} className="text-[var(--ok)]" />
        </div>
        <p className="font-serif text-[16px] text-[var(--ink)]">Dispute submitted</p>
        <p className="font-sans text-[13px] text-[var(--ink-muted)] max-w-[300px]">
          Your case {applicationId} has been flagged. Our team will respond within 2 business hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-5 w-full text-left", className)}
      noValidate
    >
      {/* Reason select */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="dispute-reason" className="font-sans text-[13px] font-medium text-[var(--ink)]">
          Reason
        </label>
        <select
          id="dispute-reason"
          {...register("reason")}
          aria-invalid={!!errors.reason}
          className={cn(
            "w-full rounded-[var(--r-md)] border bg-[var(--paper)] px-3 py-2.5",
            "font-sans text-[14px] text-[var(--ink)]",
            "focus:outline-none focus:shadow-[var(--focus-ring)]",
            "transition-[border-color,box-shadow] duration-[120ms]",
            errors.reason
              ? "border-[var(--danger)]"
              : "border-[var(--rule-strong)]"
          )}
        >
          <option value="">Select a reason…</option>
          {REASONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {errors.reason && (
          <p role="alert" className="font-sans text-[12px] text-[var(--danger)]">
            {errors.reason.message}
          </p>
        )}
      </div>

      {/* Details textarea */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="dispute-details" className="font-sans text-[13px] font-medium text-[var(--ink)]">
          Details
        </label>
        <textarea
          id="dispute-details"
          {...register("details")}
          rows={4}
          maxLength={500}
          placeholder="Describe what happened…"
          aria-invalid={!!errors.details}
          className={cn(
            "w-full rounded-[var(--r-md)] border bg-[var(--paper)] px-3 py-2.5 resize-none",
            "font-sans text-[14px] text-[var(--ink)] leading-relaxed",
            "placeholder:text-[var(--ink-subtle)]",
            "focus:outline-none focus:shadow-[var(--focus-ring)]",
            "transition-[border-color,box-shadow] duration-[120ms]",
            errors.details
              ? "border-[var(--danger)]"
              : "border-[var(--rule-strong)]"
          )}
        />
        <div className="flex items-center justify-between">
          {errors.details ? (
            <p role="alert" className="font-sans text-[12px] text-[var(--danger)]">
              {errors.details.message}
            </p>
          ) : (
            <span />
          )}
          <span className="font-mono text-[11px] text-[var(--ink-subtle)]">
            {details.length}/500
          </span>
        </div>
      </div>

      <PillButton
        type="submit"
        variant="solid"
        size="sm"
        disabled={isSubmitting}
        className="self-start"
      >
        {isSubmitting ? "Submitting…" : "Submit dispute"}
      </PillButton>
    </form>
  );
}
