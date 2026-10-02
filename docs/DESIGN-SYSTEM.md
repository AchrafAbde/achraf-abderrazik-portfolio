# Design system

A small, strict system for an editorial and technical portfolio: dark by
default, with a light theme translated from it. Tokens live in
`src/app/globals.css` (Tailwind v4 `@theme`), components in
`src/components/ui` and `src/components/motion`.

## Principles

1. **Content first.** Typography and whitespace carry the design; decoration is
   limited to hairlines, a faint grid and one accent color.
2. **One accent, used sparingly.** The signal lime marks state and emphasis
   (availability, real-world work, the signal in diagrams). Never large surfaces.
3. **Depth from light, not shadow.** On a near-black canvas, hierarchy comes
   from surface steps and 1px borders instead of drop shadows. In the light
   theme, white cards lift off the paper with one soft, restrained shadow
   (`shadow-card`).
4. **Motion with meaning.** The hero "develops" the portrait, diagrams show data
   flowing through a system, and transitions show direction. Everything else
   uses short, eased entrances. Loops pause off-screen, and everything respects
   reduced motion.
5. **Honest by construction.** Every project carries a label (real-world,
   internship, academic…), metrics must have a source, and team projects show
   the team instead of claiming the work.
6. **Each number has one home.** The homepage strip shows the strongest few,
   project cards show 1–2 others, and the case study shows the full set with
   what each number means. Nothing repeats without a reason.

## Color

Tailwind's default palette is reset (`--color-*: initial`), so only these
tokens exist. Use them as `bg-*`, `text-*`, `border-*`, `fill-*`, `stroke-*`.
Each has a value per theme:

| Token         | Dark                       | Light                     | Use                                         |
| ------------- | -------------------------- | ------------------------- | ------------------------------------------- |
| `canvas`      | `#08080a`                  | `#f5f4f0`                 | Page background                             |
| `surface`     | `#0e0e11`                  | `#ffffff`                 | Cards, panels                               |
| `surface-2`   | `#141418`                  | `#ffffff`                 | Raised elements inside cards                |
| `surface-3`   | `#1b1b20`                  | `#ffffff`                 | Rare, highest elevation                     |
| `line`        | `rgb(255 255 255 / 0.08)`  | `rgb(20 20 24 / 0.1)`     | Hairlines and default borders               |
| `line-strong` | `rgb(255 255 255 / 0.14)`  | `rgb(20 20 24 / 0.17)`    | Interactive borders, emphasis               |
| `fg`          | `#f4f4f1`                  | `#161614`                 | Primary text and headings                   |
| `fg-muted`    | `#a5a5ad`                  | `#4e4e57`                 | Body copy, secondary text (8:1 / 7.5:1 on canvas) |
| `fg-subtle`   | `#7c7c85`                  | `#6b6b74`                 | Labels, metadata (4.8:1 on canvas in both)  |
| `tint`        | `#ffffff`                  | `#000000`                 | The canvas's opposite, only at low opacity: hover fills, hairlines, watermarks (`hover:bg-tint/5`) |
| `accent`      | `#c6f36b`                  | `#4c740a`                 | Signal: status, focus rings, highlights (5:1 on the light canvas) |
| `accent-ink`  | `#0b0e04`                  | `#ffffff`                 | Text/icons placed on the accent             |
| `danger`      | `#ff8f80`                  | `#b42318`                 | Form errors                                 |

Opacity modifiers are fine for tints (`bg-accent/10`, `border-accent/40`).
Never use `white` or `black` for an overlay: `tint` turns with the theme.
`white` is for things drawn on a photograph.

### Themes

- **Dark** is the original palette and the default without JavaScript;
  **light** is the same system translated: warm paper, white cards, charcoal
  ink, and the lime deepened so it reads as text. Contrast steps match, so the
  hierarchy is the same in both.
- The visitor chooses Dark, Light or System (the default: follow the
  operating system). The choice is saved in `localStorage` (`theme`).
