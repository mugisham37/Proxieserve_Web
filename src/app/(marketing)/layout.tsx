"use client";

import * as React from "react";
import { TopBar } from "@/components/organisms/TopBar";
import { MobileSheet } from "@/components/organisms/MobileSheet";
import { CookieBanner } from "@/components/molecules/system/CookieBanner";
import { ReturningBanner } from "@/components/molecules/system/ReturningBanner";
import { EmailVerifyBanner } from "@/components/molecules/auth/EmailVerifyBanner";
import { useAuth } from "@/lib/auth-context";
import { useResendOtp } from "@/hooks/useAuth";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const resendOtpMutation = useResendOtp();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const hamburgerRef = React.useRef<HTMLButtonElement>(null);
  const [verifyBannerDismissed, setVerifyBannerDismissed] = React.useState(false);
  const showVerifyBanner = Boolean(session?.email && !session.isEmailVerified && !verifyBannerDismissed);

  return (
    <>
      <EmailVerifyBanner
        email={session?.email ?? "your email"}
        visible={showVerifyBanner}
        onResend={() => {
          void resendOtpMutation.mutateAsync().catch(() => undefined);
        }}
        onDismiss={() => setVerifyBannerDismissed(true)}
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
