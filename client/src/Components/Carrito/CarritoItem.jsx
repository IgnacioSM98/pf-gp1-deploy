import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;

  position: relative;
  width: 100%;
  // margin-top: 30px;
`;

const Imagen = styled.img`
  height: 90px;
  width: 120px;
  object-fit: contain;
  background-color: white;
  border-radius: 7px;

  margin: 0px 10px;
`;

export default function CarritoItem({ producto }) {
  return (
    <Container>
      <Imagen src={producto.imagen} alt="" />
      {/* <div>{producto.id}</div> */}

      <p>{producto.nombre}</p>
      <p>{producto.precio}</p>
    </Container>
  );
}
