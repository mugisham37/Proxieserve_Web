import * as React from "react";
import { TrackerTopBar } from "@/components/molecules/TrackerTopBar";

export default function TrackerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip">
        Skip to main content
      </a>
      <TrackerTopBar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}
