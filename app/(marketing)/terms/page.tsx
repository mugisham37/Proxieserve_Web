import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — SolAI",
  description: "Terms governing your use of the SolAI platform.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By creating an account or using SolAI (the "Service"), you agree to these Terms of Service ("Terms") and our Privacy Policy. If you are using the Service on behalf of a business, you represent that you have authority to bind that business to these Terms.`,
  },
  {
    title: "2. Service Description",
    body: `SolAI is an autonomous e-commerce revenue engine that automates advertising, WhatsApp sales conversations, order processing, and campaign analytics. The Service is operated by Digisi Rwanda Ltd, incorporated in Rwanda (hereinafter "Digisi", "we", or "us").`,
  },
  {
    title: "3. User Accounts",
    body: `You must provide accurate information when creating an account and keep your credentials secure. You are responsible for all activity under your account. Notify us immediately at support@solai.io if you suspect unauthorised access. Accounts must be registered by individuals aged 18 or older.`,
  },
  {
    title: "4. Acceptable Use",
    body: `You may not use SolAI to: (a) violate any applicable law or regulation; (b) send spam or unsolicited messages; (c) infringe third-party intellectual property rights; (d) transmit malware or attempt to gain unauthorised access to our systems; (e) resell or sublicense the Service without written permission; (f) use the Service for any purpose that violates WhatsApp's Business Policy or Meta's Advertising Standards.`,
  },
  {
    title: "5. Data & Privacy",
    body: `Our collection and use of personal data is governed by our Privacy Policy. By using the Service you consent to the data practices described therein. We comply with the Rwanda Data Protection Law (Law No. 058/2021), POPIA (South Africa), NDPR (Nigeria), and maintain GDPR-adequate safeguards for cross-border data transfers.`,
  },
  {
    title: "6. Payments & Billing",
    body: `Subscription fees are billed in advance on a monthly or annual basis. Performance plan fees are calculated on ad spend processed through the Service. All fees are exclusive of applicable taxes. We reserve the right to suspend access if payment is overdue by more than 7 days after written notice.`,
  },
  {
    title: "7. Intellectual Property",
    body: `The Service, including all software, algorithms, and content, is owned by Digisi Rwanda Ltd and protected by applicable intellectual property laws. You retain ownership of your product data, creative assets, and customer data. You grant us a limited licence to process that data solely to provide the Service.`,
  },
  {
    title: "8. Limitation of Liability",
    body: `To the maximum extent permitted by law, Digisi's aggregate liability arising out of or related to these Terms shall not exceed the fees paid by you in the three months preceding the claim. We are not liable for indirect, incidental, or consequential damages, including lost revenue or data.`,
  },
  {
    title: "9. Governing Law",
    body: `These Terms are governed by the laws of the Republic of Rwanda. Any disputes shall be subject to the exclusive jurisdiction of the courts of Kigali, Rwanda, except where mandatory consumer-protection laws in your country of residence provide otherwise.`,
  },
  {
    title: "10. Changes to Terms",
    body: `We may update these Terms with 30 days' notice via email or in-app notification. Continued use of the Service after that period constitutes acceptance of the updated Terms.`,
  },
  {
    title: "11. Contact",
    body: `Questions about these Terms? Contact our legal team at legal@solai.io or write to: Digisi Rwanda Ltd, Kigali Innovation City, KG 7 Ave, Kigali, Rwanda.`,
  },
];

export default function TermsPage() {
  return (
    <div>
      <div className="max-w-[1280px] mx-auto px-8 pt-16 pb-8 border-b border-border md:px-4 md:pt-10">
        <p className="font-mono text-[12px] font-medium text-brand uppercase tracking-[0.08em] mb-3">
          Legal
        </p>
        <h1 className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] text-text mb-3">
          Terms of Service
        </h1>
        <p className="text-[clamp(16px,1.8vw,18px)] text-text-muted max-w-[600px] leading-[1.7]">
          Last updated: 4 May 2026. Please read these terms carefully before using SolAI.
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
