import type { Metadata } from "next";
import { TrackerPageClient } from "@/components/organisms/tracker/TrackerPageClient";

interface Props {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `Track ${code} — Hebuza`,
    robots: { index: false },
  };
}

export default async function TrackerPage({ params }: Props) {
  const { code } = await params;
  return <TrackerPageClient code={code} />;
}
