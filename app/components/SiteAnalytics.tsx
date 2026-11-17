'use client';

import { usePathname } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function SiteAnalytics() {
  const pathname = usePathname();
  // Newsletter verification URLs contain one-time credentials.
  if (pathname === '/manage' || pathname.startsWith('/manage/')) return null;

  return (
    <>
      <Analytics />
      <GoogleAnalytics gaId="G-0EBMRW3QEB" />
    </>
  );
}
