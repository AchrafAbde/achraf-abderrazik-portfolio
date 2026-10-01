import { defaultLocale, locales } from "@/content/i18n";
import { getCaseStudy, getContent } from "@/lib/content";
import { fill, isLocale } from "@/lib/i18n";
import { ogSize, renderCaseStudyOgImage } from "@/lib/og";

/** A case study's share image, one per language. */

export const contentType = "image/png";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getContent(locale).caseStudies.map((study) => ({ locale, slug: study.slug })),
  );
}

export function generateImageMetadata({ params }: { params: Params }) {
  const content = getContent(isLocale(params.locale) ? params.locale : defaultLocale);
  return [
    {
      id: "card",
      alt: fill(content.ui.og.caseStudyAlt, { name: content.site.name }),
      size: ogSize,
      contentType,
    },
  ];
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const study = isLocale(locale) ? getCaseStudy(locale, slug) : undefined;
  if (!isLocale(locale) || !study) return new Response("Not found", { status: 404 });
  return renderCaseStudyOgImage(getContent(locale), study);
}