- A blocking script in `<head>` (`lib/theme.ts`) sets `data-theme` on
  `<html>` before the first paint, so the page never flashes the other theme,
  and follows system changes while System is chosen. No URL changes: the theme
  is never part of an address.
- `globals.css` holds the dark values in `@theme` and overrides the same
  variables under `[data-theme="light"]`; other theme values (shadows, film
  grain, spotlight) are plain variables beside them. In CSS, use the
  variables (`var(--color-canvas)`), so a theme can switch them.
- `data-theme="dark"` on an element keeps the dark palette inside a light
  page: the portrait, a photograph with light text on it. Inside it,
  `--page-canvas` is still the page's own canvas.
- A new color needs a value in both themes; check its contrast in both.

Opacity modifiers compile to `color-mix()` with the live variable, and to a
fallback precomputed from the dark value for older browsers.

## Typography

| Family        | Token          | Use                                                  |
| ------------- | -------------- | ---------------------------------------------------- |
| Geist         | `font-sans`    | Everything by default (400 body, 500 headings)       |
| Geist Mono    | `font-mono`    | Eyebrows, labels, tags, numbering — usually uppercase |
| Instrument Serif Italic | `font-accent` | One or two words per heading for an editorial accent |

Fluid scale (each step scales between mobile and desktop with `clamp()`):

| Class          | Range            | Line height | Tracking  | Use                     |
| -------------- | ---------------- | ----------- | --------- | ----------------------- |
| `text-display` | 48 → 116px       | 0.95        | −0.045em  | Large display titles    |
| `text-hero`    | 44 → 96px        | 0.94        | −0.045em  | Hero headline (also scales with viewport height) |
| `text-h2`      | 34 → 64px        | 1.02        | −0.038em  | Section titles          |
| `text-h3`      | 24 → 34px        | 1.10        | −0.028em  | Case-study titles       |
| `text-h4`      | 18 → 21px        | 1.30        | −0.015em  | Item titles             |
| `text-lead`    | 17 → 21px        | 1.55        | −0.011em  | Intros, summaries       |
| `text-eyebrow` | 12px             | 16px        | +0.08em   | Mono labels (uppercase) |

Rules: headings use `font-medium`; headings balance their lines and paragraphs
use `text-wrap: pretty` (set globally); keep body copy at `text-fg-muted` and
reserve `text-fg` for what should be read first.

Content files mark the accent and emphasis inline, and `<Inline>` renders
them: `*words*` becomes the Instrument Serif accent, `**words**` brighter
`text-fg` text. Keep it to one accent per heading.

## Layout & spacing

- **Container:** `<Container>` — max width 1280px, side padding 20 / 32 / 48px.
- **Grid:** 12 columns on large screens. Standard split is 7 + 5
  (title left, intro right) — see `<SectionHeading>`.
- **Section rhythm:** `<Section>` applies 96 / 112 / 128px vertical padding and
  an optional top hairline (`divider`).
- **Spacing steps:** stick to the 4px Tailwind scale; common gaps are
  `gap-2` (chips), `gap-6` (lists), `gap-10`/`gap-12` (columns), `mt-16`–`mt-24`
  (heading to content).
- **Header:** the inline navigation shows from `lg` (1024px); below that, the
  menu button opens the full-screen menu. **EN · FR** sits in the bar from
  360px up and at the top of the mobile menu. Both links are the same size and
  the current one only changes color, so switching never shifts the header.
  The theme switch follows the navigation: an icon button beside EN · FR from
  `lg`, a three-way control above the call to action in the mobile menu.

## Two languages

Every component renders English and French from the same markup, so a
design change applies to both. French text runs 15–30% longer, so:

