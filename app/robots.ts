import type { MetadataRoute } from 'next';
import { SITE_URL } from './lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    // Keep utility pages crawlable so their noindex metadata can be read.
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
