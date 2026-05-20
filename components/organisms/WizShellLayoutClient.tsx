"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { getServiceBySlug } from "@/lib/services-data";
import { WizShell } from "./WizShell";

interface WizShellLayoutClientProps {
  slug: string;
  children: React.ReactNode;
}

export function WizShellLayoutClient({ slug, children }: WizShellLayoutClientProps) {
  const pathname = usePathname();
  // pathname: /services/[slug]/apply/[step]
  const stepMatch = pathname.match(/\/apply\/(\d+)/);
  const step = stepMatch ? parseInt(stepMatch[1], 10) : 1;

  const service = getServiceBySlug(slug);
  if (!service) return null;

  return (
    <WizShell service={service} step={step}>
      {children}
    </WizShell>
  );
}
