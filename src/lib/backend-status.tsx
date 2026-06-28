"use client";

import * as React from "react";
import {
  getBackendOfflineState,
  markBackendStatusAppMounted,
  recordApiSuccess,
  setBackendOfflineFromHealthCheck,
  subscribeBackendStatus,
} from "@/lib/backend-status-tracker";
import { pingHealth } from "@/lib/api/health";

interface BackendStatusContextValue {
  isBackendOffline: boolean;
  retryHealthCheck: () => Promise<void>;
}

const BackendStatusContext = React.createContext<BackendStatusContextValue | null>(null);

export function BackendStatusProvider({ children }: { children: React.ReactNode }) {
  const [isBackendOffline, setIsBackendOffline] = React.useState(false);
  const [isRetrying, setIsRetrying] = React.useState(false);

  React.useEffect(() => {
    markBackendStatusAppMounted();
    setIsBackendOffline(getBackendOfflineState());

    return subscribeBackendStatus(() => {
      setIsBackendOffline(getBackendOfflineState());
    });
  }, []);

  const retryHealthCheck = React.useCallback(async () => {
    if (isRetrying) {
      return;
    }

    setIsRetrying(true);
    try {
      const ok = await pingHealth();
      setBackendOfflineFromHealthCheck(!ok);
      if (ok) {
        recordApiSuccess();
      }
    } finally {
      setIsRetrying(false);
    }
  }, [isRetrying]);

  const value = React.useMemo(
    () => ({ isBackendOffline, retryHealthCheck }),
    [isBackendOffline, retryHealthCheck],
  );

  return <BackendStatusContext.Provider value={value}>{children}</BackendStatusContext.Provider>;
}

export function useBackendStatus(): BackendStatusContextValue {
  const ctx = React.useContext(BackendStatusContext);
  if (!ctx) {
    throw new Error("useBackendStatus must be used within BackendStatusProvider");
  }
  return ctx;
}
