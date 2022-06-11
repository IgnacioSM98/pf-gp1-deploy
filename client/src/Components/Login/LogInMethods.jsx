import { useState, useRef, useEffect } from "react";
import GoogleButton from "react-google-button";
import { app, authentication } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./LogInMethods.css";
import styled from "styled-components";
import google from "./Google.png";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  setUserInfo,
  postUsuario,
  getUsuarios,
} from "../../Redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

const Container = styled.div`
  background-image: url("https://i.blogs.es/b92620/cafe-cafeina/840_560.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  font-family: Poppins;

  height: 92vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: cover;
  @media screen and (max-width: 560px) {
    flex-direction: column;
  }
`;

const SignIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  background-color: #36885ed1;
  border-radius: 20px 0px 0px 20px;
  width: 35%;
  height: 75vh;

  @media screen and (max-width: 560px) {
    margin-top: 5.5vh;
    width: 85%;
    height: 30vh;
    border-radius: 20px;
  }
`;

const SignUp = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  background-color: white;
  border-radius: 0px 20px 20px 0px;
  width: 45%;
  height: 75vh;
  @media screen and (max-width: 560px) {
    margin: 0.5vh 0;
    width: 85%;
    height: 55vh;
    border-radius: 20px;
  }
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
  @media screen and (max-width: 560px) {
    position: relative;
    font-size: 15px;
    height: 10%;
  }
`;
const Parrafo = styled.p`
  margin: 20px;

  @media screen and (max-width: 560px) {
    display: none;
  }
`;
const ParrafoRegistro = styled.p`
  margin: 10px;
  @media screen and (max-width: 560px) {
    margin: 4px;
  }
`;

const Apps = styled.div`
  // display: flex;
  // margin-left: 3rem;
  // margin-bottom: 1rem;
  width: 50%;
  margin: 20px;
  @media screen and (max-width: 560px) {
    margin: 8px;
  }
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
  @media screen and (max-width: 560px) {
    position: relative;
    width: 130px;
    height: 25px;
    bottom: 0px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 560px) {
    flex-direction: column;
  }
`;
const NombreContainer = styled.div`
  display: flex;
  flex-direction: row;
  justifycontent: space-between;
  width: 80%;
`;

const Error = styled.p`
  position: absolute;
  bottom: -15px;
  font-weigth: 600;
  left: 5px;
  color: #ff000091;
  font-size: 13px;
`;

