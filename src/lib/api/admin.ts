"use client";

import { apiClient } from "@/lib/api/client";
import type { ApiResponse } from "@/lib/api/types";

export interface AgentListItem {
  agent_id: string;
  name: string;
  email: string;
  is_active: boolean;
  twofa_enabled: boolean;
  created_at: string;
}

export interface AgentListResponse {
  agents: AgentListItem[];
}

export interface CreateAgentRequest {
  name: string;
  email: string;
  temporary_password?: string;
}

export interface CreateAgentResponse {
  agent_id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  invite_sent: boolean;
}

export interface UpdateAgentRequest {
  is_active?: boolean;
  reset_password?: boolean;
  force_2fa_reset?: boolean;
}

export interface UpdateAgentResponse {
  agent_id: string;
  updated: string[];
}

export function getAgents(): Promise<AgentListItem[]> {
  return apiClient
    .get<ApiResponse<AgentListResponse>, AgentListResponse>("/api/admin/agents")
    .then((r) => r.agents);
}

export function createAgent(payload: CreateAgentRequest): Promise<CreateAgentResponse> {
  return apiClient.post<ApiResponse<CreateAgentResponse>, CreateAgentResponse, CreateAgentRequest>(
    "/api/admin/agents",
    payload,
  );
}

export function updateAgent(agentId: string, payload: UpdateAgentRequest): Promise<UpdateAgentResponse> {
  return apiClient.patch<ApiResponse<UpdateAgentResponse>, UpdateAgentResponse, UpdateAgentRequest>(
    `/api/admin/agents/${agentId}`,
    payload,
  );
}
