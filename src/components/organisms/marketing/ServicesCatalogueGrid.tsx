"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { SearchInput } from "@/components/atoms/shared/SearchInput";
import { ServiceFilterBar } from "@/components/molecules/marketing/ServiceFilterBar";
import { CatalogueCard } from "@/components/molecules/marketing/CatalogueCard";
import { ServiceSkeletonCard } from "@/components/molecules/marketing/ServiceSkeletonCard";
import { EmptySearch } from "@/components/molecules/shared/EmptySearch";
import { useServices } from "@/hooks/useServices";
import { adaptServiceSummary } from "@/lib/service-adapters";
import { CATEGORY_LABELS, type ServiceCategory } from "@/lib/service-constants";

interface ServicesCatalogueGridProps {
  className?: string;
}

export function ServicesCatalogueGrid({ className }: ServicesCatalogueGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data, isLoading, isError } = useServices();

  const category = (searchParams.get("category") ?? "all") as ServiceCategory | "all";
  const query = searchParams.get("q") ?? "";

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v && v !== "all") params.set(k, v);
      else params.delete(k);
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const services = (data?.services ?? []).map(adaptServiceSummary).filter((s) => s.status === "active");

  const filtered = services.filter((s) => {
    const matchCat = category === "all" || s.category === category;
    const matchQ =
      !query ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.lede.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const resultLabel =
    category !== "all" && !query
      ? `${filtered.length} service${filtered.length !== 1 ? "s" : ""} in ${CATEGORY_LABELS[category as ServiceCategory]}`
      : `${filtered.length} service${filtered.length !== 1 ? "s" : ""}`;

  return (
    <section className={cn("bg-[var(--cream)] py-14 sm:py-20", className)} aria-labelledby="catalogue-heading">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] as [number, number, number, number] }}
          className="mb-8"
        >
          <Eyebrow withLine className="text-[var(--ink-muted)] mb-3">All services</Eyebrow>
          <h1 id="catalogue-heading" className="t-h1 text-[var(--ink)] mb-3">
            What can we help you with?
          </h1>
          <p className="t-lede text-[var(--ink-muted)] max-w-xl mb-8">
            Paperwork, permits, and government services — handled for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <SearchInput
              value={query}
              onChange={(v) => updateParams({ q: v })}
              onClear={() => updateParams({ q: "" })}
              placeholder="Search services…"
              className="sm:max-w-xs"
            />
          </div>
          <ServiceFilterBar
            activeCategory={category}
            onSelect={(cat) => updateParams({ category: cat })}
          />
        </motion.div>

        {isError && (
          <p className="font-sans text-[14px] text-[var(--danger)] mb-5">
            Could not load services. Please refresh the page.
          </p>
        )}

        {!isLoading && (
          <p className="font-sans text-[12px] text-[var(--ink-subtle)] mb-5" aria-live="polite" aria-atomic="true">
            {resultLabel}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <ServiceSkeletonCard key={i} />)
          ) : filtered.length === 0 ? (
            <EmptySearch
              query={query || undefined}
              onClear={() => updateParams({ q: "", category: "all" })}
            />
          ) : (
            filtered.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.04,
                  ease: [0.2, 0, 0, 1] as [number, number, number, number],
                }}
              >
                <CatalogueCard service={service} className="h-full" />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
