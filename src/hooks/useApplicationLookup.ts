"use client";

import { useQuery } from "@tanstack/react-query";
import { lookupApplication } from "@/lib/api/applications";
import { QUERY_KEYS as QK } from "@/lib/api/types";

const PRX_CODE_PATTERN = /^PRX-\d{4}-\d{5}$/;

export function useApplicationLookup(code: string) {
  const normalizedCode = code.trim().toUpperCase();

  return useQuery({
    queryKey: [...QK.applicationLookup(normalizedCode)],
    queryFn: () => lookupApplication(normalizedCode),
    enabled: PRX_CODE_PATTERN.test(normalizedCode),
    retry: false,
  });
}

