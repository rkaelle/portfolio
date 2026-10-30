from fontTools.ttLib import TTFont
import uharfbuzz as hb
from io import BytesIO
font=TTFont('app/fonts/rk-handwriting.woff2');font.flavor=None
b=BytesIO();font.save(b);f=hb.Font(hb.Face(b.getvalue()))
def shape(s):
 b=hb.Buffer();b.add_str(s);b.guess_segment_properties();hb.shape(f,b,{'calt':True});return [g.codepoint for g in b.glyph_infos]
for ch,n in zip('eatys',[20,20,19,15,16]):
 ids=shape(ch*100)
 assert len(set(ids))==n,(ch,len(set(ids)))
 assert all(ids[i] not in ids[max(0,i-3):i] for i in range(len(ids)))
 text=('Easy letters stay a little different. '+ch+' ')*10
 assert shape(text)==shape(text)
 print(ch,n,'authentic variants; repeat avoidance and deterministic shaping passed')
assert set(font.keys()) <= {'GlyphOrder','head','hhea','maxp','OS/2','hmtx','cmap','loca','glyf','name','post','GSUB'}
for record in font['name'].names: print(record.nameID,record.toUnicode())
