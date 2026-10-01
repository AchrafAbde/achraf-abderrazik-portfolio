import Link from "next/link";

import type { Locale } from "@/content/i18n";
import { cn } from "@/lib/cn";
import { getMetric, type Content } from "@/lib/content";
import { localizeHref } from "@/lib/i18n";

import { CountUp } from "../motion/count-up";
import { RevealGroup, RevealItem } from "../motion/reveal";
import { isProfessionalKind } from "../ui/badge";
import { Container } from "../ui/container";
import { ArrowUpRightIcon } from "../ui/icons";

type ProofProps = {
  locale: Locale;
  headline: Content["work"]["headline"];
  caseStudies: Content["caseStudies"];
};

/**
 * The strongest documented numbers, right under the hero. Each one names its
 * project and what kind of project it was, and links to the case study that
 * explains it. The project cards below show other metrics, so none repeats.
 */
export function Proof({ locale, headline, caseStudies }: ProofProps) {
  const items = headline.items.flatMap((item) => {
    const study = caseStudies.find((project) => project.slug === item.project);
    return study ? [{ ...item, study, metric: getMetric(study, item.metric) }] : [];
  });

  return (
    <section aria-labelledby="proof-title" className="relative pt-6 pb-20 sm:pb-24 lg:pt-10 lg:pb-28">
      <Container>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 id="proof-title" className="font-mono text-eyebrow text-fg-subtle uppercase">
            {headline.title}
          </h2>
          <p className="text-sm text-fg-subtle">{headline.note}</p>
        </div>

        <RevealGroup
          as="ul"
          className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3"
        >
          {items.map(({ study, metric, label, detail }) => (
            <RevealItem as="li" key={study.slug} className="bg-canvas">
              <Link
                href={localizeHref(locale, `/work/${study.slug}`)}
                transitionTypes={["nav-forward"]}
                className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-surface focus-visible:outline-offset-[-2px] sm:p-7 lg:p-9"
              >
                <CountUp
                  value={metric.value}
                  count={metric.count}
                  locale={locale}
                  className="text-[clamp(2.75rem,2rem+2.4vw,4.25rem)] leading-none font-medium tracking-[-0.04em] text-fg"
                />
                <span className="mt-4 text-[0.9375rem] leading-snug text-fg">{label ?? metric.label}</span>
                <span className="mt-1 text-[0.8125rem] leading-snug text-fg-muted">
                  {detail ?? metric.detail}
                </span>
                <span className="mt-auto flex items-center gap-2 pt-8 font-mono text-[0.625rem] tracking-[0.1em] text-fg-subtle uppercase transition-colors group-hover:text-fg-muted">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-1.5 shrink-0 rounded-full",
                      isProfessionalKind(study.kind) ? "bg-accent" : "border border-fg-subtle",
                    )}
                  />
                  <span className="flex flex-wrap gap-x-2 gap-y-0.5">
                    <span className="text-fg-muted">{study.shortTitle ?? study.title}</span>
                    <span>{study.badge}</span>
                  </span>
                  <ArrowUpRightIcon
                    size={12}
                    className="ml-auto shrink-0 opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
