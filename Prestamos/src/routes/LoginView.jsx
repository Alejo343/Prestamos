import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, userExists } from "../firebase/firebase";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import AuthProvider from "../components/AuthProvider";

/*
  Stages:
  0: initiated
  1: loading
  2: login completed
  3: login but no username
  4: not logged
*/
export default function LoginView() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setCurrentState] = useState(0);

  async function handleOnClick() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);
  }

  async function signInWithGoogle(googleProvider) {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  if (state == 2) {
    return <div>Estas autenticado pero y registrado</div>;
  }
  if (state == 3) {
    return <div>Estas autenticado pero no registrado</div>;
  }
  if (state == 4) {
    return (
      <div>
        <button onClick={handleOnClick}>Ingresar con Google</button>
      </div>
    );
  }

  function handleUserloggedIn(user) {
    navigate("/dashboard");
  }
  function handleUserNotRegistered(user) {
    navigate("/choose-username");
  }
  function handleUserNotLoggedIn() {
    setCurrentState(4);
  }

  return (
    <AuthProvider
      onUserloggedIn={handleUserloggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>Cargando...</div>
    </AuthProvider>
  );
}
