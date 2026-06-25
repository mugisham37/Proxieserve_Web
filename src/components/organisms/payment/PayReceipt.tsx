"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ReceiptRow } from "@/components/molecules/dashboard/ReceiptRow";
import { PillButton } from "@/components/atoms/shared/PillButton";
import { SkeletonBlock } from "@/components/atoms/shared/SkeletonBlock";
import { usePayment } from "@/lib/payment-context";
import { useAuth } from "@/lib/auth-context";
import { formatRWF, PAY_STATUS_KEY } from "@/lib/types/payment";
import { usePaymentReceipt } from "@/hooks/usePayment";

export function PayReceipt() {
  const { session } = usePayment();
  const { session: authSession } = useAuth();
  const { data: receiptData, isLoading, isError } = usePaymentReceipt(session.trackingCode || session.applicationId);

  const serviceName = receiptData?.serviceName ?? session.serviceName;
  const trackingCode = receiptData?.trackingCode ?? session.trackingCode;
  const amount = receiptData?.amount ?? session.serviceFee;
  const governmentFee = receiptData?.governmentFee ?? session.governmentFee;
  const vatAmount = receiptData?.vatAmount ?? 0;
  const methodLabel = receiptData?.method ?? (session.selectedMethod === "card" ? "Debit/credit card" : "MTN Mobile Money");
  const methodDetail = session.selectedMethod === "card" ? "" : session.maskedPhone ? ` · ${session.maskedPhone}` : "";
  const transactionId = receiptData?.transactionId ?? session.transactionId ?? "—";
  const receiptNumber = receiptData?.receiptNumber ?? session.receiptNumber ?? "—";
  const paidAt = receiptData?.paidAt ?? session.paidAt ?? "—";
  const vatRate = session.vatRate;

  React.useEffect(() => {
    if (typeof window === "undefined" || !receiptData) return;
    localStorage.setItem("hebuza:lastCode", trackingCode);
    localStorage.setItem(PAY_STATUS_KEY(session.applicationId), "paid");
  }, [receiptData, trackingCode, session.applicationId]);

  function handlePrint() {
    window.print();
  }

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center px-4 sm:px-8 py-12">
        <SkeletonBlock className="w-full rounded-[var(--r-xl)]" style={{ maxWidth: "var(--pay-receipt-max)", height: 480 }} />
      </div>
    );
  }

  if (isError && !session.transactionId) {
    return (
      <div className="w-full flex flex-col items-center px-4 sm:px-8 py-12 text-center gap-3">
        <p className="font-serif text-[20px] text-[var(--ink)]">Receipt unavailable</p>
        <p className="font-sans text-[14px] text-[var(--ink-muted)]">
          We could not load your receipt. Check your application dashboard for payment status.
        </p>
        <PillButton variant="default" size="md" asChild>
          <Link href={`/app/${trackingCode}`}>View application →</Link>
        </PillButton>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-8 py-12">
      <div className="print-wordmark" aria-hidden="true">
        Hebuza — Official Receipt
      </div>

      <motion.article
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
        className="w-full bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-xl)] overflow-hidden"
        style={{ maxWidth: "var(--pay-receipt-max)" }}
        aria-label="Payment receipt"
      >
        <div className="flex flex-col items-center gap-4 px-8 pt-10 pb-6 text-center">
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
              aria-label={`Amount: ${formatRWF(amount)}`}
            >
              {formatRWF(amount)}
            </p>
          </motion.div>
        </div>

        <div className="perforated mx-6" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="px-6 sm:px-8 py-2 divide-y divide-[var(--rule-soft)]"
        >
          <ReceiptRow label="Application" value={serviceName} />
          <ReceiptRow label="Tracking code" value={trackingCode} mono />
          <ReceiptRow label="Paid to" value="Hebuza Ltd" />
          <ReceiptRow
            label="Method"
            value={`${methodLabel}${methodDetail}`}
            mono={!!methodDetail}
          />
          <ReceiptRow label="Transaction ID" value={transactionId} mono />
          <ReceiptRow label="Receipt no." value={receiptNumber} mono />
          <ReceiptRow label="Date" value={paidAt} />
          <ReceiptRow label={`Service fee (incl. ${Math.round(vatRate * 100)}% VAT)`} value={formatRWF(amount)} />
          <ReceiptRow label="VAT amount" value={formatRWF(vatAmount)} status="muted" />
          <ReceiptRow label="Status" value="Paid in full" status="ok" />
        </motion.div>

        <div className="perforated mx-6 mt-2" aria-hidden="true" />

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
              <Link href={`/app/${trackingCode}`}>
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
              <Link href={`/?track=${trackingCode}`}>
                Track application
              </Link>
            </PillButton>
          )}
        </motion.div>
      </motion.article>

      <div className="print-footer" aria-hidden="true">
        Hebuza Ltd · info@hebuza.rw · hebuza.rw · This receipt is computer generated and valid without a signature.
      </div>

      {governmentFee > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="mt-6 font-sans text-[13px] text-[var(--ink-muted)] text-center max-w-[440px]"
        >
          Government fee of {formatRWF(governmentFee)} is paid separately at the government office. Your agent will guide you.
        </motion.p>
      )}
    </div>
  );
}
