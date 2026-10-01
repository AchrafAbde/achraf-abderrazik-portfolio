/**
 * Motion tokens shared by every animated component.
 * Keep animations short, eased and purposeful — they should support the
 * content, never compete with it.
 */

/** Matches --ease-out-quint in globals.css */
export const easeOutQuint = [0.22, 1, 0.36, 1] as const;

/** Matches --ease-out-expo in globals.css */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const duration = {
  fast: 0.2,
  base: 0.45,
  slow: 0.8,
} as const;

/** Default distance (px) content travels when revealed. */
export const revealOffset = 18;

/** Delay between items in a staggered group (seconds). */
export const staggerInterval = 0.07;
