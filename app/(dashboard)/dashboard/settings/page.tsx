import * as React from "react";
import type { Metadata } from "next";
import { DashboardShell } from "@/components/organisms/DashboardShell";
import { SettingsView } from "@/components/organisms/SettingsView";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <DashboardShell pageTitle="Settings" backHref="/dashboard">
      <SettingsView />
    </DashboardShell>
  );
}
