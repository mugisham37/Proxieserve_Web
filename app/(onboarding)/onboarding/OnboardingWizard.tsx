"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { ObWelcomeStep } from "@/components/sections/onboarding/ObWelcomeStep";
import { ObConnectionsStep } from "@/components/sections/onboarding/ObConnectionsStep";
import { ObPaymentsStep } from "@/components/sections/onboarding/ObPaymentsStep";
import { ObProductBudgetStep } from "@/components/sections/onboarding/ObProductBudgetStep";
import { ObReviewLaunchStep, LaunchSuccess } from "@/components/sections/onboarding/ObReviewLaunchStep";
import type { ConnectionKey, ConnectionStatus, RailKey } from "@/types";
import type { ProductBudgetInput } from "@/lib/onboarding/schemas";

interface WizardState {
  connections: Record<ConnectionKey, ConnectionStatus>;
  rails: Record<RailKey, boolean>;
  product: ProductBudgetInput | null;
  agreed: boolean;
}

const INITIAL_STATE: WizardState = {
  connections: {
    shopify: "connected",
    woo: "idle",
    meta: "connected",
    google: "idle",
    whatsapp: "connected",
  },
  rails: {
    stripe: true,
    momo: true,
    airtel: false,
    flutterwave: false,
  },
  product: null,
  agreed: false,
};

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [launched, setLaunched] = useState(false);
  const [wizardData, setWizardData] = useState<WizardState>(INITIAL_STATE);

  // GSAP step transition
  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.from(".onboarding-step-content > *", {
        y: 14,
        opacity: 0,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.out",
        clearProps: "all",
      });
    });
  }, [step, launched]);

  const next = useCallback(() => setStep((s) => Math.min(s + 1, 4)), []);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);
  const goTo = useCallback((s: number) => setStep(s), []);

  const toggleConnection = useCallback((key: ConnectionKey) => {
    setWizardData((d) => ({
      ...d,
      connections: {
        ...d.connections,
        [key]: d.connections[key] === "connected" ? "idle" : "connected",
      },
    }));
  }, []);

  const toggleRail = useCallback((key: RailKey) => {
    setWizardData((d) => ({
      ...d,
      rails: { ...d.rails, [key]: !d.rails[key] },
    }));
  }, []);

  const handleProductData = useCallback((data: ProductBudgetInput) => {
    setWizardData((d) => ({ ...d, product: data }));
  }, []);

  const handleLaunch = useCallback(() => {
    setLaunched(true);
  }, []);

  // Post-launch success screen — wraps in layout without footer buttons
  if (launched) {
    return (
      <OnboardingLayout step={4} showSave={false} onNext={() => router.push("/dashboard")}>
        <LaunchSuccess onDashboard={() => router.push("/dashboard")} />
      </OnboardingLayout>
    );
  }

  const stepContent = (() => {
    switch (step) {
      case 0:
        return <ObWelcomeStep />;
      case 1:
        return (
          <ObConnectionsStep
            connections={wizardData.connections}
            onToggle={toggleConnection}
          />
        );
      case 2:
        return (
          <ObPaymentsStep
            rails={wizardData.rails}
            onToggle={toggleRail}
          />
        );
      case 3:
        return (
          <ObProductBudgetStep
            defaultValues={wizardData.product ?? undefined}
            onDataChange={handleProductData}
          />
        );
      case 4:
        return (
          <ObReviewLaunchStep
            connections={wizardData.connections}
            rails={wizardData.rails}
            agreed={wizardData.agreed}
            onAgreedChange={(v) => setWizardData((d) => ({ ...d, agreed: v }))}
            onGoToStep={goTo}
          />
        );
      default:
        return null;
    }
  })();

  const NEXT_LABELS: Record<number, string> = {
    0: "Let's go",
    1: "Continue",
    2: "Continue",
    3: "Continue",
    4: "Launch campaign",
  };

  return (
    <OnboardingLayout
      step={step}
      onNext={step === 4 ? handleLaunch : next}
      onBack={back}
      nextLabel={NEXT_LABELS[step]}
      nextDisabled={step === 4 && !wizardData.agreed}
      showSave={step > 0}
    >
      {stepContent}
    </OnboardingLayout>
  );
}
