# Fonts

| File                          | Font                     | Used for                          |
| ----------------------------- | ------------------------ | --------------------------------- |
| `Geist-Variable.woff2`        | Geist (variable 100–900) | Site text                         |
| `GeistMono-Regular.woff2`     | Geist Mono 400           | Labels                            |
| `InstrumentSerif-Italic.woff2`| Instrument Serif Italic  | Editorial accents in headings     |
| `*.ttf`, `*.woff`             | Full files               | Social share images (`lib/og.tsx`) |

The `.woff2` files are **subsets**: Basic Latin, Latin-1 (French accents
included) and a few symbols. If you add text with other characters, re-create
them from the full fonts, for example:

```bash
pip install fonttools brotli
pyftsubset Geist-Variable.woff2 --flavor=woff2 --output-file=Geist-Variable.woff2 \
  --unicodes="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+2013-2014,U+2018-201E,U+2022,U+2026,U+2190-2194,U+2212,U+2248"
```

Full fonts: [Geist](https://github.com/vercel/geist-font) ·
[Instrument Serif](https://github.com/Instrument/instrument-serif).
All are licensed under the SIL Open Font License 1.1 (see the `OFL-*.txt` files);
neither declares a Reserved Font Name, so subsetting is permitted.
