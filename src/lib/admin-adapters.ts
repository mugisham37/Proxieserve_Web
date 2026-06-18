import type {
  AdminAgentItem,
  AdminMetric,
  AlertItem,
  AnalyticsResponse,
  AuditEntry as ApiAuditEntry,
  BroadcastRecord as ApiBroadcastRecord,
  FormField,
  OversightCase as ApiOversightCase,
  PlatformSettings,
  ServiceSummary,
  UpdatePlatformSettingsRequest,
} from "@/lib/api/types";
import type {
  AdminAgent,
  AdminMetric as UiAdminMetric,
  AdminSettings,
  AlertItem as UiAlertItem,
  AuditEntry,
  AuditKind,
  BroadcastRecord,
  FieldDef,
  FieldType,
  OversightCase,
  PricingRow,
  ServiceRow,
} from "@/lib/types/admin";

function normalizeServiceStatus(status: string): ServiceRow["status"] {
  if (status === "active" || status === "inactive" || status === "draft") return status;
  if (status === "published") return "active";
  if (status === "archived") return "inactive";
  return "draft";
}

export function adaptServiceRow(service: ServiceSummary): ServiceRow {
  const standardTier =
    service.pricing_tiers.find((tier) => tier.tier === "standard") ?? service.pricing_tiers[0];

  return {
    id: service.slug,
    name: service.name,
    category: service.category,
    fee: standardTier?.fee ?? 0,
    eta: standardTier?.eta ?? "—",
    schemaVersion: `v${service.version}`,
    volume30d: 0,
    status: normalizeServiceStatus(service.status),
  };
}

export function derivePricingRows(services: ServiceSummary[]): PricingRow[] {
  return services.map((service) => {
    const standardTier =
      service.pricing_tiers.find((tier) => tier.tier === "standard") ?? service.pricing_tiers[0];
    const urgentTier = service.pricing_tiers.find((tier) => tier.tier === "urgent");

    return {
      id: service.slug,
      service: service.name,
      standardFee: standardTier?.fee ?? 0,
      urgentFee: urgentTier?.fee ?? standardTier?.fee ?? 0,
      govFeePassthrough: true,
      effectiveDate: new Date().toISOString().slice(0, 10),
    };
  });
}

export function adaptAdminAgent(agent: AdminAgentItem): AdminAgent {
  return {
    id: agent.id,
    fullName: agent.fullName,
    initials: agent.initials,
    email: agent.email,
    skills: agent.skills,
    load: agent.load,
    capacity: agent.capacity,
    twoFa: agent.twoFa,
    role: agent.role === "SENIOR" || agent.role === "LEAD" ? agent.role : "AGENT",
    status:
      agent.status === "active" || agent.status === "away" || agent.status === "offline"
        ? agent.status
        : "offline",
    activeCases: agent.activeCases,
    completedTotal: agent.completedTotal,
    avgTurnaround: agent.avgTurnaround,
    slaPercent: agent.slaPercent,
    rating: agent.rating,
  };
}

export function adaptAdminMetric(metric: AdminMetric): UiAdminMetric {
  return {
    id: metric.id,
    label: metric.label,
    value: metric.value,
    delta: metric.delta ?? undefined,
    deltaDir: (metric.deltaDir as UiAdminMetric["deltaDir"]) ?? undefined,
    deltaColor: (metric.deltaColor as UiAdminMetric["deltaColor"]) ?? undefined,
  };
}

export function adaptAlertItem(alert: AlertItem): UiAlertItem {
  return {
    id: alert.id,
    message: alert.message,
    severity:
      alert.severity === "danger" || alert.severity === "warn" || alert.severity === "info"
        ? alert.severity
        : "info",
    cta: alert.cta ?? undefined,
    ctaHref: alert.ctaHref ?? undefined,
  };
}

export function adaptOversightCase(item: ApiOversightCase): OversightCase {
  const status = item.status as OversightCase["status"];
  return {
    code: item.code,
    service: item.service,
    agent: item.agent,
    client: item.client,
    status:
      status === "in-progress" ||
      status === "sla-breach" ||
      status === "disputed" ||
      status === "escalated" ||
      status === "resolved"
        ? status
        : "in-progress",
    issue: item.issue ?? undefined,
  };
}

