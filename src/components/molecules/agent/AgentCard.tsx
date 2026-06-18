"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { AgentData } from "@/lib/tracker-ui-types";

interface AgentCardProps {
  agent: AgentData;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.32, ease: "easeOut", delay: 0.08 }}
      className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] overflow-hidden"
      aria-labelledby="agent-heading"
    >
      {/* Brand top strip */}
      <div className="h-[6px] bg-[var(--brand)]" aria-hidden="true" />

      <div className="p-6">
        {/* Head */}
        <div className="flex items-center gap-[14px] mb-[18px]">
          {/* Avatar — 56px circle */}
          <span
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--ink)] text-[var(--paper)] font-serif font-medium text-[22px] shrink-0"
            aria-hidden="true"
          >
            {agent.initials}
          </span>
          <div className="min-w-0">
            <h3 id="agent-heading" className="font-serif font-medium text-[18px] m-0 leading-tight">
              <em className="not-italic">{agent.name.split(" ")[0]}</em>{" "}
              <em className="italic font-normal">{agent.name.split(" ").slice(1).join(" ")}</em>
            </h3>
            <p className="font-mono text-[11px] text-[var(--ink-muted)] tracking-[0.06em] mt-[2px] m-0">
              {agent.role}
            </p>
            {/* Online pill */}
            <span className="inline-flex items-center gap-[6px] mt-[10px] px-[10px] py-[3px] bg-[var(--ok-soft)] text-[var(--ok)] rounded-full font-sans text-[11px] font-medium">
              <span className="w-[6px] h-[6px] rounded-full bg-[var(--ok)] shrink-0" aria-hidden="true" />
              Online now
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 py-[14px] border-y border-[var(--rule)] mb-[18px]">
          {[
            { label: "Cases handled", value: agent.casesHandled.toLocaleString() },
            { label: "Working since", value: agent.workingSince },
            { label: "Languages", value: agent.languages },
            { label: "Avg. reply", value: `${agent.avgReplyMinutes} min` },
          ].map(({ label, value }) => (
            <div key={label}>
              <dt className="font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-muted)]">{label}</dt>
              <dd className="font-serif text-[15px] font-medium text-[var(--ink)] m-0">{value}</dd>
            </div>
          ))}
        </dl>

        {/* Contact buttons */}
        <div className="grid gap-2">
          <a
            href="#contact"
            className={cn(
              "grid grid-cols-[28px_1fr] gap-[10px] items-center",
              "px-[14px] py-[10px] rounded-[var(--r-md)]",
              "bg-[var(--cream)] border border-[var(--rule)]",
              "font-sans text-[13px] font-medium text-[var(--ink)]",
              "transition-colors duration-[var(--m-fast)]",
              "hover:bg-[var(--paper-2)] hover:border-[var(--ink)]"
            )}
            aria-label="Send an in-app message to your agent"
          >
            {/* Chat icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="text-[var(--ink-muted)]">
              <path d="M15 2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3l3 3 3-3h3a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            Message your agent
          </a>

          <a
            href={agent.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "grid grid-cols-[28px_1fr] gap-[10px] items-center",
              "px-[14px] py-[10px] rounded-[var(--r-md)]",
              "bg-[#25D366] border border-[#25D366]",
              "font-sans text-[13px] font-medium text-[var(--ink)]",
              "transition-colors duration-[var(--m-fast)]",
              "hover:bg-[#1FB554] hover:border-[#1FB554]"
            )}
            aria-label={`Message ${agent.name} on WhatsApp`}
          >
            {/* WhatsApp icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
              <path d="M9 1a8 8 0 0 0-6.93 11.99L1 17l4.13-1.05A8 8 0 1 0 9 1Zm0 14.5a6.48 6.48 0 0 1-3.34-.92l-.24-.14-2.45.62.64-2.38-.16-.25A6.5 6.5 0 1 1 9 15.5Zm3.56-4.86c-.19-.1-1.14-.56-1.32-.62-.17-.06-.3-.1-.42.1-.13.19-.49.62-.6.75-.11.13-.22.14-.41.05-.19-.1-.8-.3-1.53-.95a5.74 5.74 0 0 1-1.06-1.32c-.11-.19-.01-.3.08-.4l.3-.34c.1-.1.13-.19.19-.32.07-.13.03-.24-.02-.33-.05-.1-.43-1.03-.59-1.41-.15-.37-.31-.32-.43-.32l-.36-.01c-.13 0-.33.05-.5.24-.17.19-.66.64-.66 1.57 0 .93.68 1.83.77 1.95.1.13 1.33 2.04 3.23 2.86.45.19.8.31 1.07.4.45.14.86.12 1.18.07.36-.05 1.11-.45 1.26-.89.16-.43.16-.81.11-.89-.04-.08-.17-.13-.36-.22Z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </motion.section>
  );
}
