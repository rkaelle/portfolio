import { ImageResponse } from 'next/og';

export const alt = 'Ryan Kaelle — Embedded Systems & Avionics Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '54px 64px', backgroundColor: '#111319', color: '#D8DEE9', backgroundImage: 'linear-gradient(135deg, #111319 30%, #242e3c 100%)', borderTop: '8px solid #88C0D0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#A3BE8C' }}>
          <span>~/ rkaelle / portfolio</span>
          <span>hardware + software</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, color: '#88C0D0' }}>Ryan Kaelle</div>
          <div style={{ fontSize: 37, maxWidth: 950, lineHeight: 1.4 }}>Embedded Systems &amp; Avionics Engineer</div>
          <div style={{ fontSize: 25, color: '#A3BE8C' }}>Drones, radios, and real-time systems.</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #3B4252', paddingTop: 24, fontSize: 22, color: '#88C0D0' }}>
          <span>RF / ROBOTICS / FIRMWARE / FULL STACK</span>
          <span>www.rkaelle.com</span>
        </div>
      </div>
    ),
    size,
  );
}
