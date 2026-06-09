import type { ReactNode } from "react";
import { CookieBanner } from "@/components/molecules/CookieBanner";

export default function ApplicationLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <CookieBanner />
    </>
  );
}
