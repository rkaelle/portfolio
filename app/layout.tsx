// app/layout.tsx  (or /src/app/layout.tsx in /app router)

import './globals.css';
import type { Metadata, Viewport } from 'next';
import React from 'react';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import SiteAnalytics from './components/SiteAnalytics';
import { SITE_URL, HOME_TITLE, HOME_DESCRIPTION } from './lib/seo';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-jetbrains', weight: ['100','200','300','400','500','600','700'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-space-grotesk', weight: ['300','400','500','600','700'] });

/*  -- VISUAL / THEMING --------------------------------------------- */
export const viewport: Viewport = {
  themeColor: '#1a1b26',
};

/*  -- SEO / SOCIAL -------------------------------------------------- */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  authors: [{ name: 'Ryan Kaelle', url: SITE_URL }],
  creator: 'Ryan Kaelle',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
};

/* ------------- ROOT LAYOUT ---------------------------------------- */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Basic icons + PWA */}
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Preconnects for analytics and API origins */}
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://api.github.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.github.com" />

        {/* JSON-LD profile card for richer results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ryan Kaelle',
              jobTitle: 'Hardware Engineer & Full-Stack Developer',
              affiliation: 'University of Michigan',
              alumniOf: 'University of Michigan',
              url: SITE_URL,
              sameAs: [
                'https://github.com/rkaelle',
                'https://www.linkedin.com/in/ryankaelle/'
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'San Francisco Bay Area',
                addressRegion: 'CA',
                addressCountry: 'USA'
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable} font-sans`}>
        <div className="scanline" />
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
