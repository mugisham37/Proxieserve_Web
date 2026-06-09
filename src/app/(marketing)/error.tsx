"use client";

import * as React from "react";
import { ErrorPage } from "@/components/organisms/ErrorPage";

export default function MarketingError({
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
      incidentId={error.digest}
      actions={[
        { label: "Try again ↻", variant: "solid", onClick: unstable_retry },
        { label: "Go home", href: "/", variant: "ghost" },
      ]}
    />
  );
}
