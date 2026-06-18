import { notFound } from "next/navigation";
import { WizApplyStepClient } from "@/components/organisms/wizard/WizApplyStepClient";

interface Props {
  params: Promise<{ slug: string; step: string }>;
}

export default async function ApplyStepPage({ params }: Props) {
  const { slug, step } = await params;

  const stepNum = parseInt(step, 10);
  if (isNaN(stepNum) || stepNum < 1 || stepNum > 5) notFound();

  return <WizApplyStepClient slug={slug} step={stepNum} />;
}
