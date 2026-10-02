import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

type CompactPipelineProps = {
  steps: string[];
  /** Accessible name of the list ("Pipeline"). */
  label: string;
  className?: string;
};

/**
 * One-line version of a project's architecture for the homepage cards.
 * On hover, the steps light up in sequence, like a request passing through.
 *
 * Each connector sits in the gap before its step. One that would start a
 * new line falls outside the clipped box (as does the first), so no line
 * begins or ends with a connector when the pipeline wraps.
 */
export function CompactPipeline({ steps, label, className }: CompactPipelineProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <ol
        aria-label={label}
        className="-ml-[1.625rem] flex flex-wrap items-center gap-y-2 font-mono text-[0.6875rem] sm:-ml-8"
      >
        {steps.map((step, index) => (
          <li key={step} className="relative flex items-center pl-[1.625rem] sm:pl-8">
            <span
              aria-hidden="true"
              className="pipeline-link absolute top-1/2 left-1.5 h-px w-3.5 sm:w-5"
              style={{ "--i": index } as CSSProperties}
            />
            <span
              className="pipeline-step inline-flex h-7 items-center rounded-md border bg-tint/[0.02] px-2.5 whitespace-nowrap"
              style={{ "--i": index } as CSSProperties}
            >
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
