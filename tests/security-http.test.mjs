import assert from 'node:assert/strict';
import { test } from 'node:test';

const baseURL = process.env.SEO_BASE_URL || 'http://127.0.0.1:3000';

test('production pages return the configured browser security protections', async () => {
  for (const path of ['/', '/projects', '/projects/hill-street-planes', '/gallery', '/manage', '/upload']) {
    const response = await fetch(new URL(path, baseURL));
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get('x-frame-options'), 'DENY', path);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff', path);
    const policy = response.headers.get('content-security-policy');
    assert.ok(policy?.includes("frame-ancestors 'none'"), path);
    assert.ok(policy.includes("object-src 'none'"), path);
    assert.ok(!policy.includes('unsafe-eval'), path);
    assert.ok(!response.headers.has('x-powered-by'), path);
    const privatePage = path === '/upload' || path === '/manage';
    assert.equal(response.headers.get('referrer-policy'), privatePage ? 'no-referrer' : 'strict-origin-when-cross-origin');
    const html = await response.text();
    if (privatePage) {
      assert.ok(!html.includes('www.googletagmanager.com/gtag/js'), path);
      assert.ok(!html.includes('/_vercel/insights/script.js'), path);
    }
  }
});

test('image optimizer rejects external origins and non-gallery Firebase paths', async () => {
  for (const imageURL of [
    'https://example.com/untrusted.png',
    'https://firebasestorage.googleapis.com/v0/b/another-bucket/o/photos%2Fpublic.png',
  ]) {
    const url = new URL('/_next/image', baseURL);
    url.search = new URLSearchParams({ url: imageURL, w: '640', q: '75' }).toString();
    const response = await fetch(url);
    assert.equal(response.status, 400);
    await response.arrayBuffer();
  }
});

test('the anonymous upload response renders sign-in without exposing the identity form', async () => {
  const response = await fetch(new URL('/upload', baseURL));
  assert.equal(response.status, 200);
  const html = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  assert.ok(html.includes('Owner sign-in'));
  assert.ok(html.includes('type="password"'));
  assert.ok(!html.includes('Submit Booking'));
  assert.ok(!html.includes('Driver'));
  assert.ok(!html.includes('Photo Uploads'));
});
