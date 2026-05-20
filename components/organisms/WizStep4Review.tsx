"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/services-data";
import { useApplication } from "@/lib/application-context";
import { SUBMITTED_KEY } from "@/lib/application-types";
import { ReviewCard } from "@/components/molecules/ReviewCard";
import { ReviewRow } from "@/components/molecules/ReviewRow";
import { FeeSummary } from "@/components/molecules/FeeSummary";
import { IdempotencyCard } from "@/components/molecules/IdempotencyCard";
import { WizErrorCard } from "@/components/molecules/WizErrorCard";
import { WizValidationBanner } from "@/components/molecules/WizValidationBanner";
import { WizFooter } from "@/components/molecules/WizFooter";

interface WizStep4ReviewProps {
  service: Service;
}

function generatePRXCode(): string {
  const year = new Date().getFullYear();
  const num = String(Math.floor(Math.random() * 99999)).padStart(5, "0");
  return `PRX-${year}-${num}`;
}

function generateIncidentId(): string {
  return `INC-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}

const LANGUAGE_LABELS: Record<string, string> = { en: "English", rw: "Kinyarwanda", fr: "French" };

export function WizStep4Review({ service }: WizStep4ReviewProps) {
  const router = useRouter();
  const { draft, dispatch, uiState, setUiState } = useApplication();
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const [consentErrors, setConsentErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const handleSubmit = async () => {
    // Validate consents
    const errs: Record<string, string> = {};
    if (!draft.consents.accuracy) errs.accuracy = "Please confirm your information is accurate";
    if (!draft.consents.terms) errs.terms = "Please agree to the terms to continue";

    if (Object.keys(errs).length > 0) {
      setConsentErrors(errs);
      return;
    }
    setConsentErrors({});

    // Check idempotency
    const alreadySubmitted = localStorage.getItem(SUBMITTED_KEY(draft.idempotencyKey));
    if (alreadySubmitted) {
      setUiState((s) => ({ ...s, isDuplicateSubmit: true }));
      return;
    }

    setUiState((s) => ({ ...s, isSubmitting: true, submitError: null }));

    // Simulate submission (80% success, 20% error)
    await new Promise((r) => setTimeout(r, 1800));
    const success = Math.random() > 0.2;

    if (success) {
      const code = generatePRXCode();
      // Mark as submitted
      localStorage.setItem(SUBMITTED_KEY(draft.idempotencyKey), code);
      localStorage.setItem("proxi:lastCode", code);
      dispatch({ type: "SET_HIGHEST_STEP", payload: 4 });
      setUiState((s) => ({ ...s, isSubmitting: false, confirmedCode: code }));
      router.push(`/services/${service.slug}/apply/5`);
    } else {
      setUiState((s) => ({
        ...s,
        isSubmitting: false,
        submitError: generateIncidentId(),
      }));
    }
  };

  // Documents summary
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

      {/* Idempotency warning */}
      {uiState.isDuplicateSubmit && (
        <IdempotencyCard
          existingCode={
            localStorage.getItem(SUBMITTED_KEY(draft.idempotencyKey)) ?? undefined
          }
          className="mb-6"
        />
      )}

      {/* Submit error */}
      {uiState.submitError && (
        <WizErrorCard
          incidentId={uiState.submitError}
          onRetry={handleSubmit}
          className="mb-6"
        />
      )}

      <div className="flex flex-col gap-5">
        {/* Step 1 review */}
        <ReviewCard title="Personal information" editHref={`/services/${service.slug}/apply/1`}>
          <ReviewRow label="Full name" value={draft.personal.fullName} />
          <ReviewRow label="National ID" value={draft.personal.nationalId} mono />
          <ReviewRow label="Date of birth" value={draft.personal.dob} />
          <ReviewRow label="Phone" value={`+250 ${draft.personal.phone}`} mono />
          <ReviewRow label="WhatsApp" value={draft.personal.whatsapp ? "Yes" : "No"} />
          <ReviewRow label="Email" value={draft.personal.email || undefined} />
          <ReviewRow label="Language" value={LANGUAGE_LABELS[draft.personal.language] ?? draft.personal.language} />
        </ReviewCard>

        {/* Step 2 review */}
        <ReviewCard title={service.applicationConfig.step2Title} editHref={`/services/${service.slug}/apply/2`}>
          {service.applicationConfig.cards.flatMap((card) =>
            card.fields
              .filter((f) => !f.conditional || draft.serviceConfig[f.conditional.field] !== undefined)
              .map((field) => {
                const val = draft.serviceConfig[field.id];
                if (val === undefined || val === "" || val === false) return null;
                const displayVal =
                  typeof val === "boolean"
                    ? val ? "Yes" : "No"
                    : Array.isArray(val)
                    ? val.join(", ")
                    : String(val);

                // Find option label for select/radio-card
                const optionLabel =
                  field.options?.find((o) => o.value === displayVal)?.label ?? displayVal;

                return (
                  <ReviewRow
                    key={field.id}
                    label={field.label}
                    value={optionLabel}
                    mono={field.mono}
                  />
                );
              })
          )}
        </ReviewCard>

        {/* Step 3 review */}
        <ReviewCard title="Documents" editHref={`/services/${service.slug}/apply/3`}>
          {service.requirements.map((req) => {
            const files = draft.documents[req.label] ?? [];
            const doneFiles = files.filter((f) => f.status === "done");
            return (
              <ReviewRow
                key={req.label}
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

        {/* Fee summary */}
        <FeeSummary service={service} />

        {/* Consent checkboxes */}
        <div className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-5 flex flex-col gap-4">
          <span className="eyebrow text-[var(--ink-subtle)]">Final confirmation</span>

          {Object.keys(consentErrors).length > 0 && (
            <WizValidationBanner errors={consentErrors} />
          )}

          <div
            className={cn(
              "flex items-start gap-3 p-3 rounded-[var(--r-md)] border",
              consentErrors.accuracy
                ? "border-[var(--danger)] bg-[var(--danger-soft)]"
                : "border-[var(--rule-soft)] bg-[var(--cream)]"
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
                : "border-[var(--rule-soft)] bg-[var(--cream)]"
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
              I understand ProxiServe acts as an agent and I am responsible for the accuracy of my application.
            </label>
          </div>
        </div>

        {/* What happens after */}
        <div className="bg-[var(--cream)] border border-[var(--rule-soft)] rounded-[var(--r-lg)] p-5">
          <span className="eyebrow text-[var(--ink-subtle)] block mb-4">What happens after you send</span>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="font-mono text-[10px] text-[var(--ink-subtle)] mt-0.5 shrink-0">01</span>
              <p className="font-sans text-[13px] text-[var(--ink-muted)]">
                Your agent reviews your application within 2 business hours and contacts you to confirm.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-[10px] text-[var(--ink-subtle)] mt-0.5 shrink-0">02</span>
              <p className="font-sans text-[13px] text-[var(--ink-muted)]">
                You&apos;ll receive a tracking code immediately — use it anytime to check your application status.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-[10px] text-[var(--ink-subtle)] mt-0.5 shrink-0">03</span>
              <p className="font-sans text-[13px] text-[var(--ink-muted)]">
                You pay nothing until your agent confirms the total cost and you approve it.
              </p>
            </div>
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
