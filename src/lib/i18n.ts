import { languages, locales, type Locale, type Localized } from "@/content/i18n";

/*
 * Language helpers. Safe to use in client components: they only depend on
 * the small language config in src/content/i18n.ts.
 */

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** A content value with every `{ en, fr }` replaced by the text for one language. */
export type Resolved<T> =
  T extends Localized<infer U>
    ? Resolved<U>
    : T extends readonly (infer Item)[]
      ? Resolved<Item>[]
      : T extends object
        ? { [Key in keyof T]: Resolved<T[Key]> }
        : T;

function isLocalized(value: object): value is Localized<unknown> {
  const keys = Object.keys(value);
  return keys.length === locales.length && locales.every((locale) => locale in value);
}

/**
 * French spacing, so content files can use ordinary spaces: a narrow no-break
 * space before ? ! ; and %, a no-break space before : and inside « », and
 * between a number and its unit or its next group of digits.
 */
export function frenchTypography(text: string): string {
  return text
    .replace(/ ([?!;%])/g, " $1")
    .replace(/ :/g, " :")
    .replace(/« /g, "« ")
    .replace(/ »/g, " »")
    .replace(/(\d) (\d{3})(?!\d)/g, "$1 $2")
    .replace(/(\d) (h|min|k|ms)\b/g, "$1 $2");
}

/** Picks one language out of a content value, deeply. */
export function resolve<T>(value: T, locale: Locale): Resolved<T> {
  if (typeof value === "string") {
    return (locale === "fr" ? frenchTypography(value) : value) as Resolved<T>;
  }
  if (Array.isArray(value)) {
    return value.map((item) => resolve(item, locale)) as Resolved<T>;
  }
  if (value !== null && typeof value === "object") {
    if (isLocalized(value)) return resolve(value[locale], locale) as Resolved<T>;
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolve(item, locale)]),
    ) as Resolved<T>;
  }
  return value as Resolved<T>;
}

/** Fills `{name}`-style placeholders: fill("Thank you, {name}.", { name: "Alex" }). */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/**
 * Adds the language to an internal link: "/#work" → "/en#work",
 * "/work/aman" → "/en/work/aman", "/" → "/en". Other links are unchanged.
 */
export function localizeHref(locale: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (href === "/") return `/${locale}`;
  if (href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

/** The same page in another language: "/en/work/aman" → "/fr/work/aman". */
export function switchLocale(pathname: string, target: Locale): string {
  const [, first, ...rest] = pathname.split("/");
  if (!isLocale(first)) return `/${target}`;
  return rest.length > 0 && rest.join("") !== "" ? `/${target}/${rest.join("/")}` : `/${target}`;
}

/** Locale for Intl APIs (number formatting). */
export function intlLocale(locale: Locale): string {
  return languages[locale].intl;
}
