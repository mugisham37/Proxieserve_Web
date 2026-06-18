"use client";

import { apiClient } from "@/lib/api/client";
import type { AnalyticsResponse, ApiResponse } from "@/lib/api/types";

export function getAdminAnalytics(): Promise<AnalyticsResponse> {
  return apiClient.get<ApiResponse<AnalyticsResponse>, AnalyticsResponse>("/api/admin/analytics");
}
