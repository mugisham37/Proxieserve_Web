"use client";

import * as React from "react";
import { AnalyticsDashboard } from "@/components/organisms/admin/AnalyticsDashboard";
import { useAdminDispatch } from "@/lib/admin-context";

export default function AdminAnalyticsPage() {
  const dispatch = useAdminDispatch();

  // Simulate data load — skeleton → real (state #6)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "SET_LOADING", payload: false });
    }, 1200);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return <AnalyticsDashboard />;
}
