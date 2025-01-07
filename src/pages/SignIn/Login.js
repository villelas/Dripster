import React from 'react';
import './Login.css';
import {app} from '../../firebaseConfig'; // Import Firebase initialization
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import googleIcon from '../../assets/google-icon.png'; // Add your Google icon image hereiimport app from "../../firebaseConfig"; // Import Firebase initialization
import {db} from '../../firebaseConfig'; // Import Firebase initialization
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // For navigation

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('User signed in:', user);
      alert(`Welcome, ${user.displayName || "User"}!`);

      // Save user information in Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email,
          dripstername: "", // Initially empty
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      );

      console.log("User info saved, navigating to /set-dripstername");

      // Redirect to Dripstername setup page
      navigate("/set-dripstername");
    } catch (error) {
      console.error('Error during sign-in:', error);
      alert('Failed to sign in. Please try again.');
    }
  };


  return (
    <div className="login-page">
      <section className="container">
        <div className="login-container">
          <div className="circle circle-one"></div>
          <div className="form-container">
            <img
              src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
              alt="illustration"
              className="illustration"
            />
            <h1 className="opacity">LOGIN</h1>
            <button
  type="button"
  className="google-signin-button opacity"
  onClick={handleGoogleSignIn}
>
  <img src={googleIcon} alt="Google" className="google-icon" />
  Sign in with Google
</button>

          </div>
          <div className="circle circle-two"></div>
        </div>
      </section>
    </div>
  );
}

export default Login;

