import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/services-data";
import { WizStepRouter } from "@/components/organisms/wizard/WizStepRouter";

interface Props {
  params: Promise<{ slug: string; step: string }>;
}

export default async function ApplyStepPage({ params }: Props) {
  const { slug, step } = await params;

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const stepNum = parseInt(step, 10);
  if (isNaN(stepNum) || stepNum < 1 || stepNum > 5) notFound();

  return <WizStepRouter service={service} step={stepNum} />;
}
