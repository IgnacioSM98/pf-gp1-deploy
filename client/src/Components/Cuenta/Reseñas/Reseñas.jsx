import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, getUsuarios } from "../../../Redux/actions";
//import "./Reseñas.css";
import Stars from "../../Stars/Stars";
import styled from "styled-components";

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
      {/* {console.log(id)}
      {console.log(reseñas)}
      {reseñas?.map((review) => {
        <div key={review.id}>
          <Stars rating={review.puntaje} />
          <h3>{review.titulo}</h3>
          <p>{review.comentario}</p>
        </div>;
      })} */}
      {reseñas
        .filter((reseña) => reseña.usuarioId === id)
        .map((el) => (
          <Review key={el.id}>
            <Stars rating={el.puntaje} />
            <TituloReview>{el.titulo}</TituloReview>
            <ComentarioReview>{el.comentario}</ComentarioReview>
          </Review>
        ))}
    </div>
  );
}
