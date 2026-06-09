/** PRX tracking code utilities */

const PRX_PATTERN = /^PRX-\d{4}-\d{5}$/;

/** Format a raw string into PRX-YYYY-NNNNN as the user types */
export function formatTrackerCode(raw: string): string {
  const stripped = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");

  if (!stripped.startsWith("PRX")) return stripped;

  const parts: string[] = [stripped.slice(0, 3)];
  if (stripped.length > 3) parts.push(stripped.slice(3, 7));
  if (stripped.length > 7) parts.push(stripped.slice(7, 12));

  return parts.join("-");
}

/** Validate a fully-formed tracking code */
export function isValidTrackerCode(code: string): boolean {
  return PRX_PATTERN.test(code);
}

/** Error message for invalid codes */
export const TRACKER_ERROR =
  "That doesn't look right. Codes look like PRX-YYYY-NNNNN — double-check yours.";
