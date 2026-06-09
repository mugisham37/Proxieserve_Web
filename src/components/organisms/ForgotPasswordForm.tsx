"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { AuthCard } from "@/components/molecules/AuthCard";
import { AuthTabs, type AuthTabValue } from "@/components/molecules/AuthTabs";
import { AuthBanner } from "@/components/molecules/AuthBanner";
import { AuthFooterLinks } from "@/components/molecules/AuthFooterLinks";
import { EmailSentConfirmation } from "@/components/molecules/EmailSentConfirmation";
import { StepPills } from "@/components/molecules/StepPills";
import { FormField } from "@/components/atoms/FormField";
import { PhoneInputWithCountry } from "@/components/molecules/PhoneCountryButton";
import { forgotSchema, type ForgotData } from "@/lib/auth-schema";
import { useForgotPassword } from "@/hooks/useAuth";
import { isApiError } from "@/lib/api/types";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm() {
  const [tab, setTab] = React.useState<AuthTabValue>("email");
  const [sent, setSent] = React.useState(false);
  const [maskedEmail, setMaskedEmail] = React.useState("");
  const [lastSubmitted, setLastSubmitted] = React.useState<ForgotData | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const forgotPasswordMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ForgotData>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { identifierType: "email", identifier: "" },
  });

  React.useEffect(() => {
    setValue("identifierType", tab);
    setValue("identifier", "");
  }, [tab, setValue]);

  async function onSubmit(data: ForgotData) {
    setErrorMessage(null);

    try {
      const response = await forgotPasswordMutation.mutateAsync(data);
      setLastSubmitted(data);
      setMaskedEmail(response.maskedEmail);
      setSent(true);
    } catch (error) {
      setErrorMessage(
        isApiError(error)
          ? error.message
          : "Something went wrong on our end. Please try again.",
      );
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
        title="Reset your password"
        subtitle="We'll send a reset link to your email or phone."
      >
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-4"
            >
              <StepPills current={1} />

              <AuthBanner
                variant="danger"
                message={errorMessage ?? "Something went wrong on our end. Please try again."}
                visible={!!errorMessage}
              />

              <AuthTabs active={tab} onChange={setTab} />

              <motion.div
                key={tab}
                initial={{ opacity: 0, x: tab === "email" ? -8 : 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
              >
                {tab === "email" ? (
                  (() => { const { name: fieldName, ...r } = register("identifier"); void fieldName; return (
                    <FormField
                      label="Email address"
                      name="identifier"
                      type="input"
                      inputType="email"
                      placeholder="you@example.com"
                      error={errors.identifier?.message}
                      {...r}
                    />
                  ); })()
                ) : (
                  <PhoneInputWithCountry
                    id="r-phone"
                    label="Phone number"
                    error={errors.identifier?.message}
                    {...register("identifier")}
                  />
                )}
              </motion.div>

              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting || forgotPasswordMutation.isPending}
                className={cn(
                  "w-full h-12 rounded-[var(--r-pill)] mt-1",
                  "font-serif italic text-[17px] text-[var(--paper)]",
                  "bg-[var(--ink)] hover:bg-[var(--ink-2)]",
                  "transition-colors duration-[120ms] outline-none",
                  "focus-visible:shadow-[var(--focus-ring)]",
                  "disabled:opacity-60 disabled:cursor-not-allowed",
                  "flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting || forgotPasswordMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[var(--paper)] border-t-transparent rounded-full animate-spin" />
                    Sending…
                  </span>
                ) : (
                  "Send reset link →"
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            >
              <AuthBanner
                variant="danger"
                message={errorMessage ?? "Something went wrong on our end. Please try again."}
                visible={!!errorMessage}
                className="mb-4"
              />
              <EmailSentConfirmation
                maskedEmail={maskedEmail}
                onResend={async () => {
                  if (!lastSubmitted) {
                    return;
                  }

                  setErrorMessage(null);
                  try {
                    const response = await forgotPasswordMutation.mutateAsync(lastSubmitted);
                    setMaskedEmail(response.maskedEmail);
                  } catch (error) {
                    setErrorMessage(
                      isApiError(error)
                        ? error.message
                        : "Something went wrong on our end. Please try again.",
                    );
                  }
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {!sent && <AuthFooterLinks className="mt-4" />}
      </AuthCard>
    </motion.div>
  );
}
