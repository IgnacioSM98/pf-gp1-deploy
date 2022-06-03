import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: start;
  align-items: center;
  // margin-top: 30px;
`;

const Imagen = styled.img`
  height: 80px;
  width: 80px;
  object-fit: contain;
  background-color: white;
  border-radius: 10px;
  margin: 25px 10px;
`;

const ContenedorInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Nombre = styled.p`
  font-family: Poppins;
  font-size: 18px;
  // margin-top: 1.5rem;
  font-weight: 800;
  width: 260px;

  text-align: start;
`;

const PrecioUnitario = styled.p`
  font-family: Poppins;
  font-size: 22px;
  font-weight: 800;
  position: absolute;
  right: 27.5%;
  top: 30%;
`;

const ProductLink = styled(Link)`
  height: auto;
  width: auto;

  color: black;
  font-size: 18px;
`;

function FavoritosItem({ producto }) {
  return (
    <Container>
      <Imagen src={producto.imagen} alt={producto.nombre} />
      <ContenedorInfo>
        <ProductLink to={`/productos/${producto.id}`}>
          <Nombre>{producto.nombre}</Nombre>
        </ProductLink>
        <PrecioUnitario>${producto.precio}</PrecioUnitario>
      </ContenedorInfo>
    </Container>
  );
}

export default FavoritosItem;
