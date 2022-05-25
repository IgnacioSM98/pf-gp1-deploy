import React, { useState } from "react";
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
  margin: 25px 20px;
`;

const ContenedorInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
`;

const Nombre = styled.p`
  font-family: Poppins;
  font-size: 22px;
  margin-top: 1rem;
  font-weight: 800;
  width: 250px;
`;

const Precio = styled.p`
  font-family: Poppins;
  font-size: 22px;
  margin-top: 2rem;
  font-weight: 800;
`;

const ContenedorCantidad = styled.div`
  display: flex;
  flex-direction: row;
  height: fit-content;
  border: 1px solid #e1d7d7;
  border-radius: 8px;
  margin: 20px;
  font-family: Poppins;
  margin-right: 8rem;
`;
const Boton = styled.button`
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
  width: 50px;
  background-color: #95a999;
  border: none
  outline: none;
  color: white;
`;

const Cantidad = styled.p`
  font-size: 16px;
  padding: 10px;
  width: 100px;
`;

export default function CarritoItem({ producto }) {
  const [cantidad, setCantidad] = useState(1);

  function handleSuma(e) {
    if (cantidad >= 1) {
      setCantidad(cantidad + 1);
    }
  }

  function handleResta(e) {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  }

  return (
    <Container>
      <Imagen src={producto.imagen} alt="" />
      {/* <div>{producto.id}</div> */}

      <ContenedorInfo>
        <Nombre>{producto.nombre}</Nombre>
        <ContenedorCantidad>
          <Boton onClick={(e) => handleResta(e)}>-</Boton>
          <Cantidad>{producto.cantidad}</Cantidad>
          <Boton onClick={(e) => handleSuma(e)}>+</Boton>
        </ContenedorCantidad>
        <Precio>${producto.precio * producto.cantidad}</Precio>
      </ContenedorInfo>
    </Container>
  );
}
