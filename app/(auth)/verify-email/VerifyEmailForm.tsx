"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { OTPCodeGrid } from "@/components/molecules/OTPCodeGrid";
import { MkIcon } from "@/components/atoms/MkIcon";
import { VerifyEmailPanel } from "@/components/sections/auth/VerifyEmailPanel";

const RESEND_SECONDS = 60;

export function VerifyEmailForm() {
  const router = useRouter();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.from(".auth-form-content > *", {
        y: 16, opacity: 0, duration: 0.4, stagger: 0.07, ease: "power2.out",
      });
      gsap.from(".auth-panel-side", { x: 20, opacity: 0, duration: 0.5 });
    });
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setInterval(() => setResendTimer((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendTimer]);

  const handleComplete = async (code: string) => {
    setError("");
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    router.push("/2fa-setup");
  };

  const handleResend = () => {
    setResendTimer(RESEND_SECONDS);
    setDigits(["", "", "", "", "", ""]);
  };

  const code = digits.join("");

  return (
    <AuthLayout panel={<VerifyEmailPanel />}>
      <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] mb-1">
        Verify your email
      </h1>
      <p className="text-[15px] text-[var(--text-muted)] mb-6">
        Enter the 6-digit code we sent to{" "}
        <strong className="text-[var(--text)]">kalisa@inema.rw</strong>
      </p>

      <OTPCodeGrid value={digits} onChange={setDigits} onComplete={handleComplete} error={error} />

      <button
        type="button"
        onClick={() => handleComplete(code)}
        disabled={code.length !== 6 || submitting}
        className="flex items-center justify-center gap-2 w-full py-3 px-5 mt-5 text-[15px] font-semibold bg-[var(--brand)] text-white border border-[var(--brand)] rounded-[10px] hover:bg-[#4A6BEE] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <MkIcon name="refreshCw" size={16} className="animate-spin" />
        ) : (
          <>Verify <MkIcon name="check" size={16} /></>
        )}
      </button>

      <div className="text-center mt-4 text-[13px] text-[var(--text-subtle)]">
        <p>
          Didn't receive a code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendTimer > 0}
            className="text-[var(--brand)] font-medium bg-none border-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Resend code
          </button>
        </p>
        {resendTimer > 0 && (
          <p className="mt-1">
            You can resend in <strong className="text-[var(--text-muted)]">{resendTimer}s</strong>
          </p>
        )}
      </div>

      <Link
        href="/sign-up"
        className="flex items-center gap-1.5 mt-4 text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-[120ms] no-underline"
      >
        <MkIcon name="arrowLeft" size={14} /> Back to sign up
      </Link>
    </AuthLayout>
  );
}
