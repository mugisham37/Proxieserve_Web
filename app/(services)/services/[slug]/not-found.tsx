import * as React from "react";
import { type Metadata } from "next";
import { Service404Card } from "@/components/molecules/Service404Card";

export const metadata: Metadata = {
  title: "Service Not Found — ProxiServe",
};

export default function ServiceNotFound() {
  return (
    <div className="bg-[var(--cream)] min-h-[60vh] flex items-center justify-center py-20 px-5">
      <Service404Card />
    </div>
  );
}
