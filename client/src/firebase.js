// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwebai-5456d.firebaseapp.com",
  projectId: "genwebai-5456d",
  storageBucket: "genwebai-5456d.firebasestorage.app",
  messagingSenderId: "244400203305",
  appId: "1:244400203305:web:069196d4e2f9ddc2b91e38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}
