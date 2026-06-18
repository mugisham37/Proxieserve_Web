"use client";

import { useService, useServices } from "@/hooks/useServices";
import { adaptServiceDetail, adaptServiceSummary } from "@/lib/service-adapters";
import { ServiceDetailHero } from "@/components/organisms/marketing/ServiceDetailHero";
import { ServiceSubNav } from "@/components/organisms/marketing/ServiceSubNav";
import { ServiceRequirementsSection } from "@/components/organisms/marketing/ServiceRequirementsSection";
import { ServiceStepsSection } from "@/components/organisms/marketing/ServiceStepsSection";
import { ServicePricingSection } from "@/components/organisms/marketing/ServicePricingSection";
import { ServiceFAQsSection } from "@/components/organisms/marketing/ServiceFAQsSection";
import { RelatedServicesSection } from "@/components/organisms/marketing/RelatedServicesSection";
import { ServicesHelpBand } from "@/components/organisms/marketing/ServicesHelpBand";
import { StickyServiceBar } from "@/components/organisms/shared/StickyServiceBar";
import { SiteFooter } from "@/components/organisms/marketing/SiteFooter";
import { ServiceSkeletonCard } from "@/components/molecules/marketing/ServiceSkeletonCard";

interface ServiceDetailClientProps {
  slug: string;
}

export function ServiceDetailClient({ slug }: ServiceDetailClientProps) {
  const { data, isLoading, isError } = useService(slug);
  const { data: listData } = useServices();

  if (isLoading) {
    return (
      <div className="container py-16">
        <ServiceSkeletonCard />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="container py-16 text-center">
        <p className="font-sans text-[14px] text-[var(--ink-muted)]">Service not found.</p>
      </div>
    );
  }

  const relatedSlugs =
    listData?.services
      .filter((s) => s.category === data.category && s.slug !== data.slug)
      .slice(0, 3)
      .map((s) => s.slug) ?? [];

  const service = adaptServiceDetail(data, relatedSlugs);
  const relatedServices = (listData?.services ?? [])
    .filter((s) => relatedSlugs.includes(s.slug))
    .map(adaptServiceSummary);

  return (
    <>
      <div id="overview" aria-hidden="true" />
      <ServiceDetailHero service={service} />
      <ServiceSubNav />
      <ServiceRequirementsSection service={service} />
      <ServiceStepsSection service={service} />
      <ServicePricingSection service={service} />
      <ServiceFAQsSection service={service} />
      <RelatedServicesSection service={service} relatedServices={relatedServices} />
      <ServicesHelpBand />
      <SiteFooter />
      <StickyServiceBar service={service} />
    </>
  );
}
