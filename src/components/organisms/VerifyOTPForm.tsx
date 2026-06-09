"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AuthCard } from "@/components/molecules/AuthCard";
import { AuthBanner } from "@/components/molecules/AuthBanner";
import { AuthFooterLinks } from "@/components/molecules/AuthFooterLinks";
import { DeviceInfoCard } from "@/components/molecules/DeviceInfoCard";
import { OTPInput } from "@/components/atoms/auth/OTPInput";
import { ResendCooldown } from "@/components/atoms/auth/ResendCooldown";
import { useResendOtp, useVerifyOtp } from "@/hooks/useAuth";
import { isApiError, isOtpWrongData, isRateLimitedData } from "@/lib/api/types";
import { cn } from "@/lib/utils";

export function VerifyOTPForm() {
  const searchParams = useSearchParams();
  const verifyOtpMutation = useVerifyOtp();
  const resendOtpMutation = useResendOtp();

  const maskedEmail = decodeURIComponent(searchParams.get("email") ?? "your email");
  const isNewDevice = searchParams.get("device") === "new";

  const [otp, setOtp] = React.useState("");
  const [errorState, setErrorState] = React.useState<{
    type: "wrong" | "expired" | "generic" | null;
    message?: string;
  }>({ type: null });
  const [attempts, setAttempts] = React.useState(3);
  const [expired, setExpired] = React.useState(false);
  const [expiryMs, setExpiryMs] = React.useState(5 * 60 * 1000);
  const [expiresAt, setExpiresAt] = React.useState(() => Date.now() + 5 * 60 * 1000);
  const [resendCooldownSeconds, setResendCooldownSeconds] = React.useState(30);

  React.useEffect(() => {
    const id = setInterval(() => {
      const nextMs = Math.max(0, expiresAt - Date.now());
      setExpiryMs(nextMs);
      if (nextMs <= 0) {
        clearInterval(id);
        setExpired(true);
        setErrorState({
          type: "expired",
          message: "This code has expired. Request a new one.",
        });
      }
    }, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  function formatExpiry(ms: number) {
    const s = Math.ceil(ms / 1000);
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  }

  async function handleVerify(code: string) {
    if (expired || verifyOtpMutation.isPending || code.length < 6) return;
    setErrorState({ type: null });

    try {
      await verifyOtpMutation.mutateAsync({ code });
    } catch (error) {
      if (!isApiError(error)) {
        setErrorState({
          type: "generic",
          message: "Something went wrong on our end. Please try again.",
        });
        return;
      }

      if (error.errorType === "otp-wrong" && isOtpWrongData(error.data)) {
        setAttempts(error.data.attemptsRemaining);
        if (error.data.attemptsRemaining <= 0) {
          setExpired(true);
          setErrorState({
            type: "expired",
            message: "This code has expired. Request a new one.",
          });
        } else {
          setErrorState({
            type: "wrong",
            message: `Incorrect code. ${error.data.attemptsRemaining} attempt${error.data.attemptsRemaining === 1 ? "" : "s"} remaining.`,
          });
        }
        setOtp("");
        return;
      }

      if (error.errorType === "otp-expired") {
        setExpired(true);
        setErrorState({
          type: "expired",
          message: "This code has expired. Request a new one.",
        });
        setOtp("");
        return;
      }

      setErrorState({
        type: "generic",
        message: error.statusCode >= 500
          ? "Something went wrong on our end. Please try again."
          : error.message,
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className="w-full max-w-[460px]"
    >
      <AuthCard
        variant="client"
        title="Verify your identity"
        subtitle={`We sent a 6-digit code to ${maskedEmail}`}
      >
        <div className="flex flex-col gap-5">
          {/* New device info */}
          {isNewDevice && <DeviceInfoCard />}

          {/* Error banners */}
          <AuthBanner
            variant="danger"
            message={errorState.message ?? `Incorrect code. ${attempts} attempt${attempts === 1 ? "" : "s"} remaining.`}
            visible={errorState.type === "wrong"}
          />
          <AuthBanner
            variant="warn"
            message={errorState.message ?? "Your code has expired. Request a new one."}
            visible={errorState.type === "expired"}
          />
          <AuthBanner
            variant="danger"
            message={errorState.message ?? "Something went wrong on our end. Please try again."}
            visible={errorState.type === "generic"}
          />

          {/* OTP Input */}
          <div className="flex flex-col items-center gap-4">
            <OTPInput
              value={otp}
              onChange={setOtp}
              onComplete={(value) => {
                void handleVerify(value);
              }}
              error={errorState.type === "wrong" || errorState.type === "expired"}
              disabled={expired || verifyOtpMutation.isPending}
            />

            {/* Expiry timer */}
            {!expired && (
              <p className="font-sans text-[13px] text-[var(--ink-muted)]">
                Code expires in{" "}
                <span className="font-mono text-[var(--ink)] tabular-nums">
                  {formatExpiry(expiryMs)}
                </span>
              </p>
            )}
          </div>

          {/* Submit button fallback */}
          <button
            type="button"
            onClick={() => handleVerify(otp)}
            disabled={otp.length < 6 || expired || verifyOtpMutation.isPending}
            className={cn(
              "w-full h-12 rounded-[var(--r-pill)]",
              "font-serif italic text-[17px] text-[var(--paper)]",
              "bg-[var(--ink)] hover:bg-[var(--ink-2)]",
              "transition-colors duration-[120ms] outline-none",
              "focus-visible:shadow-[var(--focus-ring)]",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              "flex items-center justify-center gap-2"
            )}
          >
            {verifyOtpMutation.isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[var(--paper)] border-t-transparent rounded-full animate-spin" />
                Verifying…
              </span>
            ) : (
              "Verify →"
            )}
          </button>

          {/* Resend */}
          <div className="flex items-center justify-center gap-2">
            <span className="font-sans text-[13px] text-[var(--ink-muted)]">
              Didn&apos;t receive it?
            </span>
            <ResendCooldown
              cooldownSeconds={resendCooldownSeconds}
              onResend={async () => {
                try {
                  await resendOtpMutation.mutateAsync();
                  setExpired(false);
                  setErrorState({ type: null });
                  setAttempts(3);
                  setOtp("");
                  setExpiryMs(5 * 60 * 1000);
                  setExpiresAt(Date.now() + 5 * 60 * 1000);
                  setResendCooldownSeconds(30);
                } catch (error) {
                  if (isApiError(error) && error.errorType === "rate-limited" && isRateLimitedData(error.data)) {
                    setErrorState({
                      type: "generic",
                      message: `Too many attempts. Try again in ${error.data.retryAfterSeconds} seconds.`,
                    });
                    setResendCooldownSeconds(error.data.retryAfterSeconds);
                    return;
                  }

                  setErrorState({
                    type: "generic",
                    message: isApiError(error)
                      ? error.message
                      : "Something went wrong on our end. Please try again.",
                  });
                }
              }}
            />
          </div>
        </div>
        <AuthFooterLinks className="mt-4" />
      </AuthCard>
    </motion.div>
  );
}
