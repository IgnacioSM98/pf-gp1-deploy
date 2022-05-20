import { useState } from "react";
import GoogleButton from "react-google-button";
import { app, authentication } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./LogInMethods.css";

export default function Login({ setUser }) {
  const [isSignUp, setIsSignUp] = useState(false);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(authentication, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <GoogleButton type="light" onClick={googleSignIn} />
      <h1 className="titulo-login">
        {isSignUp ? "Registrate" : "Inicia Sesion"}
      </h1>

      <form className="form-login" onSubmit={handleSubmit}>
        <div className="grupo-login">
          <input className="input-login" type="email" id="emailField" />
          <span className="barra-login"></span>
          <label className="label-login" htmlFor="emailField">
            Mail
          </label>
        </div>
        <div className="grupo-login">
          <input className="input-login" type="password" id="passwordField" />
          <span className="barra-login"></span>
          <label className="label-login" htmlFor="passwordField">
            Pass
          </label>
        </div>
        <button className="boton-logedinmethods" type="submit">
          {isSignUp ? "Registrarse" : "Iniciar Sesion"}
        </button>
      </form>

      <button
        className="boton-logedinmethods"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? "Iniciar Sesion" : "Registrarse"}
      </button>
    </div>
  );
}
