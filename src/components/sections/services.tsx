import Link from "next/link";

import type { Locale } from "@/content/i18n";
import type { CaseStudy, Content } from "@/lib/content";
import { localizeHref } from "@/lib/i18n";

import { RevealGroup, RevealItem } from "../motion/reveal";
import { ArrowRightIcon } from "../ui/icons";
import { Section, SectionHeading } from "../ui/section";

type ServicesProps = {
  locale: Locale;
  services: Content["services"];
  /** Case studies that prove a service (from each project's `services`). */
  related: (service: Content["services"]["items"][number]["id"]) => CaseStudy[];
};

export function Services({ locale, services, related }: ServicesProps) {
  return (
    <Section id="services">
      <SectionHeading
        id="services"
        index={services.heading.index}
        eyebrow={services.heading.eyebrow}
        title={services.heading.title}
        intro={services.heading.intro}
      />

      <RevealGroup
        as="ul"
        className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 md:grid-cols-2 lg:mt-24"
      >
        {services.items.map((service, index) => {
          const studies = related(service.id);
          return (
            <RevealItem as="li" key={service.id} className="flex flex-col bg-canvas p-6 sm:p-8 lg:p-10">
              <span className="font-mono text-sm text-fg-subtle tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 text-h3 font-medium text-fg lg:mt-10">{service.title}</h3>
              <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-fg-muted">
                {service.description}
              </p>

              <ul className="mt-7 grid gap-y-2.5 text-[0.9375rem] text-fg">
                {service.capabilities.map((capability) => (
                  <li key={capability} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent/70" />
                    {capability}
                  </li>
                ))}
              </ul>

              {studies.length > 0 ? (
                <div className="mt-auto pt-10">
                  <p className="font-mono text-eyebrow text-fg-subtle uppercase">{services.related}</p>
                  <ul className="mt-3 flex flex-col">
                    {studies.map((study) => (
                      <li key={study.slug} className="border-t border-line first:border-t-0">
                        <Link
                          href={localizeHref(locale, `/work/${study.slug}`)}
                          transitionTypes={["nav-forward"]}
                          className="group flex items-center justify-between gap-4 py-3 text-[0.9375rem] text-fg-muted transition-colors hover:text-fg"
                        >
                          <span className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2">
                            <span>{study.title}</span>
                            <span className="text-[0.8125rem] text-fg-subtle">{study.badge}</span>
                          </span>
                          <ArrowRightIcon
                            size={16}
                            className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
