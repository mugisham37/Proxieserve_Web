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

/** Hebuza-specific storage keys */
export const STORAGE_KEYS = {
  LAST_CODE: "hebuza:lastCode",
  COOKIE_CONSENT: "hebuza:cookieConsent",
  RETURNING_DISMISSED: "hebuza:returningDismissed",
} as const;
