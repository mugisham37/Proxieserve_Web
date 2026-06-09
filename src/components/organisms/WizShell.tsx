"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/services-data";
import { ApplicationProvider, useApplication } from "@/lib/application-context";
import { WizTopBar } from "@/components/molecules/WizTopBar";
import { WizStepper, WizStepperMobile } from "@/components/molecules/WizStepper";
import { WizFooter } from "@/components/molecules/WizFooter";
import { WizSummaryCard } from "@/components/molecules/WizSummaryCard";
import { WizTipsCard } from "@/components/molecules/WizTipsCard";
import { ResumeBanner } from "@/components/molecules/ResumeBanner";
import { OfflineQueueOverlay } from "@/components/molecules/OfflineQueueOverlay";
import { MultiTabConflictBanner } from "@/components/molecules/MultiTabConflictBanner";
import { SchemaMigrateCard } from "@/components/molecules/SchemaMigrateCard";
import { DraftExpiryBanner } from "@/components/molecules/DraftExpiryBanner";

const STEP_LABELS = ["Personal info", "Service details", "Documents", "Review", "Confirmation"];

interface WizShellInnerProps {
  service: Service;
  step: number;
  children: React.ReactNode;
}

function WizShellInner({ service, step, children }: WizShellInnerProps) {
  const { draft, uiState, dispatch, setUiState } = useApplication();
  const isLastStep = step === 5;
  const showAside = step >= 1 && step <= 4;

  // Step navigation
  const handleNext = () => {
    // Handled by individual step components — WizFooter just calls this for triggering
  };

  const handleMigrate = () => {
    dispatch({ type: "HYDRATE", payload: { ...draft, schemaVersion: 1 } });
    setUiState((s) => ({ ...s, schemaMigrationRequired: false }));
  };

  const handleReset = () => {
    dispatch({ type: "RESET", payload: { slug: service.slug } });
    setUiState((s) => ({ ...s, schemaMigrationRequired: false }));
  };

  // Service archived — full-page block
  if (uiState.serviceArchived) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div
          className="max-w-[480px] w-full bg-[var(--danger-soft)] border border-[var(--danger)] rounded-[var(--r-xl)] p-8 flex flex-col gap-5"
          style={{
            clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
          }}
        >
          <span className="eyebrow text-[var(--danger)]">Service unavailable</span>
          <h2 className="font-serif text-[24px] font-medium italic text-[var(--ink)]">
            This service is no longer offered
          </h2>
          <p className="font-sans text-[14px] text-[var(--ink-muted)]">
            {service.name} has been discontinued. Please contact us to discuss alternatives.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href={`/services?category=${service.category}`}
              className="px-4 py-2.5 rounded-[var(--r-pill)] bg-[var(--ink)] text-[var(--paper)] font-serif italic text-[14px] hover:opacity-90 transition-opacity"
            >
              See similar services
            </a>
            <a
              href="/contact"
              className="px-4 py-2.5 rounded-[var(--r-pill)] border border-[var(--rule-strong)] font-serif italic text-[14px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cream)]">
      {/* Offline overlay */}
      <OfflineQueueOverlay visible={uiState.isOffline} />

      {/* Top bar */}
      <WizTopBar
        serviceName={service.name}
        serviceSlug={service.slug}
        saveStatus={uiState.saveStatus}
        isDirty={!!draft.updatedAt}
      />

      {/* Mobile stepper */}
      <WizStepperMobile currentStep={step} />

      {/* Desktop stepper */}
      <div className="container max-w-[1120px] mx-auto px-5 sm:px-8 py-4 hidden sm:block">
        <WizStepper currentStep={step} />
      </div>

      {/* State banners — below stepper */}
      <div className="container max-w-[1120px] mx-auto px-5 sm:px-8 pt-4 flex flex-col gap-3">
        {/* Schema migration */}
        {uiState.schemaMigrationRequired && (
          <SchemaMigrateCard
            changes={uiState.migrationChanges}
            onUpdate={handleMigrate}
            onReset={handleReset}
          />
        )}

        {/* Multi-tab conflict */}
        {uiState.multiTabConflict && (
          <MultiTabConflictBanner
            onResume={() => setUiState((s) => ({ ...s, multiTabConflict: false }))}
            onDismiss={() => setUiState((s) => ({ ...s, multiTabConflict: false }))}
          />
        )}

        {/* Draft expiry */}
        {uiState.draftExpiryWarning && (
          <DraftExpiryBanner
            createdAt={draft.createdAt}
            onSubmitNow={() => {
              // Scroll to submit — handled by step 4 nav
            }}
            onDismiss={() => setUiState((s) => ({ ...s, draftExpiryWarning: false }))}
          />
        )}

        {/* Resume banner — only on step 1 if not dismissed */}
        {step === 1 && !uiState.resumeBannerDismissed && draft.highestStepReached > 0 && (
          <ResumeBanner
            serviceName={service.name}
            startedAt={draft.createdAt}
            onDismiss={() => setUiState((s) => ({ ...s, resumeBannerDismissed: true }))}
          />
        )}
      </div>

      {/* Main page grid */}
      <main className="flex-1 container max-w-[1120px] mx-auto px-5 sm:px-8 py-8 pb-24 sm:pb-8">
        <div
          className={cn(
            "grid gap-8",
            showAside ? "lg:grid-cols-[1fr_280px]" : "grid-cols-1"
          )}
        >
          {/* Step content */}
          <div className="min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Aside */}
          {showAside && (
            <aside className="hidden lg:flex flex-col gap-4 self-start sticky top-[130px]">
              <WizSummaryCard service={service} />
              <WizTipsCard step={step} />
            </aside>
          )}
        </div>
      </main>

      {/* Footer */}
      {!isLastStep && (
        <WizFooter
          step={step}
          serviceSlug={service.slug}
          onNext={handleNext}
          isSubmitting={uiState.isSubmitting}
        />
      )}
    </div>
  );
}

interface WizShellProps {
  service: Service;
  step: number;
  children: React.ReactNode;
}

export function WizShell({ service, step, children }: WizShellProps) {
  return (
    <ApplicationProvider slug={service.slug}>
      <WizShellInner service={service} step={step}>
        {children}
      </WizShellInner>
    </ApplicationProvider>
  );
}
