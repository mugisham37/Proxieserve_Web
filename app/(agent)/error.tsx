"use client";

import * as React from "react";
import { ErrorPage } from "@/components/organisms/ErrorPage";

export default function AgentError({
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
      subline="Case data is safe. Try again or return to the queue."
      incidentId={error.digest}
      actions={[
        { label: "Try again ↻", variant: "solid", onClick: unstable_retry },
        { label: "Back to queue", href: "/agent", variant: "ghost" },
      ]}
    />
  );
}
