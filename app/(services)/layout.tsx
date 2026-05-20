import * as React from "react";
import { ServicesTopBar } from "@/components/organisms/ServicesTopBar";
import { SiteFooter } from "@/components/organisms/SiteFooter";

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServicesTopBar />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
