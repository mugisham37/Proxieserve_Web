import * as React from "react";
import { Suspense } from "react";
import { type Metadata } from "next";
import { AuthShell } from "@/components/organisms/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/organisms/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset password — Hebuza",
  robots: { index: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell zone="client">
      <Suspense>
        <ForgotPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
