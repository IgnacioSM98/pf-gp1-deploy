import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import FavoritosItem from "./FavoritosItem";

const Productos = styled.div`
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 90%;
  height: 153px;
  padding: 5px;
  border: 1px solid darkgrey;
  border-radius: 8px;
`;

export default function Favoritos() {
  const fav = useSelector((state) => state.favoritos);

  return (
    <div>
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
    </div>
  );
}
