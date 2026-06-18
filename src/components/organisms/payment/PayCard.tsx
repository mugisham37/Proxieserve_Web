"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CardField, type CardBrand } from "@/components/atoms/auth/CardField";
import { CardVisual } from "@/components/molecules/payment/CardVisual";
import { ThreeDSFrame } from "@/components/molecules/payment/ThreeDSFrame";
import { DarkFeeSummary } from "@/components/molecules/payment/DarkFeeSummary";
import { PillButton } from "@/components/atoms/shared/PillButton";
import { usePayment } from "@/lib/payment-context";
import { cardSchema, type CardFormData } from "@/lib/payment-schema";
import { formatRWF } from "@/lib/types/payment";
import { useInitiatePayment, usePaymentStatus } from "@/hooks/usePayment";
import { cn } from "@/lib/utils";

type Stage = "form" | "3ds";

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
}

export function PayCard() {
  const router = useRouter();
  const { session, dispatch } = usePayment();
  const initiatePayment = useInitiatePayment();
  const [stage, setStage] = React.useState<Stage>("form");
  const [cardBrand, setCardBrand] = React.useState<CardBrand>(null);
  const [cardNumberFormatted, setCardNumberFormatted] = React.useState("");
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const { applicationId, serviceName, serviceFee, governmentFee, vatRate, platformFee, transactionId } = session;
  const { data: statusData } = usePaymentStatus(
    transactionId ?? "",
    stage === "3ds" && Boolean(transactionId),
  );

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CardFormData>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      expiry: "",
      cvc: "",
      cardholderName: "",
      saveCard: false,
    },
  });

  const expiry = watch("expiry") ?? "";
  const cardholderName = watch("cardholderName") ?? "";
  const expiryDisplay = expiry;

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
    } else if (statusData.status === "failed" || statusData.status === "timed_out") {
      dispatch({ type: "SET_STATUS", payload: statusData.status === "timed_out" ? "timeout" : "declined" });
      router.push(`/pay/${applicationId}/${statusData.status === "timed_out" ? "timeout" : "declined"}`);
    }
  }, [statusData, dispatch, router, applicationId]);

  function onSubmit() {
    setSubmitError(null);
    initiatePayment.mutate(
      {
        application_code: applicationId,
        method: "card",
        card_token: "stub-card-token",
      },
      {
        onSuccess: () => {
          dispatch({ type: "SET_STATUS", payload: "processing" });
          if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
          setStage("3ds");
        },
        onError: (err) => {
          setSubmitError(err.message ?? "Payment could not be started. Please try again.");
        },
      },
    );
  }

  function handle3DSCancel() {
    setStage("form");
    dispatch({ type: "SET_STATUS", payload: "idle" });
  }

  const motionProps = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  };

  return (
    <div className="w-full max-w-[var(--w-app)] mx-auto px-4 sm:px-8 py-10">
      <div className="grid grid-cols-1 gap-10">
        <style>{`@media(min-width:920px){#card-grid{grid-template-columns:1fr var(--pay-sidebar)!important}}`}</style>

        <div id="card-grid" className="min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            {stage === "form" ? (
              <motion.div key="stage-form" {...motionProps}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8" noValidate>
                  <div className="flex flex-col gap-2">
                    <span className="eyebrow text-[var(--ink-subtle)]">Card payment</span>
                    <h1 className="font-serif text-[clamp(28px,4vw,40px)] font-medium italic text-[var(--ink)]">
                      Enter your <em>card details</em>
                    </h1>
                  </div>

                  <CardVisual
                    cardNumber={cardNumberFormatted}
                    cardholderName={cardholderName}
                    expiry={expiryDisplay}
                    brand={cardBrand}
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[13px] font-medium text-[var(--ink)]">
                      Card number
                    </label>
                    <Controller
                      name="cardNumber"
                      control={control}
                      render={({ field }) => (
                        <CardField
                          value={field.value}
                          onChange={({ formatted, brand }) => {
                            field.onChange(formatted);
                            setCardNumberFormatted(formatted);
                            setCardBrand(brand);
                          }}
                          error={errors.cardNumber?.message}
                        />
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="expiry" className="font-sans text-[13px] font-medium text-[var(--ink)]">
                        Expiry
                      </label>
                      <input
                        id="expiry"
                        type="text"
                        inputMode="numeric"
                        placeholder="MM / YY"
                        maxLength={7}
                        autoComplete="cc-exp"
                        aria-label="Card expiry date"
                        aria-invalid={!!errors.expiry}
                        {...register("expiry", {
                          onChange: (e) => {
                            const formatted = formatExpiry(e.target.value);
                            setValue("expiry", formatted, { shouldValidate: false });
                          },
                        })}
                        className={cn(
                          "w-full rounded-[var(--r-md)] border bg-[var(--paper)] px-4 py-3",
                          "font-mono text-[16px] text-[var(--ink)]",
                          "placeholder:font-sans placeholder:text-[var(--ink-subtle)] placeholder:font-mono",
                          "focus:outline-none focus:shadow-[var(--focus-ring)]",
                          "transition-[border-color,box-shadow] duration-[120ms]",
                          errors.expiry
                            ? "border-[var(--danger)]"
                            : "border-[var(--rule-strong)]",
                        )}
                      />
                      {errors.expiry && (
                        <p role="alert" className="font-sans text-[12px] text-[var(--danger)]">
                          {errors.expiry.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="cvc" className="font-sans text-[13px] font-medium text-[var(--ink)]">
                        CVC
                      </label>
                      <input
                        id="cvc"
                        type="text"
                        inputMode="numeric"
                        placeholder="•••"
                        maxLength={4}
                        autoComplete="cc-csc"
                        aria-label="Card security code"
                        aria-invalid={!!errors.cvc}
                        {...register("cvc", {
                          onChange: (e) => {
                            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
                          },
                        })}
                        className={cn(
                          "w-full rounded-[var(--r-md)] border bg-[var(--paper)] px-4 py-3",
                          "font-mono text-[16px] text-[var(--ink)]",
                          "placeholder:font-mono placeholder:text-[var(--ink-subtle)]",
                          "focus:outline-none focus:shadow-[var(--focus-ring)]",
                          "transition-[border-color,box-shadow] duration-[120ms]",
                          errors.cvc
                            ? "border-[var(--danger)]"
                            : "border-[var(--rule-strong)]",
                        )}
                      />
                      {errors.cvc && (
                        <p role="alert" className="font-sans text-[12px] text-[var(--danger)]">
                          {errors.cvc.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cardholder-name" className="font-sans text-[13px] font-medium text-[var(--ink)]">
                      Name on card
                    </label>
                    <input
                      id="cardholder-name"
                      type="text"
                      placeholder="As it appears on your card"
                      autoComplete="cc-name"
                      aria-invalid={!!errors.cardholderName}
                      {...register("cardholderName")}
                      className={cn(
                        "w-full rounded-[var(--r-md)] border bg-[var(--paper)] px-4 py-3",
                        "font-sans text-[15px] text-[var(--ink)] uppercase",
                        "placeholder:uppercase placeholder:text-[var(--ink-subtle)] placeholder:normal-case",
                        "focus:outline-none focus:shadow-[var(--focus-ring)]",
                        "transition-[border-color,box-shadow] duration-[120ms]",
                        errors.cardholderName
                          ? "border-[var(--danger)]"
                          : "border-[var(--rule-strong)]",
                      )}
                    />
                    {errors.cardholderName && (
                      <p role="alert" className="font-sans text-[12px] text-[var(--danger)]">
                        {errors.cardholderName.message}
                      </p>
                    )}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("saveCard")}
                      className="mt-0.5 w-4 h-4 accent-[var(--ink)] flex-shrink-0"
                    />
                    <span className="font-sans text-[13px] text-[var(--ink-muted)]">
                      Save card for future payments{" "}
                      <span className="text-[var(--ink-subtle)]">(stored by our processor, not us)</span>
                    </span>
                  </label>

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
                      {initiatePayment.isPending ? "Processing…" : `Pay ${formatRWF(serviceFee + platformFee)}`}
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
              <motion.div key="stage-3ds" {...motionProps} className="flex flex-col items-center gap-6">
                <div className="flex flex-col gap-2 text-center max-w-[440px]">
                  <span className="eyebrow text-[var(--ink-subtle)]">3D Secure verification</span>
                  <h1 className="font-serif text-[clamp(22px,3vw,32px)] font-medium italic text-[var(--ink)]">
                    One last <em>step</em>
                  </h1>
                  <p className="font-sans text-[14px] text-[var(--ink-muted)]">
                    Your bank requires additional verification before processing the payment.
                  </p>
                </div>
                <ThreeDSFrame
                  amount={formatRWF(serviceFee)}
                  onComplete={() => {}}
                  onCancel={handle3DSCancel}
                  className="w-full"
                />
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
