import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out-quint " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-canvas shadow-[inset_0_-1px_0_rgb(0_0_0/0.18),0_1px_2px_rgb(0_0_0/0.4)] hover:bg-white",
  secondary: "border border-line-strong bg-white/[0.02] text-fg hover:border-white/30 hover:bg-white/[0.05]",
  ghost: "text-fg-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  /** Icon rendered after the label. It nudges on hover. */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

function Content({ icon, children }: Pick<SharedProps, "icon" | "children">) {
  return (
    <>
      <span>{children}</span>
      {icon ? (
        <span className="-mr-1 inline-flex transition-transform duration-300 ease-out-quint group-hover/button:translate-x-0.5">
          {icon}
        </span>
      ) : null}
    </>
  );
}

export type ButtonLinkProps = SharedProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children"> & { href: string };

/**
 * A link styled as a button. Internal routes use next/link; anchors, mailto
 * and external URLs render a plain <a>.
 */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isInternalRoute = href.startsWith("/") && !href.startsWith("//");

  if (isInternalRoute) {
    return (
      <Link href={href} className={classes} {...rest}>
        <Content icon={icon}>{children}</Content>
      </Link>
    );
  }

  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      className={classes}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <Content icon={icon}>{children}</Content>
    </a>
  );
}

export type ButtonProps = SharedProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Content icon={icon}>{children}</Content>
    </button>
  );
}
