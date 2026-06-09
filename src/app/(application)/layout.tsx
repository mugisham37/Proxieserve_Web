import type { ReactNode } from "react";
import { CookieBanner } from "@/components/molecules/system/CookieBanner";

export default function ApplicationLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <CookieBanner />
    </>
  );
}
