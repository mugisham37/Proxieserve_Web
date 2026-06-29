"use client";

import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { recordApiNetworkFailure, recordApiSuccess } from "@/lib/backend-status-tracker";
import { ApiError, type ApiErrorType, isApiResponse, isRecord } from "@/lib/api/types";

export const SESSION_INVALIDATED_EVENT = "hebuza:session-invalidated";

/** Default timeout for most API calls. */
export const DEFAULT_API_TIMEOUT_MS = 5_000;
/** Auth mutations (signup, login, OTP) — includes Argon2 + session issuance on the server. */
export const AUTH_MUTATION_TIMEOUT_MS = 15_000;
/** Session hydration — may trigger token refresh on the server. */
export const AUTH_SESSION_TIMEOUT_MS = 8_000;

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

if (!apiBaseUrl && process.env.NODE_ENV === "production") {
  throw new Error("NEXT_PUBLIC_API_URL is required in production.");
}

function extractValidationMessage(payload: unknown): string {
  if (!isRecord(payload) || !Array.isArray(payload.detail) || payload.detail.length === 0) {
    return "Request validation failed.";
  }

  const [firstDetail] = payload.detail;
  if (isRecord(firstDetail) && typeof firstDetail.msg === "string") {
    return firstDetail.msg;
  }

  return "Request validation failed.";
}

function emitSessionInvalidated(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(SESSION_INVALIDATED_EVENT));
}

function normalizeError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (!axios.isAxiosError(error)) {
    return new ApiError("Something went wrong on our end. Please try again.", "unknown-error", 500);
  }

  const axiosError = error as AxiosError<unknown>;

  if (axiosError.code === "ECONNABORTED") {
    return new ApiError("The request took too long. Try again.", "timeout", 408);
  }

  if (!axiosError.response) {
    return new ApiError("Connection error. Check your internet and try again.", "network-error", 0);
  }

  const { data, status } = axiosError.response;

  if (status === 422) {
    return new ApiError(extractValidationMessage(data), "validation-error", status, data);
  }

  if (isApiResponse(data)) {
    const errorType = (data.errorType ?? "unknown-error") as ApiErrorType;
    const apiError = new ApiError(
      data.message,
      errorType,
      status,
      data.data,
    );

    if (status === 401 && errorType === "unauthorized") {
      emitSessionInvalidated();
    }

    return apiError;
  }

  if (status >= 500) {
    return new ApiError("Something went wrong on our end. Please try again.", "internal-error", status, data);
  }

  return new ApiError("Something went wrong. Please try again.", "unknown-error", status, data);
}

function applyRequestHeaders(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  config.withCredentials = true;
  config.headers.set("X-Requested-With", "XMLHttpRequest");

  if (config.data instanceof FormData) {
    config.headers.delete("Content-Type");
    return config;
  }

  if (!config.headers.has("Content-Type") && config.method !== "get") {
    config.headers.set("Content-Type", "application/json");
  }

  return config;
}

function attachResponseTracking(client: AxiosInstance): void {
  client.interceptors.response.use(
    (response) => {
      recordApiSuccess();

      const payload = response.data;

      if (isApiResponse(payload)) {
        if (!payload.success) {
          throw new ApiError(
            payload.message,
            (payload.errorType ?? "unknown-error") as ApiErrorType,
            response.status,
            payload.data,
          );
        }

        return payload.data;
      }

      return payload;
    },
    (error) => {
      const normalized = normalizeError(error);
      if (normalized.errorType === "network-error" || normalized.errorType === "timeout") {
        recordApiNetworkFailure();
      }
      return Promise.reject(normalized);
    },
  );
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  timeout: DEFAULT_API_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

export const healthClient: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  timeout: 2_000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(applyRequestHeaders);
healthClient.interceptors.request.use(applyRequestHeaders);
attachResponseTracking(apiClient);
attachResponseTracking(healthClient);
