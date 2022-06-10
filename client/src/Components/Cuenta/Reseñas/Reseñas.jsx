import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, getUsuarios } from "../../../Redux/actions";
import { Link } from "react-router-dom";
//import "./Reseñas.css";
import Stars from "../../Stars/Stars";
import styled from "styled-components";
import { deleteReview } from "../../../Redux/actions";

const StyledLink = styled(Link)`
  text-decoration: none,
  color: black,
`;
const Review = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-evenly;
  // align-items: center;
  text-align: start;
  padding: 0px 17px;
  margin: 0px 1% 20px;
  height: 140px;
  width: 31%;
  background-color: #80808038;
  border-radius: 5px;
`;

const TituloReview = styled.span`
  height: 18px;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
`;

const ComentarioReview = styled.span`
  height: 60px;
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  margin-bottom: 20px;
`;

const Boton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 10px;
  width: 70px;
  height: 30px;
  background: white;
  border: 1px solid black;
  // margin: auto;
  // margin-bottom: 5px;
  color: black;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
`;

export default function Reseñas() {
  const user = useSelector((state) => state.userInfo);
  const id = user.uid;
  const reseñas = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews(id));
  }, []);

  return (
    <div>
      {reseñas
        .filter((reseña) => reseña.usuarioId === id)
        .map((el) => (
          <StyledLink to={`/productos/${el.productoId}`}>
            <Review key={el.id}>
              <Stars rating={el.puntaje} />
              <TituloReview>{el.titulo}</TituloReview>
              <ComentarioReview>{el.comentario}</ComentarioReview>
              <Boton
                onClick={() => {
                  dispatch(deleteReview(el.id));
                }}
              >
                Eliminar
              </Boton>
            </Review>
          </StyledLink>
        ))}
    </div>
  );
}
