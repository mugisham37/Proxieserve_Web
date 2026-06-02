"use client";

import * as React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth-context";
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
        <AuthProvider>{children}</AuthProvider>
        {process.env.NODE_ENV === "development" ? <ReactQueryDevtools initialIsOpen={false} /> : null}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
