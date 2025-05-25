'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, firstName, lastName } = inputs;
        if (!email || !firstName || !lastName) {
            setMessage('Please fill in all fields.');
            return;
        }

        try {
            await addDoc(collection(db, "emails"), {
                firstName,
                lastName,
                email,
                time: serverTimestamp(),
            });
            setInputs({ email: '', firstName: '', lastName: '' });
            setMessage('Successfully subscribed!');
        } catch (error) {
            console.error("Error adding document: ", error);
            setMessage('Failed to subscribe. Please try again later.');
        }
    };

    const unsubscribeHandler = async () => {
        const { email } = inputs;
        if (!email) {
            setMessage('Please enter your email to unsubscribe.');
            return;
        }

        try {
            const q = query(collection(db, "emails"), where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setMessage('Email not found.');
                return;
            }

            querySnapshot.forEach(async (docSnapshot) => {
                await deleteDoc(doc(db, "emails", docSnapshot.id));
            });

            setInputs({ email: '', firstName: '', lastName: '' });
            setMessage('Successfully unsubscribed!');
        } catch (error) {
            console.error("Error removing document: ", error);
            setMessage('Failed to unsubscribe. Please try again later.');
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
        <div className="min-h-screen bg-cyber-black text-cyber-white">
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
                                    onChange={handleInputChange}
                                    value={inputs.firstName}
                                />
                                <input
                                    className="last"
                                    type="text"
                                    placeholder="Enter last name"
                                    name="lastName"
                                    onChange={handleInputChange}
                                    value={inputs.lastName}
                                />
                            </div>
                            <input
                                className="input"
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={handleInputChange}
                                value={inputs.email}
                            />
                            <button className="Button" type="submit">Submit</button>
                            <button type="button" className="Button" onClick={unsubscribeHandler}>Unsubscribe</button>
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