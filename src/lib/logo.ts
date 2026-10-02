/*
 * The logo, drawn on a 64-unit grid: one geometry for the site, the share
 * images and the generated icon files (scripts/brand-assets.mjs).
 *
 * A white "A" for Achraf. A lime flow woven through it: out from under the
 * left foot, a soft arch inside the A, under the right leg, then the leg's
 * lower part. That flow is a second, softer A on the same feet (Abderrazik),
 * and data moving through a system. The dot is the next data point. Meaning
 * and construction: docs/DESIGN-SYSTEM.md, "Logo".
 */

export type LogoGeometry = {
  /** One stroke width for the A and the flow. */
  stroke: number;
  /** The A: left leg, apex, and the right leg down to where the flow takes it over. */
  a: string;
  /** The left foot: the A's path ends flat (so it can hand over cleanly at the junction); the round foot is a circle. */
  foot: readonly [x: number, y: number];
  /** The flow: starts under the left foot, joins the right leg at its golden section, ends at the right foot. */
  flow: string;
  /** The dot: one stroke-width clear of the right leg, on the line through the apex at 45° to the leg. */
  dot: readonly [x: number, y: number];
  dotRadius: number;
  /**
   * One-color versions: the A as the knockout cuts it, stopping 2 units short
   * of the junction so the flow still overlaps the A's end there (no seam).
   */
  knockout: string;
};

/** The mark from 20px up. */
export const logo: LogoGeometry = {
  stroke: 6.75,
  a: "M12 52L32 12L44.36 36.72",
  foot: [12, 52],
  flow: "M12 52C30.58 48.05 38.99 25.99 44.36 36.72L52 52",
  dot: [51.5, 18.5],
  dotRadius: 4.4,
  knockout: "M12 52L32 12L43.47 34.93",
};

/** Favicons and anything under 20px: the same construction with heavier strokes and a larger dot. */
export const logoSmall: LogoGeometry = {
  stroke: 9,
  a: "M10 53L31 11L43.98 36.96",
  foot: [10, 53],
  flow: "M10 53C27.47 48.65 39.06 27.12 43.98 36.96L52 53",
  dot: [52.6, 18.2],
  dotRadius: 5.6,
  knockout: "M10 53L31 11L43.09 35.17",
};

/** The brand lime, the same in both themes (the light theme's text accent is a deeper lime). */
export const brandLime = "#c6f36b";

/** In one-color versions, the flow stops this far short of the A where it passes under it. */
export const logoKnockout = 1.5;
