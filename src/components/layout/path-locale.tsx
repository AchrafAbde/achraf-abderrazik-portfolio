"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { defaultLocale, type Locale } from "@/content/i18n";
import { isLocale } from "@/lib/i18n";

/**
 * Shows the version that matches the language at the start of the URL, for
 * pages that have no [locale] parameter (the global 404): /fr/... gets the
 * French version, anything else the default language.
 */
export function PathLocale({ pages }: { pages: Record<Locale, ReactNode> }) {
  const first = usePathname().split("/")[1];
  return pages[isLocale(first) ? first : defaultLocale];
}
