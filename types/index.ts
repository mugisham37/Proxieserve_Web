export type IconName =
  | "check"
  | "x"
  | "arrowRight"
  | "zap"
  | "shield"
  | "eye"
  | "messageCircle"
  | "barChart"
  | "globe"
  | "smartphone"
  | "creditCard"
  | "target"
  | "helpCircle"
  | "layers"
  | "lock"
  | "users"
  | "refreshCw"
  | "send"
  | "sun"
  | "moon"
  | "menu"
  | "chevronDown"
  | "chevronRight"
  | "externalLink"
  | "mail"
  | "mapPin"
  | "whatsapp";

export interface FAQItem {
  q: string;
  a: string;
}

export interface TestimonialItem {
  name: string;
  company: string;
  location: string;
  quote: string;
  avatarColor: string;
}

export interface StepItem {
  num: string;
  icon: IconName;
  title: string;
  desc: string;
}

export interface FeatureItem {
  icon: IconName;
  title: string;
  desc: string;
  detail: string;
}

export interface AfricaCardItem {
  icon: IconName;
  title: string;
  desc: string;
  badges?: string[];
  chips?: string[];
  isAccentRwanda?: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  baseUsd: number;
  period: string;
  annualUsd: number;
  desc: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
}

export type CurrencyCode = "US$" | "EUR" | "RWF" | "KES" | "NGN" | "ZAR";

export type PlanType = "subscription" | "performance";

export interface NavLink {
  href: string;
  label: string;
}

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}
