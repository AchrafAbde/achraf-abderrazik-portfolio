import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/layout/site-shell";
import { languages, locales } from "@/content/i18n";
import { cn } from "@/lib/cn";
import { getContent } from "@/lib/content";
import { fontMono, fontSans, fontSerif } from "@/lib/fonts";
import { isLocale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";

import "../globals.css";

/*
 * Root layout, one per language: /en and /fr. `/` redirects to /en
 * (next.config.ts). Every page is generated at build time; any other URL,
 * such as /de or /fr/work/unknown, is a 404 (global-not-found.tsx).
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { site } = getContent(locale);

  return {
    metadataBase: siteUrl,
    title: {
      default: site.seo.title,
      template: `%s — ${site.name}`,
    },
    description: site.seo.description,
    applicationName: site.name,
    keywords: site.seo.keywords,
    authors: [{ name: site.name, url: siteUrl }],
    creator: site.name,
    publisher: site.name,
    category: "technology",
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: languages[locale].ogLocale,
      title: site.seo.title,
      description: site.seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: site.seo.title,
      description: site.seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={cn(fontSans.variable, fontMono.variable, fontSerif.variable)}>
      <body>
        <noscript>
          {/* Without JavaScript, show content that would otherwise animate in. */}
          <style>{`[data-reveal],[data-inview="false"] .diagram-stage,[data-inview="false"] .diagram-link,[data-inview="false"] .meter-fill{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SiteShell content={getContent(locale)}>{children}</SiteShell>
      </body>
    </html>
  );
}
