import * as React from "react";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { SERVICES, getServiceBySlug } from "@/lib/services-data";
import { ServiceDetailHero } from "@/components/organisms/ServiceDetailHero";
import { ServiceSubNav } from "@/components/organisms/ServiceSubNav";
import { ServiceRequirementsSection } from "@/components/organisms/ServiceRequirementsSection";
import { ServiceStepsSection } from "@/components/organisms/ServiceStepsSection";
import { ServicePricingSection } from "@/components/organisms/ServicePricingSection";
import { ServiceFAQsSection } from "@/components/organisms/ServiceFAQsSection";
import { RelatedServicesSection } from "@/components/organisms/RelatedServicesSection";
import { ServicesHelpBand } from "@/components/organisms/ServicesHelpBand";
import { StickyServiceBar } from "@/components/organisms/StickyServiceBar";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: `${service.name} — ProxiServe`,
    description: service.lede,
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <>
      {/* Overview anchor — sub-nav scroll target */}
      <div id="overview" aria-hidden="true" />
      <ServiceDetailHero service={service} />
      <ServiceSubNav />
      <ServiceRequirementsSection service={service} />
      <ServiceStepsSection service={service} />
      <ServicePricingSection service={service} />
      <ServiceFAQsSection service={service} />
      <RelatedServicesSection service={service} />
      <ServicesHelpBand />
      <StickyServiceBar service={service} />
    </>
  );
}
