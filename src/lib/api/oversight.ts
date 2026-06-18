"use client";

import { apiClient } from "@/lib/api/client";
import type {
  ApiResponse,
  EscalateCaseRequest,
  OversightCaseListResponse,
  ResolveCaseRequest,
} from "@/lib/api/types";

export function getOversightCases(tab?: string): Promise<OversightCaseListResponse> {
  return apiClient.get<ApiResponse<OversightCaseListResponse>, OversightCaseListResponse>(
    "/api/admin/oversight/cases",
    { params: { tab: tab ?? "all" } },
  );
}

export function escalateCase(code: string, reason: string): Promise<{ escalated: boolean }> {
  const payload: EscalateCaseRequest = { reason };
  return apiClient.patch<ApiResponse<{ escalated: boolean }>, { escalated: boolean }, EscalateCaseRequest>(
    `/api/admin/oversight/cases/${code}/escalate`,
    payload,
  );
}

export function resolveCase(code: string, resolutionNote?: string): Promise<{ resolved: boolean }> {
  const payload: ResolveCaseRequest = resolutionNote ? { resolution_note: resolutionNote } : {};
  return apiClient.patch<ApiResponse<{ resolved: boolean }>, { resolved: boolean }, ResolveCaseRequest>(
    `/api/admin/oversight/cases/${code}/resolve`,
    payload,
  );
}
