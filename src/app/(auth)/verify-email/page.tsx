import type { Metadata } from "next";
import { VerifyEmailForm } from "./VerifyEmailForm";

export const metadata: Metadata = {
  title: "Verify email — SolAI",
  robots: "noindex",
};

export default function VerifyEmailPage() {
  return <VerifyEmailForm />;
}
