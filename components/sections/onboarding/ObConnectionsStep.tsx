"use client";

import { ObConnectItem } from "@/components/molecules/ObConnectItem";
import { ObInfoBanner } from "@/components/molecules/ObInfoBanner";
import type { ConnectionKey, ConnectionStatus, IconName } from "@/types";

interface ConnectionItem {
  key: ConnectionKey;
  icon: IconName;
  label: string;
  desc: string;
  category: string;
  statusText?: string;
}

const CONNECTION_ITEMS: ConnectionItem[] = [
  { key: "shopify", icon: "store", label: "Shopify", desc: "Import products and sync orders", category: "Commerce", statusText: "Connected as Inema Boutique" },
  { key: "woo", icon: "store", label: "WooCommerce", desc: "Import products via REST API", category: "Commerce" },
  { key: "meta", icon: "users", label: "Meta (Facebook + Instagram)", desc: "Run ads, manage DMs", category: "Ads & Chat", statusText: "Connected as Inema Boutique · Ad Account #1847293" },
  { key: "google", icon: "target", label: "Google Ads", desc: "Search and display campaigns", category: "Ads & Chat" },
  { key: "whatsapp", icon: "messageCircle", label: "WhatsApp Business", desc: "Conversational sales and support", category: "Ads & Chat", statusText: "Connected · +250 788 123 456" },
];

const CATEGORIES = ["Commerce", "Ads & Chat"];

interface ObConnectionsStepProps {
  connections: Record<ConnectionKey, ConnectionStatus>;
  onToggle: (key: ConnectionKey) => void;
}

export function ObConnectionsStep({ connections, onToggle }: ObConnectionsStepProps) {
  return (
    <div>
      <h1 className="text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] mb-2">
        Connect your accounts
      </h1>
      <p className="text-[15px] text-[var(--text-muted)] mb-7">
        Link your store and ad platforms. SolAI uses OAuth — we never see your passwords.
      </p>

      {CATEGORIES.map((cat) => (
        <div key={cat} className="mb-6">
          <h3
            className="text-[11px] font-medium text-[var(--brand)] uppercase tracking-[0.08em] mb-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {cat}
          </h3>
          <div className="flex flex-col gap-2">
            {CONNECTION_ITEMS.filter((i) => i.category === cat).map((item) => (
              <ObConnectItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                desc={item.desc}
                connected={connections[item.key] === "connected"}
                statusText={item.statusText}
                onToggle={() => onToggle(item.key)}
              />
            ))}
          </div>
        </div>
      ))}

      <ObInfoBanner>
        You can connect more platforms later in Settings → Integrations.
      </ObInfoBanner>
    </div>
  );
}
