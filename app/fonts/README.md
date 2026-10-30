# RK handwriting webfont

`rk-handwriting.woff2` contains only outlines, Unicode mappings, neutral font names,
and OpenType shaping tables. The source library, notebook names, course details,
and provenance records are never copied into the application or public directory.

The root layout self-hosts and preloads this single font through `next/font/local`.
A `size-adjust: 125%` font descriptor enlarges the handwriting without changing
the layout spacing scale. Global CSS covers utility font classes, controls, placeholders, pseudo-elements,
and content added later. Text stays ordinary Unicode in the DOM. Native title
popups are rendered by `HandwritingTooltips` because OS popups cannot use webfonts.
Text embedded in images/PDFs and operating system dialogs is outside CSS control.

All authentic variants are included. `calt` deterministically cycles each letter's
samples through up to 24 intervening characters; the priority letters have 20/20/19/15/16
variants for e/a/t/y/s. This is a browser shaping adaptation, rather than the Python
writer's notebook-weighted passage selection and geometric jitter. Re-rendering the
same text/context produces identical glyphs. Editing preceding text or changing a
shaping boundary can change subsequent alternates. Each letter's alternates share
an advance width to avoid variation-induced wrapping changes. Changing typefaces
can still change line breaks compared with the previous fonts.

Additional site punctuation is composed from existing strokes in the build script;
the terminal cursor is geometric. Future unsupported Unicode (including emoji)
falls back to the browser's font instead of becoming missing text.

Rebuild locally (Python is build tooling only):

```sh
python3 -m venv /tmp/rk-font-build
/tmp/rk-font-build/bin/pip install fonttools brotli shapely uharfbuzz
/tmp/rk-font-build/bin/python scripts/build-rk-font.py /path/to/v0.5
/tmp/rk-font-build/bin/python tests/rk-font.py
```

No Python packages are production dependencies. The source folder must contain
`rk_handwriting.py` and `handwriting-library.json`. Read its `START-HERE.md` first.
