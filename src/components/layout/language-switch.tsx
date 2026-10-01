"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { languages, locales, type Locale } from "@/content/i18n";
import { cn } from "@/lib/cn";
import { switchLocale } from "@/lib/i18n";

type LanguageSwitchProps = {
  locale: Locale;
  /** Accessible name of the group ("Language"). */
  label: string;
  /** Section to land on in the other language (homepage), e.g. "#services". */
  hash?: string;
  className?: string;
};

/**
 * "EN · FR": links to the same page in each language, the current one marked.
 * Plain links on purpose: switching language loads the other language's page.
 */
export function LanguageSwitch({ locale, label, hash = "", className }: LanguageSwitchProps) {
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex items-center font-mono text-[0.6875rem] tracking-[0.1em] uppercase", className)}
    >
      {locales.map((target, index) => {
        const active = target === locale;
        const { code, name } = languages[target];
        return (
          <Fragment key={target}>
            {index > 0 ? (
              <span aria-hidden="true" className="text-fg-subtle">
                ·
              </span>
            ) : null}
            <a
              href={`${switchLocale(pathname, target)}${active ? "" : hash}`}
              hrefLang={target}
              lang={target}
              aria-label={`${name} (${code})`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex h-9 min-w-8 items-center justify-center rounded-full px-1.5 transition-colors duration-300 sm:min-w-9",
                active ? "text-fg" : "text-fg-subtle hover:text-fg",
              )}
            >
              {code}
            </a>
          </Fragment>
        );
      })}
    </div>
  );
}
