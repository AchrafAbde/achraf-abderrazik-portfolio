import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

/** Horizontal page frame: max width 1280px with fluid side padding. */
export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-[80rem] px-5 sm:px-8 lg:px-12", className)} {...props} />
  );
}
