import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import type { CaseStudy, Content } from "./content";
import { logo } from "./logo";

export const ogSize = { width: 1200, height: 630 };

export const ogAlt = (content: Content) => `${content.site.name} — ${content.site.positioning.join(" · ")}`;

const fontDir = join(process.cwd(), "src/assets/fonts");

async function loadFonts() {
  const [sans, sansMedium, mono, serif] = await Promise.all([
    readFile(join(fontDir, "Geist-Regular.ttf")),
    readFile(join(fontDir, "Geist-Medium.ttf")),
    readFile(join(fontDir, "GeistMono-Regular.ttf")),
    readFile(join(fontDir, "InstrumentSerif-Italic.woff")),
  ]);

  return [
    { name: "Geist", data: sans, weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: sansMedium, weight: 500 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
    { name: "Instrument Serif", data: serif, weight: 400 as const, style: "italic" as const },
  ];
}

const colors = {
  canvas: "#08080a",
  surface: "#0e0e11",
  fg: "#f4f4f1",
  muted: "#a5a5ad",
  subtle: "#7c7c85",
  accent: "#c6f36b",
  line: "rgba(255,255,255,0.10)",
};

const serif = {
  fontFamily: "Instrument Serif",
  fontStyle: "italic" as const,
  fontWeight: 400,
  letterSpacing: "-1px",
};

/**
 * A headline line: plain text, with optional parts in the serif accent or
 * muted. `wrap` lets a long part break across lines; `scale` resizes it.
 */
export type OgLine = { text: string; serif?: boolean; muted?: boolean; wrap?: boolean; scale?: number }[];

type OgOptions = {
  /** Shown next to the logo. */
  name: string;
  /** Pill in the top-right corner. */
  badge: string;
  /** Whether the badge gets the accent dot (real-world work, availability). */
  badgeAccent?: boolean;
  lines: OgLine[];
  fontSize?: number;
  footerLeft: string;
  footerRight: string;
};

/** Social share image, rendered at build time with the site's own fonts. */
export async function renderOgImage({
  name,
  badge,
  badgeAccent = true,
  lines,
  fontSize = 92,
  footerLeft,
  footerRight,
}: OgOptions) {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: colors.canvas,
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "72px 72px, 72px 72px",
          color: colors.fg,
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                border: `2px solid ${colors.line}`,
                backgroundColor: colors.surface,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* The logo (lib/logo.ts), as in the site's header. */}
              <svg width="38" height="38" viewBox="0 0 64 64" fill="none">
                <path
                  d={logo.flow}
                  stroke={colors.accent}
                  strokeWidth={logo.stroke}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d={logo.a} stroke={colors.fg} strokeWidth={logo.stroke} strokeLinejoin="round" />
                <circle cx={logo.foot[0]} cy={logo.foot[1]} r={logo.stroke / 2} fill={colors.fg} />
                <circle cx={logo.dot[0]} cy={logo.dot[1]} r={logo.dotRadius} fill={colors.accent} />
              </svg>
            </div>
            <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.5px" }}>{name}</div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 20px",
              borderRadius: 999,
              border: `1.5px solid ${colors.line}`,
              fontFamily: "Geist Mono",
              fontSize: 18,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: colors.muted,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                ...(badgeAccent
                  ? { backgroundColor: colors.accent }
                  : { border: `1.5px solid ${colors.muted}` }),
              }}
            />
            {badge}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize,
            fontWeight: 500,
            lineHeight: 1.02,
            letterSpacing: `${-fontSize * 0.042}px`,
          }}
        >
          {lines.map((line, index) => (
            <div
              key={index}
              style={{ display: "flex", flexWrap: "wrap", marginTop: index === 0 ? 0 : 6 }}
            >
              {line.map((part, partIndex) => (
                <span
                  key={partIndex}
                  style={{
                    whiteSpace: part.wrap ? "normal" : "pre",
                    ...(part.serif ? serif : {}),
                    ...(part.scale ? { fontSize: Math.round(fontSize * part.scale) } : {}),
                    color: part.muted ? colors.muted : colors.fg,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1.5px solid ${colors.line}`,
            paddingTop: 30,
            gap: 32,
            fontFamily: "Geist Mono",
            fontSize: footerLeft.length > 56 ? 17 : 20,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          <div style={{ color: colors.fg }}>{footerLeft}</div>
          <div style={{ color: colors.subtle, flexShrink: 0, whiteSpace: "nowrap" }}>{footerRight}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}

/** "I build *intelligent systems*" → plain and serif parts. */
function parseLine(line: string): OgLine {
  return line
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*") ? { text: part.slice(1, -1), serif: true } : { text: part },
    );
}

/** Homepage share image, in the page's language. */
export function renderHomeOgImage(content: Content) {
  const { site } = content;
  const lines = site.seo.shareHeadline.map(parseLine);
  return renderOgImage({
    name: site.name,
    badge: site.availability.label,
    lines,
    // Three lines (the French headline) need a smaller size to fit.
    fontSize: lines.length > 2 ? 80 : 92,
    footerLeft: site.role,
    footerRight: site.location,
  });
}

/** A case study's share image, in the page's language. */
export function renderCaseStudyOgImage(content: Content, study: CaseStudy) {
  const kind = study.kind;
  return renderOgImage({
    name: content.site.name,
    badge: study.badge,
    badgeAccent: kind === "real-world" || kind === "internship",
    lines: [
      [{ text: study.title, wrap: true }],
      [{ text: study.subtitle, serif: true, muted: true, wrap: true, scale: 0.78 }],
    ],
    fontSize: study.title.length > 22 ? 76 : 92,
    footerLeft: study.architecture.compact.join(" → "),
    footerRight: content.ui.og.caseStudy,
  });
}
