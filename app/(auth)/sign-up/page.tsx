import type { Metadata } from "next";
import { SignUpForm } from "./SignUpForm";

export const metadata: Metadata = {
  title: "Create account — SolAI",
  robots: "noindex",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
