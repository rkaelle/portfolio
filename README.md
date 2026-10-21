<h1 align="center">
  ryankaelle.dev
</h1>
<p align="center">
  The latest version of <a href="https://rkaelle.com" target="_blank">rkaelle.com</a> built with React.js.
</p>

<img width="1306" alt="Site Screenshot" src="/site_screenshot.png">

## set-up

1. Install the dependencies

   ```sh
   npm ci
   ```

2. Start the development server

   ```
   npm run dev
   ```

## build and run for production

1. Generate a full static production build

   ```
   npm run build
   ```


## SEO verification

Build and start the production site with `npm run build` and `npm start`.
In another terminal, run `npm run test:seo`. For a different local port, use
`SEO_BASE_URL=http://127.0.0.1:3001 npm run test:seo`.

These checks verify page metadata, canonical URLs, server-rendered portfolio content,
project links, sitemap coverage, utility-page indexing rules, social-image dimensions,
and missing-project responses. Project case studies and sitemap entries are generated
from projects with a full description in `app/lib/projects.ts`.

Use Node.js 24 (`nvm use`). See [SECURITY.md](SECURITY.md) for security checks and the Firebase configuration required before deploying the access-control changes.
