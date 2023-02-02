import React from "react";
import AuthProvider from "../components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { existsUsername, updateUser } from "../firebase/firebase";

export default function ChooseUsernameView() {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState("");

  function handleUserloggedIn(user) {
    navigate("/dashboard");
  }
  function handleUserNotRegistered(user) {
    setCurrentUser(user);
    setState(3);
  }
  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  function handleInputUsername(e) {
    setUsername(e.target.value);
  }

  async function handleContinue() {
    if (username != "") {
      const exists = await existsUsername(username);
      if (exists) {
        setState(5);
      } else {
        const tmp = { ...currentUser };
        tmp.userName = username;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setState(6);
      }
    }
  }

  if (state == 3 || state == 5) {
    return (
      <div>
        <h1>Bienvenido {currentUser.displayName}</h1>
        <p>Para terminar el proceso elige un nombre de usuario</p>
        {state == 5? <p>el nombre de usuario ya existe</p> : ""}
        <div>
          <input type="text" onInput={handleInputUsername}></input>
        </div>
        <div>
          <button onClick={handleContinue}>Continuar</button>
        </div>
      </div>
    );
  }

  if (state== 6) {
    return (
      <div>
        <h1>Felicidades, ya puedes ir al dashboard</h1>
        <Link to="/dashboard">Continuar</Link>
      </div>
    )
  }

  return (
    <AuthProvider
      onUserloggedIn={handleUserloggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>Elegir Usuario</div>
    </AuthProvider>
  );
}
