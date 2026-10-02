"use client";

import { AnimatePresence, m } from "framer-motion";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";

import { cn } from "@/lib/cn";
import { fill } from "@/lib/i18n";
import { easeOutQuint } from "@/lib/motion";
import { themePreferences, type ThemePreference } from "@/lib/theme";

import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "../ui/icons";

export type ThemeLabels = Record<ThemePreference, string> & {
  /** Accessible name of the control ("Theme"). */
  label: string;
  /** The button's name with the current choice: "Theme: {theme}". */
  current: string;
};

const icons = { dark: MoonIcon, light: SunIcon, system: MonitorIcon } as const;

/* ---- State ------------------------------------------------------------------
   The saved choice lives on <html> as data-theme-preference, set by the theme
   script (lib/theme.ts) before the first paint; it fires "themechange". */

function subscribe(onChange: () => void) {
  document.addEventListener("themechange", onChange);
  return () => document.removeEventListener("themechange", onChange);
}

const readPreference = () =>
  document.documentElement.getAttribute("data-theme-preference") as ThemePreference | null;

/** The saved choice. Null while hydrating: the server can't know it. */
function useThemePreference() {
  return useSyncExternalStore(subscribe, readPreference, () => null);
}

/**
 * Applies a choice. Where the theme visibly changes, the page cross-fades once
 * (a view transition, see "Theme switch" in globals.css); with reduced motion,
 * or without view transitions, it switches at once.
 */
function chooseTheme(preference: ThemePreference) {
  const root = document.documentElement;
  const apply = () => window.__theme?.set(preference);
  const next =
    preference === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : preference;
  const animate =
    next !== root.getAttribute("data-theme") &&
    typeof document.startViewTransition === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!animate) {
    apply();
    return;
  }

  root.setAttribute("data-theme-switching", "");
  const done = () => root.removeAttribute("data-theme-switching");
  try {
    document.startViewTransition(apply).finished.then(done, done);
  } catch {
    done();
    apply();
  }
}

/* ---- Header control ---------------------------------------------------------- */

/**
 * Header control from 1024px: an icon button showing the current choice, and
 * a small menu of the three (Dark, Light, System). The icon is picked by CSS
 * from <html>, so it is right from the first paint. Keyboard: Enter, Space or
 * the arrow keys open the menu; arrows, Home and End move; Escape closes.
 */
export function ThemeSwitch({ labels, className }: { labels: ThemeLabels; className?: string }) {
  const preference = useThemePreference();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const menuId = useId();
  const checkedIndex = themePreferences.indexOf(preference ?? "system");
  const last = themePreferences.length - 1;

  // In development, React resets <html> attributes when it remounts: apply the
  // saved theme again before the paint. In production this changes nothing.
  useLayoutEffect(() => {
    window.__theme?.sync();
  }, []);

  // Focus follows the active item while the menu is open.
  useEffect(() => {
    if (open) itemRefs.current[active]?.focus();
  }, [open, active]);

  // A click or tap anywhere else closes the menu.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const openAt = (index: number) => {
    setActive(index);
    setOpen(true);
  };

  const close = (restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  };

  const select = (choice: ThemePreference) => {
    close(true);
    if (choice !== preference) chooseTheme(choice);
  };

  const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    openAt(event.key === "ArrowDown" ? checkedIndex : last);
  };

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // Tab leaves the menu as usual; it closes behind it.
    if (event.key === "Tab") {
      setOpen(false);
      return;
    }
    const moves: Partial<Record<string, () => void>> = {
      ArrowDown: () => setActive((index) => (index === last ? 0 : index + 1)),
      ArrowUp: () => setActive((index) => (index === 0 ? last : index - 1)),
      Home: () => setActive(0),
      End: () => setActive(last),
      Escape: () => close(true),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    move();
  };

  return (
    <div ref={rootRef} data-theme-switch="" className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={preference ? fill(labels.current, { theme: labels[preference] }) : labels.label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => (open ? close(false) : openAt(checkedIndex))}
        onKeyDown={onButtonKeyDown}
        className="inline-flex size-9 items-center justify-center rounded-full text-fg-muted transition-colors duration-300 hover:bg-tint/5 hover:text-fg aria-expanded:bg-tint/5 aria-expanded:text-fg"
      >
        {themePreferences.map((choice) => {
          const Icon = icons[choice];
          return <Icon key={choice} size={18} data-theme-icon={choice} />;
        })}
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            id={menuId}
            role="menu"
            aria-label={labels.label}
            onKeyDown={onMenuKeyDown}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2, ease: easeOutQuint }}
            className="absolute top-full right-0 z-10 mt-2 w-44 origin-top-right rounded-xl border border-line-strong bg-surface-2 p-1 shadow-popover"
          >
            {themePreferences.map((choice, index) => {
              const Icon = icons[choice];
              const checked = index === checkedIndex;
              return (
                <button
                  key={choice}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={checked}
                  tabIndex={index === active ? 0 : -1}
                  onClick={() => select(choice)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200",
                    "hover:bg-tint/5 hover:text-fg focus-visible:bg-tint/5 focus-visible:outline-offset-[-2px]",
                    checked ? "text-fg" : "text-fg-muted",
                  )}
                >
                  <Icon size={16} />
                  {labels[choice]}
                  {checked ? <CheckIcon size={15} className="ml-auto text-accent" /> : null}
                </button>
              );
            })}
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* ---- Mobile menu control ------------------------------------------------------ */

/**
 * In the mobile menu: the three choices side by side, as a radio group. The
 * arrow keys move between them and select, Tab leaves the group.
 */
export function ThemePicker({ labels, className }: { labels: ThemeLabels; className?: string }) {
  const preference = useThemePreference() ?? "system";
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const last = themePreferences.length - 1;

  const pick = (index: number) => {
    const choice = themePreferences[index];
    if (choice !== preference) chooseTheme(choice);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const focused = refs.current.findIndex((node) => node === event.target);
    const from = focused === -1 ? themePreferences.indexOf(preference) : focused;
    const targets: Partial<Record<string, number>> = {
      ArrowRight: from === last ? 0 : from + 1,
      ArrowDown: from === last ? 0 : from + 1,
      ArrowLeft: from === 0 ? last : from - 1,
      ArrowUp: from === 0 ? last : from - 1,
      Home: 0,
      End: last,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    refs.current[target]?.focus();
    pick(target);
  };

  return (
    <div
      role="radiogroup"
      aria-label={labels.label}
      onKeyDown={onKeyDown}
      className={cn("inline-flex rounded-full border border-line-strong p-1", className)}
    >
      {themePreferences.map((choice, index) => {
        const Icon = icons[choice];
        const checked = choice === preference;
        return (
          <button
            key={choice}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => pick(index)}
            className={cn(
              // flex-1: equal thirds when the group is stretched, content width otherwise.
              "inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-full px-3.5 text-sm whitespace-nowrap transition-colors duration-300",
              checked ? "bg-tint/[0.08] text-fg" : "text-fg-muted hover:text-fg",
            )}
          >
            <Icon size={16} />
            {labels[choice]}
          </button>
        );
      })}
    </div>
  );
}
