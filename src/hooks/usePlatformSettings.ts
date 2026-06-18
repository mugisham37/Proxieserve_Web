"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlatformSettings, updatePlatformSettings } from "@/lib/api/platform";
import type { UpdatePlatformSettingsRequest } from "@/lib/api/types";
import { QUERY_KEYS as QK } from "@/lib/api/types";

export function usePlatformSettings() {
  return useQuery({
    queryKey: [...QK.platformSettings],
    queryFn: getPlatformSettings,
  });
}

export function useUpdatePlatformSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdatePlatformSettingsRequest) => updatePlatformSettings(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.platformSettings] });
    },
  });
}
