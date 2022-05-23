import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 184px;
  width: 292px;
  background-color: #f5f5f5;
  margin: 0.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 2px 0 black, 2px 2px 2px 2px darkgray;
`;

const Stars = styled.div`
  display: flex;
  color: black;
`;

const ContenedorEstrPun = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 10px;
  font-size: 28px;
  color: black;
`;

const Comentario = styled.p`
  font-size: 22px;
  font-family: Poppins;
`;

export default function Review({ puntaje, comentario }) {
  return (
    <Container>
      <ContenedorEstrPun>
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
      </ContenedorEstrPun>

      <div className="comentario-review">
        <Comentario>{comentario}</Comentario>
      </div>
    </Container>
  );
}
