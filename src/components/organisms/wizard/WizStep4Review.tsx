"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { UiService } from "@/lib/service-ui-types";
import { useApplication } from "@/lib/application-context";
import { SUBMITTED_KEY } from "@/lib/application-types";
import { useSubmitApplication } from "@/hooks/useApplications";
import { uploadDocument } from "@/lib/api/documents";
import { isApiError } from "@/lib/api/types";
import { ReviewCard } from "@/components/molecules/marketing/ReviewCard";
import { ReviewRow } from "@/components/molecules/dashboard/ReviewRow";
import { FeeSummary } from "@/components/molecules/payment/FeeSummary";
import { IdempotencyCard } from "@/components/molecules/admin/IdempotencyCard";
import { WizErrorCard } from "@/components/molecules/wizard/WizErrorCard";
import { WizValidationBanner } from "@/components/molecules/wizard/WizValidationBanner";
import { WizFooter } from "@/components/molecules/wizard/WizFooter";

interface WizStep4ReviewProps {
  service: UiService;
}

const LANGUAGE_LABELS: Record<string, string> = { en: "English", rw: "Kinyarwanda", fr: "French" };

function reqKey(req: UiService["requirements"][number]): string {
  return req.key ?? req.label;
}

export function WizStep4Review({ service }: WizStep4ReviewProps) {
  const router = useRouter();
  const { draft, dispatch, uiState, setUiState, stagedFiles } = useApplication();
  const submitMutation = useSubmitApplication();
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const [consentErrors, setConsentErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const handleSubmit = async () => {
    const errs: Record<string, string> = {};
    if (!draft.consents.accuracy) errs.accuracy = "Please confirm your information is accurate";
    if (!draft.consents.terms) errs.terms = "Please agree to the terms to continue";

    if (Object.keys(errs).length > 0) {
      setConsentErrors(errs);
      return;
    }
    setConsentErrors({});

    const alreadySubmitted = localStorage.getItem(SUBMITTED_KEY(draft.idempotencyKey));
    if (alreadySubmitted) {
      setUiState((s) => ({ ...s, isDuplicateSubmit: true }));
      return;
    }

    setUiState((s) => ({ ...s, isSubmitting: true, submitError: null }));

    try {
      const tier = draft.selectedTier || "standard";
      const response = await submitMutation.mutateAsync({
        service_slug: service.slug,
        tier,
        personal_info: {
          fullName: draft.personal.fullName,
          nationalId: draft.personal.nationalId,
          dob: draft.personal.dob,
          phone: draft.personal.phone,
          email: draft.personal.email,
          whatsapp: draft.personal.whatsapp,
          language: draft.personal.language,
          consent: draft.personal.consent,
        },
        service_data: draft.serviceConfig,
      });

      for (const [requirementKey, files] of Object.entries(stagedFiles)) {
        for (const file of files) {
          const uploaded = await uploadDocument(response.code, requirementKey, file);
          if (uploaded.qc_status === "warn" || uploaded.qc_status === "fail") {
            setUiState((s) => ({ ...s, photoWarnKey: requirementKey }));
          }
        }
      }

      localStorage.setItem(SUBMITTED_KEY(draft.idempotencyKey), response.code);
      localStorage.setItem("proxi:lastCode", response.code);
      dispatch({ type: "SET_HIGHEST_STEP", payload: 4 });
      setUiState((s) => ({ ...s, isSubmitting: false, confirmedCode: response.code }));
      router.push(`/services/${service.slug}/apply/5`);
    } catch (error) {
      const message = isApiError(error) ? error.message : "Submission failed. Please try again.";
      setUiState((s) => ({
        ...s,
        isSubmitting: false,
        submitError: message,
      }));
    }
  };

  const docCount = Object.values(draft.documents)
    .flat()
    .filter((f) => f.status === "done").length;

  return (
    <div>
      <div className="flex flex-col gap-2 mb-8">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-serif text-[clamp(24px,3.5vw,36px)] font-medium italic text-[var(--ink)] outline-none"
        >
          Review your application
        </h1>
        <p className="font-sans text-[14px] text-[var(--ink-muted)]">
          Check everything carefully before sending — your agent reviews this on your behalf
        </p>
      </div>

      {uiState.isDuplicateSubmit && (
        <IdempotencyCard
          existingCode={localStorage.getItem(SUBMITTED_KEY(draft.idempotencyKey)) ?? undefined}
          className="mb-6"
        />
      )}

      {uiState.submitError && (
        <WizErrorCard
          incidentId={uiState.submitError}
          onRetry={handleSubmit}
          className="mb-6"
        />
      )}

      <div className="flex flex-col gap-5">
        <ReviewCard title="Personal information" editHref={`/services/${service.slug}/apply/1`}>
          <ReviewRow label="Full name" value={draft.personal.fullName} />
          <ReviewRow label="National ID" value={draft.personal.nationalId} mono />
          <ReviewRow label="Date of birth" value={draft.personal.dob} />
          <ReviewRow label="Phone" value={`+250 ${draft.personal.phone}`} mono />
          <ReviewRow label="WhatsApp" value={draft.personal.whatsapp ? "Yes" : "No"} />
          <ReviewRow label="Email" value={draft.personal.email || undefined} />
          <ReviewRow label="Language" value={LANGUAGE_LABELS[draft.personal.language] ?? draft.personal.language} />
        </ReviewCard>

        <ReviewCard title={service.applicationConfig.step2Title} editHref={`/services/${service.slug}/apply/2`}>
          {service.applicationConfig.cards.flatMap((card) =>
            card.fields
              .filter((f) => !f.conditional || draft.serviceConfig[f.conditional.field] !== undefined)
              .map((field) => {
                const val = draft.serviceConfig[field.id];
                if (val === undefined || val === "" || val === false) return null;
                const displayVal =
                  typeof val === "boolean"
                    ? val
                      ? "Yes"
                      : "No"
                    : Array.isArray(val)
                      ? val.join(", ")
                      : String(val);

                const optionLabel =
                  field.options?.find((o) => o.value === displayVal)?.label ?? displayVal;

                return (
                  <ReviewRow key={field.id} label={field.label} value={optionLabel} mono={field.mono} />
                );
              }),
          )}
        </ReviewCard>

        <ReviewCard title="Documents" editHref={`/services/${service.slug}/apply/3`}>
          {service.requirements.map((req) => {
            const key = reqKey(req);
            const files = draft.documents[key] ?? [];
            const doneFiles = files.filter((f) => f.status === "done");
            return (
              <ReviewRow
                key={key}
                label={req.label}
                value={
                  doneFiles.length > 0
                    ? `${doneFiles.length} file${doneFiles.length !== 1 ? "s" : ""} uploaded`
                    : undefined
                }
              />
            );
          })}
          {docCount > 0 && (
            <p className="font-sans text-[12px] text-[var(--ok)] pt-1">
              {docCount} document{docCount !== 1 ? "s" : ""} ready
            </p>
          )}
        </ReviewCard>

        <FeeSummary service={service} />

        <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-5 flex flex-col gap-4">
          <span className="eyebrow text-[var(--ink-subtle)]">Final confirmation</span>

          {Object.keys(consentErrors).length > 0 && <WizValidationBanner errors={consentErrors} />}

          <div
            className={cn(
              "flex items-start gap-3 p-3 rounded-[var(--r-md)] border",
              consentErrors.accuracy
                ? "border-[var(--danger)] bg-[var(--danger-soft)]"
                : "border-[var(--rule-soft)] bg-[var(--cream)]",
            )}
          >
            <input
              type="checkbox"
              id="consent-accuracy"
              checked={draft.consents.accuracy}
              onChange={(e) =>
                dispatch({ type: "PATCH_CONSENTS", payload: { accuracy: e.target.checked } })
              }
              aria-invalid={!!consentErrors.accuracy}
              className="mt-0.5 w-4 h-4 rounded accent-[var(--ink)] shrink-0 cursor-pointer"
            />
            <label htmlFor="consent-accuracy" className="font-sans text-[13px] text-[var(--ink)] leading-relaxed cursor-pointer">
              I confirm that all the information I have provided is accurate and complete to the best of my knowledge.
            </label>
          </div>

          <div
            className={cn(
              "flex items-start gap-3 p-3 rounded-[var(--r-md)] border",
              consentErrors.terms
                ? "border-[var(--danger)] bg-[var(--danger-soft)]"
                : "border-[var(--rule-soft)] bg-[var(--cream)]",
            )}
          >
            <input
              type="checkbox"
              id="consent-terms"
              checked={draft.consents.terms}
              onChange={(e) =>
                dispatch({ type: "PATCH_CONSENTS", payload: { terms: e.target.checked } })
              }
              aria-invalid={!!consentErrors.terms}
              className="mt-0.5 w-4 h-4 rounded accent-[var(--ink)] shrink-0 cursor-pointer"
            />
            <label htmlFor="consent-terms" className="font-sans text-[13px] text-[var(--ink)] leading-relaxed cursor-pointer">
              I agree to the{" "}
              <a href="/legal/terms" target="_blank" className="underline hover:no-underline">Terms of Service</a>
              {" "}and{" "}
              <a href="/legal/privacy" target="_blank" className="underline hover:no-underline">Privacy Policy</a>.
            </label>
          </div>
        </div>
      </div>

      <WizFooter
        step={4}
        serviceSlug={service.slug}
        onNext={handleSubmit}
        isSubmitting={uiState.isSubmitting}
        nextLabel="Send application ↗"
      />
    </div>
  );
}
