import * as React from "react";
import { Suspense } from "react";
import { type Metadata } from "next";
import { AuthShell } from "@/components/organisms/auth/AuthShell";
import { ClaimByCodeForm } from "@/components/organisms/auth/ClaimByCodeForm";

export const metadata: Metadata = {
  title: "Link your application — ProxiServe",
  robots: { index: false },
};

export default function ClaimPage() {
  return (
    <AuthShell zone="client">
      <Suspense>
        <ClaimByCodeForm />
      </Suspense>
    </AuthShell>
  );
}