export function adaptAuditEntry(entry: ApiAuditEntry): AuditEntry {
  const kind = entry.kind as AuditKind;
  return {
    id: entry.id,
    timestamp: entry.timestamp,
    actor: entry.actor,
    actorType:
      entry.actorType === "admin" || entry.actorType === "agent" || entry.actorType === "system"
        ? entry.actorType
        : "system",
    description: entry.description,
    kind:
      kind === "Privileged" || kind === "Money" || kind === "Config" || kind === "Assignment"
        ? kind
        : "Config",
  };
}

export function adaptBroadcastRecord(record: ApiBroadcastRecord): BroadcastRecord {
  return {
    id: record.id,
    audience: record.audience,
    channels: record.channels,
    message: record.message,
    sentAt: record.sentAt,
    reach: record.reach,
  };
}

export function adaptPlatformSettings(settings: PlatformSettings): AdminSettings {
  return {
    acceptNewApps: settings.acceptNewApps,
    guestApps: settings.guestApps,
    dataRetention: settings.dataRetention,
    compactTables: settings.compactTables ?? true,
    enforce2FA: settings.enforce2FA,
    sessionTimeout: settings.sessionTimeout,
    ipAllowlist: settings.ipAllowlist,
    maintenanceMode: settings.maintenanceMode,
  };
}

export function adaptPlatformSettingsPatch(
  patch: Partial<AdminSettings>
): UpdatePlatformSettingsRequest {
  return {
    acceptNewApps: patch.acceptNewApps,
    guestApps: patch.guestApps,
    dataRetention: patch.dataRetention,
    enforce2FA: patch.enforce2FA,
    sessionTimeout: patch.sessionTimeout,
    ipAllowlist: patch.ipAllowlist,
    maintenanceMode: patch.maintenanceMode,
  };
}

const FIELD_TYPE_MAP: Record<string, FieldType> = {
  text: "short-text",
  short_text: "short-text",
  textarea: "long-text",
  long_text: "long-text",
  select: "single-choice",
  radio_card: "single-choice",
  checkbox: "multi-select",
  date: "date",
  phone: "phone",
  document: "document",
};

export function adaptFormFieldToFieldDef(field: FormField, index: number): FieldDef {
  return {
    id: field.id,
    label: field.label,
    type: FIELD_TYPE_MAP[field.type] ?? "short-text",
    required: Boolean(field.required),
    conditional: Boolean(field.conditional),
    isNew: false,
    helpText: field.help ?? undefined,
    options: field.options?.map((option) => option.label),
  };
}

export function adaptFieldDefToFormFieldInput(field: FieldDef, index: number) {
  const reverseTypeMap: Record<FieldType, string> = {
    "short-text": "text",
    "long-text": "textarea",
    "single-choice": "select",
    "multi-select": "checkbox",
    date: "date",
    phone: "phone",
    document: "document",
  };

  return {
    field_key: field.id,
    label: field.label,
    field_type: reverseTypeMap[field.type],
    help_text: field.helpText ?? null,
    is_required: field.required,
    options: field.options?.map((option) => ({ value: option, label: option })) ?? null,
    sort_order: index,
    card_id: "default",
    card_title: "Application details",
  };
}

export type AnalyticsUiData = Pick<
  AnalyticsResponse,
  "weeklyBars" | "serviceMix" | "paymentMix" | "statusBreakdown"
> & {
  metrics: UiAdminMetric[];
  alerts: UiAlertItem[];
  agents: AdminAgent[];
};

export function adaptAnalyticsResponse(data: AnalyticsResponse): AnalyticsUiData {
  return {
    metrics: data.metrics.map(adaptAdminMetric),
    weeklyBars: data.weeklyBars,
    serviceMix: data.serviceMix,
    paymentMix: data.paymentMix,
    statusBreakdown: data.statusBreakdown,
    alerts: data.alerts.map(adaptAlertItem),
    agents: data.agents.map(adaptAdminAgent),
  };
}
