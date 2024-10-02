import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD08ESF7ryo8o_gBv2A5YlnKod7PkKz-xM",
  authDomain: "hajimari-subs.firebaseapp.com",
  projectId: "hajimari-subs",
  storageBucket: "hajimari-subs.appspot.com",
  messagingSenderId: "921390124391",
  appId: "1:921390124391:web:a68c219821d2827f6f73c2",
  measurementId: "G-14V9DS3DPE"
};

// Inicializace Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
