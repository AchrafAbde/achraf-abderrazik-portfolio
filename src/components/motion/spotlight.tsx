"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

/**
 * Soft light that follows the cursor inside its nearest `.group` parent.
 * Purely decorative; only active with a mouse or trackpad.
 */
export function Spotlight({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    const area = element?.closest<HTMLElement>(".group");
    if (!element || !area) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const update = () => {
      frame = 0;
      element.style.setProperty("--spot-x", `${x}px`);
      element.style.setProperty("--spot-y", `${y}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = area.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(update);
    };

    area.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      area.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn("spotlight pointer-events-none absolute inset-0", className)}
    />
  );
}
