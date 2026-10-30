#!/usr/bin/env python3
"""Build a metadata-free RK webfont. Requires fonttools, brotli and shapely.
Usage: python scripts/build-rk-font.py /path/to/v0.5
Only outlines, Unicode mappings, and deterministic shaping rules are exported.
"""
import importlib.util
import sys
from pathlib import Path
from statistics import mean
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.feaLib.builder import addOpenTypeFeaturesFromString
from shapely.geometry import Point, LineString
from shapely.ops import unary_union
from shapely.geometry.polygon import orient

source = Path(sys.argv[1])
spec = importlib.util.spec_from_file_location('rk_writer', source / 'rk_handwriting.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
writer = module.Writer()
extra = set('─‑…›·•▊▸▹€÷©')
characters = sorted(extra | set(writer.library) | set(module.ALIASES) | module.COMPOSED | set('\";'))
glyphs, metrics, cmap, pools = {}, {}, {}, {}

def outline(paths):
    # Turn the original variable-width pen strokes into filled, rounded outlines.
    pieces = []
    for stroke in paths:
        for x, y, width in stroke:
            pieces.append(Point(x * 1000, -y * 1000).buffer(width * 500, quad_segs=3))
        for a, b in zip(stroke, stroke[1:]):
            pieces.append(LineString([(a[0]*1000, -a[1]*1000), (b[0]*1000, -b[1]*1000)]).buffer((a[2]+b[2])*250, quad_segs=3))
    shape = unary_union(pieces).simplify(.6, preserve_topology=True)
    pen = TTGlyphPen(None)
    polygons = list(shape.geoms) if shape.geom_type == 'MultiPolygon' else [shape]
    for polygon in polygons:
        polygon = orient(polygon, sign=-1)
        for ring in [polygon.exterior, *polygon.interiors]:
            points = list(ring.coords)[:-1]
            pen.moveTo(tuple(round(v) for v in points[0]))
            for point in points[1:]: pen.lineTo(tuple(round(v) for v in point))
            pen.closePath()
    return pen.glyph()

empty = TTGlyphPen(None).glyph()
glyphs['.notdef'] = empty
metrics['.notdef'] = (600, 0)
glyphs['space'] = empty
metrics['space'] = (330, 0)
cmap[32] = 'space'
cmap[160] = 'space'
for ch in characters:
    samples = []
    if ch in extra:
        def base(key): return writer.paths(writer.library[key][0], key)
        if ch in '─‑': samples = [base('-')]
        elif ch in '›▸▹': samples = [base('>')]
        elif ch in '·•':
            paths, advance = base('.')
            samples = [([[(x, y-.25, w) for x,y,w in st] for st in paths], advance)]
        elif ch == '…':
            paths, advance = base('.')
            samples = [([[(x+offset*advance,y,w) for x,y,w in st] for offset in range(3) for st in paths], advance*3)]
        elif ch == '÷':
            paths, advance = base('-'); dots, _ = base(':')
            samples = [(paths + [[(x+advance/2-.04,y,w) for x,y,w in st] for st in dots], advance)]
        elif ch == '€':
            paths, advance = base('C'); bar, width = base('-')
            samples = [(paths + [[(x*advance/width*.7,y+dy,w) for x,y,w in st] for dy in [-.1,.1] for st in bar], advance)]
        elif ch == '©':
            paths, advance = base('C'); ring, width = base('0')
            samples = [([[(x*.6+width*.2,y*.6-.12,w) for x,y,w in st] for st in paths]+ring, max(width,advance))]
        else:
            # The terminal block is a UI cursor, not a claimed handwriting sample.
            samples = [([[(.1,-.7,.1),(.1,0,.1)],[(.2,-.7,.1),(.2,0,.1)]], .3)]
    elif ch in writer.library:
        samples = [writer.paths(candidate, ch) for candidate in writer.library[ch]]
    else:
        scene = writer.make(ch, size=1, margin=0, width=100, jitter=0)
        baseline = scene['provenance']['characters'][0]['baseline_y']
        paths = [[(x, y-baseline, w) for x,y,w in stroke] for stroke in scene['paths']]
        samples = [(paths, max(x for stroke in paths for x,y,w in stroke)+.08)]
    names = [f'u{ord(ch):04X}.v{i}' for i in range(len(samples))]
    pools[ch] = names
    # Uniform advance per character prevents alternates from changing wrapping.
    advance = round(mean(a for _,a in samples)*1000)
    for name, (paths, _) in zip(names, samples):
        glyphs[name] = outline(paths)
        metrics[name] = (advance, glyphs[name].xMin if hasattr(glyphs[name], 'xMin') else 0)
    cmap[ord(ch)] = names[0]

fb = FontBuilder(1000, isTTF=True)
fb.setupGlyphOrder(list(glyphs))
fb.setupCharacterMap(cmap)
fb.setupGlyf(glyphs)
# Set side bearings from actual bounds, retaining the original pen positioning.
for name, glyph in glyphs.items():
    glyph.recalcBounds(fb.font['glyf'])
    metrics[name] = (metrics[name][0], getattr(glyph, 'xMin', 0))
fb.setupHorizontalMetrics(metrics)
fb.setupHorizontalHeader(ascent=1000, descent=-300, lineGap=0)
fb.setupNameTable({'familyName':'RK Handwriting','styleName':'Regular','uniqueFontIdentifier':'RK Handwriting Web 1','fullName':'RK Handwriting Regular','psName':'RKHandwriting-Regular','version':'Version 1.000'})
fb.setupOS2(sTypoAscender=1000,sTypoDescender=-300,sTypoLineGap=0,usWinAscent=1100,usWinDescent=350)
fb.setupPost(keepGlyphNames=False)
fb.setupMaxp()
# Contextual substitutions cycle authentic samples, looking back through up to
# 24 intervening characters. No randomness, DOM mutation, or private metadata.
fea = ['languagesystem DFLT dflt;', 'languagesystem latn dflt;']
all_names = list(glyphs)[1:]
for index, (ch, names) in enumerate(pools.items()):
    if len(names)<2: continue
    others = [n for n in all_names if n not in names]
    fea.append(f'@skip{index} = [{" ".join(others)}];')
    fea.append(f'lookup cycle{index} {{')
    for gap in range(25):
        middle = f' @skip{index}' * gap
        for i, name in enumerate(names):
            fea.append(f"sub {name}{middle} {names[0]}' by {names[(i+1)%len(names)]};")
    fea.append(f'}} cycle{index};')
fea.append('feature calt {')
for index, names in enumerate(pools.values()):
    if len(names)>1: fea.append(f'lookup cycle{index};')
fea.append('} calt;')
addOpenTypeFeaturesFromString(fb.font, '\n'.join(fea))
out = Path(__file__).resolve().parents[1] / 'app/fonts/rk-handwriting.woff2'
fb.font.flavor = 'woff2'
fb.save(out)
print(f'{out}: {out.stat().st_size:,} bytes; {len(glyphs)} glyphs; e/a/t/y/s samples: '+str({c:len(pools[c]) for c in 'eatys'}))