- Let text wrap; never truncate or shrink it to fit. Lines that wrap (the hero
  heading's name and role, pipelines) put separators in the gap so no line
  starts or ends with one.
- Check long strings at 1024px (the tightest large layout) and at 390px. In
  the hero, the name-and-role heading is limited to the columns left of the
  portrait (`lg:max-w-[87.5%]`), so it wraps instead of running under the
  photo.

The homepage's `h1` is the name and role ("Achraf Abderrazik · AI & Data
Science Engineer"), in the small mono style above the tagline; the large
tagline is a paragraph. Keep a single `h1` per page.
- Numbers and units follow the language (`0,895`, `98 %`, `12 h`); French
  no-break spaces are added automatically.

## Shape

- Cards and panels: `rounded-2xl` (16px); the contact panel: 28px.
- Buttons, pills, badges: `rounded-full`. Tags: `rounded-md`.
- Borders: always 1px, `border-line` by default, `border-line-strong` when interactive.

## Motion

Tokens in `globals.css` and `src/lib/motion.ts`:

| Token            | Value                             | Use                          |
| ---------------- | --------------------------------- | ---------------------------- |
| `ease-out-quint` | `cubic-bezier(0.22, 1, 0.36, 1)`  | Default for UI and reveals   |
| `ease-out-expo`  | `cubic-bezier(0.16, 1, 0.3, 1)`   | Hero entrance                |
| Durations        | 0.2s / 0.45s / 0.8s               | Hover / UI / reveals         |
| Reveal offset    | 18px                              | Distance content travels     |
| Stagger          | 0.07s                             | Between items in a group     |

Patterns:

- **Hero:** a CSS-only load sequence in `globals.css`. `hero-develop` settles
  the photo (a 4.5% zoom-out and small upward drift); `hero-veil` + `hero-sweep`
  share duration, delay and easing, so the light line always sits on the veil's
  edge; each headline line rises from behind its own `hero-line` mask; then
  `animate-fade-up` for the introduction and calls to action; `hero-meta` and
  `hero-mark` bring in the technical metadata last. Timings live in one
  `timing` object in `hero.tsx`. `<HeroMotion>` moves three `data-parallax`
  planes with the pointer (photo −10px, frame +5px, overlay +4px at the
  viewport edge) and drifts the photo on scroll.
- **Diagrams:** `<ArchitectureDiagram>` is CSS-driven. `<InView>` sets
  `data-inview` (entrance, once) and `data-playing` (signal loop, paused
  off-screen). One link takes 12% of a 4.8s cycle, so the signal reaches each
  stage in turn.
- **Counters:** `<CountUp>` only for documented numbers; the server renders the
  final value. Large numbers use Geist's default proportional figures; keep
  `tabular-nums` for small indices that align in columns.
- **Progressions:** metric steps (AMAN's teacher → teacher → student) share one
  meter scale; the last step carries the accent and the others stay neutral.
  Meters fill in turn once in view.
- **Page transitions:** `<PageTransition>` on each page; links carry
  `transitionTypes={["nav-forward"]}` or `["nav-back"]`. `<SharedTitle>` morphs a
  project title between the list and its case study.
- **Theme switch:** one 0.32s cross-fade of the whole page (a view
  transition, header included); instant with reduced motion or where view
  transitions aren't supported.
- **Scroll reveals:** `<Reveal>` for single blocks, `<RevealGroup>` +
  `<RevealItem>` for lists. They animate once, and content stays visible
  without JavaScript.
- **Hover:** color and border changes, icons nudge 2px. No hover effects on
  non-interactive elements.
- **Reduced motion:** `MotionConfig reducedMotion="user"` plus a global CSS
  override that also drops delays. Parallax, counters and loops are off, and
  every animation ends in its visible state.

## Portrait

The hero photo stays as photographed: no retouching, nothing that reshapes the
face. The treatment is CSS, applied in layers above the photo:

- **Grade:** `hero-photo` (contrast 1.06, saturation 0.86), `hero-vignette`
  (darkens the edges, keeps the light on the face) and `hero-grain` (mid-grey
  noise in overlay mode, so it marks the midtones without shifting the tone).
- **Lime:** `hero-tint`, a faint light spill in the lower-left corner, away
  from the face, plus the sweep's glow, one ruler tick and the location dot.
- **Technical overlay:** name and role, coordinates, location and a scale ruler
  (`hero-ruler`). Never face-detection boxes, particles or fake AI read-outs.
- **Themes:** the frame keeps the dark palette in both themes
  (`data-theme="dark"`), like a print on the page. On phones its bottom fades
  into the page's canvas, so the overlapping headline reads in either theme.

## Components

| Component                    | File                         | Notes                                              |
| ---------------------------- | ---------------------------- | -------------------------------------------------- |
| `Button`, `ButtonLink`       | `ui/button.tsx`              | `primary` · `secondary` · `ghost`; `sm` · `md` · `lg`; optional trailing `icon` |
| `Container`                  | `ui/container.tsx`           | Page frame                                         |
| `Section`, `SectionHeading`  | `ui/section.tsx`             | Section wrapper with `aria-labelledby`; numbered heading |
| `Eyebrow`                    | `ui/eyebrow.tsx`             | `01 —— Label` mono label                           |
| `ProjectBadge`               | `ui/badge.tsx`               | Real-world (accent dot) · internship (accent ring) · academic (outline) · personal / project (solid) |
| `Tag`                        | `ui/badge.tsx`               | Technology / keyword chip                          |
| `StatusPill`                 | `ui/badge.tsx`               | Availability with a soft pulsing dot               |
| Icons                        | `ui/icons.tsx`               | 24px grid, 1.6 stroke, `currentColor`, `aria-hidden` |
| `LogoMark`                   | `layout/logo.tsx`            | Two connected nodes — trigger and result           |
| `Reveal`, `RevealGroup`, `RevealItem` | `motion/reveal.tsx` | Scroll-triggered entrances                          |
| `ArchitectureDiagram`        | `diagrams/architecture-diagram.tsx` | Data-driven stages; horizontal ≥1280px, vertical below |
| `CompactPipeline`            | `diagrams/compact-pipeline.tsx` | One-line pipeline for project rows; lights up on hover; connectors never start or end a line |
| `CaseStudyView`              | `case-study/case-study-view.tsx` | The case-study page: header, metrics, sections numbered in order, links, next case study |
| `MetricsPanel`, `Progression` | `case-study/case-study-view.tsx` | Full metric set with meanings; ordered steps with meters |
| `InView`, `CountUp`, `Spotlight`, `HeroMotion` | `motion/` | Visibility state, counters, cursor light, hero parallax |
| `PageTransition`, `SharedTitle` | `motion/page-transition.tsx` | React `<ViewTransition>` wrappers |
| `SiteShell`                  | `layout/site-shell.tsx`      | Skip link, header, `main`, footer and site-wide JSON-LD around every page |
| `LanguageSwitch`             | `layout/language-switch.tsx` | `EN · FR`: links to the same page in each language; current one marked |
| `ThemeSwitch`, `ThemePicker` | `layout/theme-switch.tsx`    | Dark · Light · System: header menu button (from `lg`) and the mobile menu's radio group |
| `ThemeScript`                | `layout/theme-script.tsx`    | The `<head>` script that applies the saved theme before the first paint |
| `Inline`                     | `ui/inline.tsx`              | Renders `*accent*` and `**emphasis**` from content text |
| `NotFoundView`               | `sections/not-found-view.tsx` | The 404 page body                                 |

## Accessibility checklist

- Text contrast ≥ 4.5:1 in both themes (`fg-subtle` is the lowest allowed for
  small text).
- The theme switch works from the keyboard: the header menu button opens with
  Enter, Space or the arrow keys and closes with Escape; the mobile radio group
  moves with the arrow keys. Each control names the current choice.
- Every section is labelled by its heading; one `h1` per page.
- Focus is always visible (`outline: 2px solid accent`).
- Decorative SVGs and visuals are `aria-hidden`; meaningful icons have labels.
- Form fields have labels and inline errors linked with `aria-describedby`.
  On submit, focus moves to the first invalid field; once sent, to the success
  or error message, so it is read out and Tab continues from there.
- Every page sets `<html lang>`. The language links carry `lang` and
  `hreflang`, name each language in its own language ("Français (FR)") and mark
  the current one with `aria-current="page"`.
