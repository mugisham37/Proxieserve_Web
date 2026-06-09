"use client";

import { apiClient } from "@/lib/api/client";
import type {
  ApiResponse,
  ApplicationClaimData,
  ApplicationClaimRequest,
  ApplicationLookupData,
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
