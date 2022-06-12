import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getFavoritos } from "../../../Redux/actions";
import FavoritosItem from "./FavoritosItem";

const Contenedor = styled.div`
  min-height: 100vh;
  background-color: white;
  @media screen and (max-width: 560px) {
    display: absolute;
    z-index: 1;
  }
`;

const ContenedorFav = styled.div`
  padding-top: 25px;
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
    left: 5%;
  }
`;
const Boton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  right: 20px;
  width: 25px;
  height: 25px;
  background: #36885ed1;
  color: white;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  @media screen and (min-width: 560px) {
    display: none;
  }
`;

export default function Favoritos() {
  const fav = useSelector((state) => state.favoritos);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  function handleClick() {
    setShow((current) => !current);
  }

  useEffect(() => {
    dispatch(getFavoritos(userInfo.uid));
  }, [dispatch, userInfo]);

  return (
    <Contenedor style={{ display: show ? "block" : "none" }}>
      <Boton onClick={handleClick}>X</Boton>
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
