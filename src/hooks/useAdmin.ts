"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAgent,
  getAgents,
  updateAgent,
  type CreateAgentRequest,
  type UpdateAgentRequest,
} from "@/lib/api/admin";

const AGENTS_QUERY_KEY = ["admin", "agents"] as const;

export function useAgents() {
  return useQuery({
    queryKey: [...AGENTS_QUERY_KEY],
    queryFn: getAgents,
  });
}

export function useCreateAgent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAgentRequest) => createAgent(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...AGENTS_QUERY_KEY] });
    },
  });
}

export function useUpdateAgent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ agentId, ...payload }: { agentId: string } & UpdateAgentRequest) =>
      updateAgent(agentId, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...AGENTS_QUERY_KEY] });
    },
  });
}
