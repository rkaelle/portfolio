import type { ReactNode } from 'react';
import { pageMetadata } from '../lib/seo';

export const metadata = pageMetadata({
  title: 'Newsletter Preferences',
  description: "Manage your subscription to Ryan's Daily News.",
  path: '/manage',
  noIndex: true,
});

export default function ManageLayout({ children }: { children: ReactNode }) {
  return children;
}
