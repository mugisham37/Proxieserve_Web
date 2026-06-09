import * as React from "react";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { SERVICES, getServiceBySlug } from "@/lib/services-data";
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

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} — ProxiServe`,
    description: service.lede,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <div id="overview" aria-hidden="true" />
      <ServiceDetailHero service={service} />
      <ServiceSubNav />
      <ServiceRequirementsSection service={service} />
      <ServiceStepsSection service={service} />
      <ServicePricingSection service={service} />
      <ServiceFAQsSection service={service} />
      <RelatedServicesSection service={service} />
      <ServicesHelpBand />
      <SiteFooter />
      <StickyServiceBar service={service} />
    </>
  );
}
