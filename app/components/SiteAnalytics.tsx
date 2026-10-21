'use client';

import { usePathname } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function SiteAnalytics() {
  const pathname = usePathname();
  // Verification URLs contain one-time credentials; identity forms are private.
  if (pathname === '/manage' || pathname.startsWith('/manage/') || pathname === '/upload' || pathname.startsWith('/upload/')) return null;

  return (
    <>
      <Analytics />
      <GoogleAnalytics gaId="G-0EBMRW3QEB" />
    </>
  );
}
