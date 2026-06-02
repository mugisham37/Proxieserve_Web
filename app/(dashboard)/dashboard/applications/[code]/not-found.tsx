import * as React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/organisms/DashboardShell";
import { PillButton } from "@/components/atoms/PillButton";

export default function ApplicationNotFound() {
  return (
    <DashboardShell pageTitle="Application not found" backHref="/dashboard/applications">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-muted)] mb-4">
          404 — Not found
        </p>
        <h1 className="font-serif font-medium text-[clamp(28px,4vw,40px)] text-[var(--ink)] mb-3 leading-[1.1]">
          Application not found.
        </h1>
        <p className="font-sans text-[15px] text-[var(--ink-muted)] max-w-[340px] mb-8">
          The application code you're looking for doesn't exist in your account or has been removed.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/dashboard/applications">
            <PillButton variant="solid">View all applications</PillButton>
          </Link>
          <Link href="/dashboard">
            <PillButton variant="ghost">Back to dashboard</PillButton>
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}
