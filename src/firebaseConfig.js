import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyByM7JVefFe7sssjxuvqaq1pg9yGrUTCqM",
    authDomain: "dripster-c9c11.firebaseapp.com",
    projectId: "dripster-c9c11",
    storageBucket: "dripster-c9c11.firebasestorage.app",
    messagingSenderId: "47166065113",
    appId: "1:47166065113:web:85ade1db2363f3f797f1c8",
    measurementId: "G-VCMY2LH2JY"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication Exports
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);

export default app;
