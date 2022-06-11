import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { agregarCarrito, restarCarrito } from "../../Redux/actions";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Stars } from "../index";
import { useSelector } from "react-redux";

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

// const Imagen = styled.img`
//   height: 160px;
//   width: 200px;
//   object-fit: contain;
//   background-color: white;
//   border-radius: 10px;
//   margin: 25px 10px;

//   &: hover {
//     // border: 1px solid black;
//   }
// `;

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
  font-size: "8px";
  @media screen and (max-width: 700px) {
    display: none;
  }
`;
const Span2 = styled.span`
  font-size: "8px";
  @media screen and (max-width: 1000px) {
    display: none;
  }
  @media screen and (max-width: 560px) {
    display: contents;
  }
`;

export default function ItemCompra({ producto, height, width }) {
  // const item = useSelector(
  //   (state) => state.productos.filter((item) => item.id === producto.id)[0]
  // );

  return (
    <ProductLink
      height={height}
      width={width}
      // style={{ color: "black", textDecoration: "none" }}
      to={`/pedido/${producto.id}`}
    >
      <Container>
        <ContenedorInfo>
          {/* <span style={{ fontSize: "12px" }}>Comprado el 20 de Mayo</span> */}

          <Nombre>{`Pedido: #${producto.id}`}</Nombre>

          <Span>
            {/* Llegó el 26 de Mayo */}
            Estado: {producto.Estado}
          </Span>

          <Span2>
            {/* Llegó el 26 de Mayo */}
            Tipo de Envío: {producto.Tipo_de_envio}
          </Span2>

          {/* <div style={{ position: "absolute", bottom: "25px" }}>
          <Stars puntaje={item.puntaje}></Stars>
        </div> */}
          {/* </ProductLink> */}
        </ContenedorInfo>
      </Container>
    </ProductLink>
  );
}
