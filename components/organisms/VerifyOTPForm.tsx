"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AuthCard } from "@/components/molecules/AuthCard";
import { AuthBanner } from "@/components/molecules/AuthBanner";
import { AuthFooterLinks } from "@/components/molecules/AuthFooterLinks";
import { DeviceInfoCard } from "@/components/molecules/DeviceInfoCard";
import { OTPInput } from "@/components/atoms/OTPInput";
import { ResendCooldown } from "@/components/atoms/ResendCooldown";
import { useAuth } from "@/lib/auth-context";
import { MOCK, AUTH_VERIFIED_KEY } from "@/lib/auth-types";
import { setItem } from "@/lib/storage";
import { cn } from "@/lib/utils";

export function VerifyOTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dispatch } = useAuth();

  const next = searchParams.get("next") ?? "/";
  const maskedEmail = decodeURIComponent(searchParams.get("email") ?? "your email");
  const isNewDevice = searchParams.get("device") === "new";

  const [otp, setOtp] = React.useState("");
  const [errorType, setErrorType] = React.useState<"wrong" | "expired" | null>(null);
  const [attempts, setAttempts] = React.useState(3);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [expired, setExpired] = React.useState(false);

  // OTP expiry: 5 minutes from mount
  const [expiryMs, setExpiryMs] = React.useState(5 * 60 * 1000);

  React.useEffect(() => {
    if (expiryMs <= 0) return;
    const id = setInterval(() => {
      setExpiryMs((ms) => {
        if (ms <= 1000) {
          clearInterval(id);
          setExpired(true);
          setErrorType("expired");
          return 0;
        }
        return ms - 1000;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  function formatExpiry(ms: number) {
    const s = Math.ceil(ms / 1000);
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  }

  async function handleVerify(code: string) {
    if (expired || isVerifying || code.length < 6) return;
    setIsVerifying(true);
    setErrorType(null);

    await new Promise((r) => setTimeout(r, 600));

    if (code !== MOCK.VALID_OTP) {
      const remaining = attempts - 1;
      setAttempts(remaining);
      if (remaining <= 0) {
        setExpired(true);
        setErrorType("expired");
      } else {
        setErrorType("wrong");
      }
      setOtp("");
      setIsVerifying(false);
      return;
    }

    // Success
    setItem(AUTH_VERIFIED_KEY, "true");
    dispatch({ type: "SET_EMAIL_VERIFIED" });
    router.push(next);
  }

  // Auto-submit when 6 digits entered
  React.useEffect(() => {
    if (otp.length === 6) {
      handleVerify(otp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

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
            message={`Incorrect code. ${attempts} attempt${attempts === 1 ? "" : "s"} remaining.`}
            visible={errorType === "wrong"}
          />
          <AuthBanner
            variant="warn"
            message="Your code has expired. Request a new one."
            visible={errorType === "expired"}
          />

          {/* OTP Input */}
          <div className="flex flex-col items-center gap-4">
            <OTPInput
              value={otp}
              onChange={setOtp}
              error={errorType === "wrong" || errorType === "expired"}
              disabled={expired || isVerifying}
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

          {/* Submit button (fallback if no auto-submit) */}
          <button
            type="button"
            onClick={() => handleVerify(otp)}
            disabled={otp.length < 6 || expired || isVerifying}
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
            {isVerifying ? (
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
              cooldownSeconds={30}
              onResend={() => {
                setExpired(false);
                setErrorType(null);
                setAttempts(3);
                setOtp("");
                setExpiryMs(5 * 60 * 1000);
              }}
            />
          </div>
        </div>
        <AuthFooterLinks className="mt-4" />
      </AuthCard>
    </motion.div>
  );
}
