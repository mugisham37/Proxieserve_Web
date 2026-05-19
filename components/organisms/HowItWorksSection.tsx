"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/Eyebrow";
import { StepCard } from "@/components/molecules/StepCard";

const STEPS = [
  {
    num: 1,
    title: "Tell us what you need",
    body: "Choose from our catalogue of services or describe your specific requirements. No paperwork knowledge needed.",
  },
  {
    num: 2,
    title: "Upload your documents",
    body: "Securely upload any existing documents via your phone or computer. We'll tell you exactly what's needed.",
  },
  {
    num: 3,
    title: "We handle the rest",
    body: "Our local agents navigate the government systems, submit on your behalf, and keep you updated every step.",
  },
];

export function HowItWorksSection({ className }: { className?: string }) {
  const connectorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = connectorRef.current;
    if (!el) return;

    let gsapLoaded = false;

    async function init() {
      if (gsapLoaded) return;
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsapLoaded = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.style.transform = "scaleX(1)";
        return;
      }

      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.48,
          ease: "power2.out",
          transformOrigin: "left",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        }
      );
    }

    init();
  }, []);

  return (
    <section
      className={cn("bg-[var(--paper)] py-16 sm:py-20", className)}
      aria-labelledby="how-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Eyebrow withLine className="text-[var(--ink-muted)] mb-3">How it works</Eyebrow>
          <h2 id="how-heading" className="t-h2 text-[var(--ink)]">Simple as one, two, three</h2>
        </motion.div>

        {/* Steps grid with connector line */}
        <div className="relative">
          {/* GSAP connector line — desktop only */}
          <div
            ref={connectorRef}
            className="hidden lg:block absolute top-[72px] left-8 right-8 h-px bg-[var(--rule)] origin-left"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-14">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.36, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
              >
                <StepCard {...step} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link href="/how-it-works" className="lnk-arrow font-sans text-[14px] text-[var(--ink-muted)] hover:text-[var(--ink)]">
            Learn more about the process
          </Link>
        </div>
      </div>
    </section>
  );
}
