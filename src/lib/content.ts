import { cache } from "react";

import { about } from "@/content/about";
import { contact } from "@/content/contact";
import { hero } from "@/content/hero";
import type { Locale } from "@/content/i18n";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { stack } from "@/content/stack";
import type { CaseStudyProject, Metric, Project, SecondaryProject, ServiceId } from "@/content/types";
import { ui } from "@/content/ui";
import { work } from "@/content/work";

import { resolve, type Resolved } from "./i18n";

/*
 * Content → pages. Pages call getContent(locale) and pass plain, single-
 * language data down to the components, which never import src/content.
 */

export type Content = ReturnType<typeof getContent>;
export type CaseStudy = Resolved<CaseStudyProject>;
export type SecondaryWork = Resolved<SecondaryProject>;
export type ResolvedMetric = Resolved<Metric>;

export const getContent = cache((locale: Locale) => {
  validate();
  const r = <T,>(value: T) => resolve(value, locale);

  const all = projects.map((project) => r(project) as Resolved<Project>);
  const caseStudies = all.filter((project): project is CaseStudy => project.caseStudy);

  return {
    locale,
    site: r(site),
    hero: r(hero),
    work: r(work),
    services: r(services),
    about: r(about),
    stack: r(stack),
    contact: r(contact),
    ui: r(ui),
    caseStudies,
    /** Listed under Selected work. */
    featured: caseStudies.filter((project) => project.featured),
    /** Cards under "Also built": smaller projects and non-featured case studies. */
    more: all.filter((project) => !project.caseStudy || !project.featured),
    /** Case studies that prove a service, in project order. */
    related: (service: ServiceId) =>
      caseStudies.filter((project) => project.services?.includes(service) ?? false),
  };
});

export function getCaseStudy(locale: Locale, slug: string): CaseStudy | undefined {
  return getContent(locale).caseStudies.find((project) => project.slug === slug);
}

export function getMetric(study: CaseStudy, id: string): ResolvedMetric {
  const metric = study.metrics.find((item) => item.id === id);
  if (!metric) throw new Error(`Unknown metric "${id}" in case study "${study.slug}".`);
  return metric;
}

/** The case study after this one, wrapping around. */
export function getNextCaseStudy(locale: Locale, slug: string): CaseStudy {
  const { caseStudies } = getContent(locale);
  const index = caseStudies.findIndex((project) => project.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
}

export function getGithubProfile(): string | null {
  return site.socials.find((social) => social.label === "GitHub")?.href ?? null;
}

/* ---- Build-time checks ------------------------------------------------------ */

let validated = false;

/**
 * Cross-references between content files are plain strings (slugs, metric
 * ids). Pages are prerendered, so any mistake fails the build with a clear
 * message instead of shipping a broken page.
 */
function validate() {
  if (validated) return;
  const errors: string[] = [];
  const slugs = new Set<string>();

  for (const project of projects) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(project.slug)) {
      errors.push(`Project slug "${project.slug}" must be lowercase words joined by hyphens.`);
    }
    if (slugs.has(project.slug)) errors.push(`Two projects share the slug "${project.slug}".`);
    slugs.add(project.slug);

    if (!project.caseStudy) continue;
    const ids = new Set(project.metrics.map((metric) => metric.id));
    for (const id of [...project.cardMetrics, ...(project.progression?.steps ?? [])]) {
      if (!ids.has(id)) errors.push(`"${project.slug}" refers to a metric "${id}" it doesn't define.`);
    }
    for (const id of project.services ?? []) {
      if (!services.items.some((service) => service.id === id)) {
        errors.push(`"${project.slug}" lists an unknown service "${id}".`);
      }
    }
  }

  const caseStudy = (slug: string) =>
    projects.find((project): project is CaseStudyProject => project.slug === slug && project.caseStudy);

  for (const item of work.headline.items) {
    const project = caseStudy(item.project);
    if (!project) errors.push(`Headline metric refers to an unknown case study "${item.project}".`);
    else if (!project.metrics.some((metric) => metric.id === item.metric)) {
      errors.push(`Headline metric "${item.metric}" isn't defined in "${item.project}".`);
    }
  }
  for (const item of about.experience) {
    if (!caseStudy(item.caseStudy)) errors.push(`Experience links to an unknown case study "${item.caseStudy}".`);
  }

  if (errors.length > 0) throw new Error(`Content errors:\n- ${errors.join("\n- ")}`);
  validated = true;
}
