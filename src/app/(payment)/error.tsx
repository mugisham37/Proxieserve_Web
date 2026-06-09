"use client";

import * as React from "react";
import { ErrorPage } from "@/components/organisms/ErrorPage";

export default function PaymentError({
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
      headline="Something went wrong on our end."
      subline="No charge was made. Your payment information is safe."
      note="No charge was made — your card or mobile money is completely safe."
      incidentId={error.digest}
      actions={[
        { label: "Try again ↻", variant: "solid", onClick: unstable_retry },
        { label: "Go to dashboard", href: "/dashboard", variant: "ghost" },
        { label: "Contact support", href: "/contact", variant: "ghost" },
      ]}
    />
  );
}
