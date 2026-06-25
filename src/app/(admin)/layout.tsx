import type { Metadata } from "next";
import { AdminShell } from "@/components/organisms/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin Panel — Hebuza",
  description: "Hebuza platform administration and management",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
