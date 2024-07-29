import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import { auth } from '../components/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/LoginPage.css'; 
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Logged in:', userCredential.user);
        history.push('/upload'); 
      })
      .catch(error => {
        console.error('Login error:', error);
        setError('Invalid email or password.');
      });
  };

  return (
    <div className="Manage">
      <div className="form">
        <h2 className="h2">Login</h2>
        <div className="message-container">
          {error && <div className="message error">{error}</div>}
        </div>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="input"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="input"
        />
        <button onClick={handleLogin} className="Button">Login</button>
      </div>
    </div>
  );
};

export default LoginPage;