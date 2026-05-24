"use client";

import * as React from "react";
import { TopBar } from "@/components/organisms/TopBar";
import { MobileSheet } from "@/components/organisms/MobileSheet";
import { CookieBanner } from "@/components/molecules/CookieBanner";
import { ReturningBanner } from "@/components/molecules/ReturningBanner";
import { EmailVerifyBanner } from "@/components/molecules/EmailVerifyBanner";
import { getItem } from "@/lib/storage";
import { AUTH_SESSION_KEY, AUTH_VERIFIED_KEY } from "@/lib/auth-types";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const hamburgerRef = React.useRef<HTMLButtonElement>(null);
  const [showVerifyBanner, setShowVerifyBanner] = React.useState(false);
  const [verifyEmail, setVerifyEmail] = React.useState("");

  React.useEffect(() => {
    const verified = getItem(AUTH_VERIFIED_KEY);
    if (verified === "true") return;
    const raw = getItem(AUTH_SESSION_KEY);
    if (!raw) return;
    try {
      const session = JSON.parse(raw);
      if (session?.email && !session?.isEmailVerified) {
        setVerifyEmail(session.email);
        setShowVerifyBanner(true);
      }
    } catch {}
  }, []);

  return (
    <>
      <EmailVerifyBanner
        email={verifyEmail}
        visible={showVerifyBanner}
        onResend={() => {/* mock */}}
        onDismiss={() => setShowVerifyBanner(false)}
      />
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
