// app/layout.tsx  (or /src/app/layout.tsx in /app router)

import './globals.css';
import type { Metadata, Viewport } from 'next';
import React from 'react';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-jetbrains', weight: ['100','200','300','400','500','600','700'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-space-grotesk', weight: ['300','400','500','600','700'] });

/*  -- VISUAL / THEMING --------------------------------------------- */
export const viewport: Viewport = {
  themeColor: '#1a1b26',
};

/*  -- SEO / SOCIAL -------------------------------------------------- */
export const metadata: Metadata = {
  title: 'Ryan Kaelle – Drones, radios, and real-time systems.',
  description:
    "Hey, I'm Ryan — a Bay-Area-based junior at UMich who builds hardware, full-stack apps & blockchain infra.",
  keywords: [
    'Ryan Kaelle',
    'Bay Area engineer',
    'hardware hacker',
    'embedded systems',
    'IoT',
    'full-stack developer',
    'blockchain developer',
    'DePIN',
    'University of Michigan',
    'Silicon Valley tech'
  ],
  authors: [{ name: 'Ryan Kaelle', url: 'https://rkaelle.com' }],
  creator: 'Ryan Kaelle',
  manifest: '/manifest.json',
  alternates: { canonical: 'https://rkaelle.com' },

  /* -- Open Graph (Facebook/LinkedIn etc.) -- */
  openGraph: {
    title: 'Ryan Kaelle – Drones, radios, and real-time systems.',
    description:
      "Rising junior at UMich building bleeding-edge hardware, web apps & crypto tools in Silicon Valley.",
    url: 'https://rkaelle.com',
    siteName: 'Ryan Kaelle',
    images: [
      {
        url: '/assets/ryankaelle_cropped.png',
        width: 1200,
        height: 630,
        alt: 'Ryan Kaelle working on a PCB schematic'
      }
    ],
    locale: 'en_US',
    type: 'profile'
  },

  /* -- Twitter / X Card -- */
  twitter: {
    card: 'summary_large_image',
    title: 'Ryan Kaelle – Drones, radios, and real-time systems.',
    description:
      "Hey, I'm Ryan — Bay-Area-based junior @UMich building hardware, full-stack apps & blockchain infra.",
    images: ['/assets/ryankaelle_cropped.png'],
    creator: '@kaelleryan'   // optional: add if you have one
  },

  /* -- Favicon bundle -- */
  icons: {
    icon: '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon.png'
  }
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
              url: 'https://rkaelle.com',
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
        <Analytics />
        <GoogleAnalytics gaId="G-0EBMRW3QEB" />
      </body>
    </html>
  );
}