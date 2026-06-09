"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AuthCard } from "@/components/molecules/auth/AuthCard";
import { AuthBanner } from "@/components/molecules/auth/AuthBanner";
import { TwoFAMethodToggle, type TwoFAMethod } from "@/components/molecules/auth/TwoFAMethodToggle";
import { OTPInput } from "@/components/atoms/auth/OTPInput";
import { useStaffTwoFactor } from "@/hooks/useAuth";
import { isApiError } from "@/lib/api/types";
import { cn } from "@/lib/utils";

export function TwoFAChallengeForm() {
  const staffTwoFactorMutation = useStaffTwoFactor();
  const [method, setMethod] = React.useState<TwoFAMethod>("totp");
  const [otp, setOtp] = React.useState("");
  const [trustDevice, setTrustDevice] = React.useState(false);
  const [errorState, setErrorState] = React.useState<{
    type: "wrong" | "generic" | null;
    message?: string;
  }>({ type: null });

  const HINTS: Record<TwoFAMethod, string> = {
    totp: "Enter the 6-digit code from your authenticator app.",
    sms: "We sent a code to your registered phone number.",
    backup: "Enter one of your saved backup codes.",
  };

  function handleMethodChange(nextMethod: TwoFAMethod) {
    setMethod(nextMethod);
    setOtp("");
    setErrorState({ type: null });
  }

  async function handleVerify(code: string) {
    if (staffTwoFactorMutation.isPending || code.length < 6) return;
    setErrorState({ type: null });

    try {
      await staffTwoFactorMutation.mutateAsync({
        code,
        method,
        trustDevice,
      });
    } catch (error) {
      if (isApiError(error) && error.errorType === "otp-wrong") {
        setErrorState({
          type: "wrong",
          message: "Incorrect code. Please try again.",
        });
        setOtp("");
        return;
      }

      if (isApiError(error) && error.errorType === "otp-expired") {
        return;
      }

      setErrorState({
        type: "generic",
        message: isApiError(error)
          ? error.message
          : "Something went wrong on our end. Please try again.",
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className="w-full max-w-[400px]"
    >
      <AuthCard
        variant="staff"
        title="Two-factor verification"
        subtitle="Complete the second step to access your account."
      >
        <div className="flex flex-col gap-5">
          {/* Method toggle */}
          <TwoFAMethodToggle value={method} onChange={handleMethodChange} />

          {/* Context hint */}
          <p className="font-sans text-[13px] text-[var(--ink-muted)] leading-snug">
            {HINTS[method]}
          </p>

          {/* Error */}
          <AuthBanner
            variant="danger"
            message={errorState.message ?? "Incorrect code. Please try again."}
            visible={errorState.type === "wrong" || errorState.type === "generic"}
          />

          {/* OTP Input */}
          <OTPInput
            value={otp}
            onChange={setOtp}
            onComplete={(value) => {
              void handleVerify(value);
            }}
            error={errorState.type === "wrong"}
            disabled={staffTwoFactorMutation.isPending}
          />

          {/* Submit */}
          <button
            type="button"
            onClick={() => handleVerify(otp)}
            disabled={otp.length < 6 || staffTwoFactorMutation.isPending}
            className={cn(
              "w-full h-11 rounded-[var(--r-md)]",
              "font-sans text-[14px] font-medium text-[var(--paper)]",
              "bg-[var(--ink)] hover:bg-[var(--ink-2)]",
              "transition-colors duration-[120ms] outline-none",
              "focus-visible:shadow-[var(--focus-ring)]",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              "flex items-center justify-center gap-2"
            )}
          >
            {staffTwoFactorMutation.isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[var(--paper)] border-t-transparent rounded-full animate-spin" />
                Verifying…
              </span>
            ) : (
              "Verify"
            )}
          </button>

          {/* Trust device */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={trustDevice}
              onChange={(e) => setTrustDevice(e.target.checked)}
              className="w-4 h-4 rounded accent-[var(--ink)] cursor-pointer"
            />
            <span className="font-sans text-[12px] text-[var(--ink-muted)]">
              Trust this device for 7 days
            </span>
          </label>

          {/* Help link */}
          <p className="font-sans text-[12px] text-center text-[var(--ink-muted)]">
            <button
              type="button"
              className="underline underline-offset-2 hover:text-[var(--ink)] transition-colors"
            >
              I don&apos;t have access to my authenticator
            </button>
          </p>
        </div>
      </AuthCard>
    </motion.div>
  );
}
