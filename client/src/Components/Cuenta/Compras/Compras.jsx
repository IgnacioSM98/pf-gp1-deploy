import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPedidosUsuario } from "../../../Redux/actions";
import { Pedido } from "../..";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px 12px;
  width: 100%;
  height: auto;
  margin: 15px;
  padding: 5px;
  border-radius: 8px;
  overflow-x: scroll;

  @media screen and (max-width: 560px) {
    // display: absolute;
    z-index: 1;
    margin: 0;
  }
`;

const Contenedor = styled.div`
  height: 85vh;
  background-color: white;
  position: relative;

  @media screen and (max-width: 560px) {
    // display: absolute;
    z-index: 1;
    margin: 0;
    height: 93vh;
  }
`;

const Cerrar = styled.button`
  position: absolute;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 20px;
  width: 25px;
  height: 25px;
  background: #36885ed1;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;

  @media screen and (min-width: 560px) {
    display: none;
  }
`;

const H1 = styled.h1`
  font-size: 20px;
  font-family: Poppins;
  font-weight: 600;
  text-align: start;
  margin-left: 1%;
`;

export default function Compras({ setComponente }) {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);
  const pedidos = useSelector((state) => state.pedidosUsuario);
  const [show, setShow] = useState(true);

  useEffect(() => {
    dispatch(getPedidosUsuario(userInfo?.uid));
  }, [dispatch, userInfo]);

  function handleClick(e) {
    e.preventDefault();
    setShow((current) => !current);

    setComponente("");
  }

  return (
    <Contenedor style={{ display: show ? "absolute" : "none" }}>
      <H1>Historial de Pedidos</H1>
      <Cerrar
        onClick={(e) => {
          e.preventDefault();
          handleClick(e);
        }}
      >
        X
      </Cerrar>

      {pedidos[0] ? (
        <Container>
          {pedidos.map((pedido) => (
            <Pedido width={"100%"} key={pedido.id} producto={pedido} />
          ))}
        </Container>
      ) : (
        <p>Aún no tienes compras realizadas</p>
      )}
    </Contenedor>
  );
}
