// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-projectone.firebaseapp.com",
  projectId: "mern-projectone",
  storageBucket: "mern-projectone.appspot.com",
  messagingSenderId: "725169095321",
  appId: "1:725169095321:web:f5aaec3e5494b8711e2e08"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);