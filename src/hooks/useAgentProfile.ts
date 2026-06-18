"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminAgentSkills,
  getAdminLeaderboard,
  getAgentMetrics,
  getAgentSettings,
  getAgentSkills,
  setAdminAgentSkills,
  updateAgentSettings,
} from "@/lib/api/assignments";
import type { AgentSkill, UpdateAgentSettingsRequest } from "@/lib/api/types";
import { QUERY_KEYS as QK } from "@/lib/api/types";

export function useAgentSettings() {
  return useQuery({
    queryKey: [...QK.agentSettings],
    queryFn: getAgentSettings,
  });
}

export function useUpdateAgentSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateAgentSettingsRequest) => updateAgentSettings(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.agentSettings] });
    },
  });
}

export function useAgentSkills() {
  return useQuery({
    queryKey: [...QK.agentSkills],
    queryFn: getAgentSkills,
  });
}

export function useAgentMetrics() {
  return useQuery({
    queryKey: [...QK.agentMetrics],
    queryFn: getAgentMetrics,
  });
}

export function useAdminAgentSkills(agentId: string) {
  return useQuery({
    queryKey: [...QK.adminAgentSkills(agentId)],
    queryFn: () => getAdminAgentSkills(agentId),
    enabled: Boolean(agentId),
  });
}

export function useSetAdminAgentSkills(agentId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (skills: AgentSkill[]) => setAdminAgentSkills(agentId, skills),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.adminAgentSkills(agentId)] });
    },
  });
}

export function useAdminLeaderboard() {
  return useQuery({
    queryKey: [...QK.adminLeaderboard],
    queryFn: getAdminLeaderboard,
  });
}
