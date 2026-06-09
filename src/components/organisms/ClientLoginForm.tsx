"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AuthCard } from "@/components/molecules/auth/AuthCard";
import { AuthTabs, type AuthTabValue } from "@/components/molecules/auth/AuthTabs";
import { AuthBanner } from "@/components/molecules/auth/AuthBanner";
import { AuthFooterLinks } from "@/components/molecules/auth/AuthFooterLinks";
import { PasswordField } from "@/components/atoms/auth/PasswordField";
import { LockoutClock } from "@/components/atoms/auth/LockoutClock";
import { FormField } from "@/components/atoms/auth/FormField";
import { PhoneInputWithCountry } from "@/components/molecules/auth/PhoneCountryButton";
import { loginSchema, type LoginData } from "@/lib/auth-schema";
import { useAuth } from "@/lib/auth-context";
import { useLogin } from "@/hooks/useAuth";
import { isAccountLockedData, isApiError, isRateLimitedData } from "@/lib/api/types";
import { cn } from "@/lib/utils";

export function ClientLoginForm() {
  const searchParams = useSearchParams();
  const { setUiState } = useAuth();
  const loginMutation = useLogin();

  const [tab, setTab] = React.useState<AuthTabValue>("email");
  const [bannerState, setBannerState] = React.useState<{
    type: "invalid-credentials" | "account-locked" | "rate-limited" | "network-error" | "timeout" | "unexpected" | null;
    message?: string;
    lockoutUntil?: string;
  }>({ type: null });

  // Query-param driven success banners
  const resetSuccess = searchParams.get("reset") === "success";
  const claimedSuccess = searchParams.get("claimed") === "1";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifierType: "email", identifier: "", password: "", rememberMe: true },
  });

  // Sync tab → identifierType field
  React.useEffect(() => {
    setValue("identifierType", tab);
    setValue("identifier", "");
  }, [tab, setValue]);

  async function onSubmit(data: LoginData) {
    setBannerState({ type: null });
    setUiState({
      errorType: null,
      lockoutUntil: null,
      submitError: null,
    });

    try {
      await loginMutation.mutateAsync({
        ...data,
        rememberMe: data.rememberMe ?? true,
      });
    } catch (error) {
      if (!isApiError(error)) {
        setBannerState({
          type: "unexpected",
          message: "Something went wrong on our end. Please try again.",
        });
        return;
      }

      switch (error.errorType) {
        case "invalid-credentials":
          setBannerState({
            type: "invalid-credentials",
            message: error.message,
          });
          break;
        case "account-locked":
          if (isAccountLockedData(error.data)) {
            setBannerState({
              type: "account-locked",
              message: error.message,
              lockoutUntil: error.data.lockoutUntil,
            });
          }
          break;
        case "rate-limited":
          setBannerState({
            type: "rate-limited",
            message: isRateLimitedData(error.data)
              ? `Too many attempts. Try again in ${error.data.retryAfterSeconds} seconds.`
              : error.message,
          });
          break;
        case "network-error":
          setBannerState({ type: "network-error", message: error.message });
          break;
        case "timeout":
          setBannerState({ type: "timeout", message: error.message });
          break;
        default:
          setBannerState({
            type: "unexpected",
            message: error.statusCode >= 500
              ? "Something went wrong on our end. Please try again."
              : error.message,
          });
      }
    }
  }

  // Destructure register results to avoid name duplication on FormField
  const { name: emailFieldName, ...emailRegister } = register("identifier");
  void emailFieldName;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className="w-full max-w-[460px]"
    >
      <AuthCard variant="client" title="Welcome back" subtitle="Sign in to your ProxiServe account.">
        <div className="flex flex-col gap-4">
          {/* Success banners from redirects */}
          <AuthBanner
            variant="ok"
            message="Your password has been reset. Sign in with your new password."
            visible={resetSuccess}
          />
          <AuthBanner
            variant="ok"
            message="Application linked! Sign in to view it in your dashboard."
            visible={claimedSuccess}
          />

          {/* Error banners */}
          <AuthBanner
            variant="danger"
            message={bannerState.message ?? "Incorrect email or password."}
            visible={bannerState.type === "invalid-credentials"}
          />
          <AuthBanner
            variant="warn"
            message={bannerState.message ?? "Too many attempts. Try again shortly."}
            visible={bannerState.type === "rate-limited"}
          />
          <AuthBanner
            variant="danger"
            message={bannerState.message ?? "Connection error. Check your internet and try again."}
            visible={bannerState.type === "network-error" || bannerState.type === "timeout" || bannerState.type === "unexpected"}
          />
          {bannerState.type === "account-locked" && bannerState.lockoutUntil && (
            <div className="rounded-[var(--r-md)] bg-[var(--danger-soft)] border-l-[3px] border-[var(--danger)] px-4 py-3">
              <p className="font-sans text-[13px] text-[var(--danger)]">
                Your account has been locked. Try again in{" "}
                <LockoutClock
                  until={bannerState.lockoutUntil}
                  onExpired={() => {
                    setBannerState({ type: null });
                    setUiState({ lockoutUntil: null, errorType: null, submitError: null });
                  }}
                />
                {" "}or{" "}
                <Link href="/forgot-password" className="underline">reset your password</Link>.
              </p>
            </div>
          )}

          {/* Tab switcher */}
          <AuthTabs active={tab} onChange={setTab} />

          {/* Identifier input — tab-driven */}
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
                placeholder="you@example.com"
                error={errors.identifier?.message}
                {...emailRegister}
              />
            ) : (
              <PhoneInputWithCountry
                id="phone-identifier"
                label="Phone number"
                error={errors.identifier?.message}
                {...register("identifier")}
              />
            )}
          </motion.div>

          {/* Password */}
          <PasswordField
            id="ci-pass"
            label="Password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Remember me + forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="w-4 h-4 rounded accent-[var(--ink)] cursor-pointer"
              />
              <span className="font-sans text-[13px] text-[var(--ink-muted)]">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="font-sans text-[13px] text-[var(--brand-ink)] hover:text-[var(--brand)] transition-colors underline underline-offset-2"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || loginMutation.isPending}
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
            {isSubmitting || loginMutation.isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[var(--paper)] border-t-transparent rounded-full animate-spin" />
                Signing in…
              </span>
            ) : (
              "Sign in →"
            )}
          </button>

          {/* Footer link */}
          <p className="font-sans text-[13px] text-center text-[var(--ink-muted)]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[var(--brand-ink)] hover:text-[var(--brand)] transition-colors font-medium">
              Create one →
            </Link>
          </p>
        </div>
        <AuthFooterLinks className="mt-4" />
      </AuthCard>
    </motion.div>
  );
}
