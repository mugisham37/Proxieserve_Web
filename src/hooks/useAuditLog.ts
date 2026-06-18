"use client";

import { useQuery } from "@tanstack/react-query";
import { getAuditLog } from "@/lib/api/audit";
import type { AuditLogFilter } from "@/lib/api/types";
import { QUERY_KEYS as QK } from "@/lib/api/types";

export function useAuditLog(filter?: AuditLogFilter) {
  return useQuery({
    queryKey: [...QK.auditLog(filter)],
    queryFn: () => getAuditLog(filter),
  });
}
