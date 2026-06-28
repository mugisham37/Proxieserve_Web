"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useService } from "@/hooks/useServices";
import { adaptServiceDetail } from "@/lib/service-adapters";
import { WizShell } from "./WizShell";
import { WizShellSkeleton } from "@/components/molecules/wizard/WizShellSkeleton";

interface WizShellLayoutClientProps {
  slug: string;
  children: React.ReactNode;
}

export function WizShellLayoutClient({ slug, children }: WizShellLayoutClientProps) {
  const pathname = usePathname();
  const stepMatch = pathname.match(/\/apply\/(\d+)/);
  const step = stepMatch ? parseInt(stepMatch[1], 10) : 1;

  const { data, isLoading, isError } = useService(slug);

  if (isLoading) {
    return <WizShellSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="container py-16 text-center">
        <h1 className="font-serif text-[22px] text-[var(--ink)] mb-2">Service unavailable</h1>
        <p className="font-sans text-[14px] text-[var(--ink-muted)]">
          This service could not be loaded. The server may be starting up — please try again shortly.
        </p>
      </div>
    );
  }

  const service = adaptServiceDetail(data);

  return (
    <WizShell service={service} step={step}>
      {children}
    </WizShell>
  );
}
