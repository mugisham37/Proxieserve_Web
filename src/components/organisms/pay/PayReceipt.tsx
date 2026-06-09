"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ReceiptRow } from "@/components/molecules/dashboard/ReceiptRow";
import { PillButton } from "@/components/atoms/shared/PillButton";
import { usePayment } from "@/lib/payment-context";
import { useAuth } from "@/lib/auth-context";
import { MOCK_RECEIPT } from "@/lib/demo/payment-demo";
import { formatRWF, computeVAT, PAY_STATUS_KEY } from "@/lib/types/payment";

const METHOD_LABEL: Record<string, string> = {
  "mtn-momo": "MTN Mobile Money",
  "airtel-money": "Airtel Money",
  card: "Debit/credit card",
  agent: "ProxiServe agent",
};

export function PayReceipt() {
  const { session } = usePayment();
  const { session: authSession } = useAuth();

  // Merge session with mock receipt data for demo completeness
  const receipt = {
    ...MOCK_RECEIPT,
    ...session,
    transactionId: session.transactionId ?? MOCK_RECEIPT.transactionId,
    receiptNumber: session.receiptNumber ?? MOCK_RECEIPT.receiptNumber,
    paidAt: session.paidAt ?? MOCK_RECEIPT.paidAt,
    maskedPhone: session.maskedPhone ?? MOCK_RECEIPT.maskedPhone,
    selectedMethod: session.selectedMethod ?? MOCK_RECEIPT.selectedMethod,
  };

  const vatAmount = computeVAT(receipt.serviceFee, receipt.vatRate);
  const methodLabel = receipt.selectedMethod ? METHOD_LABEL[receipt.selectedMethod] : "MTN Mobile Money";
  const methodDetail = receipt.selectedMethod === "card" ? "" : ` · ${receipt.maskedPhone ?? ""}`;

  // Persist tracking code and payment status on mount
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("proxi:lastCode", receipt.trackingCode);
    localStorage.setItem(PAY_STATUS_KEY(receipt.applicationId), "paid");
  }, [receipt.trackingCode, receipt.applicationId]);

  function handlePrint() {
    window.print();
  }

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-8 py-12">
      {/* Print-only wordmark */}
      <div className="print-wordmark" aria-hidden="true">
        ProxiServe — Official Receipt
      </div>

      {/* Receipt card */}
      <motion.article
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
        className="w-full bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-xl)] overflow-hidden"
        style={{ maxWidth: "var(--pay-receipt-max)" }}
        aria-label="Payment receipt"
      >
        {/* Top — check + title + amount */}
        <div className="flex flex-col items-center gap-4 px-8 pt-10 pb-6 text-center">
          {/* Checkmark circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, duration: 0.2, ease: [0.2, 0, 0, 1] }}
            className="flex items-center justify-center w-[60px] h-[60px] rounded-full bg-[var(--ok-soft)]"
            aria-hidden="true"
          >
            <motion.svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <motion.path
                d="M5 14l6 6 12-12"
                stroke="var(--ok)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 0.35, ease: "easeOut" }}
              />
            </motion.svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex flex-col gap-1"
          >
            <h1 className="font-serif text-[22px] font-medium italic text-[var(--ink)]">
              Payment received
            </h1>
            <p
              className="font-serif text-[clamp(28px,5vw,40px)] font-medium text-[var(--ink)]"
              aria-label={`Amount: ${formatRWF(receipt.serviceFee)}`}
            >
              {formatRWF(receipt.serviceFee)}
            </p>
          </motion.div>
        </div>

        {/* Perforated divider */}
        <div className="perforated mx-6" aria-hidden="true" />

        {/* Body — receipt rows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="px-6 sm:px-8 py-2 divide-y divide-[var(--rule-soft)]"
        >
          <ReceiptRow label="Application" value={receipt.serviceName} />
          <ReceiptRow label="Tracking code" value={receipt.trackingCode} mono />
          <ReceiptRow label="Paid to" value="ProxiServe Ltd" />
          <ReceiptRow
            label="Method"
            value={`${methodLabel}${methodDetail}`}
            mono={!!methodDetail}
          />
          <ReceiptRow label="Transaction ID" value={receipt.transactionId ?? "—"} mono />
          <ReceiptRow label="Receipt no." value={receipt.receiptNumber ?? "—"} mono />
          <ReceiptRow label="Date" value={receipt.paidAt ?? "—"} />
          <ReceiptRow label={`Service fee (incl. ${Math.round(receipt.vatRate * 100)}% VAT)`} value={formatRWF(receipt.serviceFee)} />
          <ReceiptRow label="VAT amount" value={formatRWF(vatAmount)} status="muted" />
          <ReceiptRow label="Status" value="Paid in full" status="ok" />
        </motion.div>

        {/* Perforated divider */}
        <div className="perforated mx-6 mt-2" aria-hidden="true" />

        {/* Actions — hidden on print */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.3 }}
          className="print-hide flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-6 sm:px-8 py-6"
        >
          <PillButton
            variant="solid"
            size="md"
            onClick={handlePrint}
            className="flex-1 justify-center"
          >
            Download PDF
          </PillButton>
          {authSession ? (
            <PillButton
              variant="default"
              size="md"
              asChild
              className="flex-1 justify-center"
            >
              <Link href={`/app/${receipt.trackingCode}`}>
                View in dashboard →
              </Link>
            </PillButton>
          ) : (
            <PillButton
              variant="default"
              size="md"
              asChild
              className="flex-1 justify-center"
            >
              <Link href={`/?track=${receipt.trackingCode}`}>
                Track application
              </Link>
            </PillButton>
          )}
        </motion.div>
      </motion.article>

      {/* Print-only footer */}
      <div className="print-footer" aria-hidden="true">
        ProxiServe Ltd · info@proxiserve.rw · proxiserve.rw · This receipt is computer generated and valid without a signature.
      </div>

      {/* Government fee note */}
      {receipt.governmentFee > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="mt-6 font-sans text-[13px] text-[var(--ink-muted)] text-center max-w-[440px]"
        >
          Government fee of {formatRWF(receipt.governmentFee)} is paid separately at the government office. Your agent will guide you.
        </motion.p>
      )}
    </div>
  );
}
