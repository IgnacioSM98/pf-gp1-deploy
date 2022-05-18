import { useState } from "react";
import { app } from "../../Firebase/firebase";

export default function Login({ setUser }) {
  const [isSignUp, setIsSignUp] = useState(false);

  const createUser = (mail, pass) => {
    app
      .auth()
      .createUserWithEmailAndPassword(mail, pass)
      .then((res) => setUser(res));
  };

  const logIn = (mail, pass) => {
    app
      .auth()
      .signInWithEmailAndPassword(mail, pass)
      .then((res) => setUser(res));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mail = e.target.emailField.value;
    const pass = e.target.passwordField.value;

    if (isSignUp) {
      createUser(mail, pass);
    } else {
      logIn(mail, pass);
    }
  };
  return (
    <div>
      <h1>{isSignUp ? "Registrate" : "Inicia Sesion"}</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="emailField">Mail</label>
        <input type="email" id="emailField" />

        <label htmlFor="passwordField">Pass</label>
        <input type="password" id="passwordField" />

        <button type="submit">
          {isSignUp ? "Registrate" : "Inicia Sesion"}
        </button>
      </form>

      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Ya tenes cuenta? Inicia pa" : "Registra perri"}
      </button>
    </div>
  );
}
