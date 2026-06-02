"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WelcomeBannerProps {
  name: string;
  isReturning?: boolean;
}

export function WelcomeBanner({ name, isReturning = false }: WelcomeBannerProps) {
  const firstName = name.split(" ")[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.32, ease: [0.2, 0, 0, 1] }}
      className={cn(
        "grid gap-4 mb-8",
        "grid-cols-1 sm:grid-cols-[1fr_auto]",
        "items-center",
        "bg-[var(--ink)] rounded-[var(--r-lg)]",
        "px-7 py-6"
      )}
    >
      <div>
        <h3 className="font-serif text-[22px] font-normal text-white m-0 mb-2">
          {isReturning ? (
            <>Welcome back, <em>{firstName}.</em> It's been a while.</>
          ) : (
            <>Good to see you, <em>{firstName}.</em> Here's your dashboard.</>
          )}
        </h3>
        <p className="font-sans text-[13.5px] m-0" style={{ color: "rgba(246,236,210,0.75)" }}>
          {isReturning
            ? "Your applications are up to date. Review any recent changes below."
            : "Track your applications, message your agent, and manage your documents from here."}
        </p>
      </div>

      <Link
        href="/services"
        className={cn(
          "inline-flex items-center gap-2 whitespace-nowrap",
          "font-serif italic text-[15px] text-[var(--ink)]",
          "px-5 py-[10px] bg-[var(--paper)] rounded-[999px]",
          "transition-colors duration-[var(--m-fast)]",
          "hover:bg-[var(--cream)]",
          "focus-visible:outline-none focus-visible:[box-shadow:var(--focus-ring)]",
          "max-sm:self-start"
        )}
      >
        Start a new application →
      </Link>
    </motion.div>
  );
}
