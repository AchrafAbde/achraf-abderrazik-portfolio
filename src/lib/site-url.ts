/**
 * Resolves the canonical site URL used for metadata, sitemap and structured data.
 *
 * Priority:
 * 1. NEXT_PUBLIC_SITE_URL — set this to your custom domain (e.g. https://yourname.com)
 * 2. VERCEL_PROJECT_PRODUCTION_URL — provided automatically by Vercel
 * 3. http://localhost:3000 — local development
 */
function resolveSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const raw = explicit || (vercel ? `https://${vercel}` : "http://localhost:3000");

  try {
    return new URL(raw);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
