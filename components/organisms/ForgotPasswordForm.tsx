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
import { AUTH_RESET_TOKEN_KEY, MOCK } from "@/lib/auth-types";
import { setItem } from "@/lib/storage";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm() {
  const [tab, setTab] = React.useState<AuthTabValue>("email");
  const [sent, setSent] = React.useState(false);
  const [maskedEmail, setMaskedEmail] = React.useState("");

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
    await new Promise((r) => setTimeout(r, 800));

    // Save mock reset token
    setItem(AUTH_RESET_TOKEN_KEY, MOCK.VALID_RESET_TOKEN);

    const masked =
      data.identifierType === "email"
        ? data.identifier.replace(/(.{2}).*(@.*)/, "$1•••$2")
        : "+250 78 ••• •••";
    setMaskedEmail(masked);
    setSent(true);
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

              <AuthTabs active={tab} onChange={setTab} />

              <motion.div
                key={tab}
                initial={{ opacity: 0, x: tab === "email" ? -8 : 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
              >
                {tab === "email" ? (
                  <FormField
                    label="Email address"
                    name="identifier"
                    type="input"
                    inputType="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    error={errors.identifier?.message}
                    {...register("identifier")}
                  />
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
                disabled={isSubmitting}
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
                {isSubmitting ? (
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
              <EmailSentConfirmation
                maskedEmail={maskedEmail}
                onResend={() => {
                  /* mock: just show it again */
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
