"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Animation features are fetched in a separate chunk after the page is interactive. */
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/**
 * Loads only the animation features the site uses (smaller bundle) and
 * respects the visitor's "reduce motion" system preference everywhere.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
