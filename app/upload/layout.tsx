import type { ReactNode } from 'react';
import { pageMetadata } from '../lib/seo';

export const metadata = pageMetadata({
  title: 'Identification Form',
  description: 'Submit your booking information and required files.',
  path: '/upload',
  noIndex: true,
});

export default function UploadLayout({ children }: { children: ReactNode }) {
  return children;
}
