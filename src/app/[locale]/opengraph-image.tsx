import { defaultLocale, locales } from "@/content/i18n";
import { getContent } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { ogAlt, ogSize, renderHomeOgImage } from "@/lib/og";

/** Homepage share image, one per language. */

export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateImageMetadata({ params }: { params: { locale: string } }) {
  const content = getContent(isLocale(params.locale) ? params.locale : defaultLocale);
  return [{ id: "card", alt: ogAlt(content), size: ogSize, contentType }];
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response("Not found", { status: 404 });
  return renderHomeOgImage(getContent(locale));
}
