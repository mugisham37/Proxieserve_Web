"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/src/components/layout/AuthLayout";
import { TwoFAOptionCard } from "@/src/components/molecules/TwoFAOptionCard";
import { RecoveryCodesGrid } from "@/src/components/molecules/RecoveryCodesGrid";
import { AuthConsentRow } from "@/src/components/molecules/AuthConsentRow";
import { AuthFieldInput } from "@/src/components/molecules/AuthFieldInput";
import { MkIcon } from "@/src/components/atoms/MkIcon";
import { TwoFAPanel } from "@/src/components/sections/auth/TwoFAPanel";
import { RECOVERY_CODES } from "@/src/lib/auth/data";
import type { TwoFAStep, TwoFAMethod } from "@/src/types";
import { useForm } from "react-hook-form";

export function TwoFASetupForm() {
  const router = useRouter();
  const [step, setStep] = useState<TwoFAStep>("choose");
  const [method, setMethod] = useState<TwoFAMethod>("app");
  const [saved, setSaved] = useState(false);
  const [enabling, setEnabling] = useState(false);
  const [continuing, setContinuing] = useState(false);

  // QR grid — stable random pattern (recalculated only on mount)
  const qrCells = useMemo(
    () => Array.from({ length: 64 }, () => Math.random() > 0.5),
    []
  );

  const codeForm = useForm<{ verifyCode: string }>();

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.from(".auth-form-content > *", {
        y: 14, duration: 0.35, stagger: 0.06, ease: "power2.out", clearProps: "transform",
      });
    });
  }, []);

  const handleEnable = async () => {
    setEnabling(true);
    await new Promise((r) => setTimeout(r, 800));
    setEnabling(false);
    setStep("codes");
  };

  const handleContinue = async () => {
    setContinuing(true);
    await new Promise((r) => setTimeout(r, 500));
    setContinuing(false);
    setStep("done");
  };

  return (
    <AuthLayout panel={<TwoFAPanel />}>
      {step === "choose" && (
        <>
          <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] mb-1">
            Set up 2FA
          </h1>
          <p className="text-[15px] text-[var(--text-muted)] mb-6">
            Choose how you'd like to receive your second factor.
          </p>

          <div role="radiogroup" aria-label="2FA method" className="flex flex-col gap-2 mb-4">
            <TwoFAOptionCard method="app" selected={method === "app"} onClick={() => setMethod("app")} />
            <TwoFAOptionCard method="sms" selected={method === "sms"} onClick={() => setMethod("sms")} />
          </div>

          {method === "app" && (
            <div className="mt-2 text-center">
              {/* QR placeholder */}
              <div className="w-40 h-40 mx-auto bg-[var(--bg)] border border-[var(--border)] rounded-[10px] p-4">
                <div className="grid gap-[2px] w-full h-full" style={{ gridTemplateColumns: "repeat(8, 1fr)" }}>
                  {qrCells.map((filled, i) => (
                    <div
                      key={i}
                      className="rounded-[1px]"
                      style={{ background: filled ? "var(--text)" : "transparent" }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <span className="block text-[12px] text-[var(--text-subtle)] mb-1">
                  Can't scan? Enter manually:
                </span>
                <code className="font-mono text-[14px] text-[var(--brand)] bg-[var(--brand-soft)] px-3 py-1 rounded-[6px] tracking-[0.05em]">
                  JBSWY3DPEHPK3PXP
                </code>
              </div>
              <div className="mt-3 text-left flex flex-col gap-1">
                <label htmlFor="verify-code" className="text-[13px] font-medium text-[var(--text)]">
                  Enter 6-digit code from app
                </label>
                <input
                  id="verify-code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000 000"
                  className="w-full py-[10px] px-3 text-center text-[14px] font-mono tracking-[0.3em] bg-[var(--bg)] border border-[var(--border)] rounded-[10px] text-[var(--text)] outline-none focus:border-[var(--brand)] focus:[box-shadow:0_0_0_3px_var(--brand-soft)] transition-all duration-[120ms] placeholder:text-[var(--text-subtle)] placeholder:tracking-normal"
                />
              </div>
            </div>
          )}

          {method === "sms" && (
            <div className="mt-2 flex flex-col gap-1">
              <label htmlFor="phone" className="text-[13px] font-medium text-[var(--text)]">
                Phone number
              </label>
              <div className="flex items-center gap-2 px-3 bg-[var(--bg)] border border-[var(--border)] rounded-[10px] focus-within:border-[var(--brand)] focus-within:[box-shadow:0_0_0_3px_var(--brand-soft)] transition-all duration-[120ms]">
                <span className="text-[13px] text-[var(--text-subtle)] pr-1 border-r border-[var(--border)] mr-1">+250</span>
                <input
                  id="phone"
                  type="tel"
                  placeholder="788 000 000"
                  className="flex-1 py-[10px] text-[14px] bg-transparent border-none outline-none text-[var(--text)] placeholder:text-[var(--text-subtle)]"
                />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleEnable}
            disabled={enabling}
            className="flex items-center justify-center gap-2 w-full py-3 px-5 mt-4 text-[15px] font-semibold bg-[var(--brand)] text-white border border-[var(--brand)] rounded-[10px] hover:bg-[#4A6BEE] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {enabling ? (
              <MkIcon name="refreshCw" size={16} className="animate-spin" />
            ) : (
              <>Enable 2FA <MkIcon name="shield" size={16} /></>
            )}
          </button>
        </>
      )}

      {step === "codes" && (
        <>
          <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] mb-1">
            Recovery codes
          </h1>
          <p className="text-[15px] text-[var(--text-muted)] mb-4">
            Save these codes somewhere safe. Each can be used once if you lose access to your 2FA device.
          </p>

          <RecoveryCodesGrid codes={RECOVERY_CODES} />

          <div className="mt-4 p-3 bg-[var(--surface)] border border-[var(--border)] rounded-[10px]">
            <AuthConsentRow
              checked={saved}
              onCheckedChange={setSaved}
            >
              I've saved these recovery codes in a safe place.
            </AuthConsentRow>
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!saved || continuing}
            className="flex items-center justify-center gap-2 w-full py-3 px-5 mt-3 text-[15px] font-semibold bg-[var(--brand)] text-white border border-[var(--brand)] rounded-[10px] hover:bg-[#4A6BEE] transition-all duration-150 disabled:cursor-not-allowed"
            style={{ opacity: saved ? 1 : 0.4 }}
          >
            {continuing ? (
              <MkIcon name="refreshCw" size={16} className="animate-spin" />
            ) : (
              <>Continue <MkIcon name="arrowRight" size={16} /></>
            )}
          </button>
        </>
      )}

      {step === "done" && (
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: "rgba(52,211,153,.12)", color: "var(--success)" }}
          >
            <MkIcon name="shield" size={32} />
          </div>
          <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] mb-1">
            Account secured
          </h1>
          <p className="text-[15px] text-[var(--text-muted)] mb-6">
            Two-factor authentication is active. You'll be asked for a code on each new sign-in.
          </p>
          <button
            type="button"
            onClick={() => router.push("/sign-in")}
            className="flex items-center justify-center gap-2 w-full py-3 px-5 text-[15px] font-semibold bg-[var(--brand)] text-white border border-[var(--brand)] rounded-[10px] hover:bg-[#4A6BEE] transition-all duration-150"
          >
            Go to dashboard <MkIcon name="arrowRight" size={16} />
          </button>
        </div>
      )}

      {step !== "done" && (
        <Link
          href="/sign-in"
          className="flex items-center gap-1.5 mt-4 text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-[120ms] no-underline"
        >
          <MkIcon name="arrowLeft" size={14} /> Back to sign in
        </Link>
      )}
    </AuthLayout>
  );
}
