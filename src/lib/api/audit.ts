"use client";

import { apiClient } from "@/lib/api/client";
import type { ApiResponse, AuditLogFilter, AuditLogResponse } from "@/lib/api/types";

export function getAuditLog(filter?: AuditLogFilter): Promise<AuditLogResponse> {
  return apiClient.get<ApiResponse<AuditLogResponse>, AuditLogResponse>("/api/admin/audit-log", {
    params: {
      kind: filter?.kind,
      limit: filter?.limit ?? 50,
      offset: filter?.offset ?? 0,
    },
  });
}
