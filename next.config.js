/** @type {import('next').NextConfig} */
const { securityHeaders } = require('./config/security.cjs');

const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? [{
      protocol: 'https',
      hostname: 'firebasestorage.googleapis.com',
      port: '',
      pathname: `/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/photos%2F**`,
    }] : [],
    formats: ['image/webp'],
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders(process.env.NODE_ENV === 'development') },
      { source: '/upload/:path*', headers: [{ key: 'Referrer-Policy', value: 'no-referrer' }] },
      { source: '/manage/:path*', headers: [{ key: 'Referrer-Policy', value: 'no-referrer' }] },
    ];
  },
}

module.exports = nextConfig
