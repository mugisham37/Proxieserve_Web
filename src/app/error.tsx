"use client";

import * as React from "react";
import { ErrorPage } from "@/components/organisms/shared/ErrorPage";

export default function RootError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  React.useEffect(() => {
    console.error("[Hebuza] Unhandled error:", error);
  }, [error]);

  return (
    <ErrorPage
      code="500"
      incidentId={error.digest}
      actions={[
        { label: "Try again ↻", variant: "solid", onClick: unstable_retry },
        { label: "Contact support", href: "/contact", variant: "ghost" },
      ]}
    />
  );
}
