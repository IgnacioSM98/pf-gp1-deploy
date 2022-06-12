import React from "react";
import { useSelector } from "react-redux";
import { Review } from "../index";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 184px;
  width: 100%;
  justify-content: space-around;
  align-items: start;
  // position: relative;

  // overflow-y: scroll;
`;

const Reviews = styled.div`
  display: flex;
  // flex-direction: row;
  width: 75%;

  // overflow-y: scroll;

  @media screen and (max-width: 500px) {
    // background-color: red;
    width: 100%;
    flex-direction: column;
  }
`;

const Titulo = styled.div`
  margin-left: 10px;
  font-size: 20px;
  font-weight: 600;

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: transparent;
  text-decoration: underline;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    margin-left: 3px;
  }
`;

export default function Producto({ setReseñas }) {
  const reviews = useSelector((state) => state.reviews);

  return (
    <Container>
      <Titulo>Reseñas de otros usuarios</Titulo>

      {reviews.length ? (
        <Button
          onClick={(e) => {
            e.preventDefault();
            setReseñas(true);
          }}
        >
          ver todas
        </Button>
      ) : (
        <></>
      )}

      <Reviews>
        {reviews.length ? (
          reviews.slice(0, 4).map((review) => {
            return (
              <Review
                key={review.id}
                id={review.id}
                puntaje={review.puntaje}
                titulo={review.titulo}
                comentario={review.comentario}
                fecha={
                  review.updatedAt ? review.updatedAt.slice(0, 10) : "Ahora"
                }
              />
            );
          })
        ) : (
          <Review comentario={"Aún no hay reseñas. ¡Creá la tuya!"} />
        )}
      </Reviews>
    </Container>
  );
}
