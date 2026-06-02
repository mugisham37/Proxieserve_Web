import * as React from "react";
import type { Metadata } from "next";
import { DashboardShell } from "@/components/organisms/DashboardShell";
import { ApplicationsGrid } from "@/components/organisms/ApplicationsGrid";

export const metadata: Metadata = {
  title: "Applications",
};

export default function ApplicationsPage() {
  return (
    <DashboardShell pageTitle="Applications" backHref="/dashboard">
      <ApplicationsGrid />
    </DashboardShell>
  );
}
