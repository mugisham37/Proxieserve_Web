"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  claimCase,
  getAgentCase,
  getAgentCases,
  getUnassignedCases,
  updateCaseStatus,
} from "@/lib/api/applications";
import type { UpdateStatusRequest } from "@/lib/api/types";
import { QUERY_KEYS as QK } from "@/lib/api/types";

export function useAgentCases() {
  return useQuery({
    queryKey: [...QK.agentCases],
    queryFn: getAgentCases,
  });
}

export function useAgentCase(code: string) {
  return useQuery({
    queryKey: [...QK.agentCase(code)],
    queryFn: () => getAgentCase(code),
    enabled: Boolean(code),
  });
}

export function useUnassignedCases() {
  return useQuery({
    queryKey: [...QK.unassignedCases],
    queryFn: getUnassignedCases,
  });
}

export function useClaimCase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => claimCase(code),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.unassignedCases] });
      void queryClient.invalidateQueries({ queryKey: [...QK.agentCases] });
    },
  });
}

export function useUpdateCaseStatus(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateStatusRequest) => updateCaseStatus(code, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.agentCase(code)] });
      void queryClient.invalidateQueries({ queryKey: [...QK.agentCases] });
    },
  });
}
