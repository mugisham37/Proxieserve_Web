"use client";

import { useEffect, type RefObject } from "react";

interface ScrollRevealOptions {
  selector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
}

export function useGSAPScrollReveal(
  containerRef: RefObject<HTMLElement | null>,
  options: ScrollRevealOptions = {}
) {
  const {
    selector = ".reveal",
    y = 32,
    stagger = 0.1,
    duration = 0.6,
    start = "top 85%",
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let gsapContext: { revert: () => void } | undefined;
    let cancelled = false;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      // If cleanup ran before this resolved, bail out
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      gsapContext = gsap.context(() => {
        const elements = container.querySelectorAll<Element>(selector);
        if (!elements.length) return;

        // Set initial hidden state immediately so there's no flash
        gsap.set(elements, { opacity: 0, y });

        // Animate to visible when the container enters the viewport
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start,
            once: true,
          },
        });
      }, container);
    };

    init();

    return () => {
      cancelled = true;
      gsapContext?.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
