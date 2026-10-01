import type { MetadataRoute } from "next";

import { defaultLocale } from "@/content/i18n";
import { getContent } from "@/lib/content";
import { localizeHref } from "@/lib/i18n";

/** One manifest for the whole site, in the default language. */
export default function manifest(): MetadataRoute.Manifest {
  const { site } = getContent(defaultLocale);
  return {
    name: `${site.name} — ${site.positioning.join(" · ")}`,
    short_name: site.name,
    description: site.seo.description,
    lang: defaultLocale,
    start_url: localizeHref(defaultLocale, "/"),
    display: "browser",
    background_color: "#08080a",
    theme_color: "#08080a",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
