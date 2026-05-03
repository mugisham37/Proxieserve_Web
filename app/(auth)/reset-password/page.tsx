import type { Metadata } from "next";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset password — SolAI",
  robots: "noindex",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
