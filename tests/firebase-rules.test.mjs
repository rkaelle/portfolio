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

test('all non-newsletter documents deny reads and writes, including retired data and owner config', async () => {
  const paths = ['skydiving_bookings/private', '_access/uploadOwner', 'private/record'];
  await environment.withSecurityRulesDisabled(async (context) => {
    for (const path of paths) await setDoc(doc(context.firestore(), path), { private: true });
  });
  for (const context of [
    environment.unauthenticatedContext(),
    environment.authenticatedContext('former-owner', { email: 'owner@example.com', email_verified: true, admin: true }),
  ]) {
    const db = context.firestore();
    for (const path of paths) {
      const record = doc(db, path);
      await assertFails(getDoc(record));
      await assertFails(getDocs(collection(db, path.split('/')[0])));
      await assertFails(setDoc(record, { replaced: true }));
      await assertFails(deleteDoc(record));
    }
  }
});

test('gallery objects are public and immutable; every other storage path is denied', async () => {
  await environment.withSecurityRulesDisabled(async (context) => {
    await uploadBytes(ref(context.storage(), 'photos/public.png'), new Uint8Array([1, 2, 3]));
    await uploadBytes(ref(context.storage(), 'skydiving/private/headshot'), new Uint8Array([4, 5, 6]));
    await uploadBytes(ref(context.storage(), 'private/document'), new Uint8Array([4, 5, 6]));
  });
  for (const context of [environment.unauthenticatedContext(), environment.authenticatedContext('former-owner')]) {
    const storage = context.storage();
    await assertSucceeds(getBytes(ref(storage, 'photos/public.png')));
    await assertSucceeds(listAll(ref(storage, 'photos')));
    await assertFails(uploadBytes(ref(storage, 'photos/public.png'), new Uint8Array([0])));
    await assertFails(uploadBytes(ref(storage, 'photos/new.png'), new Uint8Array([0])));
    for (const path of ['skydiving/private/headshot', 'private/document']) {
      await assertFails(getBytes(ref(storage, path)));
      await assertFails(uploadBytes(ref(storage, path), new Uint8Array([0])));
      await assertFails(listAll(ref(storage, path.split('/')[0])));
    }
  }
});
