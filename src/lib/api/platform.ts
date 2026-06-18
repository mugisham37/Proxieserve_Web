"use client";

import { apiClient } from "@/lib/api/client";
import type {
  ApiResponse,
  PlatformSettings,
  UpdatePlatformSettingsRequest,
} from "@/lib/api/types";

export function getPlatformSettings(): Promise<PlatformSettings> {
  return apiClient.get<ApiResponse<PlatformSettings>, PlatformSettings>("/api/admin/settings");
}

export function updatePlatformSettings(payload: UpdatePlatformSettingsRequest): Promise<PlatformSettings> {
  return apiClient.patch<ApiResponse<PlatformSettings>, PlatformSettings, UpdatePlatformSettingsRequest>(
    "/api/admin/settings",
    payload,
  );
}
