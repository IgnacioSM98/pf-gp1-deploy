import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  position: relative;
  width: 98%;
  height: 150px;
  justify-content: start;
  border-radius: 6px;
  align-items: center;
  padding: 20px;
  -webkit-box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.26);
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.26);
  &: hover {
    border: 1px solid black;
    box-shadow: none;
  }
`;

const ContenedorInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: start;
  text-align: start;
  position: relative;
`;

const Nombre = styled.p`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 900;
  text-align: start;
`;

const ProductLink = styled(Link)`
  height: ${(props) => (props.height ? props.height : "150px")};
  width: ${(props) => (props.width ? props.width : "50%")};
  margin: 0px 0px 10px 0px;
  color: black;
  text-decoration: none;
  font-size: 18px;
  position: relative;
  @media screen and (max-width: 960px) {
    width: 85%;
  }
  @media screen and (max-width: 560px) {
    display: contents;
  }
`;

const Span = styled.span`
  font-size: 8px;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const Span2 = styled.span`
  font-size: 8px;
  @media screen and (max-width: 1000px) {
    display: none;
  }
  @media screen and (max-width: 560px) {
    display: contents;
  }
`;

export default function ItemCompra({ producto, height, width }) {
  return (
    <ProductLink height={height} width={width} to={`/pedido/${producto.id}`}>
      <Container>
        <ContenedorInfo>
          <Nombre>{`Pedido: #${producto.id}`}</Nombre>

          <Span>Estado: {producto.Estado}</Span>

          <Span2>Tipo de Envío: {producto.Tipo_de_envio}</Span2>
        </ContenedorInfo>
      </Container>
    </ProductLink>
  );
}
