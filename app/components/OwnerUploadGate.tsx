'use client';

import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { inMemoryPersistence, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { doc, getDocFromServer } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

type Access =
  | { state: 'signed-out' | 'checking' | 'denied' }
  | { state: 'authorized'; user: User };

export default function OwnerUploadGate({ children }: { children: (user: User) => ReactNode }) {
  const [access, setAccess] = useState<Access>({ state: 'signed-out' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let revision = 0;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const current = ++revision;
      if (!user) {
        setAccess({ state: 'signed-out' });
        return;
      }
      setAccess({ state: 'checking' });
      // The same UID check is independently enforced by Firestore/Storage rules.
      // Fetch from the server so cached access does not authorize the form.
      void getDocFromServer(doc(db, '_access', 'uploadOwner')).then((snapshot) => {
        if (current !== revision) return;
        setAccess(snapshot.exists() && snapshot.data().uid === user.uid
          ? { state: 'authorized', user }
          : { state: 'denied' });
      }).catch(() => {
        if (current === revision) setAccess({ state: 'denied' });
      });
    });
    return () => { revision++; unsubscribe(); };
  }, []);

  async function logIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      await setPersistence(auth, inMemoryPersistence);
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setError('Unable to sign in. Check your credentials and try again.');
    } finally {
      setPassword('');
      setBusy(false);
    }
  }

  async function logOut() {
    setError('');
    setBusy(true);
    try {
      await signOut(auth);
      setAccess({ state: 'signed-out' });
    } catch {
      setError('Unable to sign out. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  if (access.state === 'authorized') {
    return (
      <>
        <button type="button" disabled={busy} onClick={() => { void logOut(); }} className="fixed top-16 right-4 md:right-8 z-[60] px-4 py-2 rounded-sm border border-neon-blue/30 bg-cyber-black text-neon-blue font-tech text-sm disabled:opacity-50">
          Sign out
        </button>
        {error && <p role="alert" className="fixed top-28 right-4 z-[60] text-nord-aurora-1 font-tech text-sm">{error}</p>}
        {children(access.user)}
      </>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#111319] text-cyber-white px-6 py-16">
      <div className="max-w-md w-full border border-neon-blue/20 bg-tech-gray/30 rounded-sm p-8 space-y-6">
        <p className="font-tech text-matrix-green text-sm">/ upload</p>
        <h1 className="font-cyber text-3xl text-neon-blue">Owner sign-in</h1>
        <p className="font-tech text-sm text-cyber-white/70">This upload page is private.</p>
        {access.state === 'checking' ? (
          <p role="status" className="font-tech text-sm">Checking access…</p>
        ) : access.state === 'denied' ? (
          <div className="space-y-4">
            <p role="alert" className="text-sm text-cyber-white/70">This account does not have upload access.</p>
            <button type="button" disabled={busy} onClick={() => { void logOut(); }} className="text-neon-blue font-tech text-sm hover:underline disabled:opacity-50">Sign out</button>
          </div>
        ) : (
          <form onSubmit={logIn} className="space-y-5">
            <div>
              <label htmlFor="owner-email" className="block font-tech text-sm mb-2">Email</label>
              <input id="owner-email" type="email" autoComplete="username" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-cyber-black border border-neon-blue/30 rounded-sm px-3 py-2 focus:outline-none focus:border-neon-blue" />
            </div>
            <div>
              <label htmlFor="owner-password" className="block font-tech text-sm mb-2">Password</label>
              <input id="owner-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-cyber-black border border-neon-blue/30 rounded-sm px-3 py-2 focus:outline-none focus:border-neon-blue" />
            </div>
            <button type="submit" disabled={busy} className="w-full border border-neon-blue/40 bg-neon-blue/10 rounded-sm py-3 text-neon-blue font-tech disabled:opacity-50">{busy ? 'Signing in…' : 'Sign in'}</button>
          </form>
        )}
        {error && <p role="alert" className="text-sm text-nord-aurora-1">{error}</p>}
        <Link href="/" className="inline-block text-neon-blue font-tech text-sm hover:underline">← Return home</Link>
      </div>
    </main>
  );
}
