import type { Metadata } from "next";
import { AdminShell } from "@/components/organisms/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin Panel — ProxiServe",
  description: "ProxiServe platform administration and management",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
