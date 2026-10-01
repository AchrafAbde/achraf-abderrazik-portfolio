import { ViewTransition, type ReactNode } from "react";

/**
 * Directional page transition. Links tagged `nav-forward` (into a case study,
 * to the next one) slide the content left; `nav-back` slides it right.
 * Untyped navigations (browser back/forward, refresh) don't animate.
 * Styles: "Page transitions" in globals.css.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}

/** Shared element between a project row and its case study title. */
export function SharedTitle({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <ViewTransition name={`project-title-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
