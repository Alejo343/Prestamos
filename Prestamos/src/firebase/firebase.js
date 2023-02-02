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
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const analytics = getAnalytics(app);

//pregunta ocn el uid si exite elusuaio
export async function userExists(uid) {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);

  return res.exists();
}

export async function existsUsername(username) {
  const users = [];
  const docsRef = collection(db, "users");
  const q = query(docsRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });

  return users.length > 0 ? users[0].uid : null;
}

export async function registerNewUser(user) {
  try {
    console.log(user);
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    console.error(error)
  }
}

export async function updateUser(user) {
  console.log(user);
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    console.log(error)
  }
}

export async function getUserInfo(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}
