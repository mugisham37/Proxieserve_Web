import type { Metadata } from "next";
import { TwoFASetupForm } from "./TwoFASetupForm";

export const metadata: Metadata = {
  title: "Secure your account — SolAI",
  robots: "noindex",
};

export default function TwoFASetupPage() {
  return <TwoFASetupForm />;
}
