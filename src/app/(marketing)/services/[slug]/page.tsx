import type { Metadata } from "next";
import { ServiceDetailClient } from "@/components/organisms/marketing/ServiceDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const formatted = slug.replace(/-/g, " ");
  return {
    title: `${formatted} — ProxiServe`,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  return <ServiceDetailClient slug={slug} />;
}
