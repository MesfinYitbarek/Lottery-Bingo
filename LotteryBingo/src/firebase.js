// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC8o3lYwtiPM1CPAHTW9cTAkHHEpI_U9yk",
  authDomain: "bingo-5a330.firebaseapp.com",
  projectId: "bingo-5a330",
  storageBucket: "bingo-5a330.appspot.com",
  messagingSenderId: "1030949803569",
  appId: "1:1030949803569:web:f2d8f5056fce363df02710",
  measurementId: "G-EKN12WYYHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, auth, storage, analytics };