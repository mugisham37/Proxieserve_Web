import * as React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TrackerView } from "@/components/organisms/TrackerView";
import {
  getApplicationByCode,
  MOCK_TRACKER_CODES,
  type TrackerApplication,
} from "@/lib/tracker-data";

interface Props {
  params: Promise<{ code: string }>;
}

export async function generateStaticParams() {
  return MOCK_TRACKER_CODES.map((code) => ({ code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const app: TrackerApplication | undefined = getApplicationByCode(code);
  if (!app) return { title: "Application not found — ProxiServe" };

  const statusLabel: Record<string, string> = {
    received: "Received",
    "in-progress": "In progress",
    "action-required": "Action required",
    "on-hold": "On hold",
    completed: "Completed",
    rejected: "Rejected",
  };

  return {
    title: `${statusLabel[app.status] ?? app.status} — ${app.serviceName} | ProxiServe`,
    robots: { index: false },
  };
}

export default async function TrackerPage({ params }: Props) {
  const { code } = await params;
  const application = getApplicationByCode(code);
  if (!application) notFound();
  return <TrackerView application={application} />;
}
