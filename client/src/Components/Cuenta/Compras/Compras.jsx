import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos, getPedidosUsuario } from "../../../Redux/actions";
import { Pedido } from "../..";
import styled from "styled-components";

const Container = styled.div`
  height: 80vh;
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px 12px;
  width: 100%;
  height: auto;
  margin: 15px;
  padding: 5px;
  border-radius: 8px;
  @media screen and (max-width: 560px) {
    margin: 0;
  }
`;

export default function Compras() {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);
  const pedidos = useSelector((state) => state.pedidosUsuario);

  useEffect(() => {
    dispatch(getPedidosUsuario(userInfo?.uid));
  }, [dispatch]);

  return (
    <Container>
      {pedidos[0] ? (
        pedidos.map((pedido) => <Pedido key={pedido.id} producto={pedido} />)
      ) : (
        <p>Aún no tienes compras realizadas</p>
      )}
    </Container>
  );
}
