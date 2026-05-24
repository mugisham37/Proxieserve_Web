"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthCard } from "@/components/molecules/AuthCard";
import { AuthBanner } from "@/components/molecules/AuthBanner";
import { TwoFAMethodToggle, type TwoFAMethod } from "@/components/molecules/TwoFAMethodToggle";
import { OTPInput } from "@/components/atoms/OTPInput";
import { useAuth } from "@/lib/auth-context";
import { MOCK, type AuthSession } from "@/lib/auth-types";
import { cn } from "@/lib/utils";

export function TwoFAChallengeForm() {
  const router = useRouter();
  const { dispatch } = useAuth();
  const [method, setMethod] = React.useState<TwoFAMethod>("totp");
  const [otp, setOtp] = React.useState("");
  const [trustDevice, setTrustDevice] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(false);

  const HINTS: Record<TwoFAMethod, string> = {
    totp: "Enter the 6-digit code from your authenticator app.",
    sms: "We sent a code to your registered phone number.",
    backup: "Enter one of your saved backup codes.",
  };

  async function handleVerify(code: string) {
    if (isVerifying || code.length < 6) return;
    setIsVerifying(true);
    setError(false);

    await new Promise((r) => setTimeout(r, 700));

    if (code !== MOCK.VALID_OTP) {
      setError(true);
      setOtp("");
      setIsVerifying(false);
      return;
    }

    // Commit pending session
    try {
      const raw = sessionStorage.getItem("proxi:staff:pending");
      if (raw) {
        const session = JSON.parse(raw) as AuthSession;
        dispatch({ type: "SET_SESSION", payload: session });
        sessionStorage.removeItem("proxi:staff:pending");
      }
    } catch {}

    router.push("/");
  }

  React.useEffect(() => {
    if (otp.length === 6) handleVerify(otp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  // Reset OTP when method changes
  React.useEffect(() => {
    setOtp("");
    setError(false);
  }, [method]);

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
          <TwoFAMethodToggle value={method} onChange={setMethod} />

          {/* Context hint */}
          <p className="font-sans text-[13px] text-[var(--ink-muted)] leading-snug">
            {HINTS[method]}
          </p>

          {/* Error */}
          <AuthBanner
            variant="danger"
            message="Incorrect code. Please try again."
            visible={error}
          />

          {/* OTP Input */}
          <OTPInput
            value={otp}
            onChange={setOtp}
            error={error}
            disabled={isVerifying}
          />

          {/* Submit */}
          <button
            type="button"
            onClick={() => handleVerify(otp)}
            disabled={otp.length < 6 || isVerifying}
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
            {isVerifying ? (
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
