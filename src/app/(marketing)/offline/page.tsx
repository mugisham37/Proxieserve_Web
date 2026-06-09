import { ErrorPage } from "@/components/organisms/ErrorPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're offline — ProxiServe",
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
