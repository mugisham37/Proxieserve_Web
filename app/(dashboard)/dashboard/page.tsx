import * as React from "react";
import type { Metadata } from "next";
import { DashboardShell } from "@/components/organisms/DashboardShell";
import { DashboardOverview } from "@/components/organisms/DashboardOverview";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardOverview />
    </DashboardShell>
  );
}
