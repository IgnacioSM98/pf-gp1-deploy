import React from "react";
import { useSelector } from "react-redux";
import { Review } from "../index";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export default function Producto() {
  const reviews = useSelector((state) => state.reviews);

  return (
    <Container>
      {reviews?.map((review) => {
        return (
          <Review
            className="box-review"
            key={review.id}
            id={review.id}
            puntaje={review.puntaje}
            comentario={review.comentario}
          />
        );
      })}
    </Container>
  );
}
