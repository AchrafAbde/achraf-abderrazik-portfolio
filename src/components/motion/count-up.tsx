"use client";

import { useEffect, useRef } from "react";

import type { Locale } from "@/content/i18n";
import { intlLocale } from "@/lib/i18n";

type CountUpProps = {
  /** The final value, as displayed in this language. */
  value: string;
  count?: { to: number; decimals?: number; prefix?: string; suffix?: string };
  /** Number format while counting (0.895 in English, 0,895 in French). */
  locale: Locale;
  className?: string;
};

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Counts a documented number up the first time it scrolls into view.
 * The real value is rendered on the server (and for screen readers, search
 * engines and visitors who prefer reduced motion); only the visual digits
 * animate.
 */
export function CountUp({ value, count, locale, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !count) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { to, decimals = 0, prefix = "", suffix = "" } = count;
    const format = new Intl.NumberFormat(intlLocale(locale), {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    const render = (n: number) => {
      element.textContent = `${prefix}${format.format(n)}${suffix}`;
    };

    let frame = 0;
    let start = 0;
    const duration = 1400;

    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      render(to * easeOutExpo(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else element.textContent = value;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        render(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      element.textContent = value;
    };
  }, [value, count, locale]);

  // Proportional figures: tabular ones look loose at display sizes ("0.92 1").
  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
