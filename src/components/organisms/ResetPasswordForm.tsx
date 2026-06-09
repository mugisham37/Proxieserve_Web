"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AuthCard } from "@/components/molecules/AuthCard";
import { AuthBanner } from "@/components/molecules/AuthBanner";
import { AuthFooterLinks } from "@/components/molecules/AuthFooterLinks";
import { StepPills } from "@/components/molecules/StepPills";
import { PasswordField } from "@/components/atoms/auth/PasswordField";
import { PasswordStrengthMeter } from "@/components/atoms/auth/PasswordStrengthMeter";
import { resetSchema, type ResetData } from "@/lib/auth-schema";
import { useResetPassword } from "@/hooks/useAuth";
import { isApiError } from "@/lib/api/types";
import { cn } from "@/lib/utils";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const resetPasswordMutation = useResetPassword();
  const token = searchParams.get("token") ?? "";
  const [errorState, setErrorState] = React.useState<{
    type: "expired" | "generic" | null;
    message?: string;
  }>({
    type: token ? null : "expired",
    message: token ? undefined : "This reset link has expired or was already used.",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetData>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const password = watch("password");

  async function onSubmit(data: ResetData) {
    if (!token) {
      setErrorState({
        type: "expired",
        message: "This reset link has expired or was already used.",
      });
      return;
    }

    setErrorState({ type: null });

    try {
      await resetPasswordMutation.mutateAsync({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
    } catch (error) {
      if (isApiError(error) && error.errorType === "reset-expired") {
        setErrorState({
          type: "expired",
          message: "This reset link has expired or was already used.",
        });
        return;
      }

      setErrorState({
        type: "generic",
        message: isApiError(error)
          ? error.message
          : "Something went wrong on our end. Please try again.",
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
        title="Set new password"
        subtitle="Choose a strong password for your account."
      >
        <div className="flex flex-col gap-4">
          <StepPills current={2} />

          {/* Expired token banner */}
          <AuthBanner
            variant="warn"
            message={errorState.message ?? "This reset link has already been used or has expired."}
            action={{ label: "Send a new link →", href: "/forgot-password" }}
            visible={errorState.type === "expired"}
          />
          <AuthBanner
            variant="danger"
            message={errorState.message ?? "Something went wrong on our end. Please try again."}
            visible={errorState.type === "generic"}
          />

          {errorState.type !== "expired" && (
            <>
              <div className="flex flex-col gap-2">
                <PasswordField
                  id="r-pass"
                  label="New password"
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  error={errors.password?.message}
                  {...register("password")}
                />
                {password && <PasswordStrengthMeter password={password} />}
              </div>

              <PasswordField
                id="r-pass2"
                label="Confirm password"
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting || resetPasswordMutation.isPending}
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
                {isSubmitting || resetPasswordMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[var(--paper)] border-t-transparent rounded-full animate-spin" />
                    Updating…
                  </span>
                ) : (
                  "Set new password →"
                )}
              </button>
            </>
          )}

          {errorState.type === "expired" && (
            <Link
              href="/login"
              className="font-sans text-[13px] text-center text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors underline underline-offset-2"
            >
              ← Back to sign in
            </Link>
          )}
        </div>
        <AuthFooterLinks className="mt-4" />
      </AuthCard>
    </motion.div>
  );
}
