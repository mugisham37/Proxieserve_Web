"use client";

import { useQuery, type QueryObserverResult } from "@tanstack/react-query";
import { getSession } from "@/lib/api/auth";
import { isApiError, type SessionData } from "@/lib/api/types";
import { SESSION_QUERY_KEY } from "@/lib/auth-types";

interface UseSessionResult {
  session: SessionData | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<QueryObserverResult<SessionData | null, Error>>;
}

export function useSession(): UseSessionResult {
  const query = useQuery<SessionData | null>({
    queryKey: [...SESSION_QUERY_KEY],
    queryFn: async () => {
      try {
        const response = await getSession();
        return response.session;
      } catch (error) {
        if (isApiError(error) && error.errorType === "unauthorized") {
          return null;
        }

        throw error;
      }
    },
    refetchInterval: 4 * 60 * 1000,
    refetchIntervalInBackground: true,
  });

  return {
    session: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
