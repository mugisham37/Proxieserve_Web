import * as React from "react";
import { Suspense } from "react";
import { type Metadata } from "next";
import { AuthShell } from "@/components/organisms/AuthShell";
import { ClientSignupForm } from "@/components/organisms/ClientSignupForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create account — ProxiServe",
  robots: { index: false },
};

export default function SignupPage() {
  return (
    <AuthShell
      zone="client"
      topBarRight={
        <Link
          href="/login"
          className="font-sans text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
        >
          Sign in →
        </Link>
      }
    >
      <Suspense>
        <ClientSignupForm />
      </Suspense>
    </AuthShell>
  );
}
