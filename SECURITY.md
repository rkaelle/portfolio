# Security policy and deployment

## Reporting an issue

Please use the repository's GitHub private vulnerability reporting feature when available. If it is unavailable, contact the maintainer through a verified contact channel listed at rkaelle.com. Do not put credentials, subscriber details, or sensitive attachments in public issues.

## Public repository boundaries

Application source, dependency lockfiles, Firebase rules, security tests, and the empty `.env.example` belong in Git. Local environment files, service-account credentials, cloud CLI state, logs, and detailed audit reports do not. `.gitignore` prevents accidental additions; it does not remove files from previous commits. If a credential is exposed, revoke/rotate it before considering a history cleanup.

Firebase web-app configuration is public by design. `NEXT_PUBLIC_*` values are embedded in browser JavaScript. Never use that prefix for administrative secrets. All assets under `public/` are public, regardless of authentication elsewhere in the application.

## Firebase access policy

| Resource | Browser access |
|---|---|
| Firestore `emails` | Create validated subscriptions; no anonymous reads, updates, or deletes |
| Own subscription | A verified-email session can query/delete only records matching its token email |
| Other Firestore paths | Denied |
| Storage `photos/` | Public read/list; no browser writes |
| Other Storage paths | Denied |

The checked-in rules implement this policy. They are deployed independently from Vercel. Trusted Daily News jobs using an Admin SDK are authorized through IAM; do not grant public subscriber reads to accommodate a sender. Review shared-project requirements and least-privilege service-account access before changing rules.

Newsletter unsubscribe requires Firebase email-link authentication, authorized application domains, and a working email action template. New subscriptions are lowercased. Historical mixed-case addresses may require trusted normalization/deduplication before exact-match unsubscribe queries work. Test delivery and unsubscribe using a test address after authentication or rule changes.

## Deploying rules

Export/review the active rules first and run the emulator tests. Then deploy the reviewed files to an explicitly selected project:

```sh
firebase deploy --project YOUR_PROJECT_ID --only firestore:rules,storage
```

Set the local Firebase project in `.env.local` and verify anonymous reads after deployment:

```sh
npm run audit:firebase
```

This read-only check constrains every query to a random nonexistent document ID. All queries must return HTTP 403. It does not prove write restrictions, Storage permissions, IAM, or access-log status. Review those separately through authenticated admin access. Never run destructive tests against production.

Retired records/files remain private under the default-deny rules, but removing application code does not delete data or invalidate existing shareable Storage download tokens. Review retention and revoke sensitive download tokens through trusted administrative access when appropriate.

## Abuse controls and application defenses

- Newsletter signup permits schema-validated anonymous creates. Rules do not provide per-IP rate limiting or verify the submitting address. Review confirmed subscriptions, duplicate handling, quotas, and billing alerts as additional controls.
- App Check initialization requires `NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY`. Register the app, validate legitimate traffic, then enable enforcement. Enabling enforcement before the client is configured can break the gallery and subscriptions. App Check supplements authorization.
- Security headers restrict embedding, MIME sniffing, plugins, network destinations, and powerful browser APIs. Production CSP prohibits eval but allows inline hydration scripts; strict nonce/hash enforcement is not implemented.
- Image optimization accepts only HTTPS gallery objects in the configured Firebase bucket. SVG optimization is disabled.
- `/manage` excludes analytics and sends no referrer. One-time unsubscribe credentials are removed from the address bar and held in memory; email-link sessions use memory-only persistence.
- Keep Next.js, React, Firebase, and build tools patched. Use `npm audit --omit=dev` for production packages and `npm audit` for the full tree; evaluate advisories against actual application usage.

## Verification

Use Node.js 24 and the committed npm lockfile:

```sh
npm ci
npm run test:security
npm run build
npm start
```

In another terminal, run `npm run test:seo` and `npm run test:security:http`. Set `SEO_BASE_URL` for a different local port.

Firebase rules tests require Java 21+ and the Firebase CLI:

```sh
firebase emulators:exec --project demo-portfolio-security --only firestore,storage "npm run test:rules"
```

The rules suite refuses to run without emulator environment variables. It checks subscription schema/ownership, denied private paths, immutable public gallery objects, and denied non-gallery Storage paths.
