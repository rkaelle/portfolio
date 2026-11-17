import { randomUUID } from 'node:crypto';

// Read-only production probes: every query targets a random nonexistent ID.
// Never enumerate a collection or fetch an existing private document here.
const project = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
if (!project || !/^[a-z][a-z0-9-]{4,29}$/.test(project)) {
  throw new Error('Set NEXT_PUBLIC_FIREBASE_PROJECT_ID to the Firebase project to audit.');
}

const root = `projects/${project}/databases/(default)/documents`;
const probeId = `security-audit-nonexistent-${randomUUID()}`;
const checks = [];

for (const collection of ['emails', 'skydiving_bookings', '_access', 'security_audit_private']) {
  const response = await fetch(`https://firestore.googleapis.com/v1/${root}:runQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(20_000),
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: collection }],
        where: {
          fieldFilter: {
            field: { fieldPath: '__name__' },
            op: 'EQUAL',
            value: { referenceValue: `${root}/${collection}/${probeId}` },
          },
        },
        limit: 1,
      },
    }),
  });
  // Discard the response body: status alone is sufficient for this check.
  await response.arrayBuffer();
  checks.push({ collection, status: response.status, denied: response.status === 403 });
}

console.log(JSON.stringify({
  checkedAt: new Date().toISOString(),
  project,
  authenticated: false,
  checks,
  note: 'All queries must be denied. This does not audit writes, IAM, Storage, or actual-record access.',
}, null, 2));
if (checks.some((check) => !check.denied)) process.exitCode = 1;
