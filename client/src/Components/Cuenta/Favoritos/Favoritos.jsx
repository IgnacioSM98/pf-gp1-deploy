import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import FavoritosItem from "./FavoritosItem";
import { getFavoritos } from "../../../Redux/actions";

const Contenedor = styled.div`
  height: 100vh;
  background-color: white;
  position: relative;

  @media screen and (max-width: 560px) {
    display: absolute;
    z-index: 1;
    height: 89vh;
  }
`;

const Productos = styled.div`
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 90%;
  height: 153px;
  padding: 5px;
  border: 1px solid darkgrey;
  border-radius: 8px;

  @media screen and (max-width: 560px) {
    // left: 5%;
    width: 90%;
  }
`;

const ContenedorFav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding-top: 25px;
  height: 100%;
  overflow-y: scroll;

  @media screen and (min-width: 560px) {
    width: 100%;
    height: 80vh;
  }
`;

const Cerrar = styled.button`
  position: absolute;
  top: 0;

  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 20px;
  width: 25px;
  height: 25px;
  background: #599b79;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;

  @media screen and (min-width: 560px) {
    display: none;
  }
`;

const H1 = styled.h1`
  font-size: 20px;
  font-family: Poppins;
  font-weight: 600;
  text-align: start;
  margin-left: 1%;
`;

export default function Favoritos({ setComponente }) {
  const fav = useSelector((state) => state.favoritos);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  function handleClick() {
    setShow((current) => !current);
    setComponente("");
  }

  useEffect(() => {
    dispatch(getFavoritos(userInfo.uid));
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <Contenedor style={{ display: show ? "block" : "none" }}>
      <H1>Favoritos</H1>
      <Cerrar onClick={handleClick}>X</Cerrar>
      <ContenedorFav>
        {fav.length > 0 ? (
          fav.map((el) => {
            return (
              <Productos key={el.id}>
                <FavoritosItem producto={el} />
              </Productos>
            );
          })
        ) : (
          <p>No tienes productos agregados a Favoritos</p>
        )}
      </ContenedorFav>
    </Contenedor>
  );
}
