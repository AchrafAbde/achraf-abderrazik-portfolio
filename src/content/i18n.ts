/**
 * Languages of the site.
 *
 * English is the default: `/` redirects to `/en` (see next.config.ts). Every
 * visible text in src/content is written once per language, side by side:
 *
 *   title: { en: "Selected work", fr: "Sélection de projets" }
 *
 * French spacing (no-break spaces before ? ! ; : and %) is added automatically,
 * so type ordinary spaces. To add a language, add it here: TypeScript then
 * lists every text that still needs a translation.
 */
export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const languages: Record<
  Locale,
  {
    /** Shown in the language switch. */
    code: string;
    /** The language's own name, read by screen readers. */
    name: string;
    /** Number formatting (e.g. 0.895 → 0,895 in French). */
    intl: string;
    /** Open Graph locale. */
    ogLocale: string;
  }
> = {
  en: { code: "EN", name: "English", intl: "en-US", ogLocale: "en_US" },
  fr: { code: "FR", name: "Français", intl: "fr-FR", ogLocale: "fr_FR" },
};

/** A value written in every language. */
export type Localized<T = string> = { readonly [L in Locale]: T };

/** Text that must be translated. */
export type Copy = Localized<string>;

/**
 * A name or term: a plain string when it reads the same in every language
 * ("PostgreSQL", "AMAN"), otherwise translated.
 */
export type Term = string | Copy;
