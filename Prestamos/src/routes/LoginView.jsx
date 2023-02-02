import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, userExists } from "../firebase/firebase";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import AuthProvider from "../components/AuthProvider";


export default function LoginView() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setCurrentState] = useState(0);
  /*0=initiated; 1=loading; 2=logincompleted; 3=login; 4=not logged; 5=existe user*/

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

  function handleUserloggedIn(user) {
    navigate("/dashboard");
  }
  function handleUserNotRegistered(user) {
    navigate("/choose-username");
  }
  function handleUserNotLoggedIn() {
    setCurrentState(4);
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
  if (state == 5) {
    return <div>Estas autenticado pero no registrado</div>;
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
