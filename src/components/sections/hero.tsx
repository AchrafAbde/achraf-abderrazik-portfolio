import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import type { Locale } from "@/content/i18n";
import { cn } from "@/lib/cn";
import type { Content } from "@/lib/content";
import { localizeHref } from "@/lib/i18n";

import { HeroMotion } from "../motion/hero-motion";
import { StatusPill } from "../ui/badge";
import { ButtonLink } from "../ui/button";
import { Container } from "../ui/container";
import { ArrowDownIcon, ArrowUpRightIcon } from "../ui/icons";

/**
 * Load sequence, in CSS so it runs before hydration (milliseconds):
 *    0  the portrait is on screen, a little darker, flatter and closer
 *  200  a light sweep passes down the frame and lifts the grade as it goes,
 *       while the photo settles into place
 *  250  the headline rises in, line by line
 *  800  the introduction, then the calls to action
 * 1150  technical metadata fades in: name and role, labels, registration marks
 * 1350  the stack readout boots up
 *
 * Only transform, opacity and clip-path animate. With "reduce motion"
 * everything is shown in its final state at once (see globals.css).
 */
const timing = { title: 250, lead: 800, cta: 950, meta: 1150, stack: 1350 } as const;

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

type HeroProps = {
  locale: Locale;
  site: Content["site"];
  hero: Content["hero"];
  labels: Content["ui"]["hero"];
  /** Whether the portrait file exists (checked at build time). */
  photo: boolean;
};

export function Hero({ locale, site, hero, labels, photo }: HeroProps) {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <HeroBackground />

      <HeroMotion className="flex flex-col pt-24 sm:pt-28 lg:min-h-[min(100svh,60rem)] lg:pt-28 lg:short:pt-24">
        <Container className="flex flex-1 flex-col">
          <div className="grid flex-1 grid-cols-1 lg:grid-cols-12 lg:items-center lg:gap-x-10">
            {/* The text column, over the portrait's left edge on large screens. On small
                screens its box dissolves (display: contents) so the page heading sits above
                the portrait (`order`) and the tagline overlaps the portrait's bottom. */}
            <div className="contents lg:relative lg:z-10 lg:col-start-1 lg:col-end-9 lg:row-start-1 lg:block lg:py-6 lg:short:py-0">
              {/* 7/8 of this column: it spans columns 1–8 and the portrait starts at
                  column 8, so a long heading wraps before reaching the photo. */}
              <HeroIntro site={site} className="mb-8 lg:mb-9 lg:max-w-[87.5%] lg:short:mb-6" />

              <p className="relative z-10 order-2 -mt-20 text-hero font-medium text-balance text-fg sm:-mt-28 lg:order-none lg:mt-0">
                {hero.headline.map((line, index) => (
                  <Line key={line} ms={timing.title + index * 90}>
                    <HeadlineText text={line} />
                  </Line>
                ))}
              </p>

              <p
                className="order-2 mt-8 max-w-[33rem] animate-fade-up text-lead text-fg-muted sm:mt-10 lg:order-none lg:short:mt-7"
                style={delay(timing.lead)}
              >
                {hero.intro}
              </p>

              <div
                className="order-2 mt-9 flex animate-fade-up flex-col gap-3 sm:mt-10 sm:flex-row lg:order-none lg:short:mt-7"
                style={delay(timing.cta)}
              >
                <ButtonLink
                  href={localizeHref(locale, site.navigation.cta.href)}
                  size="lg"
                  icon={<ArrowUpRightIcon size={18} />}
                >
                  {site.navigation.cta.label}
                </ButtonLink>
                <ButtonLink
                  href={localizeHref(locale, hero.secondaryCta.href)}
                  size="lg"
                  variant="secondary"
                  icon={<ArrowDownIcon size={18} />}
                >
                  {hero.secondaryCta.label}
                </ButtonLink>
              </div>
            </div>

            <div className="order-1 lg:order-none lg:col-start-8 lg:col-end-13 lg:row-start-1">
              <PortraitFrame site={site} photo={photo} placeholderHint={labels.portraitPlaceholder} />
            </div>
          </div>

          <StackReadout stack={hero.stack} />
        </Container>
      </HeroMotion>
    </section>
  );
}

/**
 * One headline line, rising from behind its own mask. No wrapping on large
 * screens, so the fallback font can't change the headline's height (and
 * shift the portrait) before the web fonts load.
 * The trailing space keeps words apart in the heading's text ("I build
 * intelligent…") for search engines and screen readers; browsers drop
 * spaces at the end of a line, so it never shows.
 */
function Line({ children, ms }: { children: ReactNode; ms: number }) {
  return (
    <span className="hero-line block lg:whitespace-nowrap">
      <span className="hero-line-inner block" style={delay(ms)}>
        {children}{" "}
      </span>
    </span>
  );
}

