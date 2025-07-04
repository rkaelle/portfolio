'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import FadeInSection from './FadeInSection';
import '../styles/Footer.css';

function Footer() {
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

    useEffect(() => {
        if (message !== '') {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="Footer" id="newsletter">
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
                        <div className="message-container">
                            {message && (
                                <p className={`message ${message.includes("Successfully") ? 'success' : 'error'}`}>
                                    {message}
                                </p>
                            )}
                        </div>
                    </form>
                </FadeInSection>
            </div>
        </div>
    );
}

export default Footer; 