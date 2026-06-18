"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminAnalytics } from "@/lib/api/analytics";
import { QUERY_KEYS as QK } from "@/lib/api/types";

export function useAdminAnalytics() {
  return useQuery({
    queryKey: [...QK.adminAnalytics],
    queryFn: getAdminAnalytics,
    staleTime: 2 * 60 * 1000,
  });
}
