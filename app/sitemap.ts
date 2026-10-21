import type { MetadataRoute } from 'next';
import { projectPages } from './lib/projects';
import { SITE_URL } from './lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit modification dates until there is a reliable per-page source.
  const paths = ['/', '/projects', '/gallery', '/socials', ...projectPages.map((project) => `/projects/${project.id}`)];
  return paths.map((path) => ({ url: path === '/' ? SITE_URL : new URL(path, SITE_URL).toString() }));
}
