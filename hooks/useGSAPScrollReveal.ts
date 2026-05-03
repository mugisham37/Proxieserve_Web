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
    if (!containerRef.current) return;

    // eslint-disable-next-line prefer-const
    let gsapContext: { revert: () => void } | undefined;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsapContext = gsap.context(() => {
        const elements = containerRef.current?.querySelectorAll(selector);
        if (!elements?.length) return;

        gsap.from(elements, {
          y,
          opacity: 0,
          duration,
          stagger,
          ease: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          scrollTrigger: {
            trigger: containerRef.current,
            start,
          },
        });
      }, containerRef);
    };

    init();

    return () => {
      gsapContext?.revert();
    };
  }, [containerRef, selector, y, stagger, duration, start]);
}
