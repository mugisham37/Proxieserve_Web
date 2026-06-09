export type PaymentMethod = "mtn-momo" | "airtel-money" | "card" | "agent";

export type PaymentOutcome =
  | "timeout"
  | "declined"
  | "awaiting-agent"
  | "already-paid"
  | "dispute"
  | "refund-issued"
  | "connection-lost"
  | "3ds-failed"
  | "fee-changed"
  | "processing"
  | "pay-agent-confirm";

export const VALID_OUTCOMES: PaymentOutcome[] = [
  "timeout",
  "declined",
  "awaiting-agent",
  "already-paid",
  "dispute",
  "refund-issued",
  "connection-lost",
  "3ds-failed",
  "fee-changed",
  "processing",
  "pay-agent-confirm",
];

export interface PaymentSession {
  applicationId: string;
  trackingCode: string;
  serviceName: string;
  serviceFee: number;
  governmentFee: number;
  vatRate: number;
  platformFee: number;
  selectedMethod: PaymentMethod | null;
  status: "idle" | "processing" | "success" | PaymentOutcome;
  transactionId?: string;
  receiptNumber?: string;
  paidAt?: string;
  maskedPhone?: string;
  cardBrand?: "visa" | "mastercard" | null;
}

export interface CardDetails {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  cardholderName: string;
  saveCard: boolean;
  brand: "visa" | "mastercard" | null;
}

export interface MobileMoneyDetails {
  countryCode: string;
  localNumber: string;
  isAccountPhone: boolean;
}

export const PAY_SESSION_KEY = (applicationId: string) =>
  `proxi:pay:${applicationId}`;

export const PAY_STATUS_KEY = (applicationId: string) =>
  `proxi:pay-status:${applicationId}`;

export function formatRWF(amount: number): string {
  return `RWF ${amount.toLocaleString("en-US")}`;
}

export function computeVAT(fee: number, vatRate: number): number {
  return Math.round(fee - fee / (1 + vatRate));
}
