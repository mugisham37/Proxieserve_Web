"use client";

import { apiClient } from "@/lib/api/client";
import type {
  ApiResponse,
  MessageItem,
  MessageListResponse,
  SendMessageRequest,
} from "@/lib/api/types";

export function getMessages(code: string): Promise<MessageListResponse> {
  return apiClient.get<ApiResponse<MessageListResponse>, MessageListResponse>(
    `/api/applications/${code}/messages`,
  );
}

export function getAgentMessages(code: string): Promise<MessageListResponse> {
  return apiClient.get<ApiResponse<MessageListResponse>, MessageListResponse>(
    `/api/agent/cases/${code}/messages`,
  );
}

export function getAdminMessages(code: string): Promise<MessageListResponse> {
  return apiClient.get<ApiResponse<MessageListResponse>, MessageListResponse>(
    `/api/admin/applications/${code}/messages`,
  );
}

export function sendMessage(code: string, payload: SendMessageRequest): Promise<MessageItem> {
  return apiClient.post<ApiResponse<MessageItem>, MessageItem, SendMessageRequest>(
    `/api/applications/${code}/messages`,
    payload,
  );
}

export function sendAgentMessage(code: string, payload: SendMessageRequest): Promise<MessageItem> {
  return apiClient.post<ApiResponse<MessageItem>, MessageItem, SendMessageRequest>(
    `/api/agent/cases/${code}/messages`,
    payload,
  );
}

export function markMessagesRead(code: string): Promise<{ marked: number }> {
  return apiClient.patch<ApiResponse<{ marked: number }>, { marked: number }>(
    `/api/applications/${code}/messages/read`,
  );
}
