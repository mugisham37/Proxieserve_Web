export const en = {
  // Navigation
  nav_services: "Services",
  nav_how_it_works: "How it works",
  nav_pricing: "Pricing",
  nav_about: "About",
  nav_contact: "Contact",
  nav_track: "Track",
  nav_get_started: "Get started",
  nav_dashboard: "Dashboard",
  nav_applications: "Applications",
  nav_messages: "Messages",
  nav_documents: "Documents",
  nav_settings: "Settings",
  nav_help: "Help",
  nav_sign_out: "Sign out",

  // Status labels
  status_submitted: "Submitted",
  status_in_review: "In review",
  status_action_required: "Action required",
  status_approved: "Approved",
  status_rejected: "Rejected",
  status_completed: "Completed",
  status_pending: "Pending",
  status_processing: "Processing",

  // CTAs
  cta_get_started: "Get started",
  cta_learn_more: "Learn more",
  cta_track_application: "Track application",
  cta_go_home: "Go home",
  cta_try_again: "Try again",
  cta_contact_support: "Contact support",
  cta_sign_in: "Sign in",
  cta_sign_up: "Sign up",
  cta_continue: "Continue",
  cta_save: "Save",
  cta_cancel: "Cancel",
  cta_confirm: "Confirm",
  cta_next: "Next",
  cta_back: "Back",
  cta_done: "Done",
  cta_skip: "Skip",
  cta_print: "Print",
  cta_download: "Download",

  // Error messages
  error_404_headline: "Page not found",
  error_404_subline: "The page you're looking for doesn't exist or has been moved.",
  error_500_headline: "Something went wrong",
  error_500_subline: "We're working on it. Your data is safe.",
  error_503_headline: "Down for maintenance",
  error_503_subline: "We'll be back shortly.",
  error_offline_headline: "You're offline",
  error_offline_subline: "Check your connection and try again.",
  error_429_headline: "Too many requests",
  error_429_subline: "Please wait a moment before trying again.",
  error_session_headline: "Session expired",
  error_session_subline: "Sign back in to continue.",

  // Notifications
  notif_all_caught_up: "All caught up.",
  notif_mark_all_read: "Mark all read",
  notif_notifications: "Notifications",

  // Auth
  auth_email: "Email",
  auth_password: "Password",
  auth_sign_in: "Sign in",
  auth_sign_up: "Create account",
  auth_forgot_password: "Forgot password?",
  auth_no_account: "Don't have an account?",
  auth_have_account: "Already have an account?",

  // Application
  app_tracking_code: "Tracking code",
  app_service: "Service",
  app_submitted_on: "Submitted on",
  app_last_updated: "Last updated",
  app_assigned_agent: "Assigned agent",

  // Payment
  pay_total: "Total",
  pay_payment_method: "Payment method",
  pay_receipt: "Receipt",
  pay_no_charge: "No charge was made.",
  pay_success: "Payment successful",

  // Dark mode
  theme_light: "Light mode",
  theme_dark: "Dark mode",
} as const;

export type MessageKey = keyof typeof en;
