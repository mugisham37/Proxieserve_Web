import * as React from "react";
import { type Metadata } from "next";
import { AuthShell } from "@/components/organisms/AuthShell";
import { StaffLoginForm } from "@/components/organisms/StaffLoginForm";

export const metadata: Metadata = {
  title: "Staff sign in — ProxiServe",
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
