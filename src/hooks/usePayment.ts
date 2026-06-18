"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPaymentReceipt, getPaymentStatus, initiatePayment } from "@/lib/api/payments";
import type { InitiatePaymentRequest } from "@/lib/api/types";
import { QUERY_KEYS as QK } from "@/lib/api/types";
import { usePayment } from "@/lib/payment-context";

export function useInitiatePayment() {
  const { dispatch } = usePayment();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: InitiatePaymentRequest) => initiatePayment(payload),
    onSuccess: (data) => {
      dispatch({
        type: "PATCH",
        payload: {
          transactionId: data.transactionId,
          status: data.status === "processing" ? "processing" : "idle",
        },
      });
      void queryClient.invalidateQueries({ queryKey: [...QK.paymentStatus(data.transactionId)] });
    },
  });
}

export function usePaymentStatus(transactionId: string, enabled = true) {
  return useQuery({
    queryKey: [...QK.paymentStatus(transactionId)],
    queryFn: () => getPaymentStatus(transactionId),
    enabled: enabled && Boolean(transactionId),
    refetchInterval: (query) => (query.state.data?.status === "processing" ? 5000 : false),
  });
}

export function usePaymentReceipt(applicationCode: string) {
  return useQuery({
    queryKey: [...QK.paymentReceipt(applicationCode)],
    queryFn: () => getPaymentReceipt(applicationCode),
    enabled: Boolean(applicationCode),
  });
}
