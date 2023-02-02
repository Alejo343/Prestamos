import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, userExists } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({ children, onUserloggedIn, onUserNotLoggedIn, onUserNotRegistered }) {
//   const { children, onUserloggedIn, onUserNotLoggedIn, onUserNotRegistered } =
//     props;

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, handleUserStateChanged);
  }, []);

  async function handleUserStateChanged(user) {
    if (user) {
      const isRegistered = await userExists(user.uid);
      if (isRegistered) {
        onUserloggedIn(user);
      } else {
        onUserNotRegistered(user);
      }
    } else {
      onUserNotLoggedIn(user);
    }
  }

  return <div>{children}</div>;
}
