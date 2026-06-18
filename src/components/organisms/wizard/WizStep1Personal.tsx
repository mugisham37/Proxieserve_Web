"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import type { UiService } from "@/lib/service-ui-types";
import { useApplication } from "@/lib/application-context";
import { step1Schema } from "@/lib/application-schema";
import { WizCard } from "@/components/molecules/wizard/WizCard";
import { WizFooter } from "@/components/molecules/wizard/WizFooter";
import { WizValidationBanner } from "@/components/molecules/wizard/WizValidationBanner";
import { PhoneField } from "@/components/molecules/auth/PhoneField";
import { NationalIdField } from "@/components/molecules/auth/NationalIdField";
import { FormField } from "@/components/atoms/auth/FormField";
import { Switch } from "@/components/atoms/shared/Switch";
import { SegmentedGroup } from "@/components/atoms/wizard/SegmentedGroup";

type Step1Values = z.infer<typeof step1Schema>;

interface WizStep1PersonalProps {
  service: UiService;
}

const LANGUAGE_OPTIONS = [
  { value: "en", label: "EN" },
  { value: "rw", label: "RW" },
  { value: "fr", label: "FR" },
];

export function WizStep1Personal({ service }: WizStep1PersonalProps) {
  const router = useRouter();
  const { draft, dispatch, setUiState } = useApplication();
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    register,
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: draft.personal.fullName,
      nationalId: draft.personal.nationalId,
      dob: draft.personal.dob,
      phone: draft.personal.phone,
      whatsapp: draft.personal.whatsapp,
      email: draft.personal.email,
      language: draft.personal.language,
      consent: draft.personal.consent,
    },
  });

  const phone = watch("phone");
  const whatsapp = watch("whatsapp");
  const language = watch("language");
  const consent = watch("consent");
  const nationalId = watch("nationalId");

  // Focus heading on mount
  React.useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const onValid = (data: Step1Values) => {
    dispatch({ type: "PATCH_PERSONAL", payload: data });
    dispatch({ type: "SET_HIGHEST_STEP", payload: 1 });
    setUiState((s) => ({ ...s, showValidationBanner: false, validationErrors: {} }));
    router.push(`/services/${service.slug}/apply/2`);
  };

  const onInvalid = () => {
    const errs: Record<string, string> = {};
    if (errors.fullName) errs.fullName = errors.fullName.message ?? "Full name required";
    if (errors.nationalId) errs.nationalId = errors.nationalId.message ?? "National ID required";
    if (errors.dob) errs.dob = errors.dob.message ?? "Date of birth required";
    if (errors.phone) errs.phone = errors.phone.message ?? "Phone required";
    if (errors.consent) errs.consent = errors.consent.message ?? "Consent required";
    setUiState((s) => ({ ...s, showValidationBanner: true, validationErrors: errs }));
  };

  const validationErrors = Object.fromEntries(
    Object.entries(errors).map(([k, v]) => [k, v?.message ?? ""])
  );

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
      <div className="flex flex-col gap-2 mb-8">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-serif text-[clamp(24px,3.5vw,36px)] font-medium italic text-[var(--ink)] outline-none"
        >
          Personal information
        </h1>
        <p className="font-sans text-[14px] text-[var(--ink-muted)]">
          Your legal details for the {service.name} application
        </p>
      </div>

      {hasErrors && (
        <WizValidationBanner
          errors={validationErrors}
          className="mb-6"
        />
      )}

      <div className="flex flex-col gap-5">
        {/* Card 1 — Name & ID */}
        <WizCard id="card-identity" title="Name & identification" fieldCount={3}>
          <div className="flex flex-col gap-4">
            <FormField
              id="fullName"
              label="Full legal name"
              required
              placeholder="As it appears on your National ID"
              error={errors.fullName?.message}
              {...register("fullName", {
                onChange: (e) => dispatch({ type: "PATCH_PERSONAL", payload: { fullName: e.target.value } }),
              })}
            />

            <NationalIdField
              value={nationalId}
              required
              error={errors.nationalId?.message}
              onChange={(v) => {
                setValue("nationalId", v);
                dispatch({ type: "PATCH_PERSONAL", payload: { nationalId: v } });
              }}
            />

            <FormField
              id="dob"
              label="Date of birth"
              inputType="date"
              required
              error={errors.dob?.message}
              {...register("dob", {
                onChange: (e) => dispatch({ type: "PATCH_PERSONAL", payload: { dob: e.target.value } }),
              })}
            />
          </div>
        </WizCard>

        {/* Card 2 — Contact */}
        <WizCard id="card-contact" title="Contact details" fieldCount={2}>
          <div className="flex flex-col gap-4">
            <PhoneField
              value={phone}
              required
              error={errors.phone?.message}
              onChange={(v) => {
                setValue("phone", v);
                dispatch({ type: "PATCH_PERSONAL", payload: { phone: v } });
              }}
            />

            <div className="flex items-center justify-between gap-4 py-1">
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[13px] font-medium text-[var(--ink)]">
                  WhatsApp updates
                </span>
                <span className="font-sans text-[12px] text-[var(--ink-muted)]">
                  Receive status updates on WhatsApp
                </span>
              </div>
              <Switch
                checked={whatsapp}
                onChange={(v) => {
                  setValue("whatsapp", v);
                  dispatch({ type: "PATCH_PERSONAL", payload: { whatsapp: v } });
                }}
                label="WhatsApp updates"
                name="whatsapp"
              />
            </div>

            <FormField
              id="email"
              label="Email address"
              inputType="email"
              placeholder="Optional — for email notifications"
              help="We'll use this for backup notifications only"
              error={errors.email?.message}
              {...register("email", {
                onChange: (e) => dispatch({ type: "PATCH_PERSONAL", payload: { email: e.target.value } }),
              })}
            />
          </div>
        </WizCard>

        {/* Card 3 — Language */}
        <WizCard id="card-language" title="Preferred language">
          <div className="flex flex-col gap-2">
            <label className="font-sans text-[13px] font-medium text-[var(--ink)]">
              Communication language
            </label>
            <SegmentedGroup
              options={LANGUAGE_OPTIONS}
              value={language}
              onChange={(v) => {
                setValue("language", v as "en" | "rw" | "fr");
                dispatch({ type: "PATCH_PERSONAL", payload: { language: v as "en" | "rw" | "fr" } });
              }}
            />
            <p className="font-sans text-[12px] text-[var(--ink-muted)]">
              Your agent will communicate with you in this language
            </p>
          </div>
        </WizCard>

        {/* Card 4 — Consent */}
        <WizCard id="card-consent" title="Consent">
          <div
            className={cn(
              "flex items-start gap-3 p-3 rounded-[var(--r-md)] border",
              errors.consent
                ? "border-[var(--danger)] bg-[var(--danger-soft)]"
                : "border-[var(--rule-soft)] bg-[var(--cream)]"
            )}
          >
            <input
              type="checkbox"
              id="consent-checkbox"
              checked={consent}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              onChange={(e) => {
                setValue("consent", e.target.checked, { shouldValidate: true });
                dispatch({ type: "PATCH_PERSONAL", payload: { consent: e.target.checked } });
              }}
              className="mt-0.5 w-4 h-4 rounded accent-[var(--ink)] shrink-0 cursor-pointer"
            />
            <label htmlFor="consent-checkbox" className="font-sans text-[13px] text-[var(--ink)] leading-relaxed cursor-pointer">
              I authorise ProxiServe to act on my behalf in handling my information to apply for{" "}
              <strong>{service.name}</strong>. I confirm all details I provide are accurate and complete.
            </label>
          </div>
          {errors.consent && (
            <p id="consent-error" role="alert" className="mt-2 font-sans text-[12px] text-[var(--danger)]">
              {errors.consent.message}
            </p>
          )}
        </WizCard>
      </div>

      {/* Mobile footer built into form — submit handled by WizFooter's onClick */}
      <WizFooter
        step={1}
        serviceSlug={service.slug}
        onNext={() => handleSubmit(onValid, onInvalid)()}
        canGoBack={false}
      />
    </form>
  );
}
