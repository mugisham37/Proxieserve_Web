"use client";

import * as React from "react";
import { PAY_STATUS_KEY } from "@/lib/types/payment";
import type { PaymentStatus } from "@/lib/types/dashboard";

/**
 * Reads the locally-persisted payment status for an application.
 * Returns null when no local override exists (fall back to server data).
 * Real backend wiring will replace this with server state.
 */
export function usePaymentStatus(applicationId: string): PaymentStatus | null {
  const [status, setStatus] = React.useState<PaymentStatus | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(PAY_STATUS_KEY(applicationId));
    if (raw === "paid" || raw === "unpaid" || raw === "partial" || raw === "refunded") {
      setStatus(raw);
    }

    // Listen for cross-tab updates (e.g., receipt tab sets paid, dashboard tab reads it)
    function handleStorage(e: StorageEvent) {
      if (e.key === PAY_STATUS_KEY(applicationId)) {
        const next = e.newValue;
        if (next === "paid" || next === "unpaid" || next === "partial" || next === "refunded") {
          setStatus(next);
        }
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [applicationId]);

  return status;
}
