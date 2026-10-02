import type { ReactNode } from "react";

import type { ProjectKind } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Filled accent = built for a real organisation (internships).
 * Hollow / neutral = academic, personal and other projects.
 */
const kindDot: Record<ProjectKind, string> = {
  "real-world": "bg-accent",
  internship: "border border-accent bg-transparent",
  academic: "border border-fg-muted bg-transparent",
  personal: "bg-fg-muted",
  project: "bg-fg-subtle",
};

export function isProfessionalKind(kind: ProjectKind) {
  return kind === "real-world" || kind === "internship";
}

type ProjectBadgeProps = {
  kind: ProjectKind;
  children: ReactNode;
  className?: string;
};

/** Labels how a project came to be: real-world, internship, academic or personal work. */
export function ProjectBadge({ kind, children, className }: ProjectBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-2 rounded-full border px-3 font-mono text-[0.6875rem] tracking-[0.06em] whitespace-nowrap uppercase",
        isProfessionalKind(kind)
          ? "border-accent/30 bg-accent/[0.07] text-fg"
          : "border-line-strong bg-tint/[0.02] text-fg-muted",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", kindDot[kind])} />
      {children}
    </span>
  );
}

type TagProps = {
  children: ReactNode;
  className?: string;
};

/** Neutral chip for technologies and keywords. */
export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-md border border-line bg-tint/[0.025] px-2.5 font-mono text-xs text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

type StatusPillProps = {
  children: ReactNode;
  className?: string;
};

/** Availability indicator with a softly pulsing signal dot. */
export function StatusPill({ children, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-tint/[0.03] py-1.5 pr-3.5 pl-3 text-sm text-fg-muted",
        className,
      )}
    >
      <span aria-hidden="true" className="relative flex size-2">
        <span className="absolute inset-0 animate-ping-soft rounded-full bg-accent" />
        <span className="relative size-2 rounded-full bg-accent" />
      </span>
      {children}
    </span>
  );
}
