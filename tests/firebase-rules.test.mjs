import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { after, before, beforeEach, test } from 'node:test';
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { getBytes, listAll, ref, uploadBytes } from 'firebase/storage';

// Never allow these tests to fall back to a real Firebase project.
assert.ok(process.env.FIRESTORE_EMULATOR_HOST && process.env.FIREBASE_STORAGE_EMULATOR_HOST, 'Run through the Firebase emulators');
let environment;

before(async () => {
  environment = await initializeTestEnvironment({
    projectId: 'demo-portfolio-security',
    firestore: { rules: await readFile(new URL('../firebase/firestore.rules', import.meta.url), 'utf8') },
    storage: { rules: await readFile(new URL('../firebase/storage.rules', import.meta.url), 'utf8') },
  });
});
after(async () => { await environment?.cleanup(); });
beforeEach(async () => { await environment.clearFirestore(); await environment.clearStorage(); });

const subscription = (email = 'owner@example.com') => ({ firstName: 'Test', lastName: 'Subscriber', email, time: serverTimestamp() });
const ownerUid = 'upload-owner';
const booking = () => ({
  ownerUid,
  contact: { type: 'phone', value: '555-0100' },
  name: { first: 'Test', middle: '', last: 'Person' },
  gender: 'Prefer not to say', eyeColor: 'Brown', hairColor: 'Black',
  dob: '1990-01-01', height: '5-10', weight: '150',
  address: { state: '', street: '', city: '', zip: '' },
  driversLicense: { number: '', issueDate: '' },
  organDonor: false, moreThanTwoJumps: null, paid: false,
  submittedAt: serverTimestamp(),
});

async function configureOwner() {
  await environment.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), '_access', 'uploadOwner'), { uid: ownerUid });
  });
}

test('anonymous subscription creation validates fields and cannot read, edit, or delete subscribers', async () => {
  const db = environment.unauthenticatedContext().firestore();
  const record = doc(db, 'emails', 'subscriber');
  await assertSucceeds(setDoc(record, subscription()));
  await assertFails(getDoc(record));
  await assertFails(getDocs(query(collection(db, 'emails'), where('email', '==', 'owner@example.com'))));
  await assertFails(updateDoc(record, { email: 'attacker@example.com' }));
  await assertFails(deleteDoc(record));
  for (const invalid of [
    { ...subscription(), admin: true },
    { ...subscription(), email: 'not-an-email' },
    { ...subscription(), email: 'Owner@example.com' },
    { ...subscription(), firstName: 'a'.repeat(101) },
    { ...subscription(), time: 'forged' },
  ]) {
    await assertFails(setDoc(doc(collection(db, 'emails')), invalid));
  }
});

test('only a verified owner can query and delete their own subscription', async () => {
  await environment.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), 'emails', 'owner'), subscription());
    await setDoc(doc(context.firestore(), 'emails', 'other'), subscription('other@example.com'));
  });
  const unverified = environment.authenticatedContext('owner', { email: 'owner@example.com', email_verified: false }).firestore();
  await assertFails(getDoc(doc(unverified, 'emails', 'owner')));
  await assertFails(deleteDoc(doc(unverified, 'emails', 'owner')));
  const attacker = environment.authenticatedContext('attacker', { email: 'attacker@example.com', email_verified: true }).firestore();
  await assertFails(getDoc(doc(attacker, 'emails', 'owner')));
  await assertFails(deleteDoc(doc(attacker, 'emails', 'owner')));
  const owner = environment.authenticatedContext('owner', { email: 'owner@example.com', email_verified: true }).firestore();
  await assertSucceeds(getDocs(query(collection(owner, 'emails'), where('email', '==', 'owner@example.com'))));
  await assertFails(getDocs(collection(owner, 'emails')));
  await assertFails(getDoc(doc(owner, 'emails', 'other')));
  await assertSucceeds(deleteDoc(doc(owner, 'emails', 'owner')));
});

test('identity documents cannot be read, listed, or written by web clients', async () => {
  await environment.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), 'skydiving_bookings', 'private'), { name: 'Private' });
  });
  for (const context of [environment.unauthenticatedContext(), environment.authenticatedContext('visitor')]) {
    const db = context.firestore();
    await assertFails(getDoc(doc(db, 'skydiving_bookings', 'private')));
    await assertFails(getDocs(collection(db, 'skydiving_bookings')));
    await assertFails(setDoc(doc(db, 'skydiving_bookings', 'forged'), { paid: true }));
  }
});

test('upload access fails closed when no owner is configured', async () => {
  const owner = environment.authenticatedContext(ownerUid).firestore();
  await assertFails(getDoc(doc(owner, '_access', 'uploadOwner')));
  await assertFails(setDoc(doc(owner, 'skydiving_bookings', 'booking'), booking()));
  await assertFails(uploadBytes(ref(environment.authenticatedContext(ownerUid).storage(), 'skydiving/booking/headshot'), new Uint8Array([1]), {
    contentType: 'image/png', customMetadata: { ownerUid },
  }));
});

