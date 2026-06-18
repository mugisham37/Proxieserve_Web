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
import { useInitiatePayment, usePaymentStatus } from "@/hooks/usePayment";
import { cn } from "@/lib/utils";

type Stage = "number" | "wait";

export function PayMobileMoney() {
  const router = useRouter();
  const { session, dispatch } = usePayment();
  const initiatePayment = useInitiatePayment();
  const [stage, setStage] = React.useState<Stage>("number");
  const [timerSeconds, setTimerSeconds] = React.useState(120);
  const [timerKey, setTimerKey] = React.useState(0);
  const [maskedPhone, setMaskedPhone] = React.useState("");
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const { applicationId, serviceName, serviceFee, governmentFee, vatRate, platformFee, transactionId } = session;
  const { data: statusData } = usePaymentStatus(
    transactionId ?? "",
    stage === "wait" && Boolean(transactionId),
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<MomoFormData>({
    resolver: zodResolver(momoSchema),
    defaultValues: { localNumber: "", isAccountPhone: true },
  });

  React.useEffect(() => {
    if (!statusData) return;
    if (statusData.status === "paid") {
      dispatch({
        type: "SET_TRANSACTION",
        payload: {
          transactionId: statusData.transactionId,
          receiptNumber: statusData.transactionId,
          paidAt: statusData.paidAt ?? new Date().toISOString(),
        },
      });
      router.push(`/pay/${applicationId}/receipt`);
    } else if (statusData.status === "timed_out" || statusData.status === "failed") {
      dispatch({ type: "SET_STATUS", payload: statusData.status as "timeout" });
      router.push(`/pay/${applicationId}/timeout`);
    }
  }, [statusData, dispatch, router, applicationId]);

  function maskPhone(num: string) {
    if (num.length < 6) return `78 8 *** ${num.slice(-3) || "***"}`;
    const last3 = num.slice(-3);
    return `78 8 *** ${last3}`;
  }

  function startPayment(data: MomoFormData) {
    const masked = maskPhone(data.localNumber);
    setMaskedPhone(masked);
    setSubmitError(null);

    const method = session.selectedMethod === "airtel-money" ? "airtel-money" : "mtn-momo";

    initiatePayment.mutate(
      {
        application_code: applicationId,
        method,
        phone_number: `+250${data.localNumber}`,
      },
      {
        onSuccess: (result) => {
          dispatch({
            type: "PATCH",
            payload: {
              transactionId: result.transactionId,
              status: "processing",
              maskedPhone: masked,
            },
          });
          if (result.expiresAt) {
            const seconds = Math.max(
              0,
              Math.floor((new Date(result.expiresAt).getTime() - Date.now()) / 1000),
            );
            setTimerSeconds(seconds > 0 ? seconds : 120);
          } else {
            setTimerSeconds(120);
          }
          setStage("wait");
          setTimerKey((k) => k + 1);
        },
        onError: (err) => {
          setSubmitError(err.message ?? "Could not send payment prompt. Please try again.");
        },
      },
    );
  }

  function onSubmit(data: MomoFormData) {
    startPayment(data);
  }

  function handleExpire() {
    router.push(`/pay/${applicationId}/timeout`);
  }

  function handleResend() {
    startPayment(getValues());
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

        <div id="momo-grid" className="min-w-0" style={{ gridColumn: "1" }}>
          <AnimatePresence mode="wait" initial={false}>
            {stage === "number" ? (
              <motion.div key="stage-number" {...motionProps}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8" noValidate>
                  <div className="flex flex-col gap-2">
                    <span className="eyebrow text-[var(--ink-subtle)]">Mobile Money</span>
                    <h1 className="font-serif text-[clamp(28px,4vw,40px)] font-medium italic text-[var(--ink)]">
                      Enter your <em>MoMo number</em>
                    </h1>
                    <p className="font-sans text-[15px] text-[var(--ink-muted)]">
                      We&apos;ll send a push notification. Charges only apply after you approve.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="momo-number" className="font-sans text-[13px] font-medium text-[var(--ink)]">
                      MoMo number
                    </label>
                    <div className="flex items-stretch gap-0">
                      <div className="flex items-center gap-2 px-3 rounded-l-[var(--r-md)] border border-r-0 border-[var(--rule-strong)] bg-[var(--cream-2)]">
                        <span className="text-[16px]" aria-hidden="true">🇷🇼</span>
                        <span className="font-mono text-[14px] text-[var(--ink-muted)]">+250</span>
                      </div>
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
                            : "border-[var(--rule-strong)]",
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

                  <div className="rounded-[var(--r-md)] bg-[var(--info-soft)] border border-[var(--info)] px-4 py-3">
                    <p className="font-sans text-[13px] text-[var(--info)]">
                      <strong className="font-medium">Tip:</strong> If you don&apos;t receive the push, dial{" "}
                      <span className="font-mono">*182#</span> to check pending payments.
                    </p>
                  </div>

                  {submitError && (
                    <p role="alert" className="font-sans text-[13px] text-[var(--danger)]">
                      {submitError}
                    </p>
                  )}

                  <DarkFeeSummary
                    serviceName={serviceName}
                    serviceFee={serviceFee}
                    governmentFee={governmentFee}
                    vatRate={vatRate}
                    platformFee={platformFee}
                    className="block lg:hidden"
                  />

                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    <PillButton type="submit" variant="solid" size="md" arrow disabled={initiatePayment.isPending}>
                      {initiatePayment.isPending ? "Sending…" : "Send payment prompt"}
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
                      initialSeconds={timerSeconds}
                      onExpire={handleExpire}
                    />
                    <span className="font-sans text-[12px] text-[var(--ink-muted)]">
                      Prompt expires in
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={initiatePayment.isPending}
                      className="font-sans text-[13px] text-[var(--ink-muted)] underline underline-offset-2 hover:text-[var(--ink)] transition-colors disabled:opacity-50"
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
