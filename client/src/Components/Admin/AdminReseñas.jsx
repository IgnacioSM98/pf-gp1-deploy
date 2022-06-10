import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews, deleteReview } from "../../Redux/actions";
import { Stars } from "../index";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 75vh;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;

  overflow-y: scroll;
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

export default function AdminReseñas() {
  let dispatch = useDispatch();
  let reviews = useSelector((state) => state.reviews);
  useEffect(() => {
    dispatch(getAllReviews());
  }, []);

  return (
    <>
      <h1
        style={{
          fontSize: "20px",
          fontFamily: "Poppins",
          fontWeight: 600,
          paddingBottom: "20px",
          textAlign: "start",
        }}
      >
        Administrador de Reviews
      </h1>
      <Container>
        {reviews.map((el) => (
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
        ))}
      </Container>
    </>
  );
}
