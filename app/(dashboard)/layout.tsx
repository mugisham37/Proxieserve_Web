import * as React from "react";

export const metadata = {
  title: {
    default: "Dashboard — ProxiServe",
    template: "%s | ProxiServe Dashboard",
  },
  description: "Manage your applications, messages, documents, and account settings.",
};

export default function DashboardRouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
