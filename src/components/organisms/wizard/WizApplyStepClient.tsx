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
    return null;
  }

  return <WizStepRouter service={adaptServiceDetail(data)} step={step} />;
}
