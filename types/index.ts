export type IconName =
  | "check"
  | "x"
  | "arrowRight"
  | "arrowLeft"
  | "zap"
  | "shield"
  | "eye"
  | "eyeOff"
  | "user"
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
  | "whatsapp"
  | "fingerprint"
  | "key"
  | "copy"
  | "download"
  | "google";

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

// ── Auth flow types ──────────────────────────────────────────────────────────
export type AuthMethod = "email" | "passkey" | "magic";
export type ResetStep = "request" | "sent" | "newpw";
export type TwoFAStep = "choose" | "codes" | "done";
export type TwoFAMethod = "app" | "sms";
export type PasswordStrength = 0 | 1 | 2 | 3 | 4;
