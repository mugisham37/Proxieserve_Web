"use client";

import { apiClient } from "@/lib/api/client";
import type {
  AgentMetrics,
  AgentSettings,
  AgentSkillsResponse,
  ApiResponse,
  LeaderboardResponse,
  SetAgentSkillsRequest,
  UpdateAgentSettingsRequest,
} from "@/lib/api/types";

export function getAgentSettings(): Promise<AgentSettings> {
  return apiClient.get<ApiResponse<AgentSettings>, AgentSettings>("/api/agent/settings");
}

export function updateAgentSettings(payload: UpdateAgentSettingsRequest): Promise<AgentSettings> {
  return apiClient.put<ApiResponse<AgentSettings>, AgentSettings, UpdateAgentSettingsRequest>(
    "/api/agent/settings",
    payload,
  );
}

export function getAgentSkills(): Promise<AgentSkillsResponse> {
  return apiClient.get<ApiResponse<AgentSkillsResponse>, AgentSkillsResponse>("/api/agent/skills");
}

export function getAgentMetrics(): Promise<AgentMetrics> {
  return apiClient.get<ApiResponse<AgentMetrics>, AgentMetrics>("/api/agent/metrics");
}

export function getAdminAgentSkills(agentId: string): Promise<AgentSkillsResponse> {
  return apiClient.get<ApiResponse<AgentSkillsResponse>, AgentSkillsResponse>(
    `/api/admin/agents/${agentId}/skills`,
  );
}

export function setAdminAgentSkills(agentId: string, skills: SetAgentSkillsRequest["skills"]): Promise<AgentSkillsResponse> {
  const payload: SetAgentSkillsRequest = { skills };
  return apiClient.patch<ApiResponse<AgentSkillsResponse>, AgentSkillsResponse, SetAgentSkillsRequest>(
    `/api/admin/agents/${agentId}/skills`,
    payload,
  );
}

export function getAdminLeaderboard(): Promise<LeaderboardResponse> {
  return apiClient.get<ApiResponse<LeaderboardResponse>, LeaderboardResponse>("/api/admin/agents/leaderboard");
}
