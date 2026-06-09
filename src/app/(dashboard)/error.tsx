"use client";

import * as React from "react";
import { ErrorPage } from "@/components/organisms/ErrorPage";

export default function DashboardError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPage
      code="500"
      subline="Your applications are safe. Try again or return to your dashboard."
      incidentId={error.digest}
      actions={[
        { label: "Try again ↻", variant: "solid", onClick: unstable_retry },
        { label: "Go to dashboard", href: "/dashboard", variant: "ghost" },
      ]}
    />
  );
}
