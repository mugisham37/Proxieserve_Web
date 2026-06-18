import type { ReactNode } from "react";
import type { Metadata } from "next";
import { WizShellLayoutClient } from "@/components/organisms/wizard/WizShellLayoutClient";

interface Props {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const formatted = slug.replace(/-/g, " ");
  return {
    title: `Apply — ${formatted} — ProxiServe`,
  };
}

export default async function ApplyLayout({ children, params }: Props) {
  const { slug } = await params;

  return <WizShellLayoutClient slug={slug}>{children}</WizShellLayoutClient>;
}
