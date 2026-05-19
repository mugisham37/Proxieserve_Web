"use client";

import * as React from "react";
import { TopBar } from "@/components/organisms/TopBar";
import { MobileSheet } from "@/components/organisms/MobileSheet";
import { CookieBanner } from "@/components/molecules/CookieBanner";
import { ReturningBanner } from "@/components/molecules/ReturningBanner";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const hamburgerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <ReturningBanner />
      <TopBar
        onMenuOpen={() => setMenuOpen(true)}
        menuOpen={menuOpen}
      />
      <MobileSheet
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={hamburgerRef}
      />
      <main>{children}</main>
      <CookieBanner />
    </>
  );
}
