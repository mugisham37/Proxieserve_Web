"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AuthCard } from "@/components/molecules/AuthCard";
import { AuthTabs, type AuthTabValue } from "@/components/molecules/AuthTabs";
import { AuthBanner } from "@/components/molecules/AuthBanner";
import { AuthFooterLinks } from "@/components/molecules/AuthFooterLinks";
import { PasswordField } from "@/components/atoms/PasswordField";
import { LockoutClock } from "@/components/atoms/LockoutClock";
import { FormField } from "@/components/atoms/FormField";
import { PhoneInputWithCountry } from "@/components/molecules/PhoneCountryButton";
import { loginSchema, type LoginData } from "@/lib/auth-schema";
import { useAuth } from "@/lib/auth-context";
import {
  MOCK,
  AUTH_LOCKOUT_KEY,
  type AuthSession,
} from "@/lib/auth-types";
import { setItem, getItem } from "@/lib/storage";
import { cn } from "@/lib/utils";

export function ClientLoginForm() {
  const router = useRouter();
  const { dispatch } = useAuth();
  const [tab, setTab] = React.useState<AuthTabValue>("email");
  const [bannerState, setBannerState] = React.useState<{
    type: "invalid-credentials" | "account-locked" | null;
    lockoutUntil?: string;
  }>({ type: null });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifierType: "email", identifier: "", password: "", rememberMe: true },
  });

  // Sync tab → form field
  React.useEffect(() => {
    setValue("identifierType", tab);
    setValue("identifier", "");
  }, [tab, setValue]);

  async function onSubmit(data: LoginData) {
    setBannerState({ type: null });

    // Check for existing lockout
    const lockoutRaw = getItem(AUTH_LOCKOUT_KEY);
    if (lockoutRaw) {
      const { until } = JSON.parse(lockoutRaw) as { until: string };
      if (new Date(until) > new Date()) {
        setBannerState({ type: "account-locked", lockoutUntil: until });
        return;
      }
    }

    await new Promise((r) => setTimeout(r, 900));

    // Mock: trigger account-locked
    if (data.identifier === MOCK.LOCKED_EMAIL) {
      const until = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      setItem(AUTH_LOCKOUT_KEY, JSON.stringify({ until }));
      setBannerState({ type: "account-locked", lockoutUntil: until });
      return;
    }

    // Mock: 20% chance of invalid credentials (deterministic for testing)
    const shouldFail = data.password === "wrongpassword";
    if (shouldFail) {
      setBannerState({ type: "invalid-credentials" });
      return;
    }

    // Success — create mock session
    const session: AuthSession = {
      userId: "usr_" + Math.random().toString(36).slice(2),
      name: "Test Client",
      email: data.identifierType === "email" ? data.identifier : "client@test.rw",
      phone: data.identifierType === "phone" ? data.identifier : undefined,
      role: "client",
      isEmailVerified: false,
      language: "en",
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "SET_SESSION", payload: session });

    // Redirect to OTP verification
    const encoded = encodeURIComponent(
      data.identifierType === "email"
        ? data.identifier.replace(/(.{2}).*(@.*)/, "$1•••$2")
        : "+250 78 ••• •••"
    );
    router.push(`/verify?next=/&email=${encoded}`);
  }

  const password = watch("password");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className="w-full max-w-[460px]"
    >
      <AuthCard variant="client" title="Welcome back" subtitle="Sign in to your ProxiServe account.">
        <div className="flex flex-col gap-4">
          {/* Error banners */}
          <AuthBanner
            variant="danger"
            message="Incorrect email or password."
            visible={bannerState.type === "invalid-credentials"}
          />
          {bannerState.type === "account-locked" && bannerState.lockoutUntil && (
            <div className="rounded-[var(--r-md)] bg-[var(--danger-soft)] border-l-[3px] border-[var(--danger)] px-4 py-3">
              <p className="font-sans text-[13px] text-[var(--danger)]">
                Your account has been locked.{" "}
                Try again in{" "}
                <LockoutClock
                  until={bannerState.lockoutUntil}
                  onExpired={() => setBannerState({ type: null })}
                />
                {" or "}
                <Link href="/forgot-password" className="underline">reset your password</Link>.
              </p>
            </div>
          )}

          {/* Tab switcher */}
          <AuthTabs active={tab} onChange={setTab} />

          {/* Identifier field */}
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
                id="phone-identifier"
                label="Phone number"
                error={errors.identifier?.message}
                {...register("identifier")}
              />
            )}
          </motion.div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <PasswordField
              id="ci-pass"
              label="Password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>

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
                Signing in…
              </span>
            ) : (
              "Sign in →"
            )}
          </button>

          {/* Footer */}
          <p className="font-sans text-[13px] text-center text-[var(--ink-muted)]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[var(--brand-ink)] hover:text-[var(--brand)] transition-colors font-medium"
            >
              Create one →
            </Link>
          </p>
        </div>
        <AuthFooterLinks className="mt-4" />
      </AuthCard>
    </motion.div>
  );
}
