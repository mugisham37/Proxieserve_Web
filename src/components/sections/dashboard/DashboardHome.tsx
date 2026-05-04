"use client";

import { useState } from "react";
import { DashKpiGrid } from "@/src/components/sections/dashboard/DashKpiGrid";
import { DashTimeline } from "@/src/components/sections/dashboard/DashTimeline";
import { DashAttention } from "@/src/components/sections/dashboard/DashAttention";
import { DashAgentTable } from "@/src/components/sections/dashboard/DashAgentTable";

export function DashboardHome() {
  const [kpiWhyOpen, setKpiWhyOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <DashKpiGrid whyOpen={kpiWhyOpen} onWhyToggle={setKpiWhyOpen} />

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        <DashTimeline />
        <DashAttention />
      </div>

      <DashAgentTable />
    </div>
  );
}
