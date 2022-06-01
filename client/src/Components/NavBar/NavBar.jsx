import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Usuario from "../Usuario/Usuario";
import {
  getUser,
  setCarrito,
  setUserInfo,
  changeUserMode,
} from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { app } from "../../firebase";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  // top: 20px;
  z-index: 20;
  height: 50px;
  background-color: #000000f0;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const UserButton = styled(Link)`
  color: white;
  background-color: transparent;
  text-decoration: none;
  border: none;
  cursor: pointer;
  // width: 100%;
  margin-bottom: 7px;
  font-weight: 500;
`;

const ChangeMode = styled.span`
  color: white;
  background-color: transparent;
  text-decoration: none;
  border: none;
  cursor: pointer;
  // width: 100%;
  margin-bottom: 7px;
  font-weight: 500;
`;

const UserMenu = styled.div`
  position: absolute;
  bottom: -120px;
  color: white;
  right: 0;
  background-color: #000000f0;
  height: 120px;
  width: 170px;
  border-radius: 0px 0px 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-size: 14px;
`;

const Span = styled.span`
  margin: 0px 40px;
  font-weight: bold;
  color: white;
  font-size: 13px;
  text-shadow: 1px 1px black;
  cursor: pointer;
`;

const Login = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 13px;
  color: white;
  right: 20px;
`;

const Button = styled.button`
  border-width: 1px;
  border-radius: 5px 5px 5px 5px;
  border-color: white;
  font-weight: bold;
  background-color: transparent;
  margin: 0px 10px;
  padding: 8px 20px;
  color: white;
  font-size: 13px;
  text-shadow: 1px 1px black;
  cursor: pointer;
`;

export default function NavBar({ contacto, setUser }) {
  const carrito = useSelector((state) => state.carrito);
  const dispatch = useDispatch();
  const [userMenu, setMenu] = useState(false);

  const countCarrito = carrito?.filter((cv, i) => {
    return i === carrito.findIndex((e) => e.id === cv.id);
  }).length;

  const userInfo = useSelector((state) => state.userInfo);

  const logOut = () => {
    localStorage.removeItem("user");
    app.auth().signOut();
    dispatch(getUser());

    // Deslogeamos el usuario de la cache
    dispatch(setUserInfo());

    app.auth().onAuthStateChanged((user) => {
      setUser(user);
      dispatch(getUser());
    });
  };

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Recuperamos el carrito del local storage
    dispatch(
      setCarrito(
        localStorage.getItem("carrito")
          ? JSON.parse(localStorage.getItem("carrito"))
          : []
      )
    );
  }, []);

  useEffect(() => {
    // Cada vez que se actualice el carrito lo guardamos en caché
    if (carrito) {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }, [carrito]);

  // useEffect(() => {
  //   if (!user) {
  //     // dispatch(setUserInfo(JSON.parse(localStorage.getItem("user"))));

  //     const userAux = JSON.parse(localStorage.getItem("user"));

  //     setUser(userAux);
  //   } else {
  //     dispatch(getUser(user.email));
  //   }
  // }, []);

  return (
    <Container onMouseLeave={() => setMenu(false)}>
      <NavLink to={"/"} onClick={() => setMenu(false)}>
        <Span>Home</Span>
      </NavLink>

      {/* <NavLink to="/">
        <Span>About</Span>
      </NavLink> */}

      <NavLink to={"tienda"} onClick={() => setMenu(false)}>
        <Span>Tienda</Span>
      </NavLink>

      <Span
        onClick={() => {
          scrollToSection(contacto);
          setMenu(false);
        }}
      >
        Contacto
      </Span>

      {/* <NavLink to="/blog">
        <Span>Blog</Span>
      </NavLink> */}

      <Login>
        <NavLink
          to={"/carrito"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="Carrito"
          onClick={() => setMenu(false)}
        >
          <span style={{ margin: "4px 2px" }}>{countCarrito}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bag"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
          </svg>
        </NavLink>

        {userInfo && Object.entries(userInfo).length !== 0 ? (
          <button
            title="Cuenta"
            style={{
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              setMenu(!userMenu);
            }}
          >
            <Usuario user={userInfo} />
          </button>
        ) : (
          <NavLink to={"/login"}>
            <Button>Login</Button>
          </NavLink>
        )}
      </Login>
      {/* ) : null} */}

      {userMenu && (
        <UserMenu onMouseLeave={() => setMenu(false)}>
          {userInfo?.rol === "admin" && (
            <ChangeMode
              // to="/"
              onClick={() => {
                setMenu(!userMenu);
                dispatch(changeUserMode(userInfo));
              }}
            >
              {userInfo?.visualizacion !== "admin"
                ? "Modo Admin"
                : "Modo Invitado"}
            </ChangeMode>
          )}

          {userInfo?.rol === "admin" && (
            <UserButton to="/admin" onClick={() => setMenu(!userMenu)}>
              Panel Administracion
            </UserButton>
          )}

          <UserButton to="/cuenta" onClick={() => setMenu(!userMenu)}>
            Mi Cuenta
          </UserButton>

          {userInfo?.rol !== "admin" && (
            <UserButton to="/carrito" onClick={() => setMenu(!userMenu)}>
              Carrito
            </UserButton>
          )}

          <UserButton
            to="/"
            onClick={(e) => {
              e.preventDefault();
              logOut();
              setMenu(!userMenu);
            }}
          >
            Cerrar Sesion
          </UserButton>
        </UserMenu>
      )}
    </Container>
  );
}
