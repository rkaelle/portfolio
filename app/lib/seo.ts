import type { Metadata } from 'next';

export const SITE_URL = 'https://www.rkaelle.com';
export const HOME_TITLE = 'Ryan Kaelle | Embedded Systems & Avionics Engineer';
export const HOME_DESCRIPTION =
  'Ryan Kaelle builds embedded systems, avionics, RF hardware, and full-stack software. Explore engineering experience and projects in drones, robotics, and real-time systems.';

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title === HOME_TITLE ? title : `${title} | Ryan Kaelle`;
  const url = path === '/' ? SITE_URL : new URL(path, SITE_URL).toString();
  const image = {
    url: `${SITE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: 'Ryan Kaelle — Embedded Systems & Avionics Engineer',
  };

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Ryan Kaelle',
      locale: 'en_US',
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@kaelleryan',
      images: [image],
    },
  };
}
