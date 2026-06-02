import * as React from "react";
import { cn } from "@/lib/utils";
import type { AgentData } from "@/lib/tracker-data";

interface AgentMiniCardProps {
  agent: AgentData;
  applicationCode: string;
}

export function AgentMiniCard({ agent, applicationCode }: AgentMiniCardProps) {
  return (
    <aside
      className="bg-[var(--paper)] border border-[var(--rule)] rounded-[var(--r-lg)] p-[22px]"
      aria-label={`Agent: ${agent.name}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        {/* Avatar */}
        <div
          className="flex items-center justify-center w-11 h-11 shrink-0 rounded-full bg-[var(--brand)] text-white font-serif text-[16px] font-bold select-none"
          aria-hidden="true"
        >
          {agent.initials}
        </div>

        {/* Name + role + availability */}
        <div className="min-w-0">
          <h3 className="font-serif text-[17px] font-bold text-[var(--ink)] m-0 leading-snug truncate">
            {agent.name}
          </h3>
          <p className="font-mono text-[10px] text-[var(--ink-muted)] uppercase tracking-[0.08em] mt-[2px] m-0">
            {agent.role}
          </p>
          {/* Online dot */}
          <div className="flex items-center gap-[5px] mt-[5px]">
            <span
              className="w-[6px] h-[6px] rounded-full bg-[var(--ok)] shrink-0"
              aria-hidden="true"
            />
            <span className="font-sans text-[11px] text-[var(--ok)]">Available</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5 pt-4 border-t border-[var(--rule)]">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Reply time</dt>
          <dd className="font-sans text-[13px] text-[var(--ink)] font-semibold mt-[2px]">~{agent.avgReplyMinutes} min</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Cases handled</dt>
          <dd className="font-sans text-[13px] text-[var(--ink)] font-semibold mt-[2px]">{agent.casesHandled}+</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Languages</dt>
          <dd className="font-sans text-[13px] text-[var(--ink)] font-semibold mt-[2px]">{agent.languages}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Location</dt>
          <dd className="font-sans text-[13px] text-[var(--ink)] font-semibold mt-[2px]">{agent.location}</dd>
        </div>
      </dl>

      {/* Contact buttons */}
      <div className="grid gap-2">
        {/* In-app message */}
        <a
          href={`/dashboard/applications/${applicationCode}?tab=messages`}
          className={cn(
            "flex items-center justify-center gap-2 w-full px-4 py-[10px] rounded-[999px]",
            "font-sans text-[13px] font-semibold",
            "bg-[var(--cream-2)] text-[var(--ink)] border border-[var(--rule)]",
            "transition-colors duration-[var(--m-fast)]",
            "hover:bg-[var(--ink)] hover:text-[var(--paper)] hover:border-[var(--ink)]",
            "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 3a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H3l-2 2V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
          </svg>
          Message in app
        </a>

        {/* WhatsApp */}
        <a
          href={agent.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center justify-center gap-2 w-full px-4 py-[10px] rounded-[999px]",
            "font-sans text-[13px] font-semibold",
            "bg-[#25D366] text-white border border-[#25D366]",
            "transition-opacity duration-[var(--m-fast)]",
            "hover:opacity-90",
            "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]"
          )}
        >
          {/* WhatsApp icon */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1a6 6 0 015.2 9L13 13l-3.1-.8A6 6 0 117 1z" fill="white" stroke="white" strokeWidth="0.5"/>
            <path d="M5 4.5c.2.5.5 1 .9 1.4l-.2.3c-.3.5.1 1.1.5 1.5.4.4 1 .8 1.5.5l.3-.2c.4.4.9.7 1.4.9" stroke="#25D366" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </aside>
  );
}
