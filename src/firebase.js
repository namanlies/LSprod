// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2mPpwfT33mQvreSQVHFUg1fV5P5fX-68",
  authDomain: "deetox-562ec.firebaseapp.com",
  projectId: "deetox-562ec",
  storageBucket: "deetox-562ec.appspot.com",
  messagingSenderId: "539889267593",
  appId: "1:539889267593:web:728578120a52582541e758",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