/**
 * A headline line from content: *serif accent* segments, and a final "." drawn
 * as the accent-coloured signal dot. An accent that ends the line gets a hair
 * of padding so the italic overhang isn't clipped by the line mask.
 */
function HeadlineText({ text }: { text: string }) {
  const dot = text.endsWith(".");
  const segments = (dot ? text.slice(0, -1) : text).split(/(\*[^*]+\*)/).filter(Boolean);

  return (
    <>
      {segments.map((segment, index) => {
        const accent = segment.startsWith("*") && segment.endsWith("*");
        if (!accent) return segment;
        const endsLine = index === segments.length - 1 && !dot;
        return (
          <span key={index} className={cn("font-accent", endsLine ? "pr-[0.05em]" : null)}>
            {segment.slice(1, -1)}
          </span>
        );
      })}
      {dot ? <span className="text-accent">.</span> : null}
    </>
  );
}

function HeroIntro({ site, className }: { site: Content["site"]; className?: string }) {
  return (
    <div className={cn("flex flex-col items-start gap-5", className)}>
      {site.availability.open ? (
        <div className="animate-fade-up" style={delay(timing.meta)}>
          <StatusPill>{site.availability.label}</StatusPill>
        </div>
      ) : null}
      {/* The page's main heading: who this is ("Achraf Abderrazik · AI & Data Science
          Engineer"). The separator sits in the gap before the role; if the role wraps
          to a new line, it falls outside the clipped box, so no line starts with "·". */}
      <h1 id="hero-title" className="hero-meta overflow-hidden" style={delay(timing.meta + 80)}>
        <span className="-ml-6 flex flex-wrap gap-y-1.5 font-mono text-eyebrow uppercase">
          <span className="relative pl-6 whitespace-nowrap text-fg">{site.name}</span>{" "}
          <span className="relative pl-6 whitespace-nowrap text-fg-muted">
            <span aria-hidden="true" className="absolute left-0 w-6 text-center text-fg-subtle">
              ·
            </span>{" "}
            {site.role}
          </span>
        </span>
      </h1>
    </div>
  );
}

/* ---- Portrait --------------------------------------------------------------- */

/**
 * Layers, back to front: photo (moves against the pointer), static grade,
 * load veil and light sweep, technical overlay (moves with it), hairline.
 * The frame itself follows the pointer a few pixels. See <HeroMotion>.
 */
