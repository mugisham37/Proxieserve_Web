import * as React from "react";
import { type Metadata } from "next";
import { AuthShell } from "@/components/organisms/auth/AuthShell";
import { StaffLoginForm } from "@/components/organisms/auth/StaffLoginForm";

export const metadata: Metadata = {
  title: "Staff sign in — Hebuza",
  robots: { index: false, follow: false },
};

export default function StaffLoginPage() {
  return (
    <AuthShell zone="staff">
      <React.Suspense>
        <StaffLoginForm />
      </React.Suspense>
    </AuthShell>
  );
}
