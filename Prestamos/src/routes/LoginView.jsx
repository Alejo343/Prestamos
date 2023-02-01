import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";

/*
  Stages:
  0: initiated
  1: loading
  2: login completed
  3: login but no username
  4: not logged
*/
export default function LoginView() {
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setCurrentState] = useState(0);

  useEffect(() => {
    setCurrentState(1);
    onAuthStateChanged(auth, handleUserStateChanged);
  }, []);

  function handleUserStateChanged(user) {
    setCurrentState(3);
    if (user) {
      console.log(user.displayName);
    } else {
      setCurrentState(4);
      console.log("No hay nadie autenticado");
    }
  }

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
  if (state==3) {
    return <div>Estas autenticado pero no registrado</div>
  }
  if (state==4) {
    return (
      <div>
        <button onClick={handleOnClick}>Ingresar con Google</button>
      </div>
    );
  }
  return <div>Cargando...</div>
}
