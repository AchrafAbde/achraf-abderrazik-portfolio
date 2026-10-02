import { useId } from "react";

import { cn } from "@/lib/cn";
import { logo, logoKnockout, logoSmall } from "@/lib/logo";

type LogoIconProps = {
  /** "color": the A in the text color, the flow and the dot in the accent. "mono": all in the text color. */
  variant?: "color" | "mono";
  /** The heavier geometry, for sizes under 20px. */
  small?: boolean;
  /** Draws the flow in once on load, and steps the dot forward on hover (see "Logo" in globals.css). */
  animated?: boolean;
  className?: string;
};

/**
 * The symbol alone: an A (Achraf), a lime flow woven through it that forms a
 * second, softer A on the same feet (Abderrazik), and the next data point.
 * The A takes the current text color and the lime the accent token: the brand
 * lime on dark, the same lime deepened on light. Both follow the theme.
 */
export function LogoIcon({ variant = "color", small = false, animated = false, className }: LogoIconProps) {
  const g = small ? logoSmall : logo;
  const mono = variant === "mono";
  const accent = mono ? "currentColor" : undefined;
  // In one color, a hairline gap keeps the flow visibly passing under the A.
  const maskId = `logo-knockout-${useId().replace(/[^\w-]/g, "")}`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn(animated && "logo-animated", className)}
    >
      {mono ? (
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-8" y="-8" width="80" height="80">
          <rect x="-8" y="-8" width="80" height="80" fill="#fff" />
          <path d={g.knockout} stroke="#000" strokeWidth={g.stroke + logoKnockout * 2} strokeLinejoin="round" />
          <circle cx={g.foot[0]} cy={g.foot[1]} r={g.stroke / 2 + logoKnockout} fill="#000" />
        </mask>
      ) : null}
      <path
        className={cn("logo-flow", !mono && "stroke-accent")}
        d={g.flow}
        pathLength={1}
        stroke={accent}
        strokeWidth={g.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        mask={mono ? `url(#${maskId})` : undefined}
      />
      <path d={g.a} stroke="currentColor" strokeWidth={g.stroke} strokeLinejoin="round" />
      <circle cx={g.foot[0]} cy={g.foot[1]} r={g.stroke / 2} fill="currentColor" />
      <circle
        className={cn("logo-dot", !mono && "fill-accent")}
        cx={g.dot[0]}
        cy={g.dot[1]}
        r={g.dotRadius}
        fill={accent}
      />
    </svg>
  );
}

/** The symbol in its tile, as in the header, the mobile menu and the footer. */
export function LogoMark({ animated = false, className }: { animated?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-[0.6rem] border border-line-strong bg-surface-2 text-fg",
        className,
      )}
    >
      <LogoIcon animated={animated} className="size-[1.375rem]" />
    </span>
  );
}

type LogoLockupProps = {
  name: string;
  /** Optional role line under the name ("AI & Data Science Engineer"). */
  subtitle?: string;
  animated?: boolean;
  className?: string;
  markClassName?: string;
  nameClassName?: string;
};

/** The mark beside the name: "[A·] Achraf Abderrazik", optionally with the role under it. */
export function LogoLockup({ name, subtitle, animated, className, markClassName, nameClassName }: LogoLockupProps) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark animated={animated} className={markClassName} />
      <span className="flex flex-col">
        <span className={cn("font-medium tracking-[-0.01em]", nameClassName)}>{name}</span>
        {subtitle ? (
          <span className="mt-1 font-mono text-[0.625rem] leading-none tracking-[0.14em] text-fg-muted uppercase">
            {subtitle}
          </span>
        ) : null}
      </span>
    </span>
  );
}
