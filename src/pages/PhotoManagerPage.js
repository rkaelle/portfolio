// src/pages/PhotoManagerPage.jsx
import React, { useState, useEffect } from 'react';
import { auth, storage } from '../components/firebase';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import '../styles/PhotoManagerPage.css'; // Create this CSS file for styling

const PhotoManagerPage = () => {
  // Authentication States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [user, setUser] = useState(null);

  // Photo Management States
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [photoError, setPhotoError] = useState('');

  const photosRef = ref(storage, 'mom_dad_photos');

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchPhotos();
      } else {
        setPhotos([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch photos from Firebase Storage
  const fetchPhotos = () => {
    setLoadingPhotos(true);
    listAll(photosRef)
      .then((res) => {
        const promises = res.items.map((itemRef) =>
          getDownloadURL(itemRef).then((url) => ({
            name: itemRef.name,
            url,
          }))
        );
        return Promise.all(promises);
      })
      .then((photos) => {
        setPhotos(photos);
        setLoadingPhotos(false);
      })
      .catch((error) => {
        console.error('Error fetching photos:', error);
        setPhotoError('Failed to load photos.');
        setLoadingPhotos(false);
      });
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Logged in:', userCredential.user);
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        console.error('Login error:', error);
        setAuthError('Invalid email or password.');
      });
  };

  // Handle Logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out.');
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  // Handle File Upload
  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      setUploadError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setUploadError('');
    setUploadSuccess(false);

    const fileRef = ref(photosRef, file.name);
    uploadBytes(fileRef, file)
      .then((snapshot) => {
        console.log('Uploaded file:', snapshot);
        setUploadSuccess(true);
        setFile(null);
        fetchPhotos(); // Refresh photo list
      })
      .catch((error) => {
        console.error('Upload error:', error);
        setUploadError('Failed to upload file.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  // Handle Photo Deletion
  const handleDelete = (photoName) => {
    const fileRef = ref(photosRef, photoName);
    deleteObject(fileRef)
      .then(() => {
        console.log('Deleted file:', photoName);
        fetchPhotos(); // Refresh photo list
      })
      .catch((error) => {
        console.error('Delete error:', error);
        setPhotoError('Failed to delete photo.');
      });
  };

  return (
    <div className="PhotoManager">
      {!user ? (
        // Login Form
        <div className="form">
          <h2 className="h2">Login</h2>
          <div className="message-container">
            {authError && <div className="message error">{authError}</div>}
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input"
              required
            />
            <button type="submit" className="Button">
              Login
            </button>
          </form>
        </div>
      ) : (
        // Photo Management Interface
        <div className="photo-manager">
          <div className="header">
            <h2>Manage Photos</h2>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>

          {/* Upload Section */}
          <div className="upload-section">
            <h3>Upload Photo</h3>
            <form onSubmit={handleUpload}>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="input"
                accept="image/*"
                required
              />
              <button type="submit" className="Button" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </form>
            {uploadError && <div className="message error">{uploadError}</div>}
            {uploadSuccess && (
              <div className="message success">Upload successful!</div>
            )}
          </div>

          {/* Photos Display Section */}
          <div className="photos-section">
            <h3>Photos</h3>
            {loadingPhotos ? (
              <p>Loading photos...</p>
            ) : photoError ? (
              <div className="message error">{photoError}</div>
            ) : photos.length === 0 ? (
              <p>No photos available.</p>
            ) : (
              <div className="photos-grid">
                {photos.map((photo) => (
                  <div key={photo.name} className="photo-card">
                    <img src={photo.url} alt={photo.name} className="photo" />
                    <button
                      onClick={() => handleDelete(photo.name)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoManagerPage;