"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAgentMessages,
  getMessages,
  markMessagesRead,
  sendAgentMessage,
  sendMessage,
} from "@/lib/api/messages";
import type { MessageItem, SendMessageRequest } from "@/lib/api/types";
import { QUERY_KEYS as QK } from "@/lib/api/types";

export function useMessages(code: string, isAgent = false) {
  return useQuery({
    queryKey: [...QK.messages(code, isAgent)],
    queryFn: () => (isAgent ? getAgentMessages(code) : getMessages(code)),
    enabled: Boolean(code),
  });
}

export function useSendMessage(code: string, isAgent = false) {
  const queryClient = useQueryClient();
  const queryKey = [...QK.messages(code, isAgent)];

  return useMutation({
    mutationFn: (payload: SendMessageRequest) =>
      isAgent ? sendAgentMessage(code, payload) : sendMessage(code, payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<{ messages: MessageItem[] }>(queryKey);
      const optimistic: MessageItem = {
        message_id: `temp-${Date.now()}`,
        sender_id: null,
        sender_role: isAgent ? "staff:agent" : "client",
        content: payload.content,
        is_internal: payload.is_internal ?? false,
        is_system: false,
        attachments: payload.attachments ?? [],
        is_read_by_client: false,
        read_by_agent_at: null,
        created_at: new Date().toISOString(),
      };
      queryClient.setQueryData(queryKey, {
        messages: [...(previous?.messages ?? []), optimistic],
      });
      return { previous };
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey });
      void queryClient.invalidateQueries({ queryKey: [...QK.application(code)] });
      void queryClient.invalidateQueries({ queryKey: [...QK.agentCase(code)] });
    },
  });
}

export function useMarkMessagesRead(code: string) {
  return useMutation({
    mutationFn: () => markMessagesRead(code),
  });
}
