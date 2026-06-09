import * as React from "react";
import { type Metadata } from "next";
import { AuthShell } from "@/components/organisms/auth/AuthShell";
import { TwoFAChallengeForm } from "@/components/organisms/auth/TwoFAChallengeForm";

export const metadata: Metadata = {
  title: "Two-factor verification — ProxiServe",
  robots: { index: false, follow: false },
};

export default function TwoFAPage() {
  return (
    <AuthShell zone="staff">
      <TwoFAChallengeForm />
    </AuthShell>
  );
}
