export type ServiceStatus = "active" | "paused" | "unavailable" | "archived";
export type ServiceCategory = "tax" | "identity" | "business" | "welfare" | "permits";
export type ServiceColour = "marigold" | "pink" | "green" | "blue" | "red" | "cream";

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  tax: "Tax & Revenue",
  identity: "Identity & Civil",
  business: "Business & Trade",
  welfare: "Social Welfare",
  permits: "Permits & Licences",
};

export const COLOUR_MAP: Record<ServiceColour, string> = {
  marigold: "var(--marigold)",
  pink: "var(--pink)",
  green: "var(--green)",
  blue: "var(--blue)",
  red: "var(--red)",
  cream: "var(--cream)",
};
