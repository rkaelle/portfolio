import Socials from './Socials';
import { pageMetadata } from '../lib/seo';

export const metadata = pageMetadata({
  title: 'Contact & Social Links',
  description: 'Get in touch with Ryan Kaelle and find his GitHub, LinkedIn, and social profiles for engineering projects and collaboration.',
  path: '/socials',
});

export default function SocialsPage() {
  return <Socials />;
}
