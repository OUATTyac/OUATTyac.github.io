import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuration Firebase issue de ton nouveau projet "portfolioyacouba"
const firebaseConfig = {
  apiKey: "AIzaSyDrqXu90YLzSfa_eqEcdiaStWA2WuvKRgw",
  authDomain: "portfolioyacouba.firebaseapp.com",
  projectId: "portfolioyacouba",
  storageBucket: "portfolioyacouba.firebasestorage.app",
  messagingSenderId: "913503457816",
  appId: "1:913503457816:web:aeaa49bc31bc19e6e4696d"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Exportation des services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Helper pour la connexion Google Popup
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Erreur de connexion Google :", error);
    return null;
  }
};

// Helper pour la déconnexion
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
};

export default app;
