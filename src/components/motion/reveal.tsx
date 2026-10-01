"use client";

import { m, stagger, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { duration, easeOutQuint, revealOffset, staggerInterval } from "@/lib/motion";

const tags = {
  div: m.div,
  section: m.section,
  article: m.article,
  header: m.header,
  ul: m.ul,
  ol: m.ol,
  li: m.li,
  p: m.p,
  span: m.span,
  figure: m.figure,
  dl: m.dl,
};

type Tag = keyof typeof tags;

type BaseProps = Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView" | "viewport"> & {
  as?: Tag;
  children?: ReactNode;
};

const viewport = { once: true, amount: 0.15, margin: "0px 0px -8% 0px" } as const;

type RevealProps = BaseProps & {
  /** Seconds before the element starts animating once in view. */
  delay?: number;
  /** Distance in px the element travels upwards. */
  y?: number;
};

/**
 * Fades and lifts its content into place the first time it scrolls into view.
 * Server-rendered children stay server components.
 */
export function Reveal({ as = "div", delay = 0, y = revealOffset, transition, ...rest }: RevealProps) {
  const Component = tags[as] as typeof m.div;

  return (
    <Component
      data-reveal=""
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: duration.slow, ease: easeOutQuint, delay, ...transition }}
      {...rest}
    />
  );
}

const groupVariants = (delay: number): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren: stagger(staggerInterval, { startDelay: delay }) } },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: revealOffset },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: easeOutQuint } },
};

type RevealGroupProps = BaseProps & { delay?: number };

/** Staggers the reveal of its direct <RevealItem> children. */
export function RevealGroup({ as = "div", delay = 0, ...rest }: RevealGroupProps) {
  const Component = tags[as] as typeof m.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={groupVariants(delay)}
      {...rest}
    />
  );
}

export function RevealItem({ as = "div", ...rest }: BaseProps) {
  const Component = tags[as] as typeof m.div;

  return <Component data-reveal="" variants={itemVariants} {...rest} />;
}
