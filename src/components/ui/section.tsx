import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Reveal } from "../motion/reveal";
import { Container } from "./container";
import { Eyebrow } from "./eyebrow";
import { Inline } from "./inline";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** Draws a hairline between this section and the previous one. */
  divider?: boolean;
};

/** Page section with consistent vertical rhythm and an accessible label. */
export function Section({ id, children, className, divider = true }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("relative py-24 sm:py-28 lg:py-32", className)}
    >
      {divider ? (
        <Container aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0">
          <div className="h-px w-full bg-line" />
        </Container>
      ) : null}
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  /** Must match the parent Section id so aria-labelledby resolves. */
  id: string;
  index: string;
  eyebrow: string;
  /** Supports *serif accent* markup. */
  title: string;
  intro?: ReactNode;
  className?: string;
};

/**
 * Standard section header: numbered eyebrow and large title on the left,
 * optional introduction aligned to the right on wide screens.
 */
export function SectionHeading({ id, index, eyebrow, title, intro, className }: SectionHeadingProps) {
  return (
    <header className={cn("grid gap-y-8 lg:grid-cols-12 lg:gap-x-10", className)}>
      <Reveal className="lg:col-span-7">
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <h2 id={`${id}-title`} className="mt-6 text-h2 font-medium text-fg">
          <Inline text={title} />
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.1} className="lg:col-span-5 lg:self-end">
          <p className="max-w-xl text-lead text-fg-muted">{intro}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
