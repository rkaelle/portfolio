import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequire } from 'node:module';
import { MAX_UPLOAD_BYTES, validateUpload } from '../app/lib/upload-validation.ts';

const require = createRequire(import.meta.url);
const { securityHeaders } = require('../config/security.cjs');

test('uploads reject oversized files, empty files, SVG, and forged content types', async () => {
  await assert.rejects(validateUpload(new File([], 'empty.png', { type: 'image/png' })), /non-empty/);
  await assert.rejects(validateUpload(new File([new Uint8Array(MAX_UPLOAD_BYTES + 1)], 'large.png', { type: 'image/png' })), /5 MB/);
  await assert.rejects(validateUpload(new File(['<svg onload="alert(1)"></svg>'], 'picture.svg', { type: 'image/svg+xml' })), /PNG, JPG, or PDF/);
  await assert.rejects(validateUpload(new File(['<script>alert(1)</script>'], 'picture.png', { type: 'image/png' })), /matches its file type/);
});

test('uploads accept JPEG, PNG, and PDF signatures', async () => {
  for (const [type, signature] of [
    ['image/jpeg', [0xff, 0xd8, 0xff, 0xe0]],
    ['image/png', [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
    ['application/pdf', [0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37]],
  ]) {
    await validateUpload(new File([new Uint8Array(signature)], 'test-file', { type }));
  }
});

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
    assert.ok(!allows('skydiving%2Fprivate%2Fheadshot?alt=media&token=private-token'));
    assert.ok(!allows('photos-other%2Fpicture.jpg'));
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    else process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = original;
    delete require.cache[require.resolve('../next.config.js')];
  }
});
