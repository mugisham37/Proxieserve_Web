import { CaseDetailClient } from "@/components/organisms/agent/CaseDetailClient";

interface CaseDetailPageProps {
  params: Promise<{ code: string }>;
}

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { code } = await params;
  return <CaseDetailClient code={code} />;
}
