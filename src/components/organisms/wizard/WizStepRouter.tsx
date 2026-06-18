"use client";

import * as React from "react";
import type { UiService } from "@/lib/service-ui-types";
import { WizStep1Personal } from "./WizStep1Personal";
import { WizStep2Service } from "./WizStep2Service";
import { WizStep3Documents } from "./WizStep3Documents";
import { WizStep4Review } from "./WizStep4Review";
import { WizStep5Confirmation } from "./WizStep5Confirmation";

interface WizStepRouterProps {
  service: UiService;
  step: number;
}

export function WizStepRouter({ service, step }: WizStepRouterProps) {
  switch (step) {
    case 1:
      return <WizStep1Personal service={service} />;
    case 2:
      return <WizStep2Service service={service} />;
    case 3:
      return <WizStep3Documents service={service} />;
    case 4:
      return <WizStep4Review service={service} />;
    case 5:
      return <WizStep5Confirmation service={service} />;
    default:
      return null;
  }
}
