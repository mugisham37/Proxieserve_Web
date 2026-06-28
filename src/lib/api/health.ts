"use client";

import { healthClient } from "@/lib/api/client";

export async function pingHealth(): Promise<boolean> {
  try {
    await healthClient.get("/health");
    return true;
  } catch {
    return false;
  }
}
