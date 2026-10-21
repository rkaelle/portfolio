# Security changes and deployment requirements

## Implemented in the application

- Next.js 16.4.2, React 19.3.1, and Firebase 13.1.0 replace the outdated releases.
- npm is the package manager; `package-lock.json` is the single lockfile. Use Node.js 24 (`nvm use`).
- A same-major override updates Firebase's pinned gRPC dependency to a patched release. Recheck it when updating Firebase.
- Browser headers block embedding, MIME sniffing, plugins, and unexpected network destinations. Production CSP prohibits `eval`. Inline scripts remain allowed for statically generated Next.js hydration; this is not a nonce-based XSS defense.
- Image optimization is limited to HTTPS gallery objects under `photos/` in the configured Firebase bucket. SVG optimization is disabled.
- Unsubscribe requests use Firebase email-link verification. Only after completing the link does the browser query/delete that verified address's subscriptions. The response to sending a link does not disclose subscription status, and sessions remain in memory.
- Analytics are excluded from `/manage` and `/upload`. These pages send no referrer, and email-link credentials are removed from the address bar after loading and kept only in memory until confirmation.
- File selection and submission reject empty files, files larger than 5 MB, unsupported MIME types, and mismatched PNG/JPEG/PDF signatures. These are user feedback checks; a browser can bypass them, so they do not replace backend enforcement.
- `/upload` requires email/password sign-in and a server-fetched owner access record. The form is not rendered until that account's Firebase UID matches the one owner record, and it is unmounted on sign-out. Sessions remain in memory and there is no sign-up flow.
- Firestore and Storage rules enforce the same owner UID independently. Booking fields are validated, upload sizes/MIME types and filenames are bounded, and uploads must reference an owner-created booking. New records store private Storage paths rather than shareable download URLs.
- App Check initialization is wired to `NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY`. It remains inactive until a real registered key is configured, and protection requires enforcement in Firebase.

## Firebase changes are not deployed

No authenticated Firebase CLI session or deployed rules were available during this work. The checked-in rules were tested with synthetic records in local Firestore and Storage emulators. They have not changed production permissions.

Before deployment:

1. Export and review the existing Firestore and Storage rules. Merge any rules needed by other apps sharing this project; these files otherwise deny access to unmatched paths.
2. `/upload` is **owner-only**. In Firebase Authentication, identify the owner's existing Email/Password account (or manually create that one account), and copy its UID. Deploy the reviewed Firestore/Storage rules **before** configuring access, then use the Firebase Console or a trusted Admin SDK to set Firestore document `_access/uploadOwner` to `{ uid: <that exact Firebase UID> }`. No email-based wildcard or public sign-up grants access. Browser clients, including the owner, cannot create or change this document. Access stays denied while it is missing. The Storage rules' Firestore lookup also requires the Firebase Storage service agent's cross-service permissions; Firebase prompts for them when enabling this feature. Do not overwrite unrelated rules or grant public access to identity paths.
3. Enable Firebase Authentication's Email/Password provider and **Email link (passwordless sign-in)**. Add the production domain to Authorized domains and verify the email template/action links. Confirm unsubscribe end to end with a test address. No live verification emails were sent during local tests.
4. New subscriptions are normalized to lowercase. Existing mixed-case addresses need a trusted normalization/deduplication migration before relying on exact email queries; no existing subscriber data was modified.
5. Register this web app with Firebase App Check's reCAPTCHA Enterprise provider. Set the public site key in deployment environment variables. After confirming legitimate requests receive valid tokens, enable enforcement for Firestore and Storage. Public create access alone is not spam prevention; monitor usage and billing and add a rate-limited ingestion service if needed.
6. Review previously stored `headshotUrl`/`signatureUrl` values and existing Storage download tokens through trusted admin access. Existing shared download URLs may need token revocation; new rules alone do not revoke them. New submissions use `headshotPath`/`signaturePath`; adapt any external administrative tooling to read those private paths using authorized access. No live identity records or files were read during this work.
7. Deploy the application and reviewed rules together after those prerequisites are satisfied. Verify anonymous subscriber reads/deletes and private file reads are denied in production without retrieving real private records.

## Checks

Run `npm run test:security` for header configuration, image restrictions, and upload validation. After `npm run build` and `npm start`, run `npm run test:seo` and `npm run test:security:http` against the built site. Override the local origin with `SEO_BASE_URL` if using a different port.

Rules tests require Java 21+ and the Firebase CLI:

```sh
npx firebase-tools emulators:exec --project demo-portfolio-security --only firestore,storage "npm run test:rules"
```

The rules tests require emulator environment variables and cannot silently fall back to production. They cover subscriber ownership, anonymous access, schema validation, gallery immutability, owner-only identity access, owner configuration tampering, and upload restrictions. The HTTP checks confirm that anonymous visitors receive sign-in rather than the identity form.

`npm audit --omit=dev` checks the production dependency tree. Tailwind 3's build-time dependency chain still has development-only advisories, including an unpatched brace-parser denial of service. It parses trusted source/configuration during builds; it does not run in deployed request handlers. Addressing that remaining chain requires a Tailwind major migration and visual regression checks.
