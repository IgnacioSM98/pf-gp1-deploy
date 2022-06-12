import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import FavoritosItem from "./FavoritosItem";
import { getFavoritos } from "../../../Redux/actions";

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

export default function Favoritos() {
  const fav = useSelector((state) => state.favoritos);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavoritos(userInfo.uid));
    // eslint-disable-next-line
  }, [dispatch]);

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
