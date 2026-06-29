"use client";

import * as React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth-context";
import { BackendStatusProvider } from "@/lib/backend-status";
import { SessionHydrationBanner } from "@/components/molecules/auth/SessionHydrationBanner";
import { NotificationProvider } from "@/lib/notification-context";
import { ToastProvider } from "@/lib/toast-context";
import { I18nProvider } from "@/lib/i18n-context";
import { getQueryClient } from "@/lib/query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <I18nProvider>
          <BackendStatusProvider>
            <AuthProvider>
              <NotificationProvider>
                <ToastProvider>
                  {children}
                  <SessionHydrationBanner />
                </ToastProvider>
              </NotificationProvider>
            </AuthProvider>
          </BackendStatusProvider>
        </I18nProvider>
        {process.env.NODE_ENV === "development" ? <ReactQueryDevtools initialIsOpen={false} /> : null}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
