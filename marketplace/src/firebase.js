import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNF2Y-ej_vOtid5fZk9nmKXIng0ylNcYY",
  authDomain: "freelancex-c6248.firebaseapp.com",
  projectId: "freelancex-c6248",
  storageBucket: "freelancex-c6248.firebasestorage.app",
  messagingSenderId: "594046254265",
  appId: "1:594046254265:web:3619a9ebc3af7f58b72f68",
  measurementId: "G-Y2ZP6GNQ3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export necessary authentication methods
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
