"use client";

import * as React from "react";
import { ErrorPage } from "@/components/organisms/shared/ErrorPage";

export default function AdminError({
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
      subline="Platform data is safe. Try again or return to the admin dashboard."
      incidentId={error.digest}
      actions={[
        { label: "Try again ↻", variant: "solid", onClick: unstable_retry },
        { label: "Admin dashboard", href: "/admin", variant: "ghost" },
      ]}
    />
  );
}
