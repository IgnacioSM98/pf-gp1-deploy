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
  -webkit-box-shadow: 7px 8px 18px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 1px 3px 18px 1px rgba(0, 0, 0, 0.1);

  &: hover {
    border: 1px solid black;
  }
`;

const Imagen = styled.img`
  height: 160px;
  width: 200px;
  object-fit: contain;
  background-color: white;
  border-radius: 10px;
  margin: 25px 10px;

  &: hover {
    // border: 1px solid black;
  }
`;

const ContenedorInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  padding-top: 30px;
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
  height: auto;
  width: auto;

  color: black;
  font-size: 18px;
`;

export default function ItemCompra({ producto }) {
  const item = useSelector(
    (state) => state.productos.filter((item) => item.id === producto.id)[0]
  );

  {
    /* <p>{`Numero de Pedido: ${e.id}`}</p>
            <p>{`Estado: ${e.Estado}`}</p>
            <p>{`Fecha de Compra: ${e.fecha}`}</p>
            <p>{`Monto: $${e.pago_total}`}</p>
            <p>{`Tipo de Pago: ${e.Tipo_de_pago}`}</p>
            <p>{`Tipo de Envio: ${e.Tipo_de_envio}`}</p>
            <p>{`Dirección de Envío: ${e.Direccion_de_envio}`}</p> */
  }

  return (
    <Container>
      {/* <ProductLink to={`/productos/${producto.id}`}> */}
      {/* <Imagen src={producto.imagen} alt={producto.nombre} /> */}
      {/* </ProductLink> */}

      <ContenedorInfo>
        {/* <span style={{ fontSize: "12px" }}>Comprado el 20 de Mayo</span> */}

        <Nombre>{`Pedido: #${producto.id}`}</Nombre>

        <span style={{ fontSize: "12px", paddingTop: "35px" }}>
          Llegó el 26 de Mayo
        </span>

        {/* <div style={{ position: "absolute", bottom: "25px" }}>
          <Stars puntaje={item.puntaje}></Stars>
        </div> */}
        {/* </ProductLink> */}
      </ContenedorInfo>
    </Container>
  );
}
