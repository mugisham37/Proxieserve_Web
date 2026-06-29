"use client";

import * as React from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AuthCard } from "@/components/molecules/auth/AuthCard";
import { AuthTabs, type AuthTabValue } from "@/components/molecules/auth/AuthTabs";
import { AuthBanner } from "@/components/molecules/auth/AuthBanner";
import { AuthFooterLinks } from "@/components/molecules/auth/AuthFooterLinks";
import { PasswordField } from "@/components/atoms/auth/PasswordField";
import { PasswordStrengthMeter } from "@/components/atoms/auth/PasswordStrengthMeter";
import { FormField } from "@/components/atoms/auth/FormField";
import { SegmentedGroup } from "@/components/atoms/wizard/SegmentedGroup";
import { PhoneInputWithCountry } from "@/components/molecules/auth/PhoneCountryButton";
import { signupSchema, type SignupData } from "@/lib/auth-schema";
import { useSignup } from "@/hooks/useAuth";
import { isApiError, isRateLimitedData } from "@/lib/api/types";
import { formatTrackerCode } from "@/lib/tracker";
import { cn } from "@/lib/utils";

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "rw", label: "Kinyarwanda" },
  { value: "fr", label: "Français" },
];

export function ClientSignupForm() {
  const [tab, setTab] = React.useState<AuthTabValue>("email");
  const signupMutation = useSignup();
  const [bannerState, setBannerState] = React.useState<{
    type:
      | "account-exists"
      | "identifier-reserved"
      | "rate-limited"
      | "network-error"
      | "timeout"
      | "unexpected"
      | null;
    message?: string;
  }>({ type: null });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      identifierType: "email",
      identifier: "",
      password: "",
      language: "en",
      code: "",
      terms: false,
    },
  });

  React.useEffect(() => {
    setValue("identifierType", tab);
    setValue("identifier", "");
  }, [tab, setValue]);

  const password = watch("password");

  async function onSubmit(data: SignupData) {
    setBannerState({ type: null });

    try {
      await signupMutation.mutateAsync({
        ...data,
        code: data.code || undefined,
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
        case "account-exists":
          setBannerState({ type: "account-exists", message: error.message });
          break;
        case "identifier-reserved":
          setBannerState({ type: "identifier-reserved", message: error.message });
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className="w-full max-w-[520px]"
    >
      <AuthCard
        variant="client"
        size="lg"
        title="Create your account"
        subtitle="Hebuza handles your applications — you just fill in the form."
      >
        <div className="flex flex-col gap-4">
          <AuthBanner
            variant="info"
            message={bannerState.message ?? "An account with this email already exists."}
            action={{ label: "Sign in instead →", href: "/login" }}
            visible={bannerState.type === "account-exists"}
          />
          <AuthBanner
            variant="info"
            message={
              bannerState.message ??
              "This email is reserved for staff access. Use the staff sign-in portal instead."
            }
            action={{ label: "Staff sign in →", href: "/staff/login" }}
            visible={bannerState.type === "identifier-reserved"}
          />
          <AuthBanner
            variant="warn"
            message={bannerState.message ?? "Too many attempts. Try again shortly."}
            visible={bannerState.type === "rate-limited"}
          />
          <AuthBanner
            variant="danger"
            message={bannerState.message ?? "Something went wrong on our end. Please try again."}
            visible={bannerState.type === "network-error" || bannerState.type === "timeout" || bannerState.type === "unexpected"}
          />

          {/* Full name */}
          {(() => { const { name: fieldName, ...r } = register("name"); void fieldName; return (
            <FormField
              label="Full name"
              name="name"
              type="input"
              inputType="text"
              placeholder="Amina Nkurunziza"
              error={errors.name?.message}
              {...r}
            />
          ); })()}

          {/* Email / Phone tabs */}
          <div>
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
                  id="su-phone"
                  label="Phone number"
                  error={errors.identifier?.message}
                  {...register("identifier")}
                />
              )}
            </motion.div>
          </div>

          {/* Password + strength */}
          <div className="flex flex-col gap-2">
            <PasswordField
              id="su-pass"
              label="Password"
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              error={errors.password?.message}
              {...register("password")}
            />
            {password && <PasswordStrengthMeter password={password} />}
          </div>

          {/* Language preference */}
          <div className="flex flex-col gap-1.5">
            <span className="font-sans text-[13px] font-medium text-[var(--ink)] leading-none">
              Preferred language
            </span>
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <SegmentedGroup
                  options={LANGUAGE_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Optional tracking code */}
          {(() => {
            const { name: fieldName, ...r } = register("code", {
              onChange: (e) => { e.target.value = formatTrackerCode(e.target.value); },
            });
            void fieldName;
            return (
              <FormField
                label="Tracking code (optional)"
                name="code"
                type="input"
                inputType="text"
                placeholder="PRX-YYYY-NNNNN"
                mono
                error={errors.code?.message}
                help="Already started an application? Link it to your new account."
                {...r}
              />
            );
          })()}

          {/* Terms */}
          <div className="flex items-start gap-3 mt-1">
            <input
              type="checkbox"
              id="su-terms"
              {...register("terms")}
              className="mt-0.5 w-4 h-4 rounded accent-[var(--ink)] cursor-pointer shrink-0"
            />
            <label htmlFor="su-terms" className={cn(
              "font-sans text-[13px] leading-snug cursor-pointer",
              errors.terms ? "text-[var(--danger)]" : "text-[var(--ink-muted)]"
            )}>
              I agree to Hebuza handling my information in accordance with the{" "}
              <Link href="/legal/privacy" className="text-[var(--brand-ink)] underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/legal/terms" className="text-[var(--brand-ink)] underline underline-offset-2">
                Terms of Service
              </Link>.
            </label>
          </div>
          {errors.terms && (
            <p role="alert" className="font-sans text-[12px] text-[var(--danger)] -mt-2">
              {errors.terms.message}
            </p>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || signupMutation.isPending}
            className={cn(
              "w-full h-12 rounded-[var(--r-pill)] mt-1",
              "font-serif italic text-[17px] text-[var(--paper)]",
              "bg-[var(--brand)] hover:bg-[var(--brand-ink)]",
              "transition-colors duration-[120ms] outline-none",
              "focus-visible:shadow-[var(--focus-ring)]",
              "disabled:opacity-60 disabled:cursor-not-allowed",
              "flex items-center justify-center gap-2"
            )}
          >
            {isSubmitting || signupMutation.isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[var(--paper)] border-t-transparent rounded-full animate-spin" />
                Creating account…
              </span>
            ) : (
              "Create account →"
            )}
          </button>

          <p className="font-sans text-[13px] text-center text-[var(--ink-muted)]">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--brand-ink)] hover:text-[var(--brand)] transition-colors font-medium">
              Sign in →
            </Link>
          </p>

          {/* Staff portal link */}
          <p className="font-sans text-[12px] text-center text-[var(--ink-subtle)]">
            Agent or admin?{" "}
            <Link
              href="/staff/login"
              className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors underline underline-offset-2"
            >
              Staff sign in →
            </Link>
          </p>
        </div>
        <AuthFooterLinks className="mt-4" />
      </AuthCard>
    </motion.div>
  );
}
