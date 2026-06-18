import type { ServiceDetail, ServiceSummary } from "@/lib/api/types";
import type {
  AppField,
  ServiceApplicationConfig,
  ServiceRequirement,
  UiService,
  UiServiceSummary,
} from "@/lib/service-ui-types";
import type { ServiceCategory, ServiceColour, ServiceStatus } from "@/lib/service-constants";

const DOC_TYPE_MAP: Record<string, ServiceRequirement["docType"]> = {
  id: "id",
  certificate: "certificate",
  photo: "photo",
  form: "form",
  proof: "proof",
  other: "other",
};

function normalizeFieldType(type: string): AppField["type"] {
  if (type === "radio_card") return "radio-card";
  if (type === "textarea" || type === "select" || type === "date" || type === "switch" || type === "checkbox") {
    return type;
  }
  return "text";
}

function adaptApplicationConfig(
  config: ServiceDetail["application_config"],
): ServiceApplicationConfig {
  if (!config) {
    return { step2Title: "Service details", step2Lede: "", cards: [] };
  }

  return {
    step2Title: config.step2Title,
    step2Lede: config.step2Lede,
    cards: config.cards.map((card) => ({
      id: card.id,
      title: card.title,
      fields: card.fields.map((field) => ({
        id: field.id,
        label: field.label,
        type: normalizeFieldType(field.type),
        required: field.required,
        optional: field.optional ? true : undefined,
        conditional: field.conditional
          ? {
              field: String(field.conditional.field ?? ""),
              values: Array.isArray(field.conditional.values)
                ? (field.conditional.values as string[])
                : [],
            }
          : undefined,
        options: field.options?.map((opt) => ({
          value: opt.value,
          label: opt.label,
          description: opt.description ?? undefined,
        })),
        placeholder: field.placeholder ?? undefined,
        help: field.help ?? undefined,
        maxLength: field.maxLength ?? undefined,
      })),
    })),
  };
}

export function adaptServiceDetail(detail: ServiceDetail, relatedSlugs: string[] = []): UiService {
  const standardTier = detail.pricing_tiers.find((tier) => tier.tier === "standard") ?? detail.pricing_tiers[0];
  const urgentTier = detail.pricing_tiers.find((tier) => tier.tier === "urgent");

  return {
    slug: detail.slug,
    name: detail.name,
    category: detail.category as ServiceCategory,
    colour: (detail.color ?? "cream") as ServiceColour,
    status: detail.status as ServiceStatus,
    fee: standardTier?.fee ?? 0,
    urgentFee: urgentTier?.fee,
    eta: standardTier?.eta ?? "",
    lede: detail.short_description ?? "",
    description: detail.description ?? "",
    requirements: detail.requirements.map((req) => ({
      key: req.key,
      label: req.label,
      docType: DOC_TYPE_MAP[req.doc_type] ?? "other",
      note: req.description ?? undefined,
      status: req.is_required ? "required" : "optional",
      maxSizeMb: req.max_size_mb,
      allowedMimeTypes: req.allowed_mime_types,
    })),
    steps: detail.steps.map((step) => ({
      num: step.step_number,
      title: step.title,
      body: step.description ?? "",
    })),
    pricingTiers: detail.pricing_tiers.map((tier) => ({
      tier: tier.tier,
      label: tier.label,
      fee: tier.fee,
      governmentFee: tier.governmentFee,
      eta: tier.eta,
      includes: tier.includes,
      isAvailable: tier.isAvailable,
    })),
    faqs: [],
    relatedSlugs,
    flags: {},
    applicationConfig: adaptApplicationConfig(detail.application_config),
  };
}

export function adaptServiceSummary(summary: ServiceSummary): UiServiceSummary {
  const standardTier = summary.pricing_tiers.find((tier) => tier.tier === "standard") ?? summary.pricing_tiers[0];

  return {
    slug: summary.slug,
    name: summary.name,
    category: summary.category as ServiceCategory,
    colour: (summary.color ?? "cream") as ServiceColour,
    status: summary.status as ServiceStatus,
    fee: standardTier?.fee ?? 0,
    eta: standardTier?.eta ?? "",
    lede: summary.short_description ?? "",
    isFeatured: summary.is_featured,
  };
}
