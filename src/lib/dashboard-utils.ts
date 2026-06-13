export const STATUS_STRIP_COLOR: Record<string, string> = {
  "action-required": "var(--warn)",
  "in-progress": "var(--brand)",
  completed: "var(--ok)",
  discontinued: "var(--cream-2)",
  "on-hold": "var(--warn)",
};

export const STATUS_LABEL: Record<string, string> = {
  "action-required": "Action required",
  "in-progress": "In progress",
  completed: "Completed",
  discontinued: "Discontinued",
  "on-hold": "On hold",
};

export function formatFee(amount: number): string {
  return `RWF ${amount.toLocaleString()}`;
}

export function formatFeeShort(amount: number): string {
  if (amount >= 1000) {
    const k = amount / 1000;
    return `RWF ${Number.isInteger(k) ? k : k.toFixed(1)}K`;
  }
  return `RWF ${amount}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes >= 1000000) return `${(bytes / 1000000).toFixed(1)} MB`;
  return `${Math.round(bytes / 1000)} KB`;
}

export function getTodayLabel(): string {
  return new Date()
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();
}
