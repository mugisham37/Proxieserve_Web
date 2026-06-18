"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAgent,
  getAgents,
  updateAgent,
  type CreateAgentRequest,
  type UpdateAgentRequest,
} from "@/lib/api/admin";
import { QUERY_KEYS as QK } from "@/lib/api/types";

export function useAgents() {
  return useQuery({
    queryKey: [...QK.adminAgents],
    queryFn: getAgents,
  });
}

export function useCreateAgent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAgentRequest) => createAgent(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.adminAgents] });
    },
  });
}

export function useUpdateAgent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ agentId, ...payload }: { agentId: string } & UpdateAgentRequest) =>
      updateAgent(agentId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.adminAgents] });
    },
  });
}
