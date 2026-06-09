"use client";

import * as React from "react";
import { OTPInput } from "@/components/atoms/auth/OTPInput";
import { CountdownTimer } from "@/components/atoms/payment/CountdownTimer";
import { cn } from "@/lib/utils";

interface ThreeDSFrameProps {
  bankName?: string;
  amount: string;
  onComplete: (otp: string) => void;
  onCancel: () => void;
  onResend?: () => void;
  className?: string;
}

export function ThreeDSFrame({
  bankName = "Bank of Kigali",
  amount,
  onComplete,
  onCancel,
  onResend,
  className,
}: ThreeDSFrameProps) {
  const [otp, setOtp] = React.useState("");
  const [timerKey, setTimerKey] = React.useState(0);
  const [otpError, setOtpError] = React.useState(false);

  function handleResend() {
    setTimerKey((k) => k + 1);
    setOtp("");
    setOtpError(false);
    onResend?.();
  }

  function handleChange(value: string) {
    setOtpError(false);
    setOtp(value);
  }

  function handleComplete(value: string) {
    onComplete(value);
  }

  return (
    <div
      className={cn(
        "w-full mx-auto rounded-[var(--r-lg)] border border-[var(--rule)] bg-[var(--paper)] overflow-hidden",
        "flex flex-col",
        className
      )}
      style={{ maxWidth: "var(--pay-tds-max)" }}
      role="region"
      aria-label="3D Secure verification"
    >
      {/* Bank header */}
      <div className="flex items-center gap-3 px-6 py-4 bg-[var(--ink)] border-b border-[var(--rule)]">
        <div className="w-8 h-8 rounded-full bg-[rgba(246,236,210,0.15)] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1" y="5" width="14" height="9" rx="1" stroke="rgba(246,236,210,0.7)" strokeWidth="1.2" />
            <path d="M1 8h14" stroke="rgba(246,236,210,0.7)" strokeWidth="1.2" />
            <path d="M4 2l4 3 4-3" stroke="rgba(246,236,210,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="font-serif italic text-[rgba(246,236,210,0.9)] text-[14px]">
          {bankName}
        </span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-[rgba(246,236,210,0.35)]">
          3D Secure
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center gap-6 px-6 py-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="font-serif text-[20px] text-[var(--ink)]">
            Verify your payment
          </p>
          <p className="font-sans text-[13px] text-[var(--ink-muted)] max-w-[300px]">
            Your bank sent a one-time code to your registered number. Enter it below to authorise {amount}.
          </p>
        </div>

        <OTPInput
          value={otp}
          onChange={handleChange}
          onComplete={handleComplete}
          error={otpError}
        />

        <div className="flex flex-col items-center gap-2">
          <CountdownTimer key={timerKey} initialSeconds={120} />
          <p className="font-sans text-[12px] text-[var(--ink-muted)]">
            Code expires in
          </p>
        </div>

        <button
          type="button"
          onClick={handleResend}
          className="font-sans text-[13px] text-[var(--ink-muted)] underline underline-offset-2 hover:text-[var(--ink)] transition-colors"
        >
          Resend code
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 pb-5 flex justify-center">
        <button
          type="button"
          onClick={onCancel}
          className="font-sans text-[13px] text-[var(--ink-subtle)] hover:text-[var(--ink-muted)] transition-colors"
        >
          ← Cancel and choose another method
        </button>
      </div>
    </div>
  );
}
