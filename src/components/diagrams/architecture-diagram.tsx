import type { CSSProperties } from "react";

import type { Architecture } from "@/content/types";
import { cn } from "@/lib/cn";
import type { Resolved } from "@/lib/i18n";

import { InView } from "../motion/in-view";

type DiagramData = Resolved<Architecture>;
type DiagramNode = DiagramData["stages"][number]["nodes"][number];

type ArchitectureDiagramProps = {
  architecture: DiagramData;
  /** Accessible name for the figure, e.g. "AMAN: architecture". */
  label: string;
  className?: string;
};

const index = (value: number) => String(value + 1).padStart(2, "0");

/**
 * Data-driven architecture diagram.
 *
 * Horizontal from 1280px, vertical below. Stages reveal in sequence
 * when the diagram scrolls into view, then a signal travels along the links,
 * lighting each stage as it arrives. Nodes inside a stage run in parallel.
 * All motion is CSS (see "Architecture diagram" in globals.css), paused
 * off-screen and removed for reduced motion.
 */
export function ArchitectureDiagram({ architecture, label, className }: ArchitectureDiagramProps) {
  const { stages, caption } = architecture;

  return (
    <figure aria-label={label} className={cn("diagram", className)}>
      <InView amount={0.2} className="diagram-frame">
        <ol className="diagram-stages" style={{ "--stages": stages.length } as CSSProperties}>
          {stages.map((stage, stageIndex) => (
            <li
              key={stageIndex}
              className="diagram-stage"
              style={{ "--i": stageIndex } as CSSProperties}
            >
              {stageIndex > 0 ? (
                <span aria-hidden="true" className="diagram-link">
                  <span className="diagram-signal" />
                </span>
              ) : null}

              <div
                className={cn(
                  "diagram-nodes",
                  stage.nodes.length > 1 ? "diagram-nodes-parallel" : null,
                )}
              >
                {stage.nodes.map((node) => (
                  <Node key={node.title} node={node} step={index(stageIndex)} />
                ))}
              </div>
            </li>
          ))}
        </ol>
      </InView>
      <figcaption className="mt-5 flex items-start gap-3 text-sm text-fg-subtle">
        <span aria-hidden="true" className="mt-[0.55em] h-px w-6 shrink-0 bg-line-strong" />
        {caption}
      </figcaption>
    </figure>
  );
}

function Node({ node, step }: { node: DiagramNode; step: string }) {
  return (
    <div className={cn("diagram-node", node.emphasis ? "diagram-node-emphasis" : null)}>
      <p className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.1em] text-fg-subtle uppercase">
        <span className="tabular-nums text-fg-muted">{step}</span>
        <span aria-hidden="true" className="h-px w-3 bg-line-strong" />
        <span>{node.kicker}</span>
      </p>
      <p className="mt-2.5 text-[0.9375rem] leading-snug font-medium tracking-[-0.01em] text-fg">
        {node.title}
      </p>
      {node.detail ? (
        <p className="mt-1.5 text-[0.8125rem] leading-snug text-fg-muted">{node.detail}</p>
      ) : null}
      {node.metric ? (
        <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.04em] text-accent">
          <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
          {node.metric}
        </p>
      ) : null}
    </div>
  );
}
