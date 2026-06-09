"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AuthCard } from "@/components/molecules/auth/AuthCard";
import { AuthBanner } from "@/components/molecules/auth/AuthBanner";
import { AuthDivider } from "@/components/molecules/auth/AuthDivider";
import { SSOButton } from "@/components/molecules/auth/SSOButton";
import { RoleToggle, type StaffRole } from "@/components/molecules/auth/RoleToggle";
import { StaffChip } from "@/components/molecules/shared/StaffChip";
import { EnvBadge } from "@/components/atoms/admin/EnvBadge";
import { FormField } from "@/components/atoms/auth/FormField";
import { PasswordField } from "@/components/atoms/auth/PasswordField";
import { staffLoginSchema, type StaffLoginData } from "@/lib/auth-schema";
import { useStaffLogin } from "@/hooks/useAuth";
import { isApiError } from "@/lib/api/types";
import { cn } from "@/lib/utils";

export function StaffLoginForm() {
  const searchParams = useSearchParams();
  const [role, setRole] = React.useState<StaffRole>("agent");
  const staffLoginMutation = useStaffLogin();
  const [bannerState, setBannerState] = React.useState<{
    type: "invalid-credentials" | "expired" | "generic" | null;
    message?: string;
  }>({
    type: searchParams.get("error") === "expired" ? "expired" : null,
    message: searchParams.get("error") === "expired"
      ? "Your verification session expired. Please sign in again."
      : undefined,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<StaffLoginData>({
    resolver: zodResolver(staffLoginSchema),
    defaultValues: { email: "", password: "", role: "agent" },
  });

  React.useEffect(() => {
    setValue("role", role);
  }, [role, setValue]);

  async function onSubmit(data: StaffLoginData) {
    setBannerState({ type: null });

    try {
      await staffLoginMutation.mutateAsync(data);
    } catch (error) {
      if (isApiError(error) && error.errorType === "invalid-credentials") {
        setBannerState({
          type: "invalid-credentials",
          message: "Incorrect email or password.",
        });
        return;
      }

      setBannerState({
        type: "generic",
        message: isApiError(error)
          ? error.message
          : "Something went wrong on our end. Please try again.",
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className="w-full max-w-[400px]"
    >
      <AuthCard variant="staff" title="">
        {/* Staff card header */}
        <div className="flex items-center justify-between mb-6 -mt-2">
          <div className="flex items-center gap-2">
            <span className="font-serif text-[20px] text-[var(--ink)]">Staff sign in</span>
            <StaffChip role={role} />
          </div>
          <EnvBadge env="production" />
        </div>

        <div className="flex flex-col gap-4">
          {/* Error banner */}
          <AuthBanner
            variant="danger"
            message={bannerState.message ?? "Incorrect email or password."}
            visible={bannerState.type === "invalid-credentials" || bannerState.type === "generic"}
          />
          <AuthBanner
            variant="warn"
            message={bannerState.message ?? "Your verification session expired. Please sign in again."}
            visible={bannerState.type === "expired"}
          />

          {/* Role toggle */}
          <div className="flex flex-col gap-1.5">
            <span className="font-sans text-[13px] font-medium text-[var(--ink)] leading-none">
              Role
            </span>
            <RoleToggle value={role} onChange={setRole} />
          </div>

          {/* Work email */}
          {(() => { const { name: fieldName, ...r } = register("email"); void fieldName; return (
            <FormField
              label="Work email"
              name="email"
              type="input"
              inputType="email"
              placeholder="you@proxiserve.rw"
              error={errors.email?.message}
              {...r}
            />
          ); })()}

          {/* Password */}
          <div className="flex flex-col gap-1">
            <PasswordField
              id="st-pass"
              label="Password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="font-sans text-[12px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors underline underline-offset-2"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || staffLoginMutation.isPending}
            className={cn(
              "w-full h-11 rounded-[var(--r-md)]",
              "font-sans text-[14px] font-medium text-[var(--paper)]",
              "bg-[var(--ink)] hover:bg-[var(--ink-2)]",
              "transition-colors duration-[120ms] outline-none",
              "focus-visible:shadow-[var(--focus-ring)]",
              "disabled:opacity-60 disabled:cursor-not-allowed",
              "flex items-center justify-center gap-2"
            )}
          >
            {isSubmitting || staffLoginMutation.isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[var(--paper)] border-t-transparent rounded-full animate-spin" />
                Verifying…
              </span>
            ) : (
              "Continue to verification"
            )}
          </button>

          <AuthDivider />

          <SSOButton />

          <p className="font-mono text-[11px] text-center text-[var(--ink-subtle)]">
            ProxiServe Staff Portal v0.4
          </p>
        </div>
      </AuthCard>
    </motion.div>
  );
}
