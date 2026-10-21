'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { inMemoryPersistence, isSignInWithEmailLink, sendSignInLinkToEmail, setPersistence, signInWithEmailLink, signOut } from 'firebase/auth';
import FadeInSection from '../components/FadeInSection';
import Link from 'next/link';
import '../styles/Manage.css';
import { motion } from 'framer-motion';
import { CommandLineIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import TypewriterText from '../components/TypewriterText';

function Manage() {
    const [inputs, setInputs] = useState({
        email: '',
        firstName: '',
        lastName: ''
    });
    const [message, setMessage] = useState('');
    const [busy, setBusy] = useState(false);
    const [confirmationLink, setConfirmationLink] = useState<string | null>(null);
    const confirmUnsubscribe = confirmationLink !== null;

    useEffect(() => {
        const link = window.location.href;
        if (isSignInWithEmailLink(auth, link)) {
            setConfirmationLink(link);
            // Keep the one-time code out of subsequent referrers and history.
            window.history.replaceState(null, '', '/manage');
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (busy) return;
        const email = inputs.email.trim().toLowerCase();
        const firstName = inputs.firstName.trim();
        const lastName = inputs.lastName.trim();
        if (!email || !firstName || !lastName) {
            setMessage('Please fill in all fields.');
            return;
        }

        setBusy(true);
        try {
            await addDoc(collection(db, "emails"), {
                firstName,
                lastName,
                email,
                time: serverTimestamp(),
            });
            setInputs({ email: '', firstName: '', lastName: '' });
            setMessage('Successfully subscribed!');
        } catch {
            setMessage('Failed to subscribe. Please try again later.');
        } finally {
            setBusy(false);
        }
    };

    const unsubscribeHandler = async () => {
        const email = inputs.email.trim().toLowerCase();
        if (!email) {
            setMessage('Please enter your email to unsubscribe.');
            return;
        }

        if (busy) return;
        setBusy(true);
        let verifiedSession = false;
        try {
            if (!confirmationLink) {
                await sendSignInLinkToEmail(auth, email, {
                    url: new URL('/manage', window.location.origin).toString(),
                    handleCodeInApp: true,
                });
                // Do not look up whether this email is subscribed.
                setMessage('Successfully sent your confirmation link. Check your inbox.');
                return;
            }

            await setPersistence(auth, inMemoryPersistence);
            const { user } = await signInWithEmailLink(auth, email, confirmationLink);
            verifiedSession = true;
            if (!user.emailVerified || user.email?.toLowerCase() !== email) {
                throw new Error('Email verification required');
            }
            // Firestore rules independently require a verified matching email.
            const q = query(collection(db, 'emails'), where('email', '==', email));
            const querySnapshot = await getDocs(q);
            await Promise.all(querySnapshot.docs.map((item) => deleteDoc(doc(db, 'emails', item.id))));

            setInputs({ email: '', firstName: '', lastName: '' });
            setMessage('Successfully unsubscribed!');
            setConfirmationLink(null);
            window.history.replaceState(null, '', '/manage');
        } catch {
            setConfirmationLink(null);
            setMessage('Unable to confirm your request. Please request a fresh link or contact Ryan.');
        } finally {
            if (verifiedSession) await signOut(auth).catch(() => {});
            setBusy(false);
        }
    };

    useEffect(() => {
        if (message !== '') {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="min-h-screen bg-[#111319] text-cyber-white overflow-hidden relative">
            {/* Terminal Header */}
            <div className="fixed top-0 left-0 w-full h-12 bg-tech-gray/80 backdrop-blur-sm border-b border-neon-blue/20 flex items-center px-4 font-tech z-50">
                <div className="flex items-center gap-2 text-neon-blue -ml-1">
                    <CommandLineIcon className="w-4 h-4" />
                    <span className="text-matrix-green">~</span>
                    <span>/</span>
                    <span>cd rkaelle/portfolio/</span>
                    <TypewriterText text="manage" prefix="" />
                </div>
            </div>

            {/* Return Home Button */}
            <Link 
                href="/"
                className="fixed top-16 left-8 py-2 px-4 bg-nord-polar-2/80 border border-neon-blue/30 rounded-sm text-neon-blue font-tech flex items-center gap-2 hover:bg-neon-blue/20 transition-colors z-50"
            >
                <ArrowLeftIcon className="w-4 h-4" /> Return Home
            </Link>

            {/* Background Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(76,86,106,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(76,86,106,0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />

            <div className="Manage">
                <div className="container">
                    <FadeInSection>
                        <form className="form" onSubmit={submitHandler}>
                            <h2 className="h2">Subscribe to Ryan's Daily News</h2>
                            <div className="name-inputs">
                                <input
                                    className="first"
                                    type="text"
                                    placeholder="Enter first name"
                                    name="firstName"
                                    maxLength={100}
                                    onChange={handleInputChange}
                                    value={inputs.firstName}
                                />
                                <input
                                    className="last"
                                    type="text"
                                    placeholder="Enter last name"
                                    name="lastName"
                                    maxLength={100}
                                    onChange={handleInputChange}
                                    value={inputs.lastName}
                                />
                            </div>
                            <input
                                className="input"
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                maxLength={254}
                                onChange={handleInputChange}
                                value={inputs.email}
                            />
                            <button className="Button" type="submit" disabled={busy}>Subscribe</button>
                            <button type="button" className="Button" onClick={unsubscribeHandler} disabled={busy}>
                                {busy ? 'Please wait…' : confirmUnsubscribe ? 'Confirm unsubscribe' : 'Email unsubscribe link'}
                            </button>
                            {confirmUnsubscribe && <p>Re-enter your email address, then confirm to unsubscribe.</p>}
                            {message && (
                                <p className={`message ${message.includes("Successfully") ? 'success' : 'error'}`}>
                                    {message}
                                </p>
                            )}
                        </form>
                    </FadeInSection>
                </div>
            </div>
        </div>
    );
}

export default Manage;
