// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3A5OFlMe8LSGIItrzmAAuh9OfXyP89QU",
  authDomain: "simple-social-media-app-18428.firebaseapp.com",
  projectId: "simple-social-media-app-18428",
  storageBucket: "simple-social-media-app-18428.firebasestorage.app",
  messagingSenderId: "28021806904",
  appId: "1:28021806904:web:4161bd37261a78ee5d93cd",
  measurementId: "G-N4VZGXXN58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
