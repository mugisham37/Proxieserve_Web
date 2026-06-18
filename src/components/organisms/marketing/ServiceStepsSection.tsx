"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { StepCard } from "@/components/molecules/marketing/StepCard";
import { type UiService } from "@/lib/service-ui-types";

interface ServiceStepsSectionProps {
  service: UiService;
  id?: string;
  className?: string;
}

export function ServiceStepsSection({ service, id = "how-it-works", className }: ServiceStepsSectionProps) {
  const lineRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    async function init() {
      if (!lineRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        lineRef.current.style.transform = "scaleX(1)";
        return;
      }
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.48,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
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
      id={id}
      className={cn("bg-[var(--cream)] py-14 sm:py-16 border-b border-[var(--rule)]", className)}
      aria-labelledby="steps-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Eyebrow withLine className="text-[var(--ink-muted)] mb-3">The process</Eyebrow>
          <h2 id="steps-heading" className="t-h2 text-[var(--ink)]">How it works</h2>
        </motion.div>

        <div className="relative">
          {/* GSAP connector line — desktop only */}
          <div
            ref={lineRef}
            className="hidden md:block absolute top-[88px] left-[48px] right-[48px] h-px bg-[var(--rule)] origin-left"
            aria-hidden="true"
            style={{ transform: "scaleX(0)" }}
          />

          <div
            className={cn(
              "grid grid-cols-1 gap-6",
              service.steps.length <= 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"
            )}
          >
            {service.steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.2, 0, 0, 1] as [number, number, number, number] }}
              >
                <StepCard num={step.num} title={step.title} body={step.body} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
