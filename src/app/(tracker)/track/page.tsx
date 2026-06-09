import * as React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { CodeEntrySection } from "@/components/organisms/shared/CodeEntrySection";

export const metadata: Metadata = {
  title: "Track your application — ProxiServe",
  description: "Enter your PRX tracking code to see the live status of your application.",
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ code?: string; recover?: string }>;
}

export default async function TrackPage({ searchParams }: Props) {
  const { code, recover } = await searchParams;
  return (
    <Suspense>
      <CodeEntrySection initialCode={code ?? ""} autoRecover={recover === "1"} />
    </Suspense>
  );
}
