import type { Project } from "../types";

import { aeromanager } from "./aeromanager";
import { aman } from "./aman";
import { babyGrowthTracker } from "./baby-growth-tracker";
import { carRentalSystem } from "./car-rental-system";
import { distributedModelServing } from "./distributed-model-serving";
import { industrialSurveillance } from "./industrial-surveillance";
import { safeInvest } from "./safe-invest";
import { trendradar } from "./trendradar";

/**
 * Every project, in the order they appear on the site.
 *
 * To add a project: create a file next to this one (copy a similar project),
 * import it and add it to this list. Case studies get their page, homepage
 * card, sitemap entry and share image automatically.
 * See docs/CONTENT-GUIDE.md.
 *
 * Sources of truth (do not add anything they don't support):
 * - CV (EN/FR, 2026)            → experience, metrics, stacks
 * - GitHub READMEs (AchrafAbderrazik) → AMAN, TrendRadar, Car Rental, Surveillance, Baby Growth
 */
export const projects: Project[] = [
  safeInvest,
  aman,
  trendradar,
  aeromanager,
  distributedModelServing,
  carRentalSystem,
  industrialSurveillance,
  babyGrowthTracker,
];
