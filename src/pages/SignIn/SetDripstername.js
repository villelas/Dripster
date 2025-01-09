import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './SetDripstername.css';

const SetDripstername = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location.state?.email || "Unknown User"; // Get email from state
  const [dripsterName, setDripsterName] = useState("");
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUserUid(currentUser.uid);

      // Check if the user already has a Dripster Name
      const checkDripsterName = async () => {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists() && userDoc.data().dripstername) {
            const existingDripsterName = userDoc.data().dripstername;
            console.log("Dripster Name exists, redirecting to avatar creation...");
            navigate('/avatarcreation', { state: { dripstername: existingDripsterName } });
          }
        } catch (error) {
          console.error("Error checking Dripster Name:", error);
        }
      };

      checkDripsterName();
    } else {
      console.error("No authenticated user found. Make sure the user is signed in.");
    }
  }, [navigate]);

  const handleSaveDripsterName = async () => {
    if (!userUid) {
      console.error("User UID is undefined. Cannot save Dripster Name.");
      return;
    }

    try {
      const userRef = doc(db, "users", userUid);
      await updateDoc(userRef, { dripstername: dripsterName });
      console.log("Dripster Name saved successfully!");
      alert("Your Dripster Name has been saved!");
      navigate('/avatarcreation', { state: { dripstername: dripsterName } }); // Pass dripstername
    } catch (error) {
      console.error("Error saving Dripster Name:", error);
      alert("Failed to save Dripster Name. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Welcome Heading */}
      <h1 className="goo">Welcome!</h1>

      {/* Subheading */}
      <p style={{ fontSize: '2rem', fontWeight: '500', color: '#4B0082' }}>
        {userEmail}
      </p>
      <p className="subheading-setupdripster">You're so close to being fitted!</p>

      <div className="form-container">
        <label htmlFor="dripsterName">Dripster Name:</label>
        <input
          type="text"
          id="dripsterName"
          value={dripsterName}
          onChange={(e) => setDripsterName(e.target.value)}
          placeholder="Enter your desired display name"
        />
        <button onClick={handleSaveDripsterName}>Save Dripster Name</button>
      </div>
    </div>
  );
};

export default SetDripstername;
