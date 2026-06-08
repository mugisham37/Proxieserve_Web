import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ applicationId: string }>;
}

export default async function PaymentRootPage({ params }: Props) {
  const { applicationId } = await params;
  redirect(`/pay/${applicationId}/method-choice`);
}
