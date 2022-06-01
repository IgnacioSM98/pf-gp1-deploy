import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos } from "../../../Redux/actions";
import { Pedido } from "../..";
import styled from "styled-components";

const Container = styled.div`
  height: 80vh;

  padding-top: 20px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  // grid-auto-flow: dense;
  grid-gap: 20px 12px;

  // justify-content: center;
  // align-items: center;

  width: 100%;
  height: auto;

  margin: 15px;
  padding: 5px;
  // border: 1px solid darkgrey;
  border-radius: 8px;
  // box-shadow: 0 2px 2px 0 darkgrey, 0 2px 2px 0 #222;
`;

export default function Compras() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const pedidos = useSelector((state) => state.pedidos);

  useEffect(() => {
    dispatch(getPedidos());
  }, [dispatch]);

  const filterByUser = (pedido) => {
    if (pedido.usuarioId === userInfo.uid) return pedido;
  };

  return (
    <Container>
      {pedidos?.filter(filterByUser).map((pedido) => (
        <Pedido key={pedido.id} producto={pedido} />
      ))}
    </Container>
  );
}
