"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { PhonePulse } from "@/components/atoms/shared/PhonePulse";
import { CountdownTimer } from "@/components/atoms/payment/CountdownTimer";
import { PushStepList } from "@/components/molecules/marketing/PushStepList";
import { DarkFeeSummary } from "@/components/molecules/payment/DarkFeeSummary";
import { PillButton } from "@/components/atoms/shared/PillButton";
import { usePayment } from "@/lib/payment-context";
import { momoSchema, type MomoFormData } from "@/lib/payment-schema";
import { formatRWF } from "@/lib/types/payment";
import { cn } from "@/lib/utils";

type Stage = "number" | "wait";

const DEMO_ADVANCE_AT = 7; // seconds left when demo auto-advances to receipt

export function PayMobileMoney() {
  const router = useRouter();
  const { session, dispatch } = usePayment();
  const [stage, setStage] = React.useState<Stage>("number");
  const [timerKey, setTimerKey] = React.useState(0);
  const [maskedPhone, setMaskedPhone] = React.useState("");

  const { applicationId, serviceName, serviceFee, governmentFee, vatRate, platformFee } = session;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MomoFormData>({
    resolver: zodResolver(momoSchema),
    defaultValues: { localNumber: "", isAccountPhone: true },
  });

  function maskPhone(num: string) {
    if (num.length < 6) return `78 8 *** ${num.slice(-3) || "***"}`;
    const last3 = num.slice(-3);
    return `78 8 *** ${last3}`;
  }

  function onSubmit(data: MomoFormData) {
    const masked = maskPhone(data.localNumber);
    setMaskedPhone(masked);
    dispatch({ type: "SET_STATUS", payload: "processing" });
    setStage("wait");
  }

  function handleExpire() {
    router.push(`/pay/${applicationId}/timeout`);
  }

  function handleTick(secondsLeft: number) {
    if (secondsLeft === DEMO_ADVANCE_AT) {
      dispatch({ type: "SET_STATUS", payload: "success" });
      router.push(`/pay/${applicationId}/receipt`);
    }
  }

  function handleResend() {
    setTimerKey((k) => k + 1);
  }

  const motionProps = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.2, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  };

  return (
    <div className="w-full max-w-[var(--w-app)] mx-auto px-4 sm:px-8 py-10">
      <div className="grid grid-cols-1 gap-10">
        <style>{`@media(min-width:920px){#momo-grid{grid-template-columns:1fr var(--pay-sidebar)!important}}`}</style>

        {/* Main column */}
        <div id="momo-grid" className="min-w-0" style={{ gridColumn: "1" }}>
          <AnimatePresence mode="wait" initial={false}>
            {stage === "number" ? (
              <motion.div key="stage-number" {...motionProps}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8" noValidate>
                  {/* Heading */}
                  <div className="flex flex-col gap-2">
                    <span className="eyebrow text-[var(--ink-subtle)]">Mobile Money</span>
                    <h1 className="font-serif text-[clamp(28px,4vw,40px)] font-medium italic text-[var(--ink)]">
                      Enter your <em>MoMo number</em>
                    </h1>
                    <p className="font-sans text-[15px] text-[var(--ink-muted)]">
                      We&apos;ll send a push notification. Charges only apply after you approve.
                    </p>
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="momo-number" className="font-sans text-[13px] font-medium text-[var(--ink)]">
                      MoMo number
                    </label>
                    <div className="flex items-stretch gap-0">
                      {/* Country prefix */}
                      <div className="flex items-center gap-2 px-3 rounded-l-[var(--r-md)] border border-r-0 border-[var(--rule-strong)] bg-[var(--cream-2)]">
                        <span className="text-[16px]" aria-hidden="true">🇷🇼</span>
                        <span className="font-mono text-[14px] text-[var(--ink-muted)]">+250</span>
                      </div>
                      {/* Number input */}
                      <input
                        id="momo-number"
                        type="tel"
                        inputMode="numeric"
                        placeholder="78 8 123 456"
                        maxLength={9}
                        autoComplete="tel-national"
                        aria-label="MTN MoMo number (9 digits)"
                        aria-invalid={!!errors.localNumber}
                        {...register("localNumber", {
                          onChange: (e) => {
                            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 9);
                          },
                        })}
                        className={cn(
                          "flex-1 min-w-0 rounded-r-[var(--r-md)] border bg-[var(--paper)] px-4 py-3",
                          "font-mono text-[16px] text-[var(--ink)]",
                          "placeholder:font-sans placeholder:text-[var(--ink-subtle)]",
                          "focus:outline-none focus:shadow-[var(--focus-ring)]",
                          "transition-[border-color,box-shadow] duration-[120ms]",
                          errors.localNumber
                            ? "border-[var(--danger)]"
                            : "border-[var(--rule-strong)]"
                        )}
                      />
                    </div>
                    {errors.localNumber ? (
                      <p role="alert" className="font-sans text-[12px] text-[var(--danger)]">
                        {errors.localNumber.message}
                      </p>
                    ) : (
                      <p className="font-sans text-[12px] text-[var(--ink-muted)]">
                        Must be a registered MTN MoMo number. Charges apply only after you approve.
                      </p>
                    )}
                  </div>

                  {/* Checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("isAccountPhone")}
                      className="mt-0.5 w-4 h-4 accent-[var(--ink)] flex-shrink-0"
                    />
                    <span className="font-sans text-[13px] text-[var(--ink-muted)]">
                      This is also my account phone number
                    </span>
                  </label>

                  {/* Info tip */}
                  <div className="rounded-[var(--r-md)] bg-[var(--info-soft)] border border-[var(--info)] px-4 py-3">
                    <p className="font-sans text-[13px] text-[var(--info)]">
                      <strong className="font-medium">Tip:</strong> If you don&apos;t receive the push, dial{" "}
                      <span className="font-mono">*182#</span> to check pending payments.
                    </p>
                  </div>

                  {/* Inline fee summary narrow */}
                  <DarkFeeSummary
                    serviceName={serviceName}
                    serviceFee={serviceFee}
                    governmentFee={governmentFee}
                    vatRate={vatRate}
                    platformFee={platformFee}
                    className="block lg:hidden"
                  />

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    <PillButton type="submit" variant="solid" size="md" arrow>
                      Send payment prompt
                    </PillButton>
                    <PillButton
                      type="button"
                      variant="ghost"
                      size="md"
                      onClick={() => router.push(`/pay/${applicationId}/method-choice`)}
                    >
                      ← Choose another method
                    </PillButton>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div key="stage-wait" {...motionProps}>
                <div
                  className="flex flex-col items-center gap-8 py-4 text-center"
                  aria-live="polite"
                  aria-label="Waiting for mobile money payment approval"
                >
                  <PhonePulse active />

                  <div className="flex flex-col gap-3">
                    <h1 className="font-serif text-[clamp(26px,4vw,38px)] font-medium italic text-[var(--ink)]">
                      Waiting for your <em>approval</em>
                    </h1>
                    <p className="font-sans text-[15px] text-[var(--ink-muted)]">
                      Check your phone for a push from MTN MoMo.
                    </p>
                    <p className="font-mono text-[15px] text-[var(--ink)]">
                      +250 {maskedPhone} · {formatRWF(serviceFee)}
                    </p>
                  </div>

                  <PushStepList activeStep={1} />

                  <div className="flex flex-col items-center gap-1">
                    <CountdownTimer
                      key={timerKey}
                      initialSeconds={120}
                      onExpire={handleExpire}
                      onTick={handleTick}
                    />
                    <span className="font-sans text-[12px] text-[var(--ink-muted)]">
                      Prompt expires in
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button
                      type="button"
                      onClick={handleResend}
                      className="font-sans text-[13px] text-[var(--ink-muted)] underline underline-offset-2 hover:text-[var(--ink)] transition-colors"
                    >
                      Resend prompt
                    </button>
                    <span className="text-[var(--rule-strong)] hidden sm:inline" aria-hidden="true">·</span>
                    <button
                      type="button"
                      onClick={() => router.push(`/pay/${applicationId}/method-choice`)}
                      className="font-sans text-[13px] text-[var(--ink-muted)] underline underline-offset-2 hover:text-[var(--ink)] transition-colors"
                    >
                      Use another method
                    </button>
                  </div>

                  {/* Demo helper */}
                  <p className="font-mono text-[11px] text-[var(--ink-subtle)] bg-[var(--cream-2)] px-3 py-1.5 rounded-[var(--r-pill)]">
                    Demo: auto-advances to receipt at {DEMO_ADVANCE_AT}s
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sticky sidebar */}
        <aside className="hidden lg:block self-start sticky top-8" style={{ width: "var(--pay-sidebar)" }}>
          <DarkFeeSummary
            serviceName={serviceName}
            serviceFee={serviceFee}
            governmentFee={governmentFee}
            vatRate={vatRate}
            platformFee={platformFee}
          />
        </aside>
      </div>
    </div>
  );
}
