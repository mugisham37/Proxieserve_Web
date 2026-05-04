import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SolAI",
  description: "How SolAI collects, uses, and protects your personal data.",
};

const SECTIONS = [
  {
    title: "1. Data Controller",
    body: `Your personal data is controlled by Digisi Rwanda Ltd ("Digisi", "we", "us"), Kigali Innovation City, KG 7 Ave, Kigali, Rwanda. For data protection enquiries contact our Data Protection Officer at dpo@solai.io.`,
  },
  {
    title: "2. What We Collect",
    body: `We collect: (a) Account data — name, email, business name, phone number provided at sign-up; (b) Usage data — pages visited, features used, API calls, error logs; (c) Campaign data — ad creatives, product catalogues, budget settings you upload; (d) Customer interaction data — WhatsApp conversation transcripts and order records processed on your behalf; (e) Payment data — billing address and last-four card digits (full card numbers are handled by our PCI-compliant payment processors).`,
  },
  {
    title: "3. How We Use Your Data",
    body: `We use your data to: provide and improve the Service; authenticate your identity; process payments; send transactional emails and in-app notifications; generate aggregated, anonymised analytics; comply with legal obligations; and respond to support requests. We do not sell your personal data to third parties.`,
  },
  {
    title: "4. Third-Party Sharing",
    body: `We share data only with: (a) Service providers acting as processors under data processing agreements (cloud infrastructure, payment processors, email delivery); (b) Meta Platforms and Google LLC to execute advertising campaigns on your behalf; (c) WhatsApp/Meta to transmit business messages; (d) Law enforcement when required by applicable law. A current sub-processor list is available on request at dpo@solai.io.`,
  },
  {
    title: "5. Cross-Border Data Transfers",
    body: `SolAI is hosted on AWS af-south-1 (Cape Town). Some processors may process data outside your country. We rely on Standard Contractual Clauses (SCCs) for transfers from the EEA, adequacy decisions where available, and the binding safeguards of the Rwanda Data Protection Law for transfers originating in Rwanda.`,
  },
  {
    title: "6. Data Retention",
    body: `We retain account data for the duration of your subscription plus 90 days after termination to allow data export. Campaign and conversation logs are retained for 24 months unless you request earlier deletion. Audit logs are retained for 7 years to satisfy financial record-keeping obligations.`,
  },
  {
    title: "7. Your Rights",
    body: `Depending on your location you may have rights to: access, correct, or delete your personal data; restrict or object to processing; data portability; and withdraw consent. Rwanda DPL (Law 058/2021), POPIA (South Africa), and NDPR (Nigeria) users may lodge complaints with their national supervisory authority. EEA/UK users may contact their local data protection authority. Submit requests to dpo@solai.io — we respond within 30 days.`,
  },
  {
    title: "8. Security",
    body: `We implement TLS encryption in transit and AES-256 encryption at rest, role-based access controls, SOC 2-aligned security practices, and regular third-party penetration tests. Despite these measures, no internet transmission is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "9. Cookies",
    body: `We use strictly necessary cookies (session management, CSRF protection) and analytics cookies (anonymised usage statistics). You can disable analytics cookies via your account settings. We do not use advertising cookies on our own website.`,
  },
  {
    title: "10. Changes to This Policy",
    body: `We will notify you of material changes by email or in-app notice at least 30 days before they take effect. Continued use of the Service after that period constitutes acceptance.`,
  },
  {
    title: "11. Contact",
    body: `For privacy questions or to exercise your rights: dpo@solai.io — Digisi Rwanda Ltd, Kigali Innovation City, KG 7 Ave, Kigali, Rwanda.`,
  },
];

export default function PrivacyPage() {
  return (
    <div>
      <div className="max-w-[1280px] mx-auto px-8 pt-16 pb-8 border-b border-border md:px-4 md:pt-10">
        <p className="font-mono text-[12px] font-medium text-brand uppercase tracking-[0.08em] mb-3">
          Legal
        </p>
        <h1 className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] text-text mb-3">
          Privacy Policy
        </h1>
        <p className="text-[clamp(16px,1.8vw,18px)] text-text-muted max-w-[600px] leading-[1.7]">
          Last updated: 4 May 2026. This policy explains how we collect, use, and protect your data.
        </p>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 py-12 md:px-4">
        <div className="max-w-[760px] flex flex-col gap-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-[18px] font-semibold text-text mb-3 tracking-[-0.01em]">
                {s.title}
              </h2>
              <p className="text-[15px] text-text-muted leading-[1.75]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
