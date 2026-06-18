import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PaymentProvider, PaymentSessionHydrator } from "@/lib/payment-context";

interface Props {
  children: ReactNode;
  params: Promise<{ applicationId: string }>;
}

export default async function ApplicationPaymentLayout({ children, params }: Props) {
  const { applicationId } = await params;

  return (
    <PaymentProvider applicationId={applicationId}>
      <PaymentSessionHydrator applicationId={applicationId} />
      <div className="min-h-screen bg-[var(--cream)] flex flex-col">
        {/* Payment shell top bar */}
        <header className="border-b border-[var(--rule)] bg-[var(--paper)] sticky top-0 z-30">
          <div className="container flex items-center justify-between h-14 gap-4">
            <Link
              href={`/app/${applicationId}`}
              className="flex items-center gap-2 font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
              aria-label="Back to application"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              <span className="hidden sm:inline">Back to application</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="font-serif italic text-[14px] text-[var(--ink-muted)]">
                Payment
              </span>
              <span className="text-[var(--rule-strong)]" aria-hidden="true">·</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-subtle)]">
                Payment
              </span>
            </div>

            {/* Wordmark */}
            <Link href="/" className="font-serif italic text-[15px] font-medium text-[var(--ink)]">
              ProxiServe
            </Link>
          </div>
        </header>

        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Skip link target */}
        <a href="#main-content" className="skip">
          Skip to payment
        </a>
      </div>
    </PaymentProvider>
  );
}
