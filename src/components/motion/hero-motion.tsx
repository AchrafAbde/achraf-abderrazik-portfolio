"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

/**
 * Pointer and scroll parallax for the hero portrait, in three depth planes:
 * the photo (`data-parallax="image"`, back) drifts against the pointer, the
 * frame (`"frame"`, middle) follows it by a few pixels, and the technical
 * overlay (`"hud"`, front) a little more. While the page scrolls, the photo
 * also drifts and zooms gently inside its frame.
 *
 * One rAF loop eases towards the target, sleeps when nothing changes and
 * stops off-screen. Only transforms change, so it never triggers layout.
 * Off for visitors who prefer reduced motion, including when they switch the
 * setting on with the page open.
 */
export function HeroMotion(props: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Pointer parallax only with a mouse or trackpad, on large screens.
    const finePointer = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    let stop: (() => void) | undefined;

    const sync = () => {
      stop?.();
      stop = reducedMotion.matches ? undefined : startParallax(root, finePointer.matches);
    };

    sync();
    reducedMotion.addEventListener("change", sync);
    finePointer.addEventListener("change", sync);
    return () => {
      reducedMotion.removeEventListener("change", sync);
      finePointer.removeEventListener("change", sync);
      stop?.();
    };
  }, []);

  return <div ref={ref} {...props} />;
}

/** How far each plane moves, in px, with the pointer at the viewport edge (x, y). */
const depth = {
  image: [-10, -8],
  frame: [5, 4],
  hud: [4, 3],
} as const;

type Plane = keyof typeof depth;

function startParallax(root: HTMLElement, pointer: boolean) {
  const find = (plane: Plane) => root.querySelector<HTMLElement>(`[data-parallax="${plane}"]`);
  const image = find("image");
  if (!image) return undefined;

  // The photo moves on scroll everywhere; frame and overlay only follow a pointer.
  const names: Plane[] = pointer ? ["image", "frame", "hud"] : ["image"];
  const planes = names.flatMap((plane) => {
    const element = plane === "image" ? image : find(plane);
    return element ? [{ plane, element }] : [];
  });

  for (const { element } of planes) element.style.willChange = "transform";

  let height = root.offsetHeight || 1;
  let scroll = window.scrollY;
  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;
  let frame = 0;
  let visible = true;

  const render = () => {
    frame = 0;
    x += (targetX - x) * 0.08;
    y += (targetY - y) * 0.08;

    const progress = Math.min(Math.max(scroll / height, 0), 1);
    const drift = Math.min(scroll, height) * 0.06;

    for (const { plane, element } of planes) {
      const [dx, dy] = depth[plane];
      const offsetY = plane === "image" ? drift : 0;
      element.style.translate = `${(x * dx).toFixed(2)}px ${(y * dy + offsetY).toFixed(2)}px`;
    }
    image.style.scale = (1 + progress * 0.05).toFixed(4);

    const settling = Math.abs(targetX - x) > 0.001 || Math.abs(targetY - y) > 0.001;
    if (settling && visible) frame = requestAnimationFrame(render);
  };

  const schedule = () => {
    if (!frame && visible) frame = requestAnimationFrame(render);
  };

  const onPointerMove = (event: PointerEvent) => {
    targetX = (event.clientX / window.innerWidth) * 2 - 1;
    targetY = (event.clientY / window.innerHeight) * 2 - 1;
    schedule();
  };

  const onPointerLeave = () => {
    targetX = 0;
    targetY = 0;
    schedule();
  };

  const onScroll = () => {
    scroll = window.scrollY;
    schedule();
  };

  const resizeObserver = new ResizeObserver(() => {
    height = root.offsetHeight || 1;
    schedule();
  });

  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
    if (visible) schedule();
  });

  resizeObserver.observe(root);
  intersectionObserver.observe(root);
  window.addEventListener("scroll", onScroll, { passive: true });
  if (pointer) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
  }
  schedule();

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("pointermove", onPointerMove);
    document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    for (const { element } of planes) {
      element.style.translate = "";
      element.style.scale = "";
      element.style.willChange = "";
    }
  };
}