function PortraitFrame({
  site,
  photo,
  placeholderHint,
}: {
  site: Content["site"];
  photo: boolean;
  placeholderHint: string;
}) {
  return (
    <div data-parallax="frame" className="relative">
      <CornerMarks />

      <div className="relative isolate aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-surface sm:aspect-[5/4] lg:aspect-[4/5] lg:max-h-[max(26rem,calc(100svh-12rem))] lg:w-full lg:rounded-[1.5rem]">
        {/* Oversized so the parallax never reveals an edge. */}
        <div data-parallax="image" className="absolute -inset-x-[4%] -inset-y-[7%]">
          <div className="hero-develop absolute inset-0">
            {photo ? (
              <Image
                src={site.portrait.src}
                alt={site.portrait.alt}
                fill
                preload
                // A tall photo covers the oversized parallax box by its width: 1.08× the frame.
                sizes="(min-width: 1280px) 550px, (min-width: 1024px) 42vw, 100vw"
                className="hero-photo object-cover"
                style={{ objectPosition: site.portrait.position }}
              />
            ) : (
              <PortraitPlaceholder hint={placeholderHint} src={site.portrait.src} />
            )}
          </div>
        </div>

        {/* Cinematic grade, static. The face itself is left as photographed. */}
        <div aria-hidden="true" className="hero-vignette pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="hero-tint pointer-events-none absolute inset-0" />

        {/* Tonal grade: keeps labels and the overlapping headline legible. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--color-canvas)_0%,rgb(8_8_10/0.55)_24%,transparent_58%),linear-gradient(to_bottom,rgb(8_8_10/0.75),rgb(8_8_10/0.35)_15%,transparent_32%)] lg:bg-[linear-gradient(to_top,rgb(8_8_10/0.7)_0%,transparent_38%),linear-gradient(to_bottom,rgb(8_8_10/0.75),rgb(8_8_10/0.35)_15%,transparent_32%)]"
        />
        <div aria-hidden="true" className="hero-grain pointer-events-none absolute inset-0" />

        {/* Load: the photo starts darker and flatter; the light sweep lifts it. */}
        <div aria-hidden="true" className="hero-veil pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="hero-sweep pointer-events-none absolute inset-0" />

        <PortraitOverlay site={site} />

        {/* Hairline frame, drawn above the photo. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/10 ring-inset"
        />
      </div>
    </div>
  );
}

/** Technical overlay: name and role, coordinates, a scale ruler and the location. */
function PortraitOverlay({ site }: { site: Content["site"] }) {
  const label = "font-mono text-[0.625rem] tracking-[0.1em] text-fg-muted uppercase";

  return (
    <div
      aria-hidden="true"
      data-parallax="hud"
      className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-5 lg:p-6"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="hero-meta" style={delay(timing.meta + 120)}>
          <p className="text-[0.8125rem] leading-tight font-medium text-fg">{site.name}</p>
          <p className={cn("mt-1.5", label)}>{site.role}</p>
        </div>
        <div className={cn("hero-meta text-right leading-[1.6]", label)} style={delay(timing.meta + 200)}>
          {site.coordinates.split(" · ").map((part) => (
            <p key={part}>{part}</p>
          ))}
        </div>
      </div>

      <div className="hidden justify-end lg:flex">
        <p className={cn("hero-meta flex items-center gap-2", label)} style={delay(timing.meta + 340)}>
          <span className="size-1.5 rounded-full bg-accent" />
          {site.location}
        </p>
      </div>

      {/* Scale ruler on the left edge; its one lime tick marks the frame's centre line. */}
      <span
        className="hero-ruler absolute top-1/2 left-4 h-[34%] w-3 -translate-y-1/2 animate-fade-in sm:left-5 lg:left-6"
        style={delay(timing.meta + 260)}
      />
    </div>
  );
}

/** Registration marks just outside the frame corners. */
function CornerMarks() {
  const mark = "hero-mark pointer-events-none absolute size-3.5 border-white/25";
  const style = delay(timing.meta);
  return (
    <div aria-hidden="true">
      <span style={style} className={cn(mark, "-top-2.5 -left-2.5 origin-top-left border-t border-l")} />
      <span style={style} className={cn(mark, "-top-2.5 -right-2.5 origin-top-right border-t border-r")} />
      {/* The headline overlaps the bottom of the frame on small screens. */}
      <span
        style={style}
        className={cn(mark, "-bottom-2.5 -left-2.5 hidden origin-bottom-left border-b border-l lg:block")}
      />
      <span
        style={style}
        className={cn(mark, "-right-2.5 -bottom-2.5 hidden origin-bottom-right border-r border-b lg:block")}
      />
    </div>
  );
}

/**
 * Shown until the photo set in `site.portrait.src` exists in /public. A
 * monogram plate rather than a generated face; the hint only shows in development.
 */
function PortraitPlaceholder({ hint, src }: { hint: string; src: string }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(110%_75%_at_50%_32%,var(--color-surface-3),var(--color-surface)_72%)]"
    >
      <div className="absolute inset-0 bg-dots opacity-60 [mask-image:radial-gradient(65%_55%_at_50%_40%,black,transparent)]" />
      <div className="absolute inset-0 grid place-items-center pb-[12%]">
        <span className="font-accent text-[clamp(8rem,26vw,15rem)] leading-none text-white/[0.07] select-none">
          AA
        </span>
      </div>
      {process.env.NODE_ENV === "development" ? (
        <p className="absolute inset-x-6 top-[60%] text-center font-mono text-[0.6875rem] leading-relaxed text-fg-subtle">
          {hint}
          <br />
          <span className="text-fg-muted">public{src}</span>
        </p>
      ) : null}
    </div>
  );
}

/* ---- Stack readout ---------------------------------------------------------- */

function StackReadout({ stack }: { stack: Content["hero"]["stack"] }) {
  return (
    <div className="mt-16 border-t border-line sm:mt-20 lg:mt-10">
      <dl className="flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:gap-10">
        <dt
          className="animate-fade-in font-mono text-eyebrow whitespace-nowrap text-fg-subtle uppercase"
          style={delay(timing.stack - 150)}
        >
          {stack.label}
        </dt>
        <dd className="lg:flex-1">
          <ul className="grid grid-cols-3 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-7 lg:justify-between lg:gap-x-4">
            {stack.items.map((item, index) => (
              <li
                key={item.label}
                className={cn(
                  "hero-boot flex items-baseline gap-2 font-mono text-[0.75rem] tracking-[0.08em] text-fg-muted",
                  item.keepCase ? null : "uppercase",
                )}
                style={delay(timing.stack + index * 65)}
              >
                <span
                  aria-hidden="true"
                  className="hero-tick text-[0.625rem] text-fg-subtle tabular-nums"
                  style={delay(timing.stack + index * 65)}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </dd>
      </dl>
    </div>
  );
}

/* ---- Background ------------------------------------------------------------- */

function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 animate-fade-in bg-grid [mask-image:radial-gradient(ellipse_75%_65%_at_70%_20%,black_5%,transparent_70%)] opacity-70" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-canvas" />
    </div>
  );
}
