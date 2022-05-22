import { useState } from "react";
import GoogleButton from "react-google-button";
import { app, authentication } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./LogInMethods.css";
import styled from "styled-components";
import google from "./Google.png";

const Container = styled.div`
  background-image: url("https://i.blogs.es/b92620/cafe-cafeina/840_560.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  font-family: Poppins;

  height: 90vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: cover;
`;

const SignIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  background-color: #08ce72d1;
  border-radius: 20px 0px 0px 20px;
  width: 35%;
  height: 75vh;
`;

const SignUp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  background-color: white;
  border-radius: 0px 20px 20px 0px;
  width: 45%;
  height: 75vh;
`;

const Titulo = styled.h1`
  position: absolute;
  top: 10px;

  text-align: center;
  font-size: 30px;
  font-family: Poppins;
  font-weight: bold;
  color: ${(props) => props.color};
  margin: 2rem;
`;

const Apps = styled.div`
  // display: flex;
  // margin-left: 3rem;
  // margin-bottom: 1rem;
  width: 50%;
  margin: 20px;
`;

const BotonGoogle = styled.img`
  // display: flex;
  // margin-left: 3rem;
  // margin-bottom: 1rem;
  width: 30px;
  cursor: pointer;
`;

const Boton = styled.button`
  background-color: ${(props) => props.backgroundColor};
  width: 140px;
  height: 40px;
  border: none;
  position: absolute;
  bottom: 40px;

  color: ${(props) => props.color};
  border-radius: 6px;
  font-size: 16px;
  margin: 10px 0px;
  cursor: pointer;
  font-family: Poppins;
`;

export default function Login({ setUser }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [flag, setFlag] = useState({});

  const handleChange = (e) => {
    console.log(e.target.value, e.target.name);

    setFlag({
      ...flag,
      [e.target.name]: e.target.value,
    });
  };

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
    <Container>
      <SignIn>
        <Titulo color="white" className="titulo-login">
          Bienvenido!
        </Titulo>

        {/* <form onSubmit={handleSubmit}> */}
        <p style={{ margin: "20px" }}>
          Para continuar conectado con nosotros ingresá con tu cuenta
        </p>

        <Boton color="black" backgroundColor="white" type="submit">
          Iniciar Sesion
        </Boton>
        {/* </form> */}
      </SignIn>
      <SignUp>
        <Titulo color="#08ce72" className="titulo-login">
          Crear Cuenta
        </Titulo>

        <Apps>
          <BotonGoogle src={google} onClick={googleSignIn} />
        </Apps>
        <p style={{ margin: "10px" }}>O registrate con tu correo</p>

        <form style={{ margin: "0px 0px 40px 0px" }} onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="grupo-login" style={{ width: "150px" }}>
              <input
                className="input-login"
                type="email"
                id="emailField"
                name="nombre"
                onChange={handleChange}
              />
              <span className="barra-login"></span>
              <label
                className="label-login"
                htmlFor="emailField"
                hidden={flag.nombre}
              >
                Nombre
              </label>
            </div>

            <div className="grupo-login" style={{ width: "150px" }}>
              <input
                className="input-login"
                type="email"
                id="emailField"
                name="apellido"
                onChange={handleChange}
              />
              <span className="barra-login"></span>
              <label
                className="label-login"
                htmlFor="emailField"
                hidden={flag.apellido}
              >
                Apellido
              </label>
            </div>
          </div>

          <div className="grupo-login">
            <input
              className="input-login"
              type="email"
              id="emailField"
              name="correo"
              onChange={handleChange}
            />
            <span className="barra-login"></span>
            <label className="label-login" htmlFor="emailField">
              Correo
            </label>
          </div>

          <div className="grupo-login">
            <input
              className="input-login"
              type="password"
              id="passwordField"
              name="contraseña"
              onChange={handleChange}
            />
            <span className="barra-login"></span>
            <label className="label-login" htmlFor="passwordField">
              Contraseña
            </label>
          </div>
        </form>

        <Boton
          color="white"
          backgroundColor="rgb(8, 206, 114)"
          className="boton-logedinmethods"
          // onClick={() => setIsSignUp(!isSignUp)}
        >
          {/* {isSignUp ? "Iniciar Sesion" : "Registrarse"} */}
          Registrarse
        </Boton>
      </SignUp>
    </Container>
  );
}
