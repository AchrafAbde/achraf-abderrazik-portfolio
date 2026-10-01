import { cn } from "@/lib/cn";

/**
 * Brand mark: two connected nodes — a trigger and its result.
 * A small nod to automation, legible down to favicon size.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-[0.6rem] border border-line-strong bg-surface-2",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none">
        <circle cx="6.25" cy="12" r="3.1" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9.6 12h4.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="17.75" cy="12" r="3.3" className="fill-accent" />
      </svg>
    </span>
  );
}
