import type { MessageKey } from "./en";

export const fr: Record<MessageKey, string> = {
  // Navigation
  nav_services: "Services",
  nav_how_it_works: "Comment ça marche",
  nav_pricing: "Tarifs",
  nav_about: "À propos",
  nav_contact: "Contact",
  nav_track: "Suivre",
  nav_get_started: "Commencer",
  nav_dashboard: "Tableau de bord",
  nav_applications: "Demandes",
  nav_messages: "Messages",
  nav_documents: "Documents",
  nav_settings: "Paramètres",
  nav_help: "Aide",
  nav_sign_out: "Se déconnecter",

  // Status labels
  status_submitted: "Soumis",
  status_in_review: "En cours d'examen",
  status_action_required: "Action requise",
  status_approved: "Approuvé",
  status_rejected: "Refusé",
  status_completed: "Terminé",
  status_pending: "En attente",
  status_processing: "En traitement",

  // CTAs
  cta_get_started: "Commencer",
  cta_learn_more: "En savoir plus",
  cta_track_application: "Suivre la demande",
  cta_go_home: "Retour à l'accueil",
  cta_try_again: "Réessayer",
  cta_contact_support: "Contacter le support",
  cta_sign_in: "Se connecter",
  cta_sign_up: "S'inscrire",
  cta_continue: "Continuer",
  cta_save: "Enregistrer",
  cta_cancel: "Annuler",
  cta_confirm: "Confirmer",
  cta_next: "Suivant",
  cta_back: "Retour",
  cta_done: "Terminer",
  cta_skip: "Passer",
  cta_print: "Imprimer",
  cta_download: "Télécharger",

  // Error messages
  error_404_headline: "Page introuvable",
  error_404_subline: "La page que vous cherchez n'existe pas ou a été déplacée.",
  error_500_headline: "Quelque chose s'est mal passé",
  error_500_subline: "Nous y travaillons. Vos données sont en sécurité.",
  error_503_headline: "Maintenance en cours",
  error_503_subline: "Nous serons de retour très bientôt.",
  error_offline_headline: "Vous êtes hors ligne",
  error_offline_subline: "Vérifiez votre connexion et réessayez.",
  error_429_headline: "Trop de requêtes",
  error_429_subline: "Veuillez patienter avant de réessayer.",
  error_session_headline: "Session expirée",
  error_session_subline: "Reconnectez-vous pour continuer.",

  // Notifications
  notif_all_caught_up: "Tout est à jour.",
  notif_mark_all_read: "Tout marquer comme lu",
  notif_notifications: "Notifications",

  // Auth
  auth_email: "E-mail",
  auth_password: "Mot de passe",
  auth_sign_in: "Se connecter",
  auth_sign_up: "Créer un compte",
  auth_forgot_password: "Mot de passe oublié ?",
  auth_no_account: "Pas encore de compte ?",
  auth_have_account: "Déjà un compte ?",

  // Application
  app_tracking_code: "Code de suivi",
  app_service: "Service",
  app_submitted_on: "Soumis le",
  app_last_updated: "Dernière mise à jour",
  app_assigned_agent: "Agent assigné",

  // Payment
  pay_total: "Total",
  pay_payment_method: "Mode de paiement",
  pay_receipt: "Reçu",
  pay_no_charge: "Aucun paiement n'a été effectué.",
  pay_success: "Paiement réussi",

  // Dark mode
  theme_light: "Mode clair",
  theme_dark: "Mode sombre",
};
