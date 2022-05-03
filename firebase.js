// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD68-_TpSICtWwo0pU7XAJE0zNEFPY7lWk",
  authDomain: "quoraclone-e4797.firebaseapp.com",
  projectId: "quoraclone-e4797",
  storageBucket: "quoraclone-e4797.appspot.com",
  messagingSenderId: "887125144211",
  appId: "1:887125144211:web:462ff4cb52ba4666be5366"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, db, storage };