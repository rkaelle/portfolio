import Home from './Home';
import { HOME_DESCRIPTION, HOME_TITLE, pageMetadata } from './lib/seo';

export const metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: '/',
});

export default function HomePage() {
  return <Home />;
}
