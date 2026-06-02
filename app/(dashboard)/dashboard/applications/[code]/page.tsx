import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DashboardShell } from "@/components/organisms/DashboardShell";
import { ApplicationDetailView } from "@/components/organisms/ApplicationDetailView";
import { SkeletonBlock } from "@/components/atoms/SkeletonBlock";
import { getDashboardApplication, MOCK_DASHBOARD_CODES } from "@/lib/dashboard-data";

interface Props {
  params: Promise<{ code: string }>;
}

export async function generateStaticParams() {
  return MOCK_DASHBOARD_CODES.map((code) => ({ code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const app = getDashboardApplication(code);
  if (!app) return { title: "Application not found" };
  return { title: app.serviceName };
}

export default async function ApplicationDetailPage({ params }: Props) {
  const { code } = await params;
  const app = getDashboardApplication(code);

  if (!app) {
    notFound();
  }

  return (
    <DashboardShell
      pageTitle={app.serviceName}
      backHref="/dashboard/applications"
    >
      <Suspense
        fallback={
          <div className="space-y-4">
            <SkeletonBlock className="w-full h-[180px] rounded-[var(--r-lg)]" />
            <SkeletonBlock className="w-full h-10 rounded-[var(--r-md)]" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
              <SkeletonBlock className="h-[300px] rounded-[var(--r-lg)]" />
              <SkeletonBlock className="h-[220px] rounded-[var(--r-lg)]" />
            </div>
          </div>
        }
      >
        <ApplicationDetailView application={app} />
      </Suspense>
    </DashboardShell>
  );
}
