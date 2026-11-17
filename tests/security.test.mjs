import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { securityHeaders } = require('../config/security.cjs');

test('production headers prohibit framing, plugins, MIME sniffing, and eval', () => {
  const headers = Object.fromEntries(securityHeaders(false).map(({ key, value }) => [key, value]));
  assert.equal(headers['X-Frame-Options'], 'DENY');
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(headers['Referrer-Policy'], 'strict-origin-when-cross-origin');
  assert.match(headers['Strict-Transport-Security'], /max-age=63072000/);
  for (const directive of ["default-src 'self'", "frame-ancestors 'none'", "object-src 'none'", "base-uri 'self'", "form-action 'self'"]) {
    assert.ok(headers['Content-Security-Policy'].includes(directive));
  }
  assert.ok(!headers['Content-Security-Policy'].includes('unsafe-eval'));
  assert.ok(headers['Content-Security-Policy'].includes('upgrade-insecure-requests'));
});

test('development CSP permits local tooling without forcing localhost to HTTPS', () => {
  const headers = Object.fromEntries(securityHeaders(true).map(({ key, value }) => [key, value]));
  assert.ok(headers['Content-Security-Policy'].includes("'unsafe-eval'"));
  assert.ok(!headers['Content-Security-Policy'].includes('upgrade-insecure-requests'));
  assert.equal(headers['Strict-Transport-Security'], undefined);
});

test('image optimization only accepts public gallery objects in the configured bucket', () => {
  const original = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 'test-bucket.firebasestorage.app';
  delete require.cache[require.resolve('../next.config.js')];
  try {
    const config = require('../next.config.js');
    assert.equal(config.poweredByHeader, false);
    assert.deepEqual(config.images.remotePatterns, [{
      protocol: 'https', hostname: 'firebasestorage.googleapis.com', port: '',
      pathname: '/v0/b/test-bucket.firebasestorage.app/o/photos%2F**',
    }]);
    assert.equal(config.images.dangerouslyAllowSVG, false);
    assert.deepEqual(config.images.formats, ['image/webp']);
    const { hasRemoteMatch } = require('next/dist/shared/lib/match-remote-pattern.js');
    const allows = (path) => hasRemoteMatch([], config.images.remotePatterns, new URL(`https://firebasestorage.googleapis.com/v0/b/test-bucket.firebasestorage.app/o/${path}`));
    assert.ok(allows('photos%2Fpublic.jpg?alt=media&token=public-gallery-token'));
    assert.ok(!allows('private%2Fdocument?alt=media&token=private-token'));
    assert.ok(!allows('photos-other%2Fpicture.jpg'));
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    else process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = original;
    delete require.cache[require.resolve('../next.config.js')];
  }
});
