import './globals.css';
import type { Metadata, Viewport } from 'next';
import React from 'react';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#1a1b26',
};

export const metadata: Metadata = {
  title: 'Ryan Kaelle - Hardware Engineer & Software Developer',
  description: 'Ryan Kaelle is a hardware engineer and software developer at the University of Michigan. Specializing in hardware engineering, full stack development, and blockchain technology.',
  keywords: ['Ryan Kaelle', 'Hardware Engineer', 'Software Developer', 'University of Michigan', 'Blockchain', 'Full Stack Developer', 'ECE Student', 'HELIOS', 'Z Lab'],
  authors: [{ name: 'Ryan Kaelle' }],
  creator: 'Ryan Kaelle',
  openGraph: {
    title: 'Ryan Kaelle - Hardware Engineer & Software Developer',
    description: 'Ryan Kaelle is a hardware engineer and software developer at the University of Michigan. Specializing in hardware engineering, full stack development, and blockchain technology.',
    url: 'https://rkaelle.com',
    siteName: 'Ryan Kaelle',
    images: [
      {
        url: '/assets/ryankaelle_cropped.png',
        width: 1200,
        height: 630,
        alt: 'Ryan Kaelle - Hardware Engineer & Software Developer'
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ryan Kaelle - Hardware Engineer & Software Developer',
    description: 'Ryan Kaelle is a hardware engineer and software developer at the University of Michigan. Specializing in hardware engineering, full stack development, and blockchain technology.',
    images: ['/assets/ryankaelle_cropped.png'],
  },
  icons: {
    icon: '/icons/favicon.ico',
    apple: '/icons/favicon.ico'
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/icons/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <div className="scanline" />
        {children}
        <Analytics />
        <GoogleAnalytics gaId="G-0EBMRW3QEB" />
      </body>
    </html>
  );
} 