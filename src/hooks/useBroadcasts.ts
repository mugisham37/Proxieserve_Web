"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBroadcast, getBroadcasts } from "@/lib/api/broadcasts";
import type { CreateBroadcastRequest } from "@/lib/api/types";
import { QUERY_KEYS as QK } from "@/lib/api/types";

export function useBroadcasts() {
  return useQuery({
    queryKey: [...QK.broadcasts],
    queryFn: getBroadcasts,
  });
}

export function useCreateBroadcast() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBroadcastRequest) => createBroadcast(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...QK.broadcasts] });
    },
  });
}
