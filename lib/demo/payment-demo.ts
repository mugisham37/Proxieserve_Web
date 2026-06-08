import type { PaymentSession } from "@/lib/types/payment";

export const MOCK_PAYMENT_SESSIONS: Record<string, PaymentSession> = {
  "PRX-2026-00483": {
    applicationId: "PRX-2026-00483",
    trackingCode: "PRX-2026-00483",
    serviceName: "Passport renewal",
    serviceFee: 15000,
    governmentFee: 75000,
    vatRate: 0.18,
    platformFee: 0,
    selectedMethod: null,
    status: "idle",
    transactionId: undefined,
    receiptNumber: undefined,
    paidAt: undefined,
  },
  "PRX-2026-00516": {
    applicationId: "PRX-2026-00516",
    trackingCode: "PRX-2026-00516",
    serviceName: "Tax registration",
    serviceFee: 12000,
    governmentFee: 0,
    vatRate: 0.18,
    platformFee: 0,
    selectedMethod: null,
    status: "already-paid",
    transactionId: "MP260420.1100.B12345",
    receiptNumber: "RCP-2026-04710",
    paidAt: "20 Apr 2026 · 11:00 CAT",
    maskedPhone: "78 8 *** 456",
  },
};

export const MOCK_RECEIPT: PaymentSession = {
  applicationId: "PRX-2026-00483",
  trackingCode: "PRX-2026-00483",
  serviceName: "Passport renewal",
  serviceFee: 15000,
  governmentFee: 75000,
  vatRate: 0.18,
  platformFee: 0,
  selectedMethod: "mtn-momo",
  status: "success",
  transactionId: "MP260523.1432.A48217",
  receiptNumber: "RCP-2026-04821",
  paidAt: "23 May 2026 · 14:32 CAT",
  maskedPhone: "78 8 *** 456",
  cardBrand: null,
};

export function getPaymentSession(applicationId: string): PaymentSession | null {
  return MOCK_PAYMENT_SESSIONS[applicationId] ?? null;
}

export function getDefaultSession(applicationId: string): PaymentSession {
  return {
    applicationId,
    trackingCode: applicationId,
    serviceName: "Government service",
    serviceFee: 15000,
    governmentFee: 0,
    vatRate: 0.18,
    platformFee: 0,
    selectedMethod: null,
    status: "idle",
  };
}
