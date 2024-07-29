import React, { useState } from 'react';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../components/firebase';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpload = () => {
    if (file) {
      setUploading(true);
      setError(null);
      setSuccess(false);

      const storageRef = ref(storage, `/photos/${file.name}`);
      uploadBytes(storageRef, file).then(snapshot => {
        console.log('Uploaded a blob or file!', snapshot);
        setSuccess(true);
      }).catch(err => {
        console.error('Upload error:', err);
        setError(err.message);
      }).finally(() => {
        setUploading(false);
      });
    } else {
      setError('No file selected');
    }
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Upload successful!</div>}
    </div>
  );
};

export default UploadPage;