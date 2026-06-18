"use client";

import { apiClient } from "@/lib/api/client";
import type {
  ApiResponse,
  InitiatePaymentRequest,
  InitiatePaymentResponse,
  PaymentReceiptResponse,
  PaymentStatusResponse,
} from "@/lib/api/types";

export function initiatePayment(payload: InitiatePaymentRequest): Promise<InitiatePaymentResponse> {
  return apiClient.post<ApiResponse<InitiatePaymentResponse>, InitiatePaymentResponse, InitiatePaymentRequest>(
    "/api/payments/initiate",
    payload,
  );
}

export function getPaymentStatus(transactionId: string): Promise<PaymentStatusResponse> {
  return apiClient.get<ApiResponse<PaymentStatusResponse>, PaymentStatusResponse>(
    `/api/payments/${transactionId}/status`,
  );
}

export function getPaymentReceipt(applicationCode: string): Promise<PaymentReceiptResponse> {
  return apiClient.get<ApiResponse<PaymentReceiptResponse>, PaymentReceiptResponse>(
    `/api/applications/${applicationCode}/payment/receipt`,
  );
}
