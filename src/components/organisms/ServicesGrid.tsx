"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { SkeletonBlock } from "@/components/atoms/shared/SkeletonBlock";
import { ServiceCard } from "@/components/molecules/ServiceCard";
import { EmptyState } from "@/components/molecules/EmptyState";
import { ErrorState } from "@/components/molecules/ErrorState";
import { OfflineBanner } from "@/components/molecules/OfflineBanner";

type ColorVariant = "marigold" | "pink" | "green" | "blue" | "red" | "cream";

interface Service {
  id: string;
  category: string;
  name: string;
  fee: string;
  eta: string;
  href: string;
  colorVariant: ColorVariant;
}

const SERVICES: Service[] = [
  { id: "1", category: "Business", name: "Company Registration", fee: "RWF 45,000", eta: "3–5 days", href: "/services/company-registration", colorVariant: "marigold" },
  { id: "2", category: "Identity", name: "National ID Renewal", fee: "RWF 8,000", eta: "2–3 days", href: "/services/national-id", colorVariant: "pink" },
  { id: "3", category: "Tax", name: "TIN Registration", fee: "RWF 15,000", eta: "1–2 days", href: "/services/tin", colorVariant: "green" },
  { id: "4", category: "Permits", name: "Business Permit", fee: "RWF 30,000", eta: "5–7 days", href: "/services/business-permit", colorVariant: "blue" },
  { id: "5", category: "Welfare", name: "RSSB Enrollment", fee: "RWF 12,000", eta: "2–4 days", href: "/services/rssb", colorVariant: "red" },
  { id: "6", category: "Legal", name: "Notarial Deed", fee: "RWF 25,000", eta: "3–4 days", href: "/services/notarial-deed", colorVariant: "cream" },
];

type GridState = "loading" | "loaded" | "empty" | "error" | "offline";

interface ServicesGridProps {
  state?: GridState;
  className?: string;
}

export function ServicesGrid({ state = "loaded", className }: ServicesGridProps) {
  const [currentState, setCurrentState] = React.useState<GridState>(state);

  function handleRetry() {
    setCurrentState("loading");
    setTimeout(() => setCurrentState("loaded"), 1200);
  }

  return (
    <section
      className={cn("bg-[var(--cream)] py-16 sm:py-20", className)}
      aria-labelledby="services-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="flex items-end justify-between gap-4 mb-8"
        >
          <div>
            <Eyebrow withLine className="text-[var(--ink-muted)] mb-3">Our services</Eyebrow>
            <h2 id="services-heading" className="t-h2 text-[var(--ink)]">What we handle</h2>
          </div>
          <Link href="/services" className="lnk-arrow hidden sm:inline-flex font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)]">
            See all 14
          </Link>
        </motion.div>

        {currentState === "offline" && (
          <OfflineBanner className="mb-4" onRetry={handleRetry} />
        )}

        {currentState === "error" ? (
          <ErrorState
            title="Couldn't load services"
            description="There was a problem loading the service catalogue. Please try again."
            onRetry={handleRetry}
          />
        ) : currentState === "empty" ? (
          <EmptyState
            title="No services listed yet"
            description="The service catalogue is being updated. Enter your email to be notified."
          />
        ) : (
          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
              "gap-px bg-[var(--ink)]",
              "border border-[var(--ink)] rounded-[var(--r-xl)] overflow-hidden",
              currentState === "offline" && "opacity-60"
            )}
          >
            {currentState === "loading"
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-[var(--cream)] p-6 min-h-[180px]">
                    <SkeletonBlock height={12} width="40%" className="mb-4" />
                    <SkeletonBlock height={32} width="70%" className="mb-6 rounded-[999px]" />
                    <SkeletonBlock height={12} width="55%" className="mt-auto" />
                  </div>
                ))
              : SERVICES.map((service) => (
                  <ServiceCard
                    key={service.id}
                    category={service.category}
                    name={service.name}
                    fee={service.fee}
                    eta={service.eta}
                    href={service.href}
                    colorVariant={service.colorVariant}
                    offline={currentState === "offline"}
                  />
                ))}
          </div>
        )}

        <div className="flex justify-end mt-4 sm:hidden">
          <Link href="/services" className="lnk-arrow font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)]">
            See all 14
          </Link>
        </div>
      </div>
    </section>
  );
}
