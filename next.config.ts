import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // A styled 404 for URLs outside both languages (src/app/global-not-found.tsx).
    globalNotFound: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // English is the default language. Always the same, whatever the browser's language.
      { source: "/", destination: "/en", permanent: true },

      // Links from before the site had languages, including two renamed case studies.
      { source: "/work/safe-invest-ai-lead-automation", destination: "/en/work/safe-invest", permanent: true },
      { source: "/work/aman-darija-toxic-speech", destination: "/en/work/aman", permanent: true },
      {
        source: "/:locale(en|fr)/work/safe-invest-ai-lead-automation",
        destination: "/:locale/work/safe-invest",
        permanent: true,
      },
      {
        source: "/:locale(en|fr)/work/aman-darija-toxic-speech",
        destination: "/:locale/work/aman",
        permanent: true,
      },
      { source: "/work/:slug", destination: "/en/work/:slug", permanent: true },

      // The portrait's previous file name.
      { source: "/achraf-portrait.png", destination: "/achraf-abderrazik.png", permanent: true },
    ];
  },
};

export default nextConfig;
