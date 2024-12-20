// src/pages/PhotoManagerPage.jsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, setDoc, onSnapshot } from "firebase/firestore";
import { auth, db, storage } from "../components/firebase"; // Ensure Firestore is initialized
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
import '../styles/PhotoManagerPage.css'; // Ensure this CSS file is updated as per above

const US_TIMEZONES = [
  { label: 'Pacific Standard Time (PST)', value: 'America/Los_Angeles' },
  { label: 'Mountain Standard Time (MST)', value: 'America/Denver' },
  { label: 'Central Standard Time (CST)', value: 'America/Chicago' },
  { label: 'Eastern Standard Time (EST)', value: 'America/New_York' },
  { label: 'Alaska Standard Time (AKST)', value: 'America/Anchorage' },
  { label: 'Hawaii-Aleutian Standard Time (HAST)', value: 'Pacific/Honolulu' },
];

const Mom_DadPage = () => {
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

  // Settings States
  const [momDadClock, setMomDadClock] = useState(true);
  const [momDadPhoto, setMomDadPhoto] = useState(true);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [settingsError, setSettingsError] = useState('');

  // Timezone State
  const [timezone, setTimezone] = useState('America/Los_Angeles'); // Default timezone

  // Current Photo State
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [currentPhotoError, setCurrentPhotoError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Use email as the Firestore document ID
          const userDoc = await getDoc(doc(db, "users", currentUser.email));

          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Check if 'mom_dad' is true
            if (userData.mom_dad) {
              setUser(currentUser);
              fetchPhotos(); // Fetch photos for authorized users
              fetchSettings(); // Fetch display settings
              fetchCurrentPhoto(); // Fetch current photo
            } else {
              alert("You do not have access to this page.");
              setUser(null);
              signOut(auth); // Log out the unauthorized user
            }
          } else {
            // User document does not exist in Firestore
            alert("User not found in the database.");
            setUser(null);
            signOut(auth); // Log out the unauthorized user
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
          alert("An error occurred while verifying access.");
          setUser(null);
          signOut(auth); // Log out the user in case of an error
        }
      } else {
        setUser(null);
        setPhotos([]); // Clear photos when user logs out
        setCurrentPhoto(null); // Clear current photo
      }
    });

    // Real-time listener for current photo
    if (user) {
      const currentPhotoRef = doc(db, "settings", "mom_dad_settings");
      const unsubscribeCurrentPhoto = onSnapshot(currentPhotoRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setCurrentPhoto(data.current_photo || null);
        }
      }, (error) => {
        console.error("Error listening to current photo:", error);
        setCurrentPhotoError("Failed to fetch current photo.");
      });

      return () => {
        unsubscribe();
        unsubscribeCurrentPhoto();
      };
    }

    return () => unsubscribe();
  }, [user]);

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
        setPhotoError(`Failed to load photos: ${JSON.stringify(error)}`);
        setLoadingPhotos(false);
      });
  };

  // Fetch display settings from Firestore
  const fetchSettings = async () => {
    setSettingsLoading(true);
    setSettingsError('');
    try {
      const settingsDocRef = doc(db, "settings", "mom_dad_settings");
      const settingsDoc = await getDoc(settingsDocRef);
      if (settingsDoc.exists()) {
        const settingsData = settingsDoc.data();
        setMomDadClock(settingsData.mom_dad_clock);
        setMomDadPhoto(settingsData.mom_dad_photo);
        setTimezone(settingsData.timezone || 'America/Los_Angeles'); // Set timezone
      } else {
        // If the document doesn't exist, create it with default values
        await setDoc(settingsDocRef, { mom_dad_clock: true, mom_dad_photo: true, timezone: 'America/Los_Angeles' });
        setMomDadClock(true);
        setMomDadPhoto(true);
        setTimezone('America/Los_Angeles');
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      setSettingsError("Failed to load settings.");
    } finally {
      setSettingsLoading(false);
    }
  };

  // Fetch current photo from Firestore
  const fetchCurrentPhoto = async () => {
    try {
      const settingsDocRef = doc(db, "settings", "mom_dad_settings");
      const settingsDoc = await getDoc(settingsDocRef);
      if (settingsDoc.exists()) {
        const settingsData = settingsDoc.data();
        setCurrentPhoto(settingsData.current_photo || null);
      }
    } catch (error) {
      console.error("Error fetching current photo:", error);
      setCurrentPhotoError("Failed to fetch current photo.");
    }
  };

  // Handle Toggle Changes
  const handleToggleClock = async () => {
    const newValue = !momDadClock;
    setMomDadClock(newValue);
    await updateSettings("mom_dad_clock", newValue);
  };

  const handleTogglePhotos = async () => {
    const newValue = !momDadPhoto;
    setMomDadPhoto(newValue);
    await updateSettings("mom_dad_photo", newValue);
  };

  const updateSettings = async (field, value) => {
    try {
      const settingsDocRef = doc(db, "settings", "mom_dad_settings");
      await updateDoc(settingsDocRef, { [field]: value });
      console.log(`Updated ${field} to ${value}`);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      setSettingsError(`Failed to update ${field}.`);
    }
  };

  // Handle Timezone Change
  const handleTimezoneChange = async (e) => {
    const newTimezone = e.target.value;
    setTimezone(newTimezone);
    await updateSettings("timezone", newTimezone);
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

  // Listen to current_photo changes in Firestore
  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(doc(db, "settings", "mom_dad_settings"), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setCurrentPhoto(data.current_photo || null);
      }
    }, (error) => {
      console.error("Error listening to current photo:", error);
      setCurrentPhotoError("Failed to fetch current photo.");
    });

    return () => unsubscribe();
  }, [user]);

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

          {/* Settings Section */}
          <div className="settings-section">
            <h3>Display Settings</h3>
            {settingsLoading ? (
              <p>Loading settings...</p>
            ) : settingsError ? (
              <div className="message error">{settingsError}</div>
            ) : (
              <div className="toggles">
                <div className="toggle-item">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={momDadClock}
                      onChange={handleToggleClock}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className="switch-label">Display Clock</span>
                </div>
                <div className="toggle-item">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={momDadPhoto}
                      onChange={handleTogglePhotos}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className="switch-label">Display Photos</span>
                </div>
                {/* Timezone Selection */}
                <div className="toggle-item">
                  <label htmlFor="timezoneSelect" className="switch-label">Timezone:</label>
                  <select
                    id="timezoneSelect"
                    value={timezone}
                    onChange={handleTimezoneChange}
                    className="timezone-select"
                  >
                    {US_TIMEZONES.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {/* Display Current Timezone */}
            <div className="timezone-display">
              Current Timezone: {timezone.replace('_', ' ')}
            </div>
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

          {/* Current Photo Display Section */}
          {momDadPhoto && currentPhoto && (
            <div className="current-photo-section">
              <h3>Current Photo</h3>
              <img src={currentPhoto} alt="Current Display" className="current-photo" />
            </div>
          )}

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

export default Mom_DadPage;