export default function Login({ setUser }) {
  const [isSignUp, setIsSignUp] = useState(false),
    [flag, setFlag] = useState({}),
    [error, setError] = useState({ login: {}, signUp: {} });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const emailLRef = useRef(null);
  const passLRef = useRef(null);

  const handleChange = (e) => {
    setFlag({
      ...flag,
      [e.target.name]: e.target.value,
    });
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(authentication, provider)
      .then(async (res) => {
        const user = { ...res.user };

        await axios
          .get("https://proyecto-final-gp1.herokuapp.com/usuarios")
          .then(
            (res) =>
              res.data.filter((usuario) => usuario.mail === user.email)[0]
          )
          .then((res) => {
            user.rol = res.isAdmin ? "admin" : "user";
            user.visualizacion = res.isAdmin ? "admin" : "user";
          })
          .catch((err) => {
            user.rol = "user";
            user.visualizacion = "user";
          });

        localStorage.setItem("user", JSON.stringify(user));

        dispatch(setUserInfo(user));

        setUser(user);
        dispatch(getUser(user.email));
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createUser = (mail, pass, nombre, apellido) => {
    app
      .auth()
      .createUserWithEmailAndPassword(mail, pass)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: nombre,
          })
          .then(() => {
            // console.log(res.user);
            const user = { ...res.user };
            const body = {
              id: res.user.uid,
              nombre,
              apellido,
              contraseña: pass,
              mail,
            };

            user.displayName = `${nombre} ${apellido}`;
            user.rol = "user";
            user.visualizacion = "user";
            user.email = res.user.email;

            localStorage.setItem("user", JSON.stringify(user));

            dispatch(setUserInfo(user));

            setUser(user);
            dispatch(getUser(mail));

            dispatch(postUsuario(body));
            navigate(-1);
          });
      })
      .catch((err) => {
        console.log(err, "error al crear cuenta");
      });
  };

  const logIn = (mail, pass) => {
    app
      .auth()
      .signInWithEmailAndPassword(mail, pass)
      .then(async (res) => {
        const user = { ...res.user.multiFactor.user };

        await axios
          .get("https://proyecto-final-gp1.herokuapp.com/usuarios")
          .then(
            (res) =>
              res.data.filter((usuario) => usuario.mail === user.email)[0]
          )
          .then((res) => {
            // console.log(user, "aca?");
            // user.displayName = res.user.displayName;
            user.rol = res.isAdmin ? "admin" : "user";
            user.visualizacion = res.isAdmin ? "admin" : "user";
            // user.email = res.user.email;
          })
          .catch((err) => {
            user.rol = "user";
            user.visualizacion = "user";
          });

        localStorage.setItem("user", JSON.stringify(user));

        dispatch(getUser(mail));

        dispatch(setUserInfo(user));

        setUser(user);
        navigate(-1);
      })
      .catch((err) => {
        setError({
          ...error,
          login: { contraseña: "usuario o contraseña no valido" },
        });
        console.log(error);
      });
  };

  const validateSubmit = (props) => {
    let errors = { login: {}, signUp: {} };

    if (props.type) {
      if (!props.nombre) {
        errors.signUp.nombre = "Debés ingresar tu nombre";
      }

      if (!props.apellido) {
        errors.signUp.apellido = "Necesitamos tu apellido";
      }

      if (!props.mail) {
        errors.signUp.correo = "El mail no puede ir vacío";
      }

      if (!props.pass) {
        errors.signUp.contraseña = "Ingresá una contraseña segura";
      }
    } else {
      if (!props.mailL) {
        errors.login.correo = "Ingresá tu correo";
      }
      if (!props.passL) {
        errors.login.contraseña = "Y ahora tu contraseña";
      }
    }
    // console.log(errors);

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mail = emailRef.current.value;
    const pass = passRef.current.value;
    const nombre = nombreRef.current.value;
    const apellido = apellidoRef.current.value;
    const mailL = emailLRef.current.value;
    const passL = passLRef.current.value;

    if (isSignUp) {
      if (mail && pass && nombre && apellido) {
        createUser(mail, pass, nombre, apellido);
      } else {
        setError(validateSubmit({ mail, pass, nombre, apellido, type: true }));
      }
    } else {
      if (mailL && passL) {
        logIn(mailL, passL);
      } else {
        setError(validateSubmit({ mailL, passL, type: false }));
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <SignIn>
        <Titulo color="white" className="titulo-login">
          Bienvenido!
        </Titulo>

        <Form onSubmit={(e) => handleSubmit(e)}>
          <Parrafo>
            Para continuar conectado con nosotros ingresá con tu cuenta
          </Parrafo>

          <div className="grupo-login">
            <input
              className="input-login"
              type="email"
              id="emailField"
              name="correo"
              ref={emailLRef}
              onChange={handleChange}
              placeholder=" "
            />
            <span className="barra-login"></span>
            <label className="label-login" htmlFor="emailField">
              Correo
            </label>
            {error.login.correo && <Error>{error.login.correo}</Error>}
          </div>

          <div className="grupo-login">
            <input
              className="input-login"
              type="password"
              id="passwordField"
              name="contraseña"
              ref={passLRef}
              onChange={handleChange}
              placeholder=" "
            />
            <span className="barra-login"></span>
            <label className="label-login" htmlFor="passwordField">
              Contraseña
            </label>
            {error.login.contraseña && <Error>{error.login.contraseña}</Error>}
          </div>
          <Boton
            onClick={() => setIsSignUp(false)}
            color="black"
            backgroundColor="white"
            type="submit"
          >
            Iniciar Sesion
          </Boton>
        </Form>
      </SignIn>

      <SignUp onSubmit={handleSubmit}>
        <Titulo color="#36885ed1" className="titulo-login">
          Crear Cuenta
        </Titulo>

        <Apps>
          <BotonGoogle src={google} onClick={googleSignIn} />
        </Apps>
        <ParrafoRegistro>O registrate con tu correo</ParrafoRegistro>

        <Form
          style={{ margin: "0px 0px 40px 0px", alignItems: "center" }}
          onSubmit={handleSubmit}
        >
          <NombreContainer>
            <div className="grupo-login" style={{ width: "50%" }}>
              <input
                className="input-login"
                type="text"
                id="nombreField"
                name="nombre"
                ref={nombreRef}
                onChange={handleChange}
                placeholder=" "
              />
              <span className="barra-login"></span>
              <label className="label-login" htmlFor="nombreField">
                Nombre
              </label>

              {error.signUp.nombre && <Error>{error.signUp.nombre}</Error>}
            </div>

            <div className="grupo-login" style={{ width: "50%" }}>
              <input
                className="input-login"
                type="text"
                id="apellidoField"
                name="apellido"
                ref={apellidoRef}
                onChange={handleChange}
                placeholder=" "
              />
              <span className="barra-login"></span>
              <label className="label-login" htmlFor="apellidoText">
                Apellido
              </label>

              {error.signUp.apellido && <Error>{error.signUp.apellido}</Error>}
            </div>
          </NombreContainer>

          <div className="grupo-login">
            <input
              className="input-login"
              type="email"
              id="emailField"
              name="correo"
              ref={emailRef}
              onChange={handleChange}
              placeholder=" "
            />
            <span className="barra-login"></span>
            <label className="label-login" htmlFor="emailField">
              Correo
            </label>

            {error.signUp.correo && <Error>{error.signUp.correo}</Error>}
          </div>

          <div className="grupo-login">
            <input
              className="input-login"
              type="password"
              id="passwordField"
              name="contraseña"
              ref={passRef}
              onChange={handleChange}
              placeholder=" "
            />
            <span className="barra-login"></span>
            <label className="label-login" htmlFor="passwordField">
              Contraseña
            </label>

            {error.signUp.contraseña && (
              <Error>{error.signUp.contraseña}</Error>
            )}
          </div>
        </Form>

        <Boton
          color="white"
          backgroundColor="#36885eeb"
          className="boton-logedinmethods"
          onClick={() => setIsSignUp(true)}
        >
          Registrarse
        </Boton>
      </SignUp>
    </Container>
  );
}
