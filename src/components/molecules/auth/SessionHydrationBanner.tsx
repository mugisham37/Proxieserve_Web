"use client";

import * as React from "react";
import { AuthBanner } from "@/components/molecules/auth/AuthBanner";
import { useSession } from "@/hooks/useSession";
import { isApiError } from "@/lib/api/types";

export function SessionHydrationBanner() {
  const { isError, error, refetch, isFetching } = useSession();

  if (!isError || !error) {
    return null;
  }

  const message = isApiError(error)
    ? error.errorType === "timeout"
      ? "We could not confirm your session in time. You may still be signed in."
      : error.errorType === "network-error"
        ? "Could not reach the server to check your session."
        : "We could not load your session. Some features may be unavailable."
    : "We could not load your session. Some features may be unavailable.";

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(420px,calc(100vw-2rem))] -translate-x-1/2">
      <AuthBanner
        variant="warn"
        message={message}
        action={{
          label: isFetching ? "Retrying…" : "Retry",
          onClick: () => {
            void refetch();
          },
        }}
        visible
      />
    </div>
  );
}
