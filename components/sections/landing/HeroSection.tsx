"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/atoms/SectionLabel";

const LAYERS = [
  {
    label: "Discovery + Reach",
    bg: "rgba(255,181,71,0.08)",
    border: "rgba(255,181,71,0.3)",
    color: "var(--warning)",
    top: "0%", left: "10%", width: "80%", zIndex: 3,
  },
  {
    label: "Qualify + Close",
    bg: "rgba(91,124,255,0.08)",
    border: "rgba(91,124,255,0.3)",
    color: "var(--brand)",
    top: "25%", left: "5%", width: "80%", zIndex: 2,
  },
  {
    label: "Revenue + Audit",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.3)",
    color: "var(--success)",
    top: "50%", left: "12%", width: "80%", zIndex: 1,
  },
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    const init = async () => {
      const { gsap } = await import("gsap");
      ctx = gsap.context(() => {
        gsap.from(".hero-content > *", {
          y: 24, duration: 0.6, stagger: 0.1,
          ease: "cubic-bezier(0.2,0.8,0.2,1)", delay: 0.1,
          clearProps: "transform",
        });
        gsap.from(".hero-layer", {
          y: 60, x: 20, duration: 0.8, stagger: 0.15,
          ease: "cubic-bezier(0.2,0.8,0.2,1)", delay: 0.3,
          clearProps: "transform",
        });
      }, heroRef);
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="max-w-[1280px] mx-auto px-4 pt-12 pb-10 grid grid-cols-1 gap-8 items-center md:px-8 md:pt-20 md:pb-16 md:grid-cols-2 md:gap-16"
    >
      {/* Visual — on mobile shows first (order-first), desktop shows right */}
      <div className="hero-visual order-first md:order-last">
        <div
          className="relative w-full max-w-[440px] mx-auto"
          style={{ aspectRatio: "1/0.85" }}
        >
          {LAYERS.map((layer, i) => (
            <div
              key={i}
              className="hero-layer absolute rounded-[14px] border flex items-end px-4 py-3"
              style={{
                top: layer.top, left: layer.left, width: layer.width,
                height: "35%", background: layer.bg, borderColor: layer.border,
                zIndex: layer.zIndex,
                transform: "perspective(600px) rotateX(8deg)",
              }}
            >
              <span
                className="font-mono text-[11px] uppercase tracking-[0.06em] font-medium"
                style={{ color: layer.color }}
              >
                {layer.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <SectionLabel>Autonomous E-Commerce Revenue Engine</SectionLabel>
        <h1 className="text-[clamp(32px,5vw,52px)] font-bold tracking-[-0.03em] leading-[1.15] mb-5 text-[var(--text)]">
          Upload a product.
          <br />
          SolAI runs <em>everything</em> else.
        </h1>
        <p className="text-[clamp(16px,1.8vw,18px)] text-[var(--text-muted)] leading-[1.7] mb-7 max-w-[520px]">
          One upload. Ads launch on Meta and Google. Leads convert on WhatsApp.
          Orders close via Stripe or Mobile Money. Every decision explained.
          Every cent tracked.
        </p>
        <div className="flex gap-3 mb-7 flex-wrap">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-7 py-3.5 text-[15px] font-semibold bg-[var(--brand)] text-white border border-[var(--brand)] rounded-[10px] no-underline hover:no-underline hover:bg-[#4A6BEE] transition-all duration-150"
          >
            Start free
          </Link>
          <Link
            href="#demo"
            className="inline-flex items-center gap-1.5 px-7 py-3.5 text-[15px] font-medium bg-transparent text-[var(--text)] border border-[var(--border)] rounded-[10px] no-underline hover:no-underline hover:bg-[var(--surface-2)] hover:border-[var(--text-subtle)] transition-all duration-150"
          >
            Watch demo
          </Link>
        </div>
        <div className="text-[13px] text-[var(--text-subtle)] flex flex-col gap-1">
          <span>Trusted by sellers in</span>
          <span className="text-[var(--text-muted)]">
            🇷🇼 Rwanda · 🇰🇪 Kenya · 🇳🇬 Nigeria · 🇿🇦 South Africa · 🇸🇳 Senegal
          </span>
        </div>
      </div>
    </section>
  );
}
