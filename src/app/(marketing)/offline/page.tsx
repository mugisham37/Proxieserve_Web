import { ErrorPage } from "@/components/organisms/shared/ErrorPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're offline — Hebuza",
  robots: { index: false },
};

export default function OfflinePage() {
  return (
    <ErrorPage
      code="offline"
      actions={[
        { label: "View saved applications", href: "/dashboard", variant: "solid" },
        { label: "Retry ↻", href: "/", variant: "ghost" },
      ]}
    />
  );
}
