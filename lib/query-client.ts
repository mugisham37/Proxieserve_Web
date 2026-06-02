"use client";

import { MutationCache, QueryClient } from "@tanstack/react-query";
import { isApiError } from "@/lib/api/types";

function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
    mutationCache: new MutationCache({
      onError: (error) => {
        if (process.env.NODE_ENV !== "development") {
          return;
        }

        if (isApiError(error)) {
          if (error.statusCode >= 500 || error.errorType === "unknown-error") {
            console.error("[mutation-error]", error);
          }
          return;
        }

        console.error("[mutation-error]", error);
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient(): QueryClient {
  if (typeof window === "undefined") {
    return createQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }

  return browserQueryClient;
}
