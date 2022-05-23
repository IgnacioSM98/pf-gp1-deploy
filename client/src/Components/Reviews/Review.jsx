import React from "react";
import styled from "styled-components";
import { Stars } from "../index";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: flex-start;
  align-items: start;

  height: 144px;
  width: 292px;

  background-color: lightgrey;
  margin: 0.5rem;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 15px;
`;

// const Stars = styled.div`
//   display: flex;
//   color: black;
//   font-family: initial;
//   font-size: 15px;
// `;

const Comentario = styled.p`
  font-size: 16px;
  font-weight: 500;
  text-align: initial;
`;

const ComentarioDetallado = styled.p`
  margin-top: 4px;
  font-size: 13px;
  text-align: initial;
`;

const Fecha = styled.p`
  font-size: 10px;
`;

const Titulo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export default function Review({
  puntaje,
  comentario,
  comentarioDetallado,
  fecha,
}) {
  return (
    <Container>
      <Titulo>
        {/* Comentario corto */}
        <Comentario>{comentario}</Comentario>
        <Fecha>{fecha}</Fecha>
      </Titulo>

      {puntaje && <Stars rating={puntaje} />}

      {/* Comentario largo // 168 maximo */}
      {comentarioDetallado && (
        <ComentarioDetallado>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
          quisquam eos ad nobis voluptate nulla? Amet quos commodi eligendi quam
          reiciendis deleni
        </ComentarioDetallado>
      )}
    </Container>
  );
}
