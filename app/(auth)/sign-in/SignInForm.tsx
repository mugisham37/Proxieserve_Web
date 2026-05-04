"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { AuthFieldInput } from "@/components/molecules/AuthFieldInput";
import { PasswordFieldInput } from "@/components/molecules/PasswordFieldInput";
import { AuthConsentRow } from "@/components/molecules/AuthConsentRow";
import { AuthDivider } from "@/components/atoms/AuthDivider";
import { AuthSocialButton } from "@/components/molecules/AuthSocialButton";
import { MkIcon } from "@/components/atoms/MkIcon";
import { SignInPanel } from "@/components/sections/auth/SignInPanel";
import { signInSchema, type SignInInput } from "@/lib/auth/schemas";

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;

export function SignInForm() {
  const router = useRouter();
  const [attempts, setAttempts] = useState(0);
  const [lockout, setLockout] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { rememberMe: false },
  });

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.from(".auth-form-content > *", {
        y: 14, duration: 0.35, stagger: 0.06, ease: "power2.out", clearProps: "transform",
      });
    });
  }, []);

  useEffect(() => {
    if (lockout <= 0) return;
    const timer = setInterval(() => {
      setLockout((s) => {
        if (s <= 1) { clearInterval(timer); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockout]);

  const onSubmit = async (_data: SignInInput) => {
    await new Promise((r) => setTimeout(r, 800));
    // Simulate failed attempt for demo
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    if (newAttempts >= MAX_ATTEMPTS) {
      setLockout(LOCKOUT_SECONDS);
      setAttempts(0);
      return;
    }
    router.push("/dashboard");
  };

  const locked = lockout > 0;

  return (
    <AuthLayout panel={<SignInPanel />}>
      <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] mb-1">
        Welcome back
      </h1>
      <p className="text-[15px] text-[var(--text-muted)] mb-6">
        Sign in to your SolAI dashboard.
      </p>

      {locked && (
        <div className="flex items-center gap-2 p-3 mb-4 text-[13px] rounded-[10px] border"
          style={{ background: "rgba(249,112,102,.08)", borderColor: "var(--danger)", color: "var(--danger)" }}>
          Too many attempts. Please wait <strong className="ml-1">{lockout}s</strong>.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <AuthFieldInput
          id="email"
          label="Email address"
          icon="mail"
          type="email"
          placeholder="kalisa@inema.rw"
          autoComplete="email"
          error={errors.email?.message}
          registration={register("email")}
          disabled={locked}
        />
        <PasswordFieldInput
          id="password"
          label="Password"
          autoComplete="current-password"
          error={errors.password?.message}
          registration={register("password")}
          labelRight={
            <Link href="/reset-password" className="text-[12px] text-[var(--brand)] font-normal">
              Forgot?
            </Link>
          }
        />

        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <AuthConsentRow
              checked={field.value}
              onCheckedChange={field.onChange}
            >
              Remember me for 30 days
            </AuthConsentRow>
          )}
        />

        <button
          type="submit"
          disabled={isSubmitting || locked}
          className="flex items-center justify-center gap-2 w-full py-3 px-5 text-[15px] font-semibold bg-[var(--brand)] text-white border border-[var(--brand)] rounded-[10px] hover:bg-[#4A6BEE] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[var(--brand)] focus-visible:outline-offset-2"
        >
          {isSubmitting ? (
            <MkIcon name="refreshCw" size={16} className="animate-spin" />
          ) : (
            <>Sign in <MkIcon name="arrowRight" size={16} /></>
          )}
        </button>
      </form>

      <AuthDivider />

      <div className="grid grid-cols-3 gap-2">
        <AuthSocialButton icon="fingerprint" label="Passkey" />
        <AuthSocialButton icon="zap" label="Magic link" />
        <AuthSocialButton icon="google" label="Google" />
      </div>

      <p className="text-[14px] text-[var(--text-muted)] text-center mt-5">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-[var(--brand)] font-medium">
          Sign up free
        </Link>
      </p>
    </AuthLayout>
  );
}
