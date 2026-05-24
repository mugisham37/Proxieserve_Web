import * as React from "react";
import { Suspense } from "react";
import { type Metadata } from "next";
import { AuthShell } from "@/components/organisms/AuthShell";
import { ClientLoginForm } from "@/components/organisms/ClientLoginForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign in — ProxiServe",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <AuthShell
      zone="client"
      topBarRight={
        <Link
          href="/signup"
          className="font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
        >
          Create account →
        </Link>
      }
    >
      <Suspense>
        <ClientLoginForm />
      </Suspense>
    </AuthShell>
  );
}
