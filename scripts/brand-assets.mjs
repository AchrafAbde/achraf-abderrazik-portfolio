// Generates the logo files from the one geometry in src/lib/logo.ts:
//   src/app/icon.svg, favicon.ico, apple-icon.png  (browser and home-screen icons)
//   docs/brand/*                                    (the logo variants, for use outside the site)
// Run after changing the logo: npm run brand
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

import { brandLime, logo, logoKnockout, logoSmall } from "../src/lib/logo.ts";
import { measureGeistMedium } from "../src/lib/text-metrics.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ink = { dark: "#f4f4f1", light: "#161614" }; // the A: the site's text color on dark and on light
const muted = { dark: "#a5a5ad", light: "#4e4e57" };
const tile = "#0e0e11"; // the dark surface, for icons that sit on any browser or home screen

/** The symbol's four parts, as LogoIcon draws them. */
function symbol(g, { color, flowColor = brandLime, mono = false, id = "k" }) {
  const accent = mono ? color : flowColor;
  const mask = mono
    ? `<mask id="${id}" maskUnits="userSpaceOnUse" x="-8" y="-8" width="80" height="80"><rect x="-8" y="-8" width="80" height="80" fill="#fff"/><path d="${g.knockout}" fill="none" stroke="#000" stroke-width="${g.stroke + logoKnockout * 2}" stroke-linejoin="round"/><circle cx="${g.foot[0]}" cy="${g.foot[1]}" r="${g.stroke / 2 + logoKnockout}" fill="#000"/></mask>`
    : "";
  return (
    mask +
    `<path d="${g.flow}" fill="none" stroke="${accent}" stroke-width="${g.stroke}" stroke-linecap="round" stroke-linejoin="round"${mono ? ` mask="url(#${id})"` : ""}/>` +
    `<path d="${g.a}" fill="none" stroke="${color}" stroke-width="${g.stroke}" stroke-linejoin="round"/>` +
    `<circle cx="${g.foot[0]}" cy="${g.foot[1]}" r="${g.stroke / 2}" fill="${color}"/>` +
    `<circle cx="${g.dot[0]}" cy="${g.dot[1]}" r="${g.dotRadius}" fill="${accent}"/>`
  );
}

const title = "<title>Achraf Abderrazik</title>";
const svg = (body, { size = 64, width = size, height = size, viewBox = "0 0 64 64" } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}" role="img">${title}${body}</svg>\n`;
const scaled = (factor, body) => `<g transform="translate(32 32) scale(${factor}) translate(-32 -32)">${body}</g>`;

/** Favicon: the small geometry on a dark rounded tile, so it reads on light and dark tab bars. */
const favicon = (size = 64) =>
  svg(
    `<rect width="64" height="64" rx="14" fill="${tile}"/>` +
      `<rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="#ffffff" stroke-opacity="0.16" stroke-width="2"/>` +
      scaled(0.84, symbol(logoSmall, { color: ink.dark })),
    { size },
  );

/** App and profile icon: the full mark on a full-bleed dark square (platforms round or crop it). */
const appIcon = (size = 64) => svg(`<rect width="64" height="64" fill="${tile}"/>` + scaled(0.68, symbol(logo, { color: ink.dark })), { size });

/** The mark beside the name and role. Text is live, set in Geist (src/assets/fonts). */
function lockup(theme) {
  const nameSize = 30;
  const nameWidth = measureGeistMedium("Achraf Abderrazik", nameSize, -0.01 * nameSize);
  const x = 64 + 18;
  const width = Math.ceil(x + nameWidth + 2);
  return svg(
    symbol(logo, { color: ink[theme] }) +
      `<text x="${x}" y="34.2" fill="${ink[theme]}" font-family="Geist, 'Geist Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${nameSize}" font-weight="500" letter-spacing="-0.3">Achraf Abderrazik</text>` +
      `<text x="${x + 1}" y="50.8" fill="${muted[theme]}" font-family="'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace" font-size="11" letter-spacing="1.76">AI &amp; DATA SCIENCE ENGINEER</text>`,
    { width, height: 64, viewBox: `0 0 ${width} 64` },
  );
}

/** ICO with PNG entries. */
function ico(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);
  const directory = Buffer.alloc(16 * entries.length);
  let offset = 6 + directory.length;
  entries.forEach(({ size, data }, i) => {
    const o = i * 16;
    directory[o] = size >= 256 ? 0 : size;
    directory[o + 1] = size >= 256 ? 0 : size;
    directory.writeUInt16LE(1, o + 4);
    directory.writeUInt16LE(32, o + 6);
    directory.writeUInt32LE(data.length, o + 8);
    directory.writeUInt32LE(offset, o + 12);
    offset += data.length;
  });
  return Buffer.concat([header, directory, ...entries.map((entry) => entry.data)]);
}

const png = (source) => sharp(Buffer.from(source)).png({ compressionLevel: 9 }).toBuffer();
// Home-screen icons are opaque (iOS fills transparency with black).
const opaquePng = (source) => sharp(Buffer.from(source)).flatten({ background: tile }).png({ compressionLevel: 9 }).toBuffer();
const write = async (path, data) => {
  await mkdir(dirname(join(root, path)), { recursive: true });
  await writeFile(join(root, path), data);
  console.log(`wrote ${path}`);
};

// Browser and home-screen icons (file-based metadata, src/app).
await write("src/app/icon.svg", favicon());
await write(
  "src/app/favicon.ico",
  ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(favicon(size)) })))),
);
await write("src/app/apple-icon.png", await opaquePng(appIcon(180)));

// The logo variants, transparent unless noted.
await write("docs/brand/logo.svg", svg(symbol(logo, { color: ink.dark })));
await write("docs/brand/logo-light.svg", svg(symbol(logo, { color: ink.light })));
await write("docs/brand/logo-mono-white.svg", svg(symbol(logo, { color: ink.dark, mono: true })));
await write("docs/brand/logo-mono-dark.svg", svg(symbol(logo, { color: ink.light, mono: true })));
await write("docs/brand/logo-small.svg", svg(symbol(logoSmall, { color: ink.dark })));
await write("docs/brand/logo-small-light.svg", svg(symbol(logoSmall, { color: ink.light })));
await write("docs/brand/logo-lockup.svg", lockup("dark"));
await write("docs/brand/logo-lockup-light.svg", lockup("light"));
await write("docs/brand/app-icon.svg", appIcon());
await write("docs/brand/app-icon-1024.png", await opaquePng(appIcon(1024)));
