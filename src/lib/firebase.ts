import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "third-nomad-p2l12",
  appId: "1:733504353613:web:70d7c8d72dc12d9e463304",
  apiKey: "AIzaSyDiRw_vAKFTFihNlXFGDLW69wlB3S7GJwQ",
  authDomain: "third-nomad-p2l12.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-yacoubaouattaraa-0d0746cf-e96a-4a63-9c40-d540c58a4a47",
  storageBucket: "third-nomad-p2l12.firebasestorage.app",
  messagingSenderId: "733504353613",
  measurementId: "",
  oAuthClientId: "733504353613-589d754qlb5leflft7f4evf2nrq32j30.apps.googleusercontent.com",
  recaptchaSiteKey: ""
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
