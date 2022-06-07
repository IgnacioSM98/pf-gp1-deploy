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
  // margin-top: 30px;
  padding: 20px;

  // box-shadow: 0 1px 1px 0 darkgrey, 0 1px 2px 0 #222;
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

  // padding-top: 30px;
  justify-content: start;
  // align-items: center;
  text-align: start;

  position: relative;
`;

const Nombre = styled.p`
  // position: absolute;
  // top: 50px;

  font-family: Poppins;
  font-size: 16px;
  // margin-top: 1.5rem;
  font-weight: 900;
  // width: 260px;

  text-align: start;
`;

export default function ItemCompra({ producto }) {
  return (
    <Link
      style={{ color: "black", textDecoration: "none" }}
      to={`/pedido/${producto.id}`}
    >
      <Container>
        <ContenedorInfo>
          <Nombre>{`Pedido: #${producto.id}`}</Nombre>

          <span style={{ fontSize: "12px", paddingTop: "35px" }}>
            Estado: {producto.Estado}
          </span>

          <span style={{ fontSize: "12px" }}>
            Tipo de Envío: {producto.Tipo_de_envio}
          </span>
        </ContenedorInfo>
      </Container>
    </Link>
  );
}
