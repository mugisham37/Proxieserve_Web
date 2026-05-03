"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { AuthMethodTabs } from "@/components/molecules/AuthMethodTabs";
import { AuthFieldInput } from "@/components/molecules/AuthFieldInput";
import { PasswordFieldInput } from "@/components/molecules/PasswordFieldInput";
import { AuthConsentRow } from "@/components/molecules/AuthConsentRow";
import { AuthConsentRegionBox } from "@/components/molecules/AuthConsentRegionBox";
import { MkIcon } from "@/components/atoms/MkIcon";
import { SignUpPanel } from "@/components/sections/auth/SignUpPanel";
import { signUpSchema, type SignUpInput } from "@/lib/auth/schemas";
import type { AuthMethod } from "@/types";

export function SignUpForm() {
  const router = useRouter();
  const [method, setMethod] = useState<AuthMethod>("email");
  const formContentRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { consentRequired: true, consentMarketing: false },
  });

  const watchedPassword = watch("password", "");

  useEffect(() => {
    let gsap: typeof import("gsap").gsap | undefined;
    import("gsap").then(({ gsap: g }) => {
      gsap = g;
      if (formContentRef.current) {
        g.from(".auth-form-content > *", {
          y: 16,
          opacity: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: "power2.out",
        });
      }
    });
    return () => { gsap?.killTweensOf(".auth-form-content > *"); };
  }, []);

  const onSubmit = async (_data: SignUpInput) => {
    await new Promise((r) => setTimeout(r, 800));
    router.push("/verify-email");
  };

  return (
    <AuthLayout panel={<SignUpPanel />}>
      <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] mb-1">
        Create your account
      </h1>
      <p className="text-[15px] text-[var(--text-muted)] mb-6">
        Start free. No credit card required.
      </p>

      <AuthMethodTabs value={method} onChange={setMethod} />

      {/* Email method */}
      {method === "email" && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <AuthFieldInput
            id="fullName"
            label="Full name"
            icon="user"
            type="text"
            placeholder="Kalisa Mugisha"
            autoComplete="name"
            error={errors.fullName?.message}
            registration={register("fullName")}
          />
          <AuthFieldInput
            id="email"
            label="Email address"
            icon="mail"
            type="email"
            placeholder="kalisa@inema.rw"
            autoComplete="email"
            error={errors.email?.message}
            registration={register("email")}
          />
          <PasswordFieldInput
            id="password"
            label="Password"
            autoComplete="new-password"
            showStrength
            watchedValue={watchedPassword}
            error={errors.password?.message}
            registration={register("password")}
          />

          <div className="flex flex-col gap-2 mt-1">
            <Controller
              name="consentRequired"
              control={control}
              render={({ field }) => (
                <AuthConsentRow
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  required={true}
                  error={errors.consentRequired?.message}
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-[var(--brand)]">Terms of Service</Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[var(--brand)]">Privacy Policy</Link>.
                </AuthConsentRow>
              )}
            />
            <Controller
              name="consentMarketing"
              control={control}
              render={({ field }) => (
                <AuthConsentRow
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  required={false}
                >
                  Send me product updates and tips.
                </AuthConsentRow>
              )}
            />
          </div>

          <AuthConsentRegionBox />

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 w-full py-3 px-5 text-[15px] font-semibold bg-[var(--brand)] text-white border border-[var(--brand)] rounded-[10px] hover:bg-[#4A6BEE] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[var(--brand)] focus-visible:outline-offset-2"
          >
            {isSubmitting ? (
              <MkIcon name="refreshCw" size={16} className="animate-spin" />
            ) : (
              <>Create account <MkIcon name="arrowRight" size={16} /></>
            )}
          </button>
        </form>
      )}

      {/* Passkey method */}
      {method === "passkey" && (
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-[72px] h-[72px] rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center">
            <MkIcon name="fingerprint" size={40} />
          </div>
          <div>
            <h3 className="text-[18px] font-semibold mb-1">Use a passkey</h3>
            <p className="text-[14px] text-[var(--text-muted)]">
              Sign up with Face ID, Touch ID, or your security key. No password needed.
            </p>
          </div>
          <div className="w-full text-left flex flex-col gap-1">
            <label htmlFor="pk-email" className="text-[13px] font-medium text-[var(--text)]">
              Email address
            </label>
            <div className="flex items-center gap-2 px-3 bg-[var(--bg)] border border-[var(--border)] rounded-[10px] focus-within:border-[var(--brand)] focus-within:[box-shadow:0_0_0_3px_var(--brand-soft)] transition-all duration-[120ms]">
              <MkIcon name="mail" size={16} className="text-[var(--text-subtle)]" />
              <input
                id="pk-email"
                type="email"
                placeholder="kalisa@inema.rw"
                autoComplete="email"
                className="flex-1 py-[10px] text-[14px] bg-transparent border-none outline-none text-[var(--text)] placeholder:text-[var(--text-subtle)]"
              />
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 w-full py-3 px-5 text-[15px] font-semibold bg-[var(--brand)] text-white border border-[var(--brand)] rounded-[10px] hover:bg-[#4A6BEE] transition-all duration-150">
            <MkIcon name="fingerprint" size={16} /> Create passkey
          </button>
        </div>
      )}

      {/* Magic link method */}
      {method === "magic" && (
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-[72px] h-[72px] rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center">
            <MkIcon name="zap" size={40} />
          </div>
          <div>
            <h3 className="text-[18px] font-semibold mb-1">Magic link</h3>
            <p className="text-[14px] text-[var(--text-muted)]">
              We'll email you a one-time link. No password to remember.
            </p>
          </div>
          <div className="w-full text-left flex flex-col gap-1">
            <label htmlFor="ml-email" className="text-[13px] font-medium text-[var(--text)]">
              Email address
            </label>
            <div className="flex items-center gap-2 px-3 bg-[var(--bg)] border border-[var(--border)] rounded-[10px] focus-within:border-[var(--brand)] focus-within:[box-shadow:0_0_0_3px_var(--brand-soft)] transition-all duration-[120ms]">
              <MkIcon name="mail" size={16} className="text-[var(--text-subtle)]" />
              <input
                id="ml-email"
                type="email"
                placeholder="kalisa@inema.rw"
                autoComplete="email"
                className="flex-1 py-[10px] text-[14px] bg-transparent border-none outline-none text-[var(--text)] placeholder:text-[var(--text-subtle)]"
              />
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 w-full py-3 px-5 text-[15px] font-semibold bg-[var(--brand)] text-white border border-[var(--brand)] rounded-[10px] hover:bg-[#4A6BEE] transition-all duration-150">
            <MkIcon name="mail" size={16} /> Send magic link
          </button>
        </div>
      )}

      <p className="text-[14px] text-[var(--text-muted)] text-center mt-5">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-[var(--brand)] font-medium">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
