import * as React from "react";
import type { Metadata } from "next";
import { DashboardShell } from "@/components/organisms/DashboardShell";
import { MessagesView } from "@/components/organisms/MessagesView";

export const metadata: Metadata = {
  title: "Messages",
};

export default function MessagesPage() {
  return (
    <DashboardShell pageTitle="Messages" backHref="/dashboard">
      <MessagesView />
    </DashboardShell>
  );
}
