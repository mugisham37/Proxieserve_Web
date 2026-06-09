"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { AuthCard } from "@/components/molecules/auth/AuthCard";
import { AuthBanner } from "@/components/molecules/auth/AuthBanner";
import { AuthFooterLinks } from "@/components/molecules/auth/AuthFooterLinks";
import { FoundApplicationCard } from "@/components/molecules/tracker/FoundApplicationCard";
import { PhoneInputWithCountry } from "@/components/molecules/auth/PhoneCountryButton";
import { FormField } from "@/components/atoms/auth/FormField";
import { claimSchema, type ClaimData } from "@/lib/auth-schema";
import { useClaimApplication } from "@/hooks/useAuth";
import { useApplicationLookup } from "@/hooks/useApplicationLookup";
import { isApiError } from "@/lib/api/types";
import { formatTrackerCode } from "@/lib/tracker";
import { cn } from "@/lib/utils";

export function ClaimByCodeForm() {
  const searchParams = useSearchParams();
  const defaultCode = searchParams.get("code") ?? "";

  const [debouncedCode, setDebouncedCode] = React.useState(defaultCode);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const lookupQuery = useApplicationLookup(debouncedCode);
  const claimMutation = useClaimApplication();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ClaimData>({
    resolver: zodResolver(claimSchema),
    defaultValues: { code: defaultCode, phone: "" },
  });

  const codeValue = watch("code");

  React.useEffect(() => {
    if (!codeValue || codeValue.length < 14) {
      setDebouncedCode("");
      return;
    }

    const id = setTimeout(() => {
      setDebouncedCode(codeValue);
    }, 600);
    return () => clearTimeout(id);
  }, [codeValue]);

  const foundApplication = lookupQuery.data ?? null;
  const notFound = isApiError(lookupQuery.error) && lookupQuery.error.errorType === "claim-not-found";
  const lookupErrorMessage = lookupQuery.isError && !notFound
    ? (isApiError(lookupQuery.error) ? lookupQuery.error.message : "Something went wrong on our end. Please try again.")
    : null;

  async function onSubmit(data: ClaimData) {
    if (!foundApplication) return;

    setSubmitError(null);

    try {
      await claimMutation.mutateAsync(data);
    } catch (error) {
      setSubmitError(
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
      className="w-full max-w-[520px]"
    >
      <AuthCard
        variant="client"
        size="lg"
        title="Link your application"
        subtitle="Enter your PRX tracking code to link an existing application to your account."
      >
        <div className="flex flex-col gap-4">
          {/* Not found banner */}
          <AuthBanner
            variant="danger"
            message="We couldn't find an application with that code. Double-check and try again."
            visible={notFound}
          />
          <AuthBanner
            variant="danger"
            message={lookupErrorMessage ?? submitError ?? "Something went wrong on our end. Please try again."}
            visible={!!lookupErrorMessage || !!submitError}
          />

          {/* PRX code input */}
          {(() => {
            const { name: fieldName, ...codeReg } = register("code", {
              onChange: (e) => { e.target.value = formatTrackerCode(e.target.value); },
            });
            void fieldName;
            return (
              <FormField
                label="Tracking code"
                name="code"
                type="input"
                inputType="text"
                placeholder="PRX-YYYY-NNNNN"
                mono
                error={errors.code?.message}
                {...codeReg}
              />
            );
          })()}

          {/* Found card */}
          <AnimatePresence>
            {foundApplication && (
              <FoundApplicationCard
                serviceName={foundApplication.serviceName}
                submittedDate={foundApplication.submittedDate}
                status={foundApplication.status}
              />
            )}
          </AnimatePresence>

          {/* Phone confirmation */}
          <PhoneInputWithCountry
            id="cl-phone"
            label="Confirm your phone number"
            placeholder="78 8 *** 456"
            error={errors.phone?.message}
            {...register("phone")}
          />

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || claimMutation.isPending || !foundApplication}
            className={cn(
              "w-full h-12 rounded-[var(--r-pill)] mt-1",
              "font-serif italic text-[17px] text-[var(--paper)]",
              "bg-[var(--ink)] hover:bg-[var(--ink-2)]",
              "transition-colors duration-[120ms] outline-none",
              "focus-visible:shadow-[var(--focus-ring)]",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              "flex items-center justify-center gap-2"
            )}
          >
            {claimMutation.isPending || isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[var(--paper)] border-t-transparent rounded-full animate-spin" />
                Linking…
              </span>
            ) : (
              "Link to my account →"
            )}
          </button>

          <p className="font-sans text-[13px] text-center text-[var(--ink-muted)]">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-[var(--brand-ink)] hover:text-[var(--brand)] transition-colors font-medium">
              Create one first →
            </a>
          </p>
        </div>
        <AuthFooterLinks className="mt-4" />
      </AuthCard>
    </motion.div>
  );
}
