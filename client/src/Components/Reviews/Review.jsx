import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 140px;
  width: 300px;
  background-color: grey;
  margin: 2px;
  border-radius: 10px;

  font-size: 17px;
`;

const Stars = styled.div`
  display: flex;
  color: white;
  font-size: 17px;
`;

export default function Review({ puntaje, comentario }) {
  return (
    <Container>
      <Stars>
        {[...Array(5)].map((star, index) => (
          <span style={{ textShadow: "1px 1px black" }} key={index}>
            &#9733;
          </span>
        ))}
      </Stars>

      <div className="puntaje-review">
        <h3>{puntaje}</h3>
      </div>

      <div className="comentario-review">
        <p>{comentario}</p>
      </div>
    </Container>
  );
}
