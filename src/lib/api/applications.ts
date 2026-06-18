"use client";

import { apiClient } from "@/lib/api/client";
import type {
  AdminApplicationListResponse,
  AdminApplicationsFilter,
  AgentCaseListResponse,
  ApiResponse,
  ApplicationClaimData,
  ApplicationClaimRequest,
  ApplicationDetail,
  ApplicationListResponse,
  ApplicationLookupData,
  AssignApplicationRequest,
  CancelApplicationRequest,
  DashboardSummary,
  SubmitApplicationRequest,
  SubmitApplicationResponse,
  TrackerResponse,
  UnassignedQueueResponse,
  UpdateStatusRequest,
} from "@/lib/api/types";

export function lookupApplication(code: string): Promise<ApplicationLookupData> {
  return apiClient.get<ApiResponse<ApplicationLookupData>, ApplicationLookupData>("/api/applications/lookup", {
    params: { code },
  });
}

export function claimApplication(data: ApplicationClaimRequest): Promise<ApplicationClaimData> {
  return apiClient.post<ApiResponse<ApplicationClaimData>, ApplicationClaimData, ApplicationClaimRequest>(
    "/api/applications/claim",
    data,
  );
}

export function submitApplication(data: SubmitApplicationRequest): Promise<SubmitApplicationResponse> {
  return apiClient.post<ApiResponse<SubmitApplicationResponse>, SubmitApplicationResponse, SubmitApplicationRequest>(
    "/api/applications/submit",
    data,
  );
}

export function getApplications(): Promise<ApplicationListResponse> {
  return apiClient.get<ApiResponse<ApplicationListResponse>, ApplicationListResponse>("/api/applications");
}

export function getApplicationSummary(): Promise<DashboardSummary> {
  return apiClient.get<ApiResponse<DashboardSummary>, DashboardSummary>("/api/applications/summary");
}

export function getApplicationDetail(code: string): Promise<ApplicationDetail> {
  return apiClient.get<ApiResponse<ApplicationDetail>, ApplicationDetail>(`/api/applications/${code}`);
}

export function cancelApplication(code: string, reason?: string): Promise<null> {
  const payload: CancelApplicationRequest = reason ? { reason } : {};
  return apiClient.post<ApiResponse<null>, null, CancelApplicationRequest>(
    `/api/applications/${code}/cancel`,
    payload,
  );
}

export function getTrackerInfo(code: string): Promise<TrackerResponse> {
  return apiClient.get<ApiResponse<TrackerResponse>, TrackerResponse>(`/api/track/${code}`);
}

export function getAdminApplications(filters?: AdminApplicationsFilter): Promise<AdminApplicationListResponse> {
  return apiClient.get<ApiResponse<AdminApplicationListResponse>, AdminApplicationListResponse>(
    "/api/admin/applications",
    { params: filters },
  );
}

export function getAdminApplicationDetail(code: string): Promise<ApplicationDetail> {
  return apiClient.get<ApiResponse<ApplicationDetail>, ApplicationDetail>(`/api/admin/applications/${code}`);
}

export function assignApplication(code: string, agentId: string, note?: string): Promise<null> {
  const payload: AssignApplicationRequest = { agent_id: agentId, note };
  return apiClient.patch<ApiResponse<null>, null, AssignApplicationRequest>(
    `/api/admin/applications/${code}/assign`,
    payload,
  );
}

export function autoAssignApplication(code: string): Promise<{ assigned: boolean }> {
  return apiClient.post<ApiResponse<{ assigned: boolean }>, { assigned: boolean }>(
    `/api/admin/applications/${code}/auto-assign`,
  );
}

export function updateAdminApplicationStatus(
  code: string,
  payload: UpdateStatusRequest,
): Promise<ApplicationDetail> {
  return apiClient.patch<ApiResponse<ApplicationDetail>, ApplicationDetail, UpdateStatusRequest>(
    `/api/admin/applications/${code}/status`,
    payload,
  );
}

export function getAgentCases(): Promise<AgentCaseListResponse> {
  return apiClient.get<ApiResponse<AgentCaseListResponse>, AgentCaseListResponse>("/api/agent/cases");
}

export function getAgentCase(code: string): Promise<ApplicationDetail> {
  return apiClient.get<ApiResponse<ApplicationDetail>, ApplicationDetail>(`/api/agent/cases/${code}`);
}

export function getUnassignedCases(): Promise<UnassignedQueueResponse> {
  return apiClient.get<ApiResponse<UnassignedQueueResponse>, UnassignedQueueResponse>(
    "/api/agent/cases/unassigned",
  );
}

export function claimCase(code: string): Promise<null> {
  return apiClient.post<ApiResponse<null>, null>(`/api/agent/cases/unassigned/${code}/claim`);
}

export function updateCaseStatus(code: string, payload: UpdateStatusRequest): Promise<ApplicationDetail> {
  return apiClient.patch<ApiResponse<ApplicationDetail>, ApplicationDetail, UpdateStatusRequest>(
    `/api/agent/cases/${code}/status`,
    payload,
  );
}
