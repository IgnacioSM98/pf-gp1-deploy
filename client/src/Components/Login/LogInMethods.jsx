import { useState } from "react";
import GoogleButton from "react-google-button";
import { app, authentication } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./LogInMethods.css";
import styled from "styled-components";

const Contenedor = styled.div`
  background-image: url("https://i.blogs.es/b92620/cafe-cafeina/840_560.jpg");
  height: 85vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 5rem;
  background: cover;
`;

const Formulario = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 40%;
  height: 90vh;
  box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.8);
`;

// const Imagen = styled.img`
//   height: 90vh;
//   width: 60%;
//   object-fit: cover;
// `;

const Titulo = styled.h1`
  text-align: center;
  font-size: 30px;
  font-family: Poppins;
  color: #222;
  margin: 2rem;
`;

const BotonGoogle = styled(GoogleButton)`
  display: flex;
  margin-left: 3rem;
  margin-bottom: 1rem;
`;

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
    <Contenedor>
      {/* <Imagen src="https://i.blogs.es/b92620/cafe-cafeina/840_560.jpg" /> */}
      <Formulario>
        <Titulo className="titulo-login">
          {isSignUp ? "Registrate" : "Inicia Sesion"}
        </Titulo>

        <form onSubmit={handleSubmit}>
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

          <BotonGoogle type="light" onClick={googleSignIn} />
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
      </Formulario>
    </Contenedor>
  );
}
