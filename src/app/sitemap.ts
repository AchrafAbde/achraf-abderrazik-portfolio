import type { MetadataRoute } from "next";

import { defaultLocale, locales } from "@/content/i18n";
import { getContent } from "@/lib/content";
import { localizeHref } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site-url";

/** Every page in every language, each listing its translations (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = ["/", ...getContent(defaultLocale).caseStudies.map((study) => `/work/${study.slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizeHref(locale, path)),
      lastModified,
      changeFrequency: path === "/" ? ("monthly" as const) : ("yearly" as const),
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((other) => [other, absoluteUrl(localizeHref(other, path))])),
          "x-default": absoluteUrl(localizeHref(defaultLocale, path)),
        },
      },
    })),
  );
}
