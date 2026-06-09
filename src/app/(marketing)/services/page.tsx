import * as React from "react";
import { Suspense } from "react";
import { type Metadata } from "next";
import { ServicesCatalogueGrid } from "@/components/organisms/marketing/ServicesCatalogueGrid";
import { SiteFooter } from "@/components/organisms/marketing/SiteFooter";

export const metadata: Metadata = {
  title: "All Services — ProxiServe",
  description:
    "Browse ProxiServe's full catalogue of government and paperwork services: company registration, TIN, national ID, business permits, and more — handled for you in Rwanda.",
};

export default function ServicesPage() {
  return (
    <>
      <Suspense>
        <ServicesCatalogueGrid />
      </Suspense>
      <SiteFooter />
    </>
  );
}
