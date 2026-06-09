import * as React from "react";
import { Suspense } from "react";
import { type Metadata } from "next";
import { AuthShell } from "@/components/organisms/auth/AuthShell";
import { ResetPasswordForm } from "@/components/organisms/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Set new password — ProxiServe",
  robots: { index: false },
};

export default function ResetPasswordPage() {
  return (
    <AuthShell zone="client">
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
