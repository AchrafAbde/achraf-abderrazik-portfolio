"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

type InViewProps = ComponentPropsWithoutRef<"div"> & {
  /** Fraction of the element that must be visible before it starts. */
  amount?: number;
};

/**
 * Drives CSS-only animations from visibility:
 * - `data-inview` flips from "false" to "true" the first time the element is
 *   seen, which plays its entrance (once).
 * - `data-playing` follows visibility, so looping animations pause off-screen.
 *
 * Without JavaScript the content stays visible (see the noscript style in
 * the root layout).
 */
export function InView({ amount = 0.25, ...props }: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) element.dataset.inview = "true";
        element.dataset.playing = entry.isIntersecting ? "true" : "false";
      },
      { threshold: amount },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [amount]);

  return <div ref={ref} data-inview="false" data-playing="false" {...props} />;
}
