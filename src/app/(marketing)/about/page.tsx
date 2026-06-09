import type { Metadata } from "next";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { PillButton } from "@/components/atoms/shared/PillButton";
import { TeamCard } from "@/components/molecules/marketing/TeamCard";
import { MissionCard } from "@/components/molecules/marketing/MissionCard";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — ProxiServe",
  description: "ProxiServe is a Rwandan company that helps individuals and businesses navigate government paperwork with ease.",
};

const TEAM = [
  {
    name: "Amina Keza",
    role: "Co-Founder & CEO",
    bio: "Former Rwanda Development Board advisor. 10 years simplifying government processes for businesses.",
    initials: "AK",
    avatarColor: "brand" as const,
  },
  {
    name: "David Nkurunziza",
    role: "Head of Operations",
    bio: "Led service delivery at one of Rwanda's largest legal firms. Expert in RDB and RSSB procedures.",
    initials: "DN",
    avatarColor: "blue" as const,
  },
  {
    name: "Claudine Uwimana",
    role: "Lead Agent",
    bio: "5 years as a government liaison officer. Handles complex company registrations and permits.",
    initials: "CU",
    avatarColor: "green" as const,
  },
  {
    name: "Pascal Habimana",
    role: "Product & Tech",
    bio: "Built the tracking system from scratch. Ensures every application update reaches you in real time.",
    initials: "PH",
    avatarColor: "marigold" as const,
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16">
        <Eyebrow withLine className="text-[var(--ink-muted)] mb-4">About us</Eyebrow>
        <h1 className="t-h1 text-[var(--ink)] mb-4 max-w-xl">We believe paperwork shouldn&apos;t slow Rwanda down.</h1>
        <p className="t-lede text-[var(--ink-muted)] max-w-lg mb-16">
          ProxiServe was founded in Kigali in 2023 by a team frustrated by how much time businesses and individuals lost to government queues.
        </p>

        {/* Mission + Team grid */}
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 mb-20">
          <MissionCard
            quote="Rwanda is one of the fastest-growing economies in Africa. Our job is to make sure paperwork never gets in the way of that growth."
            body="We combine local expertise with modern technology to deliver government services faster than anyone else in the market. Our agents are embedded in the system — they know the people, the processes, and the shortcuts."
          />

          <div className="flex flex-col gap-4">
            <h2 className="t-h3 text-[var(--ink)]">The team</h2>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
              {TEAM.map((member) => (
                <TeamCard key={member.name} {...member} />
              ))}
            </div>
          </div>
        </div>

        {/* Hiring CTA */}
        <div className="border border-[var(--rule)] rounded-[var(--r-xl)] p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex-1">
            <h2 className="t-h3 text-[var(--ink)] mb-2">We&apos;re hiring</h2>
            <p className="font-sans text-[14px] text-[var(--ink-muted)]">
              Looking for government liaison agents, customer support, and engineers.
            </p>
          </div>
          <PillButton variant="solid" size="md" asChild>
            <Link href="/contact">Get in touch</Link>
          </PillButton>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
