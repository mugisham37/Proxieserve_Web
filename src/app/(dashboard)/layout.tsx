import type { Metadata } from "next";
import { AppShell } from "@/components/organisms/dashboard/AppShell";
import { CookieBanner } from "@/components/molecules/system/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: "Dashboard — ProxiServe",
    template: "%s — ProxiServe",
  },
  robots: { index: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      {children}
      <CookieBanner />
    </AppShell>
  );
}
