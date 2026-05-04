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
  | "chevronLeft"
  | "externalLink"
  | "mail"
  | "mapPin"
  | "whatsapp"
  | "fingerprint"
  | "key"
  | "copy"
  | "download"
  | "google"
  | "rocket"
  | "store"
  | "upload"
  | "info"
  | "link2"
  | "sliders"
  | "home"
  | "shoppingBag"
  | "clock"
  | "pieChart"
  | "settings"
  | "bell"
  | "search"
  | "panelLeft"
  | "alertTriangle"
  | "dollarSign";

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

// ── Onboarding flow types ────────────────────────────────────────────────────
export type ConnectionKey = "shopify" | "woo" | "meta" | "google" | "whatsapp";
export type ConnectionStatus = "connected" | "idle";
export type RailKey = "stripe" | "momo" | "airtel" | "flutterwave";
export type OnboardingStep = 0 | 1 | 2 | 3 | 4;

// ── Dashboard types ──────────────────────────────────────────────────────────
export type HealthStatus = "running" | "idle" | "paused";
export type EventType = "success" | "warning" | "danger" | "info";
export type NotifTab = "all" | "actions" | "wins";
export type DashboardView = "home" | "empty";
export type NavItemId =
  | "dashboard"
  | "campaigns"
  | "conversations"
  | "orders"
  | "audit"
  | "safety"
  | "reports"
  | "settings";

export interface KpiCard {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  sub: string;
  spark: number[];
}

export interface TimelineEvent {
  time: string;
  agent: string;
  msg: string;
  type: EventType;
  whyHeadline?: string;
  whyPoints?: string[];
  whyAgent?: string;
  whyRunId?: string;
}

export interface AttentionCard {
  icon: IconName;
  color: string;
  title: string;
  desc: string;
  action: string;
}

export interface AgentRow {
  name: string;
  emoji: string;
  task: string;
  runtime: string;
  health: HealthStatus;
  color: string;
}

export interface DashNotification {
  type: EventType;
  agent: string;
  msg: string;
  time: string;
}

export interface CopilotMsg {
  role: "user" | "ai";
  text: string;
  agent?: string;
  runId?: string;
}

export interface DashNavItem {
  id: NavItemId;
  icon: IconName;
  label: string;
  href: string;
}
