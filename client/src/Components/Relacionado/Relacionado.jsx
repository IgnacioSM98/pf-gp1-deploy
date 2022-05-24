import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: space-evenly;

  background-color: #808080a1;
  margin: 10px;
  padding: 10px;

  width: 230px;
  height: 280px;
  border-radius: 8px;

  white-space: nowrap;
  overflow: hidden;

  cursor: pointer;

  &:hover {
    white-space: initial;
    overflow: initial;
  }
`;

const Image = styled.img`
  width: 190px;
  height: 160px;
  object-fit: contain;
  background-color: white;
  border-radius: 5px;
`;

const Nombre = styled.span`
  width: 100%;
  font-size: 17px;
  text-align: initial;
  font-weight: 400;
`;

const Precio = styled.span`
  width: 100%;
  font-size: 17px;
  font-weight: 600;
`;

export default function Relacionado({ relacionado }) {
  return (
    <Container>
      <Image src={relacionado.imagen} alt="" />
      <Precio>{`$${relacionado.precio}`}</Precio>
      <Nombre>{relacionado.nombre}</Nombre>
    </Container>
  );
}
