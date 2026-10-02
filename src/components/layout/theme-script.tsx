"use client";

import { themeScript } from "@/lib/theme";

/**
 * The theme script, for <head>: it runs as the page is parsed, before the
 * first paint. On the client the tag renders as text/plain, which React
 * doesn't warn about; suppressHydrationWarning accepts the server's type.
 * (Next.js guide: "Preventing flash before hydration".)
 */
export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}
