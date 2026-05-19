/** SSR-safe localStorage helpers */

export function getItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore quota errors */
  }
}

export function removeItem(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/** ProxiServe-specific storage keys */
export const STORAGE_KEYS = {
  LAST_CODE: "proxi:lastCode",
  COOKIE_CONSENT: "proxi:cookieConsent",
  RETURNING_DISMISSED: "proxi:returningDismissed",
} as const;
