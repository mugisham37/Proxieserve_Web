"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { escalateCase, getOversightCases, resolveCase } from "@/lib/api/oversight";
import { QUERY_KEYS as QK } from "@/lib/api/types";

export function useOversightCases(tab?: string) {
  return useQuery({
    queryKey: [...QK.oversightCases(tab)],
    queryFn: () => getOversightCases(tab),
  });
}

export function useEscalateCase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ code, reason }: { code: string; reason: string }) => escalateCase(code, reason),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["oversight-cases"] });
    },
  });
}

export function useResolveCase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ code, resolutionNote }: { code: string; resolutionNote?: string }) =>
      resolveCase(code, resolutionNote),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["oversight-cases"] });
    },
  });
}
