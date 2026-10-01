import { existsSync } from "node:fs";
import { join } from "node:path";

import { site } from "@/content/site";

/**
 * Whether the portrait photo exists in /public.
 * The homepage is prerendered, so this runs at build time: add the file,
 * rebuild (or push to GitHub, and Netlify rebuilds) and the hero switches
 * from the monogram plate to the photo.
 */
export function hasPortrait(): boolean {
  return existsSync(join(process.cwd(), "public", site.portrait.src.replace(/^\//, "")));
}
