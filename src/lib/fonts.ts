import localFont from "next/font/local";

/*
 * All fonts are self-hosted and subset to Latin plus the few symbols the site
 * uses (· ° × → ↔ ≈ – — ’ …), which keeps the critical path small.
 * To add characters, re-subset from the original files with fontTools
 * (see src/assets/fonts/README.md).
 */

/** Geist (variable, 100–900): everything by default. Preloaded. */
export const fontSans = localFont({
  src: "../assets/fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

/**
 * Geist Mono is only used for small labels, so a single static weight is
 * loaded without preloading to leave bandwidth for the headline fonts.
 */
export const fontMono = localFont({
  src: "../assets/fonts/GeistMono-Regular.woff2",
  variable: "--font-geist-mono",
  weight: "400",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
});

/** Instrument Serif (italic): short editorial accents in headings. Preloaded. */
export const fontSerif = localFont({
  src: "../assets/fonts/InstrumentSerif-Italic.woff2",
  variable: "--font-instrument-serif",
  weight: "400",
  style: "italic",
  display: "swap",
  fallback: ["ui-serif", "Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});
