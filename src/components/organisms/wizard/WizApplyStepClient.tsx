"use client";

import { useService } from "@/hooks/useServices";
import { adaptServiceDetail } from "@/lib/service-adapters";
import { WizStepRouter } from "@/components/organisms/wizard/WizStepRouter";
import { WizShellSkeleton } from "@/components/molecules/wizard/WizShellSkeleton";

interface WizApplyStepClientProps {
  slug: string;
  step: number;
}

export function WizApplyStepClient({ slug, step }: WizApplyStepClientProps) {
  const { data, isLoading, isError } = useService(slug);

  if (isLoading) {
    return <WizShellSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="container py-16 text-center">
        <p className="font-sans text-[14px] text-[var(--ink-muted)]">
          This step could not be loaded. The server may be starting up — please try again shortly.
        </p>
      </div>
    );
  }

  return <WizStepRouter service={adaptServiceDetail(data)} step={step} />;
}
