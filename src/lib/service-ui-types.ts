import type { ServiceCategory, ServiceColour, ServiceStatus } from "@/lib/service-constants";

export interface ServiceRequirement {
  label: string;
  docType: "id" | "certificate" | "photo" | "form" | "proof" | "other";
  note?: string;
  status?: "required" | "optional" | "conditional";
  key?: string;
  maxSizeMb?: number;
  allowedMimeTypes?: string[];
}

export interface ServiceStep {
  num: number;
  title: string;
  body: string;
}

export interface ServicePricingTier {
  tier: string;
  label: string;
  fee: number;
  governmentFee: number;
  eta: string;
  includes: string[];
  isAvailable: boolean;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface AppFieldOption {
  value: string;
  label: string;
  description?: string;
}

export interface AppField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "radio-card" | "date" | "switch" | "checkbox";
  required?: boolean;
  optional?: true;
  conditional?: { field: string; values: string[] };
  options?: AppFieldOption[];
  placeholder?: string;
  help?: string;
  helpDetail?: string;
  mono?: boolean;
  maxLength?: number;
  rows?: number;
  inputMode?: "numeric" | "tel" | "email" | "text";
  charCount?: boolean;
}

export interface AppCard {
  id: string;
  title: string;
  fields: AppField[];
}

export interface ServiceApplicationConfig {
  step2Title: string;
  step2Lede: string;
  cards: AppCard[];
}

export interface UiService {
  slug: string;
  name: string;
  category: ServiceCategory;
  colour: ServiceColour;
  status: ServiceStatus;
  fee: number;
  urgentFee?: number;
  eta: string;
  lede: string;
  description: string;
  requirements: ServiceRequirement[];
  steps: ServiceStep[];
  pricingTiers: ServicePricingTier[];
  faqs: ServiceFAQ[];
  relatedSlugs: string[];
  flags: {
    geoBlocked?: boolean;
    inPersonRequired?: boolean;
    waitlistActive?: boolean;
    eligibilityCheckRequired?: boolean;
  };
  applicationConfig: ServiceApplicationConfig;
}

export interface UiServiceSummary {
  slug: string;
  name: string;
  category: ServiceCategory;
  colour: ServiceColour;
  status: ServiceStatus;
  fee: number;
  eta: string;
  lede: string;
  isFeatured?: boolean;
}
