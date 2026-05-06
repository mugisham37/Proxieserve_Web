"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { AuthFieldInput } from "@/components/molecules/AuthFieldInput";
import { PasswordFieldInput } from "@/components/molecules/PasswordFieldInput";
import { MkIcon } from "@/components/atoms/MkIcon";
import { ResetPasswordPanel } from "@/components/sections/auth/ResetPasswordPanel";
import {
  resetRequestSchema,
  setNewPasswordSchema,
  type ResetRequestInput,
  type SetNewPasswordInput,
} from "@/lib/auth/schemas";
import type { ResetStep } from "@/types";

export function ResetPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<ResetStep>("request");
  const headingRef = useRef<HTMLHeadingElement>(null);

  const requestForm = useForm<ResetRequestInput>({
    resolver: zodResolver(resetRequestSchema),
  });

  const newPwForm = useForm<SetNewPasswordInput>({
    resolver: zodResolver(setNewPasswordSchema),
  });

  const watchedPw = newPwForm.watch("password", "");

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.from(".auth-form-content > *", {
        y: 14, duration: 0.35, stagger: 0.06, ease: "power2.out", clearProps: "transform",
      });
    });
  }, []);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const onRequest = async (_data: ResetRequestInput) => {
    await new Promise((r) => setTimeout(r, 800));
    setStep("sent");
  };

  const onNewPw = async (_data: SetNewPasswordInput) => {
    await new Promise((r) => setTimeout(r, 800));
    router.push("/sign-in");
  };

  return (
    <AuthLayout panel={<ResetPasswordPanel />}>
      {step === "request" && (
        <>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] mb-1 outline-none"
          >
            Reset password
          </h1>
          <p className="text-[15px] text-[var(--text-muted)] mb-6">
            Enter the email on your account and we'll send a reset link.
          </p>
          <form
            onSubmit={requestForm.handleSubmit(onRequest)}
            className="flex flex-col gap-4"
            noValidate
          >
            <AuthFieldInput
              id="reset-email"
              label="Email address"
              icon="mail"
              type="email"
              placeholder="kalisa@inema.rw"
              autoComplete="email"
              error={requestForm.formState.errors.email?.message}
              registration={requestForm.register("email")}
            />
            <button
              type="submit"
              disabled={requestForm.formState.isSubmitting}
              className="flex items-center justify-center gap-2 w-full py-3 px-5 text-[15px] font-semibold bg-[var(--brand)] text-white border border-[var(--brand)] rounded-[10px] hover:bg-[#4A6BEE] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {requestForm.formState.isSubmitting ? (
                <MkIcon name="refreshCw" size={16} className="animate-spin" />
              ) : (
                "Send reset link"
              )}
            </button>
          </form>
        </>
      )}

      {step === "sent" && (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center mx-auto mb-5">
            <MkIcon name="mail" size={32} />
          </div>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] mb-1 outline-none"
          >
            Check your inbox
          </h1>
          <p className="text-[15px] text-[var(--text-muted)] mb-6">
            We sent a reset link to{" "}
            <strong className="text-[var(--text)]">kalisa@inema.rw</strong>. It expires in 1 hour.
          </p>
          <button
            type="button"
            onClick={() => setStep("newpw")}
            className="flex items-center justify-center gap-2 w-full py-[10px] px-5 text-[14px] font-medium bg-transparent text-[var(--text)] border border-[var(--border)] rounded-[10px] hover:bg-[var(--surface-2)] hover:border-[var(--text-subtle)] transition-all duration-[120ms] mb-4"
          >
            I have the link → Set new password
          </button>
          <p className="text-[13px] text-[var(--text-subtle)]">
            Didn't get it?{" "}
            <button className="text-[var(--brand)] font-medium bg-none border-none cursor-pointer">
              Resend link
            </button>
          </p>
        </div>
      )}

      {step === "newpw" && (
        <>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] mb-1 outline-none"
          >
            Set new password
          </h1>
          <p className="text-[15px] text-[var(--text-muted)] mb-6">
            Choose a strong password for your account.
          </p>
          <form
            onSubmit={newPwForm.handleSubmit(onNewPw)}
            className="flex flex-col gap-4"
            noValidate
          >
            <PasswordFieldInput
              id="new-password"
              label="New password"
              autoComplete="new-password"
              showStrength
              watchedValue={watchedPw}
              error={newPwForm.formState.errors.password?.message}
              registration={newPwForm.register("password")}
            />
            <PasswordFieldInput
              id="confirm-password"
              label="Confirm password"
              placeholder="Repeat password"
              autoComplete="new-password"
              error={newPwForm.formState.errors.confirmPassword?.message}
              registration={newPwForm.register("confirmPassword")}
            />
            <button
              type="submit"
              disabled={newPwForm.formState.isSubmitting}
              className="flex items-center justify-center gap-2 w-full py-3 px-5 text-[15px] font-semibold bg-[var(--brand)] text-white border border-[var(--brand)] rounded-[10px] hover:bg-[#4A6BEE] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {newPwForm.formState.isSubmitting ? (
                <MkIcon name="refreshCw" size={16} className="animate-spin" />
              ) : (
                <>Set password & sign in <MkIcon name="arrowRight" size={16} /></>
              )}
            </button>
          </form>
        </>
      )}

      <Link
        href="/sign-in"
        className="flex items-center gap-1.5 mt-4 text-[13px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-[120ms] no-underline"
      >
        <MkIcon name="arrowLeft" size={14} /> Back to sign in
      </Link>
    </AuthLayout>
  );
}
