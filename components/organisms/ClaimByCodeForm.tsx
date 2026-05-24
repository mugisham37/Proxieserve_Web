"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { AuthCard } from "@/components/molecules/AuthCard";
import { AuthBanner } from "@/components/molecules/AuthBanner";
import { AuthFooterLinks } from "@/components/molecules/AuthFooterLinks";
import { FoundApplicationCard } from "@/components/molecules/FoundApplicationCard";
import { PhoneInputWithCountry } from "@/components/molecules/PhoneCountryButton";
import { FormField } from "@/components/atoms/FormField";
import { claimSchema, type ClaimData } from "@/lib/auth-schema";
import { MOCK } from "@/lib/auth-types";
import { formatTrackerCode } from "@/lib/tracker";
import { cn } from "@/lib/utils";

// Mock: service names by PRX code
const MOCK_SERVICES: Record<string, string> = {
  [MOCK.VALID_PRX]: "Passport renewal",
};

export function ClaimByCodeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultCode = searchParams.get("code") ?? "";

  const [foundService, setFoundService] = React.useState<string | null>(null);
  const [notFound, setNotFound] = React.useState(false);
  const [isLinking, setIsLinking] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ClaimData>({
    resolver: zodResolver(claimSchema),
    defaultValues: { code: defaultCode, phone: "" },
  });

  const codeValue = watch("code");

  // Auto-resolve code after 600ms debounce
  React.useEffect(() => {
    if (!codeValue || codeValue.length < 14) {
      setFoundService(null);
      setNotFound(false);
      return;
    }
    const id = setTimeout(() => {
      const service = MOCK_SERVICES[codeValue];
      if (service) {
        setFoundService(service);
        setNotFound(false);
      } else {
        setFoundService(null);
        setNotFound(true);
      }
    }, 600);
    return () => clearTimeout(id);
  }, [codeValue]);

  async function onSubmit(data: ClaimData) {
    if (!foundService) return;
    setIsLinking(true);
    await new Promise((r) => setTimeout(r, 900));
    // Success — redirect to login or dashboard
    router.push("/login?claimed=1");
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

          {/* PRX code input */}
          <FormField
            label="Tracking code"
            name="code"
            type="input"
            inputType="text"
            placeholder="PRX-YYYY-NNNNN"
            mono
            error={errors.code?.message}
            {...register("code", {
              onChange: (e) => {
                e.target.value = formatTrackerCode(e.target.value);
              },
            })}
          />

          {/* Found card */}
          <AnimatePresence>
            {foundService && (
              <FoundApplicationCard serviceName={foundService} />
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
            disabled={isSubmitting || isLinking || !foundService}
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
            {isLinking || isSubmitting ? (
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
