import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EyebrowProps = {
  index?: string;
  children: ReactNode;
  className?: string;
};

/** Small monospaced label that introduces a section: "01 —— Services". */
export function Eyebrow({ index, children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-eyebrow text-fg-subtle uppercase",
        className,
      )}
    >
      {index ? <span className="text-fg-muted tabular-nums">{index}</span> : null}
      {index ? <span aria-hidden="true" className="h-px w-8 bg-line-strong" /> : null}
      <span>{children}</span>
    </p>
  );
}
