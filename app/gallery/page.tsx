import Gallery from './Gallery';
import { pageMetadata } from '../lib/seo';

export const metadata = pageMetadata({
  title: 'Photo Gallery',
  description: 'A photo gallery from Ryan Kaelle: moments from life, travel, and adventures beyond the workbench.',
  path: '/gallery',
});

export default function GalleryPage() {
  return <Gallery />;
}
