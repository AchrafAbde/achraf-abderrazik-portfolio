/*
 * Dark / light theme. The visitor chooses "dark", "light" or "system" (follow
 * the operating system); the choice is kept in localStorage. The resolved
 * theme is set as data-theme on <html>, which switches the color variables
 * in globals.css ("Themes"). There are no theme URLs: every page exists once.
 */

export const themePreferences = ["dark", "light", "system"] as const;

export type ThemePreference = (typeof themePreferences)[number];

/** The browser's UI color (theme-color) in each theme: the page canvas. */
export const themeColors = { dark: "#08080a", light: "#f5f4f0" } as const;

const storageKey = "theme";

declare global {
  interface Window {
    /** Set up by `themeScript`, used by the theme switch. */
    __theme?: {
      /** Saves and applies a choice. */
      set: (preference: ThemePreference) => void;
      /** Applies the saved choice again (React resets <html> attributes in development). */
      sync: () => void;
    };
  }
}

/**
 * Runs in <head> while the page is parsed, before the first paint, so the
 * saved theme never flashes. It applies the saved choice (none yet: follow
 * the system), follows system changes while "system" is chosen, keeps other
 * tabs in step, and announces every change with a "themechange" event.
 */
export const themeScript = `(function () {
  var key = ${JSON.stringify(storageKey)};
  var colors = ${JSON.stringify(themeColors)};
  var root = document.documentElement;
  var dark = window.matchMedia("(prefers-color-scheme: dark)");

  function saved() {
    try {
      var value = localStorage.getItem(key);
      if (value === "dark" || value === "light" || value === "system") return value;
    } catch (error) {}
    return "system";
  }

  // The browser's UI color: its own tag, before the per-system ones in the
  // page (the first match wins). Those stay as rendered, so React still
  // recognises them when it hydrates.
  var browserColor = document.createElement("meta");
  browserColor.name = "theme-color";
  document.head.insertBefore(browserColor, document.head.querySelector('meta[name="theme-color"]'));

  function apply(preference) {
    var theme = preference === "system" ? (dark.matches ? "dark" : "light") : preference;
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-theme-preference", preference);
    root.style.colorScheme = theme;
    browserColor.content = colors[theme];
    document.dispatchEvent(new Event("themechange"));
  }

  apply(saved());

  dark.addEventListener("change", function () {
    if (root.getAttribute("data-theme-preference") === "system") apply("system");
  });
  window.addEventListener("storage", function (event) {
    if (event.key === key) apply(saved());
  });

  window.__theme = {
    set: function (preference) {
      try {
        localStorage.setItem(key, preference);
      } catch (error) {}
      apply(preference);
    },
    sync: function () {
      apply(saved());
    },
  };
})();`;
