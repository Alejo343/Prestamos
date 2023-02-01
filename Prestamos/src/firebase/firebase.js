import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGaUkIr4uFZWWzMRlhFlw4KTcHm6yQK9Y",
  authDomain: "prestamos-68fe6.firebaseapp.com",
  projectId: "prestamos-68fe6",
  storageBucket: "prestamos-68fe6.appspot.com",
  messagingSenderId: "196700515509",
  appId: "1:196700515509:web:4edb68ce7433e9c37ca2fc",
  measurementId: "G-XYN461E4PS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const analytics = getAnalytics(app);
