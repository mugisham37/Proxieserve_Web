"use client";

import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { ApiError, type ApiErrorType, isApiResponse, isRecord } from "@/lib/api/types";

export const SESSION_INVALIDATED_EVENT = "hebuza:session-invalidated";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiBaseUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is required.");
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

export const apiClient: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(applyRequestHeaders);

apiClient.interceptors.response.use(
  (response) => {
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
  (error) => Promise.reject(normalizeError(error)),
);
