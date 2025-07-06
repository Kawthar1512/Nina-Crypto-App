// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjLK2kfx43pa9bYHwzt-_sceF8cTayK1U",
  authDomain: "nina-wallet.firebaseapp.com",
  projectId: "nina-wallet",
  storageBucket: "nina-wallet.firebasestorage.app",
  messagingSenderId: "990486241139",
  appId: "1:990486241139:web:0502772015b72d79282f06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app,auth }