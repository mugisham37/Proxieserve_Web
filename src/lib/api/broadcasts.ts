"use client";

import { apiClient } from "@/lib/api/client";
import type {
  ApiResponse,
  BroadcastListResponse,
  BroadcastRecord,
  CreateBroadcastRequest,
} from "@/lib/api/types";

export function getBroadcasts(): Promise<BroadcastListResponse> {
  return apiClient.get<ApiResponse<BroadcastListResponse>, BroadcastListResponse>("/api/admin/broadcasts");
}

export function createBroadcast(payload: CreateBroadcastRequest): Promise<BroadcastRecord> {
  return apiClient.post<ApiResponse<BroadcastRecord>, BroadcastRecord, CreateBroadcastRequest>(
    "/api/admin/broadcasts",
    payload,
  );
}