test('the single owner configuration cannot be claimed or changed by web clients', async () => {
  await configureOwner();
  const owner = environment.authenticatedContext(ownerUid).firestore();
  await assertSucceeds(getDoc(doc(owner, '_access', 'uploadOwner')));
  await assertFails(setDoc(doc(owner, '_access', 'uploadOwner'), { uid: 'replacement' }));
  await assertFails(deleteDoc(doc(owner, '_access', 'uploadOwner')));
  for (const context of [environment.unauthenticatedContext(), environment.authenticatedContext('visitor', { email: 'owner@example.com', admin: true })]) {
    const db = context.firestore();
    await assertFails(getDoc(doc(db, '_access', 'uploadOwner')));
    await assertFails(getDocs(collection(db, '_access')));
    await assertFails(setDoc(doc(db, '_access', 'uploadOwner'), { uid: 'visitor' }));
  }
});

test('only the configured UID can create and manage identity submissions', async () => {
  await configureOwner();
  const owner = environment.authenticatedContext(ownerUid).firestore();
  const record = doc(owner, 'skydiving_bookings', 'booking');
  await assertSucceeds(setDoc(record, booking()));
  await assertSucceeds(getDoc(record));
  await assertSucceeds(getDocs(collection(owner, 'skydiving_bookings')));
  await assertSucceeds(updateDoc(record, {
    headshotPath: 'skydiving/booking/headshot', signaturePath: 'skydiving/booking/signature',
  }));
  await assertFails(updateDoc(record, { paid: true }));
  await assertFails(updateDoc(record, { ownerUid: 'visitor' }));
  await assertFails(updateDoc(record, { headshotPath: 'https://example.com/shared-file' }));
  for (const invalid of [
    { ...booking(), ownerUid: 'visitor' }, { ...booking(), paid: true },
    { ...booking(), name: { first: 'a'.repeat(101), middle: '', last: 'Person' } },
    { ...booking(), unexpected: 'field' },
    { ...booking(), headshotUrl: 'https://example.com/shared-file' },
  ]) {
    await assertFails(setDoc(doc(collection(owner, 'skydiving_bookings')), invalid));
  }
  for (const context of [environment.unauthenticatedContext(), environment.authenticatedContext('visitor', { email: 'owner@example.com', email_verified: true })]) {
    const db = context.firestore();
    await assertFails(getDoc(doc(db, 'skydiving_bookings', 'booking')));
    await assertFails(setDoc(doc(db, 'skydiving_bookings', 'forged'), booking()));
    await assertFails(deleteDoc(doc(db, 'skydiving_bookings', 'booking')));
  }
  await assertSucceeds(deleteDoc(record));
});

test('owner uploads enforce size, MIME type, metadata, filenames, and booking ownership', async () => {
  await configureOwner();
  const owner = environment.authenticatedContext(ownerUid);
  await assertSucceeds(setDoc(doc(owner.firestore(), 'skydiving_bookings', 'booking'), booking()));
  const storage = owner.storage();
  const metadata = { contentType: 'image/png', customMetadata: { ownerUid } };
  const file = ref(storage, 'skydiving/booking/headshot');
  await assertSucceeds(uploadBytes(file, new Uint8Array([1, 2, 3]), metadata));
  await assertSucceeds(getBytes(file));
  await assertFails(uploadBytes(file, new Uint8Array(), metadata));
  await assertFails(uploadBytes(file, new Uint8Array(5 * 1024 * 1024 + 1), metadata));
  await assertFails(uploadBytes(file, new Uint8Array([1]), { ...metadata, contentType: 'image/svg+xml' }));
  await assertFails(uploadBytes(file, new Uint8Array([1]), { ...metadata, customMetadata: { ownerUid: 'visitor' } }));
  await assertFails(uploadBytes(ref(storage, 'skydiving/booking/arbitrary-file'), new Uint8Array([1]), metadata));
  await assertFails(uploadBytes(ref(storage, 'skydiving/missing/headshot'), new Uint8Array([1]), metadata));
  for (const context of [environment.unauthenticatedContext(), environment.authenticatedContext('visitor')]) {
    await assertFails(getBytes(ref(context.storage(), 'skydiving/booking/headshot')));
    await assertFails(uploadBytes(ref(context.storage(), 'skydiving/booking/signature'), new Uint8Array([1]), metadata));
  }
});

test('gallery objects are public and immutable; identity uploads are private', async () => {
  await environment.withSecurityRulesDisabled(async (context) => {
    await uploadBytes(ref(context.storage(), 'photos/public.png'), new Uint8Array([1, 2, 3]));
    await uploadBytes(ref(context.storage(), 'skydiving/private/headshot'), new Uint8Array([4, 5, 6]));
  });
  const storage = environment.unauthenticatedContext().storage();
  await assertSucceeds(getBytes(ref(storage, 'photos/public.png')));
  await assertSucceeds(listAll(ref(storage, 'photos')));
  await assertFails(uploadBytes(ref(storage, 'photos/overwrite.png'), new Uint8Array([0])));
  await assertFails(getBytes(ref(storage, 'skydiving/private/headshot')));
  await assertFails(listAll(ref(storage, 'skydiving')));
  await assertFails(uploadBytes(ref(storage, 'skydiving/private/forged'), new Uint8Array([0])));
});
