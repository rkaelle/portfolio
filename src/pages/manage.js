import { useState, useEffect } from 'react';
import "../styles/Manage.css";
import { db } from '../components/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import FadeInSection from "../components/FadeInSection";
import SidebarNav from '../components/SidebarNav';
import { Link } from "react-router-dom";



function Manage() {
    const [inputs, setInputs] = useState({
        email: '',
        firstName: '',
        lastName: ''
    });
    const [message, setMessage] = useState('');

    // Handle input changes for all fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    // Submit handler for form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        const { email, firstName, lastName } = inputs;
        if (!email || !firstName || !lastName) {
            setMessage('Please fill in all fields.');
            return; // Stop the function if any field is missing
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

    // Clear message after 5 seconds
    useEffect(() => {
        if (message !== '') {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div> {/* Added this div to enclose all content */}
            <div className="top-left-button">
                <Link to="/" className="home-button">&lt;&lt; return home</Link>
            </div>
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
                            {message && (<p className={`message ${message.includes("Successfully") ? 'success' : 'error'}`}>{message}</p>)}
                        </form>
                    </FadeInSection>
                </div>
                <SidebarNav />
            </div>
        </div> // Closing tag for the
    );
}

export default Manage;