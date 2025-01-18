import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore'; // <-- switched to setDoc
import { ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../components/firebase'; // adjust path as needed
import '../styles/LoginPage.css'; // reuse existing styling

const OrderPage = () => {
  // PIN logic
  const [pin, setPin] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [pinError, setPinError] = useState('');

  // Try to verify the PIN against Firestore
  const handlePinSubmit = async () => {
    try {
      // We assume you have a document in the 'IDs' collection named 'appPin'
      // with a field 'pin' (e.g. { pin: "1234" }).
      const pinDocRef = doc(db, 'IDs', 'appPin');
      const pinDocSnap = await getDoc(pinDocRef);

      if (pinDocSnap.exists()) {
        const storedPin = pinDocSnap.data().pin;
        if (pin === storedPin) {
          setAuthorized(true);
          setPinError('');
        } else {
          setPinError('Incorrect PIN.');
        }
      } else {
        setPinError('PIN document does not exist in Firestore.');
      }
    } catch (error) {
      console.error('Error fetching PIN:', error);
      setPinError('Error fetching PIN. Please try again.');
    }
  };

  // 2) Form fields
  const [snapchat, setSnapchat] = useState('');
  const [phoneOrTelegram, setPhoneOrTelegram] = useState('');
  const [stateID, setStateID] = useState(''); // default
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [dob, setDob] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [dlNumber, setDlNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [organDonor, setOrganDonor] = useState('No');
  const [extraIDs, setExtraIDs] = useState('0');

  // 3) File uploads
  const [headshotFile, setHeadshotFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);

  // 4) Submission feedback / confirmation
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a doc ID using firstName + lastName
      // Replace spaces with underscores to avoid invalid doc IDs
      const docId = `${firstName}_${lastName}`
        .trim()
        .replace(/\s+/g, '_');

      // Write the form data to Firestore with a custom doc ID
      await setDoc(doc(db, 'IDs', docId), {
        pin, // storing the user’s entered pin for reference
        snapchat,
        phoneOrTelegram,
        stateID,
        firstName,
        middleName,
        lastName,
        gender,
        eyeColor,
        hairColor,
        dob,
        height,
        weight,
        streetAddress,
        city,
        zip,
        dlNumber,
        issueDate,
        organDonor,
        extraIDs,
        timestamp: new Date(),
      });

      // If we have a valid headshot file, upload to Cloud Storage
      if (headshotFile) {
        const headshotRef = ref(
          storage,
          `IDs/${firstName}_${lastName}_headshot`
        );
        await uploadBytes(headshotRef, headshotFile);
      }

      // If we have a valid signature file, upload to Cloud Storage
      if (signatureFile) {
        const signatureRef = ref(
          storage,
          `IDs/${firstName}_${lastName}_signature`
        );
        await uploadBytes(signatureRef, signatureFile);
      }

      // Show success message
      setSubmissionMessage('Your ID order has been submitted successfully!');
      setShowConfirmation(true);

      // Optionally clear the form fields here
      // setSnapchat('');
      // ...

    } catch (error) {
      console.error('Error submitting form: ', error);
      setSubmissionMessage('Error submitting form. Please try again later.');
      setShowConfirmation(false);
    }
  };

  // 5) Render

  // A) If not authorized, show the PIN form
  if (!authorized) {
    return (
      <div className="Manage">
        <div className="form">
          <h2 className="h2">Enter PIN</h2>
          <div className="message-container">
            {pinError && <div className="message error">{pinError}</div>}
          </div>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
            className="input"
          />
          <button onClick={handlePinSubmit} className="Button">
            Submit PIN
          </button>
        </div>
      </div>
    );
  }

  // B) If authorized AND after submission, show a confirmation screen
  if (showConfirmation) {
    return (
      <div className="Manage">
        <div className="form">
          <h2 className="h2">Confirmation</h2>
          <p style={{ color: 'white' }}>
            {submissionMessage ||
              'Thank you! Your request has been recorded.'}
          </p>
          {/* Add any extra info or redirect button here */}
        </div>
      </div>
    );
  }

  // C) If authorized and no confirmation shown yet, display the order form
  return (
    <div className="Manage">
      <form className="form" onSubmit={handleFormSubmit}>
        <h2 className="h2">Order an ID</h2>

        {/* Submission messages (for inline errors, if needed) */}
        <div className="message-container">
          {submissionMessage && (
            <div className="message success">{submissionMessage}</div>
          )}
        </div>

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Snapchat / Phone / Telegram:
        </label>
        <input
          className="input"
          type="text"
          value={snapchat}
          onChange={(e) => setSnapchat(e.target.value)}
          placeholder="Your contact handle..."
        />

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          State (Indiana, Arizona, or New York):
        </label>
        <select
          className="input"
          value={stateID}
          onChange={(e) => setStateID(e.target.value)}
        >
            <option value="">-- Select State --</option>
          <option value="Indiana">Indiana</option>
          <option value="Arizona">Arizona</option>
          <option value="New York">New York</option>
        </select>

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          First Name:
        </label>
        <input
          className="input"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Middle Name:
        </label>
        <input
          className="input"
          type="text"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Last Name:
        </label>
        <input
          className="input"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Gender:
        </label>
        <select
          className="input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
        <option value="">-- Select Gender --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Eye Color:
        </label>
        <select
          className="input"
          value={eyeColor}
          onChange={(e) => setEyeColor(e.target.value)}
        >
          <option value="">-- Select Eye Color --</option>
          <option value="BRN">Brown</option>
          <option value="GRN">Green</option>
          <option value="HAZ">Hazel</option>
          <option value="BLU">Blue</option>
          <option value="BLK">Black</option>
          <option value="SDY">Sandy</option>
          <option value="MUL">Multicolor</option>
        </select>

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Hair Color:
        </label>
        <select
          className="input"
          value={hairColor}
          onChange={(e) => setHairColor(e.target.value)}
        >
          <option value="">-- Select Hair Color --</option>
          <option value="BLK">Black</option>
          <option value="BRN">Brown</option>
          <option value="RED">Red</option>
          <option value="BAL">Bald</option>
          <option value="BLN">Blonde</option>
          <option value="GRY">Gray</option>
        </select>

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Date of Birth for ID:
        </label>
        <input
          className="input"
          type="text"
          placeholder="MM/DD/YYYY"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Height (ft-in):
        </label>
        <input
          className="input"
          type="text"
          placeholder="e.g. 5-10"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Weight (lbs):
        </label>
        <input
          className="input"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <p style={{ color: 'white' }}>
          <strong>IMPORTANT INFORMATION:</strong> All of the following questions
          can be left blank and you will be given a random valid address in the
          state you selected. If you put custom information in, please ensure it
          is valid and without typos.
        </p>

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Street Address for ID:
        </label>
        <input
          className="input"
          type="text"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          City for ID:
        </label>
        <input
          className="input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Zip Code for ID:
        </label>
        <input
          className="input"
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Driver's License Number:
        </label>
        <input
          className="input"
          type="text"
          value={dlNumber}
          onChange={(e) => setDlNumber(e.target.value)}
        />

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Issue Date (mm/dd/yyyy):
        </label>
        <input
          className="input"
          type="text"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
        />

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Organ Donor (default No if blank):
        </label>
        <select
          className="input"
          value={organDonor}
          onChange={(e) => setOrganDonor(e.target.value)}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Do you want more than 2 IDs? If so, how many? (2 are included by
          default)
        </label>
        <input
          className="input"
          type="number"
          value={extraIDs}
          onChange={(e) => setExtraIDs(e.target.value)}
        />

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Upload your headshot here:
        </label>
        <input
          className="input"
          type="file"
          accept="image/*"
          onChange={(e) => setHeadshotFile(e.target.files[0])}
        />

        <p style={{ color: 'white' }}>
          If you do not have one, go to a local post office to get a passport
          photo. Please ensure this is a valid photo.
        </p>

        <label style={{ color: 'white', alignSelf: 'flex-start' }}>
          Upload your signature here:
        </label>
        <input
          className="input"
          type="file"
          accept="image/*"
          onChange={(e) => setSignatureFile(e.target.files[0])}
        />

        <p style={{ color: 'white' }}>
          Options:
          <br />
          1. Write it on an iPad and upload
          <br />
          2. Write it on a blank sheet of paper and upload
        </p>

        <button type="submit" className="Button">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default OrderPage;