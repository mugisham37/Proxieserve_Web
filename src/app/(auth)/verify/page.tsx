import * as React from "react";
import { Suspense } from "react";
import { type Metadata } from "next";
import { AuthShell } from "@/components/organisms/AuthShell";
import { VerifyOTPForm } from "@/components/organisms/VerifyOTPForm";

export const metadata: Metadata = {
  title: "Verify your email — ProxiServe",
  robots: { index: false },
};

export default function VerifyPage() {
  return (
    <AuthShell zone="client">
      <Suspense>
        <VerifyOTPForm />
      </Suspense>
    </AuthShell>
  );
}
