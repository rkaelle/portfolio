import assert from 'node:assert/strict';
import { test } from 'node:test';

// Run against a production build: npm run build && npm start
const baseURL = process.env.SEO_BASE_URL || 'http://127.0.0.1:3000';
const canonicalOrigin = 'https://www.rkaelle.com';

async function get(path) {
  return fetch(new URL(path, baseURL), { signal: AbortSignal.timeout(15000) });
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]));
}

function meta(html, key) {
  const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
  return tags.find((tag) => tag.name === key || tag.property === key)?.content;
}

function canonical(html) {
  return [...html.matchAll(/<link\b[^>]*>/g)]
    .map(([tag]) => attributes(tag))
    .filter((tag) => tag.rel === 'canonical');
}

function contentHTML(html) {
  // Ignore serialized React data: text must be in actual rendered elements.
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
}

test('sitemap lists canonical public pages and fully rendered project pages', async () => {
  const response = await get('/sitemap.xml');
  assert.equal(response.status, 200);
  const sitemap = await response.text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.ok(urls.includes(`${canonicalOrigin}/projects/hill-street-planes`));
  assert.ok(urls.length > 4, 'Project pages must be included');
  assert.equal(new Set(urls).size, urls.length);
  assert.doesNotMatch(sitemap, /<lastmod>|\/manage|\/upload/);

  const titles = new Set();
  const descriptions = new Set();
  for (const url of urls) {
    assert.equal(new URL(url).origin, canonicalOrigin);
    const page = await get(new URL(url).pathname);
    assert.equal(page.status, 200, url);
    const html = await page.text();
    assert.deepEqual(canonical(html), [{ rel: 'canonical', href: url }]);
    assert.equal(meta(html, 'og:url'), url);
    assert.doesNotMatch(meta(html, 'robots') || '', /noindex/);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = meta(html, 'description');
    assert.ok(title && description, url);
    assert.ok(!titles.has(title), `Duplicate title: ${url}`);
    assert.ok(!descriptions.has(description), `Duplicate description: ${url}`);
    titles.add(title);
    descriptions.add(description);
    assert.equal([...contentHTML(html).matchAll(/<h1\b/g)].length, 1, url);

    if (new URL(url).pathname.startsWith('/projects/')) {
      assert.match(contentHTML(html), /id="overview"/);
      assert.match(contentHTML(html), /id="technologies"/);
    }
  }
});

test('homepage exposes the complete heading, experience, and project links without JavaScript', async () => {
  const html = contentHTML(await (await get('/')).text());
  assert.match(html, /<h1\b[^>]*>[\s\S]*?Ryan Kaelle[\s\S]*?<\/h1>/);
  for (const text of ['Zipline (2026)', 'Optica', 'Michigan Blockchain Club', 'Owned electrical and controls architecture', '1012 Hill Street Planes']) {
    assert.ok(html.includes(text), `Missing server-rendered content: ${text}`);
  }
  assert.match(html, /href="\/projects\/hill-street-planes"/);
  const projectHTML = contentHTML(await (await get('/projects')).text());
  const sitemap = await (await get('/sitemap.xml')).text();
  for (const [, url] of sitemap.matchAll(/<loc>([^<]+\/projects\/[^<]+)<\/loc>/g)) {
    assert.ok(projectHTML.includes(`href="${new URL(url).pathname}"`), `Missing crawlable project link: ${url}`);
  }
});

test('utility flows are noindex but remain crawlable', async () => {
  for (const path of ['/manage', '/upload']) {
    const response = await get(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(meta(html, 'robots'), /noindex/);
    assert.deepEqual(canonical(html), [{ rel: 'canonical', href: canonicalOrigin + path }]);
  }
  const robots = await (await get('/robots.txt')).text();
  assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
  assert.doesNotMatch(robots, /Disallow: \/(?:manage|upload)/);
});

test('Open Graph and Twitter images resolve to a real 1200 by 630 PNG', async () => {
  const html = await (await get('/')).text();
  assert.equal(meta(html, 'og:image:width'), '1200');
  assert.equal(meta(html, 'og:image:height'), '630');
  for (const key of ['og:image', 'twitter:image']) {
    const url = new URL(meta(html, key));
    assert.equal(url.origin, canonicalOrigin);
    const response = await get(url.pathname + url.search);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /image\/png/);
    const png = Buffer.from(await response.arrayBuffer());
    assert.equal(png.subarray(1, 4).toString(), 'PNG');
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
  }
});

test('unknown project URLs return a real 404', async () => {
  const response = await get('/projects/this-project-does-not-exist');
  assert.equal(response.status, 404);
});
