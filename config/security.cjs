function securityHeaders(isDevelopment = false) {
  // Static Next.js pages require inline hydration scripts. Keep unsafe-eval
  // development-only, and limit network access to the services this site uses.
  const policy = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com/recaptcha/ https://www.recaptcha.net/recaptcha/ https://www.gstatic.com/recaptcha/`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://firebasestorage.googleapis.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
    "font-src 'self'",
    "connect-src 'self' https://api.github.com https://firestore.googleapis.com https://firebasestorage.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firebaseinstallations.googleapis.com https://firebaseappcheck.googleapis.com https://content-firebaseappcheck.googleapis.com https://recaptchaenterprise.googleapis.com https://www.google.com/recaptcha/ https://www.recaptcha.net/recaptcha/ https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.vercel-insights.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "frame-src https://www.google.com/recaptcha/ https://www.recaptcha.net/recaptcha/ https://recaptcha.google.com/recaptcha/",
    ...(!isDevelopment ? ['upgrade-insecure-requests'] : []),
  ].join('; ');

  return [
    { key: 'Content-Security-Policy', value: policy },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
    ...(!isDevelopment ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000' }] : []),
  ];
}

module.exports = { securityHeaders };
