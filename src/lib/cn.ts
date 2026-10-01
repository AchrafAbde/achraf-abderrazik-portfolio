import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge needs to know about the custom type scale, otherwise
 * `text-h2` and `text-fg` would be treated as conflicting color classes.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "hero", "h2", "h3", "h4", "lead", "eyebrow"],
      color: [
        "canvas",
        "surface",
        "surface-2",
        "surface-3",
        "line",
        "line-strong",
        "fg",
        "fg-muted",
        "fg-subtle",
        "accent",
        "accent-ink",
        "danger",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
