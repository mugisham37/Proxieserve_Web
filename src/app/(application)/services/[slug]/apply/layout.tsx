import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/services-data";
import { WizShellLayoutClient } from "@/components/organisms/wizard/WizShellLayoutClient";

interface Props {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `Apply — ${service.name} — ProxiServe`,
    description: service.lede,
  };
}

export default async function ApplyLayout({ children, params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <WizShellLayoutClient slug={slug}>
      {children}
    </WizShellLayoutClient>
  );
}
