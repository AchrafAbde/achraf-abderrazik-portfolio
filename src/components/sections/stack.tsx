import type { Content } from "@/lib/content";

import { RevealGroup, RevealItem } from "../motion/reveal";
import { Section, SectionHeading } from "../ui/section";

export function Stack({ stack }: { stack: Content["stack"] }) {
  return (
    <Section id="stack">
      <SectionHeading
        id="stack"
        index={stack.heading.index}
        eyebrow={stack.heading.eyebrow}
        title={stack.heading.title}
        intro={stack.heading.intro}
      />

      <RevealGroup
        as="ul"
        className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-20 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3"
      >
        {stack.groups.map((group, index) => (
          <RevealItem as="li" key={group.id} className="bg-canvas p-6 sm:p-8">
            <h3 className="flex items-center gap-3 font-mono text-eyebrow text-fg-subtle uppercase">
              {/* Spaces keep "01 AI / ML" apart in the heading's text; flex doesn't render them. */}
              <span className="text-fg-muted tabular-nums">{String(index + 1).padStart(2, "0")}</span>{" "}
              <span aria-hidden="true" className="h-px w-5 bg-line-strong" /> {group.label}
            </h3>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5">
              {group.items.map((item) => (
                <li key={item} className="text-lg font-medium tracking-[-0.015em] text-fg sm:text-xl">
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>

      <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2 sm:gap-10">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-4">
          <dt className="shrink-0 font-mono text-eyebrow text-fg-subtle uppercase sm:pt-0.5">
            {stack.footnote.languagesLabel}
          </dt>
          <dd className="text-fg-muted">{stack.footnote.languages.join(", ")}</dd>
        </div>
        <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-4">
          <dt className="shrink-0 font-mono text-eyebrow text-fg-subtle uppercase sm:pt-0.5">
            {stack.footnote.methodsLabel}
          </dt>
          <dd className="text-fg-muted">{stack.footnote.methods.join(", ")}</dd>
        </div>
      </dl>
    </Section>
  );
}
