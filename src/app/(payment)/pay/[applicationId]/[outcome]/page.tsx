import { notFound } from "next/navigation";
import { PayOutcomeState } from "@/components/organisms/payment/PayOutcomeState";
import { VALID_OUTCOMES, type PaymentOutcome } from "@/lib/types/payment";

interface Props {
  params: Promise<{ applicationId: string; outcome: string }>;
}

export default async function OutcomePage({ params }: Props) {
  const { outcome } = await params;

  if (!VALID_OUTCOMES.includes(outcome as PaymentOutcome)) {
    notFound();
  }

  return <PayOutcomeState outcome={outcome as PaymentOutcome} />;
}

// Pre-render all known outcome slugs at build time
export async function generateStaticParams() {
  return VALID_OUTCOMES.map((outcome) => ({ outcome }));
}
